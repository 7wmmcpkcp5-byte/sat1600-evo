// app-main.js - Actualizado para el nuevo diseño
import { QuizEngine } from './quiz-engine.js';
import { AITutor } from './ai-tutor.js';

class SATApp {
    constructor() {
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
    }

    loadUserData() {
        // Cargar datos reales del usuario
        const userData = JSON.parse(localStorage.getItem('sat-user-data') || '{}');
        
        // Actualizar la UI con datos reales
        this.updateUI(userData);
    }

    updateUI(userData) {
        // Actualizar score, XP, nivel, etc.
        document.querySelector('.current-score').textContent = userData.currentScore || '400';
        document.querySelector('.xp-display span').textContent = `XP: ${userData.xp || 0}`;
        
        const subject = userData.currentSubject || 'MATH';
        const level = userData.currentLevel || 1;
        document.querySelector('.subject-name').textContent = subject;
        document.querySelector('.level-badge').textContent = `Level ${level}`;
    }

    setupEventListeners() {
        document.getElementById('practice-mode').addEventListener('click', () => {
            this.startPracticeMode();
        });

        document.getElementById('adaptive-mode').addEventListener('click', () => {
            this.startAdaptiveMode();
        });
    }

    startPracticeMode() {
        // Lógica para modo práctica
        console.log('Iniciando modo práctica...');
        // Redirigir al quiz engine
    }

    startAdaptiveMode() {
        // Lógica para modo adaptativo
        console.log('Iniciando modo adaptativo...');
        // Implementar lógica adaptativa
    }
}

// Inicializar la app
new SATApp();