// ai-tutor.js - Sistema de tutoría IA profesional unificado
class AITutor {
    constructor() {
        this.explanations = this.buildKnowledgeBase();
        this.learningProfile = this.loadLearningProfile();
        this.config = {
            hintStyle: 'guided', // guided, direct, socratic
            explanationDepth: 'adaptive', // brief, detailed, adaptive
            encouragementLevel: 'motivational' // minimal, standard, motivational
        };
    }

    buildKnowledgeBase() {
        // Base de conocimiento integral para SAT
        return {
            // === MATEMÁTICAS ===
            'math_1': {
                category: 'algebra',
                difficulty: 1,
                title: 'Ecuaciones Lineales Básicas',
                concept: 'Para resolver ecuaciones lineales, realiza operaciones inversas en ambos lados para aislar la variable.',
                theory: 'Las ecuaciones lineales siguen la forma ax + b = c. El objetivo es despejar x realizando las operaciones opuestas: si hay suma, resta; si hay multiplicación, divide.',
                stepByStep: [
                    'Identifica la variable que necesitas despejar',
                    'Aísla el término con la variable',
                    'Realiza operaciones inversas en ambos lados',
                    'Simplifica y verifica tu solución'
                ],
                commonMistakes: [
                    'No aplicar la misma operación en ambos lados',
                    'Errores en signos al mover términos',
                    'Olvidar simplificar completamente'
                ],
                hints: [
                    '💡 Empresa eliminando constantes primero',
                    '🔍 Recuerda: lo que hagas en un lado, hazlo en el otro',
                    '🎯 Verifica tu respuesta sustituyendo en la ecuación original'
                ],
                realWorld: 'Estas ecuaciones se usan en presupuestos, cálculos de distancias y planificación de recursos.',
                solution: '3x + 5 = 20 → 3x = 15 → x = 5'
            },

            'math_2': {
                category: 'geometry',
                difficulty: 2,
                title: 'Área del Círculo',
                concept: 'El área de un círculo se calcula usando la fórmula A = πr² donde r es el radio.',
                theory: 'π (pi) es una constante aproximadamente igual a 3.1416. El radio es la distancia desde el centro hasta cualquier punto del círculo.',
                stepByStep: [
                    'Identifica el radio del círculo',
                    'Eleva el radio al cuadrado (r²)',
                    'Multiplica por π (usa 3.14 o el valor dado)',
                    'Incluye las unidades correctas en tu respuesta'
                ],
                commonMistakes: [
                    'Confundir radio con diámetro',
                    'Olvidar elevar al cuadrado',
                    'Usar valor incorrecto de π'
                ],
                hints: [
                    '📏 ¿Te dieron el diámetro? Recuerda: radio = diámetro ÷ 2',
                    '🔢 π es aproximadamente 3.14, pero usa el valor que te den',
                    '🎯 El área siempre está en unidades cuadradas'
                ],
                realWorld: 'Se usa en diseño, arquitectura, y para calcular materiales circulares.',
                solution: 'Radio = 4 → A = π(4)² = 16π'
            },

            // === LECTURA CRÍTICA ===
            'reading_1': {
                category: 'comprehension',
                difficulty: 2,
                title: 'Idea Principal del Texto',
                concept: 'La idea principal es el mensaje central que el autor quiere comunicar.',
                theory: 'La idea principal resume el propósito del texto. Suele estar en la introducción o conclusión, pero a veces hay que inferirla.',
                stepByStep: [
                    'Lee todo el pasaje completamente',
                    'Identifica el tema general',
                    'Busca oraciones que resuman el contenido',
                    'Elimina opciones que son detalles específicos',
                    'Selecciona la opción que abarca todo el pasaje'
                ],
                commonMistakes: [
                    'Elegir un detalle específico en lugar de la idea general',
                    'No considerar el contexto completo',
                    'Ignorar el tono y propósito del autor'
                ],
                hints: [
                    '📖 Pregúntate: "¿De qué trata principalmente este texto?"',
                    '🔍 Busca patrones y repeticiones',
                    '🎯 La idea principal debe ser lo suficientemente amplia para cubrir todo el pasaje'
                ],
                realWorld: 'Esta habilidad es crucial para entender noticias, documentos y comunicaciones profesionales.',
                solution: 'La opción que mejor captura el propósito general del autor'
            },

            // === ESCRITURA Y GRAMÁTICA ===
            'writing_1': {
                category: 'grammar',
                difficulty: 1,
                title: 'Concordancia Sujeto-Verbo',
                concept: 'El verbo debe concordar en número (singular/plural) con su sujeto.',
                theory: 'Sujetos singulares requieren verbos singulares; sujetos plurales requieren verbos plurales. Los sustantivos colectivos pueden ser complejos.',
                stepByStep: [
                    'Identifica el sujeto de la oración',
                    'Determina si es singular o plural',
                    'Selecciona el verbo que concuerde en número',
                    'Ten cuidado con frases intermedias que puedan confundir'
                ],
                commonMistakes: [
                    'Dejarse confundir por palabras entre el sujeto y verbo',
                    'Errores con sustantivos colectivos',
                    'Problemas con sujetos compuestos'
                ],
                hints: [
                    '✍️ Ignora las frases entre el sujeto y verbo al determinar concordancia',
                    '👥 Los sustantivos colectivos (team, family) suelen ser singulares',
                    '🔍 Para sujetos compuestos unidos por "and", usa verbo plural'
                ],
                realWorld: 'Esencial para comunicación profesional y académica efectiva.',
                solution: 'Sujeto singular + verbo singular / Sujeto plural + verbo plural'
            }
        };
    }

    loadLearningProfile() {
        return {
            strengths: [],
            weaknesses: [],
            learningPatterns: {},
            lastSession: null,
            progress: {
                algebra: { attempts: 0, correct: 0 },
                geometry: { attempts: 0, correct: 0 },
                comprehension: { attempts: 0, correct: 0 },
                grammar: { attempts: 0, correct: 0 }
            }
        };
    }

    // === SISTEMA DE AYUDA INTELIGENTE ===
    getHintFor(questionId, attemptCount = 0) {
        const explanation = this.explanations[questionId];
        if (!explanation) return this.getGenericHint(attemptCount);

        const hintLevel = this.determineHintLevel(attemptCount);
        const hints = explanation.hints || [];

        if (hints.length >= hintLevel + 1) {
            return {
                hint: hints[hintLevel],
                level: hintLevel + 1,
                totalLevels: hints.length,
                isFinalHint: hintLevel === hints.length - 1
            };
        }

        return {
            hint: this.getGenericHint(attemptCount),
            level: 1,
            totalLevels: 1,
            isFinalHint: true
        };
    }

    determineHintLevel(attemptCount) {
        // Niveles progresivos de ayuda basados en intentos
        if (attemptCount === 0) return 0; // Primer hint más general
        if (attemptCount === 1) return 1; // Hint más específico
        return 2; // Hint más directo
    }

    getGenericHint(attemptCount) {
        const genericHints = [
            "💡 Analiza la pregunta cuidadosamente. ¿Qué te están pidiendo exactamente?",
            "🔍 Revisa los conceptos básicos relacionados con este tema.",
            "🎯 Intenta eliminar las opciones que claramente son incorrectas.",
            "📚 ¿Recuerdas las reglas o fórmulas relevantes para este tipo de problema?",
            "🤔 Considera un enfoque diferente si estás atascado."
        ];
        return genericHints[Math.min(attemptCount, genericHints.length - 1)];
    }

    // === SISTEMA DE EXPLICACIONES ADAPTATIVAS ===
    getFullExplanation(questionId, userPerformance = {}) {
        const explanation = this.explanations[questionId];
        if (!explanation) return this.getGenericExplanation();

        const depth = this.determineExplanationDepth(userPerformance);
        
        return this.buildExplanation(explanation, depth);
    }

    determineExplanationDepth(userPerformance) {
        const { correctStreak = 0, totalAttempts = 0, accuracy = 0 } = userPerformance;
        
        if (accuracy < 0.5 || correctStreak === 0) return 'detailed';
        if (accuracy < 0.8) return 'standard';
        return 'brief';
    }

    buildExplanation(explanation, depth) {
        const baseExplanation = `
            <div class="explanation-container">
                <div class="explanation-header">
                    <h3>${explanation.title}</h3>
                    <div class="difficulty-badge difficulty-${explanation.difficulty}">
                        ${this.getDifficultyStars(explanation.difficulty)}
                    </div>
                </div>
                
                <div class="concept-section">
                    <h4>💡 Concepto Clave</h4>
                    <p>${explanation.concept}</p>
                </div>
        `;

        let detailedContent = '';
        
        if (depth === 'detailed') {
            detailedContent = `
                <div class="theory-section">
                    <h4>📚 Teoría Detallada</h4>
                    <p>${explanation.theory}</p>
                </div>
                
                <div class="steps-section">
                    <h4>🔄 Pasos para Resolver</h4>
                    <ol>
                        ${explanation.stepByStep.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="mistakes-section">
                    <h4>⚠️ Errores Comunes</h4>
                    <ul>
                        ${explanation.commonMistakes.map(mistake => `<li>${mistake}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else if (depth === 'standard') {
            detailedContent = `
                <div class="theory-section">
                    <h4>📚 Teoría</h4>
                    <p>${explanation.theory}</p>
                </div>
                
                <div class="steps-section">
                    <h4>🔄 Pasos Clave</h4>
                    <ul>
                        ${explanation.stepByStep.slice(0, 3).map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        const solutionSection = `
            <div class="solution-section">
                <h4>🎯 Solución</h4>
                <div class="solution-box">
                    <p>${explanation.solution}</p>
                </div>
            </div>
            
            <div class="realworld-section">
                <h4>🌍 Aplicación en el Mundo Real</h4>
                <p>${explanation.realWorld}</p>
            </div>
        `;

        return baseExplanation + detailedContent + solutionSection + '</div>';
    }

    getGenericExplanation() {
        return `
            <div class="explanation-container">
                <div class="explanation-header">
                    <h3>Concepto General</h3>
                </div>
                
                <div class="concept-section">
                    <h4>💡 Estrategias de Aprendizaje</h4>
                    <p>Cuando encuentres un problema nuevo:</p>
                    <ul>
                        <li><strong>Analiza</strong> qué te están preguntando</li>
                        <li><strong>Identifica</strong> los conceptos relevantes</li>
                        <li><strong>Aplica</strong> métodos sistemáticos</li>
                        <li><strong>Verifica</strong> tu trabajo</li>
                    </ul>
                </div>
                
                <div class="encouragement-section">
                    <h4>🌟 Sigue Practicando</h4>
                    <p>Cada pregunta que intentas fortalece tu comprensión. ¡No te rindas!</p>
                </div>
            </div>
        `;
    }

    // === ANÁLISIS DE RENDIMIENTO INTELIGENTE ===
    analyzePerformance(questionHistory) {
        const analysis = {
            overallAccuracy: 0,
            byCategory: {},
            byDifficulty: {},
            strengths: [],
            weaknesses: [],
            recommendations: [],
            predictedScore: 0
        };

        // Calcular métricas básicas
        const totalQuestions = questionHistory.length;
        const correctAnswers = questionHistory.filter(q => q.correct).length;
        analysis.overallAccuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

        // Análisis por categoría y dificultad
        questionHistory.forEach(question => {
            const explanation = this.explanations[question.id];
            if (explanation) {
                // Por categoría
                if (!analysis.byCategory[explanation.category]) {
                    analysis.byCategory[explanation.category] = { attempts: 0, correct: 0 };
                }
                analysis.byCategory[explanation.category].attempts++;
                if (question.correct) analysis.byCategory[explanation.category].correct++;

                // Por dificultad
                if (!analysis.byDifficulty[explanation.difficulty]) {
                    analysis.byDifficulty[explanation.difficulty] = { attempts: 0, correct: 0 };
                }
                analysis.byDifficulty[explanation.difficulty].attempts++;
                if (question.correct) analysis.byDifficulty[explanation.difficulty].correct++;
            }
        });

        // Identificar fortalezas y debilidades
        analysis.strengths = this.identifyStrengths(analysis.byCategory);
        analysis.weaknesses = this.identifyWeaknesses(analysis.byCategory);
        analysis.recommendations = this.generateRecommendations(analysis);
        analysis.predictedScore = this.predictSATScore(analysis.overallAccuracy);

        return analysis;
    }

    identifyStrengths(categoryData) {
        const strengths = [];
        Object.entries(categoryData).forEach(([category, data]) => {
            const accuracy = data.attempts > 0 ? (data.correct / data.attempts) * 100 : 0;
            if (accuracy >= 80 && data.attempts >= 3) {
                strengths.push({
                    category,
                    accuracy: Math.round(accuracy),
                    attempts: data.attempts
                });
            }
        });
        return strengths;
    }

    identifyWeaknesses(categoryData) {
        const weaknesses = [];
        Object.entries(categoryData).forEach(([category, data]) => {
            const accuracy = data.attempts > 0 ? (data.correct / data.attempts) * 100 : 0;
            if (accuracy < 60 && data.attempts >= 2) {
                weaknesses.push({
                    category,
                    accuracy: Math.round(accuracy),
                    attempts: data.attempts,
                    priority: accuracy < 40 ? 'high' : accuracy < 60 ? 'medium' : 'low'
                });
            }
        });
        return weaknesses.sort((a, b) => a.accuracy - b.accuracy);
    }

    generateRecommendations(analysis) {
        const recommendations = [];
        
        if (analysis.weaknesses.length > 0) {
            recommendations.push({
                type: 'focus',
                message: `Concéntrate en: ${analysis.weaknesses.map(w => w.category).join(', ')}`,
                priority: 'high'
            });
        }

        if (analysis.overallAccuracy < 70) {
            recommendations.push({
                type: 'foundation',
                message: 'Refuerza conceptos fundamentales antes de avanzar',
                priority: 'high'
            });
        }

        if (analysis.strengths.length > 0) {
            recommendations.push({
                type: 'maintain',
                message: `Mantén tu buen desempeño en: ${analysis.strengths.map(s => s.category).join(', ')}`,
                priority: 'low'
            });
        }

        // Recomendación basada en dificultad
        const hardQuestions = analysis.byDifficulty[3] || { attempts: 0, correct: 0 };
        if (hardQuestions.attempts > 0 && (hardQuestions.correct / hardQuestions.attempts) < 0.4) {
            recommendations.push({
                type: 'strategy',
                message: 'Practica estrategias para preguntas difíciles: elimina opciones, gestiona tiempo',
                priority: 'medium'
            });
        }

        return recommendations;
    }

    predictSATScore(accuracy) {
        // Fórmula simple de predicción (puedes hacerla más sofisticada)
        const baseScore = 400;
        const maxScore = 1600;
        const scoreRange = maxScore - baseScore;
        
        return Math.round(baseScore + (accuracy / 100) * scoreRange);
    }

    // === UTILIDADES ===
    getDifficultyStars(difficulty) {
        return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
    }

    updateLearningProfile(questionId, wasCorrect) {
        const explanation = this.explanations[questionId];
        if (explanation) {
            this.learningProfile.progress[explanation.category].attempts++;
            if (wasCorrect) {
                this.learningProfile.progress[explanation.category].correct++;
            }
        }
        this.learningProfile.lastSession = new Date().toISOString();
    }

    getEncouragement(performance) {
        const encouragements = {
            excellent: [
                "¡Increíble! 🎉 Tu dedicación está dando resultados excelentes.",
                "🌟 Eres una máquina de aprender. ¡Sigue así!",
                "¡Fantástico! Tu comprensión es sólida y consistente."
            ],
            good: [
                "¡Buen trabajo! 📚 Tu progreso es notable.",
                "Vas por buen camino. La práctica constante es clave. 💪",
                "Excelente esfuerzo. Cada pregunta te acerca a tu objetivo."
            ],
            improving: [
                "¡Vas mejorando! 🔥 Sigue practicando y verás más progreso.",
                "Cada error es una oportunidad para aprender. No te rindas. 🌱",
                "La consistencia es más importante que la perfección. ¡Sigue adelante!"
            ],
            needsWork: [
                "¡Tú puedes! 💫 Todos los expertos empezaron como principiantes.",
                "El aprendizaje requiere tiempo y paciencia. Confía en el proceso. 🌟",
                "Cada pequeño paso cuenta. Celebra tu esfuerzo, no solo los resultados."
            ]
        };

        let category = 'needsWork';
        if (performance.overallAccuracy >= 90) category = 'excellent';
        else if (performance.overallAccuracy >= 75) category = 'good';
        else if (performance.overallAccuracy >= 60) category = 'improving';

        const messages = encouragements[category];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // === CONFIGURACIÓN ===
    setHintStyle(style) {
        if (['guided', 'direct', 'socratic'].includes(style)) {
            this.config.hintStyle = style;
        }
    }

    setExplanationDepth(depth) {
        if (['brief', 'standard', 'detailed', 'adaptive'].includes(depth)) {
            this.config.explanationDepth = depth;
        }
    }
}

export { AITutor };