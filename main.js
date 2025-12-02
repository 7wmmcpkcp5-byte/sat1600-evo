// main.js - Controlador principal de SAT OWL PRO - VERSIÓN CORREGIDA
import { DataService } from './data-service.js';
import { UIComponents } from './ui-components.js';
import { AnalyticsManager } from './analytics-manager.js';
import { PremiumManager } from './premium-features.js';
import { questionRepository } from './data/question-repository.js';
import { CONFIG } from './config.js';

class SATOwlApp {
    constructor() {
        // Inicializar servicios en orden correcto
        this.dataService = new DataService();
        this.analytics = new AnalyticsManager();
        this.uiComponents = new UIComponents();
        this.premiumManager = new PremiumManager();
        
        // Resolver dependencia circular
        this.dataService.setAnalytics(this.analytics);
        
        // Estado de la aplicación
        this.currentQuestion = null;
        this.isAnswerLocked = false;
        this.questionStartTime = null;
        
        // Estadísticas de sesión
        this.sessionStats = {
            correct: 0,
            incorrect: 0,
            total: 0,
            startTime: Date.now(),
            sessionXP: 0
        };
        
        // Timeouts para limpieza
        this.feedbackTimeout = null;
        this.questionTimeout = null;
        
        console.log('🦉 SAT OWL PRO initialized');
    }

    async initializeApp() {
        try {
            // Verificar si es la primera vez
            this.checkFirstTimeVisit();
            
            // Cargar datos del usuario
            await this.loadUserData();
            
            // Inicializar UI
            this.initializeUI();
            
            // Cargar primera pregunta
            this.loadNextQuestion();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Verificar características premium
            this.checkPremiumFeatures();
            
            // Verificar conexión
            this.checkConnectionStatus();
            
            console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing app:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    }

    checkFirstTimeVisit() {
        const firstVisit = !localStorage.getItem('sat_owl_first_visit');
        if (firstVisit) {
            localStorage.setItem('sat_owl_first_visit', 'true');
            localStorage.setItem('sat_owl_version', '2.1');
            this.showWelcomeMessage();
        }
    }

    async loadUserData() {
        return new Promise((resolve) => {
            // Simular carga asíncrona
            setTimeout(() => {
                this.updateUI();
                resolve();
            }, 150);
        });
    }

    initializeUI() {
        // Renderizar widget de evolución
        this.uiComponents.renderEvolutionWidget(this.dataService.user);
        
        // Actualizar estadísticas del footer
        this.updateFooterStats();
        
        // Configurar botones del header
        this.setupHeaderButtons();
    }

    setupHeaderButtons() {
        // Parent Dashboard
        const parentBtn = document.querySelector('.parent-dashboard-btn');
        if (parentBtn) {
            parentBtn.addEventListener('click', () => {
                this.showParentDashboard();
            });
        }
        
        // Analytics Dashboard
        const analyticsBtn = document.querySelector('.analytics-dashboard-btn');
        if (analyticsBtn) {
            analyticsBtn.addEventListener('click', () => {
                window.location.href = 'analytics-dashboard.html';
            });
        }
    }

    setupEventListeners() {
        // Reset Progress
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetProgress();
            });
        }
        
        // Export Data
        const exportBtn = document.getElementById('export-data-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportUserData();
            });
        }
        
        // Manejar conexión/desconexión
        window.addEventListener('online', () => this.handleOnlineStatus());
        window.addEventListener('offline', () => this.handleOfflineStatus());
        
        // Guardar datos antes de cerrar
        window.addEventListener('beforeunload', () => {
            this.cleanupBeforeUnload();
        });
        
        // Teclado shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    async loadNextQuestion() {
        try {
            // Limpiar timeout anterior si existe
            if (this.questionTimeout) {
                clearTimeout(this.questionTimeout);
            }
            
            // Mostrar estado de carga
            this.showLoadingState();
            
            // Obtener siguiente pregunta
            this.currentQuestion = this.dataService.getNextQuestion(questionRepository);
            
            if (!this.currentQuestion) {
                this.showNoQuestionsAvailable();
                return;
            }
            
            // Validar estructura de pregunta
            if (!this.validateQuestion(this.currentQuestion)) {
                console.error('Invalid question structure:', this.currentQuestion);
                this.showError('Invalid question format. Loading next question...');
                this.questionTimeout = setTimeout(() => this.loadNextQuestion(), 1000);
                return;
            }
            
            // Registrar tiempo de inicio
            this.questionStartTime = Date.now();
            
            // Renderizar pregunta
            this.uiComponents.renderQuestion(
                this.currentQuestion, 
                (selectedIndex) => this.handleAnswer(selectedIndex)
            );
            
            this.isAnswerLocked = false;
            
            // Actualizar contador de preguntas
            this.updateQuestionCounter();
            
        } catch (error) {
            console.error('❌ Error loading question:', error);
            this.showError('Failed to load question. Please try again.');
            
            // Reintentar después de 2 segundos
            this.questionTimeout = setTimeout(() => this.loadNextQuestion(), 2000);
        }
    }

    validateQuestion(question) {
        if (!question) return false;
        if (!question.id || !question.text || !question.options) return false;
        if (!Array.isArray(question.options) || question.options.length === 0) return false;
        if (typeof question.correctIndex !== 'number' || question.correctIndex < 0 || 
            question.correctIndex >= question.options.length) return false;
        return true;
    }

    handleAnswer(selectedIndex) {
        // Validaciones
        if (this.isAnswerLocked || !this.currentQuestion) return;
        if (selectedIndex < 0 || selectedIndex >= this.currentQuestion.options.length) {
            console.error('Invalid option index:', selectedIndex);
            return;
        }
        
        this.isAnswerLocked = true;
        
        // Calcular tiempo de respuesta
        const responseTime = (Date.now() - this.questionStartTime) / 1000;
        
        // Verificar respuesta
        const isCorrect = selectedIndex === this.currentQuestion.correctIndex;
        
        // Actualizar estadísticas de sesión
        if (isCorrect) {
            this.sessionStats.correct++;
        } else {
            this.sessionStats.incorrect++;
        }
        this.sessionStats.total++;
        
        // Mostrar feedback visual
        this.uiComponents.showFeedback(
            isCorrect, 
            this.currentQuestion.correctIndex, 
            selectedIndex
        );
        
        // Calcular XP ganado
        const xpGained = this.calculateXPGained(isCorrect, responseTime);
        this.sessionStats.sessionXP += xpGained;
        
        // Registrar en analytics
        this.analytics.recordQuestion({
            section: this.currentQuestion.section,
            category: this.currentQuestion.category,
            difficulty: this.currentQuestion.difficulty,
            isCorrect: isCorrect,
            timeSpent: responseTime,
            questionId: this.currentQuestion.id
        });
        
        // Guardar progreso
        const progressResult = this.dataService.saveProgress(
            xpGained,
            this.currentQuestion.id,
            {
                section: this.currentQuestion.section,
                category: this.currentQuestion.category,
                timeSpent: responseTime,
                difficulty: this.currentQuestion.difficulty
            }
        );
        
        // Verificar logros
        const newAchievements = this.dataService.checkAchievements();
        
        // Mostrar resultados
        this.showAnswerResult(isCorrect, xpGained, responseTime, progressResult, newAchievements);
        
        // Actualizar UI
        this.updateUI();
        this.updateFooterStats();
        
        // Preparar siguiente pregunta después de un delay
        const delay = CONFIG.animations?.feedbackDuration || 3000;
        this.questionTimeout = setTimeout(() => {
            this.loadNextQuestion();
        }, delay);
    }

    calculateXPGained(isCorrect, responseTime) {
        // Valores por defecto si CONFIG no está definido
        const config = CONFIG || {
            xpPerQuestion: 10,
            xpBonusCorrect: 20,
            xpPenaltyIncorrect: 5
        };
        
        let xp = config.xpPerQuestion || 10;
        
        if (isCorrect) {
            xp += config.xpBonusCorrect || 20;
            
            // Bonus por velocidad
            if (responseTime < 30) xp += 15;
            if (responseTime < 20) xp += 10; // Bonus extra por muy rápido
            
            // Bonus por dificultad
            if (this.currentQuestion.difficulty === 'hard') xp += 20;
            else if (this.currentQuestion.difficulty === 'medium') xp += 10;
        } else {
            xp = Math.max(0, config.xpPenaltyIncorrect || 5);
        }
        
        return Math.max(0, xp);
    }

    showAnswerResult(isCorrect, xpGained, responseTime, progressResult, newAchievements) {
        const feedbackEl = document.getElementById('feedback-container');
        if (!feedbackEl) return;
        
        // Limpiar timeout anterior
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
        
        let message = '';
        let className = '';
        
        if (isCorrect) {
            message = `✓ Correct! +${xpGained} XP`;
            className = 'feedback-correct';
            
            // Bonus por velocidad
            if (responseTime < 20) {
                message += ' ⚡ Very Fast!';
            } else if (responseTime < 30) {
                message += ' ⚡ Fast!';
            }
        } else {
            message = `✗ Incorrect! ${xpGained >= 0 ? '+' : ''}${xpGained} XP`;
            className = 'feedback-incorrect';
        }
        
        // Mensaje de subida de nivel
        if (progressResult && progressResult.levelUp) {
            message += ` 🎉 Level Up! ${progressResult.levelName || 'New Level'}`;
            className = 'feedback-level-up';
        }
        
        // Logros desbloqueados
        if (newAchievements && newAchievements.length > 0) {
            newAchievements.forEach(achievement => {
                message += ` 🏆 ${achievement.name || 'Achievement Unlocked'}`;
            });
        }
        
        // Explicación (si existe)
        let explanationHTML = '';
        if (this.currentQuestion && this.currentQuestion.explanation) {
            explanationHTML = `
                <div class="explanation">
                    <strong>Explanation:</strong> ${this.currentQuestion.explanation}
                </div>
            `;
        }
        
        feedbackEl.innerHTML = `
            <div class="feedback ${className}">
                <div class="feedback-content">
                    <span class="feedback-text">${message}</span>
                    ${explanationHTML}
                </div>
            </div>
        `;
        
        // Auto-ocultar después de 3 segundos
        this.feedbackTimeout = setTimeout(() => {
            feedbackEl.innerHTML = '';
        }, 3000);
    }

    showLoadingState() {
        const questionText = document.getElementById('question-text');
        const optionsEl = document.getElementById('question-options');
        
        if (questionText) {
            questionText.innerHTML = '<div class="loading">Loading next question...</div>';
        }
        
        if (optionsEl) {
            optionsEl.innerHTML = '';
        }
    }

    showNoQuestionsAvailable() {
        const questionText = document.getElementById('question-text');
        const optionsEl = document.getElementById('question-options');
        
        if (questionText) {
            questionText.innerHTML = `
                <div class="no-questions">
                    <h3>🎉 Amazing Progress!</h3>
                    <p>You've completed all available questions in this category.</p>
                    <p>More questions coming soon!</p>
                    <div class="no-questions-actions">
                        <button class="reset-btn" id="reset-questions-btn">
                            Reset & Start Over
                        </button>
                        <button class="premium-btn" id="unlock-premium-btn">
                            🔓 Unlock Premium for More Questions
                        </button>
                    </div>
                </div>
            `;
            
            // Configurar botones
            const resetBtn = document.getElementById('reset-questions-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.dataService.user.seenQuestions = [];
                    this.loadNextQuestion();
                });
            }
            
            const unlockBtn = document.getElementById('unlock-premium-btn');
            if (unlockBtn) {
                unlockBtn.addEventListener('click', () => {
                    if (this.premiumManager && this.premiumManager.unlock) {
                        this.premiumManager.unlock();
                    }
                });
            }
        }
        
        if (optionsEl) {
            optionsEl.innerHTML = '';
        }
    }

    updateUI() {
        // Actualizar widget de evolución
        if (this.uiComponents && this.uiComponents.renderEvolutionWidget) {
            this.uiComponents.renderEvolutionWidget(this.dataService.user);
        }
        
        // Actualizar cualquier otro componente UI
        this.updateQuestionCounter();
    }

    updateFooterStats() {
        try {
            const performance = this.analytics.getOverallPerformance();
            
            const totalEl = document.getElementById('total-questions');
            const accuracyEl = document.getElementById('accuracy-rate');
            const streakEl = document.getElementById('session-streak');
            
            if (totalEl) {
                totalEl.textContent = `Questions: ${performance.totalQuestions || 0}`;
            }
            
            if (accuracyEl) {
                accuracyEl.textContent = `Accuracy: ${performance.accuracy || 0}%`;
            }
            
            if (streakEl) {
                streakEl.textContent = `Streak: ${this.sessionStats.correct || 0}`;
            }
        } catch (error) {
            console.warn('Error updating footer stats:', error);
        }
    }

    updateQuestionCounter() {
        const counterEl = document.getElementById('question-counter');
        if (counterEl) {
            counterEl.textContent = `Q${this.sessionStats.total + 1}`;
        }
    }

    showParentDashboard() {
        try {
            import('./parent-dashboard.js').then(module => {
                const appContainer = document.querySelector('.app-container');
                if (!appContainer) return;
                
                appContainer.innerHTML = '<div id="parent-dashboard-container"></div>';
                const container = document.getElementById('parent-dashboard-container');
                if (container && module.renderParentDashboard) {
                    module.renderParentDashboard(container, this.analytics, this.dataService);
                }
            }).catch(error => {
                console.error('Error loading parent dashboard:', error);
                this.showError('Could not load parent dashboard');
            });
        } catch (error) {
            console.error('Error in showParentDashboard:', error);
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
            try {
                this.dataService.resetProgress();
                this.analytics.resetStats();
                this.sessionStats = { 
                    correct: 0, 
                    incorrect: 0, 
                    total: 0, 
                    startTime: Date.now(),
                    sessionXP: 0 
                };
                this.updateUI();
                this.updateFooterStats();
                this.loadNextQuestion();
                this.showMessage('Progress reset successfully', 'success');
            } catch (error) {
                console.error('Error resetting progress:', error);
                this.showError('Failed to reset progress');
            }
        }
    }

    exportUserData() {
        try {
            const userData = this.dataService.exportUserData();
            const analyticsData = this.analytics.exportData();
            
            const exportData = {
                user: userData,
                analytics: analyticsData,
                session: this.sessionStats,
                exportedAt: new Date().toISOString(),
                version: '2.1'
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sat-owl-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('Data exported successfully', 'success');
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showError('Failed to export data');
        }
    }

    checkPremiumFeatures() {
        try {
            if (this.premiumManager && this.premiumManager.getFeatureStatus) {
                const featureStatus = this.premiumManager.getFeatureStatus();
                console.log('Premium features status:', featureStatus);
                
                if (!featureStatus.isPremium) {
                    console.log('🔒 Free version - some features locked');
                }
            }
        } catch (error) {
            console.warn('Error checking premium features:', error);
        }
    }

    checkConnectionStatus() {
        if (!navigator.onLine) {
            this.handleOfflineStatus();
        }
    }

    showWelcomeMessage() {
        this.showMessage(
            'Welcome to SAT OWL PRO! Answer questions to earn XP and level up your skills.',
            'info',
            5000
        );
    }

    handleOnlineStatus() {
        this.showMessage('Connection restored', 'success', 3000);
    }

    handleOfflineStatus() {
        this.showMessage('Working offline - progress saved locally', 'warning', 5000);
    }

    handleKeyboardShortcuts(e) {
        // Shortcuts numéricos para opciones (1-4)
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.option');
            if (options[optionIndex] && !this.isAnswerLocked) {
                options[optionIndex].click();
            }
        }
        
        // Espacio para siguiente pregunta (cuando hay feedback)
        if (e.code === 'Space' && this.isAnswerLocked) {
            e.preventDefault();
            if (this.questionTimeout) {
                clearTimeout(this.questionTimeout);
                this.loadNextQuestion();
            }
        }
    }

    cleanupBeforeUnload() {
        // Limpiar todos los timeouts
        if (this.feedbackTimeout) clearTimeout(this.feedbackTimeout);
        if (this.questionTimeout) clearTimeout(this.questionTimeout);
        
        // Guardar datos
        this.dataService.saveUser();
        this.analytics.saveStats();
    }

    showError(message) {
        const feedbackEl = document.getElementById('feedback-container');
        if (feedbackEl) {
            feedbackEl.innerHTML = `
                <div class="feedback feedback-error">
                    <div class="feedback-content">
                        <span class="feedback-text">⚠️ ${message}</span>
                    </div>
                </div>
            `;
            
            // Auto-ocultar después de 5 segundos
            setTimeout(() => {
                feedbackEl.innerHTML = '';
            }, 5000);
        }
    }

    showMessage(message, type = 'info', duration = 3000) {
        const feedbackEl = document.getElementById('feedback-container');
        if (!feedbackEl) return;
        
        // Limpiar timeout anterior
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
        
        const className = `feedback feedback-${type}`;
        
        feedbackEl.innerHTML = `
            <div class="${className}">
                <div class="feedback-content">
                    <span class="feedback-text">${message}</span>
                </div>
            </div>
        `;
        
        this.feedbackTimeout = setTimeout(() => {
            feedbackEl.innerHTML = '';
        }, duration);
    }

    // Métodos públicos para debugging/testing
    getAppState() {
        return {
            user: this.dataService.user,
            analytics: this.analytics.getOverallPerformance(),
            session: this.sessionStats,
            currentQuestion: this.currentQuestion,
            premium: this.premiumManager ? this.premiumManager.getFeatureStatus() : null
        };
    }

    // Método para forzar recarga de pregunta (debug)
    forceReloadQuestion() {
        if (this.questionTimeout) clearTimeout(this.questionTimeout);
        this.loadNextQuestion();
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.app = new SATOwlApp();
        window.app.initializeApp();
        
        // Exponer para debugging en consola
        console.log('App initialized. Type "app.getAppState()" for debugging info.');
        console.log('Shortcuts: 1-4 for options, Space for next question');
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        alert('Failed to initialize application. Please check console for details.');
    }
});

// Manejar errores no capturados
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    if (window.app) {
        window.app.showError('An unexpected error occurred');
    }
});

// Manejar promesas rechazadas no capturadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Exportar para tests
export { SATOwlApp };