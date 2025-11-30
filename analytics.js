export class Analytics {
    constructor() {
        this.data = {
            pageViews: 0,
            timeSpent: 0,
            interactions: 0
        };
    }

    trackPageView() {
        this.data.pageViews++;
        this.updateDisplay();
        console.log('Página vista registrada');
    }

    trackInteraction() {
        this.data.interactions++;
        this.updateDisplay();
    }

    updateDisplay() {
        const container = document.getElementById('analyticsContainer');
        if (container) {
            container.innerHTML = `
                <div class="analytics-stats">
                    <p>Vistas de página: ${this.data.pageViews}</p>
                    <p>Interacciones: ${this.data.interactions}</p>
                    <p>Tiempo en sitio: ${this.data.timeSpent}s</p>
                </div>
            `;
        }
    }

    startTimeTracking() {
        setInterval(() => {
            this.data.timeSpent++;
            this.updateDisplay();
        }, 1000);
    }
}
