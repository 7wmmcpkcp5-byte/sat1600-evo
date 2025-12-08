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