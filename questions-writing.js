const writingQuestions = [
  // === GRAMÁTICA Y USO (40 preguntas) ===
  
  // Grammar & Usage - Fácil (14 preguntas)
  {
    id: 1,
    question: "Which choice most effectively combines the sentences at the underlined portion?<br><br>The team worked tirelessly. They wanted to complete the project before the deadline.",
    options: [
      "The team worked tirelessly, they wanted to complete",
      "The team worked tirelessly; wanting to complete", 
      "The team worked tirelessly to complete",
      "The team worked tirelessly, and they wanted to complete"
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "Option C creates the most concise and grammatically correct sentence by using an infinitive phrase."
  },
  {
    id: 2,
    question: "Which punctuation correction is needed in the following sentence?<br><br>She bought apples, oranges, bananas and grapes.",
    options: [
      "Add a comma after 'bananas'",
      "Remove the comma after 'oranges'",
      "Add a semicolon after 'oranges'",
      "No change needed"
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "In a list of three or more items, a comma should be used before the conjunction (Oxford comma)."
  },
  {
    id: 3,
    question: "Identify the error in the following sentence:<br><br>Neither the manager nor the employees was aware of the policy change.",
    options: [
      "Neither the manager nor",
      "the employees was aware",
      "of the policy change",
      "No error"
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "With 'neither/nor', the verb agrees with the closer subject. Since 'employees' is plural, it should be 'were aware'."
  },
  {
    id: 4,
    question: "Which sentence contains a punctuation error?",
    options: [
      "The conference, which was held in Chicago, attracted over 500 participants.",
      "She graduated from college in 2020; however, she didn't find a job until 2021.",
      "His three main hobbies are: reading, hiking, and cooking.",
      "The team's performance improved significantly after the training session."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "A colon should not be used after a verb or preposition that introduces a list. The colon after 'are:' is incorrect."
  },
  {
    id: 5,
    question: "Identify the sentence with correct pronoun usage:",
    options: [
      "Between you and I, the plan seems risky.",
      "The committee submitted their report yesterday.",
      "Each of the students brought their own laptop.",
      "Someone left their notebook in the classroom."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "Option B correctly uses 'their' with the collective noun 'committee' when referring to individual members."
  },
  {
    id: 6,
    question: "Which sentence is written in the active voice?",
    options: [
      "The report was written by the research team.",
      "The decision was made by the committee after much deliberation.",
      "The team completed the project ahead of schedule.",
      "The results were analyzed using specialized software."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "In option C, the subject (team) performs the action (completed), making it active voice."
  },
  {
    id: 7,
    question: "Which sentence demonstrates correct parallel structure?",
    options: [
      "She enjoys reading, to hike, and cooking.",
      "She enjoys reading, hiking, and cooking.",
      "She enjoys to read, hiking, and to cook.",
      "She enjoys reading, hiking, and to cook."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "Option B maintains parallel structure with all gerunds: reading, hiking, cooking."
  },
  {
    id: 8,
    question: "Identify the sentence fragment:",
    options: [
      "Although he studied for weeks.",
      "He studied for weeks before the exam.",
      "His studying lasted for several weeks.",
      "Weeks of preparation preceded the examination."
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "Option A is a dependent clause that cannot stand alone as a complete sentence."
  },
  {
    id: 9,
    question: "Which sentence uses correct subject-verb agreement?",
    options: [
      "The collection of rare books are valuable.",
      "Neither of the options seem satisfactory.",
      "The data from the experiments confirms our hypothesis.",
      "There is many reasons for this decision."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "'Data' can be treated as singular in scientific contexts, and 'confirms' agrees with the singular subject."
  },
  {
    id: 10,
    question: "Which sentence contains a misplaced modifier?",
    options: [
      "Running quickly, the finish line approached.",
      "She almost drove her kids to school every day.",
      "The teacher explained the concept using simple examples.",
      "Having finished the assignment, the TV was turned on."
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "The modifier 'Having finished the assignment' incorrectly modifies 'the TV' instead of the person who finished."
  },
  {
    id: 11,
    question: "Which sentence uses correct apostrophe placement?",
    options: [
      "The childrens' toys were scattered everywhere.",
      "Its' important to proofread your work.",
      "The company's new policy affects all employees.",
      "Several student's projects won awards."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "Option C correctly uses the apostrophe to show singular possession."
  },
  {
    id: 12,
    question: "Which sentence uses correct verb tense?",
    options: [
      "Yesterday, I have completed the project.",
      "By next year, she will graduate from college.",
      "He said he will call me tomorrow.",
      "If I would have known, I would have helped."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "Option B correctly uses future tense for an action that will occur next year."
  },
  {
    id: 13,
    question: "Which sentence uses correct pronoun case?",
    options: [
      "The manager gave the assignment to John and I.",
      "Who do you think will win the competition?",
      "The team and us worked on the project together.",
      "She is taller than him."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "'Who' is correctly used as the subject of the subordinate clause."
  },
  {
    id: 14,
    question: "Which sentence contains a double negative?",
    options: [
      "I can't hardly wait for the weekend.",
      "She doesn't want any help with the project.",
      "He never goes to that restaurant anymore.",
      "There isn't much time left."
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "easy",
    explanation: "'Can't hardly' creates a double negative, which is grammatically incorrect."

  // Grammar & Usage - Medio (13 preguntas)
  },
  {
    id: 15,
    question: "Which sentence demonstrates correct use of the subjunctive mood?",
    options: [
      "If I was you, I would reconsider that decision.",
      "I wish I was able to attend the conference.",
      "The committee recommended that he be promoted.",
      "If she was here, she would know what to do."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "After verbs like 'recommend', 'suggest', or 'require', the subjunctive form 'be' is correct."
  },
  {
    id: 16,
    question: "Which sentence uses correct punctuation with restrictive and nonrestrictive elements?",
    options: [
      "My brother, who lives in Chicago, is visiting next week.",
      "The book that I borrowed from you is excellent.",
      "Students, who complete their work early, may leave.",
      "The car that was parked illegally was towed."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option B correctly uses 'that' without commas for a restrictive clause essential to the meaning."
  },
  {
    id: 17,
    question: "Which sentence maintains consistent verb tense?",
    options: [
      "When she arrives, we will begin the meeting.",
      "He finished his work and goes home.",
      "I was walking to school when I see my friend.",
      "They have completed the project and celebrated."
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option A maintains consistent future and present tense appropriate for the context."
  },
  {
    id: 18,
    question: "Which sentence uses correct comparative/superlative forms?",
    options: [
      "This is the most unique solution I've seen.",
      "Of the two options, this one is better.",
      "She is the older of the three sisters.",
      "This method is more easier to understand."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "'Better' is the correct comparative form when comparing two items."
  },
  {
    id: 19,
    question: "Which sentence demonstrates correct use of correlative conjunctions?",
    options: [
      "Neither the manager or the assistant was available.",
      "Both the students and the teacher was pleased.",
      "Not only did she finish early, but she also helped others.",
      "Either you come with us nor stay here alone."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option C correctly uses 'not only...but also' with parallel structure."
  },
  {
    id: 20,
    question: "Which sentence uses correct pronoun-antecedent agreement?",
    options: [
      "Everyone should bring their own lunch.",
      "Each of the students completed his or her assignment.",
      "Either John or Mark will bring their equipment.",
      "The team celebrated their victory."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option B correctly uses 'his or her' to agree with the singular indefinite pronoun 'each'."
  },
  {
    id: 21,
    question: "Which sentence contains a dangling modifier?",
    options: [
      "After reading the article, the concept became clear.",
      "Walking through the park, the flowers were beautiful.",
      "To improve your writing, practice is essential.",
      "Having finished the marathon, the medal was awarded."
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "The modifier 'Having finished the marathon' doesn't logically modify 'the medal'."
  },
  {
    id: 22,
    question: "Which sentence uses correct conditional structure?",
    options: [
      "If I would have known, I would have come earlier.",
      "If she had studied, she would have passed the exam.",
      "If he will arrive on time, we can begin.",
      "If they would have called, we would have waited."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option B correctly uses the past perfect in the if-clause and conditional perfect in the main clause."
  },
  {
    id: 23,
    question: "Which sentence demonstrates correct use of gerunds and infinitives?",
    options: [
      "She avoided to answer the difficult question.",
      "I look forward to seeing you next week.",
      "He promised helping with the project.",
      "They discussed to go to the conference."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "'Look forward to' must be followed by a gerund (seeing), not an infinitive."
  },
  {
    id: 24,
    question: "Which sentence uses correct punctuation with conjunctive adverbs?",
    options: [
      "The results were disappointing, therefore we need to reconsider.",
      "The results were disappointing; therefore, we need to reconsider.",
      "The results were disappointing therefore, we need to reconsider.",
      "The results were disappointing, therefore, we need to reconsider."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Conjunctive adverbs like 'therefore' should be preceded by a semicolon and followed by a comma."
  },
  {
    id: 25,
    question: "Which sentence demonstrates correct use of passive voice where appropriate?",
    options: [
      "The experiment was conducted by the research team.",
      "The solution to the problem was found by me.",
      "The book was read by everyone in the class.",
      "The decision was made after careful consideration."
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option D appropriately uses passive voice when the actor is unknown or unimportant."
  },
  {
    id: 26,
    question: "Which sentence uses correct article usage?",
    options: [
      "She is a honest person who always tells truth.",
      "He wants to be an university professor.",
      "I need an hour to complete this task.",
      "They visited the United Kingdom last year."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "'An' is used before 'hour' because the 'h' is silent, making the first sound a vowel sound."
  },
  {
    id: 27,
    question: "Which sentence demonstrates correct use of relative clauses?",
    options: [
      "The person whom we met yesterday is coming today.",
      "This is the house where I grew up in.",
      "She is the teacher who her students admire.",
      "The book, that was on the table, is mine."
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "medium",
    explanation: "Option A correctly uses 'whom' as the object of the verb 'met'."

  // Grammar & Usage - Difícil (13 preguntas)
  },
  {
    id: 28,
    question: "Which sentence demonstrates correct use of the past perfect tense?",
    options: [
      "By the time we arrived, the meeting had already begun.",
      "She had finished her work when she goes home.",
      "I had seen that movie last weekend.",
      "They had been there yesterday."
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option A correctly uses past perfect to show an action completed before another past action."
  },
  {
    id: 29,
    question: "Which sentence uses correct sequence of tenses?",
    options: [
      "She said that she will come to the party.",
      "I thought that he was studying for the exam.",
      "They promised that they are helping us.",
      "He knows that she will be here tomorrow."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option B maintains correct sequence: past tense in main clause requires past tense in subordinate clause."
  },
  {
    id: 30,
    question: "Which sentence demonstrates correct use of the conditional perfect?",
    options: [
      "If I had known, I would come earlier.",
      "If she would have studied, she would pass.",
      "If they had called, we would have waited.",
      "If he will have arrived, we can begin."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option C correctly uses past perfect in the if-clause and conditional perfect in the main clause."
  },
  {
    id: 31,
    question: "Which sentence uses correct punctuation with elliptical constructions?",
    options: [
      "My brother plays basketball; my sister, volleyball.",
      "My brother plays basketball; my sister volleyball.",
      "My brother plays basketball, my sister, volleyball.",
      "My brother plays basketball my sister volleyball."
    ],
    correctAnswer: "A",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option A correctly uses a semicolon between independent clauses and a comma to show the elliptical verb."
  },
  {
    id: 32,
    question: "Which sentence demonstrates correct use of the subjunctive in hypothetical situations?",
    options: [
      "If I was rich, I would travel the world.",
      "I wish I was able to speak French fluently.",
      "If I were you, I would reconsider that decision.",
      "She acts as if she was the manager."
    ],
    correctAnswer: "C",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "In hypothetical situations, 'were' is correct in the subjunctive mood, even with 'I'."
  },
  {
    id: 33,
    question: "Which sentence uses correct placement of modifiers with absolute phrases?",
    options: [
      "The work having been completed, the team celebrated.",
      "Having been completed the work, the team celebrated.",
      "The team celebrated, the work having been completed.",
      "Both A and C are correct"
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Both A and C correctly place and punctuate the absolute phrase 'the work having been completed'."
  },
  {
    id: 34,
    question: "Which sentence demonstrates correct use of the passive causative?",
    options: [
      "I had my car to be repaired yesterday.",
      "She got her hair cut at the new salon.",
      "They had their house painted by professionals.",
      "Both B and C are correct"
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Both B and C correctly use the passive causative construction 'got/had + object + past participle'."
  },
  {
    id: 35,
    question: "Which sentence uses correct punctuation with nonessential appositives?",
    options: [
      "My friend, a talented musician, is performing tonight.",
      "The novel '1984' is a classic dystopian work.",
      "Shakespeare's play, Hamlet, is his longest.",
      "Both A and B are correct"
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Both A and B correctly punctuate nonessential and essential appositives respectively."
  },
  {
    id: 36,
    question: "Which sentence demonstrates correct use of inverted word order?",
    options: [
      "Never I have seen such a beautiful sunset.",
      "Rarely does one encounter such generosity.",
      "Only after the storm passed we could assess the damage.",
      "So tired he was that he fell asleep immediately."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option B correctly inverts subject and auxiliary verb after the negative adverb 'rarely'."
  },
  {
    id: 37,
    question: "Which sentence uses correct mood consistency in conditional sentences?",
    options: [
      "If he were here, he would know what to do.",
      "If she had been there, she would have helped.",
      "If I had more time, I would visit more often.",
      "All of the above are correct"
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "All three sentences maintain correct mood consistency for their respective conditional types."
  },
  {
    id: 38,
    question: "Which sentence demonstrates correct use of the past subjunctive?",
    options: [
      "I wish I was going to the concert with you.",
      "If only she was here to see this.",
      "He talked as if he was an expert on the subject.",
      "I wish I were able to attend the meeting."
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option D correctly uses 'were' in the past subjunctive to express a wish contrary to fact."
  },
  {
    id: 39,
    question: "Which sentence uses correct punctuation with restrictive clauses?",
    options: [
      "The students, who completed the assignment, received extra credit.",
      "The students who completed the assignment received extra credit.",
      "The book, that I recommended, is now available.",
      "The city where I was born, is Paris."
    ],
    correctAnswer: "B",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Option B correctly omits commas for a restrictive clause essential to identifying which students."
  },
  {
    id: 40,
    question: "Which sentence demonstrates correct use of the perfect infinitive?",
    options: [
      "She seems to have understood the instructions.",
      "He appears to be working hard.",
      "They claim to have seen the movie already.",
      "Both A and C are correct"
    ],
    correctAnswer: "D",
    category: "Grammar & Usage",
    difficulty: "hard",
    explanation: "Both A and C correctly use the perfect infinitive to show action completed before the main verb."

  // === EXPRESIÓN DE IDEAS (35 preguntas) ===
  
  // Expression of Ideas - Fácil (12 preguntas)
  },
  {
    id: 41,
    question: "Which version most clearly and concisely expresses the idea?",
    options: [
      "The reason for the delay was due to the fact that there was bad weather.",
      "The delay was because of bad weather.",
      "The delay's reason was on account of bad weather conditions.",
      "There was a delay that occurred as a result of inclement weather."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option B is the most direct and clear expression without unnecessary words."
  },
  {
    id: 42,
    question: "Which choice maintains the essay's positive tone?",
    options: [
      "The disastrous implementation of the new system",
      "The challenging rollout of the new system",
      "The catastrophic failure of the new system", 
      "The problematic new system"
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "'Challenging' maintains a neutral-to-positive tone, while the other options are overly negative."
  },
  {
    id: 43,
    question: "Which revision most effectively strengthens the argument?",
    options: [
      "Adding statistical data from recent studies",
      "Repeating the main point multiple times",
      "Using more complex vocabulary",
      "Including personal opinions without evidence"
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Statistical data from credible sources provides concrete evidence to support the argument."
  },
  {
    id: 44,
    question: "Which transition word best connects these ideas?<br><br>The initial results were promising. ______, further testing revealed significant limitations.",
    options: ["Similarly", "Therefore", "However", "Consequently"],
    correctAnswer: "C",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "'However' indicates a contrast between the promising initial results and the limitations discovered later."
  },
  {
    id: 45,
    question: "Which version best maintains the formal tone of the passage?",
    options: [
      "The researchers kinda figured out what was going on.",
      "The investigators determined the causal mechanism.",
      "The science guys discovered why it happened.",
      "They found out what made it tick."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option B uses formal academic language appropriate for a research context."
  },
  {
    id: 46,
    question: "Which choice most effectively introduces the paragraph?",
    options: [
      "There are many factors to consider in this situation.",
      "Historical context provides important background information.",
      "The economic implications of this policy are far-reaching.",
      "Technology has revolutionized communication methods."
    ],
    correctAnswer: "C",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "The paragraph discusses specific economic consequences, so option C provides the most relevant introduction."
  },
  {
    id: 47,
    question: "Which version creates the most logical flow between sentences?",
    options: [
      "The experiment failed. We learned valuable lessons. Future attempts will incorporate these insights.",
      "Future attempts will incorporate these insights. The experiment failed. We learned valuable lessons.",
      "We learned valuable lessons. Future attempts will incorporate these insights. The experiment failed.",
      "The experiment failed. Future attempts will incorporate these insights. We learned valuable lessons."
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option A presents events in chronological order: failure → learning → application."
  },
  {
    id: 48,
    question: "Which choice most effectively concludes the paragraph?",
    options: [
      "In conclusion, there are many things to think about.",
      "Therefore, the evidence strongly supports the initial hypothesis.",
      "As you can see, this is a very complicated issue.",
      "So that's basically what happened in this situation."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option B provides a strong, evidence-based conclusion that reinforces the paragraph's main point."
  },
  {
    id: 49,
    question: "Which version eliminates redundant language?",
    options: [
      "The final outcome of the competition",
      "The unexpected surprise party",
      "The basic fundamentals of mathematics",
      "The surrounding environment"
    ],
    correctAnswer: "D",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "'Surrounding' is redundant with 'environment', as environment already implies surroundings."
  },
  {
    id: 50,
    question: "Which choice maintains consistent point of view?",
    options: [
      "When one studies regularly, you tend to perform better.",
      "If students study regularly, they tend to perform better.",
      "When I study regularly, you tend to perform better.",
      "Studying regularly means we tend to perform better."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option B maintains consistent third-person point of view throughout the sentence."
  },
  {
    id: 51,
    question: "Which version most effectively emphasizes the main point?",
    options: [
      "The discovery was somewhat important for the field.",
      "The discovery represented a significant breakthrough.",
      "It was a discovery that had some importance.",
      "One could say the discovery mattered to some extent."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option B uses strong, definitive language that clearly emphasizes the importance of the discovery."
  },
  {
    id: 52,
    question: "Which choice creates the most appropriate tone for an academic essay?",
    options: [
      "The results were totally amazing and awesome.",
      "The findings were quite remarkable and significant.",
      "The outcome was really cool and interesting.",
      "The data was pretty good and useful."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "easy",
    explanation: "Option B uses formal, precise language appropriate for academic writing."

  // Expression of Ideas - Medio (12 preguntas)
  },
  {
    id: 53,
    question: "Which revision best improves the coherence of the paragraph?",
    options: [
      "Adding transitional phrases between sentences",
      "Repeating key terms more frequently",
      "Using more complex sentence structures",
      "Including additional examples and details"
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Transitional phrases help create logical connections between ideas, improving overall coherence."
  },
  {
    id: 54,
    question: "Which version best maintains the essay's formal style while being concise?",
    options: [
      "The researchers endeavored to ascertain the veracity of the purported phenomenon.",
      "The scientists tried to find out if the thing they heard about was really true.",
      "The research team investigated whether the reported phenomenon was genuine.",
      "They checked to see if what people said was actually real or not."
    ],
    correctAnswer: "C",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option C maintains formal style without being unnecessarily wordy or overly complex."
  },
  {
    id: 55,
    question: "Which choice most effectively develops the author's claim?",
    options: [
      "Providing a relevant historical analogy",
      "Repeating the claim with different wording",
      "Adding emotional language to emphasize importance",
      "Including unrelated but interesting facts"
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "A relevant historical analogy provides concrete support and context for the claim."
  },
  {
    id: 56,
    question: "Which version creates the most effective rhetorical impact?",
    options: [
      "The policy change affected many people in various ways.",
      "Like a stone cast into still waters, the policy change created ripples that touched countless lives.",
      "The policy change had multiple effects on different individuals.",
      "Many people were impacted by the policy change in different manners."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option B uses metaphorical language that creates vivid imagery and emotional resonance."
  },
  {
    id: 57,
    question: "Which choice best establishes the writer's credibility?",
    options: [
      "Using first-person pronouns frequently",
      "Citing reputable sources and evidence",
      "Employing complex technical terminology",
      "Making bold, unsupported assertions"
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Citing credible sources demonstrates research and expertise, establishing author credibility."
  },
  {
    id: 58,
    question: "Which revision most effectively addresses potential counterarguments?",
    options: [
      "Ignoring opposing viewpoints entirely",
      "Dismissing counterarguments as invalid",
      "Acknowledging and refuting opposing perspectives",
      "Conceding that the opposition might be correct"
    ],
    correctAnswer: "C",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Acknowledging and refuting counterarguments strengthens the argument by demonstrating thorough consideration."
  },
  {
    id: 59,
    question: "Which version best maintains objective tone while being persuasive?",
    options: [
      "Anyone who disagrees with this conclusion is clearly mistaken.",
      "The evidence strongly suggests this conclusion is warranted.",
      "It's obvious to everyone that this is the right answer.",
      "Only a fool would fail to see the truth of this position."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option B uses evidence-based language that persuades without resorting to emotional appeals or insults."
  },
  {
    id: 60,
    question: "Which choice most effectively uses parallel structure for emphasis?",
    options: [
      "The program aims to educate students, providing resources, and community building.",
      "The program aims to educate students, provide resources, and build community.",
      "The program has education of students, resource provision, and building community.",
      "Student education, providing resources, and community building are the program's aims."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option B maintains parallel infinitive phrases: to educate, to provide, to build."
  },
  {
    id: 61,
    question: "Which version best creates suspense and engages the reader?",
    options: [
      "The results were exactly what we expected from the beginning.",
      "Little did we know that the results would challenge everything we thought we understood.",
      "The results came out and they were not very surprising to anyone.",
      "We got the results and they were pretty much what we predicted."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option B creates anticipation and suggests significant implications, engaging reader interest."
  },
  {
    id: 62,
    question: "Which choice most effectively uses concrete details?",
    options: [
      "The building was very old and in bad condition.",
      "The Victorian-era building featured cracked plaster, sagging floors, and broken windows.",
      "The structure had seen better days and needed work.",
      "It was an ancient building that was falling apart."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option B provides specific, sensory details that create a vivid mental image."
  },
  {
    id: 63,
    question: "Which revision best improves sentence variety?",
    options: [
      "Converting some long sentences into shorter ones",
      "Making all sentences approximately the same length",
      "Using only complex sentence structures",
      "Eliminating all transitional words and phrases"
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Varying sentence length creates rhythm and emphasis, improving readability and engagement."
  },
  {
    id: 64,
    question: "Which version most effectively uses qualification to strengthen the argument?",
    options: [
      "This solution will definitely solve all our problems forever.",
      "While not a panacea, this approach offers promising avenues for addressing key challenges.",
      "This is absolutely the only way to fix everything that's wrong.",
      "Nothing else could possibly work as well as this perfect solution."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "medium",
    explanation: "Option B uses careful qualification that acknowledges limitations while maintaining confidence in the approach."

  // Expression of Ideas - Difícil (11 preguntas)
  },
  {
    id: 65,
    question: "Which choice demonstrates the most sophisticated use of rhetorical devices?",
    options: [
      "The policy, like a compass in stormy seas, provides direction when circumstances are most uncertain.",
      "The policy gives guidance during difficult times.",
      "When things are confusing, the policy tells us what to do.",
      "The policy helps when we don't know which way to go."
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option A effectively uses simile and metaphorical language to create vivid imagery and emotional resonance."
  },
  {
    id: 66,
    question: "Which version best demonstrates nuanced understanding of the issue?",
    options: [
      "The situation is completely black and white with no middle ground.",
      "While the primary trend suggests one conclusion, significant countervailing evidence merits consideration.",
      "The answer is obvious and anyone who disagrees is wrong.",
      "There are two sides to this issue and both have some points."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B acknowledges complexity and demonstrates sophisticated analysis of conflicting evidence."
  },
  {
    id: 67,
    question: "Which choice most effectively uses periodic sentence structure for emphasis?",
    options: [
      "Despite numerous challenges, unexpected obstacles, and limited resources, the team ultimately succeeded.",
      "The team succeeded despite challenges, obstacles, and limited resources.",
      "Challenges, obstacles, and limited resources didn't stop the team from succeeding.",
      "The team succeeded even though there were challenges, obstacles, and limited resources."
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option A uses periodic structure, building suspense by delaying the main clause until the end."
  },
  {
    id: 68,
    question: "Which version best demonstrates synthesis of multiple sources?",
    options: [
      "Smith says X. Jones says Y. Brown says Z.",
      "While Smith emphasizes X, and Jones focuses on Y, Brown's analysis of Z provides a crucial third perspective.",
      "There are different opinions about this topic from various experts.",
      "Smith, Jones, and Brown all have their own views on the matter."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B synthesizes multiple perspectives into a coherent analysis rather than simply listing them."
  },
  {
    id: 69,
    question: "Which choice most effectively uses antithesis for rhetorical impact?",
    options: [
      "The proposal offers both advantages and disadvantages.",
      "What we gain in efficiency, we may lose in quality; what we save in time, we might sacrifice in thoroughness.",
      "There are good things and bad things about the proposal.",
      "The proposal has positive aspects and negative aspects."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B uses antithesis (balanced contrast) to create memorable, impactful phrasing."
  },
  {
    id: 70,
    question: "Which version best demonstrates conceptual sophistication?",
    options: [
      "The theory works pretty well in most situations.",
      "While the theory demonstrates robust predictive power within its original parameters, its applicability to novel contexts remains empirically undetermined.",
      "The theory is good for some things but not for others.",
      "The theory works in the cases it was designed for but maybe not in other cases."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B uses precise academic language and demonstrates nuanced understanding of theoretical limitations."
  },
  {
    id: 71,
    question: "Which choice most effectively uses qualification to enhance credibility?",
    options: [
      "This conclusion is absolutely certain beyond any doubt.",
      "Based on the available evidence, this conclusion appears warranted, though additional research might refine our understanding.",
      "This is definitely the right answer forever.",
      "While I'm not completely sure, this might be kind of correct."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B uses careful qualification that acknowledges evidentiary limits while maintaining confidence in the conclusion."
  },
  {
    id: 72,
    question: "Which version best demonstrates metacognitive awareness?",
    options: [
      "The method we used seemed to work okay.",
      "Our methodological approach, while effective for addressing our primary research questions, may have inadvertently introduced certain biases that future studies should seek to mitigate.",
      "We did it this way because it was easiest.",
      "The way we did the study was fine for what we needed."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B demonstrates awareness of methodological limitations and their potential implications."
  },
  {
    id: 73,
    question: "Which choice most effectively uses cumulative sentence structure?",
    options: [
      "The theory emerged from decades of research, incorporating diverse methodological approaches, building on multiple disciplinary perspectives, and ultimately transforming conventional understanding.",
      "From decades of research came the theory that used different methods and included various disciplines and changed how people think.",
      "The theory came from research done over many years that used different methods and brought together different fields and changed what people believed.",
      "Research over many years led to a theory that changed thinking by using various methods and perspectives."
    ],
    correctAnswer: "A",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option A uses cumulative structure, beginning with a main clause and adding modifying phrases that develop the idea."
  },
  {
    id: 74,
    question: "Which version best demonstrates interdisciplinary synthesis?",
    options: [
      "The economic data shows one thing, and the sociological research shows another.",
      "By integrating economic metrics with sociological frameworks, we can develop a more comprehensive understanding of the phenomenon.",
      "Economics and sociology both have something to say about this.",
      "There are economic aspects and sociological aspects to consider."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B demonstrates true synthesis by showing how different disciplines can be integrated rather than merely juxtaposed."
  },
  {
    id: 75,
    question: "Which choice most effectively uses conceptual metaphor?",
    options: [
      "The research process involved several stages.",
      "The research journey navigated uncharted territories, bridged disciplinary divides, and ultimately arrived at unexpected destinations.",
      "The research had beginning, middle, and end phases.",
      "The research went from start to finish through various steps."
    ],
    correctAnswer: "B",
    category: "Expression of Ideas",
    difficulty: "hard",
    explanation: "Option B uses the conceptual metaphor of research as a journey, creating richer meaning through figurative language."

  // === EDICIÓN Y REVISIÓN (25 preguntas) ===
  
  // Editing & Revision - Fácil (8 preguntas)
  },
  {
    id: 76,
    question: "What is the best way to combine these sentences?<br><br>The company expanded its operations. It opened new offices in three countries. This happened last year.",
    options: [
      "The company expanded its operations, opening new offices in three countries last year.",
      "The company expanded its operations and it opened new offices in three countries and this happened last year.",
      "The company expanded its operations, new offices in three countries were opened last year.",
      "Last year the company expanded its operations, with new offices in three countries being opened."
    ],
    correctAnswer: "A",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "Option A creates the most fluid and concise sentence by using a participial phrase."
  },
  {
    id: 77,
    question: "Which revision eliminates wordiness?",
    options: [
      "At this point in time → Now",
      "Due to the fact that → Because",
      "In the event that → If",
      "All of the above"
    ],
    correctAnswer: "D",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "All options demonstrate proper elimination of wordy phrases with more concise alternatives."
  },
  {
    id: 78,
    question: "Which version is the most concise revision?",
    options: [
      "The reason why we are late is because of the fact that there was traffic.",
      "We are late due to traffic.",
      "The lateness of our arrival is attributable to vehicular congestion.",
      "Our tardiness results from the presence of traffic conditions."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "Option B conveys the same information with the fewest words while maintaining clarity."
  },
  {
    id: 79,
    question: "Which revision corrects the awkward construction?",
    options: [
      "The decision was made by the committee to approve the proposal.",
      "The committee made the decision to approve the proposal.",
      "To approve the proposal was the decision made by the committee.",
      "It was decided by the committee to approve the proposal."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "Option B uses active voice and natural word order, eliminating the awkward passive construction."
  },
  {
    id: 80,
    question: "Which version eliminates redundant expressions?",
    options: [
      "The unexpected surprise delighted everyone.",
      "She nodded her head in agreement.",
      "He thought to himself quietly.",
      "All of the above contain redundancies"
    ],
    correctAnswer: "D",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "All options contain redundant expressions: 'unexpected surprise', 'nodded her head', 'thought to himself'."
  },
  {
    id: 81,
    question: "Which revision improves sentence clarity?",
    options: [
      "Having finished the assignment, the TV was turned on.",
      "After finishing the assignment, he turned on the TV.",
      "The assignment having been finished, the TV was turned on.",
      "With the assignment finished, the TV was turned on."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "Option B clarifies who performed the action, eliminating the dangling modifier."
  },
  {
    id: 82,
    question: "Which version corrects the misplaced modifier?",
    options: [
      "She almost drove her children to school every day.",
      "She drove her children to school almost every day.",
      "Almost she drove her children to school every day.",
      "She drove almost her children to school every day."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "Option B correctly places 'almost' to modify 'every day' rather than 'drove'."
  },
  {
    id: 83,
    question: "Which revision eliminates clichés?",
    options: [
      "We need to think outside the box for solutions.",
      "At the end of the day, results matter most.",
      "We should explore innovative approaches to problem-solving.",
      "We should avoid reinventing the wheel with this project."
    ],
    correctAnswer: "C",
    category: "Editing & Revision",
    difficulty: "easy",
    explanation: "Option C expresses the idea directly without relying on overused clichés."

  // Editing & Revision - Medio (9 preguntas)
  },
  {
    id: 84,
    question: "Which revision best improves the paragraph's organization?",
    options: [
      "Moving the topic sentence to the beginning",
      "Adding more descriptive adjectives",
      "Using longer, more complex sentences",
      "Including additional examples"
    ],
    correctAnswer: "A",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "A clear topic sentence at the beginning helps establish the paragraph's main idea and improves overall organization."
  },
  {
    id: 85,
    question: "Which version demonstrates the most effective revision for variety?",
    options: [
      "The team worked hard. They achieved success. Everyone was happy.",
      "Working hard, the team achieved success, which made everyone happy.",
      "The hard-working team's successful achievement created happiness for everyone.",
      "Through diligent effort, the team attained success, resulting in widespread satisfaction."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Option B combines the short, choppy sentences into a more sophisticated structure with varied syntax."
  },
  {
    id: 86,
    question: "Which revision best strengthens the argument's logical structure?",
    options: [
      "Adding emotional appeals and personal anecdotes",
      "Ensuring each claim is supported by relevant evidence",
      "Using more technical terminology and jargon",
      "Repeating the main thesis in every paragraph"
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Supporting claims with evidence creates a logical foundation that strengthens the overall argument."
  },
  {
    id: 87,
    question: "Which version demonstrates the most effective revision for coherence?",
    options: [
      "The study examined various factors. Climate change was considered. Economic impacts were analyzed.",
      "The study examined various factors, including climate change and economic impacts.",
      "Various factors were examined by the study. Climate change and economic impacts were among them.",
      "There were various factors in the study. Climate change and economic impacts were two of them."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Option B creates a single, coherent sentence that clearly shows the relationship between the elements."
  },
  {
    id: 88,
    question: "Which revision best addresses issues of tone consistency?",
    options: [
      "The data is totally amazing! Furthermore, the implications are quite significant.",
      "The results were remarkable. Additionally, the implications are substantial.",
      "Wow, these findings are incredible! Moreover, the consequences are profound.",
      "The outcomes were outstanding. Also, the ramifications are major."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Option B maintains consistent formal academic tone throughout both clauses."
  },
  {
    id: 89,
    question: "Which version demonstrates effective revision for precision?",
    options: [
      "The thing was kind of big and sort of important.",
      "The discovery was significant and substantial.",
      "It was a really big deal and very important.",
      "The finding was major and had great importance."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Option B uses precise, specific adjectives that convey clear meaning without vagueness."
  },
  {
    id: 90,
    question: "Which revision best improves paragraph unity?",
    options: [
      "Adding a sentence that relates back to the main thesis",
      "Including more diverse vocabulary",
      "Making all sentences the same length",
      "Adding a personal opinion"
    ],
    correctAnswer: "A",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Connecting sentences to the main thesis ensures all content supports the central idea, improving unity."
  },
  {
    id: 91,
    question: "Which version demonstrates the most effective revision for emphasis?",
    options: [
      "The policy had several effects, some expected and others surprising.",
      "While the policy produced various effects, the most unexpected consequence was the dramatic increase in public engagement.",
      "There were different effects from the policy, including some that were surprising.",
      "The policy resulted in multiple outcomes, with public engagement increasing surprisingly."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Option B uses subordinate structure to emphasize the most important point--the unexpected consequence."
  },
  {
    id: 92,
    question: "Which revision best addresses issues of audience awareness?",
    options: [
      "Adding technical jargon to impress specialized readers",
      "Simplifying complex concepts for general readers",
      "Using emotional appeals to persuade readers",
      "Including personal opinions to engage readers"
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "medium",
    explanation: "Adapting complexity based on audience knowledge level demonstrates effective audience awareness."

  // Editing & Revision - Difícil (8 preguntas)
  },
  {
    id: 93,
    question: "Which revision demonstrates the most sophisticated improvement in style?",
    options: [
      "The system didn't work well because it was too complicated.",
      "The system's complexity impeded its functionality.",
      "The system failed to operate effectively due to excessive complication.",
      "Because it was too complicated, the system didn't work properly."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B uses concise, precise language with strong nouns and verbs, creating a more sophisticated style."
  },
  {
    id: 94,
    question: "Which version demonstrates the most effective revision for rhetorical impact?",
    options: [
      "There were problems with the approach that needed fixing.",
      "The methodology suffered from significant flaws requiring substantial revision.",
      "The approach was problematic in several respects that demanded correction.",
      "Fundamental deficiencies in the methodological approach necessitated comprehensive restructuring."
    ],
    correctAnswer: "D",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option D uses the most precise and impactful language to convey the seriousness of the issues."
  },
  {
    id: 95,
    question: "Which revision best demonstrates synthesis of multiple perspectives?",
    options: [
      "Smith says X. Jones says Y. I think Z.",
      "While Smith emphasizes X and Jones focuses on Y, a more comprehensive understanding emerges when we consider Z.",
      "There are different opinions: X, Y, and Z.",
      "Smith, Jones, and I have different views on this issue."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B synthesizes multiple perspectives into an integrated analysis rather than merely presenting them separately."
  },
  {
    id: 96,
    question: "Which version demonstrates the most effective use of qualification for precision?",
    options: [
      "The results completely prove the theory beyond any doubt.",
      "The results strongly support the theory under the experimental conditions tested.",
      "The results show the theory is probably correct in most cases.",
      "The results seem to indicate the theory might be right."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B uses precise qualification that acknowledges the limits of the evidence while maintaining confidence in the findings."
  },
  {
    id: 97,
    question: "Which revision best demonstrates conceptual refinement?",
    options: [
      "The idea is good but needs work.",
      "While the core concept shows promise, its implementation requires more precise operationalization and clearer methodological parameters.",
      "The basic idea is okay but the details need fixing.",
      "The concept has potential but needs development in specific areas."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B uses precise academic language to identify specific areas needing refinement."
  },
  {
    id: 98,
    question: "Which version demonstrates the most effective revision for nuanced analysis?",
    options: [
      "The policy worked well overall.",
      "The policy achieved its primary objectives, though with unintended secondary consequences that merit further examination.",
      "The policy was successful but had some problems.",
      "While the policy succeeded in its main goals, it also created some issues."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B provides the most nuanced analysis, distinguishing between primary and secondary effects."
  },
  {
    id: 99,
    question: "Which revision best demonstrates improved analytical depth?",
    options: [
      "The data shows a correlation between the variables.",
      "The correlation between variables, while statistically significant, may reflect underlying confounding factors rather than direct causation.",
      "There is a relationship between the factors in the data.",
      "The numbers indicate that these things are connected somehow."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B demonstrates sophisticated understanding of statistical concepts and analytical limitations."
  },
  {
    id: 100,
    question: "Which version demonstrates the most effective revision for scholarly precision?",
    options: [
      "The researchers looked at the problem from different angles.",
      "The investigation employed multiple methodological approaches to triangulate findings and enhance validity.",
      "The study used various methods to examine the issue.",
      "Different research techniques were applied to analyze the problem."
    ],
    correctAnswer: "B",
    category: "Editing & Revision",
    difficulty: "hard",
    explanation: "Option B uses precise scholarly terminology that demonstrates methodological sophistication."
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = writingQuestions;
}