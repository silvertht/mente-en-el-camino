import type { Question } from "../../types";

export const APOLOGETICA_QUESTIONS: Question[] = [
  {
    id: "apo-001",
    type: "multiple-choice",
    category: "apologetica",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question:
      "Según el Evangelio de Juan, ¿a quién se le apareció Jesús primero después de resucitar?",
    options: ["A Pedro", "A Juan", "A María Magdalena", "A Tomás"],
    correctIndex: 2,
    explanation:
      "La evidencia bíblica muestra que María Magdalena fue la primera testigo de la resurrección, un testimonio históricamente fuerte porque en esa época el testimonio femenino no era altamente valorado.",
    verse: "Juan 20:16",
    verseText:
      "Jesús le dijo: ¡María! Volviéndose ella, le dijo: ¡Raboni! (que quiere decir, Maestro).",
    application:
      "Dios valora a quienes el mundo a veces ignora, y la resurrección es un hecho histórico verificable.",
    reflection:
      "¿La evidencia de la resurrección fortalece tu fe o aún tienes dudas intelectuales?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-002",
    type: "fill-blank",
    category: "apologetica",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    verseWithBlank:
      "Estad siempre preparados para presentar defensa con mansedumbre y ___ a todo el que os demande razón de la esperanza que hay en vosotros.",
    options: ["firmeza", "reverencia", "sabiduría", "valentía"],
    correctIndex: 1,
    explanation:
      "La apologética no es debatir con arrogancia, sino dar razón de nuestra fe con respeto y temor de Dios.",
    verse: "1 Pedro 3:15",
    verseText:
      "sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros;",
    application:
      "Defender la fe es un mandato, pero la forma importa tanto como el contenido.",
    reflection: "¿Con qué actitud defiendes tu fe cuando alguien te cuestiona?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-003",
    type: "multiple-choice",
    category: "apologetica",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué apóstol dudó de la resurrección de Jesús hasta que vio sus heridas?",
    options: ["Pedro", "Juan", "Tomás", "Judas"],
    correctIndex: 2,
    explanation:
      "Tomás exigió ver las heridas para creer. Jesús no lo rechazó, sino que lo invitó a tocar y creer.",
    verse: "Juan 20:25",
    verseText:
      "Le dijeron, pues, los otros discípulos: Al Señor hemos visto. Él les dijo: Si no viere en sus manos la señal de los clavos, y metiere mi dedo en el lugar de los clavos, y metiere mi mano en su costado, no creeré.",
    application:
      "Dios tiene paciencia con nuestras dudas honestas y siempre nos da evidencia para creer.",
    reflection: "¿Qué duda de fe necesitas llevarle a Dios hoy?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-004",
    type: "true-false",
    category: "apologetica",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "La fe cristiana se basa en hechos históricos verificables, como la resurrección de Jesús, y no solo en sentimientos.",
    correct: true,
    explanation:
      "Pablo dejó claro que si Cristo no resucitó realmente, nuestra fe es vana. La resurrección es un evento histórico, no una metáfora.",
    verse: "1 Corintios 15:14",
    verseText:
      "Y si Cristo no resucitó, vana es entonces nuestra predicación, vana es también vuestra fe.",
    application:
      "Nuestra fe no es un salto al vacío, sino una confianza basada en hechos que ocurrieron en la historia.",
    reflection:
      "¿Cómo te ayuda saber que tu fe está anclada en hechos históricos?",
    // revisado: 2026-11-10
  },
];
