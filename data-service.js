// data-service.js - VERSIÓN CORREGIDA
import { CONFIG, getLevelInfo, calculateXPForAnswer } from './config.js';
// ✅ QUITAR import circular con AnalyticsManager
// import { AnalyticsManager } from './analytics-manager.js'; 
import { questionRepository } from './data/question-repository.js';

export class DataService {
    constructor() {
        this.user = this.getUser();
        this.analytics = null; // ✅ Se asignará después para evitar dependencia circular
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

        return {
            xp: 0,
            level: 1,
            seenQuestions: [],
            sessionStats: {
                correct: 0,
                incorrect: 0,
                total: 0,
                startTime: Date.now()
            },
            achievements: [],
            preferences: {
                sound: true,
                animations: true,
                difficulty: 'adaptive'
            },
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
    }

    // ... (resto del código sin cambios)
    // Mantener todos los métodos existentes: saveUser, saveProgress, getNextQuestion, etc.
}