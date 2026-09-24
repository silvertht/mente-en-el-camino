import type { Question } from "../../types";

export const PERSONAJES_QUESTIONS: Question[] = [
  {
    id: "per-001",
    type: "multiple-choice",
    category: "personajes",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿Quién lideró al pueblo de Israel fuera de Egipto?",
    options: ["Josué", "Abraham", "Moisés", "David"],
    correctIndex: 2,
    explanation:
      "Moisés fue el libertador que Dios usó para sacar a Israel de Egipto y recibir la Ley en el Sinaí.",
    verse: "Éxodo 3:10",
    verseText:
      "Ven, por tanto, ahora, y te enviaré a Faraón, para que saques de Egipto a mi pueblo, los hijos de Israel.",
    application: "Dios llama a personas comunes para misiones extraordinarias.",
    reflection:
      '¿Qué te ha llamado Dios a hacer que sientes que no eres "suficiente" para lograrlo?',
  },
  {
    id: "per-002",
    type: "who-said-it",
    category: "personajes",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    quote:
      "Vete de tu tierra y de tu parentela, y de la casa de tu padre, a la tierra que te mostraré.",
    options: ["Moisés", "Abraham", "Josué", "Jacob"],
    correctIndex: 1,
    explanation:
      "Dios llamó a Abraham a dejar todo lo conocido para ir a una tierra prometida, prometiéndole una gran descendencia.",
    verse: "Génesis 12:1",
    verseText:
      "Pero Jehová había dicho a Abram: Vete de tu tierra y de tu parentela, y de la casa de tu padre, a la tierra que te mostraré.",
    application:
      "Seguir a Dios a veces implica dejar lo cómodo para recibir lo mejor.",
    reflection: '¿A qué te está llamando Dios a "dejar" para avanzar?',
  },
  {
    id: "per-003",
    type: "true-false",
    category: "personajes",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement: "David derrotó a Goliat con una espada.",
    correct: false,
    explanation:
      "David derrotó a Goliat con una honda y una piedra, en el nombre del Señor. Luego usó la espada del gigante para cortarle la cabeza.",
    verse: "1 Samuel 17:49-50",
    verseText:
      "Y metiendo David su mano en la bolsa, tomó de allí una piedra, y la tiró con la honda, e hirió al filisteo en la frente.",
    application: "Dios usa lo pequeño y lo humilde para vencer lo grande.",
    reflection:
      '¿Qué "gigante" enfrentas hoy, y qué "piedra" tienes disponible?',
  },
  {
    id: "per-004",
    type: "multiple-choice",
    category: "personajes",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "¿Quién fue la madre de Isaac?",
    options: ["Rebeca", "Raquel", "Sara", "Agar"],
    correctIndex: 2,
    explanation:
      "Sara, esposa de Abraham, dio a luz a Isaac en su vejez, cumpliendo la promesa de Dios.",
    verse: "Génesis 21:2",
    verseText:
      "Y Sara concibió y dio a Abraham un hijo en su vejez, en el tiempo que Dios le había dicho.",
    application:
      "Para Dios no hay tiempo perdido. Sus promesas se cumplen en Su tiempo.",
    reflection: "¿Qué promesa estás esperando que Dios cumpla?",
  },
  {
    id: "per-005",
    type: "hint-deduction",
    category: "personajes",
    difficulty: "dificil",
    points: 30,
    timeLimit: 45,
    hints: [
      "Fui pastor de ovejas antes de ser rey.",
      "Fui el menor de mis hermanos.",
      "Toqué el arpa para calmar a un rey atormentado.",
      "Escribí muchos de los Salmos.",
    ],
    answer: "David",
    acceptedAnswers: ["david", "rey david", "el rey david"],
    explanation:
      'David fue pastor, músico, guerrero y rey. Dios lo llamó "varón conforme a mi corazón".',
    verse: "1 Samuel 16:13",
    verseText:
      "Y Samuel tomó el cuerno del aceite, y lo ungió en medio de sus hermanos; y desde aquel día en adelante el Espíritu de Jehová vino sobre David.",
    application:
      "Dios mira el corazón, no las apariencias ni el orden de nacimiento.",
    reflection: "¿Cómo ves tu propio valor frente a cómo lo ve Dios?",
  },
  {
    id: "per-006",
    type: "true-false",
    category: "personajes",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement: "Ester era judía y llegó a ser reina de Persia.",
    correct: true,
    explanation:
      "Ester, prima de Mardoqueo, fue elegida reina por el rey Asuero y usó su posición para salvar a su pueblo.",
    verse: "Ester 2:17",
    verseText:
      "Y el rey amó a Ester más que a todas las mujeres, y halló ella gracia y benevolencia delante de él más que todas las demás vírgenes; y puso la corona real en su cabeza, y la hizo reina en lugar de Vasti.",
    application:
      "Dios puede colocarte en lugares estratégicos para un propósito mayor.",
    reflection: '¿En qué "posición" te ha puesto Dios para bendecir a otros?',
  },
  {
    id: "per-007",
    type: "multiple-choice",
    category: "personajes",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "¿Quién traicionó a Jesús por 30 piezas de plata?",
    options: ["Pedro", "Tomás", "Judas Iscariote", "Barrabás"],
    correctIndex: 2,
    explanation:
      "Judas Iscariote, uno de los doce, entregó a Jesús por 30 monedas de plata, cumpliendo la profecía de Zacarías.",
    verse: "Mateo 26:15",
    verseText:
      "Y les dijo: ¿Qué me queréis dar, y yo os lo entregaré? Y ellos le asignaron treinta piezas de plata.",
    application: "El amor al dinero puede cegarnos y llevarnos lejos de Dios.",
    reflection: "¿Hay algo que te esté alejando lentamente de Jesús?",
  },
  {
    id: "per-008",
    type: "fill-blank",
    category: "personajes",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    verseWithBlank: "Jehová es mi pastor; nada me ___.",
    options: ["faltará", "sobrará", "temeré", "dolerá"],
    correctIndex: 0,
    explanation:
      "El Salmo 23, escrito por David, expresa la confianza absoluta en el cuidado de Dios.",
    verse: "Salmos 23:1",
    verseText: "Jehová es mi pastor; nada me faltará.",
    application:
      "Cuando Dios guía, no hay carencia real. Puede faltar lo que queremos, no lo que necesitamos.",
    reflection: '¿Qué "carencia" te preocupa hoy, y cómo la ve Dios?',
  },
  {
    id: "per-009",
    type: "true-false",
    category: "personajes",
    difficulty: "dificil",
    points: 30,
    timeLimit: 25,
    statement: "Pablo fue uno de los doce apóstoles originales de Jesús.",
    correct: false,
    explanation:
      "Pablo no fue uno de los doce. Se convirtió después de la resurrección, en el camino a Damasco, y se convirtió en apóstol de los gentiles.",
    verse: "Hechos 9:15",
    verseText:
      "El Señor le dijo: Ve, porque instrumento escogido me es este, para que lleve mi nombre en presencia de los gentiles, y de reyes, y de los hijos de Israel.",
    application:
      "Dios puede transformar al peor enemigo en el mejor instrumento.",
    reflection:
      '¿Conoces a alguien que parece "imposible" de alcanzar para Dios?',
  },
  {
    id: "per-010",
    type: "hint-deduction",
    category: "personajes",
    difficulty: "dificil",
    points: 30,
    timeLimit: 45,
    hints: [
      "Fui profeta en el reino del norte.",
      "Enfrenté a 450 profetas de Baal en el monte Carmelo.",
      "Dios me alimentó con cuervos.",
      "Fui llevado al cielo en un torbellino.",
    ],
    answer: "Elías",
    acceptedAnswers: ["elias", "profeta elias"],
    explanation:
      "Elías fue uno de los profetas más importantes de Israel. Defendió la adoración a Jehová y no murió, sino que fue arrebatado al cielo.",
    verse: "2 Reyes 2:11",
    verseText:
      "Y aconteció que yendo ellos y hablando, he aquí un carro de fuego con caballos de fuego apartó a los dos; y Elías subió al cielo en un torbellino.",
    application:
      "La fidelidad a Dios en tiempos difíciles deja un legado eterno.",
    reflection:
      "¿Cómo te mantienes fiel a Dios cuando el ambiente te presiona?",
  },
];
