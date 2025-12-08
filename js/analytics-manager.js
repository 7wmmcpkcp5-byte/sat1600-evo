// analytics-manager.js - COMPLETO Y EXTENDIDO PARA DASHBOARD COMPATIBILIDAD
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

    // MÉTODOS NUEVOS PARA COMPATIBILIDAD CON DASHBOARD
    generateRealTimeInsights() {
        // Alias para compatibilidad con dashboard
        return this.generateInsights();
    }

    getLastNDays(days) {
        // Compatibilidad con dashboard - devuelve datos en formato esperado
        const progress = this.getProgressOverTime(days);
        return progress.map(day => ({
            date: day.date,
            questions: day.questions,
            correct: day.correct,
            accuracy: day.accuracy,
            timeSpent: this.calculateEstimatedTime(day)
        }));
    }

    formatTime(seconds) {
        // Método auxiliar para formatear tiempo (usado por dashboard)
        if (seconds < 60) {
            return `${Math.round(seconds)}s`;
        } else if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.round(seconds % 60);
            return `${mins}m ${secs}s`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.round((seconds % 3600) / 60);
            return `${hours}h ${mins}m`;
        }
    }

    generateDayLabels(days) {
        // Generar etiquetas para gráficos
        const labels = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }));
        }
        
        return labels;
    }

    // MÉTODOS AUXILIARES NUEVOS
    calculateEstimatedTime(dayData) {
        // Calcular tiempo estimado basado en preguntas
        // Estimación: 90 segundos por pregunta en promedio
        return dayData.questions * 90;
    }

    calculatePerformanceTrend(days = 7) {
        // Calcular tendencia de rendimiento para dashboard
        const progress = this.getLastNDays(days);
        
        if (progress.length < 2) {
            return {
                trend: Array(days).fill(0),
                direction: 'stable',
                dataPoints: []
            };
        }
        
        const accuracyData = progress.map(day => day.accuracy || 0);
        
        // Calcular dirección de tendencia
        const firstHalf = accuracyData.slice(0, Math.floor(days/2));
        const secondHalf = accuracyData.slice(Math.floor(days/2));
        
        const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        let direction = 'stable';
        if (avgSecond > avgFirst + 5) direction = 'improving';
        else if (avgSecond < avgFirst - 5) direction = 'declining';
        
        return {
            trend: accuracyData,
            direction: direction,
            dataPoints: progress
        };
    }

    getSectionPerformanceData() {
        // Obtener datos de secciones en formato para gráficos
        const sections = this.getSectionPerformance();
        return {
            labels: ['Matemáticas', 'Lectura', 'Escritura'],
            accuracies: [
                sections.math?.accuracy || 0,
                sections.reading?.accuracy || 0,
                sections.writing?.accuracy || 0
            ],
            totals: [
                sections.math?.total || 0,
                sections.reading?.total || 0,
                sections.writing?.total || 0
            ],
            times: [
                sections.math?.averageTime || 0,
                sections.reading?.averageTime || 0,
                sections.writing?.averageTime || 0
            ]
        };
    }

    getWeakAreasData() {
        // Datos de áreas débiles para dashboard
        const weakAreas = this.identifyWeakAreas();
        return weakAreas.map(area => ({
            name: area.name,
            type: area.type,
            accuracy: area.accuracy,
            priority: area.priority,
            description: this.getWeakAreaDescription(area)
        }));
    }

    getWeakAreaDescription(area) {
        // Descripción amigable para áreas débiles
        if (area.accuracy < 50) {
            return `Necesita atención urgente (${area.accuracy}% de precisión)`;
        } else if (area.accuracy < 70) {
            return `Área a mejorar (${area.accuracy}% de precisión)`;
        } else {
            return `En buen nivel (${area.accuracy}% de precisión)`;
        }
    }

    // MÉTODO ACTUALIZADO generateInsights con datos extendidos
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
        
        // 6. Tendencia de rendimiento (nuevo para dashboard)
        insights.performanceTrend = this.calculatePerformanceTrend(7);
        
        // 7. Datos para gráficos (nuevo para dashboard)
        insights.chartData = {
            sectionPerformance: this.getSectionPerformanceData(),
            weakAreas: this.getWeakAreasData(),
            dailyProgress: this.getProgressOverTime(30)
        };
        
        this.insights = insights;
        return insights;
    }

    // MÉTODOS EXISTENTES (se mantienen igual que en tu versión original)
    initializeStats() { /* ... mismo código ... */ }
    migrateStats(oldStats, defaultStats) { /* ... mismo código ... */ }
    startNewSession() { /* ... mismo código ... */ }
    endCurrentSession() { /* ... mismo código ... */ }
    recordQuestion(questionData) { /* ... mismo código ... */ }
    updateDailyProgress(isCorrect) { /* ... mismo código ... */ }
    updateStreakDays(today) { /* ... mismo código ... */ }
    identifyWeakAreas() { /* ... mismo código ... */ }
    generateStudyRecommendations() { /* ... mismo código ... */ }
    getOverallPerformance() { /* ... mismo código ... */ }
    getSectionPerformance() { /* ... mismo código ... */ }
    getCategoryPerformance() { /* ... mismo código ... */ }
    getProgressOverTime(days = 30) { /* ... mismo código ... */ }
    predictScore() { /* ... mismo código ... */ }
    checkAchievements() { /* ... mismo código ... */ }
    getQuestionStats() { /* ... mismo código ... */ }
    calculateImprovement(section) { /* ... mismo código ... */ }
    getSectionRecommendation(section, data) { /* ... mismo código ... */ }
    analyzeTimePatterns() { /* ... mismo código ... */ }
    formatCategoryName(category) { /* ... mismo código ... */ }
    loadHistoricalData() { /* ... mismo código ... */ }
    saveStats() { /* ... mismo código ... */ }
    setupAutoSave() { /* ... mismo código ... */ }
    exportData(format = 'json') { /* ... mismo código ... */ }
    resetStats() { /* ... mismo código ... */ }
    getStudyRecommendations() { /* ... mismo código ... */ }
    getWeakAreas() { /* ... mismo código ... */ }
}