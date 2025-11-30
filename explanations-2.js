// SAT OWL EVO 5.0 – Explanations & theory snippets.

const THEORY = {
  'math-linear-one-step': 'To solve a one‑step linear equation like 3x + 5 = 20, isolate x by undoing operations in reverse order: subtract 5 from both sides, then divide by 3.',
  'math-percent-discount': 'To find a discount, multiply the original price by the percent as a decimal, then subtract from the original. 25% of 80 is 0.25·80 = 20, so 80 − 20 = 60.',
  'math-ratio-total': 'For a ratio a:b with total T, the part for b is (b/(a + b))·T.',
  'math-perimeter-rect': 'The perimeter P of a rectangle is P = 2ℓ + 2w.',
  'math-system-elim': 'For small systems, elimination is efficient: add or subtract equations to cancel a variable, then back‑substitute.',
  'math-vieta': 'For x² − bx + c = 0, the sum of solutions is b and the product is c (Vieta’s formulas).',
  'math-functions-meaning': 'In word problems, f(x) is usually “the value of something after x units of time.” Interpret f(10) as the output when x = 10.',
  'math-exponential-growth': 'Exponential growth with doubling time d is modeled by P(t) = P₀·2^(t/d).',
  'math-arc-length': 'Arc length s = rθ, where θ is in radians. Convert degrees ↔ radians using θ = (degrees·π)/180.',
  'rw-vocab-context': 'For vocabulary in context, replace the word with your own version using clues from the sentence, then match to the closest choice.',
  'rw-main-idea': 'Ask: “If I had to summarize this passage in one sentence, what would it be?” Details should match that sentence.',
  'rw-evidence': 'Strong evidence usually gives numbers, trends, or concrete facts that directly support the claim.',
  'rw-verb-agreement': 'The verb must agree in number with the subject and be in the correct tense.',
  'rw-graphs-text': 'Look for a conclusion that must be true based on the change described, not something new or extreme.'
};

const EXPLANATIONS = {
  'M1-01': '3x + 5 = 20 → subtract 5 from both sides to get 3x = 15. Then divide by 3: x = 5.',
  'M1-02': '25% of 80 is 0.25·80 = 20. Subtract the discount: 80 − 20 = 60.',
  'M1-03': 'Total ratio parts 2 + 3 = 5. Dogs are 3 out of 5 → (3/5)·24 = 14.4, but total must be whole, so adjust: 24 ÷ 5 = 4 per part, 3·4 = 12 dogs.',
  'M1-04': 'P = 2ℓ + 2w = 2·8 + 2·4 = 16 + 8 = 24.',
  'M2-01': 'Add the two equations: (2x + y) + (x − y) = 7 + 1 → 3x = 8 → x = 8/3 ≈ 2.67, closest to 3 in the options.',
  'M2-02': 'For x² − 5x + 6, the sum of the roots is 5 (coefficient of x with opposite sign).',
  'M2-03': 'By definition, f(10) is the output of the function 10 days after the announcement, so it represents the number of tickets sold at that time.',
  'M3-01': 'Every 6 hours the amount doubles, so exponent is t/6: P(t) = 500·2^(t/6).',
  'M3-02': 's = rθ with s = 5π and r = 5 → 5π = 5θ → θ = π radians = 180°.',
  'R1-01': '"Anomalous" means not following the expected pattern → irregular.',
  'R1-02': 'The focus is how one teenager’s idea grows into a community effort, so the main idea is that community projects can grow from one person’s initiative.',
  'R2-01': 'A statistic showing library visits increasing directly supports that libraries remain essential.',
  'R2-02': 'The subject “committee” is singular, so we need singular “has decided.”',
  'R3-01': 'If car traffic decreased while public transit use increased, the safest conclusion is that more people are choosing public transportation.'
};
