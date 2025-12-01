// parent-dashboard.js - VERSIÓN CORREGIDA
// ✅ ELIMINAR import circular
// import { AnalyticsManager } from './analytics-manager.js';
// import { DataService } from './data-service.js';
import { CONFIG } from './config.js';

export class ParentDashboard {
    constructor(analytics, dataService) {
        // ✅ RECIBIR INSTANCIAS POR PARÁMETRO para evitar dependencias circulares
        this.analytics = analytics;
        this.dataService = dataService;
        this.insights = {};
    }

    getProgressReport() {
        if (!this.analytics || !this.dataService) {
            console.error('Analytics or DataService not initialized');
            return this.getDefaultReport();
        }

        const stats = this.analytics.stats;
        const user = this.dataService.user;
        const performance = this.analytics.getOverallPerformance();
        const weakAreas = this.analytics.getWeakAreas ? this.analytics.getWeakAreas() : [];
        const sectionStats = this.analytics.getSectionPerformance ? this.analytics.getSectionPerformance() : {};
        
        const overallAccuracy = stats.totalQuestions ? 
            Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0;
        
        const streak = this.calculateStudyStreak();
        const studyTime = this.formatStudyTime(stats.totalTimeSpent);

        return {
            stats: {
                ...stats,
                correctQuestions: stats.totalCorrect,
                totalQuestions: stats.totalQuestions,
                bySection: stats.bySection
            },
            overallAccuracy,
            streak,
            studyTime,
            xp: user.xp,
            level: user.level,
            levelName: this.getLevelName(user.level),
            weakAreas,
            sectionStats,
            studyRecommendations: this.analytics.getStudyRecommendations ? 
                this.analytics.getStudyRecommendations() : [],
            lastActive: user.lastActive,
            accountCreated: user.createdAt
        };
    }

    // ✅ MÉTODO POR DEFECTO SI FALTAN DEPENDENCIAS
    getDefaultReport() {
        return {
            stats: {
                totalQuestions: 0,
                totalCorrect: 0,
                correctQuestions: 0,
                bySection: {
                    math: { correct: 0, total: 0 },
                    reading: { correct: 0, total: 0 },
                    writing: { correct: 0, total: 0 }
                }
            },
            overallAccuracy: 0,
            streak: 0,
            studyTime: '0m',
            xp: 0,
            level: 1,
            levelName: '🌱 Novice Owl',
            weakAreas: [],
            sectionStats: {},
            studyRecommendations: [
                "Start practicing to see your progress!",
                "Complete your first questions to unlock analytics"
            ],
            lastActive: new Date().toISOString(),
            accountCreated: new Date().toISOString()
        };
    }

    calculateStudyStreak() {
        if (!this.analytics?.stats?.dailyProgress) return 0;
        
        const dailyProgress = this.analytics.stats.dailyProgress;
        const dates = Object.keys(dailyProgress).sort().reverse();
        
        let streak = 0;
        let currentDate = new Date();
        
        for (let i = 0; i < dates.length; i++) {
            const date = new Date(dates[i]);
            const diffTime = Math.abs(currentDate - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === i + 1 && dailyProgress[dates[i]].questions > 0) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    formatStudyTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    getLevelName(level) {
        return CONFIG.levels[level] || "Unknown Owl";
    }
}

// ✅ FUNCIÓN DE RENDERIZADO ACTUALIZADA
export function renderParentDashboard(container, analytics, dataService) {
    const dashboardLogic = new ParentDashboard(analytics, dataService);
    const data = dashboardLogic.getProgressReport();
    
    const { stats, overallAccuracy, level, levelName, xp, streak, weakAreas, studyRecommendations, studyTime } = data;

    container.innerHTML = "";

    // ... (mantener todo el código de renderizado existente)
    // El código HTML de renderizado permanece igual
}