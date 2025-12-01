// premium-features.js - Gestión de características premium
import { CONFIG } from './config.js';

export class PremiumManager {
    constructor() {
        this.isPremium = true; // Por defecto true para que tu hijo tenga todo desbloqueado
        this.features = this.initializeFeatures();
        this.loadPremiumStatus();
    }

    initializeFeatures() {
        return {
            // Características gratuitas
            free: [
                'practice_mode',
                'daily_challenge', 
                'basic_analytics',
                'level_progression',
                'core_questions'
            ],
            
            // Características premium
            premium: [
                'unlimited_practice',
                'ai_explanations',
                'advanced_analytics',
                'personalized_learning',
                'priority_support',
                'offline_mode',
                'custom_study_plans',
                'detailed_performance_reports'
            ]
        };
    }

    loadPremiumStatus() {
        try {
            const saved = localStorage.getItem('sat_owl_premium_status');
            if (saved) {
                const status = JSON.parse(saved);
                this.isPremium = status.isPremium || true;
            }
        } catch (error) {
            console.error('Error loading premium status:', error);
        }
    }

    savePremiumStatus() {
        try {
            localStorage.setItem('sat_owl_premium_status', JSON.stringify({
                isPremium: this.isPremium,
                unlockedAt: new Date().toISOString()
            }));
        } catch (error) {
            console.error('Error saving premium status:', error);
        }
    }

    checkAccess(featureName) {
        // Si es premium, acceso completo
        if (this.isPremium) return true;

        // Verificar características gratuitas
        if (this.features.free.includes(featureName)) {
            return true;
        }

        // Característica premium bloqueada
        this.showPaywall(featureName);
        return false;
    }

    showPaywall(featureName) {
        const featureDisplayNames = {
            'unlimited_practice': 'Unlimited Practice Mode',
            'ai_explanations': 'AI-Powered Explanations',
            'advanced_analytics': 'Advanced Analytics Dashboard',
            'personalized_learning': 'Personalized Learning Paths',
            'priority_support': 'Priority Support',
            'offline_mode': 'Offline Mode',
            'custom_study_plans': 'Custom Study Plans',
            'detailed_performance_reports': 'Detailed Performance Reports'
        };

        const featureNameDisplay = featureDisplayNames[featureName] || featureName;

        // Crear modal de paywall profesional
        this.createPaywallModal(featureNameDisplay);
    }

    createPaywallModal(featureName) {
        const modal = document.createElement('div');
        modal.className = 'premium-modal-overlay';
        modal.innerHTML = `
            <div class="premium-modal">
                <div class="premium-header">
                    <span class="premium-icon">🔒</span>
                    <h3>PREMIUM FEATURE LOCKED</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="premium-content">
                    <div class="feature-highlight">
                        <span class="feature-name">"${featureName}"</span>
                        <p>This advanced feature is exclusively available for <strong>SAT OWL PRO</strong> members.</p>
                    </div>
                    
                    <div class="premium-benefits">
                        <h4>🎯 What You Get with PRO:</h4>
                        <ul>
                            <li>✓ Unlimited practice questions</li>
                            <li>✓ AI-powered detailed explanations</li>
                            <li>✓ Advanced analytics & progress tracking</li>
                            <li>✓ Personalized study plans</li>
                            <li>✓ Offline mode access</li>
                            <li>✓ Priority support</li>
                        </ul>
                    </div>

                    <div class="upgrade-options">
                        <div class="upgrade-card featured">
                            <div class="plan-badge">MOST POPULAR</div>
                            <h4>PRO Monthly</h4>
                            <div class="price">$9.99<span class="period">/month</span></div>
                            <ul>
                                <li>All premium features</li>
                                <li>Cancel anytime</li>
                                <li>7-day free trial</li>
                            </ul>
                            <button class="upgrade-btn primary">Start Free Trial</button>
                        </div>
                        
                        <div class="upgrade-card">
                            <h4>PRO Annual</h4>
                            <div class="price">$79.99<span class="period">/year</span></div>
                            <div class="savings">Save 33%</div>
                            <ul>
                                <li>All premium features</li>
                                <li>Best value</li>
                                <li>Billed annually</li>
                            </ul>
                            <button class="upgrade-btn secondary">Choose Annual</button>
                        </div>
                    </div>

                    <div class="premium-guarantee">
                        <p>🔒 100% Secure Payment • 👍 30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Simular proceso de upgrade
        modal.querySelectorAll('.upgrade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.simulateUpgradeProcess(modal);
            });
        });
    }

    simulateUpgradeProcess(modal) {
        const content = modal.querySelector('.premium-content');
        content.innerHTML = `
            <div class="upgrade-process">
                <div class="loading-spinner"></div>
                <h3>Setting Up Your PRO Access...</h3>
                <p>Preparing your premium learning experience</p>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        `;

        // Simular proceso de carga
        setTimeout(() => {
            this.unlock();
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 1500);
        }, 2000);
    }

    unlock() {
        this.isPremium = true;
        this.savePremiumStatus();
        
        // Mostrar notificación de éxito
        this.showUnlockNotification();
        
        // Disparar evento personalizado para que otros módulos se actualicen
        window.dispatchEvent(new CustomEvent('premiumUnlocked'));
        
        console.log('🌟 Premium features unlocked!');
    }

    showUnlockNotification() {
        const notification = document.createElement('div');
        notification.className = 'premium-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🎉</span>
                <div class="notification-text">
                    <strong>Welcome to SAT OWL PRO!</strong>
                    <p>All premium features are now unlocked.</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }

    // Verificar acceso a múltiples características
    checkMultipleAccess(featureNames) {
        return featureNames.every(feature => this.checkAccess(feature));
    }

    // Obtener estado de características
    getFeatureStatus() {
        return {
            isPremium: this.isPremium,
            unlockedFeatures: this.isPremium ? 
                [...this.features.free, ...this.features.premium] : 
                this.features.free,
            lockedFeatures: this.isPremium ? [] : this.features.premium
        };
    }

    // Verificar si una característica específica está disponible
    isFeatureAvailable(featureName) {
        if (this.isPremium) return true;
        return this.features.free.includes(featureName);
    }

    // Simular downgrade (para testing)
    downgrade() {
        this.isPremium = false;
        this.savePremiumStatus();
        console.log('🔒 Premium features locked (downgraded)');
        
        // Disparar evento de downgrade
        window.dispatchEvent(new CustomEvent('premiumDowngraded'));
    }

    // Obtener lista de características premium
    getPremiumFeatures() {
        return this.features.premium;
    }

    // Obtener lista de características gratuitas
    getFreeFeatures() {
        return this.features.free;
    }
}

// premium-features.js - VERSIÓN COMPLETA Y CORREGIDA
import { CONFIG } from './config.js';

export class PremiumManager {
    constructor() {
        this.isPremium = true;
        this.features = this.initializeFeatures();
        this.loadPremiumStatus();
    }

    initializeFeatures() {
        return {
            free: [
                'practice_mode', 'daily_challenge', 'basic_analytics', 
                'level_progression', 'core_questions'
            ],
            premium: [
                'unlimited_practice', 'ai_explanations', 'advanced_analytics',
                'personalized_learning', 'priority_support', 'offline_mode',
                'custom_study_plans', 'detailed_performance_reports'
            ]
        };
    }

    loadPremiumStatus() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKeys.premium);
            if (saved) {
                const status = JSON.parse(saved);
                this.isPremium = status.isPremium || true;
            }
        } catch (error) {
            console.error('Error loading premium status:', error);
        }
    }

    savePremiumStatus() {
        try {
            localStorage.setItem(CONFIG.storageKeys.premium, JSON.stringify({
                isPremium: this.isPremium,
                unlockedAt: new Date().toISOString()
            }));
        } catch (error) {
            console.error('Error saving premium status:', error);
        }
    }

    checkAccess(featureName) {
        if (this.isPremium) return true;
        if (this.features.free.includes(featureName)) return true;
        
        this.showPaywall(featureName);
        return false;
    }

    showPaywall(featureName) {
        const featureDisplayNames = {
            'unlimited_practice': 'Unlimited Practice Mode',
            'ai_explanations': 'AI-Powered Explanations',
            'advanced_analytics': 'Advanced Analytics Dashboard',
            'personalized_learning': 'Personalized Learning Paths'
        };

        const featureNameDisplay = featureDisplayNames[featureName] || featureName;
        this.createPaywallModal(featureNameDisplay);
    }

    createPaywallModal(featureName) {
        const modal = document.createElement('div');
        modal.className = 'premium-modal-overlay';
        modal.innerHTML = `
            <div class="premium-modal">
                <div class="premium-header">
                    <span class="premium-icon">🔒</span>
                    <h3>PREMIUM FEATURE</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="premium-content">
                    <div class="feature-highlight">
                        <span class="feature-name">"${featureName}"</span>
                        <p>Premium feature - Unlock with SAT OWL PRO</p>
                    </div>
                    <div class="premium-actions">
                        <button class="upgrade-btn primary">Unlock Premium</button>
                        <button class="upgrade-btn secondary">Learn More</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.upgrade-btn.primary').addEventListener('click', () => {
            this.unlock();
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    unlock() {
        this.isPremium = true;
        this.savePremiumStatus();
        this.showUnlockNotification();
        window.dispatchEvent(new CustomEvent('premiumUnlocked'));
    }

    showUnlockNotification() {
        const notification = document.createElement('div');
        notification.className = 'premium-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🎉</span>
                <div class="notification-text">
                    <strong>Premium Unlocked!</strong>
                    <p>All features are now available.</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }

    // ✅ MÉTODOS ADICIONALES PARA COMPATIBILIDAD
    getFeatureStatus() {
        return {
            isPremium: this.isPremium,
            unlockedFeatures: this.isPremium ? 
                [...this.features.free, ...this.features.premium] : 
                this.features.free
        };
    }

    isFeatureAvailable(featureName) {
        return this.isPremium || this.features.free.includes(featureName);
    }
}