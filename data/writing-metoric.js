// writing-meteoric.js - Banco completo de 50 preguntas de Writing & Language nivel avanzado
// ID: wm_001 a wm_050
// Dificultad: TODAS preguntas nivel medio-difícil a difícil (SAT 650+)
// Tiempo estimado: 45-60 segundos por pregunta
// Enfoque: Gramática avanzada, retórica, estilo, concisión, coherencia

export const WRITING_METEORIC_QUESTIONS = [
    // ==================== SECCIÓN 1: GRAMÁTICA AVANZADA (15 preguntas) ====================
    {
        id: "wm_001",
        text: "The committee, composed of experts from various fields, ______ their findings tomorrow.",
        options: [
            "will present",
            "presents",
            "is presenting",
            "are presenting"
        ],
        correctIndex: 0,
        explanation: "Singular collective noun 'committee' takes singular verb. 'Will present' is correct future tense.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_002",
        text: "Between you and ______, the project needs more funding.",
        options: ["I", "me", "myself", "mine"],
        correctIndex: 1,
        explanation: "Object of preposition 'between' requires object pronoun 'me'.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 45
    },
    {
        id: "wm_003",
        text: "Had I known about the traffic, I ______ left earlier.",
        options: [
            "would have",
            "would of",
            "should of",
            "could of"
        ],
        correctIndex: 0,
        explanation: "Third conditional requires 'would have + past participle'.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "hard",
        timeEstimate: 55
    },
    {
        id: "wm_004",
        text: "Neither the students nor the teacher ______ prepared for the surprise test.",
        options: ["was", "were", "have been", "are"],
        correctIndex: 0,
        explanation: "With 'neither/nor', verb agrees with nearer subject ('teacher' - singular).",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_005",
        text: "The data ______ compelling evidence for the theory.",
        options: ["provides", "provide", "are providing", "have provided"],
        correctIndex: 0,
        explanation: "'Data' is typically treated as singular in formal writing.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_006",
        text: "If he ______ harder, he would have passed the exam.",
        options: ["studied", "had studied", "would study", "studies"],
        correctIndex: 1,
        explanation: "Third conditional requires past perfect in 'if' clause.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "hard",
        timeEstimate: 55
    },
    {
        id: "wm_007",
        text: "The CEO, along with her assistants, ______ attending the conference.",
        options: ["is", "are", "were", "have been"],
        correctIndex: 0,
        explanation: "Subject 'CEO' is singular; 'along with' doesn't create compound subject.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_008",
        text: "Each of the employees ______ received a bonus.",
        options: ["has", "have", "are", "were"],
        correctIndex: 0,
        explanation: "'Each' is singular, requires singular verb 'has'.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 45
    },
    {
        id: "wm_009",
        text: "The number of applicants ______ significantly this year.",
        options: ["has increased", "have increased", "are increasing", "increase"],
        correctIndex: 0,
        explanation: "'The number' is singular; 'a number' would be plural.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "hard",
        timeEstimate: 55
    },
    {
        id: "wm_010",
        text: "She is one of those people who ______ always punctual.",
        options: ["is", "are", "was", "were"],
        correctIndex: 1,
        explanation: "Relative pronoun 'who' refers to 'people' (plural), so verb must be plural.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_011",
        text: "The jury ______ divided in their opinions.",
        options: ["was", "were", "has", "have"],
        correctIndex: 1,
        explanation: "When collective noun members act individually, use plural verb.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_012",
        text: "I wish I ______ more time to prepare.",
        options: ["had", "have", "would have", "will have"],
        correctIndex: 0,
        explanation: "Wish about present uses past tense ('had' = simple past of 'have').",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_013",
        text: "The committee ______ on this issue for months.",
        options: ["has deliberated", "have deliberated", "are deliberating", "deliberates"],
        correctIndex: 0,
        explanation: "Singular collective noun with ongoing action; 'has deliberated' is correct.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_014",
        text: "Ten dollars ______ too much for a cup of coffee.",
        options: ["is", "are", "were", "have been"],
        correctIndex: 0,
        explanation: "Amounts of money as a unit take singular verbs.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 45
    },
    {
        id: "wm_015",
        text: "Mathematics ______ her favorite subject.",
        options: ["is", "are", "were", "have been"],
        correctIndex: 0,
        explanation: "Academic subjects ending in -ics usually take singular verbs.",
        section: "writing",
        category: "grammar_advanced",
        difficulty: "medium",
        timeEstimate: 45
    },

    // ==================== SECCIÓN 2: CONCISIÓN Y ESTILO (15 preguntas) ====================
    {
        id: "wm_016",
        text: "The reason we are late is because of traffic.",
        options: [
            "is because of",
            "is due to",
            "is that there is",
            "is"
        ],
        correctIndex: 3,
        explanation: "Most concise: 'The reason we are late is traffic.' Avoid 'reason is because' (redundant).",
        section: "writing",
        category: "concision",
        difficulty: "hard",
        timeEstimate: 55
    },
    {
        id: "wm_017",
        text: "In the event that it rains, the picnic will be canceled.",
        options: [
            "In the event that it rains,",
            "If it happens to rain,",
            "Should it rain,",
            "If rain occurs,"
        ],
        correctIndex: 2,
        explanation: "'Should it rain' is most concise and formal.",
        section: "writing",
        category: "concision",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_018",
        text: "The company plans to completely eliminate all unnecessary expenses.",
        options: [
            "completely eliminate all",
            "eliminate all",
            "totally eliminate",
            "eliminate completely all"
        ],
        correctIndex: 1,
        explanation: "'Eliminate all' is sufficient; 'completely' is redundant with 'eliminate'.",
        section: "writing",
        category: "concision",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_019",
        text: "At this point in time, we cannot make a decision.",
        options: [
            "At this point in time,",
            "At this time,",
            "Now,",
            "Currently,"
        ],
        correctIndex: 2,
        explanation: "'Now' is the most concise option.",
        section: "writing",
        category: "concision",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_020",
        text: "The two twins look exactly identical.",
        options: [
            "exactly identical",
            "identical",
            "exactly the same",
            "completely identical"
        ],
        correctIndex: 1,
        explanation: "'Identical' means exactly the same; 'exactly' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "wm_021",
        text: "She has a tendency to frequently interrupt others.",
        options: [
            "has a tendency to frequently interrupt",
            "tends to frequently interrupt",
            "has a tendency to interrupt",
            "tends to interrupt"
        ],
        correctIndex: 3,
        explanation: "Most concise: 'She tends to interrupt others.'",
        section: "writing",
        category: "concision",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_022",
        text: "The end result was surprising to everyone.",
        options: [
            "The end result",
            "The final result",
            "The result",
            "The ultimate result"
        ],
        correctIndex: 2,
        explanation: "'Result' implies finality; 'end' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "wm_023",
        text: "He proceeded to advance toward the door.",
        options: [
            "proceeded to advance toward",
            "advanced toward",
            "proceeded toward",
            "went toward"
        ],
        correctIndex: 1,
        explanation: "'Advanced toward' is concise; 'proceeded to advance' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_024",
        text: "The consensus of opinion was unanimous.",
        options: [
            "consensus of opinion was unanimous",
            "consensus was",
            "opinion was unanimous",
            "unanimous consensus was"
        ],
        correctIndex: 1,
        explanation: "'Consensus' implies general agreement; 'of opinion' and 'unanimous' are redundant.",
        section: "writing",
        category: "concision",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_025",
        text: "We must cooperate together to solve this problem.",
        options: [
            "cooperate together",
            "cooperate",
            "work together",
            "collaborate together"
        ],
        correctIndex: 1,
        explanation: "'Cooperate' means to work together; 'together' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "wm_026",
        text: "The modern technology of today is rapidly changing.",
        options: [
            "The modern technology of today",
            "Today's modern technology",
            "Modern technology",
            "Today's technology"
        ],
        correctIndex: 2,
        explanation: "'Modern technology' implies current; 'of today' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_027",
        text: "I personally believe that climate change is real.",
        options: [
            "personally believe that",
            "believe that personally",
            "believe that",
            "personally think that"
        ],
        correctIndex: 2,
        explanation: "'Believe' implies personal opinion; 'personally' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_028",
        text: "The future prospects look promising.",
        options: [
            "future prospects",
            "prospects",
            "future outlook",
            "prospects for the future"
        ],
        correctIndex: 1,
        explanation: "'Prospects' implies future possibilities; 'future' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "wm_029",
        text: "We need to completely finish the project by Friday.",
        options: [
            "completely finish",
            "finish",
            "totally complete",
            "finish completely"
        ],
        correctIndex: 1,
        explanation: "'Finish' means to bring to completion; 'completely' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "wm_030",
        text: "The unexpected surprise delighted everyone.",
        options: [
            "unexpected surprise",
            "surprise",
            "unexpected event",
            "surprising surprise"
        ],
        correctIndex: 1,
        explanation: "'Surprise' implies unexpectedness; 'unexpected' is redundant.",
        section: "writing",
        category: "concision",
        difficulty: "easy",
        timeEstimate: 45
    },

    // ==================== SECCIÓN 3: COHERENCIA Y ORGANIZACIÓN (10 preguntas) ====================
    {
        id: "wm_031",
        text: "[1] The experiment yielded interesting results. [2] However, the sample size was small. [3] Therefore, further research is needed. Which sentence should come first?",
        options: [
            "Sentence 1",
            "Sentence 2",
            "Sentence 3",
            "All are in correct order"
        ],
        correctIndex: 0,
        explanation: "Logical order: State results first (1), then limitation (2), then conclusion (3).",
        section: "writing",
        category: "coherence",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_032",
        text: "Which transitional word best connects these ideas: 'The data supports the hypothesis; ______, we cannot rule out alternative explanations.'",
        options: ["however", "therefore", "consequently", "moreover"],
        correctIndex: 0,
        explanation: "'However' shows contrast between supporting evidence and remaining uncertainty.",
        section: "writing",
        category: "coherence",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_033",
        text: "Where should this sentence be placed? 'This discovery revolutionized the field of medicine.'",
        options: [
            "Before discussing previous research",
            "After describing the discovery",
            "In the conclusion",
            "As the first sentence"
        ],
        correctIndex: 1,
        explanation: "Should follow description of the discovery to explain its significance.",
        section: "writing",
        category: "coherence",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_034",
        text: "Which sentence would best conclude this paragraph about climate change?",
        options: [
            "Climate change has been studied for decades.",
            "Therefore, immediate action is necessary to mitigate its effects.",
            "Some people still deny climate change exists.",
            "The Earth's climate has always been changing."
        ],
        correctIndex: 1,
        explanation: "Strong conclusion that follows from evidence and calls for action.",
        section: "writing",
        category: "coherence",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_035",
        text: "Which is the best topic sentence for a paragraph about renewable energy?",
        options: [
            "Solar panels are made of silicon.",
            "Renewable energy sources offer sustainable alternatives to fossil fuels.",
            "Wind turbines can be noisy.",
            "Many countries use hydroelectric power."
        ],
        correctIndex: 1,
        explanation: "Effective topic sentence introduces main idea that can be developed with examples.",
        section: "writing",
        category: "coherence",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_036",
        text: "Which sentence is off-topic in a paragraph about Shakespeare's influence?",
        options: [
            "His plays introduced thousands of words to the English language.",
            "Modern writers continue to adapt his works.",
            "He was born in Stratford-upon-Avon in 1564.",
            "His complex characters explore universal human experiences."
        ],
        correctIndex: 2,
        explanation: "Biographical detail is less relevant to paragraph about influence.",
        section: "writing",
        category: "coherence",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_037",
        text: "Which transition best shows cause and effect?",
        options: ["Similarly", "Nevertheless", "As a result", "In contrast"],
        correctIndex: 2,
        explanation: "'As a result' indicates that one thing caused another.",
        section: "writing",
        category: "coherence",
        difficulty: "easy",
        timeEstimate: 45
    },
    {
        id: "wm_038",
        text: "Where should this sentence be inserted? 'This process is known as photosynthesis.'",
        options: [
            "After defining photosynthesis",
            "Before mentioning plants",
            "In a different paragraph",
            "As the opening sentence"
        ],
        correctIndex: 0,
        explanation: "Should follow description of the process to name it.",
        section: "writing",
        category: "coherence",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_039",
        text: "Which sentence provides the best evidence for the claim: 'Exercise improves mental health.'",
        options: [
            "Many people enjoy exercising.",
            "Studies show reduced depression rates among regular exercisers.",
            "Gym memberships can be expensive.",
            "Some exercises are better than others."
        ],
        correctIndex: 1,
        explanation: "Provides specific research evidence supporting the claim.",
        section: "writing",
        category: "coherence",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_040",
        text: "How should these sentences be ordered? A. First, gather your materials. B. Finally, review your work. C. Next, follow the instructions carefully.",
        options: [
            "A, C, B",
            "C, A, B",
            "B, A, C",
            "A, B, C"
        ],
        correctIndex: 0,
        explanation: "Chronological order: First (A), Next (C), Finally (B).",
        section: "writing",
        category: "coherence",
        difficulty: "easy",
        timeEstimate: 50
    },

    // ==================== SECCIÓN 4: TONO Y ESTILO AVANZADO (10 preguntas) ====================
    {
        id: "wm_041",
        text: "Which revision best maintains formal tone? 'The guys in the lab did some cool experiments.'",
        options: [
            "The researchers conducted innovative experiments.",
            "The dudes in the lab performed neat experiments.",
            "The scientists did some awesome tests.",
            "The lab guys conducted cool experiments."
        ],
        correctIndex: 0,
        explanation: "Uses formal vocabulary: 'researchers', 'conducted', 'innovative'.",
        section: "writing",
        category: "tone",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_042",
        text: "Which sentence is most appropriate for academic writing?",
        options: [
            "The results were, like, totally unexpected.",
            "The findings were surprisingly counterintuitive.",
            "We were really shocked by what we found.",
            "You won't believe what happened next."
        ],
        correctIndex: 1,
        explanation: "Uses precise, formal language appropriate for academic context.",
        section: "writing",
        category: "tone",
        difficulty: "easy",
        timeEstimate: 50
    },
    {
        id: "wm_043",
        text: "Which version is most precise? 'The thing affected the stuff.'",
        options: [
            "The chemical altered the solution's composition.",
            "The thing changed the stuff.",
            "It made a difference to the material.",
            "The element modified the substance."
        ],
        correctIndex: 0,
        explanation: "Uses specific terminology: 'chemical', 'altered', 'solution's composition'.",
        section: "writing",
        category: "tone",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_044",
        text: "Which sentence uses the most effective parallel structure?",
        options: [
            "She enjoys hiking, swimming, and to bike.",
            "She enjoys to hike, swimming, and biking.",
            "She enjoys hiking, swimming, and biking.",
            "She enjoys to hike, to swim, and biking."
        ],
        correctIndex: 2,
        explanation: "All items in series are gerunds: hiking, swimming, biking.",
        section: "writing",
        category: "tone",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_045",
        text: "Which sentence has the most appropriate tone for a business proposal?",
        options: [
            "This idea is super amazing and will make tons of money.",
            "Our innovative approach offers significant ROI potential.",
            "We think this might possibly work pretty well.",
            "You'd be crazy not to invest in this awesome opportunity."
        ],
        correctIndex: 1,
        explanation: "Professional, confident language with business terminology.",
        section: "writing",
        category: "tone",
        difficulty: "medium",
        timeEstimate: 55
    },
    {
        id: "wm_046",
        text: "Which revision eliminates wordiness? 'In spite of the fact that it was raining, we decided to go ahead with the picnic.'",
        options: [
            "Despite the rain, we proceeded with the picnic.",
            "Although it was raining, we decided to go ahead with the picnic.",
            "Even though it was raining, we decided to have the picnic.",
            "We decided to have the picnic even though it was raining."
        ],
        correctIndex: 0,
        explanation: "Most concise: 'Despite the rain, we proceeded with the picnic.'",
        section: "writing",
        category: "tone",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_047",
        text: "Which sentence uses the subjunctive mood correctly?",
        options: [
            "I suggest that he goes to the meeting.",
            "I suggest that he go to the meeting.",
            "I suggest that he will go to the meeting.",
            "I suggest that he should go to the meeting."
        ],
        correctIndex: 1,
        explanation: "After verbs like 'suggest', use base form of verb (subjunctive).",
        section: "writing",
        category: "tone",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_048",
        text: "Which sentence is most rhetorically effective?",
        options: [
            "The policy has some negative aspects.",
            "The policy is problematic in several respects.",
            "The policy is an unmitigated disaster.",
            "The policy raises serious concerns."
        ],
        correctIndex: 3,
        explanation: "Strong but measured language appropriate for formal criticism.",
        section: "writing",
        category: "tone",
        difficulty: "hard",
        timeEstimate: 60
    },
    {
        id: "wm_049",
        text: "Which version uses active voice most effectively?",
        options: [
            "The report was written by the committee.",
            "The committee wrote the report.",
            "It was decided by the committee to write a report.",
            "A report was produced by the committee."
        ],
        correctIndex: 1,
        explanation: "Active voice: subject (committee) performs action (wrote).",
        section: "writing",
        category: "tone",
        difficulty: "medium",
        timeEstimate: 50
    },
    {
        id: "wm_050",
        text: "Which sentence demonstrates the most sophisticated syntax?",
        options: [
            "He left. He was tired.",
            "Because he was tired, he left.",
            "He left because he was tired.",
            "Being tired, he left."
        ],
        correctIndex: 1,
        explanation: "Complex sentence with subordinate clause showing cause-effect relationship elegantly.",
        section: "writing",
        category: "tone",
        difficulty: "hard",
        timeEstimate: 60
    }
];