window.RealExamV5 = class {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.idx = 0;
        this.userAnswers = {};
        this.timeLeft = 32 * 60;
        this.timer = null;
    }

    start() {
        if (!this.container) return;
        this.renderLayout();
        this.bindControls();
        this.renderQuestion();
        this.startTimer();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="v5-exam-wrapper">
                <header class="v5-header">
                    <div>
                        <h2>SAT OWL EVO – Real Exam Mode</h2>
                        <small>Module: Mixed Practice (RW + Math)</small>
                    </div>
                    <div id="v5-timer" class="v5-timer">32:00</div>
                </header>
                <section id="v5-question-area"></section>
                <footer class="v5-footer">
                    <button id="v5-prev">Back</button>
                    <span>Question <span id="v5-qnum"></span> of ${window.SAT_EXAM_QUESTIONS.length}</span>
                    <button id="v5-next">Next</button>
                </footer>
            </div>
        `;
    }

    bindControls() {
        const prev = document.getElementById('v5-prev');
        const next = document.getElementById('v5-next');
        if (prev) prev.onclick = () => this.prev();
        if (next) next.onclick = () => this.next();
    }

    renderQuestion() {
        const q = window.SAT_EXAM_QUESTIONS[this.idx];
        const area = document.getElementById('v5-question-area');
        const num = document.getElementById('v5-qnum');
        if (!q || !area || !num) return;

        num.textContent = this.idx + 1;

        const isReading = q.type === 'reading';

        area.innerHTML = `
            <div class="v5-q-wrapper">
                ${isReading ? `<article class="v5-passage">${q.passage}</article>` : ''}
                <div class="v5-q-block">
                    <p class="v5-q-text">${q.text}</p>
                    <div class="v5-options">
                        ${this.renderOptions(q)}
                    </div>
                </div>
            </div>
        `;

        const prev = document.getElementById('v5-prev');
        const next = document.getElementById('v5-next');
        if (prev) prev.disabled = this.idx === 0;
        if (next) next.textContent = this.idx === window.SAT_EXAM_QUESTIONS.length - 1 ? 'Submit' : 'Next';
    }

    renderOptions(q) {
        const current = this.userAnswers[this.idx];
        return ['A', 'B', 'C', 'D'].map(letter => {
            const selected = current === letter ? 'v5-opt-selected' : '';
            const text = q.options[letter];
            return `
                <button class="v5-option ${selected}" data-letter="${letter}">
                    <span class="v5-opt-letter">${letter}</span>
                    <span class="v5-opt-text">${text}</span>
                </button>
            `;
        }).join('');
    }

    attachOptionHandlers() {
        const area = document.getElementById('v5-question-area');
        if (!area) return;
        area.querySelectorAll('.v5-option').forEach(btn => {
            btn.onclick = () => {
                const letter = btn.getAttribute('data-letter');
                this.userAnswers[this.idx] = letter;
                this.renderQuestion();
            };
        });
    }

    next() {
        if (this.idx < window.SAT_EXAM_QUESTIONS.length - 1) {
            this.idx++;
            this.renderQuestion();
            this.attachOptionHandlers();
        } else {
            this.finishExam();
        }
    }

    prev() {
        if (this.idx > 0) {
            this.idx--;
            this.renderQuestion();
            this.attachOptionHandlers();
        }
    }

    startTimer() {
        const display = document.getElementById('v5-timer');
        this.timer = setInterval(() => {
            this.timeLeft--;
            const m = Math.floor(this.timeLeft / 60);
            const s = this.timeLeft % 60;
            if (display) display.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.finishExam();
            }
        }, 1000);
        // bind first time option handlers
        this.attachOptionHandlers();
    }

    finishExam() {
        clearInterval(this.timer);
        const engine = new AnalyticsEngineV5();
        engine.showReport(this.userAnswers, window.SAT_EXAM_QUESTIONS);
        const evo = new EvolutionSystem(this.calculateXP());
        evo.renderWidget('v5-gamification');
    }

    calculateXP() {
        let xp = 0;
        window.SAT_EXAM_QUESTIONS.forEach((q, idx) => {
            if (this.userAnswers[idx] === q.correct) xp += 50;
        });
        return xp;
    }
};
