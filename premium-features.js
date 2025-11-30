// premium-features.js como módulo ES6
export const PremiumManager = {
    isPremium: true, // dejamos true por ahora para que tu hijo tenga todo desbloqueado

    checkAccess: function(featureName) {
        if (this.isPremium) return true;

        const freeFeatures = ['practice_mode', 'daily_challenge', 'basic_analytics'];

        if (freeFeatures.includes(featureName)) {
            return true;
        } else {
            this.showPaywall(featureName);
            return false;
        }
    },

    showPaywall: function(featureName) {
        alert(`🔒 PREMIUM FEATURE LOCKED\n\nThe feature "${featureName}" is only available for Evo 7 Pro users.\nUpgrade now to unlock unlimited tests and AI explanations.`);
    },

    unlock: function() {
        this.isPremium = true;
        alert("🌟 Welcome to Premium! All features unlocked.");
    }
};