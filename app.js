import { questions, getUnansweredQuestions, markQuestionAsAnswered } from './questions.js';
import { Analytics } from './analytics.js';
import { OwlEvolution } from './gamification.js';

class ParentDashboard {
    constructor() {
        this.analytics = new Analytics();
        this.owlEvolution = new OwlEvolution();
        this.init();
    }

    init() {
        // Inicializar analytics
        this.analytics.trackPageView();
        this.analytics.startTimeTracking();

        // Inicializar gamificación
        this.owlEvolution.updateDisplay();

        // Cargar preguntas
        this.loadQuestions();

        // Registrar eventos
        this.registerEvents();

        console.log('Parent Dashboard Beta inicializado');
    }

    loadQuestions() {
        const container = document.getElementById('questionsContainer');
        const unansweredQuestions = getUnansweredQuestions();

        if (unansweredQuestions.length === 0) {
            container.innerHTML = '<p>¡No hay preguntas pendientes! 🎉</p>';
            return;
        }

        container.innerHTML = unansweredQuestions.map(question => `
            <div class="question-card" data-id="${question.id}">
                <h3>${question.question}</h3>
                <p><em>Categoría: ${question.category}</em></p>
                <button class="answer-btn" onclick="app.answerQuestion(${question.id})">
                    Marcar como respondida
                </button>
            </div>
        `).join('');
    }

    answerQuestion(questionId) {
        if (markQuestionAsAnswered(questionId)) {
            this.analytics.trackInteraction();
            this.owlEvolution.addPoints(25);
            this.loadQuestions();
            alert('¡Pregunta marcada como respondida! +25 puntos');
        }
    }

    registerEvents() {
        // Hacer el método answerQuestion disponible globalmente
        window.app = this;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ParentDashboard();
});
