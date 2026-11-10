import type { Question } from "../../types";

export const HISTORIA_IGLESIA_QUESTIONS: Question[] = [
  {
    id: "his-001",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué monje agustino clavó las 95 tesis en la puerta de la iglesia del castillo de Wittenberg, iniciando la Reforma Protestante?",
    options: [
      "Juan Calvino",
      "Martín Lutero",
      "John Wesley",
      "Ulrico Zwinglio",
    ],
    correctIndex: 1,
    explanation:
      "Martín Lutero buscó reformar la iglesia al ver prácticas como la venta de indulgencias. Su redescubrimiento de la justificación por la fe marcó la historia.",
    verse: "Romanos 1:17",
    verseText:
      "Porque en el evangelio la justicia de Dios se revela por fe y para fe, como está escrito: Mas el justo por la fe vivirá.",
    application:
      "La verdad del evangelio no se compra ni se vende; es un regalo de gracia recibido por fe.",
    reflection:
      "¿Vives tu fe basado en lo que haces para Dios, o en lo que Cristo hizo por ti?",
    // revisado: 2026-11-10
  },
  {
    id: "his-002",
    type: "true-false",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "Los discípulos fueron llamados cristianos por primera vez en Roma.",
    correct: false,
    explanation:
      "La Biblia registra que el término 'cristiano' se usó por primera vez en Antioquía, donde los creyentes fueron discipulados intensamente.",
    verse: "Hechos 11:26",
    verseText:
      "Y se congregaron allí todo un año con la iglesia, y enseñaron a mucha gente; y a los discípulos se les llamó cristianos por primera vez en Antioquía.",
    application:
      "Ser llamado 'cristiano' es llevar el nombre de Cristo. Es un privilegio y una responsabilidad.",
    reflection: "¿Tu vida refleja el nombre de Cristo que llevas?",
    // revisado: 2026-11-10
  },
  {
    id: "his-003",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Quién predicó el famoso sermón en Pentecostés, donde se bautizaron unas 3000 personas?",
    options: ["Pablo", "Juan", "Santiago", "Pedro"],
    correctIndex: 3,
    explanation:
      "Fue Pedro quien, lleno del Espíritu Santo, predicó valientemente a la multitud en Jerusalén, abriendo paso a la iglesia primitiva.",
    verse: "Hechos 2:14",
    verseText:
      "Entonces Pedro, poniéndose en pie con los once, alzó la voz y les habló: Varones judíos, y todos los que habitáis en Jerusalén, esto os sea notorio, y oíd mis palabras.",
    application:
      "El mismo Pedro que negó a Jesús, lleno del Espíritu, predicó con poder. Dios transforma a los fracasados en líderes.",
    reflection:
      "¿Te has sentido incapaz de hablar de Dios? Recuerda lo que hizo Pedro.",
    // revisado: 2026-11-10
  },
  {
    id: "his-004",
    type: "true-false",
    category: "historia-iglesia",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "El apóstol Pablo escribió la mayoría de las cartas (epístolas) del Nuevo Testamento.",
    correct: true,
    explanation:
      "Pablo escribió 13 epístolas (Romanos a Filemón) que forman una gran parte del Nuevo Testamento, guiando a las primeras iglesias.",
    verse: "2 Pedro 3:15-16",
    verseText:
      "Y tened entendido que la paciencia de nuestro Señor es para salvación; como también nuestro amado hermano Pablo, según la sabiduría que le ha sido dada, os ha escrito, casi en todas sus epístolas.",
    application:
      "Dios usó la mente brillante de Pablo para dejar un legado de doctrina y fe que nos guía hoy.",
    reflection:
      "¿Qué enseñanza de Pablo te ha impactado más en tu vida cristiana?",
    // revisado: 2026-11-10
  },
];
