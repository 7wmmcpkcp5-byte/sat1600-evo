// DATA SERVICE - Gestión centralizada de datos del usuario
// Versión 3.0 - Completamente funcional

import { CONFIG, getLevelInfo, calculateXPGained, estimateSATScore } from './config.js';
import { QuestionRepository } from './data/question-repository.js';

export class DataService {
    constructor() {
        this.user = null;
        this.questionRepo = new QuestionRepository();
        this.localStorage = window.localStorage;
        this.sessionData = {
            currentSession: null,
            questionHistory: [],
            tempAnswers: []
        };
        
        console.log('📊 Data Service inicializado');
    }
    
    async initialize() {
        try {
            // 1. Cargar datos del usuario
            await this.loadUserData();
            
            // 2. Inicializar repositorio de preguntas
            await this.questionRepo.initialize();
            
            // 3. Cargar sesión activa si existe
            await this.loadActiveSession();
            
            // 4. Sincronizar datos pendientes
            await this.syncPendingData();
            
            console.log('✅ Data Service listo');
            return true;
            
        } catch (error) {
            console.error('❌ Error inicializando Data Service:', error);
            throw error;
        }
    }
    
    async loadUserData() {
        try {
            const saved = this.localStorage.getItem(CONFIG.STORAGE.KEYS.userProgress);
            
            if (saved) {
                this.user = JSON.parse(saved);
                console.log('📂 Datos de usuario cargados:', this.user.username);
            } else {
                await this.createNewUser();
            }
            
            // Validar y migrar datos si es necesario
            this.user = this.migrateUserData(this.user);
            
            // Actualizar estadísticas
            await this.updateUserStats();
            
            return this.user;
            
        } catch (error) {
            console.error('Error cargando datos de usuario:', error);
            return await this.createNewUser();
        }
    }
    
    async createNewUser() {
        const defaultUser = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            username: 'Estudiante SAT',
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            
            // Progreso general
            xp: 0,
            level: 1,
            coins: 100,
            gems: 10,
            streak: 0,
            bestStreak: 0,
            
            // Estadísticas de preguntas
            totalQuestions: 0,
            correctAnswers: 0,
            totalTimeSpent: 0,
            averageTime: 0,
            
            // Puntuaciones estimadas
            estimatedScore: 400,
            mathScore: 200,
            readingScore: 200,
            writingScore: 200,
            
            // Progreso por sección
            sections: {
                math: {
                    questions: 0,
                    correct: 0,
                    accuracy: 0,
                    timeSpent: 0,
                    lastPracticed: null
                },
                reading: {
                    questions: 0,
                    correct: 0,
                    accuracy: 0,
                    timeSpent: 0,
                    lastPracticed: null
                },
                writing: {
                    questions: 0,
                    correct: 0,
                    accuracy: 0,
                    timeSpent: 0,
                    lastPracticed: null
                }
            },
            
            // Progreso por categoría
            categories: {},
            
            // Historial
            questionHistory: [],
            examHistory: [],
            sessionHistory: [],
            
            // Logros
            achievements: [],
            unlockedAchievements: [],
            
            // Configuración
            preferences: {
                theme: 'dark',
                sound: true,
                animations: true,
                notifications: true,
                language: 'es'
            },
            
            // Metas
            goals: {
                targetScore: 1400,
                dailyQuestions: 20,
                weeklyHours: 10,
                studyDays: ['Lun', 'Mié', 'Vie', 'Dom']
            },
            
            // Metadata
            version: CONFIG.APP_VERSION,
            dataVersion: 3
        };
        
        this.user = defaultUser;
        await this.saveUserData();
        
        console.log('👤 Nuevo usuario creado:', this.user.id);
        return this.user;
    }
    
    migrateUserData(oldUser) {
        if (!oldUser) return this.createNewUser();
        
        // Si ya está en versión 3, no migrar
        if (oldUser.dataVersion === 3) return oldUser;
        
        console.log('🔄 Migrando datos de usuario...');
        
        const newUser = this.createNewUser();
        
        // Migrar datos básicos
        if (oldUser.xp !== undefined) newUser.xp = oldUser.xp;
        if (oldUser.level !== undefined) newUser.level = oldUser.level;
        if (oldUser.streak !== undefined) newUser.streak = oldUser.streak;
        
        // Migrar estadísticas
        if (oldUser.totalQuestions !== undefined) newUser.totalQuestions = oldUser.totalQuestions;
        if (oldUser.correctAnswers !== undefined) newUser.correctAnswers = oldUser.correctAnswers;
        
        // Migrar historial de preguntas
        if (oldUser.questionHistory && Array.isArray(oldUser.questionHistory)) {
            newUser.questionHistory = oldUser.questionHistory.slice(0, 100);
        }
        
        // Actualizar nivel basado en XP
        const levelInfo = getLevelInfo(newUser.xp);
        newUser.level = levelInfo.level;
        
        // Recalcular puntuaciones estimadas
        this.updateEstimatedScores(newUser);
        
        newUser.dataVersion = 3;
        newUser.lastActive = new Date().toISOString();
        
        return newUser;
    }
    
    async saveUserData() {
        try {
            this.user.lastActive = new Date().toISOString();
            this.user.dataVersion = 3;
            
            const data = JSON.stringify(this.user);
            this.localStorage.setItem(CONFIG.STORAGE.KEYS.userProgress, data);
            
            // También guardar en session storage para acceso rápido
            sessionStorage.setItem('current_user', data);
            
            return true;
        } catch (error) {
            console.error('Error guardando datos de usuario:', error);
            return false;
        }
    }
    
    async updateUserStats() {
        if (!this.user) return;
        
        // Actualizar nivel
        const levelInfo = getLevelInfo(this.user.xp);
        this.user.level = levelInfo.level;
        
        // Actualizar precisión general
        if (this.user.totalQuestions > 0) {
            this.user.accuracy = (this.user.correctAnswers / this.user.totalQuestions) * 100;
        } else {
            this.user.accuracy = 0;
        }
        
        // Actualizar tiempo promedio
        if (this.user.totalQuestions > 0) {
            this.user.averageTime = this.user.totalTimeSpent / this.user.totalQuestions;
        }
        
        // Actualizar puntuaciones estimadas
        this.updateEstimatedScores();
        
        // Guardar cambios
        await this.saveUserData();
    }
    
    updateEstimatedScores(user = this.user) {
        // Calcular precisión por sección
        const mathAccuracy = user.sections.math.questions > 0 
            ? (user.sections.math.correct / user.sections.math.questions) * 100 
            : 0;
            
        const readingAccuracy = user.sections.reading.questions > 0
            ? (user.sections.reading.correct / user.sections.reading.questions) * 100
            : 0;
            
        const writingAccuracy = user.sections.writing.questions > 0
            ? (user.sections.writing.correct / user.sections.writing.questions) * 100
            : 0;
        
        // Estimar puntuaciones
        user.mathScore = estimateSATScore(mathAccuracy, 'math');
        user.readingScore = estimateSATScore(readingAccuracy, 'reading');
        user.writingScore = estimateSATScore(writingAccuracy, 'writing');
        user.estimatedScore = user.mathScore + user.readingScore + user.writingScore;
    }
    
    async getNextQuestion(options = {}) {
        try {
            const {
                section = null,
                category = null,
                difficulty = 'adaptive',
                excludeSeen = true
            } = options;
            
            // Obtener preguntas disponibles
            let questions = this.questionRepo.getAllQuestions();
            
            // Aplicar filtros
            if (section) {
                questions = questions.filter(q => q.section === section);
            }
            
            if (category) {
                questions = questions.filter(q => q.category === category);
            }
            
            if (excludeSeen && this.user.questionHistory.length > 0) {
                const seenIds = new Set(this.user.questionHistory.map(h => h.questionId));
                questions = questions.filter(q => !seenIds.has(q.id));
            }
            
            // Si no hay preguntas después de filtrar, usar todas
            if (questions.length === 0) {
                questions = this.questionRepo.getAllQuestions();
            }
            
            // Selección adaptativa de dificultad
            let selectedQuestion;
            if (difficulty === 'adaptive') {
                selectedQuestion = this.selectAdaptiveQuestion(questions);
            } else {
                const filtered = questions.filter(q => q.difficulty === difficulty);
                selectedQuestion = filtered.length > 0 
                    ? filtered[Math.floor(Math.random() * filtered.length)]
                    : questions[Math.floor(Math.random() * questions.length)];
            }
            
            if (!selectedQuestion) {
                throw new Error('No se pudo encontrar una pregunta adecuada');
            }
            
            return selectedQuestion;
            
        } catch (error) {
            console.error('Error obteniendo siguiente pregunta:', error);
            return this.getFallbackQuestion();
        }
    }
    
    selectAdaptiveQuestion(questions) {
        // Basado en el nivel y desempeño del usuario
        const userLevel = this.user.level;
        const sectionPerformance = this.getSectionPerformance();
        
        // Determinar dificultad objetivo
        let targetDifficulty;
        if (userLevel <= 3) {
            targetDifficulty = 'easy';
        } else if (userLevel <= 7) {
            targetDifficulty = 'medium';
        } else {
            targetDifficulty = 'hard';
        }
        
        // Ajustar basado en desempeño reciente
        if (this.user.accuracy < 50) {
            targetDifficulty = 'easy';
        } else if (this.user.accuracy > 80) {
            targetDifficulty = this.user.level > 5 ? 'hard' : 'medium';
        }
        
        // Filtrar preguntas de la dificultad objetivo
        let targetQuestions = questions.filter(q => q.difficulty === targetDifficulty);
        
        // Si no hay suficientes, expandir
        if (targetQuestions.length < 5) {
            const secondaryDifficulty = targetDifficulty === 'easy' ? 'medium' : 
                                      targetDifficulty === 'medium' ? 'hard' : 'medium';
            targetQuestions = questions.filter(q => 
                q.difficulty === targetDifficulty || q.difficulty === secondaryDifficulty
            );
        }
        
        // Seleccionar aleatoriamente
        return targetQuestions.length > 0
            ? targetQuestions[Math.floor(Math.random() * targetQuestions.length)]
            : questions[Math.floor(Math.random() * questions.length)];
    }
    
    async recordAnswer(answerData) {
        try {
            const {
                questionId,
                selectedIndex,
                isCorrect,
                timeSpent,
                section,
                category,
                difficulty
            } = answerData;
            
            // Registrar en historial
            const answerRecord = {
                questionId,
                selectedIndex,
                isCorrect,
                timeSpent,
                section,
                category,
                difficulty,
                timestamp: new Date().toISOString(),
                xpGained: 0
            };
            
            // Calcular XP ganado
            const streak = this.getCurrentStreak();
            const xpGained = calculateXPGained(isCorrect, difficulty, timeSpent, streak);
            answerRecord.xpGained = xpGained;
            
            // Actualizar estadísticas del usuario
            this.user.xp += xpGained;
            this.user.totalQuestions++;
            this.user.totalTimeSpent += timeSpent;
            
            if (isCorrect) {
                this.user.correctAnswers++;
                this.user.currentStreak = streak + 1;
                if (this.user.currentStreak > this.user.bestStreak) {
                    this.user.bestStreak = this.user.currentStreak;
                }
            } else {
                this.user.currentStreak = 0;
            }
            
            // Actualizar estadísticas por sección
            if (section && this.user.sections[section]) {
                this.user.sections[section].questions++;
                if (isCorrect) this.user.sections[section].correct++;
                this.user.sections[section].lastPracticed = new Date().toISOString();
                
                if (this.user.sections[section].questions > 0) {
                    this.user.sections[section].accuracy = 
                        (this.user.sections[section].correct / this.user.sections[section].questions) * 100;
                }
            }
            
            // Actualizar estadísticas por categoría
            if (category) {
                if (!this.user.categories[category]) {
                    this.user.categories[category] = {
                        questions: 0,
                        correct: 0,
                        accuracy: 0,
                        lastPracticed: null
                    };
                }
                
                this.user.categories[category].questions++;
                if (isCorrect) this.user.categories[category].correct++;
                this.user.categories[category].lastPracticed = new Date().toISOString();
                
                if (this.user.categories[category].questions > 0) {
                    this.user.categories[category].accuracy = 
                        (this.user.categories[category].correct / this.user.categories[category].questions) * 100;
                }
            }
            
            // Agregar al historial
            this.user.questionHistory.unshift(answerRecord);
            
            // Limitar historial
            if (this.user.questionHistory.length > CONFIG.STORAGE.LIMITS.maxQuestionHistory) {
                this.user.questionHistory = this.user.questionHistory.slice(
                    0, CONFIG.STORAGE.LIMITS.maxQuestionHistory
                );
            }
            
            // Actualizar streak diario
            await this.updateDailyStreak();
            
            // Guardar cambios
            await this.saveUserData();
            await this.updateUserStats();
            
            // Verificar logros
            const newAchievements = await this.checkAchievements();
            
            return {
                success: true,
                xpGained,
                newLevel: getLevelInfo(this.user.xp).level,
                newAchievements
            };
            
        } catch (error) {
            console.error('Error registrando respuesta:', error);
            return { success: false, error: error.message };
        }
    }
    
    getCurrentStreak() {
        if (!this.user.questionHistory || this.user.questionHistory.length === 0) {
            return 0;
        }
        
        let streak = 0;
        const history = [...this.user.questionHistory].reverse();
        
        for (const record of history) {
            if (record.isCorrect) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    async updateDailyStreak() {
        const today = new Date().toISOString().split('T')[0];
        const lastActive = this.user.lastActive.split('T')[0];
        
        if (lastActive === today) {
            // Ya activo hoy
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastActive === yesterdayStr) {
            // Día consecutivo
            this.user.streak++;
        } else {
            // Rota rota
            this.user.streak = 1;
        }
        
        // Recompensa por streak
        if (this.user.streak >= 3) {
            this.user.coins += this.user.streak * 10;
        }
        
        // Recompensa especial por 7 días
        if (this.user.streak === 7) {
            this.user.gems += 5;
            this.user.xp += 100;
        }
    }
    
    async checkAchievements() {
        const newAchievements = [];
        
        // Logro por nivel
        const levelAchievements = [5, 10, 15, 20];
        levelAchievements.forEach(level => {
            if (this.user.level >= level && !this.user.unlockedAchievements.includes(`level_${level}`)) {
                newAchievements.push({
                    id: `level_${level}`,
                    title: `Nivel ${level} Alcanzado`,
                    description: `Has llegado al nivel ${level}`,
                    icon: '⭐',
                    reward: { coins: level * 50, gems: Math.floor(level / 3) }
                });
                this.user.unlockedAchievements.push(`level_${level}`);
            }
        });
        
        // Logro por precisión
        if (this.user.accuracy >= 90 && !this.user.unlockedAchievements.includes('accuracy_90')) {
            newAchievements.push({
                id: 'accuracy_90',
                title: 'Precisión Sobresaliente',
                description: 'Mantén más del 90% de precisión',
                icon: '🎯',
                reward: { coins: 300, gems: 15 }
            });
            this.user.unlockedAchievements.push('accuracy_90');
        }
        
        // Logro por streak
        if (this.user.streak >= 30 && !this.user.unlockedAchievements.includes('streak_30')) {
            newAchievements.push({
                id: 'streak_30',
                title: 'Compromiso Total',
                description: '30 días consecutivos practicando',
                icon: '🔥',
                reward: { coins: 500, gems: 25 }
            });
            this.user.unlockedAchievements.push('streak_30');
        }
        
        // Logro por preguntas
        const questionMilestones = [100, 500, 1000, 5000];
        questionMilestones.forEach(milestone => {
            if (this.user.totalQuestions >= milestone && 
                !this.user.unlockedAchievements.includes(`questions_${milestone}`)) {
                newAchievements.push({
                    id: `questions_${milestone}`,
                    title: `${milestone} Preguntas`,
                    description: `Has completado ${milestone} preguntas`,
                    icon: '📚',
                    reward: { coins: milestone / 2, gems: Math.floor(milestone / 200) }
                });
                this.user.unlockedAchievements.push(`questions_${milestone}`);
            }
        });
        
        // Aplicar recompensas
        newAchievements.forEach(achievement => {
            if (achievement.reward) {
                this.user.coins += achievement.reward.coins || 0;
                this.user.gems += achievement.reward.gems || 0;
            }
            this.user.achievements.unshift(achievement);
        });
        
        // Limitar logros guardados
        if (this.user.achievements.length > 50) {
            this.user.achievements = this.user.achievements.slice(0, 50);
        }
        
        return newAchievements;
    }
    
    async startPracticeSession(config = {}) {
        const sessionId = `session_${Date.now()}`;
        
        const session = {
            id: sessionId,
            type: config.mode || 'practice',
            startTime: new Date().toISOString(),
            questions: [],
            config: {
                questionCount: config.questionCount || 20,
                focusAreas: config.focusAreas || [],
                timeLimit: config.timeLimit || null,
                difficulty: config.difficulty || 'adaptive'
            },
            stats: {
                correct: 0,
                incorrect: 0,
                total: 0,
                timeSpent: 0,
                xpEarned: 0
            }
        };
        
        this.sessionData.currentSession = session;
        this.saveSessionData();
        
        return session;
    }
    
    async endPracticeSession() {
        if (!this.sessionData.currentSession) return;
        
        const session = this.sessionData.currentSession;
        session.endTime = new Date().toISOString();
        session.completed = true;
        
        // Guardar en historial
        this.user.sessionHistory.unshift(session);
        
        // Limitar historial
        if (this.user.sessionHistory.length > CONFIG.STORAGE.LIMITS.maxSessions) {
            this.user.sessionHistory = this.user.sessionHistory.slice(
                0, CONFIG.STORAGE.LIMITS.maxSessions
            );
        }
        
        // Limpiar sesión actual
        this.sessionData.currentSession = null;
        this.saveSessionData();
        
        await this.saveUserData();
        
        return session;
    }
    
    getSectionPerformance() {
        const sections = {};
        
        Object.keys(this.user.sections).forEach(section => {
            const data = this.user.sections[section];
            sections[section] = {
                accuracy: data.accuracy || 0,
                questions: data.questions || 0,
                correct: data.correct || 0,
                timeSpent: data.timeSpent || 0,
                lastPracticed: data.lastPracticed
            };
        });
        
        return sections;
    }
    
    getWeakAreas(limit = 3) {
        const weakAreas = [];
        
        // Por categoría
        Object.entries(this.user.categories).forEach(([category, data]) => {
            if (data.questions >= 5 && data.accuracy < 70) {
                weakAreas.push({
                    type: 'category',
                    name: category,
                    accuracy: data.accuracy,
                    questions: data.questions,
                    priority: 70 - data.accuracy,
                    lastPracticed: data.lastPracticed
                });
            }
        });
        
        // Por sección
        Object.entries(this.user.sections).forEach(([section, data]) => {
            if (data.questions >= 10 && data.accuracy < 70) {
                weakAreas.push({
                    type: 'section',
                    name: section,
                    accuracy: data.accuracy,
                    questions: data.questions,
                    priority: 70 - data.accuracy,
                    lastPracticed: data.lastPracticed
                });
            }
        });
        
        // Ordenar por prioridad (mayor primero)
        weakAreas.sort((a, b) => b.priority - a.priority);
        
        return weakAreas.slice(0, limit);
    }
    
    getUserProgress() {
        const levelInfo = getLevelInfo(this.user.xp);
        const weakAreas = this.getWeakAreas();
        const sectionPerformance = this.getSectionPerformance();
        
        return {
            // Información básica
            username: this.user.username,
            level: levelInfo.level,
            levelName: levelInfo.name,
            currentXP: this.user.xp,
            nextLevelXP: levelInfo.nextLevelXP,
            levelProgress: levelInfo.progress,
            
            // Estadísticas
            totalQuestions: this.user.totalQuestions,
            correctAnswers: this.user.correctAnswers,
            accuracy: this.user.accuracy || 0,
            averageTime: this.user.averageTime || 0,
            totalTime: Math.round(this.user.totalTimeSpent / 3600), // Horas
            
            // Puntuaciones
            estimatedScore: this.user.estimatedScore,
            mathScore: this.user.mathScore,
            readingScore: this.user.readingScore,
            writingScore: this.user.writingScore,
            
            // Progreso
            streak: this.user.streak,
            currentStreak: this.user.currentStreak,
            bestStreak: this.user.bestStreak,
            
            // Recursos
            coins: this.user.coins,
            gems: this.user.gems,
            
            // Áreas de mejora
            weakAreas,
            sectionPerformance,
            
            // Logros recientes
            recentAchievements: this.user.achievements.slice(0, 5),
            
            // Metas
            goals: this.user.goals,
            
            // Metadata
            lastActive: this.user.lastActive,
            daysActive: this.calculateDaysActive()
        };
    }
    
    calculateDaysActive() {
        if (!this.user.createdAt) return 0;
        
        const created = new Date(this.user.createdAt);
        const today = new Date();
        const diffTime = Math.abs(today - created);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    getFallbackQuestion() {
        return {
            id: 'fallback_' + Date.now(),
            section: 'math',
            category: 'algebra',
            difficulty: 'medium',
            text: 'Si 3x + 7 = 22, ¿cuál es el valor de x?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 2, // índice 2 = '5'
            explanation: '3x + 7 = 22 → 3x = 15 → x = 5',
            timeEstimate: 60,
            tags: ['algebra', 'ecuaciones_lineales']
        };
    }
    
    async syncPendingData() {
        // Implementar sincronización con backend si es necesario
        return true;
    }
    
    async loadActiveSession() {
        try {
            const saved = sessionStorage.getItem('current_session');
            if (saved) {
                this.sessionData.currentSession = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Error cargando sesión activa:', error);
        }
    }
    
    saveSessionData() {
        try {
            if (this.sessionData.currentSession) {
                sessionStorage.setItem(
                    'current_session',
                    JSON.stringify(this.sessionData.currentSession)
                );
            }
        } catch (error) {
            console.warn('Error guardando sesión:', error);
        }
    }
    
    // Métodos de utilidad
    formatCategoryName(category) {
        const names = {
            algebra: 'Álgebra',
            geometry: 'Geometría',
            trigonometry: 'Trigonometría',
            data_analysis: 'Análisis de Datos',
            advanced_math: 'Matemáticas Avanzadas',
            comprehension: 'Comprensión Lectora',
            vocabulary: 'Vocabulario',
            evidence: 'Evidencia Textual',
            grammar: 'Gramática',
            punctuation: 'Puntuación',
            sentence_structure: 'Estructura de Oraciones'
        };
        
        return names[category] || category.replace(/_/g, ' ');
    }
    
    resetProgress() {
        if (confirm('¿Estás seguro de querer reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(CONFIG.STORAGE.KEYS.userProgress);
            sessionStorage.clear();
            window.location.reload();
        }
    }
    
    exportUserData() {
        const data = {
            user: this.user,
            session: this.sessionData.currentSession,
            exportDate: new Date().toISOString(),
            version: CONFIG.APP_VERSION
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sat-owl-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Export singleton para fácil acceso
export const dataService = new DataService();
export default DataService;