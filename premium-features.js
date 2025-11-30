const LS_KEY = "sat_pro_master_evo_premium";

export class PremiumFeatures {
  constructor() {
    this.features = {
      aiTutor: false,
      fullAnalytics: true,
      parentDeepDive: true,
      avatarEvolution: true
    };
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      this.features = { ...this.features, ...data };
    } catch (e) {
      console.warn("Unable to load premium features", e);
    }
  }

  save() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.features));
  }

  isUnlocked(name) {
    return !!this.features[name];
  }

  unlockFeature(name) {
    this.features[name] = true;
    this.save();
  }

  getAvailableFeatures() {
    return { ...this.features };
  }
}
