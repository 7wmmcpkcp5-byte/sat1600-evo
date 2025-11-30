export class PremiumFeatures {
    constructor() {
        this.features = {
            unlimitedPractice: true,
            detailedAnalytics: true,
            parentDashboard: true,
            examMode: true,
            gamification: true
        };
    }

    isUnlocked(feature) {
        return this.features[feature] === true;
    }

    unlockFeature(feature) {
        this.features[feature] = true;
        return true;
    }

    getAvailableFeatures() {
        return Object.keys(this.features).filter(feature => this.features[feature]);
    }
}
