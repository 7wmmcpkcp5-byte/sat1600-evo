// config.js - Configuración centralizada de la aplicación
export const CONFIG = {
    // Sistema de niveles y XP
    levels: {
        1: "🌱 Novice Owl",
        2: "🚀 Explorer Owl", 
        3: "📚 Student Owl",
        4: "🎯 Tactical Owl",
        5: "⚡ Strategist Owl",
        6: "🏆 Master Owl",
        7: "🌟 Legend Owl"
    },
    
    // Umbrales de XP para cada nivel
    xpThresholds: [0, 300, 700, 1500, 2500, 4000, 6000, 8000],
    
    // Recompensas y progreso
    xpPerQuestion: 50,
    xpBonusCorrect: 25,
    xpPenaltyIncorrect: -10,
    
    // Configuración de preguntas
    maxQuestionsPerSession: 20,
    questionTimeLimit: 120,
    
    // Temas y categorías
    subjects: {
        math: {
            name: "Mathematics",
            categories: ["algebra", "geometry", "trigonometry", "data_analysis"]
        },
        reading: {
            name: "Reading",
            categories: ["comprehension", "vocabulary", "inference"]
        },
        writing: {
            name: "Writing & Language", 
            categories: ["grammar", "rhetoric", "editing"]
        }
    },
    
    // Configuración de UI
    animations: {
        questionTransition: 300,
        feedbackDuration: 2000,
        xpBarAnimation: 1000
    },
    
    // LocalStorage keys
    storageKeys: {
        userProgress: 'sat_owl_user_progress_v2',
        analytics: 'sat_owl_analytics_v2',
        settings: 'sat_owl_settings_v2',
        premium: 'sat_owl_premium_status'
    }
};

// Funciones de utilidad
export const getLevelInfo = (xp) => {
    const thresholds = CONFIG.xpThresholds;
    let level = 1;
    
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (xp >= thresholds[i]) {
            level = i + 1;
            break;
        }
    }
    
    const currentLevelXP = thresholds[level - 1] || 0;
    const nextLevelXP = thresholds[level] || thresholds[thresholds.length - 1];
    const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    
    return {
        level,
        levelName: CONFIG.levels[level] || "Unknown Owl",
        currentLevelXP,
        nextLevelXP,
        progress: Math.min(100, Math.max(0, progress)),
        xpToNextLevel: nextLevelXP - xp
    };
};

export const calculateXPForAnswer = (isCorrect, timeSpent = 0, difficulty = 'medium') => {
    let xp = CONFIG.xpPerQuestion;
    
    if (isCorrect) {
        xp += CONFIG.xpBonusCorrect;
        
        // Bonus por velocidad
        if (timeSpent < 30) xp += 15;
        
        // Bonus por dificultad
        if (difficulty === 'hard') xp += 20;
        else if (difficulty === 'medium') xp += 10;
    } else {
        xp = CONFIG.xpPenaltyIncorrect;
    }
    
    return Math.max(0, xp);
};