// data/index.js - Punto de entrada central para todos los datos
import { MATH_ALGEBRA_QUESTIONS } from './math-algebra.js';
import { QuestionRepository } from './question-repository.js';

// Exportar todas las preguntas organizadas
export const QUESTIONS = {
    MATH_ALGEBRA: MATH_ALGEBRA_QUESTIONS,
    // Futuros bancos de preguntas se agregarán aquí
    // MATH_GEOMETRY: MATH_GEOMETRY_QUESTIONS,
    // READING_COMPREHENSION: READING_COMPREHENSION_QUESTIONS
};

// Exportar el repositorio singleton
export { QuestionRepository, questionRepository } from './question-repository.js';

// Exportar utilidades
export { MATH_ALGEBRA_QUESTIONS };

// Información sobre el dataset
export const DATA_INFO = {
    version: '2.0',
    totalQuestions: MATH_ALGEBRA_QUESTIONS.length,
    categories: ['algebra'],
    lastUpdated: '2024-01-15',
    description: 'SAT OWL PRO Question Database'
};

// Función para obtener estadísticas de todos los datos
export function getDataStats() {
    return {
        totalQuestions: MATH_ALGEBRA_QUESTIONS.length,
        byCategory: {
            algebra: MATH_ALGEBRA_QUESTIONS.length
        },
        byDifficulty: {
            easy: MATH_ALGEBRA_QUESTIONS.filter(q => q.difficulty === 'easy').length,
            medium: MATH_ALGEBRA_QUESTIONS.filter(q => q.difficulty === 'medium').length,
            hard: MATH_ALGEBRA_QUESTIONS.filter(q => q.difficulty === 'hard').length
        }
    };
}