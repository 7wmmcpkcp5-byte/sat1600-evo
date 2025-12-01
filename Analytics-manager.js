// analytics-manager.js - CORREGIDO Y COMPLETO
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
    }

    initializeStats() {
        const defaultStats = {
            totalSessions: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalTimeSpent: 0,
            correctQuestions: 0, // ✅ AGREGADO para compatibilidad
            
            bySection: {
                math: { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 },
                reading: { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 },
                writing: { correct: 0, total: 0, timeSpent: 0, bestStreak: 0 }
            },
            
            byCategory: {
                algebra: { correct: 0, total: 0 },
                geometry: { correct: 0, total: 0 },
                comprehension: { correct: 0, total: 0 },
                grammar: { correct: 0, total: 0 }
            },
            
            dailyProgress: {},
            weeklyTrends: {},
            
            currentStreak: 0,
            bestStreak: 0,
            streak: 0, // ✅ AGREGADO para compatibilidad
            achievements: [],
            goals: {},
            
            firstSession: new Date().toISOString(),
            lastSession: null,
            version: '2.0'
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

    // ✅ MÉTODOS CRÍTICOS FALTANTES - AGREGADOS
    getStudyRecommendations() {
        return this.generateStudyRecommendations();
    }

    getWeakAreas() {
        return this.identifyWeakAreas();
    }

    // ✅ MÉTODO FALTANTE PARA PARENT DASHBOARD
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
            totalTimeSpent: this.stats.totalTimeSpent
        };
    }

    // ✅ MÉTODO FALTANTE PARA PARENT DASHBOARD
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
                bestStreak: data.bestStreak
            };
        });

        return sections;
    }

    // ... (resto del código que ya tenías)
    // Asegúrate de incluir todos los otros métodos existentes
}