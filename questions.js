// SAT OWL EVO 5.0 – Question bank (original, SAT‑style but not copied).

/**
 * Each question:
 * {
 *   id: 'M1-01',
 *   subject: 'math' | 'reading',
 *   level: 1 | 2 | 3,
 *   type: 'algebra' | 'geometry' | 'rw-info' | ...,
 *   stem: '...',
 *   choices: ['A', 'B', 'C', 'D'],
 *   correctIndex: 2,
 *   theoryKey: 'math-linear-1',
 *   explanationKey: 'exp-M1-01'
 * }
 */

const QUESTION_BANK = [
  // --- MATH LEVEL 1 (warm‑up) ---
  {
    id: 'M1-01',
    subject: 'math',
    level: 1,
    type: 'linear-equation',
    stem: 'If 3x + 5 = 20, what is the value of x?',
    choices: ['3', '4', '5', '15'],
    correctIndex: 2,
    theoryKey: 'math-linear-one-step',
    explanationKey: 'M1-01'
  },
  {
    id: 'M1-02',
    subject: 'math',
    level: 1,
    type: 'percent',
    stem: 'A jacket originally costs $80 and is discounted 25%. What is the sale price?',
    choices: ['$20', '$40', '$60', '$100'],
    correctIndex: 2,
    theoryKey: 'math-percent-discount',
    explanationKey: 'M1-02'
  },
  {
    id: 'M1-03',
    subject: 'math',
    level: 1,
    type: 'ratio',
    stem: 'The ratio of cats to dogs in a shelter is 2:3. If there are 24 animals in total, how many are dogs?',
    choices: ['9', '12', '15', '18'],
    correctIndex: 2,
    theoryKey: 'math-ratio-total',
    explanationKey: 'M1-03'
  },
  {
    id: 'M1-04',
    subject: 'math',
    level: 1,
    type: 'geometry-perimeter',
    stem: 'A rectangle has a length of 8 and a width of 4. What is its perimeter?',
    choices: ['12', '16', '20', '24'],
    correctIndex: 3,
    theoryKey: 'math-perimeter-rect',
    explanationKey: 'M1-04'
  },

  // --- MATH LEVEL 2 ---
  {
    id: 'M2-01',
    subject: 'math',
    level: 2,
    type: 'system-of-equations',
    stem: 'A system of equations is shown. 2x + y = 7 and x - y = 1. What is the value of x?',
    choices: ['1', '2', '3', '4'],
    correctIndex: 2,
    theoryKey: 'math-system-elim',
    explanationKey: 'M2-01'
  },
  {
    id: 'M2-02',
    subject: 'math',
    level: 2,
    type: 'quadratic',
    stem: 'The equation x² - 5x + 6 = 0 has two solutions. What is their sum?',
    choices: ['2', '3', '5', '6'],
    correctIndex: 2,
    theoryKey: 'math-vieta',
    explanationKey: 'M2-02'
  },
  {
    id: 'M2-03',
    subject: 'math',
    level: 2,
    type: 'function-interpret',
    stem: 'The function f(x) gives the number of tickets sold x days after a concert is announced. What does f(10) represent?',
    choices: [
      '10 tickets are sold in total.',
      'The number of tickets sold each day.',
      'The number of tickets sold 10 days after the announcement.',
      'The day on which all tickets are sold.'
    ],
    correctIndex: 2,
    theoryKey: 'math-functions-meaning',
    explanationKey: 'M2-03'
  },

  // --- MATH LEVEL 3 ---
  {
    id: 'M3-01',
    subject: 'math',
    level: 3,
    type: 'exponential',
    stem: 'A population of bacteria doubles every 6 hours. Which function models the population P(t) after t hours if the initial population is 500?',
    choices: [
      'P(t) = 500 · 2^t',
      'P(t) = 500 · 2^(t/6)',
      'P(t) = 500 · (t/6)^2',
      'P(t) = 500 · 6^t'
    ],
    correctIndex: 1,
    theoryKey: 'math-exponential-growth',
    explanationKey: 'M3-01'
  },
  {
    id: 'M3-02',
    subject: 'math',
    level: 3,
    type: 'circle-geometry',
    stem: 'In a circle with radius 5, an arc has length 5π. What is the measure of the central angle that intercepts the arc?',
    choices: ['36°', '90°', '180°', '270°'],
    correctIndex: 1,
    theoryKey: 'math-arc-length',
    explanationKey: 'M3-02'
  },

  // --- READING & WRITING LEVEL 1 ---
  {
    id: 'R1-01',
    subject: 'reading',
    level: 1,
    type: 'vocab-context',
    stem: 'In the sentence "The scientist was puzzled by the anomalous results," the word "anomalous" most nearly means',
    choices: ['expected', 'irregular', 'useful', 'dangerous'],
    correctIndex: 1,
    theoryKey: 'rw-vocab-context',
    explanationKey: 'R1-01'
  },
  {
    id: 'R1-02',
    subject: 'reading',
    level: 1,
    type: 'main-idea',
    stem: 'A passage describes a teenager who starts a community garden, faces challenges, and eventually inspires neighbors to participate. What is the central idea of the passage?',
    choices: [
      'Gardening is the best way to make money.',
      'Teenagers should be required to volunteer.',
      'Community projects can grow from one person’s initiative.',
      'Plants require careful attention to survive.'
    ],
    correctIndex: 2,
    theoryKey: 'rw-main-idea',
    explanationKey: 'R1-02'
  },

  // --- READING & WRITING LEVEL 2 ---
  {
    id: 'R2-01',
    subject: 'reading',
    level: 2,
    type: 'evidence',
    stem: 'A passage argues that public libraries remain essential in the digital age. Which choice would best support this claim?',
    choices: [
      'A description of a popular new smartphone app.',
      'Statistics showing that library visits have increased in the last five years.',
      'A story about one person who dislikes reading.',
      'An opinion that books are better than movies.'
    ],
    correctIndex: 1,
    theoryKey: 'rw-evidence',
    explanationKey: 'R2-01'
  },
  {
    id: 'R2-02',
    subject: 'reading',
    level: 2,
    type: 'grammar-verbs',
    stem: 'Choose the best version of the underlined portion. "The committee (has decide) to extend the deadline."',
    choices: [
      'has decide',
      'have decide',
      'has decided',
      'have decided'
    ],
    correctIndex: 2,
    theoryKey: 'rw-verb-agreement',
    explanationKey: 'R2-02'
  },

  // --- READING & WRITING LEVEL 3 ---
  {
    id: 'R3-01',
    subject: 'reading',
    level: 3,
    type: 'data-interpretation',
    stem: 'A passage explains that a new transit line reduced car traffic by 18% while increasing bus and train ridership. Which inference is best supported?',
    choices: [
      'More people are choosing public transportation over driving.',
      'The city removed most parking spaces.',
      'Gasoline prices have decreased.',
      'People now travel shorter distances.'
    ],
    correctIndex: 0,
    theoryKey: 'rw-graphs-text',
    explanationKey: 'R3-01'
  }
];

// Exam configuration: realistic timing, but current sample exam uses a subset of the bank.
const EXAM_CONFIG = {
  totalMinutes: 30, // sample exam – engine can be extended to full SAT timing.
  sections: [
    { id: 'exam-math', subject: 'math', questionCount: 6 },
    { id: 'exam-reading', subject: 'reading', questionCount: 6 }
  ]
};
