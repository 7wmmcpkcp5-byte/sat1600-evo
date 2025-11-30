// config.js
export const config = {
    app: {
        name: 'SAT OWL EVO 7 Premium',
        version: '7.0.0',
        premium: true
    },
    quiz: {
        defaultQuestionCount: 10,
        timePerQuestion: 60, // seconds
        maxTime: 600 // seconds for full quiz
    },
    gamification: {
        xpPerCorrectAnswer: 10,
        xpMultipliers: {
            easy: 1,
            medium: 1.5,
            hard: 2
        }
    },
    features: {
        aiTutor: true,
        analytics: true,
        gamification: true,
        examSimulation: true
    }
};