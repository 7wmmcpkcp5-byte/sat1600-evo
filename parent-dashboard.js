import { AnalyticsManager } from "./analytics.js";
import { OwlEvolutionPro } from "./gamification.js";

export function renderParentDashboard(container) {
  const analytics = new AnalyticsManager();
  const owl = new OwlEvolutionPro();
  const stats = analytics.stats;
  const level = owl.getLevel();

  container.innerHTML = "";

  const summary = document.createElement("div");
  summary.className = "stat-card";
  summary.innerHTML = `
    <div class="stat-label">Overall Summary</div>
    <div class="stat-value">${stats.correctQuestions}/${stats.totalQuestions} correct (${stats.totalQuestions ? Math.round(stats.correctQuestions / stats.totalQuestions * 100) : 0}%)</div>
    <div style="margin-top:0.4rem;font-size:0.75rem;">Level: <strong>${level.name}</strong> · XP: ${level.xp}</div>
  `;
  container.appendChild(summary);

  const secCard = document.createElement("div");
  secCard.className = "stat-card";
  const reading = stats.bySection.reading;
  const writing = stats.bySection.writing;
  const math = stats.bySection.math;

  const rAcc = reading.total ? Math.round(reading.correct / reading.total * 100) : 0;
  const wAcc = writing.total ? Math.round(writing.correct / writing.total * 100) : 0;
  const mAcc = math.total ? Math.round(math.correct / math.total * 100) : 0;

  secCard.innerHTML = `
    <div class="stat-label">By Section</div>
    <div style="font-size:0.8rem;margin-top:0.25rem;">
      Reading: <strong>${rAcc}%</strong><br/>
      Writing: <strong>${wAcc}%</strong><br/>
      Math: <strong>${mAcc}%</strong>
    </div>
  `;
  container.appendChild(secCard);

  const notes = document.createElement("div");
  notes.className = "stat-card";
  notes.innerHTML = `
    <div class="stat-label">Parent Notes</div>
    <div style="font-size:0.8rem;margin-top:0.25rem;">
      Encourage short, daily study sessions to grow the streak and keep motivation high.<br/>
      Focus on the section with the lowest accuracy to unlock the next level faster.
    </div>
  `;
  container.appendChild(notes);
}
