// question-repository.js - Repositorio central de preguntas
import { MATH_ALGEBRA_QUESTIONS } from './math-algebra.js';

export class QuestionRepository {
    constructor() {
        this.questions = new Map();
        this.initializeRepository();
    }

    initializeRepository() {
        MATH_ALGEBRA_QUESTIONS.forEach(question => {
            this.questions.set(question.id, question);
        });
    }

    getAllQuestions() {
        return Array.from(this.questions.values());
    }

    getAvailableQuestions(excludeIds = []) {
        const allQuestions = this.getAllQuestions();
        return allQuestions.filter(question => 
            !excludeIds.includes(question.id)
        );
    }

    getRandomQuestion(excludeIds = []) {
        const available = this.getAvailableQuestions(excludeIds);
        if (available.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * available.length);
        return available[randomIndex];
    }

    getRepositoryStats() {
        const allQuestions = this.getAllQuestions();
        
        const bySection = {};
        const byCategory = {};
        const byDifficulty = { easy: 0, medium: 0, hard: 0 };

        allQuestions.forEach(question => {
            // Por sección
            if (!bySection[question.section]) bySection[question.section] = 0;
            bySection[question.section]++;

            // Por categoría
            if (!byCategory[question.category]) byCategory[question.category] = 0;
            byCategory[question.category]++;

            // Por dificultad
            byDifficulty[question.difficulty]++;
        });

        return {
            totalQuestions: allQuestions.length,
            bySection,
            byCategory,
            byDifficulty
        };
    }
}

// Instancia singleton
export const questionRepository = new QuestionRepository();