// Import all question sets
const mathQuestions = require('./questions-math.js');
const readingQuestions = require('./questions-reading.js');
const writingQuestions = require('./questions-writing.js');

// Combine all questions
const allQuestions = [
  ...mathQuestions,
  ...readingQuestions,
  ...writingQuestions
];

// Export combined questions and individual sets
module.exports = {
  allQuestions,
  mathQuestions,
  readingQuestions,
  writingQuestions
};
