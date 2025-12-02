// analytics-manager.js - COMPLETO Y FUNCIONAL
import { CONFIG } from './config.js';

export class AnalyticsManager {
    constructor() {
        this.stats = this.initializeStats();
        this.session = this.startNewSession();
        this.insights = {};
        this.config = {
            autoSave: true,
            trackPatterns: true,
            generateInsights: true
        };
        
        this.loadHistoricalData();
        this.setupAutoSave();
    }

    initializeStats() {
        const defaultStats = {
            totalSessions: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalTimeSpent: 0,
            correctQuestions: 0,
            
            bySection: {
                math: { 
                    correct: 0, 
                    total: 0, 
                    timeSpent: 0, 
                    bestStreak: 0,
                    currentStreak: 0,
                    lastAnswered: null,
                    accuracy: 0
                },
                reading: { 
                    correct: 0, 
                    total: 0, 
                    timeSpent: 0, 
                    bestStreak: 0,
                    currentStreak: 0,
                    lastAnswered: null,
                    accuracy: 0
                },
                writing: { 
                    correct: 0, 
                    total: 0, 
                    timeSpent: 0, 
                    bestStreak: 0,
                    currentStreak: 0,
                    lastAnswered: null,
                    accuracy: 0
                }
            },
            
            byCategory: {
                algebra: { correct: 0, total: 0, accuracy: 0 },
                geometry: { correct: 0, total: 0, accuracy: 0 },
                comprehension: { correct: 0, total: 0, accuracy: 0 },
                grammar: { correct: 0, total: 0, accuracy: 0 },
                data_analysis: { correct: 0, total: 0, accuracy: 0 },
                advanced_math: { correct: 0, total: 0, accuracy: 0 }
            },
            
            byDifficulty: {
                easy: { correct: 0, total: 0, accuracy: 0 },
                medium: { correct: 0, total: 0, accuracy: 0 },
                hard: { correct: 0, total: 0, accuracy: 0 }
            },
            
            dailyProgress: {},
            weeklyTrends: {},
            
            currentStreak: 0,
            bestStreak: 0,
            streak: 0,
            streakDays: [],
            
            achievements: [],
            unlockedAchievements: [],
            goals: {
                dailyQuestions: 10,
                weeklyAccuracy: 75,
                monthlySessions: 20
            },
            
            sessionHistory: [],
            questionHistory: [],
            
            firstSession: new Date().toISOString(),
            lastSession: null,
            lastUpdated: null,
            version: '2.1'
        };

        try {
            const saved = localStorage.getItem(CONFIG.storageKeys.analytics);
            if (saved) {
                const parsed = JSON.parse(saved);
                return this.migrateStats(parsed, defaultStats);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        }

        return defaultStats;
    }

    migrateStats(oldStats, defaultStats) {
        // Migración de versiones anteriores
        const migrated = { ...defaultStats, ...oldStats };
        
        // Migrar estructura antigua a nueva
        if (oldStats.version === '1.0') {
            // Convertir estructura antigua
            if (oldStats.bySection) {
                Object.keys(defaultStats.bySection).forEach(section => {
                    if (oldStats.bySection[section]) {
                        migrated.bySection[section] = {
                            ...defaultStats.bySection[section],
                            ...oldStats.bySection[section]
                        };
                    }
                });
            }
            
            // Migrar correctQuestions si no existe
            if (!migrated.correctQuestions && migrated.totalCorrect) {
                migrated.correctQuestions = migrated.totalCorrect;
            }
            
            // Migrar streak si no existe
            if (!migrated.streak && migrated.currentStreak) {
                migrated.streak = migrated.currentStreak;
            }
        }
        
        // Asegurar que todas las secciones tengan la estructura completa
        Object.keys(migrated.bySection).forEach(section => {
            if (!migrated.bySection[section].accuracy) {
                const sectionData = migrated.bySection[section];
                migrated.bySection[section].accuracy = sectionData.total > 0 ? 
                    (sectionData.correct / sectionData.total) * 100 : 0;
            }
        });
        
        migrated.version = defaultStats.version;
        migrated.lastUpdated = new Date().toISOString();
        
        return migrated;
    }

    startNewSession() {
        const session = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            startTime: new Date().toISOString(),
            endTime: null,
            questionsAnswered: 0,
            correctAnswers: 0,
            sections: {},
            duration: 0
        };
        
        this.stats.sessionHistory.push(session);
        this.stats.totalSessions++;
        this.saveStats();
        
        return session;
    }

    endCurrentSession() {
        if (this.session) {
            const endTime = new Date();
            const startTime = new Date(this.session.startTime);
            this.session.endTime = endTime.toISOString();
            this.session.duration = (endTime - startTime) / 1000; // en segundos
            
            this.stats.lastSession = endTime.toISOString();
            this.saveStats();
        }
        
        this.session = this.startNewSession();
    }

    recordQuestion(questionData) {
        const {
            section,
            category,
            difficulty,
            isCorrect,
            timeSpent,
            questionId
        } = questionData;
        
        // Actualizar estadísticas generales
        this.stats.totalQuestions++;
        if (isCorrect) {
            this.stats.totalCorrect++;
            this.stats.correctQuestions++;
        }
        this.stats.totalTimeSpent += timeSpent;
        
        // Actualizar por sección
        if (section && this.stats.bySection[section]) {
            const sectionData = this.stats.bySection[section];
            sectionData.total++;
            if (isCorrect) {
                sectionData.correct++;
                sectionData.currentStreak++;
                if (sectionData.currentStreak > sectionData.bestStreak) {
                    sectionData.bestStreak = sectionData.currentStreak;
                }
            } else {
                sectionData.currentStreak = 0;
            }
            sectionData.timeSpent += timeSpent;
            sectionData.lastAnswered = new Date().toISOString();
            sectionData.accuracy = (sectionData.correct / sectionData.total) * 100;
        }
        
        // Actualizar por categoría
        if (category && this.stats.byCategory[category]) {
            const categoryData = this.stats.byCategory[category];
            categoryData.total++;
            if (isCorrect) categoryData.correct++;
            categoryData.accuracy = (categoryData.correct / categoryData.total) * 100;
        }
        
        // Actualizar por dificultad
        if (difficulty && this.stats.byDifficulty[difficulty]) {
            const difficultyData = this.stats.byDifficulty[difficulty];
            difficultyData.total++;
            if (isCorrect) difficultyData.correct++;
            difficultyData.accuracy = (difficultyData.correct / difficultyData.total) * 100;
        }
        
        // Actualizar streak global
        if (isCorrect) {
            this.stats.currentStreak++;
            this.stats.streak++;
            if (this.stats.currentStreak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.currentStreak;
            }
        } else {
            this.stats.currentStreak = 0;
            this.stats.streak = 0;
        }
        
        // Registrar en historial de preguntas
        this.stats.questionHistory.push({
            id: questionId,
            section,
            category,
            difficulty,
            isCorrect,
            timeSpent,
            timestamp: new Date().toISOString()
        });
        
        // Limitar historial a 1000 preguntas
        if (this.stats.questionHistory.length > 1000) {
            this.stats.questionHistory = this.stats.questionHistory.slice(-1000);
        }
        
        // Actualizar sesión actual
        if (this.session) {
            this.session.questionsAnswered++;
            if (isCorrect) this.session.correctAnswers++;
            
            if (!this.session.sections[section]) {
                this.session.sections[section] = { answered: 0, correct: 0 };
            }
            this.session.sections[section].answered++;
            if (isCorrect) this.session.sections[section].correct++;
        }
        
        // Actualizar progreso diario
        this.updateDailyProgress(isCorrect);
        
        // Generar insights
        if (this.config.generateInsights) {
            this.generateInsights();
        }
        
        // Verificar logros
        this.checkAchievements();
        
        this.saveStats();
        
        return this.getQuestionStats();
    }

    updateDailyProgress(isCorrect) {
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.stats.dailyProgress[today]) {
            this.stats.dailyProgress[today] = {
                date: today,
                questions: 0,
                correct: 0,
                timeSpent: 0,
                sections: {}
            };
            
            // Limitar a 90 días
            const dates = Object.keys(this.stats.dailyProgress);
            if (dates.length > 90) {
                const oldest = dates.sort()[0];
                delete this.stats.dailyProgress[oldest];
            }
            
            // Actualizar streak de días consecutivos
            this.updateStreakDays(today);
        }
        
        const daily = this.stats.dailyProgress[today];
        daily.questions++;
        if (isCorrect) daily.correct++;
    }

    updateStreakDays(today) {
        const dates = Object.keys(this.stats.dailyProgress).sort();
        
        if (dates.length === 0) {
            this.stats.streakDays = [today];
            this.stats.currentStreak = 1;
            return;
        }
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (dates.includes(yesterdayStr)) {
            this.stats.streakDays.push(today);
            this.stats.currentStreak++;
        } else {
            this.stats.streakDays = [today];
            this.stats.currentStreak = 1;
        }
        
        if (this.stats.currentStreak > this.stats.bestStreak) {
            this.stats.bestStreak = this.stats.currentStreak;
        }
    }

    generateInsights() {
        const insights = {};
        
        // 1. Rendimiento por sección
        insights.sectionPerformance = {};
        Object.entries(this.stats.bySection).forEach(([section, data]) => {
            if (data.total > 0) {
                insights.sectionPerformance[section] = {
                    accuracy: Math.round(data.accuracy),
                    improvement: this.calculateImprovement(section),
                    recommendation: this.getSectionRecommendation(section, data)
                };
            }
        });
        
        // 2. Áreas débiles
        insights.weakAreas = this.identifyWeakAreas();
        
        // 3. Patrones de tiempo
        insights.timePatterns = this.analyzeTimePatterns();
        
        // 4. Recomendaciones de estudio
        insights.studyRecommendations = this.generateStudyRecommendations();
        
        // 5. Predicción de puntaje
        insights.scorePrediction = this.predictScore();
        
        this.insights = insights;
        return insights;
    }

    identifyWeakAreas() {
        const weakAreas = [];
        const threshold = 70; // Por debajo del 70% se considera débil
        
        // Por categoría
        Object.entries(this.stats.byCategory).forEach(([category, data]) => {
            if (data.total >= 5 && data.accuracy < threshold) {
                weakAreas.push({
                    type: 'category',
                    name: this.formatCategoryName(category),
                    accuracy: Math.round(data.accuracy),
                    totalQuestions: data.total,
                    priority: threshold - data.accuracy // Mayor prioridad para menor precisión
                });
            }
        });
        
        // Por dificultad
        Object.entries(this.stats.byDifficulty).forEach(([difficulty, data]) => {
            if (data.total >= 3 && data.accuracy < threshold) {
                weakAreas.push({
                    type: 'difficulty',
                    name: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
                    accuracy: Math.round(data.accuracy),
                    totalQuestions: data.total,
                    priority: threshold - data.accuracy
                });
            }
        });
        
        // Ordenar por prioridad (mayor primero)
        return weakAreas.sort((a, b) => b.priority - a.priority);
    }

    generateStudyRecommendations() {
        const recommendations = [];
        const weakAreas = this.identifyWeakAreas();
        
        // Recomendaciones basadas en áreas débiles
        weakAreas.forEach(area => {
            let recommendation = '';
            
            if (area.type === 'category') {
                recommendation = `Enfócate en ${area.name}. `;
                
                if (area.accuracy < 50) {
                    recommendation += `Tu precisión es muy baja (${area.accuracy}%). `;
                    recommendation += "Recomendamos repasar los conceptos básicos primero.";
                } else if (area.accuracy < 70) {
                    recommendation += `Necesitas mejorar (${area.accuracy}%). `;
                    recommendation += "Practica más ejercicios de este tipo.";
                } else {
                    recommendation += `Casi lo logras (${area.accuracy}%). `;
                    recommendation += "Un poco más de práctica y estarás listo.";
                }
            } else if (area.type === 'difficulty') {
                recommendation = `Dificultad ${area.name}: `;
                recommendation += `Precisión: ${area.accuracy}%. `;
                
                if (area.name === 'hard') {
                    recommendation += "Estas preguntas requieren más tiempo y concentración.";
                }
            }
            
            if (recommendation) {
                recommendations.push({
                    area: area.name,
                    recommendation: recommendation,
                    priority: area.priority
                });
            }
        });
        
        // Recomendaciones generales
        const totalAccuracy = this.stats.totalQuestions > 0 ? 
            (this.stats.totalCorrect / this.stats.totalQuestions) * 100 : 0;
        
        if (totalAccuracy < 60) {
            recommendations.push({
                area: 'General',
                recommendation: "Tu precisión general es baja. Considera repasar conceptos fundamentales antes de continuar.",
                priority: 100
            });
        }
        
        // Recomendación de tiempo
        const avgTime = this.stats.totalQuestions > 0 ? 
            this.stats.totalTimeSpent / this.stats.totalQuestions : 0;
        
        if (avgTime > 120) { // Más de 2 minutos por pregunta
            recommendations.push({
                area: 'Gestión del Tiempo',
                recommendation: "Estás tomando mucho tiempo por pregunta. Practica con temporizador para mejorar tu velocidad.",
                priority: 80
            });
        }
        
        return recommendations.sort((a, b) => b.priority - a.priority);
    }

    getOverallPerformance() {
        const total = this.stats.totalQuestions;
        const correct = this.stats.totalCorrect;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        const avgTime = total > 0 ? this.stats.totalTimeSpent / total : 0;

        return {
            accuracy: Math.round(accuracy),
            totalQuestions: total,
            correctAnswers: correct,
            averageTime: Math.round(avgTime),
            currentStreak: this.stats.currentStreak,
            bestStreak: this.stats.bestStreak,
            totalTimeSpent: Math.round(this.stats.totalTimeSpent),
            totalSessions: this.stats.totalSessions,
            daysActive: Object.keys(this.stats.dailyProgress).length
        };
    }

    getSectionPerformance() {
        const sections = {};
        
        Object.entries(this.stats.bySection).forEach(([section, data]) => {
            const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            const avgTime = data.total > 0 ? data.timeSpent / data.total : 0;
            
            sections[section] = {
                accuracy: Math.round(accuracy),
                total: data.total,
                correct: data.correct,
                averageTime: Math.round(avgTime),
                bestStreak: data.bestStreak,
                currentStreak: data.currentStreak,
                timeSpent: Math.round(data.timeSpent)
            };
        });

        return sections;
    }

    getCategoryPerformance() {
        const categories = {};
        
        Object.entries(this.stats.byCategory).forEach(([category, data]) => {
            if (data.total > 0) {
                categories[category] = {
                    accuracy: Math.round(data.accuracy),
                    total: data.total,
                    correct: data.correct
                };
            }
        });

        return categories;
    }

    getProgressOverTime(days = 30) {
        const dailyData = Object.entries(this.stats.dailyProgress)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .slice(-days);
        
        return dailyData.map(([date, data]) => ({
            date,
            accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
            questions: data.questions,
            correct: data.correct
        }));
    }

    predictScore() {
        // Predicción simple basada en rendimiento actual
        const sectionPerformance = this.getSectionPerformance();
        let totalScore = 0;
        let sectionCount = 0;
        
        Object.values(sectionPerformance).forEach(section => {
            if (section.total > 10) { // Solo si hay suficiente data
                totalScore += section.accuracy;
                sectionCount++;
            }
        });
        
        if (sectionCount === 0) return null;
        
        const avgAccuracy = totalScore / sectionCount;
        
        // Convertir a escala SAT (400-1600)
        // Esta es una estimación simple - ajustar según datos reales
        const satScore = 400 + (avgAccuracy / 100) * 1200;
        
        return {
            estimatedScore: Math.round(satScore),
            confidence: Math.min(100, Math.max(20, sectionCount * 20)), // 20-100%
            basedOnQuestions: this.stats.totalQuestions,
            recommendation: this.getScoreRecommendation(satScore)
        };
    }

    getScoreRecommendation(estimatedScore) {
        if (estimatedScore < 1000) {
            return "Enfócate en conceptos básicos y práctica regular.";
        } else if (estimatedScore < 1300) {
            return "Buen progreso. Trabaja en áreas específicas para mejorar.";
        } else if (estimatedScore < 1500) {
            return "Excelente rendimiento. Enfócate en preguntas difíciles y gestión del tiempo.";
        } else {
            return "Rendimiento excepcional. Mantén la práctica y revisa errores ocasionales.";
        }
    }

    checkAchievements() {
        const achievements = [];
        
        // Logro por primera sesión
        if (this.stats.totalSessions === 1 && !this.stats.unlockedAchievements.includes('first_session')) {
            achievements.push({
                id: 'first_session',
                title: 'Primer Paso',
                description: 'Completaste tu primera sesión de estudio',
                icon: '🎯',
                unlocked: new Date().toISOString()
            });
        }
        
        // Logro por precisión
        const accuracy = this.stats.totalQuestions > 0 ? 
            (this.stats.totalCorrect / this.stats.totalQuestions) * 100 : 0;
        
        if (accuracy >= 80 && this.stats.totalQuestions >= 20 && 
            !this.stats.unlockedAchievements.includes('accuracy_80')) {
            achievements.push({
                id: 'accuracy_80',
                title: 'Precisión Excelente',
                description: 'Lograste 80% de precisión en 20+ preguntas',
                icon: '⭐',
                unlocked: new Date().toISOString()
            });
        }
        
        // Logro por racha
        if (this.stats.currentStreak >= 7 && 
            !this.stats.unlockedAchievements.includes('week_streak')) {
            achievements.push({
                id: 'week_streak',
                title: 'Racha Semanal',
                description: '7 días consecutivos practicando',
                icon: '🔥',
                unlocked: new Date().toISOString()
            });
        }
        
        // Agregar nuevos logros
        achievements.forEach(achievement => {
            if (!this.stats.unlockedAchievements.includes(achievement.id)) {
                this.stats.achievements.push(achievement);
                this.stats.unlockedAchievements.push(achievement.id);
            }
        });
        
        return achievements;
    }

    getQuestionStats() {
        return {
            total: this.stats.totalQuestions,
            correct: this.stats.totalCorrect,
            accuracy: this.stats.totalQuestions > 0 ? 
                Math.round((this.stats.totalCorrect / this.stats.totalQuestions) * 100) : 0,
            averageTime: this.stats.totalQuestions > 0 ? 
                Math.round(this.stats.totalTimeSpent / this.stats.totalQuestions) : 0
        };
    }

    calculateImprovement(section) {
        // Calcular mejora comparando últimas 10 preguntas con las 10 anteriores
        const sectionQuestions = this.stats.questionHistory
            .filter(q => q.section === section)
            .slice(-20); // Últimas 20 preguntas
        
        if (sectionQuestions.length < 20) return 0;
        
        const recent = sectionQuestions.slice(-10);
        const previous = sectionQuestions.slice(0, 10);
        
        const recentCorrect = recent.filter(q => q.isCorrect).length;
        const previousCorrect = previous.filter(q => q.isCorrect).length;
        
        const recentAccuracy = (recentCorrect / 10) * 100;
        const previousAccuracy = (previousCorrect / 10) * 100;
        
        return Math.round(recentAccuracy - previousAccuracy);
    }

    getSectionRecommendation(section, data) {
        if (data.total < 5) {
            return `Necesitas más práctica en ${section}. Responde al menos 5 preguntas.`;
        }
        
        if (data.accuracy < 60) {
            return `Tu precisión en ${section} es baja (${Math.round(data.accuracy)}%). Repasa conceptos básicos.`;
        } else if (data.accuracy < 80) {
            return `Buen progreso en ${section} (${Math.round(data.accuracy)}%). Continúa practicando.`;
        } else {
            return `Excelente en ${section} (${Math.round(data.accuracy)}%)! Mantén el nivel.`;
        }
    }

    analyzeTimePatterns() {
        const patterns = {};
        
        // Agrupar por hora del día
        const hourGroups = {};
        this.stats.questionHistory.forEach(q => {
            const hour = new Date(q.timestamp).getHours();
            const key = `${hour}:00`;
            
            if (!hourGroups[key]) hourGroups[key] = { correct: 0, total: 0, timeSpent: 0 };
            hourGroups[key].total++;
            if (q.isCorrect) hourGroups[key].correct++;
            hourGroups[key].timeSpent += q.timeSpent;
        });
        
        patterns.byHour = Object.entries(hourGroups).map(([hour, data]) => ({
            hour,
            accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
            avgTime: data.total > 0 ? Math.round(data.timeSpent / data.total) : 0,
            questions: data.total
        }));
        
        // Encontrar mejor hora para estudiar
        const bestHour = patterns.byHour.reduce((best, current) => {
            return (current.accuracy > best.accuracy) ? current : best;
        }, { accuracy: 0, hour: '' });
        
        patterns.bestStudyTime = bestHour.hour || 'No hay suficiente data';
        
        return patterns;
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

    loadHistoricalData() {
        // Cargar datos históricos adicionales si existen
        try {
            const history = localStorage.getItem(CONFIG.storageKeys.history);
            if (history) {
                const parsed = JSON.parse(history);
                // Integrar con estadísticas actuales si es necesario
                console.log('Historical data loaded:', parsed.length, 'records');
            }
        } catch (error) {
            console.error('Error loading historical data:', error);
        }
    }

    saveStats() {
        if (this.config.autoSave) {
            try {
                this.stats.lastUpdated = new Date().toISOString();
                localStorage.setItem(
                    CONFIG.storageKeys.analytics, 
                    JSON.stringify(this.stats)
                );
            } catch (error) {
                console.error('Error saving analytics:', error);
            }
        }
    }

    setupAutoSave() {
        // Guardar automáticamente cada 30 segundos si hay cambios
        setInterval(() => {
            if (this.stats.lastUpdated) {
                const lastUpdate = new Date(this.stats.lastUpdated);
                const now = new Date();
                if ((now - lastUpdate) < 30000) { // Cambios en los últimos 30 segundos
                    this.saveStats();
                }
            }
        }, 30000);
        
        // Guardar al cerrar la ventana
        window.addEventListener('beforeunload', () => this.saveStats());
    }

    exportData(format = 'json') {
        const data = {
            stats: this.stats,
            insights: this.insights,
            session: this.session,
            exported: new Date().toISOString()
        };
        
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'csv') {
            // Convertir a CSV simple
            let csv = 'Metric,Value\n';
            csv += `Total Questions,${this.stats.totalQuestions}\n`;
            csv += `Total Correct,${this.stats.totalCorrect}\n`;
            csv += `Overall Accuracy,${this.getOverallPerformance().accuracy}%\n`;
            csv += `Total Time Spent,${Math.round(this.stats.totalTimeSpent)}s\n`;
            csv += `Current Streak,${this.stats.currentStreak}\n`;
            csv += `Best Streak,${this.stats.bestStreak}\n`;
            return csv;
        }
        
        return data;
    }

    resetStats() {
        if (confirm('¿Estás seguro de que quieres resetear todas las estadísticas? Esto no se puede deshacer.')) {
            this.stats = this.initializeStats();
            this.session = this.startNewSession();
            this.insights = {};
            localStorage.removeItem(CONFIG.storageKeys.analytics);
            return true;
        }
        return false;
    }

    // Métodos de conveniencia para compatibilidad
    getStudyRecommendations() {
        return this.generateStudyRecommendations();
    }

    getWeakAreas() {
        return this.identifyWeakAreas();
    }
}