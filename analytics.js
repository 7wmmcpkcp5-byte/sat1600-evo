const LS_KEY_STATS = "sat_pro_master_evo_stats";

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
      examsCompleted: 0
    };
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(LS_KEY_STATS);
      if (!raw) return;
      const data = JSON.parse(raw);
      this.stats = { ...this.stats, ...data };
    } catch (e) {
      console.warn("Unable to load stats", e);
    }
  }

  save() {
    localStorage.setItem(LS_KEY_STATS, JSON.stringify(this.stats));
  }

  recordPracticeResult(section, correctCount, totalCount) {
    this.stats.totalQuestions += totalCount;
    this.stats.correctQuestions += correctCount;
    const sec = this.stats.bySection[section] || { correct: 0, total: 0 };
    sec.correct += correctCount;
    sec.total += totalCount;
    this.stats.bySection[section] = sec;
    this.stats.sessionsCompleted += 1;
    this.save();
  }

  recordExamResult(sectionResults) {
    for (const sec of Object.keys(sectionResults)) {
      const { correct, total } = sectionResults[sec];
      const s = this.stats.bySection[sec] || { correct: 0, total: 0 };
      s.correct += correct;
      s.total += total;
      this.stats.bySection[sec] = s;
      this.stats.totalQuestions += total;
      this.stats.correctQuestions += correct;
    }
    this.stats.examsCompleted += 1;
    this.save();
  }

  renderInto(container) {
    const s = this.stats;
    const overallAcc = s.totalQuestions
      ? Math.round((s.correctQuestions / s.totalQuestions) * 100)
      : 0;

    container.innerHTML = "";
    const cards = [];

    cards.push(this._makeCard("Estimated SAT Overall Accuracy", overallAcc + "%"));
    cards.push(this._makeCard("Sessions Completed", String(s.sessionsCompleted)));
    cards.push(this._makeCard("Exams Completed", String(s.examsCompleted)));

    for (const sec of ["reading", "writing", "math"]) {
      const secStats = s.bySection[sec];
      const acc = secStats.total
        ? Math.round((secStats.correct / secStats.total) * 100)
        : 0;
      cards.push(this._makeCard(`${sec.toUpperCase()} Accuracy`, acc + "%"));
    }

    cards.forEach(c => container.appendChild(c));
  }

  _makeCard(label, value) {
    const div = document.createElement("div");
    div.className = "stat-card";
    const l = document.createElement("div");
    l.className = "stat-label";
    l.textContent = label;
    const v = document.createElement("div");
    v.className = "stat-value";
    v.textContent = value;
    div.appendChild(l);
    div.appendChild(v);
    return div;
  }
}
