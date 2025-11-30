// quiz-engine.js - Motor profesional optimizado
class QuizEngine {
    constructor() {
        this.state = {
            questions: [],
            currentIndex: 0,
            userAnswers: [],
            isActive: false,
            isCompleted: false,
            currentQuestion: null,
            startTime: null
        };
        
        this.config = {
            maxQuestions: 10,
            timePerQuestion: 60,
            shuffleQuestions: true
        };
    }

    async startQuiz(subject, questionCount = 5) {
        try {
            const questions = await this.loadQuestions(subject, questionCount);
            
            this.state = {
                questions: this.config.shuffleQuestions ? this.shuffleArray(questions) : questions,
                currentIndex: 0,
                userAnswers: new Array(questions.length).fill(null),
                isActive: true,
                isCompleted: false,
                currentQuestion: questions[0],
                startTime: Date.now()
            };

            return true;
        } catch (error) {
            console.error('Error loading quiz:', error);
            return false;
        }
    }

    async loadQuestions(subject, count) {
        // Base de datos de preguntas integrada (puedes expandirla)
        const questionBank = {
            math: [
                {
                    id: 'math_1',
                    section: 'math',
                    text: 'If 3x + 5 = 20, what is the value of x?',
                    options: ['3', '4', '5', '6'],
                    correctAnswer: 2,
                    difficulty: 1,
                    explanation: 'Subtract 5 from both sides: 3x = 15, then divide by 3: x = 5'
                },
                {
                    id: 'math_2',
                    section: 'math',
                    text: 'What is the area of a circle with radius 4?',
                    options: ['8π', '16π', '32π', '64π'],
                    correctAnswer: 1,
                    difficulty: 2,
                    explanation: 'Area = πr² = π(4)² = 16π'
                }
            ],
            reading: [
                {
                    id: 'reading_1',
                    section: 'reading',
                    text: 'What is the main idea of the passage?',
                    options: [
                        'The importance of education',
                        'The benefits of exercise', 
                        'The history of technology',
                        'The impact of climate change'
                    ],
                    correctAnswer: 0,
                    difficulty: 2,
                    explanation: 'The passage primarily discusses educational reforms'
                }
            ],
            writing: [
                {
                    id: 'writing_1',
                    section: 'writing',
                    text: 'Choose the correct sentence:',
                    options: [
                        'The team are working on their project',
                        'The team is working on their project',
                        'The team were working on their project',
                        'The team be working on their project'
                    ],
                    correctAnswer: 1,
                    difficulty: 1,
                    explanation: '"Team" is a collective noun treated as singular'
                }
            ]
        };

        const questions = questionBank[subject] || questionBank.math;
        return questions.slice(0, Math.min(count, questions.length));
    }

    submitAnswer(selectedOption) {
        if (!this.state.isActive || this.state.isCompleted) {
            return { error: 'Quiz not active' };
        }

        const isCorrect = selectedOption === this.state.currentQuestion.correctAnswer;
        const timeSpent = Math.round((Date.now() - this.state.startTime) / 1000);

        this.state.userAnswers[this.state.currentIndex] = {
            selectedOption,
            isCorrect,
            timeSpent,
            questionId: this.state.currentQuestion.id
        };

        return {
            correct: isCorrect,
            correctAnswer: this.state.currentQuestion.correctAnswer,
            difficulty: this.state.currentQuestion.difficulty,
            timeSpent
        };
    }

    nextQuestion() {
        if (this.state.currentIndex < this.state.questions.length - 1) {
            this.state.currentIndex++;
            this.state.currentQuestion = this.state.questions[this.state.currentIndex];
            this.state.startTime = Date.now();
            return true;
        } else {
            this.state.isCompleted = true;
            this.state.isActive = false;
            return false;
        }
    }

    previousQuestion() {
        if (this.state.currentIndex > 0) {
            this.state.currentIndex--;
            this.state.currentQuestion = this.state.questions[this.state.currentIndex];
            this.state.startTime = Date.now();
            return true;
        }
        return false;
    }

    getCurrentQuestion() {
        return this.state.currentQuestion;
    }

    getProgress() {
        return {
            current: this.state.currentIndex + 1,
            total: this.state.questions.length,
            percentage: ((this.state.currentIndex + 1) / this.state.questions.length) * 100
        };
    }

    computeResults() {
        if (!this.state.isCompleted) return null;

        const results = {
            correct: 0,
            total: this.state.questions.length,
            timeSpent: 0,
            byDifficulty: { easy: 0, medium: 0, hard: 0 },
            accuracyBySubject: {}
        };

        this.state.userAnswers.forEach((answer, index) => {
            if (answer && answer.isCorrect) {
                results.correct++;
                
                // Track by difficulty
                const difficulty = this.state.questions[index].difficulty;
                if (difficulty === 1) results.byDifficulty.easy++;
                else if (difficulty === 2) results.byDifficulty.medium++;
                else results.byDifficulty.hard++;
            }

            if (answer) {
                results.timeSpent += answer.timeSpent;
            }
        });

        results.percentage = (results.correct / results.total) * 100;
        results.averageTime = results.timeSpent / results.total;

        return results;
    }

    getPerformanceAnalysis() {
        const results = this.computeResults();
        if (!results) return null;

        const analysis = {
            overallScore: Math.round(results.percentage),
            timeEfficiency: results.averageTime < 30 ? 'fast' : results.averageTime < 60 ? 'moderate' : 'slow',
            strengths: [],
            weaknesses: []
        };

        // Analyze performance by difficulty
        if (results.byDifficulty.hard > 0) {
            analysis.strengths.push('Good performance on challenging questions');
        }

        if (results.percentage < 70) {
            analysis.weaknesses.push('Focus on fundamental concepts');
        }

        if (results.averageTime > 60) {
            analysis.weaknesses.push('Practice time management');
        }

        return analysis;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Métodos de utilidad para debugging
    getState() {
        return { ...this.state };
    }

    reset() {
        this.state = {
            questions: [],
            currentIndex: 0,
            userAnswers: [],
            isActive: false,
            isCompleted: false,
            currentQuestion: null,
            startTime: null
        };
    }
}

export { QuizEngine };