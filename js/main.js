// SAT OWL PRO - Main Application Controller
// Versión 3.0 - Completa y funcional

import { CONFIG } from './config.js';
import { DataService } from './data-service.js';
import { UIComponents } from './ui-components.js';
import { AnalyticsManager } from './analytics-manager.js';
import { PremiumManager } from './premium-manager.js';
import { ExamEngine } from './exam-engine.js';
import { TheoryEngine } from './theory-engine.js';
import { QuestionGenerator } from './question-generator.js';

class SATOwlApp {
    constructor() {
        // Servicios principales
        this.dataService = new DataService();
        this.uiComponents = new UIComponents();
        this.analytics = new AnalyticsManager();
        this.premiumManager = new PremiumManager();
        this.examEngine = new ExamEngine();
        this.theoryEngine = new TheoryEngine();
        this.questionGenerator = new QuestionGenerator();
        
        // Estado de la aplicación
        this.state = {
            currentView: 'home',
            currentQuestion: null,
            examSession: null,
            practiceSession: null,
            userProgress: null,
            isInitialized: false
        };
        
        // Bind de métodos
        this.navigateTo = this.navigateTo.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.startExam = this.startExam.bind(this);
        
        console.log('🦉 SAT OWL PRO v3.0 inicializado');
    }
    
    async initialize() {
        try {
            // 1. Cargar datos del usuario
            await this.dataService.initialize();
            this.state.userProgress = this.dataService.getUserProgress();
            
            // 2. Inicializar UI
            await this.uiComponents.initialize(this.state.userProgress);
            
            // 3. Cargar primera vista
            await this.loadHomeView();
            
            // 4. Configurar event listeners
            this.setupEventListeners();
            
            // 5. Verificar características premium
            this.checkPremiumFeatures();
            
            // 6. Iniciar analytics
            this.analytics.startSession();
            
            this.state.isInitialized = true;
            console.log('✅ Aplicación inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando aplicación:', error);
            this.showFatalError();
        }
    }
    
    async loadHomeView() {
        const homeHTML = `
            <div class="glow-ui-container">
                <!-- Header con avatar y título -->
                <header class="glow-header">
                    <div class="avatar-container">
                        <div class="owl-avatar" data-level="${this.state.userProgress.level}">
                            🦉
                            <div class="level-badge">${this.state.userProgress.level}</div>
                        </div>
                        <div class="header-text">
                            <h1 class="glow-text">SAT OWL PRO</h1>
                            <p class="subtitle">Evolución Gamificada</p>
                        </div>
                    </div>
                    <div class="header-actions">
                        <button class="btn-icon" id="parent-dashboard-btn" title="Dashboard para padres">
                            👨‍👦
                        </button>
                        <button class="btn-icon" id="settings-btn" title="Configuración">
                            ⚙️
                        </button>
                    </div>
                </header>
                
                <!-- Score Card Principal -->
                <section class="score-card glow-card">
                    <div class="score-header">
                        <h2>Puntuación Actual</h2>
                        <span class="score-badge">Estimado</span>
                    </div>
                    <div class="score-display">
                        <div class="main-score">${this.state.userProgress.estimatedScore}</div>
                        <div class="score-range">/1600</div>
                    </div>
                    <div class="score-details">
                        <div class="detail-item">
                            <span class="label">Math</span>
                            <span class="value">${this.state.userProgress.mathScore}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Reading</span>
                            <span class="value">${this.state.userProgress.readingScore}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Writing</span>
                            <span class="value">${this.state.userProgress.writingScore}</span>
                        </div>
                    </div>
                </section>
                
                <!-- Barra de Progreso -->
                <section class="progress-section">
                    <div class="progress-header">
                        <h3>Progreso Nivel ${this.state.userProgress.level}</h3>
                        <span class="xp-count">${this.state.userProgress.currentXP}/${this.state.userProgress.nextLevelXP} XP</span>
                    </div>
                    <div class="xp-bar-container">
                        <div class="xp-bar-bg">
                            <div class="xp-bar-fill" style="width: ${this.state.userProgress.levelProgress}%"></div>
                        </div>
                        <div class="xp-bar-glow"></div>
                    </div>
                    <div class="level-info">
                        <span class="level-name">${CONFIG.levels[this.state.userProgress.level]}</span>
                        <span class="streak">🔥 ${this.state.userProgress.streak} días</span>
                    </div>
                </section>
                
                <!-- Navegación Rápida -->
                <nav class="quick-nav">
                    <button class="nav-btn primary" id="practice-btn">
                        <span class="icon">📚</span>
                        <span class="label">Práctica</span>
                    </button>
                    <button class="nav-btn" id="exam-btn">
                        <span class="icon">🧠</span>
                        <span class="label">Examen</span>
                    </button>
                    <button class="nav-btn" id="theory-btn">
                        <span class="icon">🎬</span>
                        <span class="label">Teoría</span>
                    </button>
                    <button class="nav-btn" id="analytics-btn">
                        <span class="icon">📊</span>
                        <span class="label">Analytics</span>
                    </button>
                </nav>
                
                <!-- Módulos de Aprendizaje -->
                <section class="modules-grid">
                    <div class="module-card" id="adaptive-practice">
                        <div class="module-icon">⚡</div>
                        <h4>Práctica Adaptativa</h4>
                        <p>El sistema ajusta la dificultad según tu nivel</p>
                        <button class="module-action">Comenzar</button>
                    </div>
                    
                    <div class="module-card" id="weak-areas">
                        <div class="module-icon">🎯</div>
                        <h4>Áreas Débiles</h4>
                        <p>Enfócate en lo que más necesitas</p>
                        <button class="module-action">Ver Detalles</button>
                    </div>
                    
                    <div class="module-card" id="speed-training">
                        <div class="module-icon">⏱️</div>
                        <h4>Entrenamiento Velocidad</h4>
                        <p>Mejora tu tiempo por pregunta</p>
                        <button class="module-action">Practicar</button>
                    </div>
                    
                    <div class="module-card" id="full-exam">
                        <div class="module-icon">🏆</div>
                        <h4>Examen Completo</h4>
                        <p>Simulación real 3h15min</p>
                        <button class="module-action">Comenzar</button>
                    </div>
                </section>
                
                <!-- Estadísticas Rápidas -->
                <section class="stats-section">
                    <div class="stat-card">
                        <div class="stat-value">${this.state.userProgress.totalQuestions}</div>
                        <div class="stat-label">Preguntas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.state.userProgress.accuracy}%</div>
                        <div class="stat-label">Precisión</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.state.userProgress.totalTime}</div>
                        <div class="stat-label">Horas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.state.userProgress.currentStreak}</div>
                        <div class="stat-label">Racha</div>
                    </div>
                </section>
                
                <!-- Logros Recientes -->
                <section class="achievements-section">
                    <h3>Logros Recientes</h3>
                    <div class="achievements-grid">
                        ${this.state.userProgress.recentAchievements.map(achievement => `
                            <div class="achievement-badge">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-text">
                                    <strong>${achievement.title}</strong>
                                    <small>${achievement.description}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
        
        document.getElementById('app-container').innerHTML = homeHTML;
        this.state.currentView = 'home';
    }
    
    setupEventListeners() {
        // Navegación principal
        document.addEventListener('click', (e) => {
            if (e.target.closest('#practice-btn')) {
                this.startPracticeSession();
            } else if (e.target.closest('#exam-btn')) {
                this.navigateTo('exam-simulator.html');
            } else if (e.target.closest('#theory-btn')) {
                this.navigateTo('theory-shorts.html');
            } else if (e.target.closest('#analytics-btn')) {
                this.navigateTo('analytics-dashboard.html');
            } else if (e.target.closest('#parent-dashboard-btn')) {
                this.navigateTo('parent-dashboard.html');
            } else if (e.target.closest('#full-exam')) {
                this.startFullExam();
            } else if (e.target.closest('#adaptive-practice')) {
                this.startAdaptivePractice();
            }
        });
        
        // Teclas de acceso rápido
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1': this.startPracticeSession(); break;
                    case '2': this.startExam(); break;
                    case '3': this.navigateTo('theory-shorts.html'); break;
                    case '4': this.navigateTo('analytics-dashboard.html'); break;
                }
            }
        });
        
        // Manejo offline/online
        window.addEventListener('online', () => this.handleConnectionChange(true));
        window.addEventListener('offline', () => this.handleConnectionChange(false));
    }
    
    async startPracticeSession() {
        try {
            this.uiComponents.showLoading('Cargando sesión de práctica...');
            
            const sessionConfig = {
                mode: 'adaptive',
                questionCount: 20,
                focusAreas: this.state.userProgress.weakAreas,
                timeLimit: null // Sin límite para práctica
            };
            
            this.state.practiceSession = await this.dataService.startPracticeSession(sessionConfig);
            await this.loadNextPracticeQuestion();
            
        } catch (error) {
            console.error('Error iniciando práctica:', error);
            this.uiComponents.showError('No se pudo iniciar la sesión de práctica');
        }
    }
    
    async startFullExam() {
        if (!this.premiumManager.isFeatureAvailable('full_exam')) {
            this.premiumManager.showPaywall('full_exam');
            return;
        }
        
        const confirmed = await this.uiComponents.showConfirmation(
            '¿Comenzar examen completo?',
            'El examen simulado dura 3 horas y 15 minutos. Asegúrate de tener tiempo suficiente.',
            'warning'
        );
        
        if (confirmed) {
            this.navigateTo('exam-simulator.html?mode=full');
        }
    }
    
    async loadNextPracticeQuestion() {
        try {
            const question = await this.dataService.getNextQuestion({
                difficulty: 'adaptive',
                section: this.getNextSection(),
                excludeSeen: true
            });
            
            if (question) {
                this.state.currentQuestion = question;
                this.uiComponents.renderQuestion(question, this.handleAnswer);
            } else {
                this.uiComponents.showMessage('¡Has completado todas las preguntas disponibles!', 'success');
                this.endPracticeSession();
            }
        } catch (error) {
            console.error('Error cargando pregunta:', error);
            this.uiComponents.showError('Error cargando pregunta');
        }
    }
    
    async handleAnswer(selectedIndex, questionId, timeSpent) {
        const isCorrect = selectedIndex === this.state.currentQuestion.correctAnswer;
        
        // Registrar respuesta
        await this.dataService.recordAnswer({
            questionId,
            selectedIndex,
            isCorrect,
            timeSpent,
            section: this.state.currentQuestion.section,
            difficulty: this.state.currentQuestion.difficulty
        });
        
        // Mostrar feedback
        this.uiComponents.showAnswerFeedback(isCorrect, this.state.currentQuestion);
        
        // Actualizar progreso
        this.updateUserProgress();
        
        // Cargar siguiente pregunta después de delay
        setTimeout(() => {
            this.loadNextPracticeQuestion();
        }, 2000);
    }
    
    updateUserProgress() {
        this.state.userProgress = this.dataService.getUserProgress();
        this.uiComponents.updateProgressDisplay(this.state.userProgress);
    }
    
    navigateTo(view) {
        this.state.currentView = view;
        window.location.href = view;
    }
    
    checkPremiumFeatures() {
        const features = this.premiumManager.getAvailableFeatures();
        console.log('Características disponibles:', features);
        
        if (!features.includes('unlimited_questions')) {
            this.uiComponents.showMessage(
                'Versión Premium disponible con preguntas ilimitadas',
                'info',
                5000
            );
        }
    }
    
    handleConnectionChange(isOnline) {
        if (isOnline) {
            this.uiComponents.showMessage('Conexión restaurada', 'success');
            // Sincronizar datos pendientes
            this.dataService.syncPendingData();
        } else {
            this.uiComponents.showMessage('Modo offline activado', 'warning');
        }
    }
    
    showFatalError() {
        document.getElementById('app-container').innerHTML = `
            <div class="error-container">
                <h1>😔 Error Inicializando</h1>
                <p>No se pudo cargar SAT OWL PRO. Por favor:</p>
                <ul>
                    <li>Recarga la página</li>
                    <li>Verifica tu conexión a internet</li>
                    <li>Contacta soporte si el problema persiste</li>
                </ul>
                <button onclick="window.location.reload()">🔄 Recargar</button>
            </div>
        `;
    }
    
    // Métodos públicos para debugging
    getAppState() {
        return {
            user: this.state.userProgress,
            currentView: this.state.currentView,
            currentQuestion: this.state.currentQuestion,
            session: this.state.practiceSession || this.state.examSession,
            premium: this.premiumManager.getStatus()
        };
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    try {
        window.satOwlApp = new SATOwlApp();
        await window.satOwlApp.initialize();
        
        console.log('SAT OWL PRO listo para usar');
        console.log('Comandos de depuración disponibles:');
        console.log('- satOwlApp.getAppState()');
        console.log('- satOwlApp.startPracticeSession()');
        console.log('- satOwlApp.startFullExam()');
        
    } catch (error) {
        console.error('Error fatal al iniciar aplicación:', error);
        alert('Error al cargar la aplicación. Por favor, recarga la página.');
    }
});

// Manejo de errores no capturados
window.addEventListener('error', (event) => {
    console.error('Error no capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no capturada:', event.reason);
});

export { SATOwlApp };