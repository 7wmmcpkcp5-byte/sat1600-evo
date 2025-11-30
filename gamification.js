export class OwlEvolution {
    constructor() {
        this.level = 1;
        this.points = 0;
        this.owlName = "Sabio";
    }

    addPoints(points) {
        this.points += points;
        this.checkLevelUp();
        this.updateDisplay();
    }

    checkLevelUp() {
        const oldLevel = this.level;
        this.level = Math.floor(this.points / 100) + 1;
        
        if (this.level > oldLevel) {
            console.log(`¡Búho evolucionó al nivel ${this.level}!`);
            this.celebrateLevelUp();
        }
    }

    celebrateLevelUp() {
        // Efectos visuales o notificaciones de nivel
        const owlLevel = document.getElementById('owlLevel');
        if (owlLevel) {
            owlLevel.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                owlLevel.style.animation = '';
            }, 500);
        }
    }

    updateDisplay() {
        const owlLevel = document.getElementById('owlLevel');
        if (owlLevel) {
            owlLevel.innerHTML = `
                <strong>Búho Nivel ${this.level}</strong>
                <br>
                <small>${this.points} puntos</small>
            `;
        }
    }

    getOwlImage() {
        const owlImages = {
            1: '🦉', // Búho bebé
            2: '🐣', 
            3: '🦉', // Búho joven
            4: '🦉🌟', // Búho adulto
            5: '🦉✨' // Búho sabio
        };
        return owlImages[this.level] || owlImages[5];
    }
}
