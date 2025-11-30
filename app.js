import { Router } from "./router.js";
import { readingQuestions } from "./questions-reading.js";
import { writingQuestions } from "./questions-writing.js";
import { mathQuestions } from "./questions-math.js";
import { explanations } from "./explanations.js";
import { OwlEvolutionPro } from "./gamification.js";
import { PremiumFeatures } from "./premium-features.js";
import { AnalyticsManager } from "./analytics.js";
import { renderParentDashboard } from "./parent-dashboard.js";
import { ExamEngine } from "./exam-engine.js";
import { computeSatScores } from "./scoring.js";

const STATE = {
  router: new Router(),
  owl: new OwlEvolutionPro(),
  premium: new PremiumFeatures(),
  analytics: new AnalyticsManager(),
  practice: {
    questions: [],
    answers: [],
    index: 0,
    section: "reading"
  },
  exam: {
    engine: new ExamEngine(),
    timer: null,
    secondsLeft: 60 * 60
  }
};

function init() {
  STATE.router.init();
  initHeaderGamification();
  initPractice();
  initExam();
  initAnalytics();
  initParents();
  registerSW();
  STATE.router.navigate("home");
}

function initHeaderGamification() {
  const level = STATE.owl.getLevel();
  const elName = document.getElementById("header-level-name");
  const elXp = document.getElementById("header-xp");
  if (elName) elName.textContent = level.name;
  if (elXp) {
    if (level.nextXp) {
      elXp.textContent = `${level.xp} XP → next at ${level.nextXp}`;
    } else {
      elXp.textContent = `${level.xp} XP · Max level`;
    }
  }
}

function initPractice() {
  const sectionSel = document.getElementById("practice-section");
  const diffSel = document.getElementById("practice-difficulty");
  const startBtn = document.getElementById("btn-start-practice");
  const prevBtn = document.getElementById("btn-practice-prev");
  const nextBtn = document.getElementById("btn-practice-next");
  const finishBtn = document.getElementById("btn-practice-finish");

  startBtn.addEventListener("click", () => {
    const section = sectionSel.value;
    const diff = diffSel.value;
    startPracticeSession(section, diff);
  });

  prevBtn.addEventListener("click", () => {
    if (STATE.practice.index > 0) {
      STATE.practice.index -= 1;
      renderPracticeQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (STATE.practice.index < STATE.practice.questions.length - 1) {
      STATE.practice.index += 1;
      renderPracticeQuestion();
    }
  });

  finishBtn.addEventListener("click", finishPracticeSession);
}

function startPracticeSession(section, difficulty) {
  let pool = [];
  if (section === "reading") pool = readingQuestions;
  else if (section === "writing") pool = writingQuestions;
  else pool = mathQuestions;

  const filtered = pool.filter(q => difficulty === "any" || q.difficulty === difficulty);
  if (!filtered.length) {
    alert("No questions available for this filter yet.");
    return;
  }

  STATE.practice.section = section;
  STATE.practice.questions = filtered;
  STATE.practice.answers = new Array(filtered.length).fill(null);
  STATE.practice.index = 0;

  document.getElementById("practice-session").classList.remove("hidden");
  document.getElementById("practice-summary").classList.add("hidden");

  const meta = document.getElementById("practice-meta-label");
  meta.textContent = `${section.toUpperCase()} · ${filtered.length} questions`;

  renderPracticeQuestion();
}

function renderPracticeQuestion() {
  const q = STATE.practice.questions[STATE.practice.index];
  const container = document.getElementById("practice-question-container");
  const expl = document.getElementById("practice-explanation");
  container.innerHTML = "";
  expl.textContent = "";

  if (!q) return;

  const p = document.createElement("div");
  p.className = "question-text";
  p.textContent = q.text;
  container.appendChild(p);

  const list = document.createElement("ul");
  list.className = "options";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt;
    const choice = opt.trim().charAt(0);
    if (STATE.practice.answers[STATE.practice.index]) {
      const prevChoice = STATE.practice.answers[STATE.practice.index];
      if (choice === q.correctAnswer) {
        btn.classList.add("correct");
      } else if (choice === prevChoice) {
        btn.classList.add("incorrect");
      }
    }
    btn.addEventListener("click", () => {
      STATE.practice.answers[STATE.practice.index] = choice;
      const correct = choice === q.correctAnswer;
      if (correct) {
        STATE.owl.addXP(10, "practice_correct");
      }
      renderPracticeQuestion();
      const expText = explanations[q.id] || "Review the reasoning for this question carefully.";
      expl.textContent = expText;
      initHeaderGamification();
    });
    list.appendChild(btn);
  });

  container.appendChild(list);

  const progressBar = document.getElementById("practice-progress-bar");
  const progress = ((STATE.practice.index + 1) / STATE.practice.questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function finishPracticeSession() {
  const questions = STATE.practice.questions;
  const answers = STATE.practice.answers;
  let correctCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) correctCount += 1;
  });

  const total = questions.length;
  const acc = Math.round((correctCount / total) * 100);

  STATE.analytics.recordPracticeResult(STATE.practice.section, correctCount, total);

  if (acc === 100) {
    STATE.owl.addXP(20, "practice_perfect");
  } else {
    STATE.owl.addXP(10, "practice_finished");
  }
  initHeaderGamification();

  const summary = document.getElementById("practice-summary");
  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h3>Practice Summary</h3>
    <p>Correct: ${correctCount} / ${total} (${acc}%)</p>
  `;
}

function initExam() {
  const startBtn = document.getElementById("btn-start-exam");
  const prevBtn = document.getElementById("btn-exam-prev");
  const nextBtn = document.getElementById("btn-exam-next");
  const finishBtn = document.getElementById("btn-exam-finish");

  startBtn.addEventListener("click", startExam);
  prevBtn.addEventListener("click", () => {
    STATE.exam.engine.goPrev();
    renderExamQuestion();
  });
  nextBtn.addEventListener("click", () => {
    STATE.exam.engine.goNext();
    renderExamQuestion();
  });
  finishBtn.addEventListener("click", () => {
    finishExam();
  });
}

function startExam() {
  STATE.exam.engine.buildSampleExam();
  STATE.exam.secondsLeft = STATE.exam.engine.timerSeconds;

  document.getElementById("exam-intro").classList.add("hidden");
  document.getElementById("exam-session").classList.remove("hidden");
  document.getElementById("exam-summary").classList.add("hidden");

  renderExamQuestion();
  startExamTimer();
}

function renderExamQuestion() {
  const q = STATE.exam.engine.getCurrentQuestion();
  const container = document.getElementById("exam-question-container");
  container.innerHTML = "";
  if (!q) return;

  const meta = document.getElementById("exam-meta-label");
  meta.textContent = `${q.section.toUpperCase()} · Question ${STATE.exam.engine.index + 1} of ${STATE.exam.engine.questions.length}`;

  const p = document.createElement("div");
  p.className = "question-text";
  p.textContent = q.text;
  container.appendChild(p);

  const list = document.createElement("ul");
  list.className = "options";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt;
    const choice = opt.trim().charAt(0);
    const currentAnswer = STATE.exam.engine.answers[STATE.exam.engine.index];
    if (currentAnswer && currentAnswer === choice) {
      btn.classList.add("correct");
    }
    btn.addEventListener("click", () => {
      STATE.exam.engine.recordAnswer(choice);
      renderExamQuestion();
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
}

function startExamTimer() {
  const el = document.getElementById("exam-timer");
  if (STATE.exam.timer) clearInterval(STATE.exam.timer);

  const tick = () => {
    const s = STATE.exam.secondsLeft;
    if (s <= 0) {
      clearInterval(STATE.exam.timer);
      finishExam();
      return;
    }
    STATE.exam.secondsLeft -= 1;
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    el.textContent = `${m}:${sec}`;
  };

  tick();
  STATE.exam.timer = setInterval(tick, 1000);
}

function finishExam() {
  if (STATE.exam.timer) clearInterval(STATE.exam.timer);

  const results = STATE.exam.engine.computeResults();
  const scores = computeSatScores(results);

  STATE.analytics.recordExamResult({
    reading: {
      correct: results.readingCorrect,
      total: results.readingTotal
    },
    writing: { correct: 0, total: 0 },
    math: {
      correct: results.mathCorrect,
      total: results.mathTotal
    }
  });

  STATE.owl.addXP(100, "exam_completed");
  initHeaderGamification();

  document.getElementById("exam-session").classList.add("hidden");
  const summary = document.getElementById("exam-summary");
  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h3>Exam Summary</h3>
    <p>Reading/Writing: ${results.readingCorrect}/${results.readingTotal}</p>
    <p>Math: ${results.mathCorrect}/${results.mathTotal}</p>
    <p><strong>Estimated SAT Score:</strong> ${scores.total} (R/W ${scores.readingScaled}, M ${scores.mathScaled})</p>
  `;
}

function initAnalytics() {
  const container = document.getElementById("analytics-content");
  STATE.analytics.renderInto(container);
}

function initParents() {
  const container = document.getElementById("parent-content");
  renderParentDashboard(container);
}

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (e) {
      console.warn("SW registration failed", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
