import { explanations } from "./explanations.js";

export function getHintFor(questionId) {
  const base = explanations[questionId];
  if (!base) return "Try to identify what the question is really asking, then eliminate clearly wrong choices.";
  return "Hint: " + base.split(".")[0] + ". Focus on that idea first.";
}

export function getFullExplanation(questionId) {
  return explanations[questionId] || "Review the underlying concept and compare each answer choice to the key idea in the question.";
}
