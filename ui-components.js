// ui-components.js - Componentes de UI profesionales
class UIComponents {
    constructor() {
        this.animations = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };
    }

    // === EVOLUTION WIDGET ===
    renderEvolutionWidget(userData) {
        const widget = document.createElement('div');
        widget.className = 'evolution-widget';
        
        const progress = this.calculateXPProgress(userData.xp, userData.level);
        const levelName = this.getLevelName(userData.level);

        widget.innerHTML = `
            <div class="evolution-header">
                <div class="evolution-title">
                    <span class="owl-icon">🦉</span>
                    <h3>SAT OWL</h3>
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
                    <span class="xp-next">${progress.nextLevelXP} for next</span>
                </div>
            </div>
            
            <div class="evolution-footer">
                <span class="level-name">${levelName}</span>
                <span class="progress-text">${progress.percentage}%</span>
            </div>
        `;

        return widget;
    }

    calculateXPProgress(xp, level) {
        const levelThresholds = [0, 300, 700, 1500, 2500, 4000, 6000, 8000];
        const currentLevelXP = levelThresholds[level - 1] || 0;
        const nextLevelXP = levelThresholds[level] || 8000;
        const percentage = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

        return {
            percentage: Math.min(100, Math.max(0, percentage)),
            currentLevelXP,
            nextLevelXP
        };
    }

    getLevelName(level) {
        const names = {
            1: "🌱 Novice Owl", 
            2: "🚀 Explorer Owl",
            3: "📚 Student Owl",
            4: "🎯 Tactical Owl",
            5: "⚡ Strategist Owl",
            6: "🏆 Master Owl",
            7: "🌟 Legend Owl"
        };
        return names[level] || "Unknown Level";
    }

    // === QUESTION RENDERER ===
    renderQuestion(question, onOptionSelect) {
        const questionTextElement = document.getElementById('question-text');
        const optionsContainer = document.getElementById('question-options');

        if (questionTextElement) {
            questionTextElement.textContent = question.text;
            questionTextElement.style.opacity = '0';
            
            setTimeout(() => {
                questionTextElement.style.opacity = '1';
            }, 50);
        }

        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            optionsContainer.style.opacity = '0';

            question.options.forEach((option, index) => {
                const optionElement = this.createOptionElement(option, index, onOptionSelect);
                optionsContainer.appendChild(optionElement);
            });

            setTimeout(() => {
                optionsContainer.style.opacity = '1';
            }, 150);
        }
    }

    createOptionElement(optionText, index, onOptionSelect) {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${optionText}</span>
        `;

        optionElement.addEventListener('click', () => {
            this.selectOption(index);
            onOptionSelect(index);
        });

        // Animación de entrada escalonada
        optionElement.style.animationDelay = `${index * 0.1}s`;
        optionElement.classList.add('option-enter');

        return optionElement;
    }

    selectOption(optionIndex) {
        // Remover selección anterior con animación
        document.querySelectorAll('.option.selected').forEach(option => {
            option.classList.add('option-exit');
            setTimeout(() => {
                option.classList.remove('selected', 'option-exit');
            }, 150);
        });

        // Seleccionar nueva opción con animación
        const options = document.querySelectorAll('.option');
        if (options[optionIndex]) {
            setTimeout(() => {
                options[optionIndex].classList.add('selected');
            }, 200);
        }
    }

    getSelectedOption() {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            const options = document.querySelectorAll('.option');
            return Array.from(options).indexOf(selectedOption);
        }
        return null;
    }

    clearOptions() {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
    }

    // === ANSWER FEEDBACK ===
    showAnswerResult(isCorrect, selectedIndex, correctIndex) {
        const options = document.querySelectorAll('.option');
        
        // Animación para la respuesta correcta
        if (options[correctIndex]) {
            setTimeout(() => {
                options[correctIndex].classList.add('correct', 'pulse');
            }, 300);
        }
        
        // Animación para respuesta incorrecta del usuario
        if (!isCorrect && options[selectedIndex] && selectedIndex !== correctIndex) {
            setTimeout(() => {
                options[selectedIndex].classList.add('incorrect', 'shake');
            }, 500);
        }

        // Feedback visual adicional
        this.showResultIndicator(isCorrect);
    }

    showResultIndicator(isCorrect) {
        const indicator = document.createElement('div');
        indicator.className = `result-indicator ${isCorrect ? 'correct' : 'incorrect'}`;
        indicator.innerHTML = isCorrect ? '✓ Correct!' : '✗ Try Again';
        
        document.body.appendChild(indicator);
        
        // Animación de entrada y salida
        setTimeout(() => indicator.classList.add('show'), 10);
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => indicator.remove(), 300);
        }, 2000);
    }

    // === PROGRESS UPDATES ===
    updateProgress(progress) {
        const progressFill = document.getElementById('quiz-progress-fill');
        const currentNumber = document.getElementById('current-question');
        const totalNumber = document.getElementById('total-questions');

        if (progressFill) {
            progressFill.style.width = `${progress.percentage}%`;
        }

        if (currentNumber && totalNumber) {
            currentNumber.textContent = progress.current;
            totalNumber.textContent = progress.total;
        }
    }

    // === LOADING STATES ===
    showLoadingState(container, message = 'Loading...') {
        container.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <div class="spinner-circle"></div>
                </div>
                <p class="loading-text">${message}</p>
            </div>
        `;
    }

    hideLoadingState(container) {
        const loadingState = container.querySelector('.loading-state');
        if (loadingState) {
            loadingState.style.opacity = '0';
            setTimeout(() => {
                loadingState.remove();
            }, 300);
        }
    }

    // === ACHIEVEMENTS ===
    showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-notification';
        achievement.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${title}</div>
                <div class="achievement-desc">${description}</div>
            </div>
            <div class="achievement-progress"></div>
        `;

        document.body.appendChild(achievement);

        // Animación de notificación
        setTimeout(() => achievement.classList.add('show'), 100);
        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => achievement.remove(), 500);
        }, 4000);
    }

    // === RESPONSIVE HELPERS ===
    isMobile() {
        return window.innerWidth <= 768;
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // === ACCESSIBILITY ===
    setFocus(element) {
        if (element && typeof element.focus === 'function') {
            element.focus();
        }
    }

    announceToScreenReader(message) {
        const announcer = document.getElementById('screen-reader-announcer') || 
                         this.createScreenReaderAnnouncer();
        announcer.textContent = message;
    }

    createScreenReaderAnnouncer() {
        const announcer = document.createElement('div');
        announcer.id = 'screen-reader-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        return announcer;
    }
}

// Componente de modal mejorado
class ModalSystem {
    constructor() {
        this.activeModal = null;
    }

    show(title, content, options = {}) {
        this.hide(); // Cerrar modal anterior

        const modal = document.createElement('div');
        modal.className = 'modal professional';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    ${options.closable !== false ? '<button class="modal-close">&times;</button>' : ''}
                </div>
                <div class="modal-body">${content}</div>
                ${options.actions ? `
                    <div class="modal-actions">
                        ${options.actions}
                    </div>
                ` : ''}
            </div>
        `;

        document.body.appendChild(modal);
        this.activeModal = modal;

        // Animación de entrada
        setTimeout(() => modal.classList.add('active'), 10);

        // Event listeners
        if (options.closable !== false) {
            modal.querySelector('.modal-backdrop').addEventListener('click', () => this.hide());
            modal.querySelector('.modal-close').addEventListener('click', () => this.hide());
        }

        // Auto-close si se especifica
        if (options.autoClose) {
            setTimeout(() => this.hide(), options.autoClose);
        }

        return modal;
    }

    hide() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            setTimeout(() => {
                if (this.activeModal && this.activeModal.parentNode) {
                    this.activeModal.parentNode.removeChild(this.activeModal);
                }
                this.activeModal = null;
            }, 300);
        }
    }
}

// Exportar sistemas
const UI = new UIComponents();
const Modal = new ModalSystem();

export { UI, Modal, UIComponents };