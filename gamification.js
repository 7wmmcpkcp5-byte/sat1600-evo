export class OwlEvolution {
    constructor() {
        this.levels = [
            { level: 1, emoji: '🪶', xpRequired: 0, title: 'Hatchling' },
            { level: 2, emoji: '🦉', xpRequired: 100, title: 'Wise Owl' },
            { level: 3, emoji: '🔍', xpRequired: 250, title: 'Analyst' },
            { level: 4, emoji: '🎯', xpRequired: 450, title: 'Precision Master' },
            { level: 5, emoji: '🏆', xpRequired: 700, title: 'Champion' },
            { level: 6, emoji: '👑', xpRequired: 1000, title: 'SAT Monarch' },
            { level: 7, emoji: '💫', xpRequired: 1350, title: 'Cosmic Scholar' }
        ];
        
        this.state = this.loadState();
    }

    loadState() {
        const saved = localStorage.getItem('owl-evolution');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            xp: 0,
            totalXP: 0,
            level: 1,
            xpSources: {}
        };
    }

    saveState() {
        localStorage.setItem('owl-evolution', JSON.stringify(this.state));
    }

    addXP(amount, source) {
        this.state.xp += amount;
        this.state.totalXP += amount;
        
        if (source) {
            this.state.xpSources[source] = (this.state.xpSources[source] || 0) + amount;
        }
        
        const oldLevel = this.getCurrentLevel();
        const newLevel = this.getCurrentLevel();
        
        if (newLevel.level > oldLevel.level) {
            this.handleLevelUp(newLevel);
        }
        
        this.saveState();
        return {
            xpGained: amount,
            oldLevel,
            newLevel,
            levelUp: newLevel.level > oldLevel.level
        };
    }

    getCurrentLevel() {
        let currentLevel = this.levels[0];
        
        for (const level of this.levels) {
            if (this.state.xp >= level.xpRequired) {
                currentLevel = level;
            } else {
                break;
            }
        }
        
        return currentLevel;
    }

    getXPForNextLevel() {
        const currentLevel = this.getCurrentLevel();
        const nextLevel = this.levels.find(level => level.level === currentLevel.level + 1);
        
        if (!nextLevel) return 0;
        
        return nextLevel.xpRequired - this.state.xp;
    }

    handleLevelUp(newLevel) {
        console.log(`🎉 ¡Nivel subido! Ahora eres ${newLevel.title} ${newLevel.emoji}`);
        
        // Aquí podrías mostrar una notificación en la UI
        if (typeof document !== 'undefined') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--accent);
                color: white;
                padding: 15px 20px;
                border-radius: var(--border-radius);
                z-index: 1000;
                animation: slideDown 0.5s ease-out;
            `;
            notification.innerHTML = `
                <strong>🎉 ¡Nivel ${newLevel.level} desbloqueado!</strong><br>
                ${newLevel.emoji} ${newLevel.title}
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        }
    }
}
