// parent-dashboard.js
import { AnalyticsManager } from "./analytics.js";
import { EvolutionSystem } from "./gamification.js";

export function renderParentDashboard(container) {
  const analytics = new AnalyticsManager();
  const owl = new EvolutionSystem();
  const stats = analytics.stats;
  const level = owl.level;

  container.innerHTML = "";

  const summary = document.createElement("div");
  summary.className = "parent-card";
  summary.innerHTML = `
    <div class="parent-card-header">
      <h3>📊 Student Progress Summary</h3>
      <span class="premium-badge">PARENT VIEW</span>
    </div>
    <div class="parent-card-content">
      <div class="progress-item">
        <span class="label">Overall Performance:</span>
        <span class="value">${stats.correctQuestions}/${stats.totalQuestions} correct (${stats.totalQuestions ? Math.round(stats.correctQuestions / stats.totalQuestions * 100) : 0}%)</span>
      </div>
      <div class="progress-item">
        <span class="label">Current Level:</span>
        <span class="value"><strong>${owl.getLevelName()}</strong> (Level ${level})</span>
      </div>
      <div class="progress-item">
        <span class="label">Total XP:</span>
        <span class="value">${owl.xp} points</span>
      </div>
      <div class="progress-item">
        <span class="label">Study Streak:</span>
        <span class="value">${stats.streak} days</span>
      </div>
    </div>
  `;
  container.appendChild(summary);

  const sectionCard = document.createElement("div");
  sectionCard.className = "parent-card";
  const reading = stats.bySection.reading;
  const writing = stats.bySection.writing;
  const math = stats.bySection.math;

  const rAcc = reading.total ? Math.round(reading.correct / reading.total * 100) : 0;
  const wAcc = writing.total ? Math.round(writing.correct / writing.total * 100) : 0;
  const mAcc = math.total ? Math.round(math.correct / math.total * 100) : 0;

  sectionCard.innerHTML = `
    <div class="parent-card-header">
      <h3>📈 Section Performance</h3>
    </div>
    <div class="parent-card-content">
      <div class="section-performance">
        <div class="section-item math">
          <span class="section-name">Math</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${mAcc}%"></div>
          </div>
          <span class="section-accuracy">${mAcc}%</span>
        </div>
        <div class="section-item reading">
          <span class="section-name">Reading</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${rAcc}%"></div>
          </div>
          <span class="section-accuracy">${rAcc}%</span>
        </div>
        <div class="section-item writing">
          <span class="section-name">Writing</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${wAcc}%"></div>
          </div>
          <span class="section-accuracy">${wAcc}%</span>
        </div>
      </div>
    </div>
  `;
  container.appendChild(sectionCard);

  const weakAreasCard = document.createElement("div");
  weakAreasCard.className = "parent-card";
  const weakAreas = analytics.getWeakAreas();
  
  let weakAreasHTML = '';
  if (weakAreas.length > 0) {
    weakAreasHTML = weakAreas.map(area => `
      <div class="weak-area">
        <span class="area-name">${area.section.toUpperCase()}</span>
        <span class="area-accuracy">${area.accuracy}% accuracy</span>
        <span class="area-count">(${area.totalQuestions} questions)</span>
      </div>
    `).join('');
  } else {
    weakAreasHTML = '<div class="no-weak-areas">🎉 No major weak areas detected!</div>';
  }

  weakAreasCard.innerHTML = `
    <div class="parent-card-header">
      <h3>🎯 Focus Areas</h3>
    </div>
    <div class="parent-card-content">
      ${weakAreasHTML}
    </div>
  `;
  container.appendChild(weakAreasCard);

  const recommendationsCard = document.createElement("div");
  recommendationsCard.className = "parent-card";
  recommendationsCard.innerHTML = `
    <div class="parent-card-header">
      <h3>💡 Study Recommendations</h3>
    </div>
    <div class="parent-card-content">
      <div class="recommendation-item">📚 Encourage short, daily study sessions to maintain the streak</div>
      <div class="recommendation-item">🎯 Focus practice on identified weak areas</div>
      <div class="recommendation-item">⏱️ Aim for consistent 20-30 minute study periods</div>
      <div class="recommendation-item">🏆 Celebrate level-ups to maintain motivation</div>
    </div>
  `;
  container.appendChild(recommendationsCard);
}

export class ParentDashboard {
  constructor() {
    this.analytics = new AnalyticsManager();
    this.evolutionSystem = new EvolutionSystem();
  }

  getProgressReport() {
    const stats = this.analytics.stats;
    const weakAreas = this.analytics.getWeakAreas();
    
    return {
      overallAccuracy: stats.totalQuestions ? Math.round((stats.correctQuestions / stats.totalQuestions) * 100) : 0,
      timeSpent: stats.timeSpent,
      streak: stats.streak,
      level: this.evolutionSystem.level,
      levelName: this.evolutionSystem.getLevelName(),
      weakAreas,
      studyRecommendation: this.analytics.getStudyRecommendations()
    };
  }
}