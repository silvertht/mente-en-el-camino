import type { CategoryId, Question } from "../../types";
import { getUserRating } from "../../db/database";
import { pickQuestionsByRating } from "../../utils/rating";
import { EVANGELIOS_QUESTIONS } from "./evangelios";
import { PERSONAJES_QUESTIONS } from "./personajes";
import { VERSICULOS_QUESTIONS } from "./versiculos";
import { PARABOLAS_QUESTIONS } from "./parabolas";
import { VALORES_QUESTIONS } from "./valores";

// ============================================================
// TODAS LAS PREGUNTAS DEL MVP
// ============================================================

export const ALL_QUESTIONS: Question[] = [
  ...EVANGELIOS_QUESTIONS,
  ...PERSONAJES_QUESTIONS,
  ...VERSICULOS_QUESTIONS,
  ...PARABOLAS_QUESTIONS,
  ...VALORES_QUESTIONS,
];

// Índice por categoría para acceder rápido
export const QUESTIONS_BY_CATEGORY: Record<CategoryId, Question[]> = {
  evangelios: EVANGELIOS_QUESTIONS,
  personajes: PERSONAJES_QUESTIONS,
  versiculos: VERSICULOS_QUESTIONS,
  parabolas: PARABOLAS_QUESTIONS,
  valores: VALORES_QUESTIONS,
  genesis: [],
  exodo: [],
  apologetica: [],
  "historia-iglesia": [],
};

// ============================================================
// HELPERS
// ============================================================

export function getQuestionsByCategory(categoryId: CategoryId): Question[] {
  return QUESTIONS_BY_CATEGORY[categoryId] ?? [];
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
  return ids
    .map((id) => map.get(id))
    .filter((q): q is Question => q !== undefined);
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

/**
 * Mezcla aleatoriamente un array (algoritmo Fisher-Yates).
 */
export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selecciona N preguntas al azar de todas las categorías.
 * Ideal para el desafío diario.
 */
export function pickRandomQuestions(count: number): Question[] {
  return shuffle(ALL_QUESTIONS).slice(0, count);
}

/**
 * Selecciona N preguntas al azar de una categoría específica.
 * Ideal para el modo campaña.
 */
export function pickRandomFromCategory(
  categoryId: CategoryId,
  count: number,
): Question[] {
  const pool = getQuestionsByCategory(categoryId);
  return shuffle(pool).slice(0, count);
}

/**
 * Devuelve cuántas preguntas hay por categoría (útil para la UI).
 */
export function countQuestionsByCategory(): Record<CategoryId, number> {
  const result = {} as Record<CategoryId, number>;
  for (const [cat, list] of Object.entries(QUESTIONS_BY_CATEGORY)) {
    result[cat as CategoryId] = list.length;
  }
  return result;
}

// ============================================================
// SELECCIÓN ADAPTATIVA POR RATING (Fase 3 · R3)
// ============================================================
// Reemplaza la lógica anterior basada en `getRecentAccuracy`. Ahora lee
// el rating persistente del usuario y delega la selección a
// `pickQuestionsByRating`, que aplica banda ±(150/100) y cap +400.
//
// Firma pública sin cambios: `pickAdaptiveQuestions(count, categoryId?)`.
// ============================================================

/**
 * Selecciona `count` preguntas adaptadas al rating actual del usuario.
 *
 * Reglas (R3):
 *  - Lee `getUserRating().global` (persistido en Dexie).
 *  - Delega en `pickQuestionsByRating` (rating ELO, cap +400, mezcla 60/20/20).
 *  - Sin puerta explícita de "trampas": el rating ya filtra naturalmente.
 *  - Si `categoryId` se pasa, restringe el pool a esa categoría.
 *  - Puede devolver menos de `count` si el cap deja el pool corto
 *    (regla estricta: mejor pocas que frustrar).
 *
 * @param count       número deseado de preguntas.
 * @param categoryId  si se pasa, limita a esa categoría (campaña).
 */
export async function pickAdaptiveQuestions(
  count: number,
  categoryId?: CategoryId,
): Promise<Question[]> {
  const rating = await getUserRating();
  const basePool = categoryId
    ? getQuestionsByCategory(categoryId)
    : ALL_QUESTIONS;
  return pickQuestionsByRating(basePool, rating.global, count);
}

// ============================================================
// AUDITORÍA DE DATA (útil para UX y contenido)
// ============================================================

export interface QuestionDataAudit {
  total: number;
  withVerse: number;
  withVerseText: number;
  withApplication: number;
  withReflection: number;
  missing: {
    verse: string[];
    verseText: string[];
    application: string[];
    reflection: string[];
  };
}

/**
 * Reporta qué preguntas les falta cada campo educativo opcional.
 * Sirve para planificar ampliación de contenido y para que UX
 * sepa qué puede esperar en el bloque post-respuesta.
 *
 * Uso en dev: console.table(auditQuestionData())
 */
export function auditQuestionData(): QuestionDataAudit {
  const missing = {
    verse: [] as string[],
    verseText: [] as string[],
    application: [] as string[],
    reflection: [] as string[],
  };

  for (const q of ALL_QUESTIONS) {
    if (!q.verse) missing.verse.push(q.id);
    if (!q.verseText) missing.verseText.push(q.id);
    if (!q.application) missing.application.push(q.id);
    if (!q.reflection) missing.reflection.push(q.id);
  }

  const total = ALL_QUESTIONS.length;
  return {
    total,
    withVerse: total - missing.verse.length,
    withVerseText: total - missing.verseText.length,
    withApplication: total - missing.application.length,
    withReflection: total - missing.reflection.length,
    missing,
  };
}

// ============================================================
// AUDITORÍA DE acceptedAnswers (hint-deduction)
// ============================================================

export interface AcceptedAnswersAudit {
  total: number;
  malformed: {
    id: string;
    issue: string;
    answers: string[];
  }[];
}

function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Verifica que las hint-deduction cumplan las reglas del proyecto:
 *  - acceptedAnswers en minúsculas.
 *  - acceptedAnswers sin tildes.
 *  - answer (normalizada) incluida en acceptedAnswers (normalizadas).
 *  - Al menos una variante.
 *
 * Uso en dev: console.table(auditAcceptedAnswers().malformed)
 */
export function auditAcceptedAnswers(): AcceptedAnswersAudit {
  const malformed: AcceptedAnswersAudit["malformed"] = [];

  const hintQuestions = ALL_QUESTIONS.filter(
    (q) => q.type === "hint-deduction",
  );

  for (const q of hintQuestions) {
    if (q.type !== "hint-deduction") continue;
    const issues: string[] = [];

    if (q.acceptedAnswers.some((a) => a !== a.toLowerCase())) {
      issues.push("tiene mayúsculas");
    }
    if (q.acceptedAnswers.some((a) => /[áéíóúñü]/i.test(a))) {
      issues.push("tiene tildes/ñ");
    }
    if (q.acceptedAnswers.length < 1) {
      issues.push("sin variantes");
    }

    const answerNorm = stripDiacritics(q.answer.toLowerCase());
    const acceptedNorm = q.acceptedAnswers.map((a) =>
      stripDiacritics(a.toLowerCase()),
    );
    if (!acceptedNorm.includes(answerNorm)) {
      issues.push("answer no está en acceptedAnswers (normalizado)");
    }

    if (issues.length > 0) {
      malformed.push({
        id: q.id,
        issue: issues.join(", "),
        answers: q.acceptedAnswers,
      });
    }
  }

  return { total: hintQuestions.length, malformed };
}
