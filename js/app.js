// ============================================
// MAIN APPLICATION INITIALIZER
// Inicializa y coordina todos los módulos
// ============================================

class SATOwlApp {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.currentView = 'dashboard';
        this.userPreferences = {};
        
        // Configuración de módulos
        this.moduleConfig = {
            'core': ['dataService', 'uiComponents', 'analyticsManager', 'premiumFeatures', 'parentDashboard'],
            'questions': ['questionRepository'],
            'gamification': ['xpSystem', 'achievements', 'currencySystem', 'streaks'],
            'utils': ['dateUtils', 'mathUtils'],
            'modules': ['practiceMode', 'fullExam']
        };
    }

    // ==================== PUBLIC METHODS ====================

    /**
     * Inicializa la aplicación completa
     */
    async initialize() {
        try {
            console.log('🦉 Inicializando SAT OWL PRO...');
            
            // 1. Cargar configuración
            await this.loadConfiguration();
            
            // 2. Inicializar módulos en orden
            await this.initializeModules();
            
            // 3. Configurar UI
            await this.setupUI();
            
            // 4. Cargar datos de usuario
            await this.loadUserData();
            
            // 5. Configurar event listeners globales
            this.setupGlobalEventListeners();
            
            // 6. Verificar estado de la aplicación
            await this.checkAppState();
            
            // 7. Marcar como inicializado
            this.isInitialized = true;
            
            // 8. Mostrar notificación de bienvenida
            this.showWelcomeMessage();
            
            console.log('✅ SAT OWL PRO inicializado exitosamente');
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            this.showErrorScreen(error);
        }
    }

    /**
     * Cambia la vista actual de la aplicación
     */
    async navigateTo(view, params = {}) {
        try {
            // Validar vista
            if (!this.isValidView(view)) {
                throw new Error(`Vista no válida: ${view}`);
            }
            
            // Guardar vista anterior
            const previousView = this.currentView;
            
            // Ejecutar limpieza de vista anterior
            await this.cleanupView(previousView);
            
            // Actualizar vista actual
            this.currentView = view;
            
            // Actualizar URL si es necesario
            this.updateURL(view, params);
            
            // Cargar nueva vista
            await this.loadView(view, params);
            
            // Actualizar navegación activa
            this.updateActiveNavigation(view);
            
            // Registrar evento de navegación
            this.modules.dataService?.recordEvent('navigation', {
                from: previousView,
                to: view,
                params: params
            });
            
            console.log(`📍 Navegando a: ${view}`);
            
        } catch (error) {
            console.error(`❌ Error al navegar a ${view}:`, error);
            this.uiComponents?.showNotification(`Error al cargar ${view}`, 'error');
        }
    }

    /**
     * Reinicia la aplicación (para desarrollo/testing)
     */
    async resetApp(options = {}) {
        const confirmed = await this.uiComponents?.showConfirmationModal(
            'Reiniciar Aplicación',
            options.clearData ? 
                '¿Estás seguro? Esto borrará todos tus datos locales.' :
                '¿Reiniciar la aplicación?',
            'warning'
        );
        
        if (!confirmed) return;
        
        try {
            // Limpiar datos si se solicita
            if (options.clearData) {
                localStorage.clear();
                console.log('🧹 Todos los datos locales eliminados');
            }
            
            // Recargar la aplicación
            location.reload();
            
        } catch (error) {
            console.error('❌ Error al reiniciar aplicación:', error);
        }
    }

    /**
     * Muestra/oculta el menú de navegación
     */
    toggleNavigation() {
        const nav = document.getElementById('main-navigation');
        if (nav) {
            nav.classList.toggle('active');
            
            // Animar icono de hamburguesa
            const hamburger = document.getElementById('hamburger-btn');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        }
    }

    /**
     * Actualiza el tema de la aplicación
     */
    updateTheme(theme) {
        const validThemes = ['dark', 'light', 'auto'];
        if (!validThemes.includes(theme)) return;
        
        // Guardar preferencia
        this.userPreferences.theme = theme;
        this.saveUserPreferences();
        
        // Aplicar tema
        document.documentElement.setAttribute('data-theme', theme);
        
        // Notificar a otros módulos
        this.emitEvent('theme-changed', { theme });
        
        console.log(`🎨 Tema cambiado a: ${theme}`);
    }

    /**
     * Muestra/oculta el reproductor de audio
     */
    toggleAudio(enabled) {
        this.userPreferences.audioEnabled = enabled;
        this.saveUserPreferences();
        
        // Notificar a módulos de audio
        this.emitEvent('audio-toggled', { enabled });
        
        // Mostrar notificación
        this.uiComponents?.showNotification(
            enabled ? 'Sonido activado' : 'Sonido desactivado',
            'info'
        );
    }

    // ==================== INITIALIZATION METHODS ====================

    /**
     * Carga la configuración de la aplicación
     */
    async loadConfiguration() {
        try {
            // Cargar configuración desde localStorage o valores por defecto
            const savedConfig = localStorage.getItem('satOwl_config');
            
            if (savedConfig) {
                this.config = JSON.parse(savedConfig);
                console.log('📋 Configuración cargada desde localStorage');
            } else {
                // Configuración por defecto
                this.config = {
                    version: '1.0.0',
                    lastUpdated: new Date().toISOString(),
                    features: {
                        practiceMode: true,
                        fullExam: true,
                        gamification: true,
                        analytics: true,
                        parentDashboard: true,
                        premium: false
                    },
                    settings: {
                        theme: 'dark',
                        audioEnabled: true,
                        animationsEnabled: true,
                        notificationsEnabled: true,
                        autoSave: true,
                        saveInterval: 30000 // 30 segundos
                    }
                };
                
                // Guardar configuración por defecto
                this.saveConfiguration();
                console.log('📋 Configuración por defecto creada');
            }
            
            // Aplicar configuración inicial
            this.applyConfiguration();
            
        } catch (error) {
            console.error('❌ Error al cargar configuración:', error);
            throw error;
        }
    }

    /**
     * Inicializa todos los módulos en orden
     */
    async initializeModules() {
        console.log('⚙️ Inicializando módulos...');
        
        // Orden de inicialización crítico
        const initializationOrder = [
            'utils',      // Utilidades primero
            'core',       // Núcleo después
            'questions',  // Base de datos
            'gamification', // Sistema gamificado
            'modules'     // Módulos funcionales al final
        ];
        
        for (const moduleGroup of initializationOrder) {
            await this.initializeModuleGroup(moduleGroup);
        }
        
        console.log('✅ Todos los módulos inicializados');
    }

    /**
     * Configura la interfaz de usuario
     */
    async setupUI() {
        try {
            console.log('🎨 Configurando interfaz de usuario...');
            
            // 1. Cargar plantillas si existen
            await this.loadTemplates();
            
            // 2. Configurar navegación principal
            this.setupMainNavigation();
            
            // 3. Configurar elementos de UI globales
            this.setupGlobalUIElements();
            
            // 4. Aplicar tema
            this.applyTheme();
            
            // 5. Configurar Service Worker si es PWA
            if ('serviceWorker' in navigator) {
                await this.setupServiceWorker();
            }
            
            // 6. Configurar eventos de teclado
            this.setupKeyboardShortcuts();
            
            console.log('✅ Interfaz configurada');
            
        } catch (error) {
            console.error('❌ Error al configurar UI:', error);
            throw error;
        }
    }

    /**
     * Carga datos del usuario
     */
    async loadUserData() {
        try {
            console.log('👤 Cargando datos del usuario...');
            
            // Verificar si hay datos guardados
            const userData = this.modules.dataService?.getUserData();
            
            if (userData && userData.user) {
                // Usuario existente
                console.log(`👋 Bienvenido de nuevo, ${userData.user.name}`);
                
                // Actualizar UI con datos del usuario
                this.updateUserUI(userData.user);
                
                // Verificar si hay sesión activa
                if (userData.activeExam) {
                    this.showResumeExamPrompt(userData.activeExam);
                }
                
            } else {
                // Nuevo usuario - mostrar onboarding
                console.log('👋 Nuevo usuario detectado');
                await this.showOnboarding();
            }
            
            // Cargar preferencias del usuario
            this.loadUserPreferences();
            
            console.log('✅ Datos del usuario cargados');
            
        } catch (error) {
            console.error('❌ Error al cargar datos de usuario:', error);
        }
    }

    // ==================== MODULE MANAGEMENT ====================

    /**
     * Inicializa un grupo de módulos
     */
    async initializeModuleGroup(groupName) {
        const modules = this.moduleConfig[groupName];
        if (!modules) return;
        
        console.log(`🔄 Inicializando grupo: ${groupName}`);
        
        for (const moduleName of modules) {
            try {
                // Verificar si el módulo está disponible en window
                if (window[moduleName]) {
                    this.modules[moduleName] = window[moduleName];
                    console.log(`   ✓ ${moduleName} cargado`);
                } else {
                    console.warn(`   ⚠️ ${moduleName} no encontrado en window`);
                }
            } catch (error) {
                console.error(`   ❌ Error al cargar ${moduleName}:`, error);
            }
        }
    }

    /**
     * Verifica el estado de todos los módulos
     */
    checkModulesStatus() {
        const status = {};
        let allOk = true;
        
        for (const [group, modules] of Object.entries(this.moduleConfig)) {
            status[group] = {};
            
            for (const moduleName of modules) {
                const isLoaded = !!this.modules[moduleName];
                status[group][moduleName] = isLoaded;
                
                if (!isLoaded) {
                    allOk = false;
                }
            }
        }
        
        return { status, allOk };
    }

    /**
     * Obtiene un módulo por nombre
     */
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    /**
     * Ejecuta una función en todos los módulos
     */
    broadcastToModules(methodName, ...args) {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module[methodName] === 'function') {
                try {
                    module[methodName](...args);
                } catch (error) {
                    console.error(`Error en ${module.constructor?.name}.${methodName}:`, error);
                }
            }
        });
    }

    // ==================== UI MANAGEMENT ====================

    /**
     * Configura la navegación principal
     */
    setupMainNavigation() {
        const navItems = [
            { id: 'dashboard', icon: '📊', label: 'Dashboard', view: 'dashboard' },
            { id: 'practice', icon: '🎯', label: 'Práctica', view: 'practice' },
            { id: 'exams', icon: '📝', label: 'Exámenes', view: 'exams' },
            { id: 'analytics', icon: '📈', label: 'Analytics', view: 'analytics' },
            { id: 'achievements', icon: '🏆', label: 'Logros', view: 'achievements' },
            { id: 'parent-dash', icon: '👨‍👦', label: 'Panel Padres', view: 'parent-dashboard' },
            { id: 'premium', icon: '⭐', label: 'Premium', view: 'premium' },
            { id: 'settings', icon: '⚙️', label: 'Configuración', view: 'settings' }
        ];
        
        const navContainer = document.getElementById('main-navigation');
        if (!navContainer) return;
        
        let navHTML = '<nav class="main-nav"><ul>';
        
        navItems.forEach(item => {
            navHTML += `
                <li>
                    <a href="#" class="nav-item ${item.id === 'dashboard' ? 'active' : ''}" 
                       data-view="${item.view}" onclick="satOwlApp.navigateTo('${item.view}')">
                        <span class="nav-icon">${item.icon}</span>
                        <span class="nav-label">${item.label}</span>
                    </a>
                </li>
            `;
        });
        
        navHTML += '</ul></nav>';
        navContainer.innerHTML = navHTML;
    }

    /**
     * Configura elementos de UI globales
     */
    setupGlobalUIElements() {
        // Header con información de usuario
        this.setupUserHeader();
        
        // Footer con información de la app
        this.setupAppFooter();
        
        // Notificaciones toast
        this.setupNotifications();
        
        // Modales
        this.setupModals();
        
        // Loaders y skeletons
        this.setupLoaders();
    }

    /**
     * Configura el header con info de usuario
     */
    setupUserHeader() {
        const header = document.getElementById('app-header');
        if (!header) return;
        
        header.innerHTML = `
            <div class="header-left">
                <button id="hamburger-btn" class="hamburger" onclick="satOwlApp.toggleNavigation()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="app-brand">
                    <h1>🦉 SAT OWL PRO</h1>
                    <span class="app-version">v${this.config.version}</span>
                </div>
            </div>
            <div class="header-center" id="header-title">
                <h2>Dashboard</h2>
            </div>
            <div class="header-right">
                <div class="user-info" id="user-info">
                    <div class="user-avatar">
                        <span>🦉</span>
                    </div>
                    <div class="user-details">
                        <span class="user-name">Cargando...</span>
                        <span class="user-level">Nivel 1</span>
                    </div>
                </div>
                <div class="quick-actions">
                    <button class="icon-btn" title="Notificaciones" id="notifications-btn">
                        🔔
                        <span class="badge" id="notification-badge">0</span>
                    </button>
                    <button class="icon-btn" title="Audio" id="audio-toggle-btn">
                        🔊
                    </button>
                    <button class="icon-btn" title="Ayuda" id="help-btn">
                        ❓
                    </button>
                </div>
            </div>
        `;
        
        // Configurar event listeners para botones
        document.getElementById('notifications-btn')?.addEventListener('click', () => {
            this.showNotificationsPanel();
        });
        
        document.getElementById('audio-toggle-btn')?.addEventListener('click', () => {
            const current = this.userPreferences.audioEnabled !== false;
            this.toggleAudio(!current);
        });
        
        document.getElementById('help-btn')?.addEventListener('click', () => {
            this.showHelpModal();
        });
    }

    /**
     * Actualiza la UI con datos del usuario
     */
    updateUserUI(userData) {
        const userInfo = document.getElementById('user-info');
        if (!userInfo || !userData) return;
        
        userInfo.innerHTML = `
            <div class="user-avatar" style="background: ${userData.avatarColor || '#4a6fa5'}">
                <span>${userData.avatarEmoji || '🦉'}</span>
            </div>
            <div class="user-details">
                <span class="user-name">${userData.name || 'Estudiante'}</span>
                <span class="user-level">Nivel ${userData.level || 1}</span>
            </div>
        `;
        
        // Actualizar título del header basado en vista actual
        const headerTitle = document.getElementById('header-title');
        if (headerTitle) {
            const viewTitles = {
                'dashboard': 'Dashboard',
                'practice': 'Modo Práctica',
                'exams': 'Exámenes',
                'analytics': 'Analytics',
                'achievements': 'Logros',
                'parent-dashboard': 'Panel para Padres',
                'premium': 'SAT OWL Premium',
                'settings': 'Configuración'
            };
            
            headerTitle.innerHTML = `<h2>${viewTitles[this.currentView] || 'SAT OWL PRO'}</h2>`;
        }
    }

    // ==================== VIEW MANAGEMENT ====================

    /**
     * Carga una vista específica
     */
    async loadView(view, params = {}) {
        const contentArea = document.getElementById('app-content');
        if (!contentArea) return;
        
        // Mostrar loader
        contentArea.innerHTML = '<div class="loader"></div>';
        
        try {
            let viewHTML = '';
            
            switch (view) {
                case 'dashboard':
                    viewHTML = await this.loadDashboardView(params);
                    break;
                    
                case 'practice':
                    viewHTML = await this.loadPracticeView(params);
                    break;
                    
                case 'exams':
                    viewHTML = await this.loadExamsView(params);
                    break;
                    
                case 'analytics':
                    viewHTML = await this.loadAnalyticsView(params);
                    break;
                    
                case 'achievements':
                    viewHTML = await this.loadAchievementsView(params);
                    break;
                    
                case 'parent-dashboard':
                    viewHTML = await this.loadParentDashboardView(params);
                    break;
                    
                case 'premium':
                    viewHTML = await this.loadPremiumView(params);
                    break;
                    
                case 'settings':
                    viewHTML = await this.loadSettingsView(params);
                    break;
                    
                default:
                    viewHTML = '<div class="error-view"><h2>Vista no encontrada</h2></div>';
            }
            
            // Aplicar la vista
            contentArea.innerHTML = viewHTML;
            
            // Inicializar componentes específicos de la vista
            await this.initializeViewComponents(view, params);
            
            // Animar transición
            contentArea.classList.add('view-enter');
            setTimeout(() => {
                contentArea.classList.remove('view-enter');
            }, 300);
            
        } catch (error) {
            console.error(`❌ Error al cargar vista ${view}:`, error);
            contentArea.innerHTML = `
                <div class="error-view">
                    <h2>Error al cargar la vista</h2>
                    <p>${error.message}</p>
                    <button onclick="satOwlApp.navigateTo('dashboard')">Volver al Dashboard</button>
                </div>
            `;
        }
    }

    /**
     * Carga la vista del dashboard
     */
    async loadDashboardView(params) {
        const userData = this.modules.dataService?.getUserData();
        const xpSystem = this.modules.xpSystem;
        const achievements = this.modules.achievements;
        
        if (!userData || !xpSystem || !achievements) {
            return '<div class="loading">Cargando dashboard...</div>';
        }
        
        const user = userData.user;
        const progress = xpSystem.getProgress();
        const recentAchievements = achievements.getRecentAchievements(3);
        
        return `
            <div class="dashboard-view">
                <div class="dashboard-header">
                    <h1>Bienvenido, ${user.name}</h1>
                    <p>Tu preparación SAT está ${progress.level < 3 ? 'empezando' : 'en progreso'}.</p>
                </div>
                
                <div class="dashboard-grid">
                    <!-- Stats Cards -->
                    <div class="stats-grid">
                        <div class="stat-card level-card">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-info">
                                <h3>Nivel ${progress.level}</h3>
                                <p>${progress.xp} / ${progress.xpToNextLevel} XP</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(progress.xp / progress.xpToNextLevel) * 100}%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="stat-card accuracy-card">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-info">
                                <h3>${userData.stats?.accuracy || 0}%</h3>
                                <p>Precisión</p>
                            </div>
                        </div>
                        
                        <div class="stat-card streak-card">
                            <div class="stat-icon">🔥</div>
                            <div class="stat-info">
                                <h3>${userData.stats?.streak || 0} días</h3>
                                <p>Racha actual</p>
                            </div>
                        </div>
                        
                        <div class="stat-card coins-card">
                            <div class="stat-icon">🪙</div>
                            <div class="stat-info">
                                <h3>${userData.currency?.coins || 0}</h3>
                                <p>Monedas</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="quick-actions-section">
                        <h3>Acciones Rápidas</h3>
                        <div class="action-buttons">
                            <button class="action-btn primary" onclick="satOwlApp.navigateTo('practice')">
                                <span class="action-icon">🎯</span>
                                <span>Modo Práctica</span>
                            </button>
                            <button class="action-btn secondary" onclick="fullExam.startNewExam()">
                                <span class="action-icon">📝</span>
                                <span>Examen Completo</span>
                            </button>
                            <button class="action-btn tertiary" onclick="satOwlApp.navigateTo('analytics')">
                                <span class="action-icon">📈</span>
                                <span>Ver Analytics</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Recent Achievements -->
                    ${recentAchievements.length > 0 ? `
                    <div class="achievements-section">
                        <h3>Logros Recientes</h3>
                        <div class="achievements-grid">
                            ${recentAchievements.map(achievement => `
                                <div class="achievement-card">
                                    <div class="achievement-icon">${achievement.icon || '🏆'}</div>
                                    <div class="achievement-info">
                                        <h4>${achievement.name}</h4>
                                        <p>${achievement.description}</p>
                                        <small>${this.modules.dateUtils?.formatDate(achievement.unlockedAt, 'short') || ''}</small>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Study Recommendations -->
                    <div class="recommendations-section">
                        <h3>Recomendaciones de Estudio</h3>
                        <div class="recommendations-list">
                            ${this.generateStudyRecommendations(userData).map(rec => `
                                <div class="recommendation-item">
                                    <span class="rec-icon">${rec.icon}</span>
                                    <div class="rec-content">
                                        <h4>${rec.title}</h4>
                                        <p>${rec.description}</p>
                                        ${rec.action ? `<button class="rec-action" onclick="${rec.action}">${rec.actionText}</button>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Limpia una vista antes de cambiar
     */
    async cleanupView(view) {
        // Detener timers o procesos activos
        switch (view) {
            case 'practice':
                this.modules.practiceMode?.endSession();
                break;
                
            case 'exams':
                this.modules.fullExam?.pauseExam();
                break;
        }
        
        // Limpiar event listeners específicos de la vista
        this.removeViewEventListeners(view);
        
        // Notificar a módulos sobre cambio de vista
        this.broadcastToModules('onViewLeave', view);
    }

    // ==================== EVENT HANDLING ====================

    /**
     * Configura event listeners globales
     */
    setupGlobalEventListeners() {
        // Event listeners del DOM
        window.addEventListener('online', this.handleOnlineStatus.bind(this));
        window.addEventListener('offline', this.handleOfflineStatus.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Event listeners de la aplicación
        document.addEventListener('satowl-event', this.handleAppEvent.bind(this));
        
        // Configurar auto-save si está habilitado
        if (this.config.settings.autoSave) {
            this.setupAutoSave();
        }
    }

    /**
     * Maneja eventos personalizados de la aplicación
     */
    handleAppEvent(event) {
        const { type, detail } = event;
        
        switch (type) {
            case 'user-updated':
                this.updateUserUI(detail.user);
                break;
                
            case 'level-up':
                this.showLevelUpNotification(detail);
                break;
                
            case 'achievement-unlocked':
                this.showAchievementNotification(detail);
                break;
                
            case 'session-completed':
                this.handleSessionCompleted(detail);
                break;
                
            case 'premium-unlocked':
                this.handlePremiumUnlocked(detail);
                break;
        }
    }

    /**
     * Maneja cuando el usuario se conecta/desconecta
     */
    handleOnlineStatus() {
        this.uiComponents?.showNotification('Conectado a internet', 'success');
        this.broadcastToModules('onOnline');
    }

    handleOfflineStatus() {
        this.uiComponents?.showNotification('Modo offline activado', 'warning');
        this.broadcastToModules('onOffline');
    }

    /**
     * Maneja antes de cerrar la página
     */
    handleBeforeUnload(event) {
        // Guardar estado actual
        if (this.modules.dataService) {
            this.modules.dataService.saveAllData();
        }
        
        // Si hay examen en progreso, advertir
        if (this.modules.fullExam?.isExamActive) {
            event.preventDefault();
            event.returnValue = 'Tienes un examen en progreso. ¿Seguro que quieres salir?';
            return event.returnValue;
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Verifica el estado de la aplicación
     */
    async checkAppState() {
        // Verificar compatibilidad del navegador
        if (!this.checkBrowserCompatibility()) {
            this.showCompatibilityWarning();
        }
    
        // Verificar almacenamiento disponible
        if (!this.checkStorageAvailable()) {
            this.showStorageWarning();
        }
    
        // Verificar actualizaciones
        await this.checkForUpdates();
    
        // Verificar primer uso del día
        this.checkDailyFirstUse();
    }

    /**
     * Genera recomendaciones de estudio personalizadas
     */
    generateStudyRecommendations(userData) {
        const recommendations = [];
        
        // Recomendaciones basadas en estadísticas
        const stats = userData.stats || {};
        
        if (stats.accuracy < 60) {
            recommendations.push({
                icon: '🎯',
                title: 'Mejora tu precisión',
                description: 'Tu precisión actual es baja. Enfócate en entender las explicaciones.',
                action: 'satOwlApp.navigateTo(\'practice\', {mode: \'adaptive\'})',
                actionText: 'Practicar ahora'
            });
        }
        
        if (!stats.lastPractice || this.modules.dateUtils?.isYesterday(stats.lastPractice)) {
            recommendations.push({
                icon: '🔥',
                title: 'Mantén tu racha',
                description: 'Practica hoy para mantener tu racha de estudio.',
                action: 'satOwlApp.navigateTo(\'practice\')',
                actionText: 'Comenzar sesión'
            });
        }
        
        if (userData.level < 3) {
            recommendations.push({
                icon: '⭐',
                title: 'Sube de nivel',
                description: 'Completa más preguntas para desbloquear nuevas características.',
                action: 'satOwlApp.navigateTo(\'practice\')',
                actionText: 'Ganar XP'
            });
        }
        
        // Si no hay suficientes recomendaciones, agregar genéricas
        if (recommendations.length < 2) {
            recommendations.push({
                icon: '📝',
                title: 'Simula un examen real',
                description: 'Prueba un examen completo para medir tu progreso real.',
                action: 'fullExam.startNewExam()',
                actionText: 'Comenzar examen'
            });
        }
        
        return recommendations.slice(0, 3); // Máximo 3 recomendaciones
    }

    /**
     * Muestra mensaje de bienvenida
     */
    showWelcomeMessage() {
        const userData = this.modules.dataService?.getUserData();
        
        if (userData?.user?.isNewUser) {
            this.uiComponents?.showNotification(
                `¡Bienvenido a SAT OWL PRO, ${userData.user.name}!`,
                'success',
                5000
            );
            
            // Marcar como no nuevo
            this.modules.dataService.updateUserData({
                user: { ...userData.user, isNewUser: false }
            });
        }
    }

    /**
     * Muestra prompt para reanudar examen
     */
    showResumeExamPrompt(examData) {
        const modal = this.uiComponents?.createConfirmationModal(
            'Examen en Pausa',
            'Tienes un examen SAT en progreso. ¿Quieres reanudarlo?',
            'warning',
            [
                { text: 'Reanudar', action: () => this.modules.fullExam?.resumeExam(examData), primary: true },
                { text: 'Descartar', action: () => this.modules.dataService?.updateUserData({ activeExam: null }) }
            ]
        );
        
        document.body.appendChild(modal);
    }

    // ==================== ERROR HANDLING ====================

    /**
     * Muestra pantalla de error
     */
    showErrorScreen(error) {
        const appContainer = document.getElementById('app-container');
        if (!appContainer) return;
        
        appContainer.innerHTML = `
            <div class="error-screen">
                <div class="error-content">
                    <h1>🦉 ¡Ups!</h1>
                    <h2>Algo salió mal</h2>
                    <p>SAT OWL PRO encontró un error durante la inicialización.</p>
                    <div class="error-details">
                        <code>${error.message || 'Error desconocido'}</code>
                    </div>
                    <div class="error-actions">
                        <button onclick="location.reload()" class="btn-primary">
                            🔄 Recargar Aplicación
                        </button>
                        <button onclick="satOwlApp.resetApp({clearData: false})" class="btn-secondary">
                            ⚙️ Reiniciar
                        </button>
                        <button onclick="satOwlApp.showErrorReport()" class="btn-tertiary">
                            📧 Reportar Error
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Muestra formulario para reportar error
     */
    showErrorReport() {
        // Implementar reporte de errores
        console.log('Mostrando formulario de reporte de errores...');
    }

    // ==================== HELPER METHODS ====================

    /**
     * Verifica si una vista es válida
     */
    isValidView(view) {
        const validViews = [
            'dashboard', 'practice', 'exams', 'analytics', 
            'achievements', 'parent-dashboard', 'premium', 'settings'
        ];
        return validViews.includes(view);
    }

    /**
     * Actualiza navegación activa
     */
    updateActiveNavigation(view) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === view) {
                item.classList.add('active');
            }
        });
    }

    /**
     * Actualiza URL sin recargar la página
     */
    updateURL(view, params) {
        if (window.history && window.history.pushState) {
            const url = new URL(window.location);
            url.searchParams.set('view', view);
            
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            });
            
            window.history.pushState({ view, params }, '', url);
        }
    }

    /**
     * Emite un evento personalizado
     */
    emitEvent(eventName, detail = {}) {
        const event = new CustomEvent(`satowl-${eventName}`, { detail });
        document.dispatchEvent(event);
    }

    /**
     * Configura auto-save
     */
    setupAutoSave() {
        setInterval(() => {
            if (this.modules.dataService) {
                this.modules.dataService.saveAllData();
                console.log('💾 Auto-save completado');
            }
        }, this.config.settings.saveInterval);
    }

    // Nota: Los métodos load[View]View y otros helpers específicos
    // se implementarían de manera similar a loadDashboardView
}

// Inicializar y exportar aplicación
window.satOwlApp = new SATOwlApp();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.satOwlApp.initialize();
});

console.log('✅ SAT OWL Application inicializador cargado');