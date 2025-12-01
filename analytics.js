// analytics.js
export class AnalyticsManager {
    constructor() {
        this.stats = {
            totalQuestions: 0,
            correctQuestions: 0,
            bySection: {
                reading: { correct: 0, total: 0 },
                writing: { correct: 0, total: 0 },
                math: { correct: 0, total: 0 }
            },
            sessionsCompleted: 0,
            examsCompleted: 0,
            timeSpent: 0,
            streak: 0
        };
    }

    recordPracticeResult(section, correctCount, totalCount, timeSpent = 0) {
        this.stats.totalQuestions += totalCount;
        this.stats.correctQuestions += correctCount;
        this.stats.timeSpent += timeSpent;
        this.stats.streak += 1;

        const sec = this.stats.bySection[section] || { correct: 0, total: 0 };
        sec.correct += correctCount;
        sec.total += totalCount;
        this.stats.bySection[section] = sec;
        this.stats.sessionsCompleted += 1;
    }

    renderInto(container) {
        if (!container) return;
        
        const s = this.stats;
        const overallAcc = s.totalQuestions
            ? Math.round((s.correctQuestions / s.totalQuestions) * 100)
            : 0;

        container.innerHTML = `
            <div class="analytics-card">
                <div class="analytics-label">Overall Accuracy</div>
                <div class="analytics-value">${overallAcc}%</div>
            </div>
            <div class="analytics-card">
                <div class="analytics-label">Sessions Completed</div>
                <div class="analytics-value">${s.sessionsCompleted}</div>
            </div>
            <div class="analytics-card">
                <div class="analytics-label">Current Streak</div>
                <div class="analytics-value">${s.streak} days</div>
            </div>
        `;
    }
}