// questions.js
// Estas son preguntas de ejemplo. Deberás reemplazarlas con tu banco de 300 preguntas.

export const mathQuestions = [
    {
        id: 'q0',
        section: 'math',
        text: 'If 3x + 5 = 20, what is the value of x?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 0,
        difficulty: 1
    },
    {
        id: 'q1',
        section: 'math',
        text: 'What is the perimeter of a rectangle with length 8 and width 4?',
        options: ['12', '16', '24', '32'],
        correctAnswer: 2,
        difficulty: 1
    },
    // Agrega más preguntas de matemáticas aquí...
];

export const readingQuestions = [
    {
        id: 'q50',
        section: 'reading',
        text: 'According to the passage, what is the main purpose of the research?',
        options: [
            'To prove a long-held theory',
            'To explore a new phenomenon',
            'To disprove a common belief',
            'To validate a historical claim'
        ],
        correctAnswer: 1,
        difficulty: 2
    },
    // Agrega más preguntas de reading aquí...
];

export const writingQuestions = [
    {
        id: 'q100',
        section: 'writing',
        text: 'Choose the option that best completes the sentence: The team, despite their differences, ______ to finish the project on time.',
        options: ['manage', 'manages', 'managed', 'managing'],
        correctAnswer: 2,
        difficulty: 2
    },
    // Agrega más preguntas de writing aquí...
];