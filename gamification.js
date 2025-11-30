const LS_KEY = "sat_pro_master_evo_gamification";

const LEVELS = [
  { name: "Rookie Reader", xpReq: 0 },
  { name: "Steady Scholar", xpReq: 150 },
  { name: "Exam Explorer", xpReq: 400 },
  { name: "Concept Crusher", xpReq: 800 },
  { name: "Curve Breaker", xpReq: 1300 },
  { name: "SAT Master", xpReq: 2000 },
  { name: "1600 Legend", xpReq: 3000 }
];

export class OwlEvolutionPro {
  constructor() {
    this.xp = 0;
    this.streak = 0;
    this.sessions = 0;
    this.lastStudyDay = null;
    this.badges = [];
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.assign(this, data);
    } catch (e) {
      console.warn("Unable to load gamification", e);
    }
  }

  save() {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        xp: this.xp,
        streak: this.streak,
        sessions: this.sessions,
        lastStudyDay: this.lastStudyDay,
        badges: this.badges
      })
    );
  }

  _updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (!this.lastStudyDay) {
      this.streak = 1;
    } else if (this.lastStudyDay !== today) {
      const prev = new Date(this.lastStudyDay);
      const diff = (new Date(today) - prev) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        this.streak += 1;
      } else if (diff > 1) {
        this.streak = 1;
      }
    }
    this.lastStudyDay = today;
  }

  addXP(amount, source) {
    this.xp += amount;
    this._updateStreak();
    if (source === "exam_completed") {
      this.sessions += 1;
    }
    this._checkBadges(source);
    this.save();
  }

  _checkBadges(source) {
    if (this.xp >= 750 && !this.badges.includes("750+ Club")) {
      this.badges.push("750+ Club");
    }
    if (this.streak >= 7 && !this.badges.includes("7-Day Streak")) {
      this.badges.push("7-Day Streak");
    }
    if (source === "practice_perfect" && !this.badges.includes("Perfect Practice")) {
      this.badges.push("Perfect Practice");
    }
  }

  getLevel() {
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
      if (this.xp >= lvl.xpReq) current = lvl;
      else break;
    }
    const next = LEVELS.find(l => l.xpReq > this.xp) || null;
    return {
      name: current.name,
      xp: this.xp,
      nextXp: next ? next.xpReq : null
    };
  }
}
