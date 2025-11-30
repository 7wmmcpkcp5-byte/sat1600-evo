// router.js
export class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
    }

    init() {
        // Definir rutas
        this.routes = {
            dashboard: () => window.satApp.showDashboard(),
            practice: () => window.satApp.startQuiz(window.satApp.currentSubject),
            exam: () => window.satApp.startExam(),
            analytics: () => window.satApp.showAnalytics()
        };

        // Manejar clic en botones de navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const route = e.target.getAttribute('data-view');
                this.navigate(route);
            });
        });

        // Navegación inicial
        this.navigate('dashboard');
    }

    navigate(route) {
        if (this.routes[route]) {
            this.currentRoute = route;
            this.routes[route]();
        } else {
            console.error('Route not found:', route);
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}