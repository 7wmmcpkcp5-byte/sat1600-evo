// ============================================
// PRACTICE MODE MODULE
// Módulo principal para sesiones de práctica
// ============================================

class PracticeMode {
    constructor() {
        this.currentSession = null;
        this.currentQuestion = null;
        this.timer = null;
        this.timeRemaining = 0;
        this.sessionStats = {
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            skippedQuestions: 0,
            totalTime: 0,
            streak: 0,
            maxStreak: 0
        };
        this.questionHistory = [];
        this.isActive = false;
        this.selectedCategories = [];
        this.difficultyLevel = 'adaptive';
        
        // Referencias a otros módulos
        this.questionRepo = window.questionRepository;
        this.dataService = window.dataService;
        this.uiComponents = window.uiComponents;
        this.xpSystem = window.xpSystem;
        this.currencySystem = window.currencySystem;
        this.achievements = window.achievements;
    }

    // ==================== PUBLIC METHODS ====================

    /**
     * Inicia una nueva sesión de práctica
     * @param {Object} options - Configuración de la sesión
     */
    async startSession(options = {}) {
        try {
            const config = {
                categories: options.categories || ['math', 'reading', 'writing'],
                questionCount: options.questionCount || 10,
                timePerQuestion: options.timePerQuestion || 90, // segundos
                difficulty: options.difficulty || 'adaptive',
                mode: options.mode || 'practice'
            };

            // Validar configuración
            if (!this.validateSessionConfig(config)) {
                throw new Error('Configuración de sesión inválida');
            }

            // Inicializar sesión
            this.currentSession = {
                id: `session_${Date.now()}`,
                startTime: new Date(),
                config: config,
                status: 'active',
                questions: []
            };

            // Cargar preguntas basadas en categorías
            await this.loadQuestions(config.categories, config.questionCount);
            
            // Mostrar UI de práctica
            this.renderPracticeUI();
            
            // Cargar primera pregunta
            await this.loadNextQuestion();
            
            this.isActive = true;
            
            // Registrar inicio de sesión en analytics
            this.dataService.recordEvent('practice_session_started', {
                sessionId: this.currentSession.id,
                config: config
            });

            console.log(`✅ Sesión de práctica iniciada: ${this.currentSession.id}`);

        } catch (error) {
            console.error('❌ Error al iniciar sesión de práctica:', error);
            this.uiComponents.showNotification('Error al iniciar práctica', 'error');
            this.endSession();
        }
    }

    /**
     * Carga la siguiente pregunta en la sesión
     */
    async loadNextQuestion() {
        if (!this.isActive || !this.currentSession) return;

        try {
            // Finalizar pregunta actual si existe
            if (this.currentQuestion) {
                this.endCurrentQuestion();
            }

            // Obtener siguiente pregunta del repositorio
            const nextQuestion = this.questionRepo.getNextQuestion({
                categories: this.currentSession.config.categories,
                difficulty: this.getCurrentDifficulty(),
                excludeIds: this.questionHistory.map(q => q.id)
            });

            if (!nextQuestion) {
                this.uiComponents.showNotification('No hay más preguntas disponibles', 'info');
                this.endSession();
                return;
            }

            // Configurar pregunta actual
            this.currentQuestion = {
                ...nextQuestion,
                startTime: new Date(),
                userAnswer: null,
                timeSpent: 0,
                hintsUsed: 0,
                isAnswered: false
            };

            // Agregar a historial de sesión
            this.currentSession.questions.push(this.currentQuestion);
            this.questionHistory.push(this.currentQuestion.id);

            // Mostrar pregunta en UI
            this.renderQuestion(this.currentQuestion);

            // Iniciar temporizador
            this.startTimer(this.currentSession.config.timePerQuestion);

            // Actualizar contador de preguntas
            this.updateQuestionCounter();

        } catch (error) {
            console.error('❌ Error al cargar pregunta:', error);
        }
    }

    /**
     * Maneja la respuesta del usuario
     * @param {string} selectedOption - Opción seleccionada (A, B, C, D)
     */
    handleAnswer(selectedOption) {
        if (!this.isActive || !this.currentQuestion || this.currentQuestion.isAnswered) return;

        // Detener temporizador
        this.stopTimer();

        // Registrar respuesta
        this.currentQuestion.userAnswer = selectedOption;
        this.currentQuestion.isAnswered = true;
        this.currentQuestion.endTime = new Date();
        this.currentQuestion.timeSpent = this.timeRemaining ? 
            (this.currentSession.config.timePerQuestion - this.timeRemaining) : 
            0;

        // Verificar si es correcta
        const isCorrect = this.checkAnswer(selectedOption);
        
        // Actualizar estadísticas
        this.updateSessionStats(isCorrect);
        
        // Mostrar feedback
        this.showAnswerFeedback(isCorrect, selectedOption);
        
        // Actualizar progreso del usuario
        this.updateUserProgress(isCorrect);
        
        // Registrar en analytics
        this.recordQuestionAnalytics(isCorrect);
        
        // Programar siguiente pregunta
        setTimeout(() => {
            this.loadNextQuestion();
        }, 2500); // 2.5 segundos para mostrar feedback
    }

    /**
     * Proporciona una pista para la pregunta actual
     */
    giveHint() {
        if (!this.currentQuestion || this.currentQuestion.isAnswered) return;

        // Verificar si el usuario tiene suficientes gemas
        if (!this.currencySystem.canAfford('gems', 10)) {
            this.uiComponents.showNotification('Necesitas 10 gemas para una pista', 'warning');
            return;
        }

        // Descontar gemas
        this.currencySystem.deductCurrency('gems', 10);
        
        // Incrementar contador de pistas
        this.currentQuestion.hintsUsed++;
        
        // Obtener pista
        const hint = this.getHintForQuestion(this.currentQuestion);
        
        // Mostrar pista
        this.uiComponents.showHintModal(hint);
        
        // Registrar uso de pista
        this.dataService.recordEvent('hint_used', {
            questionId: this.currentQuestion.id,
            cost: 10
        });
    }

    /**
     * Salta la pregunta actual
     */
    skipQuestion() {
        if (!this.currentQuestion || this.currentQuestion.isAnswered) return;

        // Verificar límite de saltos
        const skipLimit = 3; // Máximo 3 saltos por sesión
        if (this.sessionStats.skippedQuestions >= skipLimit) {
            this.uiComponents.showNotification('Límite de saltos alcanzado', 'warning');
            return;
        }

        // Detener temporizador
        this.stopTimer();

        // Marcar como saltada
        this.currentQuestion.isAnswered = true;
        this.currentQuestion.skipped = true;
        this.currentQuestion.endTime = new Date();
        
        // Actualizar estadísticas
        this.sessionStats.skippedQuestions++;
        this.sessionStats.streak = 0;
        
        // Mostrar mensaje
        this.uiComponents.showNotification('Pregunta saltada', 'info');
        
        // Cargar siguiente pregunta
        setTimeout(() => {
            this.loadNextQuestion();
        }, 1000);
    }

    /**
     * Finaliza la sesión actual
     */
    endSession() {
        if (!this.isActive) return;

        // Detener temporizador
        this.stopTimer();

        // Calcular estadísticas finales
        const finalStats = this.calculateSessionResults();
        
        // Guardar sesión
        this.saveSessionResults(finalStats);
        
        // Mostrar resultados
        this.showSessionResults(finalStats);
        
        // Actualizar progreso del usuario
        this.updateAfterSession(finalStats);
        
        // Limpiar estado
        this.resetSession();
        
        console.log(`✅ Sesión finalizada: ${this.currentSession.id}`);
    }

    // ==================== PRIVATE METHODS ====================

    /**
     * Carga preguntas desde el repositorio
     */
    async loadQuestions(categories, count) {
        try {
            // Validar que el repositorio existe
            if (!this.questionRepo) {
                throw new Error('Repositorio de preguntas no disponible');
            }

            // Cargar preguntas por categorías
            for (const category of categories) {
                const questions = this.questionRepo.getQuestionsByCategory(category, Math.ceil(count / categories.length));
                this.currentSession.questionsPool = [
                    ...(this.currentSession.questionsPool || []),
                    ...questions
                ];
            }

            // Mezclar preguntas
            this.shuffleArray(this.currentSession.questionsPool);

            console.log(`📚 ${this.currentSession.questionsPool.length} preguntas cargadas`);

        } catch (error) {
            console.error('❌ Error al cargar preguntas:', error);
            throw error;
        }
    }

    /**
     * Renderiza la UI de práctica
     */
    renderPracticeUI() {
        const practiceContainer = document.getElementById('practice-container');
        if (!practiceContainer) return;

        // Usar componente UI para el layout de práctica
        const practiceLayout = this.uiComponents.createPracticeLayout();
        practiceContainer.innerHTML = '';
        practiceContainer.appendChild(practiceLayout);

        // Configurar event listeners
        this.setupPracticeEventListeners();
    }

    /**
     * Renderiza una pregunta en la UI
     */
    renderQuestion(question) {
        if (!question) return;

        const questionContainer = document.getElementById('question-container');
        if (!questionContainer) return;

        // Usar componente UI para mostrar pregunta
        const questionCard = this.uiComponents.createQuestionCard(question);
        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionCard);

        // Actualizar temporizador en UI
        this.updateTimerDisplay();
    }

    /**
     * Inicia el temporizador para la pregunta actual
     */
    startTimer(duration) {
        this.timeRemaining = duration;
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.handleTimeUp();
            }
            
            // Cambiar color cuando quede poco tiempo
            if (this.timeRemaining <= 10) {
                this.showTimeWarning();
            }
        }, 1000);
    }

    /**
     * Actualiza la visualización del temporizador
     */
    updateTimerDisplay() {
        const timerElement = document.getElementById('question-timer');
        if (!timerElement) return;

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timerElement.dataset.time = this.timeRemaining;
    }

    /**
     * Maneja cuando se acaba el tiempo
     */
    handleTimeUp() {
        this.stopTimer();
        
        if (this.currentQuestion && !this.currentQuestion.isAnswered) {
            // Marcar como incorrecta por tiempo
            this.currentQuestion.timedOut = true;
            this.handleAnswer(null); // null indica que no se seleccionó respuesta
        }
    }

    /**
     * Verifica si la respuesta es correcta
     */
    checkAnswer(selectedOption) {
        if (!this.currentQuestion || !selectedOption) return false;
        
        return selectedOption === this.currentQuestion.correctAnswer;
    }

    /**
     * Muestra feedback de respuesta
     */
    showAnswerFeedback(isCorrect, selectedOption) {
        const feedbackElement = document.getElementById('answer-feedback');
        if (!feedbackElement) return;

        const correctAnswer = this.currentQuestion.correctAnswer;
        const explanation = this.currentQuestion.explanation || 
                          `La respuesta correcta es ${correctAnswer}.`;
        
        const feedbackHTML = `
            <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <h3>${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</h3>
                <p>${explanation}</p>
                ${!isCorrect ? `<p class="correct-answer">Respuesta correcta: <strong>${correctAnswer}</strong></p>` : ''}
                <div class="feedback-stats">
                    <span>Tiempo: ${this.currentQuestion.timeSpent}s</span>
                    <span>Dificultad: ${this.currentQuestion.difficulty}</span>
                </div>
            </div>
        `;

        feedbackElement.innerHTML = feedbackHTML;
        feedbackElement.style.display = 'block';

        // Animación
        feedbackElement.classList.add('show');
    }

    /**
     * Actualiza el progreso del usuario después de una respuesta
     */
    updateUserProgress(isCorrect) {
        if (!isCorrect) return;

        // Otorgar XP por respuesta correcta
        const xpEarned = this.calculateXPEarned();
        this.xpSystem.addXP(xpEarned);

        // Otorgar monedas
        const coinsEarned = this.calculateCoinsEarned();
        this.currencySystem.addCurrency('coins', coinsEarned);

        // Verificar logros
        this.achievements.checkAnswerBasedAchievements(this.currentQuestion);

        // Actualizar streak
        this.updateStreak(isCorrect);
    }

    /**
     * Calcula XP ganado por respuesta
     */
    calculateXPEarned() {
        if (!this.currentQuestion) return 0;

        const baseXP = 10;
        const difficultyMultiplier = {
            'easy': 0.8,
            'medium': 1.0,
            'hard': 1.5,
            'expert': 2.0
        };

        const timeBonus = this.currentQuestion.timeSpent < 30 ? 5 : 0;
        const streakBonus = this.sessionStats.streak * 2;
        
        return Math.floor(
            baseXP * 
            (difficultyMultiplier[this.currentQuestion.difficulty] || 1) + 
            timeBonus + 
            streakBonus
        );
    }

    /**
     * Calcula monedas ganadas por respuesta
     */
    calculateCoinsEarned() {
        const baseCoins = 5;
        const streakBonus = Math.floor(this.sessionStats.streak / 3) * 2;
        return baseCoins + streakBonus;
    }

    /**
     * Actualiza la racha de respuestas
     */
    updateStreak(isCorrect) {
        if (isCorrect) {
            this.sessionStats.streak++;
            if (this.sessionStats.streak > this.sessionStats.maxStreak) {
                this.sessionStats.maxStreak = this.sessionStats.streak;
            }
            
            // Verificar logros de racha
            this.achievements.checkStreakAchievements(this.sessionStats.streak);
        } else {
            this.sessionStats.streak = 0;
        }
    }

    /**
     * Calcula resultados finales de la sesión
     */
    calculateSessionResults() {
        const total = this.sessionStats.totalQuestions;
        const correct = this.sessionStats.correctAnswers;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        
        return {
            sessionId: this.currentSession.id,
            startTime: this.currentSession.startTime,
            endTime: new Date(),
            duration: Math.floor((new Date() - this.currentSession.startTime) / 1000),
            totalQuestions: total,
            correctAnswers: correct,
            accuracy: Math.round(accuracy),
            averageTime: Math.round(this.sessionStats.totalTime / total) || 0,
            maxStreak: this.sessionStats.maxStreak,
            xpEarned: this.calculateTotalXPEarned(),
            coinsEarned: this.calculateTotalCoinsEarned()
        };
    }

    /**
     * Muestra resultados de la sesión
     */
    showSessionResults(results) {
        const resultsHTML = this.uiComponents.createSessionResults(results);
        const container = document.getElementById('practice-results');
        
        if (container) {
            container.innerHTML = '';
            container.appendChild(resultsHTML);
            container.style.display = 'block';
        }
    }

    /**
     * Guarda resultados de la sesión
     */
    saveSessionResults(results) {
        this.dataService.saveSessionResults(results);
        
        // También guardar en historial local
        const sessionHistory = this.dataService.getUserData().sessionHistory || [];
        sessionHistory.unshift(results);
        
        this.dataService.updateUserData({
            sessionHistory: sessionHistory.slice(0, 50) // Mantener solo últimas 50 sesiones
        });
    }

    /**
     * Reinicia el estado de la sesión
     */
    resetSession() {
        this.currentSession = null;
        this.currentQuestion = null;
        this.timer = null;
        this.timeRemaining = 0;
        this.sessionStats = {
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            skippedQuestions: 0,
            totalTime: 0,
            streak: 0,
            maxStreak: 0
        };
        this.questionHistory = [];
        this.isActive = false;
    }

    // ==================== UTILITY METHODS ====================

    validateSessionConfig(config) {
        if (!config.categories || !Array.isArray(config.categories) || config.categories.length === 0) {
            return false;
        }
        
        if (!config.questionCount || config.questionCount < 1 || config.questionCount > 50) {
            return false;
        }
        
        return true;
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getCurrentDifficulty() {
        if (this.currentSession.config.difficulty !== 'adaptive') {
            return this.currentSession.config.difficulty;
        }

        // Algoritmo adaptativo basado en rendimiento reciente
        const recentAccuracy = this.calculateRecentAccuracy();
        
        if (recentAccuracy > 80) return 'hard';
        if (recentAccuracy > 60) return 'medium';
        return 'easy';
    }

    calculateRecentAccuracy() {
        if (this.questionHistory.length < 3) return 50; // Default
        
        const recentQuestions = this.currentSession.questions.slice(-5);
        const correctCount = recentQuestions.filter(q => q.userAnswer === q.correctAnswer).length;
        
        return (correctCount / recentQuestions.length) * 100;
    }

    updateSessionStats(isCorrect) {
        this.sessionStats.totalQuestions++;
        this.sessionStats.totalTime += this.currentQuestion.timeSpent;
        
        if (isCorrect) {
            this.sessionStats.correctAnswers++;
        } else {
            this.sessionStats.incorrectAnswers++;
        }
    }

    updateQuestionCounter() {
        const counterElement = document.getElementById('question-counter');
        if (counterElement) {
            const current = this.currentSession.questions.length;
            const total = this.currentSession.config.questionCount;
            counterElement.textContent = `Pregunta ${current} de ${total}`;
        }
    }

    setupPracticeEventListeners() {
        // Eliminar listeners anteriores si existen
        this.removeEventListeners();
        
        // Agregar nuevos listeners
        document.addEventListener('practice-answer-selected', (e) => {
            this.handleAnswer(e.detail.option);
        });
        
        document.addEventListener('practice-skip-question', () => {
            this.skipQuestion();
        });
        
        document.addEventListener('practice-request-hint', () => {
            this.giveHint();
        });
        
        document.addEventListener('practice-end-session', () => {
            this.endSession();
        });
        
        // Guardar referencia para poder removerlos después
        this.eventListeners = {
            'practice-answer-selected': (e) => this.handleAnswer(e.detail.option),
            'practice-skip-question': () => this.skipQuestion(),
            'practice-request-hint': () => this.giveHint(),
            'practice-end-session': () => this.endSession()
        };
    }

    removeEventListeners() {
        if (this.eventListeners) {
            Object.entries(this.eventListeners).forEach(([event, handler]) => {
                document.removeEventListener(event, handler);
            });
            this.eventListeners = null;
        }
    }
}

// Exportar módulo
window.practiceMode = new PracticeMode();
console.log('✅ Practice Mode Module cargado');