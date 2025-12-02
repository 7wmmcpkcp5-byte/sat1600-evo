// data-service.js - VERSIÓN COMPLETA Y CORREGIDA
import { CONFIG, getLevelInfo, calculateXPForAnswer } from './config.js';
import { questionRepository } from './data/question-repository.js';

export class DataService {
    constructor() {
        this.user = this.getUser();
        this.analytics = null; // Se asignará después para evitar dependencia circular
        this.currentSession = null;
        this.questionHistory = [];
        this.cachedQuestions = new Map();
    }

    // ✅ MÉTODO PARA ASIGNAR ANALYTICS DESPUÉS DE CONSTRUCCIÓN
    setAnalytics(analyticsInstance) {
        this.analytics = analyticsInstance;
    }

    getUser() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKeys.userProgress);
            if (saved) {
                const userData = JSON.parse(saved);
                return this.migrateUserData(userData);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }

        return this.createDefaultUser();
    }

    createDefaultUser() {
        return {
            xp: 0,
            level: 1,
            coins: 100,
            gems: 10,
            seenQuestions: [],
            favoriteQuestions: [],
            streak: 0,
            lastActive: new Date().toISOString().split('T')[0],
            
            sessionStats: {
                correct: 0,
                incorrect: 0,
                total: 0,
                startTime: Date.now(),
                currentStreak: 0,
                bestStreak: 0
            },
            
            sectionProgress: {
                math: { level: 1, xp: 0, questions: 0, accuracy: 0 },
                reading: { level: 1, xp: 0, questions: 0, accuracy: 0 },
                writing: { level: 1, xp: 0, questions: 0, accuracy: 0 }
            },
            
            categoryProgress: {
                algebra: { questions: 0, correct: 0, lastPracticed: null },
                geometry: { questions: 0, correct: 0, lastPracticed: null },
                comprehension: { questions: 0, correct: 0, lastPracticed: null },
                grammar: { questions: 0, correct: 0, lastPracticed: null },
                data_analysis: { questions: 0, correct: 0, lastPracticed: null },
                advanced_math: { questions: 0, correct: 0, lastPracticed: null }
            },
            
            achievements: [],
            unlockedAchievements: [],
            
            preferences: {
                sound: true,
                animations: true,
                difficulty: 'adaptive',
                theme: 'light',
                notifications: true,
                autoSave: true
            },
            
            goals: {
                dailyQuestions: 10,
                weeklyAccuracy: 75,
                monthlySessions: 20,
                targetScore: 1400
            },
            
            studyPlans: [],
            completedTests: [],
            
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            totalStudyTime: 0,
            version: '2.0'
        };
    }

    migrateUserData(oldData) {
        const defaultUser = this.createDefaultUser();
        
        // Migrar datos básicos
        const migrated = { ...defaultUser, ...oldData };
        
        // Migrar de versiones antiguas
        if (oldData.version === '1.0') {
            // Migrar XP y nivel
            if (oldData.xp !== undefined) {
                migrated.xp = oldData.xp;
                migrated.level = this.calculateLevel(oldData.xp);
            }
            
            // Migrar monedas si no existen
            if (!migrated.coins && oldData.coins === undefined) {
                migrated.coins = Math.floor(migrated.level * 50);
            }
            
            // Migrar progreso por sección si no existe
            if (!migrated.sectionProgress && oldData.sectionStats) {
                migrated.sectionProgress = { ...defaultUser.sectionProgress };
                Object.keys(oldData.sectionStats).forEach(section => {
                    if (migrated.sectionProgress[section]) {
                        migrated.sectionProgress[section].questions = oldData.sectionStats[section]?.total || 0;
                        migrated.sectionProgress[section].accuracy = oldData.sectionStats[section]?.accuracy || 0;
                    }
                });
            }
            
            // Migrar streak diario
            if (!migrated.streak && oldData.dailyStreak) {
                migrated.streak = oldData.dailyStreak;
            }
        }
        
        // Asegurar que todas las secciones tengan estructura completa
        Object.keys(defaultUser.sectionProgress).forEach(section => {
            if (!migrated.sectionProgress[section]) {
                migrated.sectionProgress[section] = { ...defaultUser.sectionProgress[section] };
            }
        });
        
        // Asegurar que todas las categorías tengan estructura completa
        Object.keys(defaultUser.categoryProgress).forEach(category => {
            if (!migrated.categoryProgress[category]) {
                migrated.categoryProgress[category] = { ...defaultUser.categoryProgress[category] };
            }
        });
        
        migrated.version = defaultUser.version;
        migrated.lastActive = new Date().toISOString();
        
        return migrated;
    }

    calculateLevel(xp) {
        let level = 1;
        let xpNeeded = 0;
        
        while (xp >= xpNeeded) {
            xpNeeded += level * 100;
            if (xp >= xpNeeded) {
                level++;
            }
        }
        
        return level;
    }

    saveUser() {
        try {
            this.user.lastActive = new Date().toISOString();
            localStorage.setItem(
                CONFIG.storageKeys.userProgress, 
                JSON.stringify(this.user)
            );
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    saveProgress(questionData) {
        const { 
            questionId, 
            isCorrect, 
            timeSpent, 
            section, 
            category, 
            difficulty 
        } = questionData;
        
        // 1. Actualizar estadísticas de usuario
        this.updateUserStats(questionData);
        
        // 2. Registrar pregunta como vista
        if (!this.user.seenQuestions.includes(questionId)) {
            this.user.seenQuestions.push(questionId);
            
            // Limitar a 500 preguntas en historial
            if (this.user.seenQuestions.length > 500) {
                this.user.seenQuestions = this.user.seenQuestions.slice(-500);
            }
        }
        
        // 3. Actualizar analytics si está disponible
        if (this.analytics) {
            this.analytics.recordQuestion({
                ...questionData,
                timestamp: new Date().toISOString()
            });
        }
        
        // 4. Actualizar progreso por sección
        if (section && this.user.sectionProgress[section]) {
            const sectionData = this.user.sectionProgress[section];
            sectionData.questions++;
            
            if (isCorrect) {
                // Calcular nuevo XP para la sección
                const xpGained = calculateXPForAnswer(isCorrect, difficulty, timeSpent);
                sectionData.xp += xpGained;
                
                // Recalcular nivel de la sección
                sectionData.level = this.calculateSectionLevel(sectionData.xp);
                
                // Recalcular precisión
                const totalQuestions = sectionData.questions;
                const correctQuestions = Math.floor((sectionData.accuracy / 100) * (totalQuestions - 1)) + 1;
                sectionData.accuracy = (correctQuestions / totalQuestions) * 100;
            }
        }
        
        // 5. Actualizar progreso por categoría
        if (category && this.user.categoryProgress[category]) {
            const categoryData = this.user.categoryProgress[category];
            categoryData.questions++;
            if (isCorrect) categoryData.correct++;
            categoryData.lastPracticed = new Date().toISOString();
        }
        
        // 6. Verificar logros
        this.checkAchievements();
        
        // 7. Guardar cambios
        this.saveUser();
        
        return {
            xpGained: questionData.xpGained || 0,
            newLevel: this.user.level,
            sectionProgress: this.user.sectionProgress[section]
        };
    }

    updateUserStats(questionData) {
        const { isCorrect, timeSpent } = questionData;
        
        // Actualizar estadísticas de sesión
        this.user.sessionStats.total++;
        if (isCorrect) {
            this.user.sessionStats.correct++;
            this.user.sessionStats.currentStreak++;
            
            if (this.user.sessionStats.currentStreak > this.user.sessionStats.bestStreak) {
                this.user.sessionStats.bestStreak = this.user.sessionStats.currentStreak;
            }
            
            // Actualizar streak diario
            const today = new Date().toISOString().split('T')[0];
            if (this.user.lastActive.split('T')[0] !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];
                
                if (this.user.lastActive.split('T')[0] === yesterdayStr) {
                    this.user.streak++;
                } else {
                    this.user.streak = 1;
                }
            }
        } else {
            this.user.sessionStats.incorrect++;
            this.user.sessionStats.currentStreak = 0;
        }
        
        // Calcular y asignar XP
        const xpGained = calculateXPForAnswer(
            isCorrect, 
            questionData.difficulty || 'medium', 
            timeSpent
        );
        
        this.user.xp += xpGained;
        questionData.xpGained = xpGained;
        
        // Recalcular nivel
        const newLevel = this.calculateLevel(this.user.xp);
        if (newLevel > this.user.level) {
            this.user.level = newLevel;
            this.user.coins += newLevel * 100; // Recompensa por subir de nivel
            this.user.gems += Math.floor(newLevel / 5); // 1 gem cada 5 niveles
        }
        
        // Actualizar tiempo total de estudio
        this.user.totalStudyTime += timeSpent;
    }

    calculateSectionLevel(xp) {
        let level = 1;
        let xpNeeded = 0;
        
        while (xp >= xpNeeded) {
            xpNeeded += level * 50; // Menos XP necesario para niveles de sección
            if (xp >= xpNeeded) {
                level++;
            }
        }
        
        return Math.min(level, 50); // Máximo nivel 50 por sección
    }

    getNextQuestion(section = null, category = null, difficulty = null) {
        try {
            let questions = questionRepository.getAllQuestions();
            
            // Filtrar preguntas no vistas primero
            const unseenQuestions = questions.filter(q => 
                !this.user.seenQuestions.includes(q.id)
            );
            
            // Si hay preguntas no vistas, usarlas
            let candidatePool = unseenQuestions.length > 0 ? unseenQuestions : questions;
            
            // Aplicar filtros
            if (section) {
                candidatePool = candidatePool.filter(q => q.section === section);
            }
            
            if (category) {
                candidatePool = candidatePool.filter(q => q.category === category);
            }
            
            if (difficulty) {
                candidatePool = candidatePool.filter(q => q.difficulty === difficulty);
            }
            
            // Si no hay preguntas después de filtrar, usar todas las preguntas
            if (candidatePool.length === 0) {
                candidatePool = questions;
                
                // Reaplicar filtros básicos
                if (section) {
                    candidatePool = candidatePool.filter(q => q.section === section);
                }
            }
            
            // Sistema de selección inteligente
            const selectedQuestion = this.selectIntelligentQuestion(candidatePool, section);
            
            if (selectedQuestion) {
                // Cachear la pregunta para acceso rápido
                this.cachedQuestions.set(selectedQuestion.id, {
                    ...selectedQuestion,
                    retrievedAt: Date.now()
                });
                
                // Limpiar cache viejo (más de 10 minutos)
                this.cleanOldCache();
                
                return selectedQuestion;
            }
            
            // Fallback: primera pregunta disponible
            return candidatePool.length > 0 ? candidatePool[0] : null;
            
        } catch (error) {
            console.error('Error getting next question:', error);
            return this.getFallbackQuestion(section);
        }
    }

    selectIntelligentQuestion(questions, section) {
        // 1. Priorizar preguntas no vistas
        const unseen = questions.filter(q => !this.user.seenQuestions.includes(q.id));
        if (unseen.length > 0) {
            return this.selectByAdaptiveDifficulty(unseen, section);
        }
        
        // 2. Para preguntas vistas, usar algoritmo de repetición espaciada
        return this.selectBySpacedRepetition(questions);
    }

    selectByAdaptiveDifficulty(questions, section) {
        // Obtener nivel actual del usuario en esta sección
        const sectionLevel = this.user.sectionProgress[section]?.level || 1;
        
        // Mapear nivel a dificultad
        let targetDifficulty = 'medium';
        if (sectionLevel < 3) targetDifficulty = 'easy';
        else if (sectionLevel > 7) targetDifficulty = 'hard';
        
        // Filtrar preguntas de la dificultad objetivo
        const difficultyQuestions = questions.filter(q => q.difficulty === targetDifficulty);
        
        if (difficultyQuestions.length > 0) {
            // Seleccionar aleatoriamente de la dificultad objetivo
            return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
        }
        
        // Fallback: cualquier pregunta
        return questions[Math.floor(Math.random() * questions.length)];
    }

    selectBySpacedRepetition(questions) {
        // Algoritmo simple de repetición espaciada basado en:
        // 1. Tiempo desde última vez vista
        // 2. Dificultad de la pregunta
        // 3. Rendimiento histórico del usuario
        
        const now = Date.now();
        const scoredQuestions = questions.map(q => {
            let score = 0;
            
            // Penalizar preguntas respondidas recientemente
            const lastSeenIndex = this.user.seenQuestions.lastIndexOf(q.id);
            if (lastSeenIndex !== -1) {
                const daysSinceLastSeen = (now - lastSeenIndex) / (1000 * 60 * 60 * 24);
                score += Math.min(daysSinceLastSeen, 30) * 10; // Más días = mayor score
            }
            
            // Bonificar preguntas difíciles
            if (q.difficulty === 'hard') score += 50;
            else if (q.difficulty === 'medium') score += 25;
            
            // Penalizar preguntas fáciles si el usuario es avanzado
            if (q.difficulty === 'easy' && this.user.level > 5) score -= 20;
            
            // Considerar categorías débiles
            if (this.user.categoryProgress[q.category]) {
                const catAccuracy = this.user.categoryProgress[q.category].correct / 
                                   Math.max(this.user.categoryProgress[q.category].questions, 1);
                if (catAccuracy < 0.5) {
                    score += 30; // Priorizar categorías débiles
                }
            }
            
            return { question: q, score };
        });
        
        // Ordenar por score descendente
        scoredQuestions.sort((a, b) => b.score - a.score);
        
        // Seleccionar entre las 3 mejores
        const topQuestions = scoredQuestions.slice(0, 3);
        return topQuestions[Math.floor(Math.random() * topQuestions.length)]?.question || questions[0];
    }

    getFallbackQuestion(section) {
        // Pregunta de respaldo para cuando no hay datos
        return {
            id: 'fallback_' + Date.now(),
            section: section || 'math',
            category: 'algebra',
            difficulty: 'medium',
            question: "¿Cuál es el valor de x en la ecuación 2x + 3 = 11?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
            explanation: "2x + 3 = 11 → 2x = 8 → x = 4",
            tags: ["algebra", "ecuaciones"]
        };
    }

    getQuestionById(questionId) {
        // Buscar en cache primero
        if (this.cachedQuestions.has(questionId)) {
            return this.cachedQuestions.get(questionId);
        }
        
        // Buscar en repositorio
        const question = questionRepository.getQuestionById(questionId);
        if (question) {
            // Cachear
            this.cachedQuestions.set(questionId, {
                ...question,
                retrievedAt: Date.now()
            });
        }
        
        return question;
    }

    cleanOldCache() {
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;
        
        for (const [id, data] of this.cachedQuestions.entries()) {
            if (now - data.retrievedAt > tenMinutes) {
                this.cachedQuestions.delete(id);
            }
        }
    }

    startSession(sessionType = 'practice', section = null) {
        this.currentSession = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            type: sessionType,
            section: section,
            startTime: new Date().toISOString(),
            questions: [],
            score: 0,
            timeLimit: sessionType === 'test' ? 1800 : null, // 30 minutos para tests
            completed: false
        };
        
        this.user.sessionStats = {
            correct: 0,
            incorrect: 0,
            total: 0,
            startTime: Date.now(),
            currentStreak: 0,
            bestStreak: 0
        };
        
        return this.currentSession;
    }

    endSession() {
        if (!this.currentSession) return null;
        
        this.currentSession.endTime = new Date().toISOString();
        this.currentSession.completed = true;
        
        // Calcular duración
        const start = new Date(this.currentSession.startTime);
        const end = new Date(this.currentSession.endTime);
        this.currentSession.duration = (end - start) / 1000; // segundos
        
        // Guardar sesión en historial
        if (!this.user.completedTests) this.user.completedTests = [];
        this.user.completedTests.push({
            ...this.currentSession,
            savedAt: new Date().toISOString()
        });
        
        // Limitar historial a 50 sesiones
        if (this.user.completedTests.length > 50) {
            this.user.completedTests = this.user.completedTests.slice(-50);
        }
        
        const sessionResult = { ...this.currentSession };
        this.currentSession = null;
        
        this.saveUser();
        
        return sessionResult;
    }

    checkAchievements() {
        const newAchievements = [];
        
        // Logro por nivel
        if (this.user.level >= 5 && !this.user.unlockedAchievements.includes('level_5')) {
            newAchievements.push({
                id: 'level_5',
                title: 'Aprendiz Avanzado',
                description: 'Alcanzaste el nivel 5',
                icon: '⭐',
                reward: { coins: 100, gems: 5 },
                unlocked: new Date().toISOString()
            });
        }
        
        // Logro por precisión en sesión
        const sessionAccuracy = this.user.sessionStats.total > 0 ? 
            (this.user.sessionStats.correct / this.user.sessionStats.total) * 100 : 0;
        
        if (sessionAccuracy >= 90 && this.user.sessionStats.total >= 10 && 
            !this.user.unlockedAchievements.includes('perfect_session')) {
            newAchievements.push({
                id: 'perfect_session',
                title: 'Sesión Perfecta',
                description: '90%+ de precisión en 10+ preguntas',
                icon: '🏆',
                reward: { coins: 200, gems: 10 },
                unlocked: new Date().toISOString()
            });
        }
        
        // Logro por streak
        if (this.user.streak >= 7 && !this.user.unlockedAchievements.includes('weekly_streak')) {
            newAchievements.push({
                id: 'weekly_streak',
                title: 'Constante y Perseverante',
                description: '7 días consecutivos practicando',
                icon: '🔥',
                reward: { coins: 150, gems: 7 },
                unlocked: new Date().toISOString()
            });
        }
        
        // Logro por completar todas las secciones
        const allSectionsLevel3 = Object.values(this.user.sectionProgress)
            .every(section => section.level >= 3);
        
        if (allSectionsLevel3 && !this.user.unlockedAchievements.includes('balanced_learner')) {
            newAchievements.push({
                id: 'balanced_learner',
                title: 'Aprendiz Balanceado',
                description: 'Nivel 3 en todas las secciones',
                icon: '⚖️',
                reward: { coins: 300, gems: 15 },
                unlocked: new Date().toISOString()
            });
        }
        
        // Aplicar recompensas y registrar logros
        newAchievements.forEach(achievement => {
            this.user.achievements.push(achievement);
            this.user.unlockedAchievements.push(achievement.id);
            
            // Aplicar recompensa
            if (achievement.reward) {
                this.user.coins += achievement.reward.coins || 0;
                this.user.gems += achievement.reward.gems || 0;
            }
        });
        
        return newAchievements;
    }

    getProgressSummary() {
        const totalQuestions = this.user.sessionStats.total;
        const correctQuestions = this.user.sessionStats.correct;
        const accuracy = totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0;
        
        return {
            level: this.user.level,
            xp: this.user.xp,
            nextLevelXP: this.user.level * 100,
            coins: this.user.coins,
            gems: this.user.gems,
            streak: this.user.streak,
            totalQuestions,
            correctQuestions,
            accuracy: Math.round(accuracy),
            totalStudyTime: Math.round(this.user.totalStudyTime),
            sessionStreak: this.user.sessionStats.currentStreak,
            bestSessionStreak: this.user.sessionStats.bestStreak
        };
    }

    getSectionSummary() {
        const summary = {};
        
        Object.entries(this.user.sectionProgress).forEach(([section, data]) => {
            summary[section] = {
                level: data.level,
                xp: data.xp,
                nextLevelXP: data.level * 50,
                questions: data.questions,
                accuracy: Math.round(data.accuracy || 0),
                progress: Math.min(100, (data.xp % (data.level * 50)) / (data.level * 50) * 100)
            };
        });
        
        return summary;
    }

    getWeakAreas() {
        const weakAreas = [];
        const threshold = 70; // Por debajo del 70% se considera débil
        
        // Por categoría
        Object.entries(this.user.categoryProgress).forEach(([category, data]) => {
            if (data.questions >= 5) {
                const accuracy = (data.correct / data.questions) * 100;
                if (accuracy < threshold) {
                    weakAreas.push({
                        category: category,
                        accuracy: Math.round(accuracy),
                        questions: data.questions,
                        lastPracticed: data.lastPracticed,
                        priority: threshold - accuracy
                    });
                }
            }
        });
        
        // Ordenar por prioridad
        return weakAreas.sort((a, b) => b.priority - a.priority);
    }

    getStudyRecommendations() {
        const recommendations = [];
        const weakAreas = this.getWeakAreas();
        
        // Recomendaciones basadas en áreas débiles
        weakAreas.forEach(area => {
            recommendations.push({
                type: 'weak_area',
                title: `Mejora en ${this.formatCategoryName(area.category)}`,
                description: `Tu precisión es del ${area.accuracy}%. Practica más preguntas de esta categoría.`,
                priority: area.priority,
                action: {
                    type: 'practice_category',
                    category: area.category,
                    count: 10
                }
            });
        });
        
        // Recomendaciones basadas en niveles de sección
        Object.entries(this.user.sectionProgress).forEach(([section, data]) => {
            if (data.level < 3) {
                recommendations.push({
                    type: 'section_level',
                    title: `Sube de nivel en ${section}`,
                    description: `Tu nivel actual es ${data.level}. Completa más preguntas para subir.`,
                    priority: 80 - (data.level * 20),
                    action: {
                        type: 'practice_section',
                        section: section,
                        count: 15
                    }
                });
            }
        });
        
        // Recomendación de streak
        if (this.user.streak < 3) {
            recommendations.push({
                type: 'streak',
                title: 'Mantén tu racha',
                description: 'Practica hoy para mantener tu racha de días activos.',
                priority: 90,
                action: {
                    type: 'daily_practice',
                    count: 5
                }
            });
        }
        
        return recommendations.sort((a, b) => b.priority - a.priority);
    }

    formatCategoryName(category) {
        const names = {
            algebra: 'Álgebra',
            geometry: 'Geometría',
            comprehension: 'Comprensión Lectora',
            grammar: 'Gramática',
            data_analysis: 'Análisis de Datos',
            advanced_math: 'Matemáticas Avanzadas'
        };
        
        return names[category] || category.replace('_', ' ').toUpperCase();
    }

    updatePreferences(newPreferences) {
        this.user.preferences = {
            ...this.user.preferences,
            ...newPreferences
        };
        this.saveUser();
        return this.user.preferences;
    }

    updateGoals(newGoals) {
        this.user.goals = {
            ...this.user.goals,
            ...newGoals
        };
        this.saveUser();
        return this.user.goals;
    }

    addToFavorites(questionId) {
        if (!this.user.favoriteQuestions.includes(questionId)) {
            this.user.favoriteQuestions.push(questionId);
            this.saveUser();
            return true;
        }
        return false;
    }

    removeFromFavorites(questionId) {
        const index = this.user.favoriteQuestions.indexOf(questionId);
        if (index !== -1) {
            this.user.favoriteQuestions.splice(index, 1);
            this.saveUser();
            return true;
        }
        return false;
    }

    getFavoriteQuestions() {
        return this.user.favoriteQuestions.map(id => this.getQuestionById(id)).filter(q => q !== null);
    }

    resetProgress() {
        if (confirm('¿Estás seguro de que quieres resetear todo tu progreso? Esto no se puede deshacer.')) {
            this.user = this.createDefaultUser();
            localStorage.removeItem(CONFIG.storageKeys.userProgress);
            return true;
        }
        return false;
    }

    exportUserData() {
        const exportData = {
            user: this.user,
            exportDate: new Date().toISOString(),
            version: '2.0'
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    importUserData(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            
            // Validar datos básicos
            if (!imported.user || !imported.user.xp !== undefined) {
                throw new Error('Formato de datos inválido');
            }
            
            this.user = this.migrateUserData(imported.user);
            this.saveUser();
            return { success: true, message: 'Datos importados correctamente' };
            
        } catch (error) {
            console.error('Error importing user data:', error);
            return { success: false, message: 'Error importando datos: ' + error.message };
        }
    }
}