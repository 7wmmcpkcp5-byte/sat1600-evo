# SAT OWL EVO™ 5.0 (Sample Exam Edition)

**Goal:** Private SAT practice web‑app focused on honest training towards a 1600 score.

This version is intentionally simple but robust and modular. All code runs locally in
the browser. User data is stored only in `localStorage` on the device.

## Files

- `index.html` – single‑page app UI.
- `style.css` – dark theme inspired by gaming UIs.
- `app.js` – core logic (users, modes, timer, owl evolution, parent dashboard).
- `questions.js` – SAT‑style question bank (original items, not copied).
- `explanations.js` – theory snippets and worked solutions.
- `manifest.json` – PWA manifest.
- `service-worker.js` – basic offline cache.
- `icon-512.png` – app icon.

## Modes

- **Practice** – small set of questions by subject and level.
- **Timed drill** – shorter timed sets.
- **Exam** – sample exam using the exam engine (can be extended later to a full SAT).
- **Mistakes** – questions the student missed in previous sessions.
- **Cheatsheets** – quick rules and strategies.
- **Parent mode** – local dashboard with progress and reward ideas.

## Exam engine

The engine supports SAT‑style sections and timing via `EXAM_CONFIG` in `questions.js`.
This sample ships with a smaller exam (12 questions total) so it loads instantly.
You can extend `QUESTION_BANK` and `EXAM_CONFIG` to build a full exam following
the official structure and time.

## How to deploy with GitHub Pages

1. Copy all files into your GitHub repository root (e.g. `sat1600-evo`).
2. Commit and push.
3. In GitHub → *Settings* → *Pages*, choose **Deploy from a branch**, branch `main`,
   folder `/root`.
4. Wait for GitHub Pages to build, then open the live URL.
5. On iPhone, add to Home Screen for a full‑screen app experience.

## Notes

- All questions are newly written to be SAT‑style but not identical to any released
  exam items.
- This version is intentionally conservative and honest: no fake scores, no inflated
  feedback. The estimated SAT score is based on total performance across sessions.
