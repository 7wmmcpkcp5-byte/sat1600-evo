// scoring.js
export function convertRawToScaled(raw, maxRaw) {
    if (maxRaw <= 0) return 200;
    const ratio = raw / maxRaw;
    const base = 200;
    const range = 600;
    const curved = Math.pow(ratio, 0.85);
    return Math.round(base + range * curved);
}

export function computeSatScores(results) {
    const readingScaled = convertRawToScaled(results.correct || 0, results.total || 1);
    const mathScaled = convertRawToScaled(results.correct || 0, results.total || 1);
    return {
        readingScaled,
        mathScaled,
        total: readingScaled + mathScaled
    };
}

export function getScoreInterpretation(totalScore) {
    if (totalScore >= 1400) return "Excellent! College ready!";
    if (totalScore >= 1200) return "Good! Competitive for many colleges.";
    if (totalScore >= 1000) return "Developing. Keep practicing!";
    return "Needs improvement. Focus on fundamentals.";
}

export const ScoringSystem = {
    convertRawToScaled,
    computeSatScores, 
    getScoreInterpretation
};