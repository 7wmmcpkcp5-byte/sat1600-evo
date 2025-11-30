import { questions, getQuestionsByCategory, getUnansweredQuestions, markQuestionAsAnswered } from './questions.js';
import { explanations, getExplanationsByCategory } from './explanations.js';
import { OwlEvolution } from './gamification.js';
import { PremiumFeatures } from './premium-features.js';
import { Analytics } from './analytics.js';

class SATOwlApp {
    constructor() {
        this.analytics = new Analytics();
        this.owlEvolution = new OwlEvolution();
        this.premiumFeatures = new PremiumFeatures();
        this.currentSection = 'questions';
        this.init();
    }

    init() {
        this.initializeServiceWorker();
        this.setupEventListeners();
        this.loadInitialData();
        this.analytics.trackPageView();
        
        console.log('🦉 SAT Owl Evolution inicializado');
    }

    initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
