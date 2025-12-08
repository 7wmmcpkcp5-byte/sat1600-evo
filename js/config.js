// CONFIGURACIÓN CENTRALIZADA - SAT OWL PRO v3.0
// Todas las constantes y configuraciones en un solo lugar

export const CONFIG = {
    // ==================== APLICACIÓN ====================
    APP_NAME: 'SAT OWL PRO',
    APP_VERSION: '3.0.0',
    APP_DESCRIPTION: 'Preparación SAT gamificada con inteligencia adaptativa',
    
    // ==================== SISTEMA DE NIVELES ====================
    LEVELS: {
        1: { name: '🌱 Novice Owl', xpRequired: 0, color: '#22c55e' },
        2: { name: '📚 Learning Owl', xpRequired: 100, color: '#3b82f6' },
        3: { name: '🧠 Thinking Owl', xpRequired: 250, color: '#8b5cf6' },
        4: { name: '🎯 Focused Owl', xpRequired: 500, color: '#f59e0b' },
        5: { name: '🚀 Advanced Owl', xpRequired: 850, color: '#ef4444' },
        6: { name: '🏆 Master Owl', xpRequired: 1300, color: '#ec4899' },
        7: { name: '💡 Wise Owl', xpRequired: 1850, color: '#14b8a6' },
        8: { name: '🌟 Brilliant Owl', xpRequired: 2500, color: '#f97316' },
        9: { name: '🏅 Champion Owl', xpRequired: 3250, color: '#a855f7' },
        10: { name: '👑 Supreme Owl', xpRequired: 4100, color: '#eab308' }
    },
    
    // ==================== SISTEMA XP ====================
    XP_SYSTEM: {
        // XP por respuesta
        CORRECT_ANSWER: {
            easy: 15,
            medium: 25,
            hard: 40
        },
        INCORRECT_ANSWER: {
            penalty: 5,
            minXP: 0
        },
        
        // Bonus especiales
        BONUS: {
            streak: 10,           // XP extra por racha de aciertos
            speed: 15,           // XP extra por respuesta rápida (<30s)
            accuracy: 20,        // XP extra por precisión >90%
            daily_completion: 50 // XP extra por completar práctica diaria
        },
        
        // Multiplicadores
        MULTIPLIERS: {
            exam_mode: 1.5,
            premium: 1.25,
            weekend: 1.2
        }
    },
    
    // ==================== EXAMEN SAT ====================
    EXAM_CONFIG: {
        // Secciones y tiempos oficiales
        SECTIONS: [
            {
                id: 'reading',
                name: 'Reading',
                duration: 65, // minutos
                questions: 52,
                description: 'Comprensión lectora y análisis'
            },
            {
                id: 'writing',
                name: 'Writing and Language',
                duration: 35,
                questions: 44,
                description: 'Gramática y edición'
            },
            {
                id: 'math_no_calc',
                name: 'Math (No Calculator)',
                duration: 25,
                questions: 20,
                description: 'Álgebra, geometría sin calculadora'
            },
            {
                id: 'math_calc',
                name: 'Math (Calculator)',
                duration: 55,
                questions: 38,
                description: 'Matemáticas avanzadas con calculadora'
            }
        ],
        
        // Puntuación
        SCORING: {
            minScore: 400,
            maxScore: 1600,
            readingWritingRange: { min: 200, max: 800 },
            mathRange: { min: 200, max: 800 },
            
            // Conversión raw to scaled (ejemplo simplificado)
            RAW_TO_SCALED: {
                reading: {
                    52: 400, 51: 390, 50: 380, // ... continuar
                    1: 10
                },
                math: {
                    58: 800, 57: 790, 56: 780,
                    1: 200
                }
            }
        },
        
        // Configuración del simulador
        SIMULATOR: {
            showTimer: true,
            allowPause: true,
            maxPauses: 2,
            pauseDuration: 5, // minutos
            autoSubmit: true,
            strictMode: true // No se puede cambiar respuestas después
        }
    },
    
    // ==================== PREGUNTAS ====================
    QUESTIONS: {
        // Distribución por dificultad
        DIFFICULTY_DISTRIBUTION: {
            easy: 0.2,    // 20%
            medium: 0.6,  // 60%
            hard: 0.2     // 20%
        },
        
        // Tiempos recomendados por tipo
        TIME_RECOMMENDATIONS: {
            reading: 75,    // segundos por pregunta
            writing: 48,
            math_easy: 60,
            math_medium: 90,
            math_hard: 120
        },
        
        // Categorías SAT
        CATEGORIES: {
            math: [
                'algebra', 'geometry', 'trigonometry', 
                'data_analysis', 'advanced_math', 'word_problems'
            ],
            reading: [
                'comprehension', 'vocabulary', 'evidence',
                'synthesis', 'rhetoric'
            ],
            writing: [
                'grammar', 'punctuation', 'sentence_structure',
                'organization', 'style', 'effective_language'
            ]
        }
    },
    
    // ==================== INTERFAZ ====================
    UI: {
        // Temas
        THEMES: {
            dark: {
                primary: '#020617',
                secondary: '#1e293b',
                accent: '#6366f1',
                text: '#f8fafc',
                textSecondary: '#cbd5e1',
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b'
            },
            light: {
                primary: '#ffffff',
                secondary: '#f1f5f9',
                accent: '#4f46e5',
                text: '#0f172a',
                textSecondary: '#475569',
                success: '#059669',
                error: '#dc2626',
                warning: '#d97706'
            }
        },
        
        // Animaciones
        ANIMATIONS: {
            enabled: true,
            duration: {
                fast: 150,
                normal: 300,
                slow: 500
            },
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        
        // Sonidos
        SOUNDS: {
            enabled: true,
            volume: 0.5,
            files: {
                correct: '/assets/sounds/correct.mp3',
                incorrect: '/assets/sounds/incorrect.mp3',
                levelUp: '/assets/sounds/level-up.mp3',
                achievement: '/assets/sounds/achievement.mp3'
            }
        }
    },
    
    // ==================== ALMACENAMIENTO ====================
    STORAGE: {
        KEYS: {
            userProgress: 'sat_owl_user_progress_v3',
            analytics: 'sat_owl_analytics_v3',
            settings: 'sat_owl_settings_v3',
            examHistory: 'sat_owl_exam_history_v3',
            questionHistory: 'sat_owl_question_history_v3'
        },
        
        // Límites de almacenamiento
        LIMITS: {
            maxExamHistory: 50,
            maxQuestionHistory: 1000,
            maxSessions: 100
        }
    },
    
    // ==================== PREMIUM ====================
    PREMIUM: {
        FEATURES: {
            free: [
                'daily_practice',
                'basic_analytics',
                'level_progression',
                'community_access'
            ],
            premium: [
                'unlimited_practice',
                'full_exam_simulator',
                'advanced_analytics',
                'personalized_plan',
                'offline_mode',
                'priority_support',
                'theory_shorts',
                'question_generator'
            ]
        },
        
        PRICING: {
            monthly: 9.99,
            annual: 79.99, // 33% descuento
            lifetime: 199.99
        }
    },
    
    // ==================== ANALYTICS ====================
    ANALYTICS: {
        // Eventos a trackear
        EVENTS: [
            'app_launch',
            'question_answered',
            'exam_started',
            'exam_completed',
            'level_up',
            'achievement_unlocked',
            'premium_upgraded'
        ],
        
        // Métricas clave
        METRICS: {
            sessionDuration: true,
            accuracyRate: true,
            improvementRate: true,
            weakAreas: true,
            studyPatterns: true
        }
    },
    
    // ==================== OFFLINE ====================
    OFFLINE: {
        enabled: true,
        cacheQuestions: 100,
        cacheTheory: 20,
        syncInterval: 300000 // 5 minutos
    }
};

// ==================== FUNCIONES UTILITARIAS ====================

/**
 * Obtiene información del nivel basado en XP
 */
export function getLevelInfo(xp) {
    const levels = Object.entries(CONFIG.LEVELS);
    
    for (let i = levels.length - 1; i >= 0; i--) {
        const [level, data] = levels[i];
        if (xp >= data.xpRequired) {
            const nextLevel = levels[i + 1];
            const nextLevelXP = nextLevel ? nextLevel[1].xpRequired : data.xpRequired;
            
            return {
                level: parseInt(level),
                name: data.name,
                color: data.color,
                currentXP: xp,
                currentLevelXP: data.xpRequired,
                nextLevelXP: nextLevelXP,
                xpToNextLevel: nextLevelXP - xp,
                progress: ((xp - data.xpRequired) / (nextLevelXP - data.xpRequired)) * 100
            };
        }
    }
    
    // Nivel 1 por defecto
    return {
        level: 1,
        name: CONFIG.LEVELS[1].name,
        color: CONFIG.LEVELS[1].color,
        currentXP: xp,
        currentLevelXP: 0,
        nextLevelXP: CONFIG.LEVELS[2].xpRequired,
        xpToNextLevel: CONFIG.LEVELS[2].xpRequired - xp,
        progress: (xp / CONFIG.LEVELS[2].xpRequired) * 100
    };
}

/**
 * Calcula XP ganado por respuesta
 */
export function calculateXPGained(isCorrect, difficulty = 'medium', timeSpent = 0, streak = 0) {
    const xpConfig = CONFIG.XP_SYSTEM;
    let xp = 0;
    
    if (isCorrect) {
        // XP base por dificultad
        xp = xpConfig.CORRECT_ANSWER[difficulty] || xpConfig.CORRECT_ANSWER.medium;
        
        // Bonus por velocidad (< 30 segundos)
        if (timeSpent > 0 && timeSpent < 30) {
            xp += xpConfig.BONUS.speed;
        }
        
        // Bonus por racha
        if (streak >= 3) {
            xp += xpConfig.BONUS.streak * Math.min(Math.floor(streak / 3), 5);
        }
        
    } else {
        xp = Math.max(0, xpConfig.INCORRECT_ANSWER.penalty);
    }
    
    return Math.round(xp);
}

/**
 * Calcula puntuación SAT estimada
 */
export function estimateSATScore(accuracy, section = 'total') {
    const baseScores = {
        math: 200,
        reading: 200,
        writing: 200,
        total: 400
    };
    
    const maxScores = {
        math: 800,
        reading: 400,
        writing: 400,
        total: 1600
    };
    
    const base = baseScores[section] || 400;
    const max = maxScores[section] || 1600;
    const range = max - base;
    
    // Fórmula de estimación (puede ajustarse)
    const estimated = base + (range * (accuracy / 100));
    
    return Math.min(max, Math.max(base, Math.round(estimated)));
}

/**
 * Formatea tiempo para display
 */
export function formatTime(seconds, format = 'full') {
    if (seconds < 60) {
        return `${Math.round(seconds)}s`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    
    if (format === 'short') {
        return `${minutes}m`;
    } else if (minutes < 60) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours}h ${remainingMinutes}m`;
}

/**
 * Valida configuración
 */
export function validateConfig() {
    const errors = [];
    
    // Validar niveles
    const levels = Object.values(CONFIG.LEVELS);
    for (let i = 1; i < levels.length; i++) {
        if (levels[i].xpRequired <= levels[i-1].xpRequired) {
            errors.push(`Nivel ${i+1} requiere menos XP que nivel ${i}`);
        }
    }
    
    // Validar secciones de examen
    let totalExamTime = 0;
    CONFIG.EXAM_CONFIG.SECTIONS.forEach(section => {
        totalExamTime += section.duration;
    });
    
    if (totalExamTime !== 180) { // 3 horas = 180 minutos
        errors.push(`Tiempo total del examen incorrecto: ${totalExamTime} minutos (deberían ser 180)`);
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// Exportar funciones utilitarias
export default CONFIG;