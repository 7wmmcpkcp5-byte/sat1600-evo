// parent-dashboard.js - VERSIÓN COMPLETA Y CORREGIDA
import { CONFIG } from './config.js';

export class ParentDashboard {
    constructor(analytics, dataService) {
        // ✅ RECIBIR INSTANCIAS POR PARÁMETRO para evitar dependencias circulares
        this.analytics = analytics;
        this.dataService = dataService;
        this.insights = {};
        this.charts = {};
        this.isInitialized = false;
    }

    initialize() {
        if (this.isInitialized) return;
        
        this.loadDashboardData();
        this.setupEventListeners();
        this.isInitialized = true;
        
        console.log('Parent Dashboard initialized');
    }

    loadDashboardData() {
        try {
            const report = this.getProgressReport();
            this.insights = this.generateInsights(report);
            this.updateDashboard(report);
            
            if (typeof Chart !== 'undefined') {
                this.renderCharts(report);
            }
            
            this.saveDashboardState();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showErrorMessage('Error loading dashboard data');
        }
    }

    getProgressReport() {
        if (!this.analytics || !this.dataService) {
            console.warn('Analytics or DataService not initialized, using default data');
            return this.getDefaultReport();
        }

        try {
            const stats = this.analytics.stats;
            const user = this.dataService.user;
            
            // Obtener datos de rendimiento
            const performance = this.analytics.getOverallPerformance ? 
                this.analytics.getOverallPerformance() : this.calculatePerformance(stats);
            
            const sectionStats = this.analytics.getSectionPerformance ? 
                this.analytics.getSectionPerformance() : this.calculateSectionStats(stats);
            
            const weakAreas = this.analytics.getWeakAreas ? 
                this.analytics.getWeakAreas() : this.calculateWeakAreas(stats);
            
            const studyRecommendations = this.analytics.getStudyRecommendations ? 
                this.analytics.getStudyRecommendations() : this.generateStudyRecommendations(weakAreas);
            
            // Calcular métricas adicionales
            const streak = this.calculateStudyStreak();
            const studyTime = this.formatStudyTime(stats.totalTimeSpent || 0);
            const overallAccuracy = performance.accuracy || this.calculateOverallAccuracy(stats);
            
            // Progreso diario y semanal
            const dailyProgress = this.getDailyProgress(7); // Últimos 7 días
            const weeklyTrend = this.calculateWeeklyTrend();
            
            // Predicción de puntaje si está disponible
            const scorePrediction = this.analytics.predictScore ? 
                this.analytics.predictScore() : null;

            return {
                // Estadísticas básicas
                stats: {
                    ...stats,
                    correctQuestions: stats.totalCorrect || stats.correctQuestions || 0,
                    totalQuestions: stats.totalQuestions || 0,
                    bySection: stats.bySection || {},
                    byCategory: stats.byCategory || {}
                },
                
                // Rendimiento general
                overallAccuracy,
                streak,
                studyTime,
                totalStudyTime: stats.totalTimeSpent || 0,
                currentStreak: stats.currentStreak || 0,
                bestStreak: stats.bestStreak || 0,
                
                // Información del usuario
                xp: user.xp || 0,
                level: user.level || 1,
                levelName: this.getLevelName(user.level || 1),
                coins: user.coins || 0,
                gems: user.gems || 0,
                
                // Análisis detallado
                weakAreas,
                sectionStats,
                categoryStats: this.getCategoryStats(),
                studyRecommendations,
                dailyProgress,
                weeklyTrend,
                scorePrediction,
                
                // Metadatos
                lastActive: user.lastActive || new Date().toISOString(),
                accountCreated: user.createdAt || new Date().toISOString(),
                totalSessions: stats.totalSessions || 0,
                daysActive: Object.keys(stats.dailyProgress || {}).length || 0,
                
                // Objetivos y progreso
                goals: user.goals || {},
                goalProgress: this.calculateGoalProgress(user),
                
                // Logros recientes
                recentAchievements: this.getRecentAchievements(user),
                
                // Historial de actividad
                recentActivity: this.getRecentActivity()
            };
            
        } catch (error) {
            console.error('Error generating progress report:', error);
            return this.getDefaultReport();
        }
    }

    calculatePerformance(stats) {
        const total = stats.totalQuestions || 0;
        const correct = stats.totalCorrect || 0;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        const avgTime = total > 0 ? (stats.totalTimeSpent || 0) / total : 0;

        return {
            accuracy: Math.round(accuracy),
            totalQuestions: total,
            correctAnswers: correct,
            averageTime: Math.round(avgTime),
            currentStreak: stats.currentStreak || 0,
            bestStreak: stats.bestStreak || 0,
            totalTimeSpent: Math.round(stats.totalTimeSpent || 0)
        };
    }

    calculateSectionStats(stats) {
        const sections = {};
        const defaultSections = ['math', 'reading', 'writing'];
        
        defaultSections.forEach(section => {
            const data = stats.bySection?.[section] || { correct: 0, total: 0, timeSpent: 0 };
            const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            const avgTime = data.total > 0 ? data.timeSpent / data.total : 0;
            
            sections[section] = {
                accuracy: Math.round(accuracy),
                total: data.total,
                correct: data.correct,
                averageTime: Math.round(avgTime),
                bestStreak: data.bestStreak || 0,
                currentStreak: data.currentStreak || 0,
                timeSpent: Math.round(data.timeSpent || 0)
            };
        });

        return sections;
    }

    calculateWeakAreas(stats) {
        const weakAreas = [];
        const threshold = 70;
        
        // Analizar por categoría
        if (stats.byCategory) {
            Object.entries(stats.byCategory).forEach(([category, data]) => {
                if (data.total >= 5) {
                    const accuracy = (data.correct / data.total) * 100;
                    if (accuracy < threshold) {
                        weakAreas.push({
                            type: 'category',
                            name: this.formatCategoryName(category),
                            accuracy: Math.round(accuracy),
                            totalQuestions: data.total,
                            priority: threshold - accuracy
                        });
                    }
                }
            });
        }
        
        // Analizar por sección
        if (stats.bySection) {
            Object.entries(stats.bySection).forEach(([section, data]) => {
                if (data.total >= 5) {
                    const accuracy = (data.correct / data.total) * 100;
                    if (accuracy < threshold) {
                        weakAreas.push({
                            type: 'section',
                            name: section.charAt(0).toUpperCase() + section.slice(1),
                            accuracy: Math.round(accuracy),
                            totalQuestions: data.total,
                            priority: threshold - accuracy
                        });
                    }
                }
            });
        }
        
        return weakAreas.sort((a, b) => b.priority - a.priority).slice(0, 5);
    }

    generateStudyRecommendations(weakAreas) {
        const recommendations = [];
        
        // Recomendaciones basadas en áreas débiles
        weakAreas.forEach(area => {
            let recommendation = '';
            
            if (area.type === 'category') {
                recommendation = `Enfócate en ${area.name}. `;
                if (area.accuracy < 50) {
                    recommendation += `Tu precisión es muy baja (${area.accuracy}%). `;
                    recommendation += "Recomendamos repasar los conceptos básicos.";
                } else if (area.accuracy < 70) {
                    recommendation += `Necesitas mejorar (${area.accuracy}%). `;
                    recommendation += "Practica más ejercicios de este tipo.";
                }
            } else if (area.type === 'section') {
                recommendation = `Sección ${area.name}: `;
                recommendation += `Precisión: ${area.accuracy}%. `;
                recommendation += "Dedica más tiempo a esta sección.";
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
        if (recommendations.length === 0) {
            recommendations.push({
                area: 'General',
                recommendation: "¡Buen trabajo! Continúa practicando para mantener tu rendimiento.",
                priority: 50
            });
        }
        
        return recommendations.sort((a, b) => b.priority - a.priority);
    }

    // ✅ MÉTODO POR DEFECTO SI FALTAN DEPENDENCIAS
    getDefaultReport() {
        return {
            stats: {
                totalQuestions: 0,
                totalCorrect: 0,
                correctQuestions: 0,
                totalTimeSpent: 0,
                bySection: {
                    math: { correct: 0, total: 0, timeSpent: 0 },
                    reading: { correct: 0, total: 0, timeSpent: 0 },
                    writing: { correct: 0, total: 0, timeSpent: 0 }
                },
                byCategory: {},
                dailyProgress: {}
            },
            overallAccuracy: 0,
            streak: 0,
            studyTime: '0m',
            totalStudyTime: 0,
            currentStreak: 0,
            bestStreak: 0,
            xp: 0,
            level: 1,
            levelName: '🌱 Novice Owl',
            coins: 0,
            gems: 0,
            weakAreas: [],
            sectionStats: {},
            categoryStats: {},
            studyRecommendations: [
                {
                    area: 'General',
                    recommendation: "Comienza a practicar para ver tu progreso.",
                    priority: 100
                },
                {
                    area: 'Setup',
                    recommendation: "Completa tu primera pregunta para desbloquear análisis detallados.",
                    priority: 90
                }
            ],
            dailyProgress: [],
            weeklyTrend: 0,
            scorePrediction: null,
            lastActive: new Date().toISOString(),
            accountCreated: new Date().toISOString(),
            totalSessions: 0,
            daysActive: 0,
            goals: {},
            goalProgress: {},
            recentAchievements: [],
            recentActivity: []
        };
    }

    calculateStudyStreak() {
        if (!this.analytics?.stats?.dailyProgress) return 0;
        
        const dailyProgress = this.analytics.stats.dailyProgress;
        const dates = Object.keys(dailyProgress).sort().reverse();
        
        if (dates.length === 0) return 0;
        
        let streak = 1;
        let currentDate = new Date(dates[0]);
        
        for (let i = 1; i < dates.length; i++) {
            const prevDate = new Date(dates[i - 1]);
            const currentDateInLoop = new Date(dates[i]);
            
            const diffTime = prevDate - currentDateInLoop;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1 && dailyProgress[dates[i]].questions > 0) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    getDailyProgress(days = 7) {
        if (!this.analytics?.stats?.dailyProgress) return [];
        
        const dailyProgress = this.analytics.stats.dailyProgress;
        const dates = Object.keys(dailyProgress).sort().reverse().slice(0, days);
        
        return dates.map(date => ({
            date,
            questions: dailyProgress[date].questions || 0,
            correct: dailyProgress[date].correct || 0,
            accuracy: dailyProgress[date].questions > 0 ? 
                Math.round((dailyProgress[date].correct / dailyProgress[date].questions) * 100) : 0
        })).reverse();
    }

    calculateWeeklyTrend() {
        const dailyProgress = this.getDailyProgress(14); // Últimas 2 semanas
        if (dailyProgress.length < 7) return 0;
        
        const lastWeek = dailyProgress.slice(-7);
        const previousWeek = dailyProgress.slice(0, 7);
        
        const lastWeekAvg = lastWeek.reduce((sum, day) => sum + day.accuracy, 0) / 7;
        const previousWeekAvg = previousWeek.reduce((sum, day) => sum + day.accuracy, 0) / 7;
        
        if (previousWeekAvg === 0) return 100;
        
        return Math.round(((lastWeekAvg - previousWeekAvg) / previousWeekAvg) * 100);
    }

    getCategoryStats() {
        if (!this.analytics?.stats?.byCategory) return {};
        
        const stats = {};
        Object.entries(this.analytics.stats.byCategory).forEach(([category, data]) => {
            if (data.total > 0) {
                stats[category] = {
                    accuracy: Math.round((data.correct / data.total) * 100),
                    total: data.total,
                    correct: data.correct
                };
            }
        });
        
        return stats;
    }

    calculateGoalProgress(user) {
        if (!user.goals) return {};
        
        const progress = {};
        const today = new Date().toISOString().split('T')[0];
        
        // Progreso de preguntas diarias
        const dailyQuestions = this.analytics?.stats?.dailyProgress?.[today]?.questions || 0;
        progress.dailyQuestions = {
            current: dailyQuestions,
            target: user.goals.dailyQuestions || 10,
            percent: Math.min(100, (dailyQuestions / (user.goals.dailyQuestions || 10)) * 100)
        };
        
        // Progreso de precisión semanal
        const weeklyAccuracy = this.calculateWeeklyAccuracy();
        progress.weeklyAccuracy = {
            current: weeklyAccuracy,
            target: user.goals.weeklyAccuracy || 75,
            percent: Math.min(100, (weeklyAccuracy / (user.goals.weeklyAccuracy || 75)) * 100)
        };
        
        // Progreso de sesiones mensuales
        const monthlySessions = this.analytics?.stats?.totalSessions || 0;
        progress.monthlySessions = {
            current: monthlySessions,
            target: user.goals.monthlySessions || 20,
            percent: Math.min(100, (monthlySessions / (user.goals.monthlySessions || 20)) * 100)
        };
        
        return progress;
    }

    calculateWeeklyAccuracy() {
        const dailyProgress = this.getDailyProgress(7);
        if (dailyProgress.length === 0) return 0;
        
        const totalQuestions = dailyProgress.reduce((sum, day) => sum + day.questions, 0);
        const totalCorrect = dailyProgress.reduce((sum, day) => sum + day.correct, 0);
        
        return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    }

    getRecentAchievements(user) {
        if (!user.achievements || !Array.isArray(user.achievements)) return [];
        
        return user.achievements
            .sort((a, b) => new Date(b.unlocked || b.date) - new Date(a.unlocked || a.date))
            .slice(0, 5);
    }

    getRecentActivity() {
        if (!this.analytics?.stats?.questionHistory) return [];
        
        return this.analytics.stats.questionHistory
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 10)
            .map(activity => ({
                type: 'question',
                section: activity.section,
                isCorrect: activity.isCorrect,
                timeSpent: activity.timeSpent,
                timestamp: activity.timestamp,
                description: `${activity.isCorrect ? '✅' : '❌'} ${activity.section} question in ${Math.round(activity.timeSpent)}s`
            }));
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

    calculateOverallAccuracy(stats) {
        const total = stats.totalQuestions || 0;
        const correct = stats.totalCorrect || 0;
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    }

    formatStudyTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${Math.round(seconds)}s`;
        }
    }

    getLevelName(level) {
        const levelNames = {
            1: '🌱 Novice Owl',
            2: '📚 Learning Owl',
            3: '🧠 Thinking Owl',
            4: '🎯 Focused Owl',
            5: '🚀 Advanced Owl',
            6: '🏆 Master Owl',
            7: '💡 Wise Owl',
            8: '🌟 Brilliant Owl',
            9: '🏅 Champion Owl',
            10: '👑 Supreme Owl'
        };
        
        return levelNames[level] || `Level ${level} Owl`;
    }

    generateInsights(report) {
        return {
            // Análisis de rendimiento
            performanceAnalysis: this.analyzePerformance(report),
            
            // Patrones de estudio
            studyPatterns: this.analyzeStudyPatterns(report),
            
            // Recomendaciones personalizadas
            personalizedRecommendations: this.generatePersonalizedRecommendations(report),
            
            // Predicciones
            predictions: this.generatePredictions(report),
            
            // Alertas importantes
            alerts: this.checkAlerts(report),
            
            // Resumen ejecutivo
            executiveSummary: this.generateExecutiveSummary(report)
        };
    }

    analyzePerformance(report) {
        const analysis = {
            strengths: [],
            weaknesses: [],
            improvementAreas: [],
            consistency: 0
        };
        
        // Identificar fortalezas (precisión > 80%)
        Object.entries(report.sectionStats).forEach(([section, data]) => {
            if (data.accuracy >= 80 && data.total >= 5) {
                analysis.strengths.push({
                    area: section,
                    accuracy: data.accuracy,
                    message: `Excelente en ${section}`
                });
            }
        });
        
        // Identificar debilidades (precisión < 60%)
        report.weakAreas.forEach(area => {
            analysis.weaknesses.push({
                area: area.name,
                accuracy: area.accuracy,
                message: `Necesita mejora en ${area.name}`
            });
        });
        
        // Calcular consistencia
        const dailyAccuracyValues = report.dailyProgress.map(day => day.accuracy);
        if (dailyAccuracyValues.length > 0) {
            const avgAccuracy = dailyAccuracyValues.reduce((a, b) => a + b, 0) / dailyAccuracyValues.length;
            const variance = dailyAccuracyValues.reduce((a, b) => a + Math.pow(b - avgAccuracy, 2), 0) / dailyAccuracyValues.length;
            analysis.consistency = Math.max(0, 100 - Math.sqrt(variance));
        }
        
        return analysis;
    }

    analyzeStudyPatterns(report) {
        const patterns = {};
        
        // Patrones por tiempo del día
        patterns.timeOfDay = this.analyzeTimeOfDayPatterns();
        
        // Patrones por día de la semana
        patterns.dayOfWeek = this.analyzeDayOfWeekPatterns();
        
        // Duración promedio de sesión
        patterns.averageSessionDuration = report.totalStudyTime / Math.max(report.totalSessions, 1);
        
        // Frecuencia de estudio
        patterns.studyFrequency = report.daysActive / 30; // Últimos 30 días
        
        return patterns;
    }

    analyzeTimeOfDayPatterns() {
        // Esta función analizaría las horas preferidas de estudio
        // Por ahora devolvemos datos de ejemplo
        return {
            morning: { count: 15, accuracy: 75 },
            afternoon: { count: 20, accuracy: 82 },
            evening: { count: 10, accuracy: 68 },
            night: { count: 5, accuracy: 60 }
        };
    }

    analyzeDayOfWeekPatterns() {
        return {
            monday: { count: 8, accuracy: 78 },
            tuesday: { count: 10, accuracy: 82 },
            wednesday: { count: 7, accuracy: 75 },
            thursday: { count: 9, accuracy: 80 },
            friday: { count: 6, accuracy: 70 },
            saturday: { count: 12, accuracy: 85 },
            sunday: { count: 5, accuracy: 72 }
        };
    }

    generatePersonalizedRecommendations(report) {
        const recommendations = [];
        
        // Recomendación basada en áreas débiles
        if (report.weakAreas.length > 0) {
            recommendations.push({
                type: 'weak_area_focus',
                priority: 'high',
                action: `Dedica 20 minutos diarios a practicar ${report.weakAreas[0].name}`,
                reason: `Tu precisión en esta área es del ${report.weakAreas[0].accuracy}%`
            });
        }
        
        // Recomendación basada en consistencia
        if (report.streak < 3) {
            recommendations.push({
                type: 'consistency',
                priority: 'medium',
                action: 'Establece un horario de estudio regular',
                reason: 'Tu racha actual es corta. La consistencia es clave para el éxito.'
            });
        }
        
        // Recomendación basada en tiempo de estudio
        const weeklyStudyTime = report.totalStudyTime / (report.daysActive || 1);
        if (weeklyStudyTime < 1800) { // Menos de 30 minutos por día
            recommendations.push({
                type: 'study_time',
                priority: 'medium',
                action: 'Aumenta tu tiempo de estudio a 45 minutos diarios',
                reason: 'Más tiempo de práctica conduce a mejores resultados'
            });
        }
        
        return recommendations;
    }

    generatePredictions(report) {
        const predictions = [];
        
        // Predicción de puntaje SAT
        if (report.scorePrediction) {
            predictions.push({
                type: 'sat_score',
                value: report.scorePrediction.estimatedScore,
                confidence: report.scorePrediction.confidence,
                message: `Puntaje SAT estimado: ${report.scorePrediction.estimatedScore}`
            });
        }
        
        // Predicción de tiempo para objetivo
        const targetScore = report.goals.targetScore || 1400;
        if (report.scorePrediction && report.scorePrediction.estimatedScore < targetScore) {
            const scoreGap = targetScore - report.scorePrediction.estimatedScore;
            const weeksNeeded = Math.ceil(scoreGap / 25); // Asumiendo 25 puntos por semana
            predictions.push({
                type: 'time_to_target',
                value: weeksNeeded,
                unit: 'weeks',
                message: `Necesitas aproximadamente ${weeksNeeded} semanas para alcanzar tu objetivo`
            });
        }
        
        return predictions;
    }

    checkAlerts(report) {
        const alerts = [];
        
        // Alerta por bajo rendimiento
        if (report.overallAccuracy < 50 && report.totalQuestions > 20) {
            alerts.push({
                type: 'low_performance',
                severity: 'high',
                message: 'El rendimiento general es bajo. Considera revisar los conceptos básicos.',
                action: 'Revisar conceptos fundamentales'
            });
        }
        
        // Alerta por racha perdida
        const today = new Date().toISOString().split('T')[0];
        const lastActiveDate = report.lastActive.split('T')[0];
        if (today !== lastActiveDate && report.streak > 0) {
            alerts.push({
                type: 'streak_risk',
                severity: 'medium',
                message: `Riesgo de perder racha de ${report.streak} días`,
                action: 'Practicar hoy para mantener la racha'
            });
        }
        
        // Alerta por mucho tiempo sin practicar
        const lastActive = new Date(report.lastActive);
        const daysSinceLastActive = Math.floor((new Date() - lastActive) / (1000 * 60 * 60 * 24));
        if (daysSinceLastActive > 3) {
            alerts.push({
                type: 'inactivity',
                severity: 'medium',
                message: `${daysSinceLastActive} días sin practicar`,
                action: 'Retomar el estudio esta semana'
            });
        }
        
        return alerts;
    }

    generateExecutiveSummary(report) {
        return {
            overallStatus: this.getOverallStatus(report),
            keyAchievements: report.recentAchievements.slice(0, 3),
            mainChallenge: report.weakAreas.length > 0 ? report.weakAreas[0].name : 'Ninguna',
            nextSteps: report.studyRecommendations.slice(0, 2),
            confidenceLevel: this.calculateConfidenceLevel(report)
        };
    }

    getOverallStatus(report) {
        if (report.overallAccuracy >= 80) return 'excellent';
        if (report.overallAccuracy >= 65) return 'good';
        if (report.overallAccuracy >= 50) return 'fair';
        return 'needs_improvement';
    }

    calculateConfidenceLevel(report) {
        let score = 0;
        
        // Factores que aumentan la confianza
        if (report.overallAccuracy >= 70) score += 30;
        if (report.streak >= 7) score += 20;
        if (report.daysActive >= 15) score += 20;
        if (report.totalQuestions >= 100) score += 30;
        
        return Math.min(100, score);
    }

    updateDashboard(report) {
        // Esta función actualizaría la UI en tiempo real
        // Por ahora solo mostramos en consola
        console.log('Dashboard updated with report:', report);
        
        // Emitir evento de actualización
        if (typeof CustomEvent !== 'undefined') {
            const event = new CustomEvent('dashboardUpdated', { detail: report });
            window.dispatchEvent(event);
        }
    }

    renderCharts(report) {
        // Limpiar gráficos anteriores
        Object.values(this.charts).forEach(chart => {
            if (chart.destroy) chart.destroy();
        });
        this.charts = {};
        
        // Aquí iría la lógica para renderizar gráficos con Chart.js
        // Por ahora es un placeholder
        console.log('Charts would be rendered with report:', report);
    }

    setupEventListeners() {
        // Escuchar eventos de actualización
        if (this.analytics && typeof this.analytics.on === 'function') {
            this.analytics.on('statsUpdated', () => {
                this.loadDashboardData();
            });
        }
        
        // Escuchar eventos del usuario
        window.addEventListener('userProgressUpdated', () => {
            this.loadDashboardData();
        });
    }

    saveDashboardState() {
        try {
            const state = {
                lastUpdate: new Date().toISOString(),
                insights: this.insights
            };
            localStorage.setItem('parentDashboardState', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving dashboard state:', error);
        }
    }

    showErrorMessage(message) {
        console.error('Dashboard Error:', message);
        
        // Podría mostrar un mensaje en la UI
        const errorDiv = document.getElementById('dashboard-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    exportReport(format = 'json') {
        const report = this.getProgressReport();
        
        if (format === 'json') {
            return JSON.stringify(report, null, 2);
        } else if (format === 'html') {
            return this.generateHtmlReport(report);
        } else if (format === 'pdf') {
            // Esto requeriría una librería como jsPDF
            console.log('PDF export not implemented');
            return null;
        }
        
        return report;
    }

    generateHtmlReport(report) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reporte de Progreso SAT - ${new Date().toLocaleDateString()}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .section { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
                    .metric { display: inline-block; margin: 10px 20px 10px 0; }
                    .value { font-size: 24px; font-weight: bold; color: #2c3e50; }
                    .label { font-size: 14px; color: #7f8c8d; }
                    .alert { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 4px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Reporte de Progreso SAT</h1>
                    <p>Generado el ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="section">
                    <h2>Resumen General</h2>
                    <div class="metric">
                        <div class="value">${report.overallAccuracy}%</div>
                        <div class="label">Precisión General</div>
                    </div>
                    <div class="metric">
                        <div class="value">${report.streak}</div>
                        <div class="label">Días Consecutivos</div>
                    </div>
                    <div class="metric">
                        <div class="value">${report.level}</div>
                        <div class="label">Nivel</div>
                    </div>
                    <div class="metric">
                        <div class="value">${report.totalQuestions}</div>
                        <div class="label">Preguntas Totales</div>
                    </div>
                </div>
                
                <!-- Más secciones HTML aquí -->
            </body>
            </html>
        `;
    }

    resetDashboard() {
        this.insights = {};
        this.charts = {};
        this.isInitialized = false;
        
        // Limpiar localStorage
        localStorage.removeItem('parentDashboardState');
        
        console.log('Dashboard reset');
    }
}

// ✅ FUNCIÓN DE RENDERIZADO ACTUALIZADA
export function renderParentDashboard(container, analytics, dataService) {
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Crear instancia del dashboard
    const dashboard = new ParentDashboard(analytics, dataService);
    dashboard.initialize();
    
    // Obtener datos
    const data = dashboard.getProgressReport();
    
    // Crear estructura HTML
    const dashboardHTML = createDashboardHTML(data);
    container.innerHTML = dashboardHTML;
    
    // Añadir estilos
    addDashboardStyles();
    
    // Configurar interactividad
    setupDashboardInteractivity(container, dashboard);
    
    return dashboard;
}

function createDashboardHTML(data) {
    return `
        <div class="parent-dashboard">
            <!-- Encabezado -->
            <div class="dashboard-header">
                <h1><i class="icon-parent"></i> Dashboard para Padres</h1>
                <div class="last-update">Última actualización: ${new Date().toLocaleString()}</div>
            </div>
            
            <!-- Resumen General -->
            <div class="dashboard-section summary-cards">
                <h2>📊 Resumen General</h2>
                <div class="cards-grid">
                    <div class="card">
                        <div class="card-icon">🎯</div>
                        <div class="card-value">${data.overallAccuracy}%</div>
                        <div class="card-label">Precisión</div>
                    </div>
                    <div class="card">
                        <div class="card-icon">🔥</div>
                        <div class="card-value">${data.streak}</div>
                        <div class="card-label">Días Consecutivos</div>
                    </div>
                    <div class="card">
                        <div class="card-icon">⏱️</div>
                        <div class="card-value">${data.studyTime}</div>
                        <div class="card-label">Tiempo de Estudio</div>
                    </div>
                    <div class="card">
                        <div class="card-icon">📈</div>
                        <div class="card-value">${data.level}</div>
                        <div class="card-label">Nivel ${data.levelName}</div>
                    </div>
                    <div class="card">
                        <div class="card-icon">❓</div>
                        <div class="card-value">${data.totalQuestions}</div>
                        <div class="card-label">Preguntas Totales</div>
                    </div>
                    <div class="card">
                        <div class="card-icon">✅</div>
                        <div class="card-value">${data.correctQuestions || data.stats.correctQuestions}</div>
                        <div class="card-label">Correctas</div>
                    </div>
                </div>
            </div>
            
            <!-- Rendimiento por Sección -->
            <div class="dashboard-section">
                <h2>📚 Rendimiento por Sección</h2>
                <div class="section-performance">
                    ${Object.entries(data.sectionStats).map(([section, stats]) => `
                        <div class="performance-item">
                            <div class="section-name">${section.charAt(0).toUpperCase() + section.slice(1)}</div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${stats.accuracy}%"></div>
                            </div>
                            <div class="section-stats">
                                <span class="accuracy">${stats.accuracy}%</span>
                                <span class="details">${stats.correct}/${stats.total} correctas</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Áreas que Necesitan Mejora -->
            <div class="dashboard-section">
                <h2>🎯 Áreas que Necesitan Mejora</h2>
                ${data.weakAreas.length > 0 ? `
                    <div class="weak-areas">
                        ${data.weakAreas.map(area => `
                            <div class="weak-area-item">
                                <div class="area-name">${area.name}</div>
                                <div class="area-accuracy">${area.accuracy}% precisión</div>
                                <div class="area-priority">Prioridad: ${Math.round(area.priority)}/100</div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="no-weak-areas">
                        <p>🎉 ¡Excelente trabajo! No se detectaron áreas débiles significativas.</p>
                    </div>
                `}
            </div>
            
            <!-- Recomendaciones de Estudio -->
            <div class="dashboard-section">
                <h2>💡 Recomendaciones de Estudio</h2>
                <div class="recommendations">
                    ${data.studyRecommendations.map((rec, index) => `
                        <div class="recommendation-item">
                            <div class="rec-number">${index + 1}</div>
                            <div class="rec-content">
                                <div class="rec-title">${rec.area}</div>
                                <div class="rec-text">${rec.recommendation}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Progreso Diario -->
            <div class="dashboard-section">
                <h2>📅 Progreso Diario (Últimos 7 días)</h2>
                <div class="daily-progress">
                    ${data.dailyProgress.length > 0 ? `
                        <div class="progress-bars">
                            ${data.dailyProgress.map(day => `
                                <div class="day-progress">
                                    <div class="day-label">${new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                                    <div class="day-bar">
                                        <div class="day-accuracy" style="height: ${day.accuracy}%"></div>
                                    </div>
                                    <div class="day-stats">
                                        <div class="day-questions">${day.questions} P</div>
                                        <div class="day-percent">${day.accuracy}%</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p class="no-data">No hay datos de progreso diario disponibles.</p>
                    `}
                </div>
            </div>
            
            <!-- Logros Recientes -->
            ${data.recentAchievements.length > 0 ? `
                <div class="dashboard-section">
                    <h2>🏆 Logros Recientes</h2>
                    <div class="achievements">
                        ${data.recentAchievements.map(ach => `
                            <div class="achievement-item">
                                <div class="achievement-icon">${ach.icon || '⭐'}</div>
                                <div class="achievement-content">
                                    <div class="achievement-title">${ach.title}</div>
                                    <div class="achievement-desc">${ach.description}</div>
                                    <div class="achievement-date">${new Date(ach.unlocked || ach.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- Acciones -->
            <div class="dashboard-actions">
                <button class="btn btn-refresh" id="refresh-dashboard">
                    🔄 Actualizar Dashboard
                </button>
                <button class="btn btn-export" id="export-report">
                    📥 Exportar Reporte
                </button>
                <button class="btn btn-help" id="dashboard-help">
                    ❓ Ayuda
                </button>
            </div>
            
            <!-- Pie del Dashboard -->
            <div class="dashboard-footer">
                <div class="footer-info">
                    <p><strong>Estudiante:</strong> ${data.levelName}</p>
                    <p><strong>Cuenta creada:</strong> ${new Date(data.accountCreated).toLocaleDateString()}</p>
                    <p><strong>Última actividad:</strong> ${new Date(data.lastActive).toLocaleString()}</p>
                </div>
                <div class="footer-stats">
                    <p>📊 ${data.totalSessions} sesiones • ${data.daysActive} días activos</p>
                </div>
            </div>
        </div>
    `;
}

function addDashboardStyles() {
    if (document.getElementById('dashboard-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'dashboard-styles';
    styles.textContent = `
        .parent-dashboard {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .dashboard-header {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .dashboard-header h1 {
            margin: 0;
            color: #2d3748;
            font-size: 28px;
        }
        
        .last-update {
            color: #718096;
            font-size: 14px;
            margin-top: 5px;
        }
        
        .dashboard-section {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .dashboard-section h2 {
            margin-top: 0;
            color: #2d3748;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
        }
        
        .summary-cards .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .card-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .card-value {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .card-label {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .section-performance {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 15px;
        }
        
        .performance-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 10px;
            background: #f7fafc;
            border-radius: 8px;
        }
        
        .section-name {
            min-width: 100px;
            font-weight: bold;
            color: #4a5568;
        }
        
        .progress-bar {
            flex: 1;
            height: 20px;
            background: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #48bb78, #38a169);
            transition: width 1s ease;
        }
        
        .section-stats {
            min-width: 120px;
            text-align: right;
        }
        
        .accuracy {
            font-size: 18px;
            font-weight: bold;
            color: #2d3748;
        }
        
        .details {
            display: block;
            font-size: 12px;
            color: #718096;
        }
        
        .weak-areas {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
        }
        
        .weak-area-item {
            padding: 15px;
            background: #fff5f5;
            border-left: 4px solid #fc8181;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .area-name {
            font-weight: bold;
            color: #c53030;
        }
        
        .area-accuracy {
            color: #e53e3e;
        }
        
        .area-priority {
            background: #fed7d7;
            color: #742a2a;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        
        .no-weak-areas {
            text-align: center;
            padding: 30px;
            background: #f0fff4;
            border-radius: 8px;
            color: #276749;
        }
        
        .recommendations {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
        }
        
        .recommendation-item {
            display: flex;
            gap: 15px;
            padding: 15px;
            background: #ebf8ff;
            border-radius: 8px;
            border-left: 4px solid #4299e1;
        }
        
        .rec-number {
            background: #4299e1;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .rec-content {
            flex: 1;
        }
        
        .rec-title {
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 5px;
        }
        
        .rec-text {
            color: #4a5568;
            line-height: 1.5;
        }
        
        .daily-progress {
            margin-top: 15px;
        }
        
        .progress-bars {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 200px;
            padding: 20px;
            background: #f7fafc;
            border-radius: 8px;
        }
        
        .day-progress {
            flex: 1;
            text-align: center;
            margin: 0 10px;
        }
        
        .day-label {
            margin-bottom: 10px;
            color: #718096;
            font-size: 12px;
        }
        
        .day-bar {
            height: 150px;
            width: 30px;
            background: #e2e8f0;
            border-radius: 15px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }
        
        .day-accuracy {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: linear-gradient(0deg, #48bb78, #38a169);
            border-radius: 15px;
            transition: height 1s ease;
        }
        
        .day-stats {
            margin-top: 10px;
        }
        
        .day-questions {
            font-size: 11px;
            color: #718096;
        }
        
        .day-percent {
            font-weight: bold;
            color: #2d3748;
        }
        
        .no-data {
            text-align: center;
            padding: 40px;
            color: #a0aec0;
            font-style: italic;
        }
        
        .achievements {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .achievement-item {
            padding: 15px;
            background: #fffaf0;
            border-radius: 8px;
            border-left: 4px solid #ed8936;
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .achievement-icon {
            font-size: 24px;
        }
        
        .achievement-title {
            font-weight: bold;
            color: #2d3748;
        }
        
        .achievement-desc {
            font-size: 14px;
            color: #718096;
            margin-top: 2px;
        }
        
        .achievement-date {
            font-size: 12px;
            color: #a0aec0;
            margin-top: 5px;
        }
        
        .dashboard-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-refresh {
            background: #4299e1;
            color: white;
        }
        
        .btn-refresh:hover {
            background: #3182ce;
        }
        
        .btn-export {
            background: #48bb78;
            color: white;
        }
        
        .btn-export:hover {
            background: #38a169;
        }
        
        .btn-help {
            background: #ed8936;
            color: white;
        }
        
        .btn-help:hover {
            background: #dd6b20;
        }
        
        .dashboard-footer {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #718096;
            font-size: 14px;
        }
        
        .footer-info p {
            margin: 5px 0;
        }
        
        @media (max-width: 768px) {
            .cards-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .progress-bars {
                flex-direction: column;
                height: auto;
                align-items: center;
            }
            
            .day-progress {
                margin: 10px 0;
                width: 100%;
            }
            
            .day-bar {
                height: 100px;
                width: 100%;
                max-width: 200px;
            }
            
            .dashboard-footer {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

function setupDashboardInteractivity(container, dashboard) {
    // Botón de actualizar
    const refreshBtn = container.querySelector('#refresh-dashboard');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.innerHTML = '🔄 Actualizando...';
            refreshBtn.disabled = true;
            
            setTimeout(() => {
                dashboard.loadDashboardData();
                refreshBtn.innerHTML = '🔄 Actualizado';
                refreshBtn.disabled = false;
                
                setTimeout(() => {
                    refreshBtn.innerHTML = '🔄 Actualizar Dashboard';
                }, 1500);
            }, 500);
        });
    }
    
    // Botón de exportar
    const exportBtn = container.querySelector('#export-report');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const report = dashboard.exportReport('json');
            const blob = new Blob([report], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sat-progress-report-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Feedback visual
            exportBtn.innerHTML = '✅ Exportado';
            setTimeout(() => {
                exportBtn.innerHTML = '📥 Exportar Reporte';
            }, 1500);
        });
    }
    
    // Botón de ayuda
    const helpBtn = container.querySelector('#dashboard-help');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            alert(`
Dashboard para Padres - Ayuda

Este dashboard muestra el progreso de tu hijo/a en la preparación SAT:

🎯 Precisión: Porcentaje de respuestas correctas
🔥 Días Consecutivos: Días seguidos practicando
⏱️ Tiempo de Estudio: Tiempo total dedicado
📈 Nivel: Progreso general del estudiante

Cada sección muestra:
- Rendimiento por área (Matemáticas, Lectura, Escritura)
- Áreas que necesitan mejora
- Recomendaciones personalizadas
- Progreso diario

Usa el botón "Exportar Reporte" para guardar los datos.
            `);
        });
    }
    
    // Actualizar automáticamente cada 30 segundos
    const autoRefresh = setInterval(() => {
        dashboard.loadDashboardData();
    }, 30000);
    
    // Limpiar intervalo al salir
    container.addEventListener('dashboardUnload', () => {
        clearInterval(autoRefresh);
    });
}