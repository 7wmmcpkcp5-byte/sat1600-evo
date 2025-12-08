// ui-components.js - Componentes de UI actualizados con sistema de resultados
import { CONFIG } from './config.js';

export class UIComponents {
    constructor() {
        this.config = CONFIG;
    }

    // === EVOLUTION WIDGET ===
    renderEvolutionWidget(userData) {
        if (!userData) return;
        const container = document.getElementById('evolution-container');
        if (!container) return;

        const progress = this.calculateXPProgress(userData.xp, userData.level);
        const levelName = this.config.levels[userData.level] || "Unknown Owl";

        container.innerHTML = `
            <div class="evolution-widget">
                <div class="evolution-header">
                    <div class="evolution-title">
                        <span class="owl-icon">🦉</span>
                        <h3>SAT OWL PRO</h3>
                    </div>
                    <div class="level-badge">Level ${userData.level}</div>
                </div>
                <div class="xp-section">
                    <div class="xp-bar">
                        <div class="xp-progress" style="width: ${progress.percentage}%">
                            <div class="xp-glow"></div>
                        </div>
                    </div>
                    <div class="xp-info">
                        <span class="xp-current">${userData.xp} XP</span>
                        <span class="xp-next">${progress.nextLevelXP} next</span>
                    </div>
                </div>
                <div class="evolution-footer">
                    <span class="level-name">${levelName}</span>
                    <span class="progress-text">${Math.round(progress.percentage)}%</span>
                </div>
            </div>
        `;
    }

    calculateXPProgress(xp, level) {
        const currentLevelXP = this.config.xpThresholds[level - 1] || 0;
        const nextLevelXP = this.config.xpThresholds[level] || 8000;
        const percentage = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        return { percentage: Math.min(100, Math.max(0, percentage)), nextLevelXP };
    }

    // === SISTEMA DE RESULTADOS ===
    renderResults(resultsData, navigateFn) {
        const container = document.createElement('div');
        container.className = 'results-container';
        
        const performanceLevel = this.getPerformanceLevel(resultsData.percentage);
        const feedbackMessage = this.getFeedbackMessage(performanceLevel, resultsData);

        container.innerHTML = `
            <div class="results-view">
                <div class="results-header">
                    <h1>🎯 Session Results</h1>
                    <p class="results-subtitle">Great work! Here's how you performed:</p>
                </div>
                
                <div class="score-card ${