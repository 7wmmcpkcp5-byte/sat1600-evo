// app-main.js - Versión optimizada y profesional
import { QuizEngine } from './quiz-engine.js';
import { Storage } from './storage.js';
import { UIComponents } from './ui-components.js';
import { AnalyticsManager } from './analytics.js';
import { AITutor } from './ai-tutor.js';

class SATPracticeApp {
    constructor() {
        this.modules = {};
        this.state = {
            currentView: 'dashboard',
            currentSubject: 'math',
            user: null,
            quizActive: false
        };
        
        this.init();
    }

    async init() {
        try {
            await this.initializeModules();
            await this.loadUserData();
            this.setupEventListeners();
            this.showView('dashboard');
            this.hideLoadingScreen();
            
            // Registrar PWA
            this.registerServiceWorker();
            
            console.log('🎯 SAT OWL EVO 7 - Inicializado profesionalmente');
        } catch (error) {
            console.error('❌ Error de inicialización:', error);
            this.showError('Error al cargar la aplicación');
        }
    }

    async initializeModules() {
        // Inicializar módulos en paralelo para mejor performance
        const modules = await Promise.all([
            this.loadModule('QuizEngine', () => new QuizEngine()),
            this.loadModule('UIComponents', () => new UIComponents()),
            this.loadModule('Analytics', () => new AnalyticsManager()),
            this.loadModule('AITutor', () => new AITutor())
        ]);

        this.modules = {
            quiz: modules[0],
            ui: modules[1],
            analytics: modules[2],
            aiTutor: modules[3]
        };
    }

    async loadModule(name, factory) {
        try {
            const module = await factory();
            console.log(`✅ Módulo ${name} cargado`);
            return module;
        } catch (error) {
            console.error(`❌ Error cargando ${name}:`, error);
            throw error;
        }
    }

    async loadUserData() {
        let user = Storage.getCurrentUser();
        
        if (!user) {
            user = this.createNewUser();
            Storage.saveUserProgress(user);
        }
        
        this.state.user = user;
        
        // Actualizar analytics con datos del usuario
        if (user.analytics) {
            this.modules.analytics.stats = { 
                ...this.modules.analytics.stats, 
                ...user.analytics 
            };
        }
    }

    createNewUser() {
        return {
            id: 'user_' + Date.now(),
            xp: 0,
            level: 1,
            createdAt: new Date().toISOString(),
            stats: {
                math: { correct: 0, total: 0 },
                reading: { correct: 0, total: 0 },
                writing: { correct: 0, total: 0 }
            },
            preferences: {
                sound: true,
                darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
            },
            lastSession: new Date().toISOString()
        };
    }

    setupEventListeners() {
        // Delegación de eventos para mejor performance
        document.addEventListener('click', (e) => {
            this.handleGlobalClick(e);
        });

        // Gestos táctiles para móviles
        this.setupTouchEvents();
        
        // Teclado para accesibilidad
        this.setupKeyboardNavigation();
    }

    handleGlobalClick(e) {
        const target = e.target;
        
        // Navegación
        if (target.closest('.nav-btn')) {
            const view = target.closest('.nav-btn').dataset.view;
            this.showView(view);
            return;
        }

        // Materias
        if (target.closest('.subject-card')) {
            const subject = target.closest('.subject-card').dataset.subject;
            this.selectSubject(subject);
            return;
        }

        // Acciones del quiz
        if (target.closest('#quick-practice-btn')) {
            this.startQuickPractice();
            return;
        }

        if (target.closest('#submit-answer-btn')) {
            this.submitAnswer();
            return;
        }

        if (target.closest('#next-question-btn')) {
            this.nextQuestion();
            return;
        }

        // Ayuda IA
        if (target.closest('#hint-btn')) {
            this.showHint();
            return;
        }

        if (target.closest('#explanation-btn')) {
            this.showExplanation();
            return;
        }

        // Modal
        if (target.closest('#modal-close') || target.closest('.modal-backdrop')) {
            this.hideModal();
            return;
        }
    }

    setupTouchEvents() {
        let startX, startY;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Swipe horizontal para navegar entre preguntas
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && this.state.quizActive) {
                    this.nextQuestion(); // Swipe izquierda
                }
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Atajos de teclado durante el quiz
            if (this.state.quizActive) {
                switch(e.key) {
                    case '1': case '2': case '3': case '4':
                        this.selectOption(parseInt(e.key) - 1);
                        break;
                    case 'Enter':
                        if (document.getElementById('submit-answer-btn').style.display !== 'none') {
                            this.submitAnswer();
                        } else {
                            this.nextQuestion();
                        }
                        break;
                    case 'h':
                        this.showHint();
                        break;
                    case 'e':
                        this.showExplanation();
                        break;
                }
            }
        });
    }

    // ===== GESTIÓN DE VISTAS OPTIMIZADA =====
    showView(viewName, params = {}) {
        this.state.currentView = viewName;
        
        // Transición suave entre vistas
        document.querySelectorAll('.view').forEach(view => {
            view.style.opacity = '0';
            setTimeout(() => {
                view.classList.remove('active');
            }, 150);
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            setTimeout(() => {
                targetView.style.opacity = '1';
            }, 50);
        }

        // Actualizar navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });

        // Lógica específica de vista
        this.onViewChanged(viewName, params);
    }

    onViewChanged(viewName, params) {
        const viewHandlers = {
            dashboard: () => this.updateDashboard(),
            practice: () => params.subject && this.startQuiz(params.subject),
            analytics: () => this.showAnalytics()
        };

        viewHandlers[viewName]?.();
    }

    // ===== DASHBOARD OPTIMIZADO =====
    updateDashboard() {
        if (!this.state.user) return;

        this.updateQuickStats();
        this.updateSubjectCards();
        this.renderEvolutionWidget();
    }

    updateQuickStats() {
        const stats = this.modules.analytics.stats;
        const accuracy = stats.totalQuestions > 0 
            ? Math.round((stats.correctQuestions / stats.totalQuestions) * 100)
            : 0;

        this.updateElement('quick-accuracy', `${accuracy}%`);
        this.updateElement('quick-streak', stats.streak || 0);
        this.updateElement('quick-time', `${Math.round(stats.timeSpent || 0)}m`);
    }

    updateSubjectCards() {
        const stats = this.state.user.stats;
        
        ['math', 'reading', 'writing'].forEach(subject => {
            const subjectStats = stats[subject] || { correct: 0, total: 0 };
            const accuracy = subjectStats.total > 0 
                ? Math.round((subjectStats.correct / subjectStats.total) * 100)
                : 0;
                
            this.updateElement(
                `${subject}-stats`, 
                `${subjectStats.correct}/${subjectStats.total} (${accuracy}%)`
            );
        });
    }

    // ===== QUIZ SYSTEM OPTIMIZADO =====
    selectSubject(subject) {
        this.state.currentSubject = subject;
        
        document.querySelectorAll('.subject-card').forEach(card => {
            card.classList.toggle('active', card.dataset.subject === subject);
        });
    }

    startQuickPractice() {
        this.startQuiz(this.state.currentSubject, 5); // Quiz corto de 5 preguntas
    }

    async startQuiz(subject, questionCount = 5) {
        try {
            const success = await this.modules.quiz.startQuiz(subject, questionCount);
            
            if (success) {
                this.state.quizActive = true;
                this.showView('practice', { subject });
                this.renderCurrentQuestion();
                this.startQuizTimer();
            } else {
                this.showError('No hay preguntas disponibles para esta materia');
            }
        } catch (error) {
            console.error('Error iniciando quiz:', error);
            this.showError('Error al cargar el quiz');
        }
    }

    renderCurrentQuestion() {
        const question = this.modules.quiz.getCurrentQuestion();
        if (!question) return;

        this.modules.ui.renderQuestion(question, (selectedIndex) => {
            this.selectOption(selectedIndex);
        });

        this.updateQuizProgress();
    }

    selectOption(optionIndex) {
        this.modules.ui.selectOption(optionIndex);
        document.getElementById('submit-answer-btn').disabled = false;
    }

    async submitAnswer() {
        const selectedOption = this.modules.ui.getSelectedOption();
        
        if (selectedOption === null) {
            this.showTutorModal('Selección requerida', 'Por favor elige una respuesta antes de enviar.');
            return;
        }

        const result = this.modules.quiz.submitAnswer(selectedOption);
        
        if (result.error) {
            this.showError(result.error);
            return;
        }

        // Mostrar resultado visual
        this.modules.ui.showAnswerResult(
            result.correct,
            selectedOption,
            this.modules.quiz.currentQuestion.correctAnswer
        );

        // Actualizar estadísticas
        await this.updateUserStats(result.correct);
        
        // Mostrar navegación
        this.showQuizNavigation();

        // Feedback inmediato
        if (result.correct) {
            this.playSuccessSound();
        }
    }

    async updateUserStats(isCorrect) {
        const subject = this.modules.quiz.currentQuestion.section;
        
        // Actualizar stats del usuario
        this.state.user.stats[subject].total++;
        if (isCorrect) {
            this.state.user.stats[subject].correct++;
            this.state.user.xp += 10;
            this.state.user.level = this.calculateLevel(this.state.user.xp);
        }
        
        // Actualizar analytics
        this.modules.analytics.recordPracticeResult(
            subject,
            isCorrect ? 1 : 0,
            1,
            0.5 // 30 segundos por pregunta estimado
        );
        
        // Guardar async para no bloquear UI
        await Storage.saveUserProgress(this.state.user);
    }

    calculateLevel(xp) {
        const levels = [0, 300, 700, 1500, 2500, 4000, 6000];
        return levels.findIndex(threshold => xp < threshold) || 1;
    }

    showQuizNavigation() {
        document.getElementById('submit-answer-btn').style.display = 'none';
        document.getElementById('next-question-btn').style.display = 'block';
    }

    nextQuestion() {
        if (this.modules.quiz.goNext()) {
            this.renderCurrentQuestion();
            this.resetQuizUI();
        } else {
            this.completeQuiz();
        }
    }

    resetQuizUI() {
        this.modules.ui.clearOptions();
        document.getElementById('submit-answer-btn').style.display = 'block';
        document.getElementById('submit-answer-btn').disabled = true;
        document.getElementById('next-question-btn').style.display = 'none';
    }

    completeQuiz() {
        this.state.quizActive = false;
        clearInterval(this.quizTimer);
        
        const results = this.modules.quiz.computeResults();
        const accuracy = Math.round(results.percentage);
        
        this.showTutorModal(
            '🎉 Quiz Completado',
            `¡Excelente trabajo!<br><br>
            <strong>Resultados:</strong><br>
            • ${results.correct}/${results.total} respuestas correctas<br>
            • ${accuracy}% de precisión<br>
            • +${results.correct * 10} XP ganados<br><br>
            <em>Sigue practicando para mejorar tu puntuación SAT</em>`
        );
        
        this.showView('dashboard');
    }

    // ===== SISTEMA DE AYUDA IA MEJORADO =====
    showHint() {
        if (!this.state.quizActive) return;
        
        const questionId = this.modules.quiz.currentQuestion.id;
        const hint = this.modules.aiTutor.getHintFor(questionId);
        
        this.showTutorModal('💡 Pista Inteligente', hint);
    }

    showExplanation() {
        if (!this.state.quizActive) return;
        
        const questionId = this.modules.quiz.currentQuestion.id;
        const explanation = this.modules.aiTutor.getFullExplanation(questionId);
        
        this.showTutorModal('📚 Explicación Detallada', explanation);
    }

    // ===== UI COMPONENTS =====
    renderEvolutionWidget() {
        const container = document.getElementById('evolution-widget');
        if (container) {
            container.innerHTML = '';
            container.appendChild(
                this.modules.ui.renderEvolutionWidget(this.state.user)
            );
        }
    }

    updateQuizProgress() {
        const progress = this.modules.quiz.getProgress();
        
        this.updateElement('current-question', progress.current);
        this.updateElement('total-questions', progress.total);
        
        const progressFill = document.getElementById('quiz-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress.percentage}%`;
        }
    }

    updateElement(elementId, content) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = content;
        }
    }

    // ===== TIMER OPTIMIZADO =====
    startQuizTimer() {
        let timeLeft = 300; // 5 minutos
        const timerElement = document.getElementById('quiz-timer');
        
        this.quizTimer = setInterval(() => {
            if (timeLeft <= 0 || !this.state.quizActive) {
                clearInterval(this.quizTimer);
                if (this.state.quizActive) {
                    this.completeQuiz();
                }
                return;
            }
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // Cambiar color cuando quedan menos de 60 segundos
                if (timeLeft < 60) {
                    timerElement.style.color = '#ef4444';
                }
            }
            
            timeLeft--;
        }, 1000);
    }

    // ===== MODAL SYSTEM =====
    showTutorModal(title, content) {
        const modal = document.getElementById('tutor-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.classList.add('active');
            
            // Auto-cerrar después de 8 segundos para hints
            if (title.includes('Pista')) {
                setTimeout(() => this.hideModal(), 8000);
            }
        }
    }

    hideModal() {
        const modal = document.getElementById('tutor-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ===== UTILITIES =====
    hideLoadingScreen() {
        const loadingView = document.getElementById('loading-view');
        if (loadingView) {
            loadingView.style.opacity = '0';
            setTimeout(() => {
                loadingView.classList.remove('active');
            }, 300);
        }
    }

    showError(message) {
        this.showTutorModal('❌ Error', message);
    }

    playSuccessSound() {
        // Feedback sutil de audio (opcional)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            // Fallback silencioso si no hay soporte de audio
        }
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado');
                })
                .catch(error => {
                    console.log('❌ Service Worker falló:', error);
                });
        }
    }
}

// Inicialización optimizada
document.addEventListener('DOMContentLoaded', () => {
    // Precargar recursos críticos
    const preloadLinks = [
        { rel: 'preload', href: './quiz-engine.js', as: 'script' },
        { rel: 'preload', href: './storage.js', as: 'script' },
        { rel: 'preload', href: './ui-components.js', as: 'script' }
    ];
    
    preloadLinks.forEach(link => {
        const el = document.createElement('link');
        Object.assign(el, link);
        document.head.appendChild(el);
    });

    // Iniciar app
    window.satApp = new SATPracticeApp();
});

// Manejo de errores global
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
});

export default SATPracticeApp;