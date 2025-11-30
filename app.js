import { questions, getQuestionsByCategory } from './questions.js';
import { explanations } from './explanations.js';
import { OwlEvolution } from './gamification.js';
import { PremiumFeatures } from './premium-features.js';

class SATOwlApp {
    constructor() {
        this.currentView = 'home';
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.examInProgress = false;
        this.examTimeLeft = 32 * 60;
        this.examTimer = null;
        
        this.modules = {
            gamification: new OwlEvolution(),
            premium: new PremiumFeatures()
        };
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupPracticeMode();
        this.setupExamMode();
        this.loadGamificationWidget();
        this.registerServiceWorker();
        
        console.log('🦉 SAT Owl Evolution iniciado');
    }

    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.showView(view);
            });
        });
    }

    showView(viewName) {
        // Ocultar todas las vistas
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Remover activo de todos los botones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mostrar vista seleccionada
        document.getElementById(`${viewName}-view`).classList.add('active');
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
        
        this.currentView = viewName;
        
        // Cargar contenido específico de la vista
        switch(viewName) {
            case 'practice':
                this.loadPracticeQuestions();
                break;
            case 'exam':
                this.loadExamView();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'parent':
                this.loadParentDashboard();
                break;
        }
    }

    setupPracticeMode() {
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.renderPracticeQuestion();
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.renderPracticeQuestion();
            } else {
                this.finishPractice();
            }
        });
    }

    loadPracticeQuestions() {
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.renderPracticeQuestion();
    }

    renderPracticeQuestion() {
        const question = questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        
        document.getElementById('practice-progress').querySelector('.progress-fill').style.width = `${progress}%`;
        
        const content = document.getElementById('practice-content');
        content.innerHTML = `
            <div class="question-card">
                <h3>Pregunta ${this.currentQuestion + 1} de ${questions.length}</h3>
                <p>${question.text}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option" data-index="${index}">
                            ${String.fromCharCode(65 + index)}) ${option}
                        </div>
                    `).join('')}
                </div>
                ${this.userAnswers[this.currentQuestion] !== undefined ? `
                    <div class="explanation">
                        <strong>Explicación:</strong> ${explanations[question.id] || 'No hay explicación disponible.'}
                    </div>
                ` : ''}
            </div>
        `;

        // Agregar event listeners a las opciones
        content.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedIndex = parseInt(e.target.dataset.index);
                this.userAnswers[this.currentQuestion] = selectedIndex;
                
                // Mostrar feedback
                const isCorrect = selectedIndex === question.correctAnswer;
                e.target.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                // Agregar XP
                if (isCorrect) {
                    this.modules.gamification.addXP(10, 'practice_correct');
                }
                
                this.updatePracticeControls();
            });
        });

        this.updatePracticeControls();
    }

    updatePracticeControls() {
        document.getElementById('prev-btn').disabled = this.currentQuestion === 0;
        document.getElementById('next-btn').textContent = 
            this.currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente';
    }

    finishPractice() {
        const correctAnswers = this.userAnswers.filter((answer, index) => 
            answer === questions[index].correctAnswer
        ).length;
        
        const score = (correctAnswers / questions.length) * 100;
        
        document.getElementById('practice-content').innerHTML = `
            <div class="question-card" style="text-align: center;">
                <h3>¡Práctica Completada!</h3>
                <p>Puntuación: ${score.toFixed(1)}%</p>
                <p>Correctas: ${correctAnswers} de ${questions.length}</p>
                <button class="btn primary" onclick="app.loadPracticeQuestions()">Reiniciar Práctica</button>
            </div>
        `;
        
        // Recompensa de XP
        this.modules.gamification.addXP(score, 'practice_completion');
    }

    setupExamMode() {
        document.getElementById('start-exam').addEventListener('click', () => {
            this.startExam();
        });
    }

    loadExamView() {
        document.getElementById('exam-content').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>Examen simulado de SAT con 20 preguntas</p>
                <p>Tiempo: 32 minutos</p>
                <p>Presiona "Comenzar Examen" para iniciar</p>
            </div>
        `;
    }

    startExam() {
        this.examInProgress = true;
        this.currentQuestion = 0;
        this.userAnswers = new Array(20).fill(null);
        this.examTimeLeft = 32 * 60;
        
        document.getElementById('start-exam').style.display = 'none';
        this.startExamTimer();
        this.renderExamQuestion();
    }

    startExamTimer() {
        this.examTimer = setInterval(() => {
            this.examTimeLeft--;
            
            const minutes = Math.floor(this.examTimeLeft / 60);
            const seconds = this.examTimeLeft % 60;
            document.getElementById('exam-timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.examTimeLeft <= 0) {
                this.finishExam();
            }
        }, 1000);
    }

    renderExamQuestion() {
        // Implementación simplificada para el ejemplo
        document.getElementById('exam-content').innerHTML = `
            <div class="question-card">
                <h3>Pregunta de Examen ${this.currentQuestion + 1} de 20</h3>
                <p>Contenido de pregunta de examen...</p>
                <div class="options">
                    <div class="option">A) Opción A</div>
                    <div class="option">B) Opción B</div>
                    <div class="option">C) Opción C</div>
                    <div class="option">D) Opción D</div>
                </div>
            </div>
            <div class="exam-controls">
                <button class="btn secondary" onclick="app.prevExamQuestion()">Anterior</button>
                <button class="btn secondary">Marcar</button>
                <button class="btn primary" onclick="app.nextExamQuestion()">Siguiente</button>
                <button class="btn" onclick="app.finishExam()">Finalizar</button>
            </div>
        `;
    }

    finishExam() {
        clearInterval(this.examTimer);
        this.examInProgress = false;
        
        // Calcular puntuación simulada
        const score = Math.floor(Math.random() * 400) + 200;
        
        document.getElementById('exam-content').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>¡Examen Completado!</h3>
                <p>Puntuación SAT: ${score}/800</p>
                <button class="btn primary" onclick="app.loadExamView()">Nuevo Examen</button>
            </div>
        `;
        
        // Recompensa de XP por completar examen
        this.modules.gamification.addXP(100, 'exam_completion');
    }

    loadAnalytics() {
        document.getElementById('analytics-content').innerHTML = `
            <div style="text-align: center;">
                <h3>Tus Estadísticas</h3>
                <div class="grid">
                    <div class="feature-card">
                        <div class="icon">📈</div>
                        <h3>Progreso General</h3>
                        <p>65% completado</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon">⚡</div>
                        <h3>Racha Actual</h3>
                        <p>5 días seguidos</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon">🎯</div>
                        <h3>Mejor Puntuación</h3>
                        <p>720/800</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadParentDashboard() {
        document.getElementById('parent-content').innerHTML = `
            <div style="text-align: center;">
                <h3>Dashboard para Padres</h3>
                <div class="card">
                    <h4>Última Sesión</h4>
                    <p>Fecha: ${new Date().toLocaleDateString()}</p>
                    <p>Tipo: Práctica</p>
                    <p>Puntuación: 85%</p>
                </div>
                <div class="card">
                    <h4>Progreso General</h4>
                    <p>Nivel Actual: ${this.modules.gamification.getCurrentLevel().level}</p>
                    <p>Puntos Totales: ${this.modules.gamification.state.xp}</p>
                    <p>Sesiones Completadas: 12</p>
                </div>
            </div>
        `;
    }

    loadGamificationWidget() {
        const level = this.modules.gamification.getCurrentLevel();
        document.getElementById('level').textContent = level.level;
        document.getElementById('xp').textContent = this.modules.gamification.state.xp;
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(() => console.log('Service Worker registrado'))
                .catch(err => console.log('Error SW:', err));
        }
    }

    nextExamQuestion() {
        if (this.currentQuestion < 19) {
            this.currentQuestion++;
            this.renderExamQuestion();
        } else {
            this.finishExam();
        }
    }

    prevExamQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderExamQuestion();
        }
    }
}

// Inicializar la aplicación
const app = new SATOwlApp();
window.app = app;
