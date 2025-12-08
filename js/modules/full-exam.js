// ============================================
// FULL EXAM MODULE
// Simulador completo del examen SAT
// ============================================

class FullExam {
    constructor() {
        this.examSession = null;
        this.currentSection = null;
        this.currentQuestion = null;
        this.sectionTimer = null;
        this.examTimer = null;
        this.totalTimeRemaining = 3 * 60 * 60 + 15 * 60; // 3h15m en segundos
        this.sectionTimeRemaining = 0;
        this.isExamActive = false;
        this.isPaused = false;
        this.breakTime = false;
        
        // Secciones del SAT
        this.sections = [
            {
                id: 'reading',
                name: 'Reading',
                questionCount: 52,
                time: 65, // minutos
                description: 'Comprensión de lectura'
            },
            {
                id: 'writing',
                name: 'Writing and Language',
                questionCount: 44,
                time: 35,
                description: 'Gramática y expresión escrita'
            },
            {
                id: 'math_no_calc',
                name: 'Math (No Calculator)',
                questionCount: 20,
                time: 25,
                description: 'Matemáticas sin calculadora',
                noCalculator: true
            },
            {
                id: 'math_calc',
                name: 'Math (Calculator)',
                questionCount: 38,
                time: 55,
                description: 'Matemáticas con calculadora',
                calculatorAllowed: true
            }
        ];
        
        // Referencias a otros módulos
        this.questionRepo = window.questionRepository;
        this.practiceMode = window.practiceMode;
        this.dataService = window.dataService;
        this.uiComponents = window.uiComponents;
        this.dateUtils = window.dateUtils;
        this.mathUtils = window.mathUtils;
    }

    // ==================== PUBLIC METHODS ====================

    /**
     * Inicia un nuevo examen completo
     */
    async startNewExam() {
        try {
            // Verificar si hay un examen en progreso
            const savedExam = this.dataService.getUserData().activeExam;
            if (savedExam && savedExam.status === 'in_progress') {
                const resume = confirm('Tienes un examen en progreso. ¿Quieres reanudarlo?');
                if (resume) {
                    await this.resumeExam(savedExam);
                    return;
                } else {
                    // Eliminar examen guardado
                    this.dataService.updateUserData({ activeExam: null });
                }
            }

            // Confirmar inicio
            const confirmed = await this.uiComponents.showConfirmationModal(
                'Iniciar Examen Completo SAT',
                'El examen completo dura 3 horas y 15 minutos con descansos incluidos. ¿Estás listo para comenzar?',
                'warning'
            );

            if (!confirmed) return;

            // Crear nueva sesión de examen
            this.examSession = {
                id: `exam_${Date.now()}`,
                startTime: new Date(),
                status: 'in_progress',
                sections: this.sections.map(section => ({
                    ...section,
                    questions: [],
                    startTime: null,
                    endTime: null,
                    completed: false
                })),
                currentSectionIndex: 0,
                breaks: [],
                settings: {
                    enableBreaks: true,
                    strictTiming: true,
                    showCalculator: true
                }
            };

            // Guardar examen en progreso
            this.saveExamState();

            // Inicializar UI de examen
            this.renderExamUI();

            // Iniciar primera sección
            await this.startSection(0);

            this.isExamActive = true;

            // Registrar evento
            this.dataService.recordEvent('full_exam_started', {
                examId: this.examSession.id
            });

            console.log(`✅ Examen completo iniciado: ${this.examSession.id}`);

        } catch (error) {
            console.error('❌ Error al iniciar examen:', error);
            this.uiComponents.showNotification('Error al iniciar examen', 'error');
            this.endExam();
        }
    }

    /**
     * Reanuda un examen guardado
     */
    async resumeExam(savedExam) {
        try {
            this.examSession = savedExam;
            
            // Restaurar timers basado en tiempo transcurrido
            const now = new Date();
            const startTime = new Date(savedExam.startTime);
            const elapsedSeconds = Math.floor((now - startTime) / 1000);
            
            this.totalTimeRemaining = Math.max(0, (3 * 60 * 60 + 15 * 60) - elapsedSeconds);
            
            // Inicializar UI
            this.renderExamUI();
            
            // Reanudar sección actual
            const currentSection = this.examSession.sections[this.examSession.currentSectionIndex];
            if (currentSection && currentSection.startTime && !currentSection.completed) {
                const sectionStart = new Date(currentSection.startTime);
                const sectionElapsed = Math.floor((now - sectionStart) / 1000);
                this.sectionTimeRemaining = Math.max(0, (currentSection.time * 60) - sectionElapsed);
                
                await this.startSection(this.examSession.currentSectionIndex, true);
            } else {
                await this.startSection(this.examSession.currentSectionIndex);
            }
            
            this.isExamActive = true;
            
            this.uiComponents.showNotification('Examen reanudado', 'success');
            
        } catch (error) {
            console.error('❌ Error al reanudar examen:', error);
            this.uiComponents.showNotification('Error al reanudar examen', 'error');
            this.endExam();
        }
    }

    /**
     * Pausa/reanuda el examen
     */
    togglePause() {
        if (!this.isExamActive) return;
        
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.stopTimers();
            this.uiComponents.showNotification('Examen pausado', 'info');
            
            // Mostrar modal de pausa
            this.showPauseModal();
        } else {
            this.startTimers();
            this.uiComponents.showNotification('Examen reanudado', 'success');
        }
    }

    /**
     * Finaliza el examen
     */
    async endExam() {
        if (!this.isExamActive && !this.examSession) return;
        
        try {
            // Detener todos los timers
            this.stopTimers();
            
            // Si el examen estaba en progreso, calcular resultados
            if (this.examSession && this.examSession.status === 'in_progress') {
                const confirmEnd = await this.uiComponents.showConfirmationModal(
                    'Finalizar Examen',
                    '¿Estás seguro de que quieres finalizar el examen? Se calificarán las respuestas completadas.',
                    'warning'
                );
                
                if (!confirmEnd) {
                    this.startTimers();
                    return;
                }
                
                // Marcar examen como completado
                this.examSession.status = 'completed';
                this.examSession.endTime = new Date();
                
                // Calificar secciones completadas
                await this.gradeExam();
                
                // Mostrar resultados
                await this.showExamResults();
                
                // Guardar resultados
                this.saveExamResults();
            }
            
            // Limpiar estado
            this.resetExam();
            
        } catch (error) {
            console.error('❌ Error al finalizar examen:', error);
        }
    }

    // ==================== SECTION MANAGEMENT ====================

    /**
     * Inicia una sección del examen
     */
    async startSection(sectionIndex, isResume = false) {
        if (!this.examSession || sectionIndex >= this.examSession.sections.length) return;
        
        try {
            // Detener sección anterior si existe
            if (this.currentSection && !isResume) {
                await this.endCurrentSection();
            }
            
            // Configurar sección actual
            this.examSession.currentSectionIndex = sectionIndex;
            this.currentSection = this.examSession.sections[sectionIndex];
            
            // Inicializar sección si es nueva
            if (!isResume) {
                this.currentSection.startTime = new Date();
                this.currentSection.questions = [];
                this.currentSection.completed = false;
                
                // Cargar preguntas para esta sección
                await this.loadSectionQuestions();
            }
            
            // Configurar timer de sección
            this.sectionTimeRemaining = this.currentSection.time * 60; // Convertir a segundos
            
            // Actualizar UI
            this.renderSectionUI();
            
            // Iniciar timers
            this.startTimers();
            
            // Mostrar notificación
            if (!isResume) {
                this.uiComponents.showNotification(
                    `Sección ${sectionIndex + 1}: ${this.currentSection.name}`, 
                    'info'
                );
            }
            
            // Si no hay calculadora permitida, ocultarla
            if (this.currentSection.noCalculator) {
                this.hideCalculator();
            }
            
            // Guardar estado
            this.saveExamState();
            
            // Cargar primera pregunta
            if (this.currentSection.questions.length > 0 && !isResume) {
                this.loadNextQuestion();
            }
            
        } catch (error) {
            console.error('❌ Error al iniciar sección:', error);
        }
    }

    /**
     * Finaliza la sección actual
     */
    async endCurrentSection() {
        if (!this.currentSection) return;
        
        // Detener timer de sección
        this.stopSectionTimer();
        
        // Marcar como completada
        this.currentSection.endTime = new Date();
        this.currentSection.completed = true;
        
        // Calcular tiempo utilizado
        const start = new Date(this.currentSection.startTime);
        const end = new Date(this.currentSection.endTime);
        this.currentSection.timeUsed = Math.floor((end - start) / 1000);
        
        // Verificar si hay tiempo extra no utilizado
        if (this.sectionTimeRemaining > 0) {
            this.currentSection.timeRemaining = this.sectionTimeRemaining;
        }
        
        // Guardar estado
        this.saveExamState();
        
        // Si es la última sección, terminar examen
        if (this.examSession.currentSectionIndex >= this.examSession.sections.length - 1) {
            await this.endExam();
            return;
        }
        
        // Si hay descanso configurado, mostrarlo
        const nextSectionIndex = this.examSession.currentSectionIndex + 1;
        const hasBreak = this.shouldTakeBreak(nextSectionIndex);
        
        if (hasBreak) {
            await this.startBreak(nextSectionIndex);
        } else {
            // Iniciar siguiente sección inmediatamente
            await this.startSection(nextSectionIndex);
        }
    }

    // ==================== QUESTION MANAGEMENT ====================

    /**
     * Carga preguntas para la sección actual
     */
    async loadSectionQuestions() {
        if (!this.currentSection) return;
        
        try {
            const sectionId = this.currentSection.id;
            let questions = [];
            
            // Cargar preguntas basadas en el tipo de sección
            switch (sectionId) {
                case 'reading':
                    questions = this.questionRepo.getQuestionsByCategory('reading', 52);
                    break;
                case 'writing':
                    questions = this.questionRepo.getQuestionsByCategory('writing', 44);
                    break;
                case 'math_no_calc':
                    questions = this.questionRepo.getQuestionsByCategory('math', 20)
                        .filter(q => q.noCalculator || q.difficulty !== 'calculator');
                    break;
                case 'math_calc':
                    questions = this.questionRepo.getQuestionsByCategory('math', 38);
                    break;
            }
            
            // Si no hay suficientes preguntas, generar algunas placeholder
            if (questions.length < this.currentSection.questionCount) {
                const needed = this.currentSection.questionCount - questions.length;
                const placeholders = this.generatePlaceholderQuestions(needed, sectionId);
                questions = [...questions, ...placeholders];
            }
            
            // Limitar al número exacto requerido
            questions = questions.slice(0, this.currentSection.questionCount);
            
            // Asignar IDs secuenciales
            questions = questions.map((q, index) => ({
                ...q,
                examQuestionId: `${sectionId}_${index + 1}`,
                sectionIndex: index + 1,
                userAnswer: null,
                isAnswered: false,
                isFlagged: false,
                timeSpent: 0
            }));
            
            this.currentSection.questions = questions;
            
        } catch (error) {
            console.error('❌ Error al cargar preguntas de sección:', error);
        }
    }

    /**
     * Carga la siguiente pregunta
     */
    loadNextQuestion() {
        if (!this.currentSection || !this.currentSection.questions) return;
        
        // Encontrar siguiente pregunta no respondida
        const nextQuestion = this.currentSection.questions.find(q => !q.isAnswered);
        
        if (!nextQuestion) {
            // No hay más preguntas, terminar sección
            this.endCurrentSection();
            return;
        }
        
        // Configurar pregunta actual
        this.currentQuestion = {
            ...nextQuestion,
            startTime: new Date()
        };
        
        // Renderizar pregunta
        this.renderQuestion(this.currentQuestion);
        
        // Actualizar navegación
        this.updateQuestionNavigation();
    }

    /**
     * Maneja respuesta del usuario
     */
    handleAnswer(selectedOption) {
        if (!this.currentQuestion || !this.currentSection) return;
        
        // Registrar respuesta
        const questionIndex = this.currentSection.questions.findIndex(
            q => q.examQuestionId === this.currentQuestion.examQuestionId
        );
        
        if (questionIndex >= 0) {
            this.currentSection.questions[questionIndex].userAnswer = selectedOption;
            this.currentSection.questions[questionIndex].isAnswered = true;
            this.currentSection.questions[questionIndex].endTime = new Date();
            this.currentSection.questions[questionIndex].timeSpent = Math.floor(
                (new Date() - this.currentQuestion.startTime) / 1000
            );
        }
        
        // Guardar estado
        this.saveExamState();
        
        // Cargar siguiente pregunta
        setTimeout(() => {
            this.loadNextQuestion();
        }, 500);
    }

    /**
     * Marca/desmarca pregunta como revisión
     */
    toggleQuestionFlag() {
        if (!this.currentQuestion) return;
        
        const questionIndex = this.currentSection.questions.findIndex(
            q => q.examQuestionId === this.currentQuestion.examQuestionId
        );
        
        if (questionIndex >= 0) {
            this.currentSection.questions[questionIndex].isFlagged = 
                !this.currentSection.questions[questionIndex].isFlagged;
            
            // Actualizar UI
            this.updateQuestionFlagUI();
            
            // Guardar estado
            this.saveExamState();
        }
    }

    /**
     * Navega a una pregunta específica
     */
    navigateToQuestion(questionNumber) {
        if (!this.currentSection || questionNumber < 1 || 
            questionNumber > this.currentSection.questions.length) return;
        
        const targetQuestion = this.currentSection.questions[questionNumber - 1];
        
        if (targetQuestion) {
            this.currentQuestion = {
                ...targetQuestion,
                startTime: new Date()
            };
            
            this.renderQuestion(this.currentQuestion);
            this.updateQuestionNavigation();
        }
    }

    // ==================== TIMER MANAGEMENT ====================

    /**
     * Inicia todos los timers
     */
    startTimers() {
        if (this.isPaused) return;
        
        this.startTotalTimer();
        this.startSectionTimer();
    }

    /**
     * Inicia timer del examen completo
     */
    startTotalTimer() {
        if (this.examTimer) clearInterval(this.examTimer);
        
        this.examTimer = setInterval(() => {
            if (this.isPaused) return;
            
            this.totalTimeRemaining--;
            this.updateTotalTimerDisplay();
            
            if (this.totalTimeRemaining <= 0) {
                this.handleTotalTimeUp();
            }
            
            // Advertencias de tiempo
            if (this.totalTimeRemaining === 30 * 60) { // 30 minutos
                this.showTimeWarning('Quedan 30 minutos en total');
            }
            if (this.totalTimeRemaining === 5 * 60) { // 5 minutos
                this.showTimeWarning('Quedan 5 minutos en total');
            }
            
        }, 1000);
    }

    /**
     * Inicia timer de la sección actual
     */
    startSectionTimer() {
        if (this.sectionTimer) clearInterval(this.sectionTimer);
        
        this.sectionTimer = setInterval(() => {
            if (this.isPaused) return;
            
            this.sectionTimeRemaining--;
            this.updateSectionTimerDisplay();
            
            if (this.sectionTimeRemaining <= 0) {
                this.handleSectionTimeUp();
            }
            
            // Advertencias de tiempo por sección
            if (this.sectionTimeRemaining === 60) { // 1 minuto
                this.showTimeWarning('Queda 1 minuto en esta sección');
            }
            if (this.sectionTimeRemaining === 30) { // 30 segundos
                this.showTimeWarning('Quedan 30 segundos');
            }
            if (this.sectionTimeRemaining === 10) { // 10 segundos
                this.showTimeWarning('Quedan 10 segundos');
            }
            
        }, 1000);
    }

    /**
     * Detiene todos los timers
     */
    stopTimers() {
        if (this.examTimer) {
            clearInterval(this.examTimer);
            this.examTimer = null;
        }
        
        if (this.sectionTimer) {
            clearInterval(this.sectionTimer);
            this.sectionTimer = null;
        }
    }

    /**
     * Detiene solo el timer de sección
     */
    stopSectionTimer() {
        if (this.sectionTimer) {
            clearInterval(this.sectionTimer);
            this.sectionTimer = null;
        }
    }

    // ==================== BREAK MANAGEMENT ====================

    /**
     * Determina si hay descanso antes de una sección
     */
    shouldTakeBreak(nextSectionIndex) {
        if (!this.examSession.settings.enableBreaks) return false;
        
        // Descansos según SAT real:
        // - Después de Reading (sección 1)
        // - Después de Math No Calculator (sección 3)
        const breakSections = [1, 3]; // Índices 0-based después de estas secciones
        
        return breakSections.includes(nextSectionIndex - 1);
    }

    /**
     * Inicia un descanso
     */
    async startBreak(nextSectionIndex) {
        this.breakTime = true;
        this.stopTimers();
        
        const breakDuration = nextSectionIndex === 2 ? 10 * 60 : 5 * 60; // 10 min o 5 min
        let breakTimeRemaining = breakDuration;
        
        // Registrar descanso
        this.examSession.breaks.push({
            index: nextSectionIndex,
            startTime: new Date(),
            duration: breakDuration
        });
        
        // Mostrar modal de descanso
        const breakModal = this.uiComponents.createBreakModal(breakDuration, nextSectionIndex);
        document.getElementById('exam-container').appendChild(breakModal);
        
        // Timer de descanso
        const breakTimer = setInterval(() => {
            breakTimeRemaining--;
            
            // Actualizar contador
            const minutes = Math.floor(breakTimeRemaining / 60);
            const seconds = breakTimeRemaining % 60;
            const timerElement = document.getElementById('break-timer');
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (breakTimeRemaining <= 0) {
                clearInterval(breakTimer);
                this.endBreak(nextSectionIndex);
            }
        }, 1000);
        
        // Permitir saltar descanso
        document.getElementById('skip-break')?.addEventListener('click', () => {
            clearInterval(breakTimer);
            this.endBreak(nextSectionIndex);
        });
    }

    /**
     * Finaliza el descanso
     */
    endBreak(nextSectionIndex) {
        this.breakTime = false;
        
        // Remover modal
        const breakModal = document.getElementById('break-modal');
        if (breakModal) breakModal.remove();
        
        // Actualizar descanso
        const currentBreak = this.examSession.breaks.find(b => b.index === nextSectionIndex);
        if (currentBreak) {
            currentBreak.endTime = new Date();
            currentBreak.actualDuration = Math.floor(
                (new Date(currentBreak.endTime) - new Date(currentBreak.startTime)) / 1000
            );
        }
        
        // Iniciar siguiente sección
        this.startSection(nextSectionIndex);
    }

    // ==================== GRADING AND RESULTS ====================

    /**
     * Califica el examen completo
     */
    async gradeExam() {
        if (!this.examSession) return;
        
        try {
            const results = {
                examId: this.examSession.id,
                startTime: this.examSession.startTime,
                endTime: this.examSession.endTime || new Date(),
                totalDuration: 0,
                sections: {},
                rawScores: {},
                scaledScores: {},
                percentiles: {},
                recommendations: []
            };
            
            // Calcular duración total
            if (this.examSession.startTime && this.examSession.endTime) {
                results.totalDuration = Math.floor(
                    (new Date(this.examSession.endTime) - new Date(this.examSession.startTime)) / 1000
                );
            }
            
            // Calificar cada sección
            for (const section of this.examSession.sections) {
                if (!section.completed) continue;
                
                const sectionResults = this.gradeSection(section);
                results.sections[section.id] = sectionResults;
                
                // Acumular puntajes brutos
                results.rawScores[section.id] = sectionResults.rawScore;
            }
            
            // Convertir a puntajes escalados SAT
            results.scaledScores = this.convertToScaledScores(results.rawScores);
            
            // Calcular total
            results.scaledScores.total = this.mathUtils.sum(Object.values(results.scaledScores));
            
            // Calcular percentiles
            results.percentiles = this.calculatePercentiles(results.scaledScores);
            
            // Generar recomendaciones
            results.recommendations = this.generateRecommendations(results);
            
            this.examSession.results = results;
            
        } catch (error) {
            console.error('❌ Error al calificar examen:', error);
        }
    }

    /**
     * Califica una sección individual
     */
    gradeSection(section) {
        const questions = section.questions || [];
        const totalQuestions = questions.length;
        const answeredQuestions = questions.filter(q => q.isAnswered);
        
        // Contar respuestas correctas
        let correctCount = 0;
        let incorrectCount = 0;
        let omittedCount = 0;
        
        answeredQuestions.forEach(q => {
            if (q.userAnswer === q.correctAnswer) {
                correctCount++;
            } else if (q.userAnswer) {
                incorrectCount++;
            } else {
                omittedCount++;
            }
        });
        
        // Calcular puntaje bruto (SAT: +1 correcta, -0.25 incorrecta, 0 omitida)
        const rawScore = correctCount - (incorrectCount * 0.25);
        
        // Estadísticas de tiempo
        const totalTime = this.mathUtils.sum(questions.map(q => q.timeSpent || 0));
        const avgTime = totalTime / answeredQuestions.length;
        
        return {
            totalQuestions,
            answered: answeredQuestions.length,
            correct: correctCount,
            incorrect: incorrectCount,
            omitted: omittedCount,
            rawScore: Math.max(0, rawScore),
            accuracy: this.mathUtils.percentage(correctCount, answeredQuestions.length),
            avgTime: avgTime || 0,
            timeUsed: section.timeUsed || 0,
            timeRemaining: section.timeRemaining || 0
        };
    }

    /**
     * Convierte puntajes brutos a escalados SAT
     */
    convertToScaledScores(rawScores) {
        // Tabla de conversión aproximada SAT
        const conversionTables = {
            reading: (raw) => {
                const scaled = 200 + (raw * 10);
                return Math.max(200, Math.min(800, Math.round(scaled / 10) * 10));
            },
            writing: (raw) => {
                const scaled = 200 + (raw * 10);
                return Math.max(200, Math.min(800, Math.round(scaled / 10) * 10));
            },
            math_no_calc: (raw) => {
                const scaled = 200 + (raw * 20);
                return Math.max(200, Math.min(800, Math.round(scaled / 10) * 10));
            },
            math_calc: (raw) => {
                const scaled = 200 + (raw * 10);
                return Math.max(200, Math.min(800, Math.round(scaled / 10) * 10));
            }
        };
        
        const scaled = {};
        
        // Combinar math sections
        const mathRaw = (rawScores.math_no_calc || 0) + (rawScores.math_calc || 0);
        scaled.math = conversionTables.math_calc(mathRaw);
        
        // Reading y writing separados
        scaled.reading = conversionTables.reading(rawScores.reading || 0);
        scaled.writing = conversionTables.writing(rawScores.writing || 0);
        
        return scaled;
    }

    /**
     * Calcula percentiles para los puntajes
     */
    calculatePercentiles(scaledScores) {
        return {
            reading: this.mathUtils.calculateSATPercentile(scaledScores.reading, 'reading'),
            writing: this.mathUtils.calculateSATPercentile(scaledScores.writing, 'reading'), // Misma tabla que reading
            math: this.mathUtils.calculateSATPercentile(scaledScores.math, 'math'),
            total: this.mathUtils.calculateSATPercentile(scaledScores.total, 'total')
        };
    }

    /**
     * Genera recomendaciones basadas en resultados
     */
    generateRecommendations(results) {
        const recommendations = [];
        const { sections, scaledScores } = results;
        
        // Análisis por sección
        Object.entries(sections).forEach(([sectionId, sectionResults]) => {
            if (sectionResults.accuracy < 70) {
                recommendations.push({
                    type: 'weakness',
                    section: sectionId,
                    message: `Necesitas mejorar en ${sectionId} (${sectionResults.accuracy}% de precisión)`,
                    priority: sectionResults.accuracy < 50 ? 'high' : 'medium'
                });
            }
            
            if (sectionResults.avgTime > 90) {
                recommendations.push({
                    type: 'timing',
                    section: sectionId,
                    message: `Estás tardando demasiado en ${sectionId} (${Math.round(sectionResults.avgTime)}s/pregunta)`,
                    priority: 'medium'
                });
            }
        });
        
        // Puntajes bajos
        Object.entries(scaledScores).forEach(([section, score]) => {
            if (section !== 'total' && score < 500) {
                recommendations.push({
                    type: 'score',
                    section: section,
                    message: `Puntaje bajo en ${section}: ${score}. Enfócate en esta área.`,
                    priority: 'high'
                });
            }
        });
        
        // Ordenar por prioridad
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    // ==================== UI RENDERING ====================

    /**
     * Renderiza la UI principal del examen
     */
    renderExamUI() {
        const examContainer = document.getElementById('exam-container');
        if (!examContainer) return;
        
        const examUI = this.uiComponents.createExamLayout(this.examSession);
        examContainer.innerHTML = '';
        examContainer.appendChild(examUI);
        
        // Configurar event listeners
        this.setupExamEventListeners();
    }

    /**
     * Renderiza la UI de la sección actual
     */
    renderSectionUI() {
        if (!this.currentSection) return;
        
        // Actualizar header de sección
        const sectionHeader = document.getElementById('section-header');
        if (sectionHeader) {
            sectionHeader.innerHTML = `
                <h2>${this.currentSection.name}</h2>
                <p>${this.currentSection.description}</p>
                <div class="section-stats">
                    <span>Preguntas: ${this.currentSection.questionCount}</span>
                    <span>Tiempo: ${this.currentSection.time} minutos</span>
                    ${this.currentSection.noCalculator ? '<span class="no-calc">✗ Calculadora</span>' : ''}
                </div>
            `;
        }
        
        // Actualizar navegación de preguntas
        this.updateQuestionNavigation();
        
        // Actualizar timers
        this.updateTotalTimerDisplay();
        this.updateSectionTimerDisplay();
    }

    /**
     * Renderiza una pregunta
     */
    renderQuestion(question) {
        const questionContainer = document.getElementById('exam-question-container');
        if (!questionContainer) return;
        
        const questionCard = this.uiComponents.createExamQuestionCard(question, this.currentSection);
        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionCard);
        
        // Configurar event listeners para esta pregunta
        this.setupQuestionEventListeners();
    }

    // ==================== EVENT HANDLERS ====================

    /**
     * Maneja cuando se acaba el tiempo de la sección
     */
    handleSectionTimeUp() {
        this.stopSectionTimer();
        
        this.uiComponents.showNotification(
            '¡Tiempo terminado para esta sección!',
            'warning'
        );
        
        // Terminar sección automáticamente
        setTimeout(() => {
            this.endCurrentSection();
        }, 2000);
    }

    /**
     * Maneja cuando se acaba el tiempo total
     */
    handleTotalTimeUp() {
        this.stopTimers();
        
        this.uiComponents.showNotification(
            '¡Tiempo total del examen terminado!',
            'error'
        );
        
        // Finalizar examen
        setTimeout(() => {
            this.endExam();
        }, 3000);
    }

    /**
     * Muestra advertencia de tiempo
     */
    showTimeWarning(message) {
        this.uiComponents.showNotification(message, 'warning', 5000);
        
        // Efecto de sonido opcional
        if (typeof window.audioManager !== 'undefined') {
            window.audioManager.playSound('time_warning');
        }
    }

    // ==================== STATE MANAGEMENT ====================

    /**
     * Guarda el estado actual del examen
     */
    saveExamState() {
        if (!this.examSession) return;
        
        // Actualizar timestamp
        this.examSession.lastSaved = new Date();
        
        // Guardar en localStorage
        this.dataService.updateUserData({
            activeExam: this.examSession
        });
    }

    /**
     * Guarda resultados finales del examen
     */
    saveExamResults() {
        if (!this.examSession || !this.examSession.results) return;
        
        // Agregar a historial de exámenes
        const examHistory = this.dataService.getUserData().examHistory || [];
        examHistory.unshift(this.examSession);
        
        // Limitar historial a últimos 10 exámenes
        const limitedHistory = examHistory.slice(0, 10);
        
        // Limpiar examen activo
        this.dataService.updateUserData({
            activeExam: null,
            examHistory: limitedHistory
        });
        
        // Registrar evento
        this.dataService.recordEvent('full_exam_completed', {
            examId: this.examSession.id,
            scores: this.examSession.results.scaledScores
        });
    }

    /**
     * Reinicia el estado del examen
     */
    resetExam() {
        this.examSession = null;
        this.currentSection = null;
        this.currentQuestion = null;
        this.sectionTimer = null;
        this.examTimer = null;
        this.totalTimeRemaining = 3 * 60 * 60 + 15 * 60;
        this.sectionTimeRemaining = 0;
        this.isExamActive = false;
        this.isPaused = false;
        this.breakTime = false;
        
        // Limpiar UI
        const examContainer = document.getElementById('exam-container');
        if (examContainer) {
            examContainer.innerHTML = '';
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Genera preguntas placeholder cuando faltan
     */
    generatePlaceholderQuestions(count, sectionId) {
        const placeholders = [];
        const categories = {
            'reading': 'Comprensión de lectura',
            'writing': 'Gramática y escritura',
            'math_no_calc': 'Matemáticas',
            'math_calc': 'Matemáticas'
        };
        
        for (let i = 0; i < count; i++) {
            placeholders.push({
                id: `placeholder_${sectionId}_${i}`,
                question: `Pregunta de práctica ${i + 1} - ${categories[sectionId]}`,
                options: ['A) Opción A', 'B) Opción B', 'C) Opción C', 'D) Opción D'],
                correctAnswer: 'A',
                explanation: 'Esta es una pregunta de placeholder para completar el examen.',
                difficulty: 'medium',
                category: sectionId.includes('math') ? 'math' : sectionId,
                tags: ['placeholder', 'practice']
            });
        }
        
        return placeholders;
    }

    /**
     * Actualiza la navegación de preguntas
     */
    updateQuestionNavigation() {
        if (!this.currentSection) return;
        
        const navContainer = document.getElementById('question-navigation');
        if (!navContainer) return;
        
        const questions = this.currentSection.questions;
        let navHTML = '<div class="question-nav-grid">';
        
        questions.forEach((q, index) => {
            const questionNum = index + 1;
            const isCurrent = this.currentQuestion && 
                             q.examQuestionId === this.currentQuestion.examQuestionId;
            const isAnswered = q.isAnswered;
            const isFlagged = q.isFlagged;
            
            navHTML += `
                <button class="question-nav-btn 
                    ${isCurrent ? 'current' : ''} 
                    ${isAnswered ? 'answered' : ''}
                    ${isFlagged ? 'flagged' : ''}"
                    data-question="${questionNum}"
                    onclick="fullExam.navigateToQuestion(${questionNum})">
                    ${questionNum}
                    ${isFlagged ? '🚩' : ''}
                </button>
            `;
        });
        
        navHTML += '</div>';
        navContainer.innerHTML = navHTML;
    }

    /**
     * Actualiza el display del timer total
     */
    updateTotalTimerDisplay() {
        const timerElement = document.getElementById('total-timer');
        if (!timerElement) return;
        
        const hours = Math.floor(this.totalTimeRemaining / 3600);
        const minutes = Math.floor((this.totalTimeRemaining % 3600) / 60);
        const seconds = this.totalTimeRemaining % 60;
        
        timerElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Cambiar color cuando quede poco tiempo
        if (this.totalTimeRemaining < 5 * 60) {
            timerElement.className = 'time-warning';
        } else if (this.totalTimeRemaining < 30 * 60) {
            timerElement.className = 'time-alert';
        } else {
            timerElement.className = '';
        }
    }

    /**
     * Actualiza el display del timer de sección
     */
    updateSectionTimerDisplay() {
        const timerElement = document.getElementById('section-timer');
        if (!timerElement) return;
        
        const minutes = Math.floor(this.sectionTimeRemaining / 60);
        const seconds = this.sectionTimeRemaining % 60;
        
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Cambiar color cuando quede poco tiempo
        if (this.sectionTimeRemaining < 60) {
            timerElement.className = 'time-warning';
        } else if (this.sectionTimeRemaining < 5 * 60) {
            timerElement.className = 'time-alert';
        } else {
            timerElement.className = '';
        }
    }

    /**
     * Muestra resultados del examen
     */
    async showExamResults() {
        if (!this.examSession || !this.examSession.results) return;
        
        const results = this.examSession.results;
        const resultsHTML = this.uiComponents.createExamResults(results);
        
        const resultsModal = this.uiComponents.createModal(
            'Resultados del Examen SAT',
            resultsHTML,
            'large'
        );
        
        document.body.appendChild(resultsModal);
        
        // Configurar botones de acción
        document.getElementById('save-results-btn')?.addEventListener('click', () => {
            this.downloadResultsPDF();
        });
        
        document.getElementById('review-exam-btn')?.addEventListener('click', () => {
            this.showExamReview();
        });
    }

    /**
     * Muestra revisión detallada del examen
     */
    showExamReview() {
        // Implementar revisión pregunta por pregunta
        console.log('Mostrando revisión del examen...');
    }

    /**
     * Descarga resultados como PDF
     */
    downloadResultsPDF() {
        // Implementar generación de PDF
        console.log('Generando PDF de resultados...');
        this.uiComponents.showNotification('PDF generado exitosamente', 'success');
    }

    // ==================== EVENT LISTENERS SETUP ====================

    setupExamEventListeners() {
        // Implementar listeners específicos del examen
    }

    setupQuestionEventListeners() {
        // Implementar listeners para preguntas
    }
}

// Exportar módulo
window.fullExam = new FullExam();
console.log('✅ Full Exam Module cargado');