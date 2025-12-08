// math-advanced.js - Banco completo de 50 preguntas de Matemáticas Avanzadas para SAT
// ID: adv_001 a adv_050
// Temas: Funciones avanzadas, exponenciales, logaritmos, números complejos, trigonometría
// Dificultad: 1-20 fácil, 21-40 media, 41-50 difícil
// Tiempo estimado: fácil 75-90s, media 90-120s, difícil 120-150s

export const MATH_ADVANCED_QUESTIONS = [
    // ==================== GRUPO A: FUNCIONES AVANZADAS (15 preguntas) ====================
    {
        id: "adv_001",
        text: "If f(x) = 3x² - 2x + 5, what is f(2)?",
        options: ["9", "11", "13", "15"],
        correctIndex: 2,
        explanation: "f(2) = 3(2)² - 2(2) + 5 = 3(4) - 4 + 5 = 12 - 4 + 5 = 13",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_002",
        text: "Given f(x) = 2x + 3 and g(x) = x² - 1, what is f(g(2))?",
        options: ["5", "7", "9", "11"],
        correctIndex: 2,
        explanation: "g(2) = 2² - 1 = 3. Then f(g(2)) = f(3) = 2(3) + 3 = 6 + 3 = 9",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_003",
        text: "What is the inverse of the function f(x) = 4x - 7?",
        options: ["(x+7)/4", "(x-7)/4", "(x+4)/7", "(x-4)/7"],
        correctIndex: 0,
        explanation: "To find inverse: y = 4x - 7 → swap x and y: x = 4y - 7 → solve for y: y = (x+7)/4",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 100
    },
    {
        id: "adv_004",
        text: "If f(x) = √(x+4), what is the domain?",
        options: ["x ≥ -4", "x > -4", "x ≥ 0", "x > 0"],
        correctIndex: 0,
        explanation: "Domain requires x+4 ≥ 0 → x ≥ -4",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_005",
        text: "What is the vertex of the parabola y = -2(x-3)² + 5?",
        options: ["(3,5)", "(-3,5)", "(3,-5)", "(-3,-5)"],
        correctIndex: 0,
        explanation: "Vertex form: y = a(x-h)² + k has vertex (h,k) = (3,5)",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 80
    },
    {
        id: "adv_006",
        text: "Which function has range y ≥ 2?",
        options: ["y = x² + 2", "y = -x² + 2", "y = |x| + 2", "y = √x + 2"],
        correctIndex: 0,
        explanation: "y = x² + 2 has minimum value 2 when x=0, so range y ≥ 2",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 95
    },
    {
        id: "adv_007",
        text: "If f(x) is odd and f(3) = 5, what is f(-3)?",
        options: ["5", "-5", "3", "-3"],
        correctIndex: 1,
        explanation: "For odd functions: f(-x) = -f(x). So f(-3) = -f(3) = -5",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_008",
        text: "The graph of y = f(x) is reflected over the y-axis. What is the new function?",
        options: ["y = f(-x)", "y = -f(x)", "y = f(x-1)", "y = f(x)+1"],
        correctIndex: 0,
        explanation: "Reflection over y-axis: replace x with -x → y = f(-x)",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_009",
        text: "If f(x) = 2ˣ and g(x) = log₂x, what is f(g(8))?",
        options: ["2", "4", "8", "16"],
        correctIndex: 2,
        explanation: "g(8) = log₂8 = 3. Then f(g(8)) = f(3) = 2³ = 8",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 110
    },
    {
        id: "adv_010",
        text: "Which transformation changes y = x² to y = (x-2)² + 3?",
        options: [
            "Right 2, up 3",
            "Left 2, up 3",
            "Right 2, down 3",
            "Left 2, down 3"
        ],
        correctIndex: 0,
        explanation: "(x-h) shifts right h, +k shifts up k. So right 2, up 3",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_011",
        text: "If f(x) = x³ - 3x, what is f(-x)?",
        options: ["-x³ + 3x", "-x³ - 3x", "x³ + 3x", "x³ - 3x"],
        correctIndex: 0,
        explanation: "f(-x) = (-x)³ - 3(-x) = -x³ + 3x",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_012",
        text: "What is the end behavior of f(x) = -2x⁴ + 3x² - 5 as x → ∞?",
        options: ["f(x) → ∞", "f(x) → -∞", "f(x) → 0", "f(x) → 5"],
        correctIndex: 1,
        explanation: "Leading term -2x⁴ dominates. As x → ∞, -2x⁴ → -∞",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_013",
        text: "If f(x) = 1/(x-2), what is the vertical asymptote?",
        options: ["x = 0", "x = 2", "x = -2", "x = 1/2"],
        correctIndex: 1,
        explanation: "Vertical asymptote where denominator = 0 → x-2=0 → x=2",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 70
    },
    {
        id: "adv_014",
        text: "What is the period of y = 3sin(2x)?",
        options: ["π", "2π", "π/2", "4π"],
        correctIndex: 0,
        explanation: "Period = 2π/|b| = 2π/2 = π",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_015",
        text: "Which is the graph of a one-to-one function?",
        options: [
            "A horizontal line",
            "A circle",
            "y = x³",
            "y = x²"
        ],
        correctIndex: 2,
        explanation: "y = x³ passes horizontal line test, so one-to-one",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 95
    },

    // ==================== GRUPO B: EXPONENCIALES Y LOGARITMOS (15 preguntas) ====================
    {
        id: "adv_016",
        text: "Solve: 2ˣ⁺¹ = 16",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "16 = 2⁴, so 2ˣ⁺¹ = 2⁴ → x+1 = 4 → x = 3",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 80
    },
    {
        id: "adv_017",
        text: "Simplify: log₃27 + log₃3",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "log₃27 = 3 (since 3³=27), log₃3 = 1. Sum = 4",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_018",
        text: "Solve: e²ˣ = 7",
        options: ["ln7", "ln7/2", "2ln7", "√(ln7)"],
        correctIndex: 1,
        explanation: "Take ln both sides: 2x = ln7 → x = (ln7)/2",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 95
    },
    {
        id: "adv_019",
        text: "Rewrite log₅(x²y) in expanded form",
        options: [
            "2log₅x + log₅y",
            "log₅x² + log₅y",
            "log₅2x + log₅y",
            "2log₅x * log₅y"
        ],
        correctIndex: 0,
        explanation: "log₅(x²y) = log₅x² + log₅y = 2log₅x + log₅y",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_020",
        text: "Solve: log₂(x+3) = 4",
        options: ["13", "14", "15", "16"],
        correctIndex: 0,
        explanation: "Rewrite: x+3 = 2⁴ = 16 → x = 13",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_021",
        text: "Which is equivalent to ln(e³) + ln(e²)?",
        options: ["5", "6", "e⁵", "e⁶"],
        correctIndex: 0,
        explanation: "ln(e³) = 3, ln(e²) = 2. Sum = 5",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 70
    },
    {
        id: "adv_022",
        text: "If 5ˣ = 25ʸ⁺¹, express x in terms of y",
        options: ["2y+2", "y+1", "2y+1", "y+2"],
        correctIndex: 0,
        explanation: "5ˣ = (5²)ʸ⁺¹ = 5²ʸ⁺² → x = 2y+2",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 105
    },
    {
        id: "adv_023",
        text: "Simplify: eˡⁿ⁽ˣ⁺²⁾",
        options: ["x+2", "eˣ+2", "ln(x+2)", "x²"],
        correctIndex: 0,
        explanation: "eˡⁿᵃ = a, so eˡⁿ⁽ˣ⁺²⁾ = x+2",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_024",
        text: "Solve: 3²ˣ⁻¹ = 27",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "27 = 3³, so 3²ˣ⁻¹ = 3³ → 2x-1=3 → 2x=4 → x=2",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_025",
        text: "If log₁₀2 ≈ 0.301, what is log₁₀20?",
        options: ["1.301", "1.699", "2.301", "2.699"],
        correctIndex: 0,
        explanation: "log₁₀20 = log₁₀(2×10) = log₁₀2 + log₁₀10 = 0.301 + 1 = 1.301",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 110
    },
    {
        id: "adv_026",
        text: "Which function grows fastest as x → ∞?",
        options: ["2ˣ", "x²", "x³", "100x"],
        correctIndex: 0,
        explanation: "Exponential functions (2ˣ) grow faster than polynomial functions",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_027",
        text: "Solve: ln(x-1) = 0",
        options: ["0", "1", "2", "e"],
        correctIndex: 2,
        explanation: "ln(x-1) = 0 → x-1 = e⁰ = 1 → x = 2",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 80
    },
    {
        id: "adv_028",
        text: "If bacteria double every 3 hours, what is the hourly growth factor?",
        options: ["2¹/³", "3¹/²", "2³", "3²"],
        correctIndex: 0,
        explanation: "If doubles every 3 hours: 2 = r³ → r = 2¹/³",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 115
    },
    {
        id: "adv_029",
        text: "Combine: 2logx - 3logy",
        options: [
            "log(x²/y³)",
            "log(2x/3y)",
            "log(x² - y³)",
            "log(2x - 3y)"
        ],
        correctIndex: 0,
        explanation: "2logx - 3logy = logx² - logy³ = log(x²/y³)",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 95
    },
    {
        id: "adv_030",
        text: "Solve: 4ˣ = 8ˣ⁻¹",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "4ˣ = (2²)ˣ = 2²ˣ, 8ˣ⁻¹ = (2³)ˣ⁻¹ = 2³ˣ⁻³. So 2²ˣ = 2³ˣ⁻³ → 2x = 3x-3 → x=3",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 120
    },

    // ==================== GRUPO C: NÚMEROS COMPLEJOS Y POLINOMIOS (10 preguntas) ====================
    {
        id: "adv_031",
        text: "Simplify: (3 + 2i) + (5 - 4i)",
        options: ["8 - 2i", "8 + 6i", "2 + 6i", "2 - 2i"],
        correctIndex: 0,
        explanation: "Real parts: 3+5=8. Imaginary: 2i-4i=-2i. Result: 8 - 2i",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_032",
        text: "Multiply: (2 + i)(3 - 2i)",
        options: ["8 - i", "4 - i", "8 + 7i", "4 + 7i"],
        correctIndex: 0,
        explanation: "(2)(3) + (2)(-2i) + (i)(3) + (i)(-2i) = 6 - 4i + 3i - 2i² = 6 - i + 2 = 8 - i (since i²=-1)",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 100
    },
    {
        id: "adv_033",
        text: "What is i⁴⁵?",
        options: ["i", "-i", "1", "-1"],
        correctIndex: 0,
        explanation: "Pattern: i¹=i, i²=-1, i³=-i, i⁴=1 repeats every 4. 45 ÷ 4 = 11 remainder 1 → i⁴⁵ = i¹ = i",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_034",
        text: "Factor completely: x³ - 8",
        options: [
            "(x-2)(x²+2x+4)",
            "(x-2)(x²-2x+4)",
            "(x+2)(x²-2x+4)",
            "(x+2)(x²+2x+4)"
        ],
        correctIndex: 0,
        explanation: "Difference of cubes: a³-b³=(a-b)(a²+ab+b²). Here: x³-2³=(x-2)(x²+2x+4)",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 95
    },
    {
        id: "adv_035",
        text: "If polynomial p(x) has degree 3 and p(2)=0, which is a factor?",
        options: ["x-3", "x+2", "x-2", "x+3"],
        correctIndex: 2,
        explanation: "If p(2)=0, then (x-2) is a factor (Factor Theorem)",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 80
    },
    {
        id: "adv_036",
        text: "Find the conjugate of 4 - 5i",
        options: ["4+5i", "-4+5i", "4-5i", "-4-5i"],
        correctIndex: 0,
        explanation: "Conjugate of a+bi is a-bi. So conjugate of 4-5i is 4+5i",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 70
    },
    {
        id: "adv_037",
        text: "Simplify: √(-25)",
        options: ["5i", "-5i", "5", "-5"],
        correctIndex: 0,
        explanation: "√(-25) = √(25 * -1) = √25 * √(-1) = 5i",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_038",
        text: "If x³ + 2x² - 5x - 6 = (x+1)(x-2)(x+3), what are the zeros?",
        options: [
            "-1, 2, -3",
            "1, -2, 3",
            "1, 2, 3",
            "-1, -2, -3"
        ],
        correctIndex: 0,
        explanation: "Zeros occur when each factor = 0: x+1=0→x=-1, x-2=0→x=2, x+3=0→x=-3",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 85
    },
    {
        id: "adv_039",
        text: "Divide: (x³ - 3x² + 2x + 5) ÷ (x-1)",
        options: [
            "x² - 2x + 4 remainder 9",
            "x² - 2x remainder 7",
            "x² - 4x + 6 remainder 11",
            "x² + 2x + 4 remainder 1"
        ],
        correctIndex: 0,
        explanation: "Synthetic division: coefficients 1,-3,2,5 ÷ (x-1) gives 1,-2,0,9 → x²-2x+0 remainder 9",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 120
    },
    {
        id: "adv_040",
        text: "If 3+4i is a root of a polynomial with real coefficients, what must also be a root?",
        options: ["3-4i", "-3+4i", "-3-4i", "4+3i"],
        correctIndex: 0,
        explanation: "Complex roots of real polynomials come in conjugate pairs: 3+4i and 3-4i",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 95
    },

    // ==================== GRUPO D: TRIGONOMETRÍA Y SISTEMAS (10 preguntas) ====================
    {
        id: "adv_041",
        text: "In right triangle ABC with right angle at C, if sin A = 3/5, what is cos B?",
        options: ["3/5", "4/5", "5/3", "5/4"],
        correctIndex: 0,
        explanation: "In right triangle, sin A = cos B when A and B are complementary. So cos B = 3/5",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 90
    },
    {
        id: "adv_042",
        text: "Solve: 2sinθ + 1 = 0 for 0 ≤ θ ≤ 2π",
        options: ["7π/6, 11π/6", "π/6, 5π/6", "π/3, 2π/3", "π/4, 3π/4"],
        correctIndex: 0,
        explanation: "2sinθ = -1 → sinθ = -1/2. In [0,2π], sin negative in QIII and QIV: θ=7π/6, 11π/6",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 110
    },
    {
        id: "adv_043",
        text: "Simplify: sin²θ + cos²θ",
        options: ["0", "1", "sin2θ", "cos2θ"],
        correctIndex: 1,
        explanation: "Pythagorean identity: sin²θ + cos²θ = 1",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 65
    },
    {
        id: "adv_044",
        text: "If tanθ = 3/4 and θ in QIII, what is sinθ?",
        options: ["-3/5", "3/5", "-4/5", "4/5"],
        correctIndex: 0,
        explanation: "In QIII, both sin and cos negative. tan=3/4→ opposite=3, adjacent=4, hypotenuse=5. sinθ = opp/hyp = -3/5",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 115
    },
    {
        id: "adv_045",
        text: "What is the amplitude of y = -4cos(3x)?",
        options: ["3", "4", "-4", "12"],
        correctIndex: 1,
        explanation: "Amplitude = |a| = |-4| = 4 (amplitude is always positive)",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 70
    },
    {
        id: "adv_046",
        text: "Convert 150° to radians",
        options: ["π/3", "2π/3", "5π/6", "3π/4"],
        correctIndex: 2,
        explanation: "150° × (π/180°) = 150π/180 = 5π/6",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 75
    },
    {
        id: "adv_047",
        text: "Solve the system: x² + y² = 25, x + y = 7",
        options: [
            "(3,4) and (4,3)",
            "(3,4) only",
            "(0,5) and (5,0)",
            "No solution"
        ],
        correctIndex: 0,
        explanation: "From x+y=7 → y=7-x. Substitute: x²+(7-x)²=25 → x²+49-14x+x²=25 → 2x²-14x+24=0 → x²-7x+12=0 → (x-3)(x-4)=0 → x=3 or 4. Corresponding y=4 or 3",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 125
    },
    {
        id: "adv_048",
        text: "Simplify: cos(π/2 - θ)",
        options: ["sinθ", "cosθ", "-sinθ", "-cosθ"],
        correctIndex: 0,
        explanation: "Cofunction identity: cos(π/2 - θ) = sinθ",
        section: "math",
        category: "advanced_math",
        difficulty: "medium",
        timeEstimate: 85
    },
    {
        id: "adv_049",
        text: "What is sin(2θ) if sinθ = 1/3 and cosθ > 0?",
        options: ["2√8/9", "√8/9", 4√2/9", 2√2/9],
        correctIndex: 2,
        explanation: "sin(2θ)=2sinθcosθ. sinθ=1/3, cosθ=√(1-sin²θ)=√(1-1/9)=√(8/9)=2√2/3. So sin2θ=2*(1/3)*(2√2/3)=4√2/9",
        section: "math",
        category: "advanced_math",
        difficulty: "hard",
        timeEstimate: 120
    },
    {
        id: "adv_050",
        text: "Which is equivalent to 1 - cos²θ?",
        options: ["sin²θ", "cos²θ", "tan²θ", "sec²θ"],
        correctIndex: 0,
        explanation: "From Pythagorean identity: sin²θ = 1 - cos²θ",
        section: "math",
        category: "advanced_math",
        difficulty: "easy",
        timeEstimate: 65
    }
];