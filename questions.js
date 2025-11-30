export const questions = [
    {
        id: 1,
        text: "Si x + 3 = 7, ¿cuál es el valor de x?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        domain: "algebra",
        difficulty: "easy"
    },
    {
        id: 2,
        text: "¿Cuál es el área de un triángulo con base 6 y altura 4?",
        options: ["10", "12", "18", "24"],
        correctAnswer: 1,
        domain: "geometry",
        difficulty: "easy"
    },
    {
        id: 3,
        text: "Si un libro cuesta $20 y tiene un descuento del 15%, ¿cuál es el precio final?",
        options: ["$15", "$17", "$18", "$19"],
        correctAnswer: 1,
        domain: "arithmetic",
        difficulty: "medium"
    },
    {
        id: 4,
        text: "Resuelve para y: 2y - 5 = 11",
        options: ["3", "6", "8", "10"],
        correctAnswer: 2,
        domain: "algebra",
        difficulty: "medium"
    },
    {
        id: 5,
        text: "¿Cuál es la probabilidad de obtener un número par al lanzar un dado?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correctAnswer: 2,
        domain: "statistics",
        difficulty: "easy"
    }
];

export function getQuestionsByCategory(category) {
    return questions.filter(q => q.domain === category);
}

export function getUnansweredQuestions() {
    return questions; // Simplificado para el ejemplo
}
