// SAT OWL EVO 5.0 – Core logic
const LS_USERS_KEY = 'sat_owl_users_v5';
const LS_ACTIVE_USER_KEY = 'sat_owl_active_user_v5';
const LS_STATS_PREFIX = 'sat_owl_stats_';
const LS_MISTAKES_PREFIX = 'sat_owl_mistakes_';

const STATE = {
  users: [],
  currentUser: null,
  mode: null,
  subject: 'math',
  level: 1,
  questions: [],
  index: 0,
  answered: false,
  timerId: null,
  secondsElapsed: 0,
  examMode: false,
  examConfig: EXAM_CONFIG,
  synth: window.speechSynthesis || null,
  voiceEnabled: false
};

// ---------- UTILITIES ----------
function $(id) { return document.getElementById(id); }

function loadUsers() {
  const raw = localStorage.getItem(LS_USERS_KEY);
  STATE.users = raw ? JSON.parse(raw) : [];
  renderUserList();
  const activeName = localStorage.getItem(LS_ACTIVE_USER_KEY);
  if (activeName) {
    const found = STATE.users.find(u => u.name === activeName);
    if (found) setCurrentUser(found);
  }
}

function saveUsers() {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(STATE.users));
}

function getUserStats(userName) {
  const raw = localStorage.getItem(LS_STATS_PREFIX + userName);
  return raw ? JSON.parse(raw) : { answered: 0, correct: 0, owlStage: 1 };
}

function saveUserStats(userName, stats) {
  localStorage.setItem(LS_STATS_PREFIX + userName, JSON.stringify(stats));
}

function getUserMistakes(userName) {
  const raw = localStorage.getItem(LS_MISTAKES_PREFIX + userName);
  return raw ? JSON.parse(raw) : [];
}

function saveUserMistakes(userName, arr) {
  localStorage.setItem(LS_MISTAKES_PREFIX + userName, JSON.stringify(arr));
}

function computeOwlStage(score) {
  // Simple 7-stage evolution from 400 to 1600+
  if (score < 500) return 1;
  if (score < 700) return 2;
  if (score < 900) return 3;
  if (score < 1100) return 4;
  if (score < 1300) return 5;
  if (score < 1450) return 6;
  return 7;
}

function stageLabel(stage) {
  const labels = [
    '–',
    'Stage 1 · Shy chick',
    'Stage 2 · Curious reader',
    'Stage 3 · Night student',
    'Stage 4 · Confident solver',
    'Stage 5 · Strategic hunter',
    'Stage 6 · Exam master',
    'Stage 7 · 1600 legend'
  ];
  return labels[stage] || labels[0];
}

// ---------- RENDER USERS ----------
function renderUserList() {
  const box = $('userList');
  box.innerHTML = '';
  STATE.users.forEach(u => {
    const btn = document.createElement('button');
    btn.textContent = u.name;
    btn.className = 'pill-user' + (STATE.currentUser && STATE.currentUser.name === u.name ? ' active' : '');
    btn.onclick = () => setCurrentUser(u);
    box.appendChild(btn);
  });
}

function setCurrentUser(user) {
  STATE.currentUser = user;
  $('currentUserLabel').textContent = user ? user.name : 'No user';
  localStorage.setItem(LS_ACTIVE_USER_KEY, user.name);
  $('modeSection').classList.remove('hidden');
  updateParentStats();
}

// ---------- QUESTION SELECTION ----------
function pickQuestions(mode, subject, level) {
  let pool = QUESTION_BANK.filter(q => q.subject === subject);
  if (level) pool = pool.filter(q => q.level === level);

  if (mode === 'exam') {
    // Basic sample exam: pull according to EXAM_CONFIG
    const sectionCfg = STATE.examConfig.sections.find(s => s.subject === subject) || STATE.examConfig.sections[0];
    const count = Math.min(sectionCfg.questionCount, pool.length);
    return shuffle(pool).slice(0, count);
  }

  if (mode === 'mistakes') {
    const mistakes = getUserMistakes(STATE.currentUser.name);
    const ids = new Set(mistakes);
    pool = pool.filter(q => ids.has(q.id));
    return pool.length ? shuffle(pool) : [];
  }

  // practice / timed
  const maxCount = mode === 'timed' ? 8 : 12;
  const count = Math.min(maxCount, pool.length);
  return shuffle(pool).slice(0, count);
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------- TIMER ----------
function startTimer() {
  stopTimer();
  STATE.secondsElapsed = 0;
  STATE.timerId = setInterval(() => {
    STATE.secondsElapsed++;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  if (STATE.timerId) {
    clearInterval(STATE.timerId);
    STATE.timerId = null;
  }
}

function renderTimer() {
  const s = STATE.secondsElapsed;
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  $('timerLabel').textContent = `⏱ ${m}:${sec}`;
}

// ---------- RENDER QUESTION ----------
function renderQuestion() {
  if (!STATE.questions.length) {
    $('questionSection').classList.add('hidden');
    $('feedbackBox').classList.add('hidden');
    $('cheatsSection').classList.add('hidden');
    if (STATE.mode === 'mistakes') {
      $('cheatsContent').textContent = 'No mistakes stored yet. Practice first, then come back here.';
      $('cheatsSection').classList.remove('hidden');
    }
    return;
  }

  const q = STATE.questions[STATE.index];
  $('questionSection').classList.remove('hidden');
  $('feedbackBox').classList.add('hidden');
  STATE.answered = false;

  $('questionStem').textContent = q.stem;
  $('subjectLabel').textContent = q.subject === 'math' ? 'Math' : 'Reading & Writing';
  $('modeLabel').textContent = STATE.mode.toUpperCase();

  const stats = getUserStats(STATE.currentUser.name);
  $('owlStageLabel').textContent = stageLabel(stats.owlStage);
  $('scoreLabel').textContent = stats.answered ? `Score est.: ${estimateScore(stats)} ` : 'Score: –';

  $('progressLabel').textContent = `Q ${STATE.index + 1}/${STATE.questions.length}`;

  const ul = $('choicesList');
  ul.innerHTML = '';
  q.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    li.className = 'choice-item';
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.className = 'choice-btn';
    btn.onclick = () => onAnswer(idx);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function estimateScore(stats) {
  if (!stats.answered) return '–';
  const pct = stats.correct / stats.answered;
  const scaled = Math.round(400 + pct * 1200);
  return scaled;
}

// ---------- ANSWERING ----------
function onAnswer(index) {
  if (STATE.answered) return;
  const q = STATE.questions[STATE.index];
  STATE.answered = true;

  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach((btn, idx) => {
    if (idx === q.correctIndex) btn.classList.add('correct');
    if (idx === index && idx !== q.correctIndex) btn.classList.add('incorrect');
  });

  const stats = getUserStats(STATE.currentUser.name);
  stats.answered += 1;
  if (index === q.correctIndex) {
    stats.correct += 1;
  } else {
    const mistakes = getUserMistakes(STATE.currentUser.name);
    if (!mistakes.includes(q.id)) {
      mistakes.push(q.id);
      saveUserMistakes(STATE.currentUser.name, mistakes);
    }
  }
  const estScore = estimateScore(stats);
  stats.owlStage = computeOwlStage(typeof estScore === 'number' ? estScore : 400);
  saveUserStats(STATE.currentUser.name, stats);

  $('scoreLabel').textContent = stats.answered ? `Score est.: ${estimateScore(stats)}` : 'Score: –';
  $('owlStageLabel').textContent = stageLabel(stats.owlStage);

  // auto explanation preview
  showExplanation(false);
}

// ---------- THEORY & EXPLANATIONS ----------
function showTheory() {
  const q = STATE.questions[STATE.index];
  const key = q.theoryKey;
  const text = THEORY[key] || 'Theory coming soon for this question type.';
  const box = $('feedbackBox');
  box.innerHTML = `<strong>Theory:</strong> ${text}`;
  box.classList.remove('hidden');
}

function showExplanation(forceOpen = true) {
  const q = STATE.questions[STATE.index];
  const exp = EXPLANATIONS[q.explanationKey] || 'Explanation coming soon.';
  const box = $('feedbackBox');
  const theory = THEORY[q.theoryKey] || '';
  box.innerHTML = `<strong>Explanation:</strong> ${exp}` + (theory ? `<br><br><em>Key idea:</em> ${theory}` : '');
  if (forceOpen) box.classList.remove('hidden');
}

// ---------- AUDIO ----------
function speakCurrent() {
  if (!STATE.synth || !STATE.voiceEnabled) return;
  const q = STATE.questions[STATE.index];
  const text = q.stem + ' ' + q.choices.map((c, i) => `Option ${String.fromCharCode(65 + i)}: ${c}.`).join(' ');
  const utter = new SpeechSynthesisUtterance(text);
  STATE.synth.cancel();
  STATE.synth.speak(utter);
}

// ---------- MODES ----------
function startSession(mode) {
  if (!STATE.currentUser) {
    alert('Create or select a user first.');
    return;
  }
  STATE.mode = mode;
  STATE.subject = $('subjectSelect').value;
  STATE.level = parseInt($('levelSelect').value, 10);

  if (mode === 'cheats') {
    renderCheats();
    $('cheatsSection').classList.remove('hidden');
    $('questionSection').classList.add('hidden');
    $('parentSection').classList.add('hidden');
    return;
  }

  if (mode === 'parent') {
    $('parentSection').classList.remove('hidden');
    $('questionSection').classList.add('hidden');
    $('cheatsSection').classList.add('hidden');
    updateParentStats();
    return;
  }

  $('cheatsSection').classList.add('hidden');
  $('parentSection').classList.add('hidden');

  STATE.questions = pickQuestions(mode, STATE.subject, STATE.level);
  STATE.index = 0;

  if (!STATE.questions.length) {
    alert('No questions available yet for this combination. Try another level or subject.');
    return;
  }

  if (mode === 'timed' || mode === 'exam') startTimer();
  else {
    stopTimer();
    STATE.secondsElapsed = 0;
    renderTimer();
  }
  renderQuestion();
}

function renderCheats() {
  const box = $('cheatsContent');
  box.innerHTML = `
    <h3>Math – quick rules</h3>
    <ul>
      <li>Linear → isolate x doing the inverse operations in reverse order.</li>
      <li>Systems → try elimination first when coefficients line up.</li>
      <li>Quadratics → factor when possible, otherwise use the quadratic formula.</li>
      <li>Exponential → identify the base (growth factor) and the exponent (time divided by period).</li>
    </ul>
    <h3>Reading & Writing – strategy</h3>
    <ul>
      <li>Vocabulary: replace the word with your own phrase using context, then match.</li>
      <li>Main idea: ask what the passage would be titled in one short sentence.</li>
      <li>Evidence: prefer numbers, data, or direct statements over opinions.</li>
      <li>Grammar: check subject–verb and pronoun agreement first; then verb tense.</li>
    </ul>
    <p class="hint">
      This is a compact cheatsheet. In future versions you can unlock extended decks
      with more examples and mini-drills.
    </p>
  `;
}

// ---------- PARENT DASHBOARD ----------
function updateParentStats() {
  if (!STATE.currentUser) return;
  const stats = getUserStats(STATE.currentUser.name);
  const est = estimateScore(stats);
  const mistakes = getUserMistakes(STATE.currentUser.name);
  const box = $('parentStats');
  box.innerHTML = `
    <p><strong>Student:</strong> ${STATE.currentUser.name}</p>
    <p><strong>Questions answered:</strong> ${stats.answered}</p>
    <p><strong>Correct:</strong> ${stats.correct}</p>
    <p><strong>Estimated SAT score:</strong> ${est}</p>
    <p><strong>OWL stage:</strong> ${stageLabel(stats.owlStage)}</p>
    <p><strong>Unique mistakes stored:</strong> ${mistakes.length}</p>
    <p class="hint">
      Tip: choose a small reward when a new OWL stage is unlocked, and a bigger one after a full exam with improved score.
    </p>
  `;
}

// ---------- NAVIGATION ----------
function nextQuestion() {
  if (!STATE.questions.length) return;
  if (STATE.index < STATE.questions.length - 1) {
    STATE.index += 1;
    renderQuestion();
    if (STATE.voiceEnabled) speakCurrent();
  } else {
    stopTimer();
    const stats = getUserStats(STATE.currentUser.name);
    const est = estimateScore(stats);
    const box = $('feedbackBox');
    box.innerHTML = `
      <strong>Session complete.</strong><br>
      Questions this session: ${STATE.questions.length}<br>
      Total answered overall: ${stats.answered}<br>
      Estimated SAT score: ${est}<br>
      OWL stage: ${stageLabel(stats.owlStage)}
    `;
    box.classList.remove('hidden');
  }
}

// ---------- EVENT LISTENERS ----------
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();

  $('btnCreateUser').onclick = () => {
    const name = $('newUserName').value.trim();
    if (!name) return;
    if (STATE.users.some(u => u.name === name)) {
      alert('User with that name already exists.');
      return;
    }
    const user = { name };
    STATE.users.push(user);
    saveUsers();
    $('newUserName').value = '';
    renderUserList();
    setCurrentUser(user);
  };

  $('btnSwitchUser').onclick = () => {
    $('userSection').scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => startSession(btn.dataset.mode));
  });

  $('btnNext').onclick = nextQuestion;
  $('btnShowTheory').onclick = showTheory;
  $('btnShowExplanation').onclick = () => showExplanation(true);
  $('btnToggleAudio').onclick = () => {
    STATE.voiceEnabled = !STATE.voiceEnabled;
    $('btnToggleAudio').textContent = STATE.voiceEnabled ? '🔊 Voice ON' : '🔊 Voice';
    if (STATE.voiceEnabled) speakCurrent();
    if (!STATE.voiceEnabled && STATE.synth) STATE.synth.cancel();
  };
});
