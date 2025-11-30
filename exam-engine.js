import { readingQuestions } from "./questions-reading.js";
import { writingQuestions } from "./questions-writing.js";
import { mathQuestions } from "./questions-math.js";

export class ExamEngine {
  constructor() {
    this.questions = [];
    this.answers = [];
    this.index = 0;
    this.timerSeconds = 60 * 60;
  }

  buildSampleExam() {
    const rw = [...readingQuestions, ...writingQuestions];
    const math = [...mathQuestions];
    this.questions = [...rw, ...math];
    this.answers = new Array(this.questions.length).fill(null);
    this.index = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.index] || null;
  }

  recordAnswer(choice) {
    if (!this.questions.length) return;
    this.answers[this.index] = choice;
  }

  goNext() {
    if (this.index < this.questions.length - 1) this.index += 1;
  }

  goPrev() {
    if (this.index > 0) this.index -= 1;
  }

  computeResults() {
    let readingCorrect = 0;
    let readingTotal = 0;
    let mathCorrect = 0;
    let mathTotal = 0;

    this.questions.forEach((q, i) => {
      const isCorrect = this.answers[i] === q.correctAnswer;
      if (q.section === "math") {
        mathTotal += 1;
        if (isCorrect) mathCorrect += 1;
      } else {
        readingTotal += 1;
        if (isCorrect) readingCorrect += 1;
      }
    });

    return {
      readingCorrect,
      readingTotal,
      mathCorrect,
      mathTotal
    };
  }
}
