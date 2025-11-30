export function convertRawToScaled(raw, maxRaw) {
  if (maxRaw <= 0) return 200;
  const ratio = raw / maxRaw;
  const base = 200;
  const range = 600;
  const curved = Math.pow(ratio, 0.85);
  return Math.round(base + range * curved);
}

export function computeSatScores(results) {
  const readingScaled = convertRawToScaled(results.readingCorrect, results.readingTotal);
  const mathScaled = convertRawToScaled(results.mathCorrect, results.mathTotal);
  return {
    readingScaled,
    mathScaled,
    total: readingScaled + mathScaled
  };
}
