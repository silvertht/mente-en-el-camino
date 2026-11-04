import type { Question } from "../types";

/**
 * Preguntas de onboarding para calibración inicial del rating.
 * Fase 4 · H-05 (Contrato v2, Maestro 2026-11-03).
 *
 * Garantías:
 *  - 3 items, todos `multiple-choice`, orden fácil → media → difícil.
 *  - IDs `onb-001/002/003` — NO colisionan con el banco de 70.
 *  - NO están en `ALL_QUESTIONS` ni en `QUESTIONS_BY_CATEGORY`.
 *  - NO entran en `pickAdaptiveQuestions`.
 *  - Q3 = Alt 1 (Belsasar) según decisión B1 del Maestro.
 */
export const onboardingQuestions: Question[] = [
  // ── Q1 — fácil · Noé / Génesis 6:14 ───────────────────────
  {
    id: "onb-001",
    type: "multiple-choice",
    category: "personajes",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿Quién construyó el arca?",
    options: ["Moisés", "Noé", "Abraham", "David"],
    correctIndex: 1,
    explanation: "El arca fue refugio del primer pacto.",
    verse: "Génesis 6:14",
    verseText:
      "Hazte un arca de madera de gofer; harás aposentos en el arca, y la calafatearás con brea por dentro y por fuera.",
    application:
      "La obediencia de Noé preservó a su familia y al linaje de la promesa.",
    reflection:
      "¿A qué paso de obediencia te invita Dios hoy, aunque no entiendas todo?",
    // revisado: 2026-11-04
  },

  // ── Q2 — media · Jesús / Mateo 4:2 ────────────────────────
  {
    id: "onb-002",
    type: "multiple-choice",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "¿Cuántos días ayunó Jesús en el desierto?",
    options: ["7", "21", "40", "50"],
    correctIndex: 2,
    explanation: "Jesús venció la tentación con la Palabra.",
    verse: "Mateo 4:2",
    verseText:
      "Y después de haber ayunado cuarenta días y cuarenta noches, tuvo hambre.",
    application:
      "La Palabra de Dios es nuestra defensa cuando la tentación llega.",
    reflection: "¿Qué promesa bíblica puedes memorizar para tu próxima prueba?",
    // revisado: 2026-11-04
  },

  // ── Q3 — difícil · Belsasar / Daniel 5:25 (Alt 1 B1) ──────
  {
    id: "onb-003",
    type: "multiple-choice",
    category: "personajes",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    question: "¿Qué rey vio la escritura en la pared?",
    options: ["Nabucodonosor", "Belsasar", "Darío", "Ciro"],
    correctIndex: 1,
    explanation: "La escritura anunció la caída de Babilonia.",
    verse: "Daniel 5:25",
    verseText:
      "Y esta es la escritura que fue escrita: MENE, MENE, TEKEL, UPHARSIN.",
    application: "Dios pesa los corazones; la soberbia precede a la caída.",
    reflection: "¿En qué área necesitas humillarte delante de Dios?",
    // revisado: 2026-11-04
  },
];
