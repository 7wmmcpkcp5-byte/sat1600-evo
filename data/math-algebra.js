// data/math-algebra.js - Banco de preguntas de álgebra
export const MATH_ALGEBRA_QUESTIONS = [
    {
        id: "alg_001",
        text: "If 3x - 7 = 11, what is the value of x?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        explanation: "Add 7 to both sides: 3x = 18, then divide by 3: x = 6",
        section: "math",
        category: "algebra",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "alg_002", 
        text: "Which of the following is equivalent to (2x + 3)(x - 4)?",
        options: [
            "2x² - 5x - 12",
            "2x² - 11x - 12", 
            "2x² + 5x - 12",
            "2x² - 8x - 12"
        ],
        correctIndex: 0,
        explanation: "Use FOIL method: (2x)(x) + (2x)(-4) + (3)(x) + (3)(-4) = 2x² - 8x + 3x - 12 = 2x² - 5x - 12",
        section: "math",
        category: "algebra", 
        difficulty: "medium",
        timeEstimate: 60
    },
    {
        id: "alg_003",
        text: "A system of equations is given: y = 2x + 1 and y = -x + 4. What is the solution (x, y)?",
        options: [
            "(1, 3)",
            "(2, 5)", 
            "(3, 7)",
            "(0, 4)"
        ],
        correctIndex: 0,
        explanation: "Set equations equal: 2x + 1 = -x + 4 → 3x = 3 → x = 1. Then y = 2(1) + 1 = 3",
        section: "math",
        category: "algebra",
        difficulty: "medium",
        timeEstimate: 75
    }
];