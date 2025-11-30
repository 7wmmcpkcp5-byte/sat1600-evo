// Sistema de Navegación SPA mejorado
setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            this.showView(section);
            
            // Analytics de navegación
            this.analytics.trackNavigation(section);
        });
    });
}

// Modo Examen con temporizador profesional
startExam() {
    this.examTimer = 32 * 60; // 32 minutos en segundos
    this.updateTimerDisplay();
    
    this.timerInterval = setInterval(() => {
        this.examTimer--;
        this.updateTimerDisplay();
        
        if (this.examTimer <= 0) {
            this.finishExam();
        }
    }, 1000);
    
    this.renderExamNavigation();
    this.renderExamQuestion(0);
}

// Sistema de scoring SAT realista
calculateSATScore(correctAnswers, totalQuestions) {
    const rawScore = Math.max(0, correctAnswers - (0.25 * (totalQuestions - correctAnswers)));
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    // Algoritmo de scaled score 200-800
    let scaledScore = 200 + Math.round((percentage / 100) * 600);
    
    // Ajuste basado en dificultad (simulado)
    const difficultyFactor = this.calculateDifficultyFactor();
    scaledScore = Math.min(800, Math.max(200, scaledScore + difficultyFactor));
    
    return {
        rawScore: Math.round(rawScore * 100) / 100,
        percentage: Math.round(percentage * 100) / 100,
        scaledScore: scaledScore
    };
}
