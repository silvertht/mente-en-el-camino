// ============================================================
// MENTE EN EL CAMINO — Sistema de Rating Adaptativo (Selah)
// ============================================================
// Rating ELO-like que reemplaza la dificultad adaptativa clásica.
// Funciones puras, sin dependencias del store ni de Dexie.
// ============================================================

import type { Difficulty, Question, QuestionType } from "../types";

// ============================================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================================

export const RATING_MIN = 800;
export const RATING_MAX = 2200;
export const RATING_INITIAL = 1200;

export const K_EARLY = 32;
export const K_STABLE = 16;
export const K_EARLY_THRESHOLD = 30;

/** Cap duro: nunca se sirve una pregunta por encima de userRating + MAX_STRETCH. */
export const MAX_STRETCH = 400;

/** Base de rating según dificultad declarada de la pregunta. */
export const DIFFICULTY_BASE: Record<Difficulty, number> = {
  facil: 1100,
  medio: 1350,
  dificil: 1600,
};

/** Modificador de rating según tipo de pregunta (complejidad real). */
export const TYPE_MODIFIER: Record<QuestionType, number> = {
  "multiple-choice": 0,
  "true-false": -50,
  "fill-blank": 30,
  "who-said-it": 50,
  "verse-scramble": 20,
  timeline: 40,
  "hint-deduction": 120,
};

export interface RatingConfig {
  initial: number;
  min: number;
  max: number;
  kEarly: number;
  kStable: number;
  kEarlyThreshold: number;
  lowerBand: number;
  upperBand: number;
  maxStretch: number;
  reinforceRatio: number;
  stretchRatio: number;
}

export const DEFAULT_RATING_CONFIG: RatingConfig = {
  initial: RATING_INITIAL,
  min: RATING_MIN,
  max: RATING_MAX,
  kEarly: K_EARLY,
  kStable: K_STABLE,
  kEarlyThreshold: K_EARLY_THRESHOLD,
  lowerBand: 150,
  upperBand: 100,
  maxStretch: MAX_STRETCH,
  reinforceRatio: 0.2,
  stretchRatio: 0.2,
};

// ============================================================
// RATING DE UNA PREGUNTA (derivado, no manual)
// ============================================================

/**
 * Calcula el rating de una pregunta a partir de su dificultad y tipo.
 * No modifica la pregunta ni su `points`. Es un valor derivado en runtime.
 */
export function getQuestionRating(question: Question): number {
  const base = DIFFICULTY_BASE[question.difficulty];
  const modifier = TYPE_MODIFIER[question.type];
  return clampRating(base + modifier);
}

// ============================================================
// FÓRMULA ELO
// ============================================================

/**
 * Expectativa de acierto del usuario frente a una pregunta.
 * Devuelve un valor en (0, 1).
 */
export function calcExpectedScore(
  userRating: number,
  questionRating: number,
): number {
  return 1 / (1 + Math.pow(10, (questionRating - userRating) / 400));
}

/**
 * Delta de rating tras responder. Positivo si acierta, negativo si falla.
 */
export function calcRatingDelta(
  userRating: number,
  questionRating: number,
  correct: boolean,
  kFactor: number,
): number {
  const expected = calcExpectedScore(userRating, questionRating);
  const result = correct ? 1 : 0;
  return kFactor * (result - expected);
}

/**
 * Factor K según experiencia del usuario.
 * Las primeras N respuestas mueven el rating más rápido (aprendizaje).
 */
export function getKFactor(
  answersCount: number,
  config: RatingConfig = DEFAULT_RATING_CONFIG,
): number {
  return answersCount < config.kEarlyThreshold ? config.kEarly : config.kStable;
}

/**
 * Calcula el nuevo rating del usuario tras una respuesta.
 * Clampea a [RATING_MIN, RATING_MAX] y redondea a entero.
 */
export function updateRating(
  userRating: number,
  questionRating: number,
  correct: boolean,
  answersCount: number,
  config: RatingConfig = DEFAULT_RATING_CONFIG,
): number {
  const k = getKFactor(answersCount, config);
  const delta = calcRatingDelta(userRating, questionRating, correct, k);
  return clampRating(Math.round(userRating + delta));
}

// ============================================================
// CALIBRACIÓN INICIAL (onboarding)
// ============================================================

/**
 * Dado el resultado de N preguntas de calibración, devuelve el rating
 * inicial del usuario. Interpolación lineal entre 1000 y 1450.
 *
 * Con 3 preguntas produce exactamente:
 *   0/3 → 1000 · 1/3 → 1150 · 2/3 → 1300 · 3/3 → 1450
 */
export function calibrateInitialRating(results: boolean[]): number {
  if (results.length === 0) return DEFAULT_RATING_CONFIG.initial;
  const correct = results.filter(Boolean).length;
  const accuracy = correct / results.length;
  return clampRating(Math.round(1000 + 450 * accuracy));
}

// ============================================================
// BANDA Y SELECCIÓN
// ============================================================

export function getRatingBand(
  userRating: number,
  lowerBand: number = DEFAULT_RATING_CONFIG.lowerBand,
  upperBand: number = DEFAULT_RATING_CONFIG.upperBand,
): { min: number; max: number } {
  return {
    min: userRating - lowerBand,
    max: userRating + upperBand,
  };
}

export interface SplitPool {
  below: Question[];
  within: Question[];
  above: Question[];
}

/**
 * Divide el pool en tres buckets según el rating de cada pregunta y la
 * banda del usuario. `below` = refuerzo · `within` = reto justo · `above` = aspiracional.
 */
export function splitPoolByBand(
  pool: Question[],
  userRating: number,
  lowerBand?: number,
  upperBand?: number,
): SplitPool {
  const { min, max } = getRatingBand(userRating, lowerBand, upperBand);
  const below: Question[] = [];
  const within: Question[] = [];
  const above: Question[] = [];

  for (const q of pool) {
    const r = getQuestionRating(q);
    if (r < min) below.push(q);
    else if (r > max) above.push(q);
    else within.push(q);
  }

  return { below, within, above };
}

export interface PickQuestionsOptions {
  lowerBand?: number;
  upperBand?: number;
  maxStretch?: number;
  reinforceRatio?: number;
  stretchRatio?: number;
  excludeIds?: Set<string>;
  random?: () => number;
}

/**
 * Selecciona N preguntas para un usuario según su rating.
 *
 * Reglas:
 *  - Cap duro: se descartan preguntas con rating > userRating + maxStretch.
 *    Esto evita frustración (un usuario 1200 jamás recibe una 1720).
 *  - Mezcla: 60% dentro de banda · 20% refuerzo · 20% aspiracional.
 *  - Rellena con lo que sobre si algún bucket se agota.
 *  - Devuelve shuffled para evitar orden predecible.
 *  - Si tras el cap el pool es menor que `count`, devuelve lo que haya
 *    (regla estricta: mejor pocas que frustrar).
 */
export function pickQuestionsByRating(
  pool: Question[],
  userRating: number,
  count: number,
  options: PickQuestionsOptions = {},
): Question[] {
  const {
    lowerBand = DEFAULT_RATING_CONFIG.lowerBand,
    upperBand = DEFAULT_RATING_CONFIG.upperBand,
    maxStretch = DEFAULT_RATING_CONFIG.maxStretch,
    reinforceRatio = DEFAULT_RATING_CONFIG.reinforceRatio,
    stretchRatio = DEFAULT_RATING_CONFIG.stretchRatio,
    excludeIds,
    random = Math.random,
  } = options;

  const cap = userRating + maxStretch;

  // Filtra por excludeIds Y por cap de stretch.
  const available = pool.filter((q) => {
    if (excludeIds?.has(q.id)) return false;
    return getQuestionRating(q) <= cap;
  });

  if (available.length <= count) {
    return shuffle(available, random);
  }

  const { below, within, above } = splitPoolByBand(
    available,
    userRating,
    lowerBand,
    upperBand,
  );

  const reinforceCount = Math.round(count * reinforceRatio);
  const stretchCount = Math.round(count * stretchRatio);
  const coreCount = Math.max(0, count - reinforceCount - stretchCount);

  const picked: Question[] = [];
  const used = new Set<string>();

  const takeFrom = (bucket: Question[], n: number): Question[] => {
    const filtered = bucket.filter((q) => !used.has(q.id));
    const shuffled = shuffle(filtered, random);
    const take = shuffled.slice(0, n);
    take.forEach((q) => used.add(q.id));
    return take;
  };

  picked.push(...takeFrom(within, coreCount));
  picked.push(...takeFrom(below, reinforceCount));
  picked.push(...takeFrom(above, stretchCount));

  // Relleno si algún bucket se agotó.
  if (picked.length < count) {
    const leftovers = available.filter((q) => !used.has(q.id));
    picked.push(...shuffle(leftovers, random).slice(0, count - picked.length));
  }

  return shuffle(picked, random);
}

// ============================================================
// ETIQUETAS PARA UI (usadas por Profile en handoff a Visual)
// ============================================================

export function getRatingLabel(rating: number): string {
  if (rating < 1100) return "Aprendiz";
  if (rating < 1300) return "Explorador";
  if (rating < 1500) return "Discípulo";
  if (rating < 1700) return "Maestro";
  if (rating < 1900) return "Sabio";
  return "Teólogo";
}

// ============================================================
// HELPERS INTERNOS
// ============================================================

export function clampRating(value: number): number {
  if (value < RATING_MIN) return RATING_MIN;
  if (value > RATING_MAX) return RATING_MAX;
  return value;
}

function shuffle<T>(arr: T[], random: () => number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
