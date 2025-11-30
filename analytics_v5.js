window.AnalyticsEngineV5 = class {
    constructor() {
        this.mainApp = document.getElementById('v5-app');
        this.view = document.getElementById('v5-analytics');
    }

    showReport(userAnswers, questions) {
        if (this.mainApp) this.mainApp.style.display = 'none';
        if (this.view) this.view.style.display = 'block';

        const stats = this.process(userAnswers, questions);
        this.renderSummary(stats);
        this.renderTable(stats, questions, userAnswers);
    }

    process(userAnswers, questions) {
        let correct = 0;
        const domains = {};

        questions.forEach((q, idx) => {
            const isCorrect = userAnswers[idx] === q.correct;
            if (isCorrect) correct++;

            if (!domains[q.domain]) domains[q.domain] = { total: 0, correct: 0 };
            domains[q.domain].total++;
            if (isCorrect) domains[q.domain].correct++;
        });

        const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
        return { correct, total: questions.length, pct, domains };
    }

    renderSummary(stats) {
        const scoreEl = document.getElementById('v5-score');
        const pctEl = document.getElementById('v5-pct');
        if (scoreEl) scoreEl.textContent = `${stats.correct} / ${stats.total}`;
        if (pctEl) pctEl.textContent = `${stats.pct}% correct`;
    }

    renderTable(stats, questions, userAnswers) {
        const tbody = document.getElementById('v5-breakdown-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        questions.forEach((q, idx) => {
            const tr = document.createElement('tr');
            const user = userAnswers[idx] || '-';
            const ok = user === q.correct;
            const expl = (window.SAT_EXAM_EXPLANATIONS && window.SAT_EXAM_EXPLANATIONS[q.id]) || '';

            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${q.id}</td>
                <td>${q.domain}</td>
                <td>${user}</td>
                <td>${q.correct}</td>
                <td style="color:${ok ? 'green' : 'red'}">${ok ? '✔' : '✖'}</td>
                <td>${expl}</td>
            `;
            tbody.appendChild(tr);
        });
    }
};
