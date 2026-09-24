import type { Question } from "../../types";

export const VERSICULOS_QUESTIONS: Question[] = [
  // ... ver-001 a ver-010 (idénticos a los tuyos, sin cambios) ...
  {
    id: "ver-001",
    type: "fill-blank",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    verseWithBlank: "Todo lo puedo en Cristo que me ___.",
    options: ["ama", "fortalece", "guía", "salva"],
    correctIndex: 1,
    explanation:
      "Filipenses 4:13 no es una promesa de éxito ilimitado, sino de fortaleza para enfrentar cualquier circunstancia con contentamiento.",
    verse: "Filipenses 4:13",
    verseText: "Todo lo puedo en Cristo que me fortalece.",
    application:
      "La fuerza no viene de nosotros, viene de Cristo que vive en nosotros.",
    reflection:
      "¿En qué área hoy necesitas específicamente la fuerza de Cristo?",
  },
  {
    id: "ver-002",
    type: "multiple-choice",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: '¿Qué versículo dice: "El Señor es mi pastor, nada me faltará"?',
    options: ["Salmos 1:1", "Salmos 23:1", "Salmos 91:1", "Salmos 119:105"],
    correctIndex: 1,
    explanation:
      "El Salmo 23:1 es uno de los versículos más conocidos y queridos del Antiguo Testamento.",
    verse: "Salmos 23:1",
    verseText: "Jehová es mi pastor; nada me faltará.",
    application:
      "Cuando reconocemos a Dios como pastor, dejamos de vivir como ovejas perdidas.",
    reflection: "¿Vives como oveja pastoreada o como oveja perdida?",
  },
  {
    id: "ver-003",
    type: "true-false",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      'La Biblia dice: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."',
    correct: true,
    explanation:
      "Este hermoso versículo del Salmo 119:105 expresa el valor de la Palabra de Dios para guiar la vida.",
    verse: "Salmos 119:105",
    verseText: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    application:
      "La Palabra de Dios no ilumina todo el camino, sino el próximo paso. Confía en ella.",
    reflection: "¿Estás usando la Palabra para decidir tus próximos pasos?",
  },
  {
    id: "ver-004",
    type: "fill-blank",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin ___.",
    options: ["fallar", "pecado", "error", "duda"],
    correctIndex: 1,
    explanation:
      "Jesús fue tentado en todo como nosotros, pero sin pecar. Por eso puede compadecerse de nosotros.",
    verse: "Hebreos 4:15",
    verseText:
      "Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado.",
    application:
      "Cuando caes, recuerda que Jesús te entiende y te recibe con gracia.",
    reflection:
      "¿Qué tentación te cuesta más y cómo puedes acercarte a Jesús con ella?",
  },
  {
    id: "ver-005",
    type: "multiple-choice",
    category: "versiculos",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    question: "¿Cuál es el capítulo más largo de la Biblia?",
    options: ["Salmos 23", "Salmos 119", "Isaías 53", "Romanos 8"],
    correctIndex: 1,
    explanation:
      "El Salmo 119 tiene 176 versículos y es el capítulo más largo de toda la Biblia. Está dedicado a la Palabra de Dios.",
    verse: "Salmos 119:1",
    verseText:
      "Bienaventurados los perfectos de camino, los que andan en la ley de Jehová.",
    application:
      "El amor por la Palabra de Dios ocupa un lugar central en la vida del creyente.",
    reflection:
      "¿Cuánto tiempo dedicas a leer y meditar la Palabra cada semana?",
  },
  {
    id: "ver-006",
    type: "true-false",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "Romanos 8:28 dice que todas las cosas ayudan a bien a los que aman a Dios.",
    correct: true,
    explanation:
      "Dios no promete que todo sea bueno, sino que Él obra todo para bien en la vida de quienes le aman.",
    verse: "Romanos 8:28",
    verseText:
      "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
    application:
      "Incluso el dolor y la pérdida pueden ser usados por Dios para formar carácter.",
    reflection:
      "¿Qué situación difícil pasada hoy puedes ver como usada por Dios?",
  },
  {
    id: "ver-007",
    type: "fill-blank",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    verseWithBlank:
      "El fruto del Espíritu es amor, gozo, ___, paciencia, benignidad, bondad, fe...",
    options: ["salud", "paz", "riqueza", "fuerza"],
    correctIndex: 1,
    explanation:
      "Gálatas 5:22-23 lista el fruto del Espíritu: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.",
    verse: "Gálatas 5:22",
    verseText:
      "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.",
    application:
      "El fruto no se fabrica, se cultiva. Se ve con el tiempo al caminar con el Espíritu.",
    reflection:
      "¿Cuál de los frutos del Espíritu sientes que Dios está cultivando más en ti?",
  },
  {
    id: "ver-008",
    type: "hint-deduction",
    category: "versiculos",
    difficulty: "dificil",
    points: 30,
    timeLimit: 45,
    hints: [
      "Está en el Antiguo Testamento.",
      "Fue escrito por un profeta llamado Isaías.",
      "Habla del siervo sufriente.",
      'Dice que "por sus llagas fuimos nosotros curados".',
    ],
    answer: "Isaías 53:5",
    acceptedAnswers: ["isaias 53:5", "isaias 53"],
    explanation:
      "Isaías 53:5 profetiza el sufrimiento y la muerte del Mesías siglos antes de que ocurriera.",
    verse: "Isaías 53:5",
    verseText:
      "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.",
    application:
      "La cruz no fue un accidente; fue el plan eterno de Dios para salvarte.",
    reflection:
      "¿Qué significa para ti que Jesús llevó tus pecados en la cruz?",
  },
  {
    id: "ver-009",
    type: "true-false",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement: 'La Biblia dice: "No temas, porque yo estoy contigo."',
    correct: true,
    explanation:
      "Esta frase aparece varias veces en la Biblia. Una de las más conocidas es Isaías 41:10.",
    verse: "Isaías 41:10",
    verseText:
      "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
    application:
      "El antídoto contra el miedo no es la valentía, sino la presencia de Dios.",
    reflection: "¿Qué miedo necesitas entregarle hoy a Dios?",
  },
  {
    id: "ver-010",
    type: "multiple-choice",
    category: "versiculos",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    question: "¿Cuál es el primer versículo de la Biblia?",
    options: [
      "En el principio creó Dios los cielos y la tierra.",
      "En el principio era el Verbo.",
      "Jehová es mi pastor.",
      "Bienaventurado el varón.",
    ],
    correctIndex: 0,
    explanation:
      "Génesis 1:1 abre toda la Biblia declarando que Dios es el Creador de todo.",
    verse: "Génesis 1:1",
    verseText: "En el principio creó Dios los cielos y la tierra.",
    application:
      "Todo comienza con Dios. Reconocerlo como Creador cambia cómo vemos el mundo y a nosotros mismos.",
    reflection:
      "¿Cómo cambia tu forma de vivir el saber que fuiste creado con propósito?",
  },

  // ---------- NUEVAS: verse-scramble ----------
  {
    id: "ver-011",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 30,
    words: ["pastor", "me", "es", "faltará", "Jehová", "nada", "mi"],
    correctOrder: [4, 2, 6, 0, 5, 1, 3],
    explanation:
      "El Salmo 23:1 declara que Jehová es nuestro pastor y que, bajo Su cuidado, nada nos falta de verdad.",
    verse: "Salmos 23:1",
    verseText: "Jehová es mi pastor; nada me faltará.",
    application:
      "Cuando Dios guía, no hay carencia real. Puede faltar lo que queremos, no lo que necesitamos.",
    reflection: "¿Qué 'carencia' te preocupa hoy, y cómo la ve Dios?",
  },
  {
    id: "ver-012",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    words: ["Cristo", "fortalece", "puedo", "que", "Todo", "en", "me", "lo"],
    correctOrder: [4, 7, 2, 5, 0, 3, 6, 1],
    explanation:
      "Filipenses 4:13 no promete éxito ilimitado, sino fortaleza en Cristo para enfrentar cualquier circunstancia.",
    verse: "Filipenses 4:13",
    verseText: "Todo lo puedo en Cristo que me fortalece.",
    application:
      "La fuerza no viene de nuestra capacidad, viene de Cristo que vive en nosotros.",
    reflection:
      "¿En qué área hoy necesitas específicamente la fuerza de Cristo?",
  },
  {
    id: "ver-013",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    words: ["vida", "camino", "la", "el", "soy", "y", "Yo", "verdad"],
    correctOrder: [6, 4, 3, 1, 2, 7, 5, 0],
    explanation:
      "Jesús se declara el único camino al Padre. No es una verdad más entre muchas; es la Verdad misma.",
    verse: "Juan 14:6",
    verseText:
      "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
    application:
      "Vivir en la verdad de Cristo da dirección y propósito a la vida.",
    reflection: '¿En qué área de tu vida necesitas que Jesús sea "el camino"?',
  },

  // ---------- verse-scramble (batch 2) ----------
  {
    id: "ver-014",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 30,
    words: ["luz", "es", "y", "Jehová", "mi", "salvación"],
    correctOrder: [3, 1, 4, 0, 2, 5],
    explanation:
      "El Salmo 27:1 declara que Jehová es luz y salvación, el antídoto perfecto contra el temor.",
    verse: "Salmos 27:1",
    verseText: "Jehová es mi luz y mi salvación; ¿de quién temeré?",
    application:
      "Cuando la oscuridad te rodea, vuelve a mirar la luz que es Dios mismo.",
    reflection: "¿Qué temor se disipa cuando recuerdas quién es Dios?",
  },
  {
    id: "ver-015",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 30,
    words: ["principio", "los", "Dios", "En", "cielos", "el", "creó"],
    correctOrder: [3, 5, 0, 6, 2, 1, 4],
    explanation:
      "Génesis 1:1 abre toda la Biblia declarando que Dios es el Creador de todo lo que existe.",
    verse: "Génesis 1:1",
    verseText: "En el principio creó Dios los cielos y la tierra.",
    application:
      "Todo comienza con Dios. Reconocerlo como Creador cambia cómo ves el mundo y a ti mismo.",
    reflection:
      "¿Cómo cambia tu forma de vivir el saber que fuiste creado con propósito?",
  },
  {
    id: "ver-016",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "facil",
    points: 10,
    timeLimit: 30,
    words: ["porque", "contigo", "No", "estoy", "yo", "temas"],
    correctOrder: [2, 5, 0, 4, 3, 1],
    explanation:
      "Isaías 41:10 es una de las promesas más repetidas en la Biblia: Dios está con nosotros.",
    verse: "Isaías 41:10",
    verseText:
      "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.",
    application:
      "El antídoto contra el miedo no es la valentía, sino la presencia de Dios.",
    reflection: "¿Qué miedo necesitas entregarle hoy a Dios?",
  },
  {
    id: "ver-017",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    words: [
      "peticiones",
      "Sean",
      "delante",
      "vuestras",
      "de",
      "conocidas",
      "Dios",
    ],
    correctOrder: [1, 5, 3, 0, 2, 4, 6],
    explanation:
      "Filipenses 4:6 invita a presentar todo a Dios en oración, en lugar de vivir con ansiedad.",
    verse: "Filipenses 4:6",
    verseText:
      "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.",
    application:
      "La oración es el lugar donde el afán se convierte en paz. Practícala hoy.",
    reflection: "¿Qué ansiedad necesitas poner hoy delante de Dios?",
  },
  {
    id: "ver-018",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    words: ["nuestro", "y", "Dios", "fortaleza", "es", "amparo"],
    correctOrder: [2, 4, 0, 5, 1, 3],
    explanation:
      "El Salmo 46:1 describe a Dios como amparo y fortaleza disponible en cualquier momento.",
    verse: "Salmos 46:1",
    verseText:
      "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
    application:
      "Cuando venga la tormenta hoy, corre a Él primero.",
    reflection: "¿A quién buscas primero cuando algo va mal?",
  },
  {
    id: "ver-019",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "medio",
    points: 20,
    timeLimit: 40,
    words: [
      "hijos",
      "porque",
      "Dios",
      "Bienaventurados",
      "serán",
      "pacificadores",
      "de",
      "los",
      "llamados",
      "ellos",
    ],
    correctOrder: [3, 7, 5, 1, 9, 4, 8, 0, 6, 2],
    explanation:
      "Mateo 5:9 forma parte de las Bienaventuranzas. Jesús llama hijos de Dios a quienes promueven la paz.",
    verse: "Mateo 5:9",
    verseText:
      "Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.",
    application:
      "La paz no solo se disfruta, se construye. Busca hoy ser artesano de paz.",
    reflection:
      "¿En qué relación puedes ser hoy un pacificador en lugar de un espectador?",
  },
  {
    id: "ver-020",
    type: "verse-scramble",
    category: "versiculos",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    words: ["vida", "Yo", "y", "la", "resurrección", "soy"],
    correctOrder: [1, 5, 3, 4, 2, 0],
    explanation:
      "Juan 11:25 registra una de las declaraciones más grandes de Jesús: Él es la resurrección y la vida.",
    verse: "Juan 11:25",
    verseText:
      "Le dijo Jesús: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.",
    application:
      "La esperanza cristiana no se apoya en circunstancias, sino en una Persona.",
    reflection:
      "¿Cómo cambia tu vida diaria el saber que Jesús es la resurrección?",
  },
];
