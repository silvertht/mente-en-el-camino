import type { CategoryId, Question } from "../../types";
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
