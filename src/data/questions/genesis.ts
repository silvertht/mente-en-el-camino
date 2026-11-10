import type { Question } from "../../types";

export const GENESIS_QUESTIONS: Question[] = [
  {
    id: "gen-001",
    type: "multiple-choice",
    category: "genesis",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿A quién mató Caín por envidia?",
    options: ["Set", "Abel", "Enoc", "Lamec"],
    correctIndex: 1,
    explanation:
      "El primer homicidio de la humanidad fue fruto de la envidia de Caín hacia su hermano Abel.",
    verse: "Génesis 4:8",
    verseText:
      "Y dijo Caín a su hermano Abel: Salgamos al campo. Y aconteció que estando ellos en el campo, Caín se levantó contra su hermano Abel, y lo mató.",
    application:
      "El pecado acecha a la puerta, pero Dios nos manda dominarlo antes de que nos consuma.",
    reflection: "¿Qué envidia o celo necesitas entregarle a Dios hoy?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-002",
    type: "true-false",
    category: "genesis",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "La humanidad construyó la Torre de Babel para hacerse un nombre y no ser esparcida por la tierra.",
    correct: true,
    explanation:
      "La humanidad quiso exaltarse a sí misma en lugar de obedecer el mandato de Dios de multiplicarse y llenar la tierra.",
    verse: "Génesis 11:4",
    verseText:
      "Y dijeron: Vamos, edifiquémonos una ciudad y una torre, cuya cúspide llegue al cielo; y hagámonos un nombre, por si fuéremos esparcidos sobre la faz de toda la tierra.",
    application:
      "Cuando buscamos nuestra propia gloria, terminamos confundidos. La verdadera grandeza está en exaltar a Dios.",
    reflection: "¿Estás construyendo tu vida para tu gloria o para la de Dios?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-003",
    type: "fill-blank",
    category: "genesis",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    verseWithBlank:
      "Y respondió Abraham: Dios se proveerá de ___ para el holocausto, hijo mío.",
    options: ["cordero", "fuego", "pájaro", "pan"],
    correctIndex: 0,
    explanation:
      "Abraham confió en que Dios proveería incluso cuando le pidió sacrificar a Isaac.",
    verse: "Génesis 22:8",
    verseText:
      "Y respondió Abraham: Dios se proveerá de cordero para el holocausto, hijo mío. E iban juntos.",
    application:
      "La fe no es creer que todo será fácil, sino obedecer aunque no entendamos el proceso.",
    reflection: "¿En qué área te está Dios pidiendo obediencia a ciegas?",
    // revisado: 2026-11-10
  },
];
