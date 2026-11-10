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
];
