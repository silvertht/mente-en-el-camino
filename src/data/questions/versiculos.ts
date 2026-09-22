import type { Question } from "../../types";

export const VERSICULOS_QUESTIONS: Question[] = [
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
    acceptedAnswers: ["isaías 53:5", "isaias 53:5", "isaías 53", "isaias 53"],
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
];
