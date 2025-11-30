export const questions = [
    {
        id: 1,
        question: "¿Cómo fue el día de tu hijo hoy?",
        category: "Bienestar emocional",
        answered: false
    },
    {
        id: 2,
        question: "¿Completó todas sus tareas?",
        category: "Académico",
        answered: true
    },
    {
        id: 3,
        question: "¿Durmió lo suficiente?",
        category: "Salud",
        answered: false
    },
    {
        id: 4,
        question: "¿Practicó alguna actividad física?",
        category: "Actividad",
        answered: true
    }
];

export function getUnansweredQuestions() {
    return questions.filter(q => !q.answered);
}

export function markQuestionAsAnswered(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.answered = true;
        return true;
    }
    return false;
}
