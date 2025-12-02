// ui-components.js - COMPLETO Y FUNCIONAL
import { CONFIG, getLevelInfo, calculateXPForAnswer } from './config.js';

export class UIComponents {
    constructor() {
        this.config = CONFIG;
        this.currentAudio = null;
        this.currentAnimation = null;
    }

    // ============ EVOLUTION WIDGET ============
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

        // Animar la barra de XP
        setTimeout(() => {
            const progressBar = container.querySelector('.xp-progress');
            if (progressBar) {
                progressBar.style.transition = 'width 1s ease';
            }
        }, 100);
    }

    calculateXPProgress(xp, level) {
        const currentLevelXP = this.config.xpThresholds[level - 1] || 0;
        const nextLevelXP = this.config.xpThresholds[level] || this.config.xpThresholds[this.config.xpThresholds.length - 1];
        const percentage = nextLevelXP > currentLevelXP ? 
            ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;
        return { 
            percentage: Math.min(100, Math.max(0, percentage)), 
            nextLevelXP: nextLevelXP 
        };
    }

    // ============ SISTEMA DE PREGUNTAS ============
    renderQuestion(question, answerCallback) {
        if (!question) return;
        
        const container = document.getElementById('question-container');
        if (!container) return;

        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <div class="question-meta">
                        <span class="question-category">${this.formatCategory(question.category)}</span>
                        <span class="question-difficulty ${question.difficulty}">${question.difficulty}</span>
                        <span class="question-section">${question.section.toUpperCase()}</span>
                    </div>
                    <div class="question-timer" id="question-timer">--:--</div>
                </div>
                
                <div class="question-content">
                    <h2 class="question-text" id="question-text">${question.text || question.question}</h2>
                    
                    <div class="question-options" id="question-options">
                        ${this.renderOptions(question.options, answerCallback)}
                    </div>
                </div>
                
                <div class="question-footer">
                    <div class="question-hint" id="question-hint">
                        💡 Select your answer above
                    </div>
                    <div class="question-actions">
                        <button class="btn btn-hint" id="hint-btn">
                            💡 Show Hint
                        </button>
                        <button class="btn btn-skip" id="skip-btn">
                            ⏭️ Skip Question
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Configurar eventos
        this.setupQuestionEvents(question, answerCallback);
        
        // Iniciar temporizador si está configurado
        if (question.timeEstimate) {
            this.startQuestionTimer(question.timeEstimate);
        }
    }

    renderOptions(options, answerCallback) {
        return options.map((option, index) => `
            <div class="option-item" data-index="${index}">
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
                <div class="option-selector"></div>
            </div>
        `).join('');
    }

    setupQuestionEvents(question, answerCallback) {
        // Selección de opciones
        const optionItems = document.querySelectorAll('.option-item');
        optionItems.forEach(item => {
            item.addEventListener('click', () => {
                if (this.isAnswerLocked) return;
                
                const selectedIndex = parseInt(item.dataset.index);
                this.selectOption(selectedIndex);
                
                // Desbloquear después de 500ms para permitir animación
                setTimeout(() => {
                    if (answerCallback) answerCallback(selectedIndex);
                }, 500);
            });
        });

        // Botón de pista
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn && question.explanation) {
            hintBtn.addEventListener('click', () => {
                this.showHint(question.explanation);
            });
        }

        // Botón de saltar
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                if (confirm("Skip this question? You won't earn XP for it.")) {
                    if (answerCallback) answerCallback(-1); // -1 indica pregunta saltada
                }
            });
        }

        this.isAnswerLocked = false;
    }

    selectOption(selectedIndex) {
        const optionItems = document.querySelectorAll('.option-item');
        optionItems.forEach(item => {
            item.classList.remove('selected');
            if (parseInt(item.dataset.index) === selectedIndex) {
                item.classList.add('selected');
            }
        });
        this.isAnswerLocked = true;
    }

    startQuestionTimer(seconds) {
        const timerElement = document.getElementById('question-timer');
        if (!timerElement) return;

        let timeLeft = seconds;
        this.updateTimerDisplay(timerElement, timeLeft);

        this.timerInterval = setInterval(() => {
            timeLeft--;
            this.updateTimerDisplay(timerElement, timeLeft);

            if (timeLeft <= 10) {
                timerElement.classList.add('warning');
            }

            if (timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.handleTimeUp();
            }
        }, 1000);
    }

    updateTimerDisplay(element, seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        element.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    handleTimeUp() {
        const options = document.querySelectorAll('.option-item');
        options.forEach(option => {
            option.style.opacity = '0.5';
            option.style.pointerEvents = 'none';
        });
        
        this.showMessage("⏰ Time's up! The question will be marked as incorrect.", 'warning');
    }

    showHint(explanation) {
        const hintElement = document.getElementById('question-hint');
        if (hintElement) {
            hintElement.innerHTML = `
                <div class="hint-content">
                    <strong>💡 Hint:</strong> ${explanation.substring(0, 100)}...
                    <button class="btn-show-more" id="show-more-hint">Show More</button>
                </div>
            `;

            document.getElementById('show-more-hint')?.addEventListener('click', () => {
                hintElement.innerHTML = `
                    <div class="hint-content full">
                        <strong>💡 Detailed Explanation:</strong><br>
                        ${explanation}
                    </div>
                `;
            });
        }
    }

    // ============ SISTEMA DE FEEDBACK ============
    showFeedback(isCorrect, correctIndex, selectedIndex) {
        const options = document.querySelectorAll('.option-item');
        
        // Mostrar todas las opciones
        options.forEach(option => {
            option.style.opacity = '1';
            option.classList.remove('correct', 'incorrect');
            
            const index = parseInt(option.dataset.index);
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Mostrar mensaje de feedback
        const feedbackContainer = document.getElementById('feedback-container');
        if (!feedbackContainer) return;

        let message = '';
        let className = '';

        if (isCorrect) {
            message = '🎉 Correct! Excellent work!';
            className = 'feedback-correct';
            this.playSound('correct');
        } else {
            message = `📝 Not quite. The correct answer was ${String.fromCharCode(65 + correctIndex)}.`;
            className = 'feedback-incorrect';
            this.playSound('incorrect');
        }

        feedbackContainer.innerHTML = `
            <div class="feedback ${className}">
                <div class="feedback-content">
                    <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
                    <div class="feedback-text">
                        <h4>${message}</h4>
                        ${!isCorrect ? `<p>Study this type of question more carefully.</p>` : ''}
                    </div>
                </div>
            </div>
        `;

        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            feedbackContainer.innerHTML = '';
        }, 3000);
    }

    playSound(type) {
        if (!this.config.animations.sound) return;
        
        // Detener audio anterior si existe
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        // Crear sonido simple (podría usar audio real)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = type === 'correct' ? 800 : 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
        } catch (error) {
            console.log('Audio not supported:', error);
        }
    }

    // ============ SISTEMA DE RESULTADOS ============
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
                
                <div class="score-card ${performanceLevel}">
                    <div class="score-main">
                        <div class="score-percentage">${resultsData.percentage || 0}%</div>
                        <div class="score-label">Overall Accuracy</div>
                    </div>
                    <div class="score-details">
                        <div class="score-stat">
                            <span class="stat-value">${resultsData.correct || 0}</span>
                            <span class="stat-label">Correct</span>
                        </div>
                        <div class="score-stat">
                            <span class="stat-value">${resultsData.total || 0}</span>
                            <span class="stat-label">Total Questions</span>
                        </div>
                        <div class="score-stat">
                            <span class="stat-value">${resultsData.timeSpent || 0}s</span>
                            <span class="stat-label">Time Spent</span>
                        </div>
                    </div>
                </div>
                
                <div class="performance-feedback">
                    <div class="feedback-icon">${this.getPerformanceIcon(performanceLevel)}</div>
                    <div class="feedback-content">
                        <h3>${this.getPerformanceTitle(performanceLevel)}</h3>
                        <p>${feedbackMessage}</p>
                    </div>
                </div>
                
                ${resultsData.sectionBreakdown ? `
                    <div class="section-breakdown">
                        <h3>📊 Section Breakdown</h3>
                        <div class="breakdown-grid">
                            ${Object.entries(resultsData.sectionBreakdown).map(([section, stats]) => `
                                <div class="breakdown-item">
                                    <div class="breakdown-header">
                                        <span class="section-name">${section}</span>
                                        <span class="section-accuracy">${stats.accuracy || 0}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${stats.accuracy || 0}%"></div>
                                    </div>
                                    <div class="breakdown-stats">
                                        <span>${stats.correct || 0}/${stats.total || 0} correct</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="results-actions">
                    <button class="btn btn-primary" id="continue-btn">
                        Continue Practicing
                    </button>
                    <button class="btn btn-secondary" id="review-btn">
                        📖 Review Mistakes
                    </button>
                    <button class="btn btn-outline" id="share-btn">
                        📤 Share Results
                    </button>
                </div>
                
                <div class="results-footer">
                    <p>Keep up the great work! Every question brings you closer to your SAT goals.</p>
                </div>
            </div>
        `;

        // Configurar eventos
        this.setupResultsEvents(container, navigateFn);
        
        return container;
    }

    getPerformanceLevel(percentage) {
        if (percentage >= 90) return 'excellent';
        if (percentage >= 75) return 'good';
        if (percentage >= 60) return 'fair';
        return 'needs-improvement';
    }

    getPerformanceIcon(level) {
        const icons = {
            'excellent': '🏆',
            'good': '⭐',
            'fair': '📈',
            'needs-improvement': '💪'
        };
        return icons[level] || '📊';
    }

    getPerformanceTitle(level) {
        const titles = {
            'excellent': 'Outstanding Performance!',
            'good': 'Solid Work!',
            'fair': 'Good Progress!',
            'needs-improvement': 'Keep Practicing!'
        };
        return titles[level] || 'Results';
    }

    getFeedbackMessage(performanceLevel, resultsData) {
        const messages = {
            'excellent': "You're mastering the material! Your accuracy is exceptional. Consider tackling more challenging questions.",
            'good': "You're doing well! With a bit more practice, you'll reach excellent level. Focus on your weaker areas.",
            'fair': "You're making progress! Review the questions you missed and try similar ones to improve.",
            'needs-improvement': "Every expert was once a beginner. Review the concepts and try again. You'll improve with practice!"
        };
        
        let message = messages[performanceLevel] || "Keep practicing to improve your skills!";
        
        // Añadir consejos específicos
        if (resultsData.weakAreas && resultsData.weakAreas.length > 0) {
            message += ` Focus on ${resultsData.weakAreas[0].toLowerCase()} to see the biggest improvement.`;
        }
        
        if (resultsData.timeSpent && resultsData.timeSpent / (resultsData.total || 1) > 120) {
            message += " Try to improve your time management - aim for under 2 minutes per question.";
        }
        
        return message;
    }

    setupResultsEvents(container, navigateFn) {
        // Botón continuar
        const continueBtn = container.querySelector('#continue-btn');
        if (continueBtn && navigateFn) {
            continueBtn.addEventListener('click', () => {
                if (typeof navigateFn === 'function') {
                    navigateFn('practice');
                }
            });
        }

        // Botón revisar
        const reviewBtn = container.querySelector('#review-btn');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', () => {
                this.showMessage('Review feature coming soon!', 'info');
            });
        }

        // Botón compartir
        const shareBtn = container.querySelector('#share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResults();
            });
        }
    }

    shareResults() {
        if (navigator.share) {
            navigator.share({
                title: 'My SAT Practice Results',
                text: 'Check out my SAT practice results!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showMessage('Link copied to clipboard!', 'success');
            });
        }
    }

    // ============ NOTIFICACIONES Y MENSAJES ============
    showMessage(message, type = 'info', duration = 3000) {
        const messageContainer = document.getElementById('message-container') || this.createMessageContainer();
        
        const messageId = 'msg-' + Date.now();
        const messageElement = document.createElement('div');
        messageElement.id = messageId;
        messageElement.className = `message message-${type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message-icon">${this.getMessageIcon(type)}</div>
                <div class="message-text">${message}</div>
                <button class="message-close" onclick="document.getElementById('${messageId}').remove()">×</button>
            </div>
        `;
        
        messageContainer.appendChild(messageElement);
        
        // Auto-remover
        if (duration > 0) {
            setTimeout(() => {
                if (document.getElementById(messageId)) {
                    messageElement.remove();
                }
            }, duration);
        }
    }

    getMessageIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || '💡';
    }

    createMessageContainer() {
        const container = document.createElement('div');
        container.id = 'message-container';
        container.className = 'message-container';
        document.body.appendChild(container);
        return container;
    }

    // ============ UTILIDADES ============
    formatCategory(category) {
        const categories = {
            'algebra': 'Algebra',
            'geometry': 'Geometry',
            'comprehension': 'Reading Comprehension',
            'grammar': 'Grammar',
            'data_analysis': 'Data Analysis',
            'advanced_math': 'Advanced Math'
        };
        return categories[category] || category.replace('_', ' ').toUpperCase();
    }

    showLoading(show = true, message = 'Loading...') {
        const loadingContainer = document.getElementById('loading-container') || this.createLoadingContainer();
        
        if (show) {
            loadingContainer.innerHTML = `
                <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">${message}</div>
                </div>
            `;
            loadingContainer.style.display = 'flex';
        } else {
            loadingContainer.style.display = 'none';
        }
    }

    createLoadingContainer() {
        const container = document.createElement('div');
        container.id = 'loading-container';
        container.className = 'loading-container';
        document.body.appendChild(container);
        return container;
    }

    // ============ ANIMACIONES ============
    animateXPBar(element, from, to, duration = 1000) {
        if (!element || !this.config.animations.animations) return;
        
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = from + (to - from) * this.easeInOutCubic(progress);
            element.style.width = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // ============ LIMPIEZA ============
    cleanup() {
        // Detener temporizadores
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Detener audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        
        // Detener animaciones
        if (this.currentAnimation) {
            cancelAnimationFrame(this.currentAnimation);
            this.currentAnimation = null;
        }
    }

    // ============ MÉTODOS PARA COMPATIBILIDAD ============
    // Métodos que main.js espera pero no son críticos
    updateUI() {
        // Placeholder - la lógica real estaría en otro lugar
        console.log('UI updated');
    }

    updateFooterStats() {
        const stats = {
            total: document.getElementById('total-questions')?.textContent || '0',
            accuracy: document.getElementById('accuracy-rate')?.textContent || '0%',
            streak: document.getElementById('session-streak')?.textContent || '0'
        };
        return stats;
    }
}