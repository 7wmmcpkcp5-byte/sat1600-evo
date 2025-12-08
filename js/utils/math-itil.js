// ============================================
// MATH UTILITIES MODULE
// Utilidades para cálculos matemáticos y estadísticos
// ============================================

const MathUtils = {
    // ==================== BASIC OPERATIONS ====================
    
    /**
     * Suma todos los números en un array
     * @param {Array} numbers - Array de números
     * @returns {number} Suma total
     */
    sum(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) return 0;
        return numbers.reduce((acc, num) => acc + (Number(num) || 0), 0);
    },
    
    /**
     * Calcula el promedio de un array de números
     * @param {Array} numbers - Array de números
     * @returns {number} Promedio
     */
    average(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) return 0;
        const total = this.sum(numbers);
        return total / numbers.length;
    },
    
    /**
     * Calcula la mediana de un array de números
     * @param {Array} numbers - Array de números
     * @returns {number} Mediana
     */
    median(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) return 0;
        
        const sorted = [...numbers].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        
        return sorted[middle];
    },
    
    /**
     * Calcula la moda de un array de números
     * @param {Array} numbers - Array de números
     * @returns {Array} Moda(s)
     */
    mode(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) return [];
        
        const frequency = {};
        let maxFreq = 0;
        
        // Contar frecuencia
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            maxFreq = Math.max(maxFreq, frequency[num]);
        });
        
        // Encontrar valores con máxima frecuencia
        return Object.keys(frequency)
            .filter(num => frequency[num] === maxFreq)
            .map(Number);
    },
    
    /**
     * Calcula el rango de un array de números
     * @param {Array} numbers - Array de números
     * @returns {number} Rango
     */
    range(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) return 0;
        
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        
        return max - min;
    },
    
    // ==================== PERCENTAGES AND RATIOS ====================
    
    /**
     * Calcula porcentaje
     * @param {number} part - Parte
     * @param {number} whole - Total
     * @param {number} decimals - Decimales a redondear
     * @returns {number} Porcentaje
     */
    percentage(part, whole, decimals = 2) {
        if (whole === 0) return 0;
        const percent = (part / whole) * 100;
        return this.round(percent, decimals);
    },
    
    /**
     * Calcula el cambio porcentual entre dos valores
     * @param {number} oldValue - Valor antiguo
     * @param {number} newValue - Valor nuevo
     * @returns {number} Cambio porcentual
     */
    percentageChange(oldValue, newValue) {
        if (oldValue === 0) return newValue > 0 ? 100 : 0;
        return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    },
    
    /**
     * Calcula la proporción y la convierte a porcentaje
     * @param {number} numerator - Numerador
     * @param {number} denominator - Denominador
     * @returns {number} Proporción como porcentaje
     */
    ratioToPercent(numerator, denominator) {
        return this.percentage(numerator, denominator);
    },
    
    // ==================== ROUNDING AND FORMATTING ====================
    
    /**
     * Redondea un número a decimales específicos
     * @param {number} value - Valor a redondear
     * @param {number} decimals - Número de decimales
     * @returns {number} Valor redondeado
     */
    round(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    },
    
    /**
     * Redondea hacia arriba
     * @param {number} value - Valor a redondear
     * @param {number} decimals - Número de decimales
     * @returns {number} Valor redondeado
     */
    ceil(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.ceil(value * factor) / factor;
    },
    
    /**
     * Redondea hacia abajo
     * @param {number} value - Valor a redondear
     * @param {number} decimals - Número de decimales
     * @returns {number} Valor redondeado
     */
    floor(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.floor(value * factor) / factor;
    },
    
    /**
     * Formatea un número con separadores de miles
     * @param {number} value - Valor a formatear
     * @param {string} locale - Locale para formato
     * @returns {string} Número formateado
     */
    formatNumber(value, locale = 'es-ES') {
        return new Intl.NumberFormat(locale).format(value);
    },
    
    /**
     * Formatea un porcentaje
     * @param {number} value - Valor porcentual
     * @param {number} decimals - Decimales
     * @returns {string} Porcentaje formateado
     */
    formatPercent(value, decimals = 1) {
        return `${this.round(value, decimals)}%`;
    },
    
    // ==================== STATISTICAL FUNCTIONS ====================
    
    /**
     * Calcula la desviación estándar
     * @param {Array} numbers - Array de números
     * @param {boolean} isSample - True si es muestra, false si es población
     * @returns {number} Desviación estándar
     */
    standardDeviation(numbers, isSample = true) {
        if (!Array.isArray(numbers) || numbers.length < 2) return 0;
        
        const avg = this.average(numbers);
        const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
        const variance = this.average(squareDiffs);
        
        // Ajustar por n-1 si es muestra
        const adjustedVariance = isSample ? 
            (variance * numbers.length) / (numbers.length - 1) : 
            variance;
        
        return Math.sqrt(adjustedVariance);
    },
    
    /**
     * Calcula la varianza
     * @param {Array} numbers - Array de números
     * @param {boolean} isSample - True si es muestra
     * @returns {number} Varianza
     */
    variance(numbers, isSample = true) {
        const stdDev = this.standardDeviation(numbers, isSample);
        return Math.pow(stdDev, 2);
    },
    
    /**
     * Calcula el coeficiente de correlación entre dos arrays
     * @param {Array} x - Primer array
     * @param {Array} y - Segundo array
     * @returns {number} Coeficiente de correlación
     */
    correlation(x, y) {
        if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length < 2) {
            return 0;
        }
        
        const n = x.length;
        const sumX = this.sum(x);
        const sumY = this.sum(y);
        const sumXY = this.sum(x.map((xi, i) => xi * y[i]));
        const sumX2 = this.sum(x.map(xi => xi * xi));
        const sumY2 = this.sum(y.map(yi => yi * yi));
        
        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt(
            (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
        );
        
        if (denominator === 0) return 0;
        
        return numerator / denominator;
    },
    
    // ==================== SAT SPECIFIC CALCULATIONS ====================
    
    /**
     * Predice puntaje SAT basado en rendimiento en práctica
     * @param {Object} stats - Estadísticas de rendimiento
     * @returns {Object} Puntajes predichos por sección
     */
    predictSATScore(stats) {
        // Factores de conversión basados en data real SAT
        const conversionFactors = {
            math: {
                accuracyWeight: 0.7,
                speedWeight: 0.2,
                difficultyWeight: 0.1,
                baseScore: 200,
                maxScore: 800
            },
            reading: {
                accuracyWeight: 0.8,
                speedWeight: 0.1,
                difficultyWeight: 0.1,
                baseScore: 200,
                maxScore: 800
            },
            writing: {
                accuracyWeight: 0.75,
                speedWeight: 0.15,
                difficultyWeight: 0.1,
                baseScore: 200,
                maxScore: 800
            }
        };
        
        const predictions = {};
        
        ['math', 'reading', 'writing'].forEach(section => {
            const sectionStats = stats[section] || stats.overall || {};
            const factors = conversionFactors[section];
            
            // Calcular componentes
            const accuracyComponent = (sectionStats.accuracy || 50) * factors.accuracyWeight;
            const speedComponent = this.calculateSpeedScore(sectionStats.avgTime) * factors.speedWeight;
            const difficultyComponent = this.calculateDifficultyScore(sectionStats.difficulty) * factors.difficultyWeight;
            
            // Calcular puntaje base
            let predictedScore = factors.baseScore + 
                               (accuracyComponent * 6) + 
                               (speedComponent * 6) + 
                               (difficultyComponent * 6);
            
            // Aplicar límites
            predictedScore = Math.max(factors.baseScore, Math.min(factors.maxScore, predictedScore));
            
            // Redondear
            predictedScore = Math.round(predictedScore / 10) * 10;
            
            predictions[section] = predictedScore;
        });
        
        // Calcular total
        predictions.total = this.sum(Object.values(predictions));
        
        return predictions;
    },
    
    /**
     * Calcula score basado en velocidad
     * @param {number} avgTime - Tiempo promedio por pregunta
     * @returns {number} Score de velocidad (0-100)
     */
    calculateSpeedScore(avgTime) {
        if (!avgTime || avgTime <= 0) return 50;
        
        // Tiempo óptimo por pregunta (segundos)
        const optimalTimes = {
            math: 75,
            reading: 60,
            writing: 48
        };
        
        // Calcular eficiencia (menos tiempo = mejor)
        const efficiency = 100 - Math.min(100, (avgTime / 120) * 100);
        return Math.max(0, Math.min(100, efficiency));
    },
    
    /**
     * Calcula score basado en dificultad
     * @param {string} difficulty - Nivel de dificultad
     * @returns {number} Score de dificultad
     */
    calculateDifficultyScore(difficulty) {
        const difficultyScores = {
            'easy': 30,
            'medium': 60,
            'hard': 85,
            'expert': 100
        };
        
        return difficultyScores[difficulty] || 50;
    },
    
    /**
     * Calcula el percentil basado en puntaje SAT
     * @param {number} score - Puntaje SAT
     * @param {string} section - Sección (math, reading, writing, total)
     * @returns {number} Percentil aproximado
     */
    calculateSATPercentile(score, section = 'total') {
        // Tabla de percentiles aproximada SAT 2024
        const percentiles = {
            total: {
                1600: 99,
                1550: 98,
                1500: 96,
                1450: 93,
                1400: 89,
                1350: 84,
                1300: 78,
                1250: 71,
                1200: 63,
                1150: 54,
                1100: 45,
                1050: 36,
                1000: 27,
                950: 19,
                900: 12,
                850: 6,
                800: 1,
                700: 0
            },
            math: {
                800: 99,
                750: 94,
                700: 86,
                650: 76,
                600: 64,
                550: 51,
                500: 38,
                450: 26,
                400: 16,
                350: 8,
                300: 3,
                200: 1
            }
        };
        
        const table = percentiles[section] || percentiles.total;
        const scores = Object.keys(table).map(Number).sort((a, b) => b - a);
        
        for (const benchmark of scores) {
            if (score >= benchmark) {
                return table[benchmark];
            }
        }
        
        return 0;
    },
    
    // ==================== PROGRESS CALCULATIONS ====================
    
    /**
     * Calcula la tasa de mejora entre dos conjuntos de datos
     * @param {Array} oldScores - Puntajes antiguos
     * @param {Array} newScores - Puntajes nuevos
     * @returns {Object} Métricas de mejora
     */
    calculateImprovementRate(oldScores, newScores) {
        if (!Array.isArray(oldScores) || !Array.isArray(newScores) || 
            oldScores.length === 0 || newScores.length === 0) {
            return {
                rate: 0,
                trend: 'stable',
                confidence: 0
            };
        }
        
        const oldAvg = this.average(oldScores);
        const newAvg = this.average(newScores);
        const improvement = ((newAvg - oldAvg) / Math.abs(oldAvg)) * 100;
        
        // Determinar tendencia
        let trend = 'stable';
        if (improvement > 5) trend = 'improving';
        if (improvement < -5) trend = 'declining';
        
        // Calcular confianza basada en tamaño de muestra y consistencia
        const sampleSize = Math.min(oldScores.length, newScores.length);
        const consistency = 1 - (this.standardDeviation(newScores) / newAvg);
        const confidence = Math.min(100, (sampleSize / 10) * 100 * consistency);
        
        return {
            rate: this.round(improvement, 2),
            trend: trend,
            confidence: this.round(confidence, 0),
            oldAverage: this.round(oldAvg, 1),
            newAverage: this.round(newAvg, 1)
        };
    },
    
    /**
     * Calcula la proyección de puntaje futuro
     * @param {Array} historicalScores - Puntajes históricos
     * @param {number} weeks - Semanas a proyectar
     * @returns {Object} Proyección
     */
    projectFutureScore(historicalScores, weeks = 4) {
        if (!Array.isArray(historicalScores) || historicalScores.length < 2) {
            return {
                projectedScore: 0,
                growthRate: 0,
                confidence: 0
            };
        }
        
        // Aplicar regresión lineal simple
        const n = historicalScores.length;
        const x = Array.from({length: n}, (_, i) => i + 1);
        const y = historicalScores;
        
        const sumX = this.sum(x);
        const sumY = this.sum(y);
        const sumXY = this.sum(x.map((xi, i) => xi * y[i]));
        const sumX2 = this.sum(x.map(xi => xi * xi));
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Proyectar
        const futureX = n + weeks;
        const projectedScore = slope * futureX + intercept;
        
        // Calcular confianza basada en R²
        const yMean = sumY / n;
        const ssTotal = this.sum(y.map(yi => Math.pow(yi - yMean, 2)));
        const ssResidual = this.sum(y.map((yi, i) => Math.pow(yi - (slope * x[i] + intercept), 2)));
        const rSquared = ssTotal > 0 ? 1 - (ssResidual / ssTotal) : 0;
        const confidence = Math.max(0, Math.min(100, rSquared * 100));
        
        return {
            projectedScore: Math.round(projectedScore),
            growthRate: this.round(slope, 2),
            confidence: this.round(confidence, 0),
            rSquared: this.round(rSquared, 3)
        };
    },
    
    // ==================== VALIDATION ====================
    
    /**
     * Verifica si un valor es numérico
     * @param {any} value - Valor a verificar
     * @returns {boolean} True si es numérico
     */
    isNumeric(value) {
        if (typeof value === 'number') return !isNaN(value);
        if (typeof value === 'string') {
            const num = Number(value);
            return !isNaN(num) && value.trim() !== '';
        }
        return false;
    },
    
    /**
     * Valida y parsea un número
     * @param {any} value - Valor a parsear
     * @param {number} defaultValue - Valor por defecto si falla
     * @returns {number} Número parseado
     */
    parseNumber(value, defaultValue = 0) {
        if (this.isNumeric(value)) {
            const num = Number(value);
            return isFinite(num) ? num : defaultValue;
        }
        return defaultValue;
    },
    
    // ==================== HELPER FUNCTIONS ====================
    
    /**
     * Genera un número aleatorio en un rango
     * @param {number} min - Mínimo
     * @param {number} max - Máximo
     * @param {boolean} integer - True para entero
     * @returns {number} Número aleatorio
     */
    random(min, max, integer = true) {
        const randomNum = Math.random() * (max - min) + min;
        return integer ? Math.floor(randomNum) : randomNum;
    },
    
    /**
     * Calcula el factorial de un número
     * @param {number} n - Número
     * @returns {number} Factorial
     */
    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },
    
    /**
     * Calcula combinaciones nCr
     * @param {number} n - Total elementos
     * @param {number} r - Elementos a elegir
     * @returns {number} Número de combinaciones
     */
    combinations(n, r) {
        if (n < r || n < 0 || r < 0) return 0;
        return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
    },
    
    /**
     * Calcula permutaciones nPr
     * @param {number} n - Total elementos
     * @param {number} r - Elementos a ordenar
     * @returns {number} Número de permutaciones
     */
    permutations(n, r) {
        if (n < r || n < 0 || r < 0) return 0;
        return this.factorial(n) / this.factorial(n - r);
    }
};

// Exportar módulo
window.mathUtils = MathUtils;
console.log('✅ Math Utilities Module cargado');