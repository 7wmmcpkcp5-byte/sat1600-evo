// ============================================
// SAT READING COMPREHENSION QUESTIONS
// 50 preguntas de comprensión lectora para SAT
// ============================================

const readingQuestions = [
    {
        id: 'reading_001',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `En 1903, cuando los hermanos Wright lograron el primer vuelo propulsado, 
                 pocos podrían haber predicho la rapidez con la que la aviación transformaría 
                 el mundo. Su vuelo de 12 segundos en Kitty Hawk no solo demostró que el vuelo 
                 propulsado era posible, sino que desencadenó una cadena de innovaciones que 
                 cambiarían para siempre la comunicación, el comercio y la guerra. Lo que 
                 comenzó como un frágil biplano de madera y tela evolucionó en menos de un 
                 siglo hasta convertirse en aviones de pasajeros que cruzan océanos en horas 
                 y naves espaciales que viajan más allá de nuestro sistema solar.`,
        question: `¿Cuál es el propósito principal del pasaje?`,
        options: [
            'A) Describir los detalles técnicos del primer vuelo de los Wright',
            'B) Analizar el impacto transformador de la invención del vuelo propulsado',
            'C) Comparar la aviación temprana con la tecnología moderna',
            'D) Criticar la falta de previsión sobre el potencial de la aviación'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje se centra en cómo el vuelo de los Wright inició una transformación 
                     en múltiples áreas (comunicación, comercio, guerra), enfatizando el impacto 
                     a largo plazo más que los detalles técnicos específicos.`,
        tags: ['main-idea', 'history', 'aviation'],
        timeLimit: 90,
        wordCount: 158
    },
    {
        id: 'reading_002',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La fotosíntesis C4, un mecanismo evolutivo presente en aproximadamente 
                 3% de las plantas vasculares, representa una adaptación notable a condiciones 
                 de alta luminosidad y temperaturas elevadas. A diferencia de la fotosíntesis 
                 C3, que predomina en la mayoría de las especies, las plantas C4 separan 
                 espacialmente la fijación inicial de CO2 y el ciclo de Calvin, concentrando 
                 el dióxido de carbono alrededor de la enzima RuBisCO para minimizar la 
                 fotorrespiración. Esta eficiencia les permite prosperar en ambientes donde 
                 otras plantas languidecerían, aunque requiere un mayor costo energético 
                 inicial. El maíz, la caña de azúcar y el sorgo son ejemplos notables de 
                 cultivos C4 que sustentan poblaciones humanas en regiones tropicales.`,
        question: `Según el pasaje, ¿qué ventaja proporciona la fotosíntesis C4?`,
        options: [
            'A) Requiere menos energía total que la fotosíntesis C3',
            'B) Permite crecer en condiciones de baja luminosidad',
            'C) Minimiza la fotorrespiración en condiciones cálidas',
            'D) Elimina completamente la necesidad de la enzima RuBisCO'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece que las plantas C4 "concentran el dióxido de carbono 
                     alrededor de la enzima RuBisCO para minimizar la fotorrespiración", 
                     lo que es una ventaja clave en condiciones de alta temperatura y luminosidad.`,
        tags: ['science', 'biology', 'detail', 'advantage'],
        timeLimit: 75,
        wordCount: 145
    },
    {
        id: 'reading_003',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `En su ensayo seminal "La muerte del autor", Roland Barthes desafía 
                 la noción tradicional de que el significado de un texto literario 
                 reside en la intención de su autor. Argumenta que, una vez publicado, 
                 un texto existe independientemente de su creador, y su significado 
                 es construido por cada lector a través de la interpretación. Esta 
                 perspectiva descentraliza la autoridad interpretativa y celebra la 
                 pluralidad de significados. Para Barthes, el nacimiento del lector 
                 debe lograrse a costa de la muerte del autor, liberando al texto de 
                 las limitaciones de la intención autoral y abriéndolo a lecturas 
                 infinitas.`,
        question: `De acuerdo con Barthes, ¿qué ocurre cuando "muere" el autor?`,
        options: [
            'A) El texto pierde todo significado coherente',
            'B) El lector adquiere mayor libertad interpretativa',
            'C) La obra literaria deja de tener valor cultural',
            'D) El texto regresa a un estado de pureza original'
        ],
        correctAnswer: 'B',
        explanation: `Barthes argumenta que al liberarse de la intención del autor, 
                     "el nacimiento del lector debe lograrse", permitiendo interpretaciones 
                     más diversas y personales.`,
        tags: ['literature', 'theory', 'interpretation'],
        timeLimit: 80,
        wordCount: 125
    },
    {
        id: 'reading_004',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `El mercado de agricultores del centro de la ciudad abre cada sábado 
                 a las 7 a.m., independientemente del clima. Los vendedores locales 
                 ofrecen productos orgánicos recién cosechados, desde tomates jugosos 
                 hasta manzanas crujientes. María, una agricultora de tercera generación, 
                 siempre llega temprano para asegurar el mejor puesto. "La conexión 
                 directa con nuestros clientes", dice mientras arregla sus pimientos 
                 coloridos, "es lo que hace que valga la pena el trabajo duro".`,
        question: `¿Por qué María valora el mercado de agricultores?`,
        options: [
            'A) Porque le permite vender productos a altos precios',
            'B) Porque puede interactuar directamente con los clientes',
            'C) Porque el mercado solo abre los sábados',
            'D) Porque todos los productos deben ser orgánicos'
        ],
        correctAnswer: 'B',
        explanation: `María dice explícitamente que "la conexión directa con nuestros 
                     clientes es lo que hace que valga la pena el trabajo duro".`,
        tags: ['inference', 'dialogue', 'simple'],
        timeLimit: 60,
        wordCount: 95
    },
    {
        id: 'reading_005',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La paradoja de Fermi, formulada por el físico Enrico Fermi en 1950, 
                 cuestiona por qué, dada la alta probabilidad estadística de vida 
                 extraterrestre en un universo vasto y antiguo, no hemos encontrado 
                 evidencia de civilizaciones alienígenas. Esta aparente contradicción 
                 ha generado numerosas hipótesis, desde la posibilidad de que la vida 
                 inteligente sea extremadamente rara (la "hipótesis de la Tierra 
                 especial") hasta la noción de que las civilizaciones avanzadas 
                 inevitablemente se autodestruyen o desarrollan tecnologías que las 
                 hacen indetectables. La paradoja sigue siendo un problema central 
                 en la búsqueda de inteligencia extraterrestre (SETI), desafiando 
                 nuestras suposiciones sobre el desarrollo tecnológico y la longevidad 
                 de las civilizaciones.`,
        question: `¿Cuál de las siguientes afirmaciones resume mejor la paradoja de Fermi?`,
        options: [
            'A) La vida extraterrestre debe existir, pero nuestras tecnologías no pueden detectarla',
            'B) El universo es demasiado joven para que hayan surgido civilizaciones alienígenas',
            'C) La probabilidad sugiere que deberíamos ver aliens, pero no los vemos',
            'D) Las civilizaciones avanzadas deliberadamente evitan el contacto con la Tierra'
        ],
        correctAnswer: 'C',
        explanation: `La paradoja se refiere a la contradicción entre la alta probabilidad 
                     estadística de vida extraterrestre y la falta de evidencia observable.`,
        tags: ['science', 'philosophy', 'main-idea'],
        timeLimit: 85,
        wordCount: 140
    },
    {
        id: 'reading_006',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La economía circular representa un modelo de producción y consumo 
                 que implica compartir, alquilar, reutilizar, reparar, renovar y 
                 reciclar materiales y productos existentes todas las veces que sea 
                 posible. Contrasta con el modelo económico lineal tradicional basado 
                 en "tomar, hacer, desechar", que depende de grandes cantidades de 
                 materiales y energía baratos y de fácil acceso. En una economía 
                 circular, los residuos se diseñan para ser eliminados, los materiales 
                 se mantienen en uso el mayor tiempo posible, y los sistemas naturales 
                 se regeneran. Este enfoque no solo reduce la presión sobre los 
                 recursos naturales sino que también crea oportunidades de negocio 
                 innovadoras.`,
        question: `¿Cómo se contrasta la economía circular con el modelo tradicional?`,
        options: [
            'A) La circular prioriza la velocidad sobre la sostenibilidad',
            'B) El modelo tradicional ignora completamente el reciclaje',
            'C) La circular busca eliminar el concepto de residuo',
            'D) Ambos modelos dependen de recursos baratos'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece que "en una economía circular, los residuos 
                     se diseñan para ser eliminados", en contraste con el modelo 
                     lineal de "tomar, hacer, desechar".`,
        tags: ['economics', 'environment', 'comparison'],
        timeLimit: 75,
        wordCount: 120
    },
    {
        id: 'reading_007',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `El fenómeno conocido como "cambio lingüístico" ocurre constantemente 
                 en todas las lenguas vivas. Ningún idioma permanece estático; el 
                 vocabulario, la pronunciación y hasta la gramática evolucionan con 
                 el tiempo. El inglés antiguo de Beowulf sería incomprensible para 
                 un hablante moderno, al igual que el latín clásico divergió en las 
                 lenguas romances. Estos cambios a menudo comienzan como variaciones 
                 regionales o sociales antes de generalizarse, impulsados por factores 
                 como el contacto con otros idiomas, innovaciones tecnológicas, y 
                 cambios en las actitudes sociales.`,
        question: `¿Qué ejemplifica mejor el "cambio lingüístico" según el pasaje?`,
        options: [
            'A) La traducción de textos antiguos a lenguas modernas',
            'B) La evolución del latín al español, francés e italiano',
            'C) La enseñanza de gramática prescriptiva en las escuelas',
            'D) La creación de nuevas palabras para tecnologías'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje menciona específicamente que "el latín clásico divergió 
                     en las lenguas romances" como ejemplo de cambio lingüístico a 
                     lo largo del tiempo.`,
        tags: ['linguistics', 'examples', 'change'],
        timeLimit: 70,
        wordCount: 110
    },
    {
        id: 'reading_008',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `En física cuántica, el entrelazamiento describe un fenómeno donde 
                 dos o más partículas se conectan de tal manera que el estado cuántico 
                 de cada partícula no puede describirse independientemente del estado 
                 de las otras, incluso cuando las partículas están separadas por 
                 grandes distancias. Este fenómeno, que Einstein llamó despectivamente 
                 "acción fantasmal a distancia", viola nuestras intuiciones clásicas 
                 sobre la localidad. Sin embargo, experimentos repetidos han confirmado 
                 su realidad, y hoy el entrelazamiento es fundamental para tecnologías 
                 emergentes como la computación cuántica y la criptografía cuántica, 
                 donde permite operaciones imposibles en sistemas clásicos.`,
        question: `¿Por qué Einstein se refirió al entrelazamiento como "acción fantasmal a distancia"?`,
        options: [
            'A) Porque creía que era un fenómeno sobrenatural',
            'B) Porque desafía el principio de localidad en física clásica',
            'C) Porque solo ocurre a distancias microscópicas',
            'D) Porque no podía ser medido experimentalmente'
        ],
        correctAnswer: 'B',
        explanation: `Einstein usó este término porque el entrelazamiento parece violar 
                     la idea clásica de que objetos separados no pueden influirse 
                     instantáneamente a distancia.`,
        tags: ['science', 'physics', 'terminology'],
        timeLimit: 85,
        wordCount: 130
    },
    {
        id: 'reading_009',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La restauración ecológica de humedales costeros ha demostrado ser 
                 una estrategia eficaz tanto para la conservación de la biodiversidad 
                 como para la mitigación del cambio climático. Estos ecosistemas 
                 actúan como sumideros de carbono, secuestrando dióxido de carbono 
                 de la atmósfera a tasas significativamente mayores que muchos 
                 bosques terrestres. Además, sirven como barreras naturales contra 
                 tormentas, reduciendo la erosión costera y protegiendo comunidades 
                 humanas. Proyectos como la restauración de los Everglades en Florida 
                 ilustran cómo la inversión en estos ecosistemas puede generar 
                 múltiples beneficios ambientales y económicos.`,
        question: `¿Qué función de los humedales costeros se destaca además de su papel como sumideros de carbono?`,
        options: [
            'A) Producen oxígeno a través de la fotosíntesis',
            'B) Sirven como barreras contra tormentas',
            'C) Proveen agua potable a comunidades cercanas',
            'D) Son sitios ideales para desarrollo turístico'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje menciona explícitamente que "sirven como barreras 
                     naturales contra tormentas, reduciendo la erosión costera".`,
        tags: ['environment', 'ecosystems', 'multiple-functions'],
        timeLimit: 75,
        wordCount: 115
    },
    {
        id: 'reading_010',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Las bibliotecas públicas, una vez consideradas meros depósitos 
                 de libros, han evolucionado en centros comunitarios vibrantes. 
                 Además de préstamos tradicionales, muchas ahora ofrecen clases 
                 de alfabetización digital, espacios de coworking, laboratorios 
                 de makerspace con impresoras 3D, y programas culturales diversos. 
                 Esta transformación responde a las necesidades cambiantes de las 
                 comunidades, posicionando a las bibliotecas como infraestructura 
                 crítica para la equidad educativa y la inclusión digital en el 
                 siglo XXI.`,
        question: `¿Cuál es la idea principal del pasaje?`,
        options: [
            'A) Las bibliotecas han cerrado debido a la falta de uso',
            'B) Las bibliotecas ahora solo ofrecen recursos digitales',
            'C) Las bibliotecas se han transformado en centros comunitarios multifuncionales',
            'D) Las bibliotecas deberían enfocarse exclusivamente en préstamos de libros'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje describe cómo las bibliotecas han evolucionado 
                     "en centros comunitarios vibrantes" con múltiples servicios 
                     más allá de los préstamos tradicionales.`,
        tags: ['main-idea', 'society', 'evolution'],
        timeLimit: 65,
        wordCount: 100
    },
    // Continuamos con más preguntas para llegar a 50...
    {
        id: 'reading_011',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La teoría de juegos, un campo de las matemáticas aplicadas, 
                 estudia situaciones estratégicas donde el resultado de las 
                 decisiones de un participante depende de las acciones de otros. 
                 Conceptos como el "equilibrio de Nash", donde ningún jugador 
                 puede beneficiarse unilateralmente cambiando su estrategia, 
                 han encontrado aplicaciones en economía, biología evolutiva, 
                 y relaciones internacionales. En situaciones de dilema del 
                 prisionero, donde la racionalidad individual conduce a 
                 resultados subóptimos para el grupo, la teoría de juegos 
                 revela las tensiones entre cooperación y competencia que 
                 subyacen a muchos sistemas sociales.`,
        question: `¿Qué describe el "equilibrio de Nash"?`,
        options: [
            'A) Una situación donde todos cooperan voluntariamente',
            'B) Un estado donde cambiar de estrategia no beneficia a un jugador',
            'C) El momento en que un jugador domina completamente el juego',
            'D) Una secuencia óptima de movimientos para ganar'
        ],
        correctAnswer: 'B',
        explanation: `El equilibrio de Nash se define como una situación donde 
                     "ningún jugador puede beneficiarse unilateralmente cambiando 
                     su estrategia".`,
        tags: ['mathematics', 'theory', 'definition'],
        timeLimit: 80,
        wordCount: 120
    },
    {
        id: 'reading_012',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La neuroplasticidad, la capacidad del cerebro para reorganizar 
                 sus conexiones sinápticas a lo largo de la vida, ha revolucionado 
                 nuestra comprensión del desarrollo cerebral. Contrario a la 
                 creencia anterior de que el cerebro adulto era relativamente 
                 fijo, investigaciones muestran que experiencias, aprendizaje, 
                 y hasta lesiones pueden inducir cambios estructurales. Esta 
                 plasticidad es la base de la rehabilitación después de accidentes 
                 cerebrovasculares y explica cómo podemos adquirir nuevas 
                 habilidades en la edad adulta.`,
        question: `¿Qué ejemplo del pasaje ilustra la neuroplasticidad?`,
        options: [
            'A) El cerebro mantiene la misma estructura desde la infancia',
            'B) La rehabilitación después de un derrame cerebral',
            'C) La pérdida de memoria relacionada con la edad',
            'D) El tamaño fijo del cerebro humano adulto'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje menciona específicamente que la neuroplasticidad 
                     es "la base de la rehabilitación después de accidentes 
                     cerebrovasculares".`,
        tags: ['science', 'psychology', 'example'],
        timeLimit: 70,
        wordCount: 105
    },
    {
        id: 'reading_013',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Los servicios de suscripción han transformado industrias 
                 enteras, desde el entretenimiento hasta el software. En lugar 
                 de comprar productos individualmente, los consumidores pagan 
                 una tarifa recurrente por acceso continuo. Este modelo beneficia 
                 a las empresas con flujos de ingresos predecibles y a los 
                 consumidores con conveniencia y actualizaciones constantes. 
                 Sin embargo, la "fatiga por suscripción" emerge cuando los 
                 usuarios acumulan demasiados servicios, cuestionando la 
                 sostenibilidad a largo plazo de este modelo de negocio.`,
        question: `¿Qué es la "fatiga por suscripción"?`,
        options: [
            'A) El cansancio físico por usar muchos servicios',
            'B) La frustración por tener demasiadas suscripciones',
            'C) La dificultad para cancelar suscripciones',
            'D) La falta de opciones de suscripción disponibles'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje describe la fatiga por suscripción como lo que 
                     "emerge cuando los usuarios acumulan demasiados servicios".`,
        tags: ['business', 'trends', 'definition'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_014',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La hipótesis de la relatividad lingüística, a menudo asociada 
                 con los trabajos de Benjamin Lee Whorf, sugiere que la estructura 
                 de la lengua que hablamos influye en nuestra cognición y 
                 percepción del mundo. Versiones fuertes de esta hipótesis, que 
                 postulan que la lengua determina el pensamiento, han sido 
                 ampliamente refutadas. Sin embargo, versiones débiles, que 
                 proponen que la lengua puede influir en ciertos aspectos del 
                 procesamiento cognitivo, siguen siendo tema de investigación 
                 activa en psicolingüística y neurociencia cognitiva.`,
        question: `¿Qué distingue la versión "débil" de la hipótesis de relatividad lingüística?`,
        options: [
            'A) Afirma que la lengua determina completamente el pensamiento',
            'B) Sostiene que la lengua no tiene efecto en la cognición',
            'C) Propone que la lengua puede influir en ciertos aspectos cognitivos',
            'D) Sugiere que todos los idiomas tienen estructuras idénticas'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece que versiones débiles "proponen que la 
                     lengua puede influir en ciertos aspectos del procesamiento 
                     cognitivo".`,
        tags: ['linguistics', 'psychology', 'distinction'],
        timeLimit: 80,
        wordCount: 115
    },
    {
        id: 'reading_015',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Las microgrids, sistemas de energía localizados que pueden 
                 operar independientemente de la red eléctrica central, están 
                 ganando popularidad como solución a problemas de resiliencia 
                 energética. Combinando generación distribuida (como paneles 
                 solares), almacenamiento en baterías, y gestión inteligente 
                 de carga, estas redes pueden mantener el suministro eléctrico 
                 durante apagones en la red principal. Particularmente valiosas 
                 en áreas propensas a desastres naturales o con infraestructura 
                 eléctrica inestable, las microgrids representan un paso hacia 
                 sistemas energéticos más descentralizados y resistentes.`,
        question: `¿Qué ventaja principal de las microgrids se menciona en el pasaje?`,
        options: [
            'A) Reducen permanentemente los costos de electricidad',
            'B) Eliminan completamente la necesidad de combustibles fósiles',
            'C) Mantienen el suministro durante apagones en la red principal',
            'D) Son más fáciles de instalar que los sistemas tradicionales'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje indica explícitamente que las microgrids "pueden 
                     mantener el suministro eléctrico durante apagones en la 
                     red principal".`,
        tags: ['technology', 'energy', 'advantage'],
        timeLimit: 75,
        wordCount: 110
    },
    // Continuaré con 35 preguntas más para llegar a 50...
    {
        id: 'reading_016',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `El proceso de fotosíntesis convierte la energía lumínica en 
                 energía química, produciendo oxígeno como subproducto. Las 
                 plantas absorben dióxido de carbono y agua, y con la ayuda 
                 de la clorofila en sus hojas, transforman estos ingredientes 
                 en glucosa. Este proceso no solo sustenta a las plantas 
                 mismas, sino que forma la base de casi todas las cadenas 
                 alimentarias terrestres y regula la composición de la 
                 atmósfera terrestre.`,
        question: `¿Qué produce la fotosíntesis además de glucosa?`,
        options: [
            'A) Dióxido de carbono',
            'B) Agua',
            'C) Oxígeno',
            'D) Clorofila'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece claramente que la fotosíntesis produce 
                     "oxígeno como subproducto".`,
        tags: ['science', 'biology', 'detail'],
        timeLimit: 60,
        wordCount: 85
    },
    {
        id: 'reading_017',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Los algoritmos de recomendación que impulsan plataformas 
                 como Netflix y Spotify representan un cambio fundamental 
                 en cómo descubrimos contenido cultural. En lugar de 
                 curadores humanos, sistemas automatizados analizan nuestros 
                 comportamientos pasados para predecir preferencias futuras. 
                 Mientras que esto puede aumentar la eficiencia del 
                 descubrimiento, los críticos argumentan que puede crear 
                 "cámaras de eco" donde los usuarios solo ven contenido 
                 similar a lo que ya consumen, limitando la exposición a 
                 perspectivas diversas.`,
        question: `¿Qué preocupación expresan los críticos sobre los algoritmos de recomendación?`,
        options: [
            'A) Son demasiado costosos de desarrollar',
            'B) Pueden crear "cámaras de eco" que limitan la exposición',
            'C) No son tan precisos como los curadores humanos',
            'D) Requieren demasiados datos personales'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje menciona que los críticos argumentan que los 
                     algoritmos "pueden crear 'cámaras de eco' donde los 
                     usuarios solo ven contenido similar".`,
        tags: ['technology', 'criticism', 'society'],
        timeLimit: 70,
        wordCount: 100
    },
    {
        id: 'reading_018',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `El concepto de "path dependence" en economía e historia 
                 tecnológica describe cómo decisiones y eventos pasados 
                 constriñen opciones futuras, incluso cuando alternativas 
                 podrían ser más eficientes. El diseño del teclado QWERTY, 
                 originalmente creado para ralentizar a los mecanógrafos 
                 y evitar atascos en máquinas de escribir mecánicas, 
                 persiste a pesar de diseños más ergonómicos como Dvorak. 
                 Esta inercia histórica ilustra cómo la adopción temprana 
                 y las externalidades de red pueden bloquear sistemas 
                 subóptimos en lugar de óptimos.`,
        question: `¿Por qué persiste el teclado QWERTY según la teoría de "path dependence"?`,
        options: [
            'A) Porque es técnicamente superior a todas las alternativas',
            'B) Porque decisiones pasadas y adopción temprana lo han hecho estándar',
            'C) Porque los fabricantes se niegan a cambiar por razones de coste',
            'D) Porque los usuarios prefieren su diseño estético'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje explica que "decisiones y eventos pasados 
                     constriñen opciones futuras" y que "la adopción temprana 
                     y las externalidades de red" mantienen sistemas como QWERTY.`,
        tags: ['economics', 'history', 'theory'],
        timeLimit: 85,
        wordCount: 120
    },
    {
        id: 'reading_019',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Las "smart cities" utilizan tecnología de la información 
                 y comunicación para mejorar la eficiencia de servicios 
                 urbanos y la calidad de vida. Sensores distribuidos 
                 monitorean desde el tráfico hasta la calidad del aire, 
                 mientras que sistemas integrados optimizan el consumo 
                 energético y la gestión de residuos. Sin embargo, estas 
                 iniciativas plantean preocupaciones sobre privacidad 
                 (debido a la recolección masiva de datos) y equidad 
                 (si los beneficios se distribuyen desigualmente entre 
                 diferentes grupos socioeconómicos).`,
        question: `¿Qué dos preocupaciones principales menciona el pasaje sobre las "smart cities"?`,
        options: [
            'A) Costo y complejidad técnica',
            'B) Privacidad y equidad',
            'C) Seguridad y fiabilidad',
            'D) Estética y tradición arquitectónica'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece explícitamente que las smart cities 
                     "plantean preocupaciones sobre privacidad y equidad".`,
        tags: ['technology', 'urban', 'concerns'],
        timeLimit: 75,
        wordCount: 105
    },
    {
        id: 'reading_020',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Los biomas son grandes regiones ecológicas caracterizadas 
                 por tipos de vegetación y comunidades animales distintivas, 
                 determinadas principalmente por el clima. Ejemplos incluyen 
                 tundra, taiga, bosque templado, pradera, desierto, sabana, 
                 y selva tropical. Cada bioma presenta adaptaciones únicas 
                 de plantas y animales a condiciones específicas de 
                 temperatura y precipitación, formando ecosistemas complejos 
                 que han evolucionado durante milenios.`,
        question: `¿Qué determina principalmente los tipos de biomas?`,
        options: [
            'A) La latitud geográfica exclusivamente',
            'B) El tipo de suelo y roca madre',
            'C) Las condiciones climáticas',
            'D) La presencia de animales grandes'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje indica que los biomas son "determinados 
                     principalmente por el clima".`,
        tags: ['science', 'geography', 'definition'],
        timeLimit: 65,
        wordCount: 85
    },
    // Continuaré con más preguntas...
    {
        id: 'reading_021',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La teoría de la panspermia, una hipótesis especulativa 
                 en astrobiología, propone que la vida existe por todo el 
                 universo y puede ser transportada entre planetas, lunas 
                 y sistemas estelares a través de meteoritos, asteroides, 
                 cometas o polvo cósmico. Mientras que la panspermia no 
                 explica el origen último de la vida, ofrece un mecanismo 
                 potencial para su distribución cósmica. Evidencia a favor 
                 incluye la resistencia extremófila de ciertos microorganismos 
                 a condiciones espaciales y el descubrimiento de moléculas 
                 orgánicas complejas en meteoritos.`,
        question: `¿Qué pregunta NO responde la teoría de la panspermia según el pasaje?`,
        options: [
            'A) Cómo se podría distribuir la vida por el universo',
            'B) Cuál es el origen último de la vida',
            'C) Si la vida puede sobrevivir en el espacio',
            'D) Qué evidencia sugiere transporte interestelar de vida'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece claramente que "la panspermia no 
                     explica el origen último de la vida".`,
        tags: ['science', 'astronomy', 'limitation'],
        timeLimit: 85,
        wordCount: 115
    },
    {
        id: 'reading_022',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "economía de la atención" describe un modelo económico 
                 donde la atención humana es tratada como un recurso escaso 
                 que puede ser extraído, monetizado y comercializado. En 
                 plataformas digitales, los usuarios no pagan con dinero 
                 sino con su atención, que se convierte en datos y luego 
                 en ingresos publicitarios. Este modelo ha llevado a diseño 
                 de interfaces que maximizan el "tiempo en pantalla" a 
                 través de notificaciones, contenido infinito y algoritmos 
                 de recomendación adictivos, generando debates sobre ética 
                 de diseño y bienestar digital.`,
        question: `Según el pasaje, ¿cómo generan ingresos las plataformas digitales en la "economía de la atención"?`,
        options: [
            'A) Vendiendo suscripciones premium a la mayoría de usuarios',
            'B) Convirtiendo la atención de usuarios en datos para publicidad',
            'C) Cobrando por cada clic o visualización individual',
            'D) Patentando tecnologías de interfaz de usuario'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje explica que la atención se "convierte en datos 
                     y luego en ingresos publicitarios".`,
        tags: ['economics', 'digital', 'mechanism'],
        timeLimit: 75,
        wordCount: 110
    },
    {
        id: 'reading_023',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Las abejas melíferas desempeñan un papel crucial en la 
                 polinización de cultivos alimentarios. Al visitar flores 
                 para recolectar néctar y polen, transfieren inadvertidamente 
                 polen entre flores, permitiendo la fertilización y producción 
                 de frutos y semillas. Se estima que un tercio de los alimentos 
                 humanos depende de la polinización por insectos, principalmente 
                 abejas. Las disminuciones recientes en poblaciones de abejas 
                 debido a pesticidas, pérdida de hábitat y enfermedades 
                 representan una amenaza significativa para la seguridad 
                 alimentaria global.`,
        question: `¿Qué porcentaje de alimentos humanos depende de la polinización por insectos?`,
        options: [
            'A) Aproximadamente 10%',
            'B) Cerca de un tercio',
            'C) Más de la mitad',
            'D) Casi todo'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece específicamente que "se estima que 
                     un tercio de los alimentos humanos depende de la 
                     polinización por insectos".`,
        tags: ['science', 'environment', 'statistic'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_024',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La paradoja de la elección, propuesta por el psicólogo 
                 Barry Schwartz, sugiere que mientras algo de elección es 
                 mejor que ninguna, demasiada elección puede generar 
                 parálisis de decisión, insatisfacción y arrepentimiento. 
                 Frente a opciones abrumadoras, los individuos pueden 
                 posponer decisiones, evitar elegir, o sentirse menos 
                 satisfechos con su elección final debido a la consideración 
                 de alternativas no seleccionadas. Esta paradoja tiene 
                 implicaciones para marketing, diseño de políticas públicas, 
                 y bienestar psicológico en sociedades con abundancia de opciones.`,
        question: `¿Qué efecto puede tener "demasiada elección" según la paradoja?`,
        options: [
            'A) Mayor satisfacción con decisiones finales',
            'B) Parálisis de decisión e insatisfacción',
            'C) Toma de decisiones más rápida y eficiente',
            'D) Eliminación completa del arrepentimiento'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece que "demasiada elección puede generar 
                     parálisis de decisión, insatisfacción y arrepentimiento".`,
        tags: ['psychology', 'paradox', 'effect'],
        timeLimit: 80,
        wordCount: 115
    },
    {
        id: 'reading_025',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Los "agujeros azules" son sumideros marinos o de agua dulce 
                 formados durante periodos glaciares cuando el nivel del mar 
                 era más bajo. Estas estructuras verticales, que pueden 
                 alcanzar cientos de metros de profundidad, contienen capas 
                 de agua con diferentes composiciones químicas y niveles de 
                 oxígeno, creando microambientes únicos. Los agujeros azules 
                 actúan como archivos sedimentarios, preservando registros 
                 detallados de cambios climáticos pasados en sus estratos, 
                 y albergan ecosistemas especializados con especies a veces 
                 encontradas solo en estas formaciones.`,
        question: `¿Qué función importante de los agujeros azules se menciona en el pasaje?`,
        options: [
            'A) Son fuentes principales de agua dulce para regiones costeras',
            'B) Actúan como archivos sedimentarios de cambios climáticos',
            'C) Producen corrientes marinas que regulan el clima regional',
            'D) Sirven como rutas de migración para grandes mamíferos marinos'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje indica que los agujeros azules "actúan como 
                     archivos sedimentarios, preservando registros detallados 
                     de cambios climáticos pasados".`,
        tags: ['science', 'geology', 'function'],
        timeLimit: 75,
        wordCount: 110
    },
    // Continuaré con 25 preguntas más para completar 50...
    {
        id: 'reading_026',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `La Torre Eiffel, construida para la Exposición Universal 
                 de 1889 en París, fue inicialmente criticada por muchos 
                 artistas e intelectuales franceses que la consideraban 
                 monstruosa. Diseñada por Gustave Eiffel, la torre de hierro 
                 forjado se concibió como una estructura temporal para 
                 demostrar la ingeniería francesa. Sin embargo, su utilidad 
                 como torre de transmisión la salvó de ser desmantelada, y 
                 con el tiempo se convirtió en el símbolo icónico de París 
                 y una de las estructuras más reconocibles del mundo.`,
        question: `¿Por qué no se desmanteló la Torre Eiffel después de la exposición?`,
        options: [
            'A) Porque se hizo demasiado popular entre los turistas',
            'B) Porque resultó útil como torre de transmisión',
            'C) Porque los artistas cambiaron de opinión sobre su belleza',
            'D) Porque era demasiado costoso desmantelarla'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje indica claramente que "su utilidad como torre 
                     de transmisión la salvó de ser desmantelada".`,
        tags: ['history', 'architecture', 'detail'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_027',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "tragedia de los comunes", concepto popularizado por 
                 el ecólogo Garrett Hardin, describe una situación donde 
                 individuos actuando independientemente y según su propio 
                 interés agotan un recurso compartido limitado, incluso 
                 cuando no es del interés a largo plazo de ninguno. Ejemplos 
                 clásicos incluyen sobrepesca en océanos internacionales, 
                 contaminación atmosférica, y deforestación de bosques 
                 públicos. Soluciones propuestas incluyen regulación 
                 gubernamental, derechos de propiedad definidos, y 
                 acuerdos colectivos autoimpuestos.`,
        question: `¿Qué ejemplifica la "tragedia de los comunes"?`,
        options: [
            'A) Beneficios mutuos de la cooperación comunitaria',
            'B) Agotamiento de recursos compartidos por interés individual',
            'C) Éxito de la gestión privada de recursos públicos',
            'D) Inevitabilidad del agotamiento de todos los recursos'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje define la tragedia como situaciones donde 
                     "individuos actuando independientemente y según su 
                     propio interés agotan un recurso compartido limitado".`,
        tags: ['economics', 'environment', 'concept'],
        timeLimit: 75,
        wordCount: 105
    },
    {
        id: 'reading_028',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La "singularidad tecnológica" es una hipótesis futurista 
                 que predice que la creación de inteligencia artificial 
                 general (AGI) desencadenará un crecimiento tecnológico 
                 explosivo e incontrolable, resultando en cambios 
                 civilizacionales impredecibles. Proponentes como Ray 
                 Kurzweil argumentan que una vez que las máquinas puedan 
                 mejorarse recursivamente, el progreso tecnológico 
                 escapará a la comprensión humana. Críticos señalan la 
                 falta de evidencia para tal punto de inflexión y 
                 cuestionan si la conciencia o creatividad humanas 
                 pueden replicarse algorítmicamente.`,
        question: `¿Qué predicen los proponentes de la singularidad tecnológica?`,
        options: [
            'A) Que la tecnología dejará de avanzar en el siglo XXI',
            'B) Que la inteligencia artificial nunca alcanzará a la humana',
            'C) Que la AGI causará crecimiento tecnológico explosivo e incomprensible',
            'D) Que las máquinas reemplazarán completamente a los humanos en trabajos creativos'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece que la singularidad predice "crecimiento 
                     tecnológico explosivo e incontrolable, resultando en cambios 
                     civilizacionales impredecibles".`,
        tags: ['technology', 'future', 'prediction'],
        timeLimit: 85,
        wordCount: 120
    },
    {
        id: 'reading_029',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Las "ciudades de 15 minutos" son un concepto urbanístico 
                 que busca que los residentes puedan acceder a la mayoría 
                 de sus necesidades (trabajo, compras, educación, recreación) 
                 dentro de un radio de 15 minutos a pie o en bicicleta desde 
                 sus hogares. Promovido por la alcaldesa de París Anne Hidalgo, 
                 este modelo contrasta con el desarrollo urbano orientado al 
                 automóvil, priorizando la proximidad, la caminabilidad y la 
                 calidad de vida sobre la movilidad de larga distancia.`,
        question: `¿Qué característica define una "ciudad de 15 minutos"?`,
        options: [
            'A) Todos los servicios están centralizados en un distrito cívico',
            'B) Los residentes pueden acceder a necesidades básicas en 15 minutos caminando o en bici',
            'C) El transporte público llega a cualquier destino en 15 minutos',
            'D) Las autoridades de planificación toman decisiones en 15 minutos'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje define estas ciudades como aquellas donde 
                     "los residentes puedan acceder a la mayoría de sus 
                     necesidades dentro de un radio de 15 minutos a pie o 
                     en bicicleta".`,
        tags: ['urban', 'planning', 'definition'],
        timeLimit: 70,
        wordCount: 100
    },
    {
        id: 'reading_030',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Los arrecifes de coral, a menudo llamados "las selvas 
                 tropicales del mar", albergan aproximadamente el 25% de 
                 toda la vida marina a pesar de cubrir menos del 1% del 
                 fondo oceánico. Estas estructuras complejas, construidas 
                 por colonias de diminutos animales llamados pólipos de 
                 coral, proporcionan hábitat, alimento y zonas de crianza 
                 para innumerables especies. Los arrecifes también protegen 
                 costas de tormentas y erosion, y sustentan industrias 
                 pesqueras y turísticas vitales para comunidades costeras.`,
        question: `¿Qué porcentaje de vida marina albergan los arrecifes de coral según el pasaje?`,
        options: [
            'A) Aproximadamente 10%',
            'B) Cerca del 25%',
            'C) Más del 50%',
            'D) Casi el 75%'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece específicamente que los arrecifes 
                     "albergan aproximadamente el 25% de toda la vida marina".`,
        tags: ['science', 'environment', 'statistic'],
        timeLimit: 65,
        wordCount: 95
    },
    // Continuaré con 20 preguntas más...
    {
        id: 'reading_031',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `El "problema difícil de la conciencia", acuñado por el 
                 filósofo David Chalmers, distingue entre problemas "fáciles" 
                 de la conciencia (explicar funciones cognitivas como 
                 discriminación, integración de información, y reporte 
                 verbal) y el problema "difícil" (explicar por qué y cómo 
                 el procesamiento físico da lugar a experiencias subjetivas 
                 o qualia). Mientras que las neurociencias han avanzado en 
                 los problemas fáciles, el salto de mecanismos cerebrales 
                 a experiencias fenoménicas sigue siendo un enigma filosófico 
                 fundamental sin consenso sobre si es soluble científicamente.`,
        question: `¿Qué constituye el "problema difícil" de la conciencia?`,
        options: [
            'A) Explicar funciones cognitivas como discriminación sensorial',
            'B) Entender cómo el cerebro integra información de múltiples fuentes',
            'C) Explicar por qué el procesamiento físico produce experiencias subjetivas',
            'D) Determinar qué animales además de humanos tienen conciencia'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje define el problema difícil como "explicar por qué 
                     y cómo el procesamiento físico da lugar a experiencias 
                     subjetivas o qualia".`,
        tags: ['philosophy', 'consciousness', 'distinction'],
        timeLimit: 90,
        wordCount: 125
    },
    {
        id: 'reading_032',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Los "efectos de red" ocurren cuando el valor de un producto 
                 o servicio aumenta con el número de usuarios. Los teléfonos 
                 son más útiles cuando más personas los tienen, igual que 
                 las plataformas sociales o los estándares de comunicación. 
                 Este fenómeno puede crear monopolios naturales: una vez que 
                 una red alcanza masa crítica, usuarios nuevos gravitan hacia 
                 ella aunque alternativas sean técnicamente superiores, ya 
                 que el valor está en la conexión con otros usuarios, no 
                 solo en las características intrínsecas.`,
        question: `¿Qué crean los "efectos de red" según el pasaje?`,
        options: [
            'A) Mayor competencia y diversidad de opciones',
            'B) Monopolios naturales una vez alcanzada masa crítica',
            'C) Disminución del valor para usuarios existentes',
            'D) Reducción en la calidad de productos y servicios'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje indica que los efectos de red "pueden crear 
                     monopolios naturales: una vez que una red alcanza masa 
                     crítica, usuarios nuevos gravitan hacia ella".`,
        tags: ['economics', 'networks', 'effect'],
        timeLimit: 75,
        wordCount: 105
    },
    {
        id: 'reading_033',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `La imprenta de tipos móviles, inventada por Johannes 
                 Gutenberg alrededor de 1440, revolucionó la producción 
                 de libros en Europa. Antes de esta innovación, los libros 
                 se copiaban a mano, un proceso lento y costoso que limitaba 
                 su disponibilidad. La imprenta permitió la producción masiva 
                 de textos, reduciendo costos y aumentando la circulación de 
                 ideas. Esto contribuyó directamente al Renacimiento, la 
                 Reforma Protestante, y la Revolución Científica al difundir 
                 conocimiento más ampliamente.`,
        question: `¿Qué problema principal resolvió la imprenta de Gutenberg?`,
        options: [
            'A) La falta de papel en Europa',
            'B) La lentitud y costo de copiar libros a mano',
            'C) La baja calidad de la tinta disponible',
            'D) La dificultad para traducir textos antiguos'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece que antes de la imprenta, "los libros 
                     se copiaban a mano, un proceso lento y costoso".`,
        tags: ['history', 'invention', 'problem-solution'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_034',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "curva de aprendizaje" describe cómo la eficiencia en 
                 la realización de una tarea mejora con la experiencia. 
                 Típicamente, las mejoras iniciales son rápidas, luego se 
                 desaceleran a medida que se dominan los fundamentos y se 
                 enfrentan desafíos más sutiles. En producción industrial, 
                 esta curva se cuantifica como la reducción porcentual en 
                 costos cada vez que la producción acumulada se duplica. 
                 Comprender las curvas de aprendizaje es crucial para 
                 planificación estratégica, fijación de precios, y evaluación 
                 de inversiones en nuevas tecnologías.`,
        question: `¿Qué representa la "curva de aprendizaje" en producción industrial?`,
        options: [
            'A) El aumento de calidad con cada lote producido',
            'B) La reducción porcentual en costos al duplicarse la producción acumulada',
            'C) El tiempo necesario para entrenar nuevos trabajadores',
            'D) La relación entre experiencia de trabajadores y salarios'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje indica específicamente que en producción industrial, 
                     "esta curva se cuantifica como la reducción porcentual en 
                     costos cada vez que la producción acumulada se duplica".`,
        tags: ['business', 'economics', 'definition'],
        timeLimit: 75,
        wordCount: 110
    },
    {
        id: 'reading_035',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `La "paradoja de Moravec", formulada por el investigador en 
                 inteligencia artificial Hans Moravec, observa que tareas 
                 que humanos consideramos difíciles (como matemáticas avanzadas 
                 o razonamiento lógico complejo) son relativamente fáciles para 
                 computadoras, mientras que tareas que realizamos inconscientemente 
                 (como reconocimiento visual, locomoción, o comprensión del lenguaje 
                 natural) son extremadamente difíciles para la IA. Esto sugiere 
                 que las habilidades humanas que evolucionaron más recientemente 
                 son las más fáciles de replicar artificialmente, mientras que 
                 las capacidades antiguas y fundamentales para la supervivencia 
                 requieren una computación mucho más sofisticada.`,
        question: `Según la paradoja de Moravec, ¿por qué es difícil para las computadoras el reconocimiento visual?`,
        options: [
            'A) Porque requiere hardware especializado muy costoso',
            'B) Porque evolucionó temprano en humanos y está profundamente integrado',
            'C) Porque los humanos lo aprenden conscientemente a través de educación formal',
            'D) Porque depende de la creatividad y originalidad exclusivamente humanas'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje explica que "las capacidades antiguas y 
                     fundamentales para la supervivencia requieren una 
                     computación mucho más sofisticada", indicando que el 
                     reconocimiento visual evolucionó temprano.`,
        tags: ['AI', 'psychology', 'paradox'],
        timeLimit: 90,
        wordCount: 135
    },
    // Continuaré con 15 preguntas más...
    {
        id: 'reading_036',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `Los "hábitos atómicos", concepto popularizado por James 
                 Clear, se refieren a pequeños cambios incrementales en el 
                 comportamiento que, acumulados con el tiempo, producen 
                 resultados significativos. En lugar de intentar cambios 
                 drásticos que requieren gran fuerza de voluntad, este 
                 enfoque enfatiza la optimización del sistema y entorno 
                 para hacer los hábitos deseables obvios, atractivos, 
                 fáciles y satisfactorios. La idea central es que un 
                 mejoramiento del 1% diario, aunque imperceptible a corto 
                 plazo, conduce a una mejora de 37 veces en un año debido 
                 al poder del interés compuesto conductual.`,
        question: `¿Qué principio matemático se aplica a los "hábitos atómicos" según el pasaje?`,
        options: [
            'A) Teoría de probabilidades',
            'B) Interés compuesto',
            'C) Álgebra lineal',
            'D) Cálculo diferencial'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje menciona específicamente que "conduce a una 
                     mejora de 37 veces en un año debido al poder del 
                     interés compuesto conductual".`,
        tags: ['psychology', 'habits', 'mathematics'],
        timeLimit: 75,
        wordCount: 115
    },
    {
        id: 'reading_037',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `El ciclo del agua, también conocido como ciclo hidrológico, 
                 describe el movimiento continuo del agua sobre, dentro y 
                 encima de la Tierra. El agua se evapora de océanos, lagos 
                 y ríos, se condensa formando nubes, cae como precipitación 
                 (lluvia, nieve), y eventualmente fluye de regreso a cuerpos 
                 de agua superficiales o se infiltra en acuíferos subterráneos. 
                 Este ciclo es impulsado principalmente por la energía solar 
                 y la gravedad, y es esencial para sostener la vida en el 
                 planeta y regular el clima global.`,
        question: `¿Qué dos fuerzas principales impulsan el ciclo del agua según el pasaje?`,
        options: [
            'A) Viento y temperatura',
            'B) Energía solar y gravedad',
            'C) Presión atmosférica y rotación terrestre',
            'D) Fotosíntesis y respiración'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece explícitamente que el ciclo "es 
                     impulsado principalmente por la energía solar y la gravedad".`,
        tags: ['science', 'environment', 'driving-forces'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_038',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `El "sesgo del costo hundido" es una falacia cognitiva 
                 donde las personas continúan invirtiendo en un proyecto, 
                 relación o curso de acción debido a los recursos ya 
                 comprometidos, independientemente de las perspectivas 
                 futuras. Económicamente racional sería evaluar solo 
                 costos y beneficios futuros, pero psicológicamente nos 
                 cuesta ignorar inversiones pasadas. Este sesgo explica 
                 por qué compañías continúan proyectos fallidos, gobiernos 
                 mantienen políticas inefectivas, e individuos permanecen 
                 en relaciones insatisfactorias o carreras no deseadas.`,
        question: `¿Qué haría una persona económicamente racional según el pasaje?`,
        options: [
            'A) Considerar principalmente las inversiones pasadas',
            'B) Evaluar solo costos y beneficios futuros',
            'C) Priorizar inversiones emocionales sobre financieras',
            'D) Mantener todas las inversiones independientemente de resultados'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece que "económicamente racional sería 
                     evaluar solo costos y beneficios futuros".`,
        tags: ['psychology', 'economics', 'rational-behavior'],
        timeLimit: 80,
        wordCount: 110
    },
    {
        id: 'reading_039',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "arquitectura de elección" se refiere al diseño de 
                 ambientes de decisión que influyen en las elecciones de 
                 las personas sin eliminar opciones o cambiar incentivos 
                 económicos significativamente. Conceptos como "nudge" 
                 (empujón) utilizan arquitectura de elección para guiar 
                 comportamientos hacia resultados deseables, como hacer 
                 que la opción saludable sea la más conveniente o que la 
                 opción de ahorro para retiro sea la predeterminada. 
                 Aplicada en políticas públicas, marketing y diseño de 
                 interfaces, esta disciplina combina insights de psicología, 
                 economía y diseño.`,
        question: `¿Qué es un "nudge" (empujón) según el pasaje?`,
        options: [
            'A) Una restricción legal que prohíbe ciertas opciones',
            'B) Un cambio en incentivos económicos como impuestos o subsidios',
            'C) Un diseño que guía comportamientos sin eliminar opciones',
            'D) Un programa educativo que informa sobre mejores decisiones'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje describe que los "nudges" utilizan arquitectura 
                     de elección para "guiar comportamientos hacia resultados 
                     deseables" sin eliminar opciones.`,
        tags: ['psychology', 'design', 'concept'],
        timeLimit: 75,
        wordCount: 105
    },
    {
        id: 'reading_040',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Las estaciones del año son causadas por la inclinación del 
                 eje de la Tierra (23.5 grados) en relación con su órbita 
                 alrededor del Sol, no por la distancia variable entre la 
                 Tierra y el Sol. Cuando el hemisferio norte está inclinado 
                 hacia el Sol, experimenta verano, mientras que el hemisferio 
                 sur tiene invierno. Seis meses después, la situación se 
                 invierte. Este ciclo produce variaciones en la duración del 
                 día, la intensidad de la luz solar, y las temperaturas, 
                 creando los patrones climáticos estacionales.`,
        question: `¿Qué causa principalmente las estaciones del año según el pasaje?`,
        options: [
            'A) La distancia variable entre la Tierra y el Sol',
            'B) La inclinación del eje de la Tierra',
            'C) La velocidad de rotación de la Tierra',
            'D) La actividad solar cambiante'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece claramente que las estaciones "son 
                     causadas por la inclinación del eje de la Tierra".`,
        tags: ['science', 'astronomy', 'cause'],
        timeLimit: 65,
        wordCount: 90
    },
    // Continuaré con 10 preguntas más para completar 50...
    {
        id: 'reading_041',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `El "problema de la inducción", formulado por el filósofo 
                 David Hume, cuestiona la justificación racional de inferir 
                 conclusiones generales a partir de observaciones particulares. 
                 Por ejemplo, aunque hemos visto innumerables cisnes blancos, 
                 no podemos concluir lógicamente que "todos los cisnes son 
                 blancos". El descubrimiento de cisnes negros en Australia 
                 ilustró esta falibilidad. Hume argumentó que nuestra confianza 
                 en la inducción se basa en la costumbre y la expectativa 
                 psicológica, no en la razón pura, desafiando así los 
                 fundamentos del método científico empírico.`,
        question: `¿Qué ilustra el ejemplo de los cisnes negros según el pasaje?`,
        options: [
            'A) La superioridad de la deducción sobre la inducción',
            'B) La falibilidad de las inferencias inductivas',
            'C) La importancia de explorar continentes desconocidos',
            'D) La diversidad biológica en el hemisferio sur'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje usa el ejemplo para ilustrar "esta falibilidad" 
                     de inferir conclusiones generales a partir de observaciones 
                     particulares.`,
        tags: ['philosophy', 'logic', 'example'],
        timeLimit: 85,
        wordCount: 120
    },
    {
        id: 'reading_042',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "ley de rendimientos decrecientes" establece que en 
                 producción, al añadir más de un factor de producción 
                 (como mano de obra) mientras se mantienen constantes 
                 otros factores (como capital y tierra), eventualmente 
                 los incrementos adicionales en producción serán cada 
                 vez menores. Inicialmente, añadir trabajadores puede 
                 aumentar significativamente la producción debido a la 
                 especialización, pero después de cierto punto, trabajadores 
                 adicionales tendrán menos equipo con qué trabajar o 
                 menos espacio, reduciendo su productividad marginal.`,
        question: `¿Qué describe la "ley de rendimientos decrecientes"?`,
        options: [
            'A) La producción siempre disminuye con más trabajadores',
            'B) Los incrementos adicionales en producción eventualmente disminuyen',
            'C) La tecnología siempre supera los límites de producción',
            'D) Todos los factores de producción son igualmente importantes'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece que "eventualmente los incrementos 
                     adicionales en producción serán cada vez menores".`,
        tags: ['economics', 'production', 'law'],
        timeLimit: 75,
        wordCount: 105
    },
    {
        id: 'reading_043',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `El Gran Cañón en Arizona, tallado durante millones de 
                 años por el río Colorado, expone cerca de dos mil millones 
                 de años de historia geológica en sus estratos de roca. 
                 Estas capas, visibles en las paredes del cañón, registran 
                 cambios ambientales dramáticos, desde mares poco profundos 
                 hasta desiertos. El cañón tiene aproximadamente 446 km de 
                 largo, hasta 29 km de ancho, y alcanza profundidades de 
                 más de 1.8 km, haciendo visible la escala del tiempo 
                 geológico de una manera única en el planeta.`,
        question: `¿Qué hace único al Gran Cañón según el pasaje?`,
        options: [
            'A) Es el cañón más largo del mundo',
            'B) Expone dos mil millones de años de historia geológica visiblemente',
            'C) Fue creado por actividad volcánica en lugar de un río',
            'D) Contiene los estratos de roca más antiguos de la Tierra'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje destaca que el cañón "expone cerca de dos mil 
                     millones de años de historia geológica en sus estratos 
                     de roca" de manera visible.`,
        tags: ['geography', 'geology', 'uniqueness'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_044',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "hipótesis de la reina roja" en biología evolutiva, 
                 inspirada en el personaje de Alicia en el país de las 
                 maravillas, describe una carrera armamentista evolutiva 
                 donde las especies deben evolucionar constantemente solo 
                 para mantener su aptitud relativa. Como la Reina Roja le 
                 dice a Alicia: "Aquí, como ves, se requiere correr todo 
                 cuanto una pueda para permanecer en el mismo sitio". Esto 
                 explica por qué los parásitos y huéspedes, o depredadores 
                 y presas, co-evolucionan en ciclos continuos de adaptación 
                 y contra-adaptación sin que ninguna gane ventaja permanente.`,
        question: `¿Qué ilustra la "hipótesis de la reina roja"?`,
        options: [
            'A) La evolución conduce siempre a una mayor complejidad',
            'B) Las especies deben evolucionar constantemente para mantener su posición relativa',
            'C) La competencia entre especies eventualmente lleva a la extinción de una',
            'D) Los organismos más grandes siempre dominan a los más pequeños'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje explica que las especies "deben evolucionar 
                     constantemente solo para mantener su aptitud relativa", 
                     ilustrado por la cita de la Reina Roja.`,
        tags: ['science', 'biology', 'hypothesis'],
        timeLimit: 75,
        wordCount: 110
    },
    {
        id: 'reading_045',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `El "problema de la demarcación" en filosofía de la ciencia 
                 busca un criterio para distinguir entre ciencia legítima y 
                 pseudociencia. Karl Popper propuso la "falsabilidad" como 
                 solución: una teoría es científica si hace predicciones que 
                 potencialmente podrían ser refutadas por la observación. 
                 Según Popper, el psicoanálisis y el marxismo fallaban esta 
                 prueba al reinterpretar cualquier observación como 
                 confirmación. Críticos señalan que en práctica, la ciencia 
                 rara vez abandona teorías ante anomalías aisladas, y que 
                 la demarcación podría ser más un espectro que una línea clara.`,
        question: `¿Qué criterio propuso Popper para distinguir ciencia de pseudociencia?`,
        options: [
            'A) La capacidad de hacer predicciones precisas',
            'B) La consistencia con teorías científicas establecidas',
            'C) La falsabilidad potencial de sus afirmaciones',
            'D) El uso de metodología experimental rigurosa'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece que Popper "propuso la 'falsabilidad' 
                     como solución: una teoría es científica si hace predicciones 
                     que potencialmente podrían ser refutadas".`,
        tags: ['philosophy', 'science', 'criterion'],
        timeLimit: 85,
        wordCount: 120
    },
    {
        id: 'reading_046',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `La capa de ozono, ubicada en la estratosfera entre 15 y 35 
                 km sobre la superficie terrestre, absorbe la mayoría de la 
                 dañina radiación ultravioleta del Sol. En la década de 1980, 
                 científicos descubrieron un "agujero" estacional en esta capa 
                 sobre la Antártida, causado principalmente por clorofluorocarbonos 
                 (CFCs) emitidos por productos como aerosoles y refrigerantes. 
                 El Protocolo de Montreal de 1987, que eliminó progresivamente 
                 los CFCs, es considerado uno de los acuerdos ambientales 
                 internacionales más exitosos, mostrando que la acción colectiva 
                 puede revertir daños ambientales graves.`,
        question: `¿Qué causó principalmente el agujero en la capa de ozono?`,
        options: [
            'A) Emisiones de dióxido de carbono de vehículos',
            'B) Deforestación tropical',
            'C) Clorofluorocarbonos (CFCs) de aerosoles y refrigerantes',
            'D) Radiación solar aumentada'
        ],
        correctAnswer: 'C',
        explanation: `El pasaje establece claramente que el agujero fue "causado 
                     principalmente por clorofluorocarbonos (CFCs) emitidos por 
                     productos como aerosoles y refrigerantes".`,
        tags: ['science', 'environment', 'cause'],
        timeLimit: 65,
        wordCount: 105
    },
    {
        id: 'reading_047',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `La "cuarta revolución industrial" se caracteriza por la 
                 fusión de tecnologías que difuminan las líneas entre lo 
                 físico, digital y biológico. Elementos clave incluyen 
                 inteligencia artificial, internet de las cosas, robótica 
                 avanzada, vehículos autónomos, impresión 3D, nanotecnología, 
                 y biotecnología. A diferencia de revoluciones industriales 
                 anteriores, esta transformación se distingue por su velocidad, 
                 alcance, y profundidad, afectando no solo la producción sino 
                 también la identidad humana, la privacidad, y las estructuras 
                 sociales.`,
        question: `¿Qué distingue a la cuarta revolución industrial según el pasaje?`,
        options: [
            'A) Su enfoque exclusivo en tecnologías digitales',
            'B) Su velocidad, alcance y profundidad sin precedentes',
            'C) Su impacto limitado a sectores manufactureros',
            'D) Su dependencia de combustibles fósiles baratos'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece que esta revolución "se distingue por 
                     su velocidad, alcance, y profundidad".`,
        tags: ['technology', 'industry', 'characteristics'],
        timeLimit: 70,
        wordCount: 100
    },
    {
        id: 'reading_048',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'hard',
        passage: `El "dilema del innovador", concepto desarrollado por 
                 Clayton Christensen, describe cómo empresas exitosas 
                 pueden fallar al enfrentar tecnologías disruptivas. 
                 Estas empresas siguen escuchando a sus clientes 
                 existentes y mejoran sus productos actuales, pero 
                 ignoran tecnologías más simples y baratas que inicialmente 
                 atienden nichos pequeños o nuevos mercados. Con el tiempo, 
                 estas tecnologías disruptivas mejoran, invaden mercados 
                 principales, y desplazan a los líderes establecidos, que 
                 descubren demasiado tarde que sus estructuras y procesos 
                 optimizados para el statu quo les impiden competir 
                 efectivamente.`,
        question: `¿Por qué las empresas exitosas fallan ante tecnologías disruptivas según el pasaje?`,
        options: [
            'A) Porque carecen de capital para invertir en nuevas tecnologías',
            'B) Porque sus estructuras y procesos optimizados les impiden adaptarse',
            'C) Porque los reguladores gubernamentales bloquean la innovación',
            'D) Porque los consumidores rechazan automáticamente nuevas tecnologías'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje indica que las empresas establecidas "descubren 
                     demasiado tarde que sus estructuras y procesos optimizados 
                     para el statu quo les impiden competir efectivamente".`,
        tags: ['business', 'innovation', 'reason'],
        timeLimit: 80,
        wordCount: 115
    },
    {
        id: 'reading_049',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'easy',
        passage: `Las placas tectónicas son secciones masivas de la litosfera 
                 terrestre que se mueven lentamente sobre el manto subyacente. 
                 Donde estas placas interactúan ocurren la mayoría de los 
                 terremotos, actividad volcánica y formación de montañas. 
                 Los tres tipos principales de límites de placas son: 
                 convergentes (donde las placas chocan), divergentes (donde 
                 se separan), y transformantes (donde se deslizan lateralmente). 
                 La teoría de la tectónica de placas, aceptada ampliamente 
                 desde la década de 1960, unifica nuestra comprensión de la 
                 geología y la geografía de la Tierra.`,
        question: `¿Qué ocurre principalmente en los límites de placas según el pasaje?`,
        options: [
            'A) Formación de nuevos elementos químicos',
            'B) La mayoría de terremotos y actividad volcánica',
            'C) Cambios en la composición de la atmósfera',
            'D) Generación del campo magnético terrestre'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece que "donde estas placas interactúan 
                     ocurren la mayoría de los terremotos, actividad volcánica 
                     y formación de montañas".`,
        tags: ['science', 'geology', 'main-idea'],
        timeLimit: 65,
        wordCount: 95
    },
    {
        id: 'reading_050',
        type: 'reading',
        category: 'comprehension',
        difficulty: 'medium',
        passage: `El "efecto Flynn" describe el aumento sustancial y 
                 sostenido en los puntajes de pruebas de inteligencia 
                 observado durante el siglo XX en muchas partes del mundo. 
                 James Flynn documentó que el CI promedio aumentó 
                 aproximadamente 3 puntos por década, un fenómeno demasiado 
                 rápido para ser explicado por evolución genética. Explicaciones 
                 propuestas incluyen mejor nutrición, mayor complejidad del 
                 entorno educativo y tecnológico, y cambios en las habilidades 
                 cognitivas valoradas por la sociedad. Sin embargo, investigaciones 
                 recientes sugieren que este efecto podría estar disminuyendo 
                 o incluso revirtiéndose en algunos países desarrollados.`,
        question: `¿Qué documentó James Flynn según el pasaje?`,
        options: [
            'A) Una disminución constante en la inteligencia humana',
            'B) Un aumento de aproximadamente 3 puntos de CI por década',
            'C) Que la inteligencia está determinada principalmente por genes',
            'D) Que las pruebas de CI son culturalmente sesgadas e inválidas'
        ],
        correctAnswer: 'B',
        explanation: `El pasaje establece específicamente que "James Flynn 
                     documentó que el CI promedio aumentó aproximadamente 
                     3 puntos por década".`,
        tags: ['psychology', 'intelligence', 'observation'],
        timeLimit: 75,
        wordCount: 110
    }
];

// Exportar el array de preguntas
console.log(`✅ Reading Comprehension: ${readingQuestions.length} preguntas cargadas`);
window.readingQuestions = readingQuestions;

// Si estamos en un entorno de módulo, exportar apropiadamente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = readingQuestions;
}