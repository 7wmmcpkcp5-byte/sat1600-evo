// main.js - Controlador principal de SAT OWL PRO
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
            startTime: Date.now()
        };
        
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
        document.querySelector('.parent-dashboard-btn').addEventListener('click', () => {
            this.showParentDashboard();
        });
        
        // Analytics Dashboard
        document.querySelector('.analytics-dashboard-btn').addEventListener('click', () => {
            window.location.href = 'analytics-dashboard.html';
        });
    }

    setupEventListeners() {
        // Reset Progress
        document.getElementById('reset-progress-btn').addEventListener('click', () => {
            this.resetProgress();
        });
        
        // Export Data
        document.getElementById('export-data-btn').addEventListener('click', () => {
            this.exportUserData();
        });
        
        // Manejar conexión/desconexión
        window.addEventListener('online', () => this.handleOnlineStatus());
        window.addEventListener('offline', () => this.handleOfflineStatus());
        
        // Guardar datos antes de cerrar
        window.addEventListener('beforeunload', () => {
            this.dataService.saveUser();
        });
    }

    async loadNextQuestion() {
        try {
            // Mostrar estado de carga
            this.showLoadingState();
            
            // Obtener siguiente pregunta
            this.currentQuestion = this.dataService.getNextQuestion(questionRepository);
            
            if (!this.currentQuestion) {
                this.showNoQuestionsAvailable();
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
            
        } catch (error) {
            console.error('❌ Error loading question:', error);
            this.showError('Failed to load question. Please try again.');
        }
    }

    handleAnswer(selectedIndex) {
        if (this.isAnswerLocked || !this.currentQuestion) return;
        
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
        this.showAnswerResult(isCorrect, xpGained, progressResult, newAchievements);
        
        // Actualizar UI
        this.updateUI();
        this.updateFooterStats();
        
        // Preparar siguiente pregunta después de un delay
        setTimeout(() => {
            this.loadNextQuestion();
        }, CONFIG.animations.feedbackDuration);
    }

    calculateXPGained(isCorrect, responseTime) {
        let xp = CONFIG.xpPerQuestion;
        
        if (isCorrect) {
            xp += CONFIG.xpBonusCorrect;
            
            // Bonus por velocidad
            if (responseTime < 30) xp += 15;
            
            // Bonus por dificultad
            if (this.currentQuestion.difficulty === 'hard') xp += 20;
            else if (this.currentQuestion.difficulty === 'medium') xp += 10;
        } else {
            xp = CONFIG.xpPenaltyIncorrect;
        }
        
        return Math.max(0, xp);
    }

    showAnswerResult(isCorrect, xpGained, progressResult, newAchievements) {
        const feedbackEl = document.getElementById('feedback-container');
        if (!feedbackEl) return;
        
        let message = '';
        let className = '';
        
        if (isCorrect) {
            message = `✓ Correct! +${xpGained} XP`;
            className = 'feedback-correct';
            
            if (responseTime < 20) {
                message += ' ⚡ Fast!';
            }
        } else {
            message = `✗ Incorrect! ${xpGained >= 0 ? '+' : ''}${xpGained} XP`;
            className = 'feedback-incorrect';
        }
        
        // Mensaje de subida de nivel
        if (progressResult.levelUp) {
            message += ` 🎉 Level Up! ${progressResult.levelName}`;
            className = 'feedback-level-up';
        }
        
        // Logros desbloqueados
        if (newAchievements.length > 0) {
            newAchievements.forEach(achievement => {
                message += ` 🏆 ${achievement.name}`;
            });
        }
        
        // Explicación (si existe)
        let explanationHTML = '';
        if (this.currentQuestion.explanation) {
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
        setTimeout(() => {
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
            document.getElementById('reset-questions-btn').addEventListener('click', () => {
                this.dataService.user.seenQuestions = [];
                this.loadNextQuestion();
            });
            
            document.getElementById('unlock-premium-btn').addEventListener('click', () => {
                this.premiumManager.unlock();
            });
        }
        
        if (optionsEl) {
            optionsEl.innerHTML = '';
        }
    }

    updateUI() {
        // Actualizar widget de evolución
        this.uiComponents.renderEvolutionWidget(this.dataService.user);
    }

    updateFooterStats() {
        const performance = this.analytics.getOverallPerformance();
        
        document.getElementById('total-questions').textContent = 
            `Questions: ${performance.totalQuestions}`;
        
        document.getElementById('accuracy-rate').textContent = 
            `Accuracy: ${performance.accuracy}%`;
        
        document.getElementById('session-streak').textContent = 
            `Streak: ${this.sessionStats.correct}`;
    }

    showParentDashboard() {
        // Importar y renderizar parent dashboard
        import('./parent-dashboard.js').then(module => {
            const appContainer = document.querySelector('.app-container');
            appContainer.innerHTML = '<div id="parent-dashboard-container"></div>';
            const container = document.getElementById('parent-dashboard-container');
            module.renderParentDashboard(container, this.analytics, this.dataService);
        }).catch(error => {
            console.error('Error loading parent dashboard:', error);
            this.showError('Could not load parent dashboard');
        });
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
            this.dataService.resetProgress();
            this.analytics.resetData();
            this.sessionStats = { correct: 0, incorrect: 0, total: 0, startTime: Date.now() };
            this.updateUI();
            this.updateFooterStats();
            this.loadNextQuestion();
            this.showMessage('Progress reset successfully', 'success');
        }
    }

    exportUserData() {
        const userData = this.dataService.exportUserData();
        const analyticsData = this.analytics.exportData();
        
        const exportData = {
            user: userData,
            analytics: analyticsData,
            exportedAt: new Date().toISOString(),
            version: '2.0'
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sat-owl-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMessage('Data exported successfully', 'success');
    }

    checkPremiumFeatures() {
        const featureStatus = this.premiumManager.getFeatureStatus();
        console.log('Premium features status:', featureStatus);
        
        // Si no es premium, mostrar alguna indicación
        if (!featureStatus.isPremium) {
            console.log('🔒 Free version - some features locked');
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
        this.showMessage('Connection restored', 'success');
    }

    handleOfflineStatus() {
        this.showMessage('Working offline - progress saved locally', 'warning');
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
        }
    }

    showMessage(message, type = 'info', duration = 3000) {
        const feedbackEl = document.getElementById('feedback-container');
        if (!feedbackEl) return;
        
        const className = `feedback feedback-${type}`;
        
        feedbackEl.innerHTML = `
            <div class="${className}">
                <div class="feedback-content">
                    <span class="feedback-text">${message}</span>
                </div>
            </div>
        `;
        
        setTimeout(() => {
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
            premium: this.premiumManager.getFeatureStatus()
        };
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SATOwlApp();
    window.app.initializeApp();
    
    // Exponer para debugging en consola
    console.log('App initialized. Type "app.getAppState()" for debugging info.');
});

// Manejar errores no capturados
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    if (window.app) {
        window.app.showError('An unexpected error occurred');
    }
});

// Exportar para tests
export { SATOwlApp };