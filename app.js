// SATOwlApp - Clase Principal Mejorada
class SATOwlApp {
    constructor() {
        this.currentView = 'home';
        this.state = {
            user: this.loadUserState(),
            exam: null,
            practice: null,
            analytics: this.loadAnalytics()
        };
        
        this.modules = {
            router: new Router(),
            exam: new ExamEngine(),
            analytics: new AnalyticsCore(),
            gamification: new OwlEvolution(),
            storage: new StorageManager()
        };
        
        this.init();
    }

    init() {
        this.setupErrorHandling();
        this.initializeModules();
        this.setupNavigation();
        this.registerServiceWorker();
        this.setupPerformanceMonitoring();
        
        // Precarga estratégica
        this.preloadCriticalAssets();
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            this.modules.storage.logError(e.error);
            console.error('SAT Owl Error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            this.modules.storage.logError(e.reason);
            console.error('Unhandled Promise:', e.reason);
        });
    }

    setupPerformanceMonitoring() {
        // Monitoring de métricas vitales
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'paint') {
                        this.modules.analytics.trackPerformance(entry.name, entry.startTime);
                    }
                }
            });
            observer.observe({entryTypes: ['paint', 'measure']});
        }
    }
}
