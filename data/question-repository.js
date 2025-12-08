m// Añadir al principio del archivo question-repository.js (después de las importaciones existentes):

// Importar las nuevas preguntas (asumiendo que están en la misma estructura)
// En un entorno real, esto se haría con import/export, pero como estamos en navegador:

// Después de las definiciones existentes, añadir:

// Método para cargar preguntas de Reading
function loadReadingQuestions() {
    console.log('📚 Cargando preguntas de Reading...');
    
    // Si readingQuestions está disponible en window, úsalo
    if (window.readingQuestions && Array.isArray(window.readingQuestions)) {
        return window.readingQuestions;
    }
    
    // Si no, crear algunas preguntas de respaldo
    console.warn('⚠️ No se encontraron preguntas de Reading, creando preguntas de respaldo...');
    
    const backupReadingQuestions = [
        {
            id: 'reading_backup_001',
            type: 'reading',
            category: 'comprehension',
            difficulty: 'medium',
            passage: `La fotosíntesis es el proceso por el cual las plantas convierten la energía lumínica en energía química.`,
            question: `¿Qué proceso realizan las plantas para obtener energía?`,
            options: [
                'A) Respiración celular',
                'B) Fotosíntesis',
                'C) Fermentación',
                'D) Digestión'
            ],
            correctAnswer: 'B',
            explanation: `La fotosíntesis es específicamente el proceso por el cual las plantas convierten luz solar en energía química.`,
            tags: ['science', 'biology', 'backup']
        }
        // ... más preguntas de respaldo si es necesario
    ];
    
    return backupReadingQuestions;
}

// Método para cargar preguntas de Writing
function loadWritingQuestions() {
    console.log('📝 Cargando preguntas de Writing...');
    
    // Si writingQuestions está disponible en window, úsalo
    if (window.writingQuestions && Array.isArray(window.writingQuestions)) {
        return window.writingQuestions;
    }
    
    // Si no, crear algunas preguntas de respaldo
    console.warn('⚠️ No se encontraron preguntas de Writing, creando preguntas de respaldo...');
    
    const backupWritingQuestions = [
        {
            id: 'writing_backup_001',
            type: 'writing',
            category: 'grammar',
            difficulty: 'medium',
            passage: `The team ______ working on the project since last month.`,
            question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
            options: [
                'A) is',
                'B) are',
                'C) has been',
                'D) have been'
            ],
            correctAnswer: 'C',
            explanation: `"Team" is a collective noun that can be singular. With "since last month," present perfect continuous "has been" is correct.`,
            tags: ['grammar', 'backup']
        }
        // ... más preguntas de respaldo si es necesario
    ];
    
    return backupWritingQuestions;
}

// Actualizar el método getQuestionsByCategory para incluir las nuevas categorías
// Buscar en el código existente el método getQuestionsByCategory y actualizarlo:

// En la clase QuestionRepository, actualizar el método:
getQuestionsByCategory(category, count = 10, difficulty = 'all') {
    let questions = [];
    
    switch(category.toLowerCase()) {
        case 'math':
            questions = [...this.mathQuestions];
            break;
        case 'algebra':
            questions = this.mathQuestions.filter(q => q.subcategory === 'algebra' || q.tags?.includes('algebra'));
            break;
        case 'geometry':
            questions = this.mathQuestions.filter(q => q.subcategory === 'geometry' || q.tags?.includes('geometry'));
            break;
        case 'data-analysis':
            questions = this.mathQuestions.filter(q => q.subcategory === 'data-analysis' || q.tags?.includes('data'));
            break;
        case 'reading':
            questions = loadReadingQuestions(); // Nuevo
            break;
        case 'writing':
            questions = loadWritingQuestions(); // Nuevo
            break;
        default:
            console.warn(`Categoría no reconocida: ${category}`);
            // Combinar todas las preguntas para categorías no específicas
            questions = [
                ...this.mathQuestions,
                ...loadReadingQuestions(),
                ...loadWritingQuestions()
            ];
    }
    
    // Filtrar por dificultad si se especifica
    if (difficulty !== 'all') {
        questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Mezclar y limitar
    questions = this.shuffleArray(questions);
    
    return questions.slice(0, count);
}

// También actualizar el método getTotalQuestionsCount:
getTotalQuestionsCount() {
    const mathCount = this.mathQuestions.length;
    const readingCount = loadReadingQuestions().length;
    const writingCount = loadWritingQuestions().length;
    
    return {
        math: mathCount,
        reading: readingCount,
        writing: writingCount,
        total: mathCount + readingCount + writingCount
    };
}

// Actualizar el método getNextQuestion para incluir las nuevas categorías:
getNextQuestion(options = {}) {
    const {
        categories = ['math', 'reading', 'writing'],
        difficulty = 'adaptive',
        excludeIds = []
    } = options;
    
    // Combinar preguntas de las categorías solicitadas
    let pool = [];
    
    categories.forEach(category => {
        const categoryQuestions = this.getQuestionsByCategory(category, 100, difficulty);
        pool = [...pool, ...categoryQuestions];
    });
    
    // Excluir preguntas ya vistas
    pool = pool.filter(q => !excludeIds.includes(q.id));
    
    if (pool.length === 0) {
        // Si no hay preguntas disponibles, reiniciar el pool sin exclusiones
        pool = [];
        categories.forEach(category => {
            const categoryQuestions = this.getQuestionsByCategory(category, 100, difficulty);
            pool = [...pool, ...categoryQuestions];
        });
    }
    
    // Mezclar y seleccionar una
    pool = this.shuffleArray(pool);
    
    return pool.length > 0 ? pool[0] : null;
}