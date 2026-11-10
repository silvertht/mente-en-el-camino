import type { CategoryId, Question } from "../../types";
import { getUserRating } from "../../db/database";
import { pickQuestionsByRating } from "../../utils/rating";

// ============================================================
// CONTEO ESTÁTICO (Para renderizado síncrono en Home.tsx)
// ============================================================

export const QUESTION_COUNTS: Record<CategoryId, number> = {
  evangelios: 20,
  personajes: 10,
  versiculos: 20,
  parabolas: 10,
  valores: 10,
  genesis: 8,
  exodo: 8,
  apologetica: 7,
  "historia-iglesia": 7,
};

export const ALL_QUESTIONS: Question[] = [];
export const QUESTIONS_BY_CATEGORY: Record<CategoryId, Question[]> = {
  evangelios: [],
  personajes: [],
  versiculos: [],
  parabolas: [],
  valores: [],
  genesis: [],
  exodo: [],
  apologetica: [],
  "historia-iglesia": [],
};

let isLoaded = false;
let loadingPromise: Promise<void> | null = null;

export async function loadQuestionBank(): Promise<void> {
  if (isLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const [ev, pe, ve, pa, va, ge, ex, ap, hi] = await Promise.all([
      import("./evangelios").then((m) => m.EVANGELIOS_QUESTIONS),
      import("./personajes").then((m) => m.PERSONAJES_QUESTIONS),
      import("./versiculos").then((m) => m.VERSICULOS_QUESTIONS),
      import("./parabolas").then((m) => m.PARABOLAS_QUESTIONS),
      import("./valores").then((m) => m.VALORES_QUESTIONS),
      import("./genesis").then((m) => m.GENESIS_QUESTIONS),
      import("./exodo").then((m) => m.EXODO_QUESTIONS),
      import("./apologetica").then((m) => m.APOLOGETICA_QUESTIONS),
      import("./historia-iglesia").then((m) => m.HISTORIA_IGLESIA_QUESTIONS),
    ]);

    ALL_QUESTIONS.push(
      ...ev,
      ...pe,
      ...ve,
      ...pa,
      ...va,
      ...ge,
      ...ex,
      ...ap,
      ...hi,
    );

    QUESTIONS_BY_CATEGORY.evangelios.push(...ev);
    QUESTIONS_BY_CATEGORY.personajes.push(...pe);
    QUESTIONS_BY_CATEGORY.versiculos.push(...ve);
    QUESTIONS_BY_CATEGORY.parabolas.push(...pa);
    QUESTIONS_BY_CATEGORY.valores.push(...va);
    QUESTIONS_BY_CATEGORY.genesis.push(...ge);
    QUESTIONS_BY_CATEGORY.exodo.push(...ex);
    QUESTIONS_BY_CATEGORY.apologetica.push(...ap);
    QUESTIONS_BY_CATEGORY["historia-iglesia"].push(...hi);

    isLoaded = true;
  })();

  return loadingPromise;
}

// ... (helpers y selección adaptativa se mantienen igual)
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
export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
export function pickRandomQuestions(count: number): Question[] {
  return shuffle(ALL_QUESTIONS).slice(0, count);
}
export function pickRandomFromCategory(
  categoryId: CategoryId,
  count: number,
): Question[] {
  const pool = getQuestionsByCategory(categoryId);
  return shuffle(pool).slice(0, count);
}
export function countQuestionsByCategory(): Record<CategoryId, number> {
  return { ...QUESTION_COUNTS };
}
export async function pickAdaptiveQuestions(
  count: number,
  categoryId?: CategoryId,
): Promise<Question[]> {
  await loadQuestionBank();
  const rating = await getUserRating();
  const basePool = categoryId
    ? getQuestionsByCategory(categoryId)
    : ALL_QUESTIONS;
  return pickQuestionsByRating(basePool, rating.global, count);
}

// ... (auditorías se mantienen igual)
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
export async function auditQuestionData(): Promise<QuestionDataAudit> {
  await loadQuestionBank();
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
export interface AcceptedAnswersAudit {
  total: number;
  malformed: { id: string; issue: string; answers: string[] }[];
}
function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export async function auditAcceptedAnswers(): Promise<AcceptedAnswersAudit> {
  await loadQuestionBank();
  const malformed: AcceptedAnswersAudit["malformed"] = [];
  const hintQuestions = ALL_QUESTIONS.filter(
    (q) => q.type === "hint-deduction",
  );
  for (const q of hintQuestions) {
    if (q.type !== "hint-deduction") continue;
    const issues: string[] = [];
    if (q.acceptedAnswers.some((a) => a !== a.toLowerCase()))
      issues.push("tiene mayúsculas");
    if (q.acceptedAnswers.some((a) => /[áéíóúñü]/i.test(a)))
      issues.push("tiene tildes/ñ");
    if (q.acceptedAnswers.length < 1) issues.push("sin variantes");
    const answerNorm = stripDiacritics(q.answer.toLowerCase());
    const acceptedNorm = q.acceptedAnswers.map((a) =>
      stripDiacritics(a.toLowerCase()),
    );
    if (!acceptedNorm.includes(answerNorm))
      issues.push("answer no está en acceptedAnswers (normalizado)");
    if (issues.length > 0)
      malformed.push({
        id: q.id,
        issue: issues.join(", "),
        answers: q.acceptedAnswers,
      });
  }
  return { total: hintQuestions.length, malformed };
}
