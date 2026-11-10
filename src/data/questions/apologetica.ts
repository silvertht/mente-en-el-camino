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
      "La evidencia bíblica muestra que María Magdalena fue la primera testigo de la resurrección, un testimonio históricamente fuerte porque en esa época el testimonio femenino no era altamente valorado, demostrando que la Biblia no inventó la historia.",
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
];
