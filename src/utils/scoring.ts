import type {
  AnsweredQuestion,
  Badge,
  Difficulty,
  UserProfile,
} from "../types";
import { BADGES } from "../data/badges";

// ============================================================
// PUNTOS BASE POR DIFICULTAD
// ============================================================

export const BASE_POINTS: Record<Difficulty, number> = {
  facil: 10,
  medio: 20,
  dificil: 30,
};

// ============================================================
// BONUS Y PENALIZACIONES
// ============================================================

export const SPEED_BONUS_MAX = 0.5;
export const STREAK_BONUS = 10;
export const STREAK_THRESHOLD = 3;
export const HINT_PENALTY = 5;
export const XP_PER_CORRECT = 10;
export const XP_PER_WRONG = 3;
export const XP_PER_LEVEL_BASE = 100;

// ============================================================
// CÁLCULO DE PUNTOS DE UNA PREGUNTA
// ============================================================

export interface ScoreInput {
  difficulty: Difficulty;
  correct: boolean;
  timeSpent: number;
  timeLimit: number;
  currentStreak: number;
  hintsUsed: number;
}

export function calculateQuestionScore(input: ScoreInput): number {
  const {
    difficulty,
    correct,
    timeSpent,
    timeLimit,
    currentStreak,
    hintsUsed,
  } = input;

  if (!correct) return 0;

  const base = BASE_POINTS[difficulty];

  const ratio = Math.max(0, Math.min(1, 1 - timeSpent / timeLimit));
  const speedBonus = Math.round(base * SPEED_BONUS_MAX * ratio);

  const streakBonus = currentStreak >= STREAK_THRESHOLD ? STREAK_BONUS : 0;

  const penalty = hintsUsed * HINT_PENALTY;

  const total = base + speedBonus + streakBonus - penalty;
  return Math.max(0, total);
}

// ============================================================
// XP Y NIVELES
// ============================================================

export function xpForAnswer(correct: boolean): number {
  return correct ? XP_PER_CORRECT : XP_PER_WRONG;
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / XP_PER_LEVEL_BASE)) + 1;
}

export function xpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel, 2) * XP_PER_LEVEL_BASE;
}

export function xpProgressInLevel(xp: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const level = calculateLevel(xp);
  const xpThisLevel = Math.pow(level - 1, 2) * XP_PER_LEVEL_BASE;
  const xpNextLevel = Math.pow(level, 2) * XP_PER_LEVEL_BASE;
  const current = xp - xpThisLevel;
  const needed = xpNextLevel - xpThisLevel;
  return {
    current,
    needed,
    percent: needed > 0 ? Math.round((current / needed) * 100) : 100,
  };
}

// ============================================================
// RACHA DIARIA
// ============================================================

export function updateStreak(
  profile: UserProfile,
  now: number = Date.now(),
): UserProfile {
  const DAY = 24 * 60 * 60 * 1000;
  const last = profile.lastPlayedAt;

  if (last === null) {
    return { ...profile, streak: 1, lastPlayedAt: now };
  }

  const daysDiff = Math.floor((startOfDay(now) - startOfDay(last)) / DAY);

  if (daysDiff === 0) {
    return { ...profile, lastPlayedAt: now };
  }

  if (daysDiff === 1) {
    const newStreak = profile.streak + 1;
    const shouldRechargeShield = newStreak > 0 && newStreak % 7 === 0;
    return {
      ...profile,
      streak: newStreak,
      lastPlayedAt: now,
      graceShieldAvailable: shouldRechargeShield
        ? true
        : profile.graceShieldAvailable,
    };
  }

  if (profile.graceShieldAvailable) {
    return {
      ...profile,
      streak: profile.streak + 1,
      lastPlayedAt: now,
      graceShieldAvailable: false,
    };
  }

  return {
    ...profile,
    streak: 1,
    lastPlayedAt: now,
  };
}

function startOfDay(timestamp: number): number {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

// ============================================================
// DESBLOQUEO DE INSIGNIAS
// ============================================================

export interface BadgeContext {
  profile: UserProfile;
  totalAnswered: number;
  totalCorrect: number;
  perfectDaily: boolean;
  noHintsCorrect: boolean;
  fastCorrect: boolean;
  completedCategories: string[];
  wonMultiplayerRoom?: boolean;
  hostedRoom?: boolean;
}

/**
 * Devuelve los IDs de TODAS las insignias que el jugador debería tener,
 * dado el contexto actual. No se preocupa por las que ya tiene.
 */
export function evaluateBadges(ctx: BadgeContext): string[] {
  const unlocked: string[] = [];

  const push = (id: string) => {
    if (!unlocked.includes(id)) unlocked.push(id);
  };

  if (ctx.totalAnswered >= 1) push("primer-paso");
  if (ctx.totalCorrect >= 1) push("primera-victoria");

  if (ctx.profile.streak >= 3) push("racha-3");
  if (ctx.profile.streak >= 7) push("racha-7");
  if (ctx.profile.streak >= 30) push("racha-30");

  if (ctx.perfectDaily) push("perfecto-10");
  if (ctx.noHintsCorrect) push("sin-pistas");
  if (ctx.fastCorrect) push("velocista");

  if (ctx.completedCategories.includes("evangelios")) push("evangelista");
  if (ctx.completedCategories.includes("personajes")) push("conoce-personajes");
  if (ctx.completedCategories.includes("versiculos"))
    push("memoriza-versiculos");
  if (ctx.completedCategories.includes("parabolas")) push("cuentacuentos");
  if (ctx.completedCategories.includes("valores")) push("vida-en-valores");

  if (ctx.profile.level >= 5) push("nivel-5");
  if (ctx.profile.level >= 10) push("nivel-10");
  if (ctx.profile.level >= 20) push("nivel-20");

  if (ctx.hostedRoom) push("anfitrion");
  if (ctx.wonMultiplayerRoom) push("campeon-sala");

  return unlocked;
}

/**
 * Dadas las insignias que ya tenía el jugador y las que debería tener ahora,
 * devuelve los objetos Badge de las NUEVAS (para mostrar modal).
 */
export function getNewBadges(before: string[], after: string[]): Badge[] {
  const newIds = after.filter((id) => !before.includes(id));
  return newIds
    .map((id) => BADGES.find((b) => b.id === id))
    .filter((b): b is Badge => b !== undefined);
}

// ============================================================
// RESUMEN DE PARTIDA
// ============================================================

export interface GameSummary {
  correct: number;
  wrong: number;
  totalPoints: number;
  accuracy: number;
  xpGained: number;
  perfect: boolean;
  fastestAnswer: number | null;
}

export function summarizeGame(answers: AnsweredQuestion[]): GameSummary {
  const correct = answers.filter((a) => a.correct).length;
  const wrong = answers.length - correct;
  const totalPoints = answers.reduce((sum, a) => sum + a.pointsEarned, 0);
  const xpGained = answers.reduce((sum, a) => sum + xpForAnswer(a.correct), 0);
  const accuracy =
    answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0;

  const correctTimes = answers.filter((a) => a.correct).map((a) => a.timeSpent);
  const fastestAnswer =
    correctTimes.length > 0 ? Math.min(...correctTimes) : null;

  return {
    correct,
    wrong,
    totalPoints,
    accuracy,
    xpGained,
    perfect: wrong === 0 && answers.length > 0,
    fastestAnswer,
  };
}

// ============================================================
// UTILIDADES DE FORMATO
// ============================================================

export function formatScore(points: number): string {
  return points.toLocaleString("es-ES");
}

export function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}
