window.EvolutionSystem = class {
    constructor(xp = 0) {
        this.xp = xp;
        this.level = this.levelFromXP(xp);
    }

    levelFromXP(xp) {
        if (xp >= 6000) return 7;
        if (xp >= 4000) return 6;
        if (xp >= 2500) return 5;
        if (xp >= 1500) return 4;
        if (xp >= 700)  return 3;
        if (xp >= 300)  return 2;
        return 1;
    }

    getLevelName() {
        const names = {
            1: "Shy Owl",
            2: "Explorer Owl",
            3: "Student Owl",
            4: "Tactical Owl",
            5: "Strategist Owl",
            6: "Master Owl",
            7: "1600 Legend Owl"
        };
        return names[this.level] || "Unknown Level";
    }

    renderWidget(containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;

        el.innerHTML = `
            <div class="evo-widget">
                <h3>🦉 SAT OWL EVO</h3>
                <p>XP: ${this.xp}</p>
                <p>Level ${this.level}: <strong>${this.getLevelName()}</strong></p>
            </div>
        `;
    }
};
