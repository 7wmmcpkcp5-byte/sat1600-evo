const readingQuestions = [
  // === COMPRENSIÓN LECTORA (50 preguntas) ===
  
  // Reading Comprehension - Fácil (17 preguntas)
  {
    id: 1,
    question: "Based on the passage, the author's primary purpose is to:",
    options: [
      "Criticize traditional educational methods",
      "Advocate for experiential learning approaches", 
      "Describe the history of pedagogical theory",
      "Compare different learning styles"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The passage consistently emphasizes the benefits of hands-on, experiential learning over traditional methods."
  },
  {
    id: 2,
    question: "The author mentions 'the Industrial Revolution' primarily to:",
    options: [
      "Provide historical context for technological advancement",
      "Critique capitalist economic systems",
      "Compare past and present manufacturing techniques",
      "Illustrate a major shift in human society"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The Industrial Revolution is used as an example of a transformative period that changed social structures."
  },
  {
    id: 3,
    question: "The tone of the passage can best be described as:",
    options: ["Neutral and informative", "Sarcastic and critical", "Enthusiastic and promotional", "Pessimistic and concerned"],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "easy", 
    explanation: "The author presents facts and information without obvious emotional bias or agenda."
  },
  {
    id: 4,
    question: "The main argument of the passage is that:",
    options: [
      "Technology has improved communication but reduced privacy",
      "Social media has fundamentally changed human interaction",
      "Digital literacy should be required in schools",
      "Traditional media is becoming obsolete"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The passage focuses specifically on how social media platforms have altered the nature of human relationships and communication."
  },
  {
    id: 5,
    question: "The author uses the example of 'the printing press' to:",
    options: [
      "Demonstrate how technology can spread misinformation",
      "Provide a historical parallel to current technological changes", 
      "Critique the speed of technological adoption",
      "Argue for regulation of new technologies"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The printing press is presented as another revolutionary technology that transformed society, similar to current digital technologies."
  },
  {
    id: 6,
    question: "The passage suggests that the character's decision was motivated primarily by:",
    options: ["Financial concerns", "Family obligations", "Personal values", "Social pressure"],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The text emphasizes the character's internal moral compass and personal beliefs as the driving force."
  },
  {
    id: 7,
    question: "The author's reference to 'historical precedents' serves to:",
    options: [
      "Undermine the main argument",
      "Provide supporting evidence", 
      "Introduce a counterargument",
      "Change the subject entirely"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The historical examples are used to strengthen and support the author's central thesis."
  },
  {
    id: 8,
    question: "According to the passage, what was the immediate consequence of the new policy?",
    options: [
      "Increased public approval",
      "Greater economic stability",
      "Widespread confusion and protest",
      "Improved international relations"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The text explicitly states that the policy led to confusion and organized protests among affected groups."
  },
  {
    id: 9,
    question: "The passage indicates that the main character feels:",
    options: ["Confident and assured", "Anxious and uncertain", "Angry and resentful", "Indifferent and detached"],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "Descriptions of the character's physical reactions and internal thoughts reveal anxiety and uncertainty."
  },
  {
    id: 10,
    question: "What is the relationship between the two scientists mentioned in the passage?",
    options: [
      "Teacher and student",
      "Research competitors",
      "Collaborative colleagues",
      "Professional rivals"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The passage describes their joint publications and shared laboratory work, indicating collaboration."
  },
  {
    id: 11,
    question: "The author would most likely agree with which statement?",
    options: [
      "Technological progress is inherently beneficial",
      "Social change requires careful consideration",
      "Traditional values should be preserved at all costs",
      "Economic growth is the primary measure of success"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "Throughout the passage, the author emphasizes the need for thoughtful evaluation of social changes."
  },
  {
    id: 12,
    question: "Based on the passage, the experiment was considered successful because:",
    options: [
      "It produced unexpected results",
      "It confirmed the original hypothesis",
      "It attracted media attention",
      "It used innovative methodology"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The text states that the results aligned with the researchers' initial predictions."
  },
  {
    id: 13,
    question: "The primary audience for this passage is most likely:",
    options: [
      "Specialists in the field",
      "General educated readers",
      "Government policymakers",
      "High school students"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The language is accessible but substantive, suggesting an educated but non-specialist audience."
  },
  {
    id: 14,
    question: "What is the function of the third paragraph in relation to the passage as a whole?",
    options: [
      "It introduces a counterargument",
      "It provides specific examples",
      "It presents the main thesis",
      "It offers a historical overview"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The paragraph gives concrete instances that illustrate the general principles discussed earlier."
  },
  {
    id: 15,
    question: "The passage suggests that future research should focus on:",
    options: [
      "Replicating existing findings",
      "Exploring related applications",
      "Addressing methodological limitations",
      "Developing commercial products"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The author explicitly mentions the need to overcome current methodological constraints."
  },
  {
    id: 16,
    question: "How does the author characterize the initial response to the theory?",
    options: [
      "Universally accepted",
      "Cautiously optimistic",
      "Highly skeptical",
      "Completely ignored"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The text describes widespread doubt and criticism from the scientific community initially."
  },
  {
    id: 17,
    question: "The passage is primarily concerned with:",
    options: [
      "Comparing two historical periods",
      "Analyzing a social phenomenon",
      "Describing a technical process",
      "Advocating for policy reform"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "easy",
    explanation: "The main focus is examining and explaining a specific social trend or phenomenon."

  // Reading Comprehension - Medio (17 preguntas)
  },
  {
    id: 18,
    question: "The author's attitude toward the subject can best be described as:",
    options: ["Cautiously optimistic", "Openly skeptical", "Vehemently opposed", "Indifferently neutral"],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "While acknowledging potential drawbacks, the author emphasizes positive possibilities with careful qualification."
  },
  {
    id: 19,
    question: "The passage implies that traditional methods are inadequate because they:",
    options: [
      "Fail to account for individual learning differences",
      "Rely too heavily on outdated technology",
      "Emphasize theoretical knowledge over practical application",
      "Require excessive financial resources"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension", 
    difficulty: "medium",
    explanation: "The text suggests the gap between classroom learning and real-world application is the primary weakness."
  },
  {
    id: 20,
    question: "Which statement would most directly challenge the author's central argument?",
    options: [
      "Historical evidence supports alternative interpretations",
      "The methodology used in key studies has been questioned",
      "Recent technological advances have addressed earlier limitations",
      "Cultural differences affect the applicability of the findings"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "Questioning the foundational research would undermine the author's evidence-based conclusions."
  },
  {
    id: 21,
    question: "The reference to 'Darwin's finches' serves primarily to:",
    options: [
      "Illustrate a biological principle",
      "Provide historical context",
      "Demonstrate evolutionary theory",
      "Introduce a counterexample"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The example is used to make a broader biological concept more concrete and understandable."
  },
  {
    id: 22,
    question: "What is the most likely reason the author includes statistics in the second paragraph?",
    options: [
      "To impress readers with technical details",
      "To provide empirical support for the argument",
      "To contrast with qualitative findings",
      "To demonstrate methodological complexity"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The statistics serve as concrete evidence supporting the author's claims."
  },
  {
    id: 23,
    question: "The passage suggests that the controversy stems mainly from:",
    options: [
      "Different interpretations of the same data",
      "Insufficient evidence to draw conclusions",
      "Conflicting ideological perspectives",
      "Methodological errors in key studies"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The text indicates that fundamental worldview differences drive the disagreement."
  },
  {
    id: 24,
    question: "How does the final paragraph function in relation to the rest of the passage?",
    options: [
      "It summarizes the main points",
      "It introduces new evidence",
      "It proposes a resolution",
      "It suggests future directions"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The concluding section points toward areas requiring further investigation."
  },
  {
    id: 25,
    question: "The author's perspective is most influenced by:",
    options: [
      "Economic considerations",
      "Environmental concerns",
      "Historical analysis",
      "Technological optimism"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The argument relies heavily on historical patterns and precedents."
  },
  {
    id: 26,
    question: "What is the relationship between the two concepts discussed in the passage?",
    options: [
      "They are complementary",
      "They are contradictory",
      "One enables the other",
      "They are unrelated"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The text presents them as mutually reinforcing rather than opposing ideas."
  },
  {
    id: 27,
    question: "The passage suggests that the theory gained acceptance because:",
    options: [
      "It was politically convenient",
      "It explained previously puzzling phenomena",
      "Its originator had strong credentials",
      "It received extensive media coverage"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The text emphasizes the theory's explanatory power as key to its acceptance."
  },
  {
    id: 28,
    question: "Which aspect of the subject does the author consider most significant?",
    options: [
      "Its economic implications",
      "Its social consequences",
      "Its technical complexity",
      "Its historical origins"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The analysis focuses primarily on how the phenomenon affects social structures and relationships."
  },
  {
    id: 29,
    question: "The author's argument would be strengthened most by:",
    options: [
      "Additional quantitative data",
      "More personal anecdotes",
      "International comparisons",
      "Theoretical framework expansion"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "Cross-cultural evidence would demonstrate the universality of the phenomenon."
  },
  {
    id: 30,
    question: "What is the most likely reason the author discusses both advantages and disadvantages?",
    options: [
      "To appear balanced and credible",
      "To confuse the reader",
      "To emphasize the disadvantages",
      "To minimize the advantages"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "Acknowledging limitations enhances the author's credibility and argument strength."
  },
  {
    id: 31,
    question: "The passage indicates that changes occurred primarily due to:",
    options: [
      "Technological innovation",
      "Economic pressures",
      "Social movements",
      "Government policies"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The text emphasizes grassroots organizing and public demand as driving forces."
  },
  {
    id: 32,
    question: "How does the author use the example of the 19th century?",
    options: [
      "As a cautionary tale",
      "As a model to emulate",
      "As historical context",
      "As a direct comparison"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The historical period is presented as analogous to current circumstances."
  },
  {
    id: 33,
    question: "The author suggests that the main obstacle to progress is:",
    options: [
      "Lack of funding",
      "Institutional resistance",
      "Public apathy",
      "Technical limitations"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The text identifies established institutions as the primary barrier to change."
  },
  {
    id: 34,
    question: "What is the primary method the author uses to support the argument?",
    options: [
      "Statistical analysis",
      "Case studies",
      "Theoretical reasoning",
      "Historical examples"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "medium",
    explanation: "The argument relies heavily on historical precedents and patterns."

  // Reading Comprehension - Difícil (16 preguntas)
  },
  {
    id: 35,
    question: "The author's subtle implication in the final paragraph is that:",
    options: [
      "Current approaches are fundamentally flawed",
      "A paradigm shift is inevitable",
      "The solution lies in interdisciplinary work",
      "Technological fixes will ultimately succeed"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "While not stated explicitly, the language suggests deep skepticism about existing methodologies."
  },
  {
    id: 36,
    question: "The passage's structure can be described as:",
    options: [
      "Moving from specific examples to general principles",
      "Presenting a thesis followed by supporting evidence",
      "Comparing and contrasting different viewpoints",
      "Chronological narrative with analytical commentary"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The text systematically examines multiple perspectives on the issue."
  },
  {
    id: 37,
    question: "The author's reference to 'unintended consequences' serves to:",
    options: [
      "Undermine the main argument",
      "Introduce a qualifying consideration",
      "Shift to a different topic",
      "Emphasize methodological rigor"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "This reference adds nuance by acknowledging potential negative side effects."
  },
  {
    id: 38,
    question: "What is the significance of the author's choice to discuss marginalized groups?",
    options: [
      "It reveals a political bias",
      "It provides a novel perspective",
      "It challenges conventional narratives",
      "It appeals to emotional responses"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "Including these voices questions established historical interpretations."
  },
  {
    id: 39,
    question: "The passage suggests that the fundamental disagreement stems from:",
    options: [
      "Different epistemological frameworks",
      "Conflicting economic interests",
      "Personal rivalries among researchers",
      "Methodological preferences"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The conflict arises from fundamentally different ways of understanding knowledge itself."
  },
  {
    id: 40,
    question: "How does the author use irony in the third paragraph?",
    options: [
      "To highlight contradictions in the argument",
      "To mock opposing viewpoints",
      "To emphasize unexpected outcomes",
      "To create emotional distance"
    ],
    correctAnswer: "C",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The ironic tone underscores how results contradicted initial expectations."
  },
  {
    id: 41,
    question: "The author's philosophical orientation is most aligned with:",
    options: [
      "Pragmatism",
      "Idealism", 
      "Postmodernism",
      "Empiricism"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The emphasis on observable evidence and data collection reflects empirical philosophy."
  },
  {
    id: 42,
    question: "What rhetorical strategy is most prominent in the concluding section?",
    options: [
      "Pathos appeal to emotion",
      "Ethos establishment of credibility",
      "Logos logical reasoning",
      "Kairos sense of urgency"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The language creates a compelling sense of timeliness and importance."
  },
  {
    id: 43,
    question: "The passage's subtext suggests the author:",
    options: [
      "Has personal experience with the subject",
      "Is writing for a specialized audience",
      "Has political motivations",
      "Is skeptical of all authority"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "Subtle word choices and examples suggest firsthand knowledge of the topic."
  },
  {
    id: 44,
    question: "How does the author handle counterarguments?",
    options: [
      "Dismisses them summarily",
      "Engages with them substantively",
      "Presents them as straw men",
      "Ignores them entirely"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The text seriously considers and responds to opposing viewpoints."
  },
  {
    id: 45,
    question: "The literary allusion in the opening paragraph serves to:",
    options: [
      "Establish intellectual credibility",
      "Provide cultural context",
      "Create emotional resonance",
      "Introduce a thematic framework"
    ],
    correctAnswer: "D",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The reference introduces key themes that will be developed throughout the passage."
  },
  {
    id: 46,
    question: "What is the effect of the author's use of qualified language?",
    options: [
      "It weakens the argument",
      "It enhances precision",
      "It creates confusion",
      "It demonstrates uncertainty"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "Careful qualification shows nuanced understanding and strengthens credibility."
  },
  {
    id: 47,
    question: "The passage suggests that the true significance of the event was:",
    options: [
      "Immediately apparent to contemporaries",
      "Recognized only in hindsight",
      "Exaggerated by later historians",
      "Primarily symbolic rather than substantive"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The text indicates that the full importance became clear only with historical perspective."
  },
  {
    id: 48,
    question: "How does the author use juxtaposition in the second paragraph?",
    options: [
      "To highlight contrasts",
      "To create chronological order",
      "To establish causality",
      "To emphasize similarities"
    ],
    correctAnswer: "A",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "Placing contrasting elements side by side emphasizes their differences."
  },
  {
    id: 49,
    question: "The author's methodological approach is characterized by:",
    options: [
      "Rigid adherence to established protocols",
      "Eclectic use of multiple methods",
      "Innovation in research design",
      "Skepticism toward quantitative data"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The analysis draws from diverse methodological traditions rather than a single approach."
  },
  {
    id: 50,
    question: "What is the most nuanced interpretation of the author's conclusion?",
    options: [
      "It represents a definitive resolution",
      "It acknowledges persistent uncertainties",
      "It calls for immediate action",
      "It suggests abandoning current approaches"
    ],
    correctAnswer: "B",
    category: "Reading Comprehension",
    difficulty: "hard",
    explanation: "The conclusion carefully notes remaining questions and areas of ambiguity."

  // === VOCABULARIO EN CONTEXTO (30 preguntas) ===
  
  // Vocabulary - Fácil (10 preguntas)
  },
  {
    id: 51,
    question: "The word 'ubiquitous' in line 15 most nearly means:",
    options: ["Rare", "Everywhere", "Complicated", "Temporary"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "In context, the author describes digital devices as being present in all aspects of modern life, meaning 'everywhere'."
  },
  {
    id: 52,
    question: "In line 22, 'ambivalent' most nearly means:",
    options: ["Enthusiastic", "Indifferent", "Conflicted", "Hostile"],
    correctAnswer: "C",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context shows the character has mixed feelings about the decision, meaning 'conflicted'."
  },
  {
    id: 53,
    question: "The word 'prolific' in line 8 most nearly means:",
    options: ["Productive", "Famous", "Controversial", "Skillful"],
    correctAnswer: "A",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context describes an author who published many works, meaning 'productive'."
  },
  {
    id: 54,
    question: "In context, the word 'paradigm' most nearly means:",
    options: ["Problem", "Example", "Model", "Exception"],
    correctAnswer: "C",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The word is used to describe a fundamental model or framework for understanding."
  },
  {
    id: 55,
    question: "The word 'novel' in line 12 most nearly means:",
    options: ["Book", "Traditional", "New", "Complex"],
    correctAnswer: "C",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context describes an innovative approach, meaning 'new or original'."
  },
  {
    id: 56,
    question: "In line 30, 'prudent' most nearly means:",
    options: ["Risky", "Wise", "Stingy", "Hasty"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context suggests careful, sensible decision-making, meaning 'wise or judicious'."
  },
  {
    id: 57,
    question: "The word 'coherent' in line 17 most nearly means:",
    options: ["Logical", "Lengthy", "Simple", "Confusing"],
    correctAnswer: "A",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context describes a well-organized argument, meaning 'logical and consistent'."
  },
  {
    id: 58,
    question: "In line 25, 'ambiguous' most nearly means:",
    options: ["Clear", "Unclear", "Important", "Secondary"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context describes wording that could be interpreted multiple ways, meaning 'unclear or vague'."
  },
  {
    id: 59,
    question: "The word 'diligent' in line 9 most nearly means:",
    options: ["Lazy", "Hardworking", "Intelligent", "Friendly"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context describes careful, persistent effort, meaning 'hardworking and thorough'."
  },
  {
    id: 60,
    question: "In line 33, 'superficial' most nearly means:",
    options: ["Deep", "Shallow", "Beautiful", "Ugly"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "easy",
    explanation: "The context describes analysis that lacks depth, meaning 'shallow or surface-level'."

  // Vocabulary - Medio (10 preguntas)
  },
  {
    id: 61,
    question: "The word 'equivocal' in line 17 most nearly means:",
    options: ["Clear", "Ambiguous", "Positive", "Critical"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context shows the statement could be interpreted multiple ways, meaning 'ambiguous'."
  },
  {
    id: 62,
    question: "In line 42, 'lucid' most nearly means:",
    options: ["Confusing", "Clear", "Lengthy", "Technical"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes writing that is easy to understand, meaning 'clear and comprehensible'."
  },
  {
    id: 63,
    question: "The word 'ephemeral' in line 28 most nearly means:",
    options: ["Permanent", "Temporary", "Important", "Ancient"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes trends that quickly disappear, meaning 'short-lived or temporary'."
  },
  {
    id: 64,
    question: "In line 15, 'pragmatic' most nearly means:",
    options: ["Idealistic", "Practical", "Theoretical", "Radical"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes a practical, results-oriented approach, meaning 'practical and realistic'."
  },
  {
    id: 65,
    question: "The word 'auspicious' in line 7 most nearly means:",
    options: ["Promising", "Threatening", "Ordinary", "Final"],
    correctAnswer: "A",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes a favorable beginning, meaning 'promising or favorable'."
  },
  {
    id: 66,
    question: "In line 23, 'dubious' most nearly means:",
    options: ["Certain", "Doubtful", "Enthusiastic", "Knowledgeable"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context expresses skepticism about the claims, meaning 'doubtful or questionable'."
  },
  {
    id: 67,
    question: "The word 'profound' in line 19 most nearly means:",
    options: ["Superficial", "Deep", "Recent", "Controversial"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes insights with significant implications, meaning 'deep or far-reaching'."
  },
  {
    id: 68,
    question: "In line 36, 'mitigate' most nearly means:",
    options: ["Worsen", "Lessen", "Ignore", "Study"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes efforts to reduce negative effects, meaning 'lessen or alleviate'."
  },
  {
    id: 69,
    question: "The word 'convoluted' in line 11 most nearly means:",
    options: ["Simple", "Complex", "Clear", "Brief"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes unnecessarily complicated reasoning, meaning 'complex or tangled'."
  },
  {
    id: 70,
    question: "In line 44, 'substantiate' most nearly means:",
    options: ["Weaken", "Prove", "Ignore", "Simplify"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "medium",
    explanation: "The context describes providing evidence for claims, meaning 'prove or verify'."

  // Vocabulary - Difícil (10 preguntas)
  },
  {
    id: 71,
    question: "The word 'recalcitrant' in line 27 most nearly means:",
    options: ["Cooperative", "Stubborn", "Intelligent", "Enthusiastic"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes resistance to authority or control, meaning 'stubbornly defiant'."
  },
  {
    id: 72,
    question: "In line 39, 'perfunctory' most nearly means:",
    options: ["Thorough", "Casual", "Hostile", "Creative"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes work done with minimal effort, meaning 'casual or superficial'."
  },
  {
    id: 73,
    question: "The word 'obfuscate' in line 16 most nearly means:",
    options: ["Clarify", "Confuse", "Support", "Ignore"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes making something unclear, meaning 'confuse or obscure'."
  },
  {
    id: 74,
    question: "In line 31, 'salient' most nearly means:",
    options: ["Minor", "Prominent", "Hidden", "Controversial"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes the most noticeable or important features, meaning 'prominent or striking'."
  },
  {
    id: 75,
    question: "The word 'querulous' in line 22 most nearly means:",
    options: ["Complaining", "Praising", "Questioning", "Explaining"],
    correctAnswer: "A",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes a whining, fault-finding tone, meaning 'complaining or peevish'."
  },
  {
    id: 76,
    question: "In line 47, 'magnanimous' most nearly means:",
    options: ["Generous", "Stingy", "Angry", "Indifferent"],
    correctAnswer: "A",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes generous, forgiving behavior, meaning 'generous or noble-spirited'."
  },
  {
    id: 77,
    question: "The word 'vociferous' in line 13 most nearly means:",
    options: ["Quiet", "Loud", "Reasonable", "Unclear"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes loud, forceful expression, meaning 'loud and vehement'."
  },
  {
    id: 78,
    question: "In line 29, 'dichotomy' most nearly means:",
    options: ["Unity", "Division", "Solution", "Problem"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes a sharp division between two things, meaning 'division or contrast'."
  },
  {
    id: 79,
    question: "The word 'iconoclast' in line 8 most nearly means:",
    options: ["Traditionalist", "Radical", "Artist", "Leader"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes someone who attacks cherished beliefs, meaning 'radical challenger of traditions'."
  },
  {
    id: 80,
    question: "In line 35, 'sanguine' most nearly means:",
    options: ["Pessimistic", "Optimistic", "Realistic", "Neutral"],
    correctAnswer: "B",
    category: "Vocabulary in Context",
    difficulty: "hard",
    explanation: "The context describes a positive, hopeful outlook, meaning 'optimistic or confident'."

  // === ANÁLISIS DE GRÁFICOS (20 preguntas) ===
  
  // Graph Analysis - Fácil (7 preguntas)
  },
  {
    id: 81,
    question: "According to the graph, which year showed the highest rate of participation?",
    options: ["2015", "2017", "2019", "2021"],
    correctAnswer: "C",
    category: "Graph Analysis", 
    difficulty: "easy",
    explanation: "The bar for 2019 is clearly the tallest in the graph, indicating highest participation."
  },
  {
    id: 82,
    question: "Based on the table, which category showed the greatest percentage increase from 2010 to 2020?",
    options: ["Category A", "Category B", "Category C", "Category D"],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "easy",
    explanation: "Category B increased from 15% to 45%, a 30% increase, which is the largest change shown."
  },
  {
    id: 83,
    question: "According to the chart, which region had the smallest change in temperature?",
    options: ["North", "South", "East", "West"],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "easy",
    explanation: "The line for the East region shows the flattest slope, indicating the smallest temperature change."
  },
  {
    id: 84,
    question: "Based on the pie chart, what percentage of the total is represented by Section B?",
    options: ["25%", "30%", "35%", "40%"],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "easy",
    explanation: "Section B occupies exactly 30% of the circular chart according to the labeled percentages."
  },
  {
    id: 85,
    question: "According to the scatter plot, what is the approximate correlation between the two variables?",
    options: ["Strong positive", "Weak positive", "No correlation", "Negative"],
    correctAnswer: "A",
    category: "Graph Analysis",
    difficulty: "easy",
    explanation: "The points form a clear upward trend from left to right, indicating strong positive correlation."
  },
  {
    id: 86,
    question: "Based on the line graph, during which month were sales lowest?",
    options: ["January", "March", "June", "September"],
    correctAnswer: "A",
    category: "Graph Analysis",
    difficulty: "easy",
    explanation: "The line reaches its lowest point in January according to the graph."
  },
  {
    id: 87,
    question: "According to the bar graph, which product had the highest sales in Q3?",
    options: ["Product A", "Product B", "Product C", "Product D"],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "easy",
    explanation: "The bar for Product C is the tallest in the third quarter section."

  // Graph Analysis - Medio (7 preguntas)
  },
  {
    id: 88,
    question: "Based on the data in both graphs, which conclusion is most supported?",
    options: [
      "Increased advertising directly caused higher sales",
      "Seasonal factors affected both variables similarly",
      "The product was more popular in urban areas",
      "Price changes had no effect on demand"
    ],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "Both graphs show similar seasonal patterns, suggesting common seasonal influences."
  },
  {
    id: 89,
    question: "What is the median value shown in the box plot?",
    options: ["25", "35", "45", "55"],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "The line inside the box of the box plot indicates the median value of 45."
  },
  {
    id: 90,
    question: "According to the histogram, which range contains the most data points?",
    options: ["0-10", "10-20", "20-30", "30-40"],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "The bar for the 20-30 range is the tallest, indicating the highest frequency."
  },
  {
    id: 91,
    question: "Based on the trend line in the scatter plot, what would be the predicted value when x=10?",
    options: ["15", "20", "25", "30"],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "Following the trend line to where x=10 gives a y-value of approximately 25."
  },
  {
    id: 92,
    question: "What percentage of the total is represented by the two largest sections combined?",
    options: ["45%", "55%", "65%", "75%"],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "The two largest sections are 35% and 30%, summing to 65%."
  },
  {
    id: 93,
    question: "According to the double bar graph, which category showed the greatest difference between groups?",
    options: ["Category A", "Category B", "Category C", "Category D"],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "The difference in bar heights is largest for Category B."
  },
  {
    id: 94,
    question: "What is the range of the data shown in the stem-and-leaf plot?",
    options: ["25", "30", "35", "40"],
    correctAnswer: "D",
    category: "Graph Analysis",
    difficulty: "medium",
    explanation: "The smallest value is 12 and the largest is 52, giving a range of 40."

  // Graph Analysis - Difícil (6 preguntas)
  },
  {
    id: 95,
    question: "Based on the logarithmic scale, which statement about the growth pattern is accurate?",
    options: [
      "Growth was linear throughout the period",
      "Growth accelerated in the later years",
      "Growth decelerated but remained positive",
      "Growth was inconsistent with no clear pattern"
    ],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "hard",
    explanation: "On a logarithmic scale, a straight line indicates constant percentage growth, while a curve shows changing rates."
  },
  {
    id: 96,
    question: "What inference can be drawn from the difference between the mean and median in this distribution?",
    options: [
      "The data is normally distributed",
      "There are extreme values skewing the distribution",
      "The sample size is too small",
      "The measurement instrument was unreliable"
    ],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "hard",
    explanation: "A significant difference between mean and median suggests outliers or skewness in the data."
  },
  {
    id: 97,
    question: "Based on the confidence intervals shown, which groups are statistically significantly different?",
    options: [
      "Group A and Group B only",
      "Group B and Group C only", 
      "Group A and Group C only",
      "All three groups are significantly different"
    ],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "hard",
    explanation: "Groups whose confidence intervals don't overlap are statistically significantly different."
  },
  {
    id: 98,
    question: "What does the slope of the regression line indicate about the relationship?",
    options: [
      "The strength of the correlation",
      "The direction and rate of change",
      "The statistical significance",
      "The causal mechanism"
    ],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "hard",
    explanation: "The slope shows how much y changes for each unit change in x, indicating direction and rate."
  },
  {
    id: 99,
    question: "Based on the seasonal decomposition, what is the underlying trend?",
    options: [
      "Consistent decline",
      "Stable with fluctuations",
      "Gradual improvement",
      "Rapid growth followed by plateau"
    ],
    correctAnswer: "C",
    category: "Graph Analysis",
    difficulty: "hard",
    explanation: "After removing seasonal variations, the trend component shows gradual improvement over time."
  },
  {
    id: 100,
    question: "What conclusion about data reliability is supported by the error bars?",
    options: [
      "All measurements are equally reliable",
      "Group B has the most reliable data",
      "The sample sizes were insufficient",
      "Measurement error was consistent across groups"
    ],
    correctAnswer: "B",
    category: "Graph Analysis",
    difficulty: "hard",
    explanation: "Smaller error bars indicate more precise measurements and greater reliability for Group B."
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = readingQuestions;
}