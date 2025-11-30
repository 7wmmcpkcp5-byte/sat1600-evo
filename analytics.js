// analytics.js - Sistema de analytics profesional e inteligente
class AnalyticsManager {
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
    }

    initializeStats() {
        const defaultStats = {
            // Métricas básicas
            totalSessions: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalTimeSpent: 0, // en segundos
            
            // Rendimiento por sección
            bySection: {
                math: { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 },
                reading: { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 },
                writing: { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 }
            },
            
            // Rendimiento por categoría
            byCategory: {
                algebra: { correct: 0, total: 0 },
                geometry: { correct: 0, total: 0 },
                comprehension: { correct: 0, total: 0 },
                grammar: { correct: 0, total: 0 }
            },
            
            // Tendencias temporales
            dailyProgress: {},
            weeklyTrends: {},
            
            // Logros y metas
            currentStreak: 0,
            bestStreak: 0,
            achievements: [],
            goals: {},
            
            // Metadatos
            firstSession: new Date().toISOString(),
            lastSession: null,
            version: '2.0'
        };

        try {
            const saved = localStorage.getItem('sat_owl_analytics_v2');
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
        // Migración de versión 1.x a 2.0
        if (!oldStats.version || oldStats.version === '1.0') {
            return {
                ...defaultStats,
                ...oldStats,
                byCategory: oldStats.byCategory || defaultStats.byCategory,
                version: '2.0'
            };
        }
        return { ...defaultStats, ...oldStats };
    }

    startNewSession() {
        return {
            startTime: Date.now(),
            questions: [],
            currentStreak: 0,
            section: null,
            goals: this.generateSessionGoals()
        };
    }

    generateSessionGoals() {
        return {
            targetQuestions: 10,
            targetAccuracy: 70,
            timeLimit: 1800 // 30 minutos
        };
    }

    // === REGISTRO DE DATOS ===
    recordQuestion(section, category, questionId, wasCorrect, timeSpent, difficulty) {
        const timestamp = Date.now();
        
        // Actualizar estadísticas generales
        this.stats.totalQuestions++;
        if (wasCorrect) this.stats.totalCorrect++;
        this.stats.totalTimeSpent += timeSpent;

        // Actualizar por sección
        const sectionStats = this.stats.bySection[section] || { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 };
        sectionStats.total++;
        if (wasCorrect) {
            sectionStats.correct++;
            this.session.currentStreak++;
            this.stats.currentStreak++;
            
            // Actualizar mejor racha
            if (this.stats.currentStreak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.currentStreak;
            }
            if (this.session.currentStreak > sectionStats.bestStreak) {
                sectionStats.bestStreak = this.session.currentStreak;
            }
        } else {
            this.session.currentStreak = 0;
            this.stats.currentStreak = 0;
        }
        sectionStats.timeSpent += timeSpent;
        this.stats.bySection[section] = sectionStats;

        // Actualizar por categoría
        const categoryStats = this.stats.byCategory[category] || { correct: 0, total: 0 };
        categoryStats.total++;
        if (wasCorrect) categoryStats.correct++;
        this.stats.byCategory[category] = categoryStats;

        // Registrar en sesión actual
        this.session.questions.push({
            id: questionId,
            section,
            category,
            correct: wasCorrect,
            timeSpent,
            difficulty,
            timestamp
        });

        // Actualizar progreso diario
        this.updateDailyProgress(wasCorrect);

        // Generar insights en tiempo real
        if (this.config.generateInsights) {
            this.generateRealTimeInsights();
        }

        // Guardar automáticamente si está configurado
        if (this.config.autoSave) {
            this.saveStats();
        }

        return this.getQuestionFeedback(wasCorrect, timeSpent, difficulty);
    }

    updateDailyProgress(wasCorrect) {
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.stats.dailyProgress[today]) {
            this.stats.dailyProgress[today] = {
                date: today,
                questions: 0,
                correct: 0,
                timeSpent: 0,
                streak: 0
            };
        }

        const daily = this.stats.dailyProgress[today];
        daily.questions++;
        if (wasCorrect) {
            daily.correct++;
            daily.streak++;
        } else {
            daily.streak = 0;
        }
    }

    // === ANÁLISIS E INSIGHTS ===
    generateRealTimeInsights() {
        const insights = {
            performanceTrend: this.analyzePerformanceTrend(),
            weakAreas: this.identifyWeakAreas(),
            studyRecommendations: this.generateStudyRecommendations(),
            timeAnalysis: this.analyzeTimeUsage(),
            achievementProgress: this.checkAchievements()
        };

        this.insights = insights;
        return insights;
    }

    analyzePerformanceTrend() {
        const last7Days = this.getLastNDays(7);
        const accuracyTrend = last7Days.map(day => 
            day.questions > 0 ? (day.correct / day.questions) * 100 : 0
        );

        return {
            trend: accuracyTrend,
            direction: this.calculateTrendDirection(accuracyTrend),
            confidence: this.calculateTrendConfidence(accuracyTrend)
        };
    }

    identifyWeakAreas(threshold = 65) {
        const weakAreas = [];
        
        // Por sección
        Object.entries(this.stats.bySection).forEach(([section, data]) => {
            const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            if (accuracy < threshold && data.total >= 5) {
                weakAreas.push({
                    type: 'section',
                    name: section,
                    accuracy: Math.round(accuracy),
                    priority: this.calculatePriority(accuracy, data.total),
                    recommendation: this.getSectionRecommendation(section)
                });
            }
        });

        // Por categoría
        Object.entries(this.stats.byCategory).forEach(([category, data]) => {
            const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            if (accuracy < threshold && data.total >= 3) {
                weakAreas.push({
                    type: 'category',
                    name: category,
                    accuracy: Math.round(accuracy),
                    priority: this.calculatePriority(accuracy, data.total),
                    recommendation: this.getCategoryRecommendation(category)
                });
            }
        });

        return weakAreas.sort((a, b) => b.priority - a.priority);
    }

    generateStudyRecommendations() {
        const weakAreas = this.identifyWeakAreas();
        const recommendations = [];
        const performance = this.getOverallPerformance();

        // Recomendaciones basadas en áreas débiles
        weakAreas.slice(0, 2).forEach(area => {
            recommendations.push({
                type: 'focus_area',
                priority: area.priority,
                message: `Enfócate en ${area.name}: ${area.recommendation}`,
                action: `practice_${area.name}`
            });
        });

        // Recomendaciones basadas en tiempo
        const avgTimePerQuestion = this.stats.totalQuestions > 0 ? 
            this.stats.totalTimeSpent / this.stats.totalQuestions : 0;
        
        if (avgTimePerQuestion > 90) {
            recommendations.push({
                type: 'time_management',
                priority: 'medium',
                message: 'Practica gestión de tiempo - apunta a <60 segundos por pregunta',
                action: 'timed_practice'
            });
        }

        // Recomendaciones basadas en consistencia
        if (performance.consistency < 0.7) {
            recommendations.push({
                type: 'consistency',
                priority: 'low',
                message: 'Trabaja en consistencia - práctica diaria ayuda',
                action: 'daily_practice'
            });
        }

        return recommendations.slice(0, 3); // Máximo 3 recomendaciones
    }

    // === MÉTRICAS DE RENDIMIENTO ===
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
            consistency: this.calculateConsistency(),
            efficiency: this.calculateEfficiency(accuracy, avgTime)
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
                proficiency: this.calculateProficiencyLevel(accuracy, data.total)
            };
        });

        return sections;
    }

    calculateProficiencyLevel(accuracy, totalQuestions) {
        if (totalQuestions < 5) return 'beginner';
        if (accuracy >= 85) return 'advanced';
        if (accuracy >= 70) return 'intermediate';
        if (accuracy >= 50) return 'basic';
        return 'needs_work';
    }

    // === PREDICCIONES Y TENDENCIAS ===
    predictFuturePerformance(days = 30) {
        const historicalData = this.getLastNDays(14);
        if (historicalData.length < 5) return null;

        const accuracyTrend = historicalData.map(day => 
            day.questions > 0 ? day.correct / day.questions : 0
        );

        const predictedAccuracy = this.calculateLinearProjection(accuracyTrend);
        const confidence = this.calculatePredictionConfidence(historicalData);

        return {
            predictedAccuracy: Math.round(predictedAccuracy * 100),
            confidence: Math.round(confidence * 100),
            timeline: days,
            message: this.getPredictionMessage(predictedAccuracy, confidence)
        };
    }

    getPredictionMessage(accuracy, confidence) {
        if (accuracy >= 0.8) {
            return confidence >= 0.7 ? 
                "¡Vas rumbo a un excelente resultado! 🎯" :
                "Tienes potencial para un gran resultado con práctica consistente 💪";
        } else if (accuracy >= 0.6) {
            return "Buen progreso. Enfócate en áreas débiles para mejorar 📈";
        } else {
            return "Enfócate en fundamentales y práctica consistente 🌱";
        }
    }

    // === LOGRROS Y MOTIVACIÓN ===
    checkAchievements() {
        const achievements = [];
        const performance = this.getOverallPerformance();

        // Logro por precisión
        if (performance.accuracy >= 90 && this.stats.totalQuestions >= 20) {
            achievements.push({
                id: 'accuracy_expert',
                name: '🎯 Experto en Precisión',
                description: 'Mantén más del 90% de precisión en 20+ preguntas',
                unlocked: true,
                progress: 100
            });
        }

        // Logro por racha
        if (this.stats.bestStreak >= 10) {
            achievements.push({
                id: 'streak_master',
                name: '🔥 Maestro de Rachas',
                description: 'Logra una racha de 10 respuestas correctas consecutivas',
                unlocked: true,
                progress: 100
            });
        }

        // Logro por consistencia
        if (Object.keys(this.stats.dailyProgress).length >= 7) {
            achievements.push({
                id: 'consistent_learner',
                name: '📅 Estudiante Consistente',
                description: 'Practica durante 7 días consecutivos',
                unlocked: true,
                progress: 100
            });
        }

        return achievements;
    }

    // === REPORTES Y EXPORTACIÓN ===
    generateProgressReport() {
        const performance = this.getOverallPerformance();
        const sections = this.getSectionPerformance();
        const insights = this.generateRealTimeInsights();
        const predictions = this.predictFuturePerformance();

        return {
            summary: {
                date: new Date().toISOString(),
                overallAccuracy: performance.accuracy,
                totalPracticeTime: this.formatTime(this.stats.totalTimeSpent),
                currentLevel: this.calculateOverallLevel(performance.accuracy)
            },
            sectionBreakdown: sections,
            insights: insights,
            predictions: predictions,
            recommendations: insights.studyRecommendations,
            achievements: this.checkAchievements()
        };
    }

    // === UTILIDADES ===
    getLastNDays(n) {
        const days = [];
        for (let i = 0; i < n; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            days.push(this.stats.dailyProgress[dateString] || {
                date: dateString,
                questions: 0,
                correct: 0,
                timeSpent: 0,
                streak: 0
            });
        }
        return days.reverse();
    }

    calculateTrendDirection(trend) {
        if (trend.length < 2) return 'stable';
        const first = trend[0];
        const last = trend[trend.length - 1];
        return last > first + 5 ? 'improving' : last < first - 5 ? 'declining' : 'stable';
    }

    calculatePriority(accuracy, totalQuestions) {
        const accuracyWeight = (100 - accuracy) / 100;
        const volumeWeight = Math.min(totalQuestions / 10, 1);
        return Math.round((accuracyWeight * 0.7 + volumeWeight * 0.3) * 100);
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }

    // === PERSISTENCIA ===
    saveStats() {
        try {
            this.stats.lastSession = new Date().toISOString();
            localStorage.setItem('sat_owl_analytics_v2', JSON.stringify(this.stats));
        } catch (error) {
            console.error('Error saving analytics:', error);
        }
    }

    loadHistoricalData() {
        // Cargar datos históricos para análisis de tendencias
        try {
            const historical = localStorage.getItem('sat_owl_analytics_historical');
            if (historical) {
                this.historicalData = JSON.parse(historical);
            }
        } catch (error) {
            console.error('Error loading historical data:', error);
        }
    }

    exportData() {
        return {
            stats: this.stats,
            session: this.session,
            insights: this.insights,
            exportedAt: new Date().toISOString(),
            version: '2.0'
        };
    }

    resetData() {
        this.stats = this.initializeStats();
        this.session = this.startNewSession();
        this.saveStats();
    }
}

export { AnalyticsManager };