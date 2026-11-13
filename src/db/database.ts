import Dexie, { type Table } from "dexie";
import type {
  AnsweredQuestion,
  CampaignProgress,
  DailyChallengeProgress,
  GameSession,
  UserProfile,
  UserRating,
} from "../types";
import type {
  ProgresoLeccion,
  RachaDiscipulado,
  LocalSession,
  LocalPlayer,
  LocalRound,
} from "../types/discipleship";
import { RATING_INITIAL } from "../utils/rating";

// ============================================================
// BASE DE DATOS LOCAL (IndexedDB vía Dexie)
// ============================================================

export class MenteEnElCaminoDB extends Dexie {
  profile!: Table<UserProfile, string>;
  answers!: Table<AnsweredQuestion & { id?: number }, number>;
  dailyProgress!: Table<DailyChallengeProgress, string>;
  campaignProgress!: Table<CampaignProgress & { id?: string }, string>;
  sessions!: Table<GameSession, string>;
  userRating!: Table<UserRating, string>;

  // ✅ FIX: Propiedades en snake_case para coincidir con el esquema de Dexie
  progreso_leccion!: Table<ProgresoLeccion, string>;
  racha_discipulado!: Table<RachaDiscipulado, string>;
  local_sessions!: Table<LocalSession, number>;
  local_players!: Table<LocalPlayer, number>;
  local_rounds!: Table<LocalRound, number>;

  constructor() {
    super("MenteEnElCaminoDB");

    this.version(1).stores({
      profile: "id, nickname, level, streak, lastPlayedAt",
      answers: "++id, questionId, correct, answeredAt",
      dailyProgress: "date, completed",
      campaignProgress: "id, categoryId, completed",
      sessions: "id, code, status, createdAt",
    });

    // v2 — Fase 3 · R2: tabla userRating (rating adaptativo).
    this.version(2).stores({
      profile: "id, nickname, level, streak, lastPlayedAt",
      answers: "++id, questionId, correct, answeredAt",
      dailyProgress: "date, completed",
      campaignProgress: "id, categoryId, completed",
      sessions: "id, code, status, createdAt",
      userRating: "id",
    });

    // v3 — Fase 5 · Discipulado + Multijugador local.
    this.version(3).stores({
      profile: "id, nickname, level, streak, lastPlayedAt",
      answers: "++id, questionId, correct, answeredAt",
      dailyProgress: "date, completed",
      campaignProgress: "id, categoryId, completed",
      sessions: "id, code, status, createdAt",
      userRating: "id",
      // Discipulado (B5 = separada)
      progreso_leccion:
        "id, estado, sendaId, primeraRecorridaAt, ultimaActividadAt",
      racha_discipulado: "id, lastDay",
      // Multijugador local (P7: separado de Discipulado)
      local_sessions: "++id, status, startedAt",
      local_players: "++id, sessionId, [sessionId+order]",
      local_rounds: "++id, sessionId, [sessionId+roundNumber]",
    });
  }
}

export const db = new MenteEnElCaminoDB();

// ============================================================
// PERFIL DEL JUGADOR
// ============================================================

const DEFAULT_PROFILE_ID = "local-player";

export function createDefaultProfile(nickname = "Peregrino"): UserProfile {
  return {
    id: DEFAULT_PROFILE_ID,
    nickname,
    avatar: "🙂",
    createdAt: Date.now(),
    xp: 0,
    level: 1,
    streak: 0,
    lastPlayedAt: null,
    badges: [],
    graceShieldAvailable: false,
  };
}

export async function getOrCreateProfile(): Promise<UserProfile> {
  const existing = await db.profile.get(DEFAULT_PROFILE_ID);
  if (existing) return existing;
  const profile = createDefaultProfile();
  await db.profile.put(profile);
  return profile;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await db.profile.put(profile);
}

export function shouldMigrateOnboarding(
  profile: UserProfile | undefined,
  rating: UserRating | undefined,
): boolean {
  return (
    profile !== undefined &&
    profile.onboardingCompleted === undefined &&
    rating !== undefined &&
    rating.answeredCount > 0
  );
}

export async function hasCompletedOnboarding(): Promise<boolean> {
  const profile = await db.profile.get(DEFAULT_PROFILE_ID);
  if (!profile) return false;

  if (profile.onboardingCompleted !== undefined) {
    return profile.onboardingCompleted;
  }

  const rating = await db.userRating.get(DEFAULT_PROFILE_ID);
  if (shouldMigrateOnboarding(profile, rating)) {
    await db.profile.put({ ...profile, onboardingCompleted: true });
    return true;
  }
  return false;
}

export async function updateProfile(
  updater: (profile: UserProfile) => UserProfile,
): Promise<UserProfile> {
  const current = await getOrCreateProfile();
  const updated = updater(current);
  await saveProfile(updated);
  return updated;
}

export async function resetProfile(): Promise<UserProfile> {
  await db.profile.clear();
  await db.answers.clear();
  await db.dailyProgress.clear();
  await db.campaignProgress.clear();
  await db.userRating.clear();
  // ✅ FIX: nombres snake_case
  await db.progreso_leccion.clear();
  await db.racha_discipulado.clear();
  await db.local_sessions.clear();
  await db.local_players.clear();
  await db.local_rounds.clear();
  const profile = createDefaultProfile();
  await db.profile.put(profile);
  return profile;
}

// ============================================================
// RESPUESTAS
// ============================================================

export async function saveAnswer(answer: AnsweredQuestion): Promise<number> {
  return await db.answers.add(answer);
}

export async function saveAnswers(answers: AnsweredQuestion[]): Promise<void> {
  await db.answers.bulkAdd(answers);
}

export async function getAllAnswers(): Promise<AnsweredQuestion[]> {
  return await db.answers.toArray();
}

export async function getAnswersByQuestion(
  questionId: string,
): Promise<AnsweredQuestion[]> {
  return await db.answers.where("questionId").equals(questionId).toArray();
}

export async function getRecentAnswers(
  limit = 50,
): Promise<AnsweredQuestion[]> {
  return await db.answers
    .orderBy("answeredAt")
    .reverse()
    .limit(limit)
    .toArray();
}

export async function countAnswers(): Promise<{
  total: number;
  correct: number;
  wrong: number;
}> {
  const total = await db.answers.count();
  const correct = await db.answers.where("correct").equals(1).count();
  return { total, correct, wrong: total - correct };
}

// ============================================================
// RATING ADAPTATIVO (Fase 3 · R2)
// ============================================================

export function createDefaultUserRating(): UserRating {
  return {
    id: DEFAULT_PROFILE_ID,
    global: RATING_INITIAL,
    answeredCount: 0,
    lastUpdatedAt: Date.now(),
  };
}

export async function getUserRating(): Promise<UserRating> {
  const existing = await db.userRating.get(DEFAULT_PROFILE_ID);
  if (existing) return existing;
  const rating = createDefaultUserRating();
  await db.userRating.put(rating);
  return rating;
}

export async function saveUserRating(rating: UserRating): Promise<void> {
  await db.userRating.put(rating);
}

export async function resetUserRating(): Promise<UserRating> {
  const rating = createDefaultUserRating();
  await db.userRating.put(rating);
  return rating;
}

// ============================================================
// DIFICULTAD ADAPTATIVA — accuracy reciente
// @deprecated desde Fase 3 · R2.
// ============================================================

export async function getRecentAccuracy(limit = 20): Promise<number> {
  const recent = await getRecentAnswers(limit);
  if (recent.length === 0) return 0.5;
  const correct = recent.filter((a) => a.correct).length;
  return correct / recent.length;
}

// ============================================================
// DESAFÍO DIARIO
// ============================================================

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function getTodayProgress(): Promise<
  DailyChallengeProgress | undefined
> {
  return await db.dailyProgress.get(todayKey());
}

export async function saveDailyProgress(
  progress: DailyChallengeProgress,
): Promise<void> {
  await db.dailyProgress.put(progress);
}

export async function markDailyCompleted(
  score: number,
  questionIds: string[],
): Promise<DailyChallengeProgress> {
  const progress: DailyChallengeProgress = {
    date: todayKey(),
    completed: true,
    score,
    questionIds,
  };
  await db.dailyProgress.put(progress);
  return progress;
}

export async function getDailyHistory(
  limit = 30,
): Promise<DailyChallengeProgress[]> {
  return await db.dailyProgress
    .orderBy("date")
    .reverse()
    .limit(limit)
    .toArray();
}

// ============================================================
// PROGRESO DE CAMPAÑA
// ============================================================

function campaignKey(categoryId: string, level: number): string {
  return `${categoryId}-${level}`;
}

export async function getCampaignProgress(
  categoryId: string,
  level: number,
): Promise<CampaignProgress | undefined> {
  return await db.campaignProgress.get(campaignKey(categoryId, level));
}

export async function getAllCampaignProgress(): Promise<CampaignProgress[]> {
  return await db.campaignProgress.toArray();
}

export async function saveCampaignProgress(
  progress: CampaignProgress,
): Promise<void> {
  const record = {
    ...progress,
    id: campaignKey(progress.categoryId, progress.level),
  };
  await db.campaignProgress.put(record);
}

export async function getCompletedCategories(): Promise<string[]> {
  const all = await db.campaignProgress.toArray();
  const completed = all.filter((c) => c.completed).map((c) => c.categoryId);
  return Array.from(new Set(completed));
}

// ============================================================
// SESIONES MULTIJUGADOR (FASE 2)
// ============================================================

export async function saveSession(session: GameSession): Promise<void> {
  await db.sessions.put(session);
}

export async function getSession(id: string): Promise<GameSession | undefined> {
  return await db.sessions.get(id);
}

export async function getSessionByCode(
  code: string,
): Promise<GameSession | undefined> {
  return await db.sessions.where("code").equals(code).first();
}

export async function deleteSession(id: string): Promise<void> {
  await db.sessions.delete(id);
}

// ============================================================
// UTILIDAD: VERIFICAR DISPONIBILIDAD
// ============================================================

export async function isDBAvailable(): Promise<boolean> {
  try {
    await db.profile.count();
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// UTILIDAD: EXPORTAR / IMPORTAR PROGRESO (backup)
// ============================================================

export interface BackupData {
  version: number;
  exportedAt: number;
  profile: UserProfile | undefined;
  answers: AnsweredQuestion[];
  dailyProgress: DailyChallengeProgress[];
  campaignProgress: CampaignProgress[];
  userRating: UserRating | undefined;
  // --- v3 (opcionales para retrocompat con backups v2) ---
  progresoLeccion?: ProgresoLeccion[];
  rachaDiscipulado?: RachaDiscipulado | undefined;
  localSessions?: LocalSession[];
  localPlayers?: LocalPlayer[];
  localRounds?: LocalRound[];
}

export async function exportBackup(): Promise<BackupData> {
  return {
    version: 3,
    exportedAt: Date.now(),
    profile: await db.profile.get(DEFAULT_PROFILE_ID),
    answers: await db.answers.toArray(),
    dailyProgress: await db.dailyProgress.toArray(),
    campaignProgress: await db.campaignProgress.toArray(),
    userRating: await db.userRating.get(DEFAULT_PROFILE_ID),
    progresoLeccion: await db.progreso_leccion.toArray(),
    rachaDiscipulado: await db.racha_discipulado.get("global"),
    localSessions: await db.local_sessions.toArray(),
    localPlayers: await db.local_players.toArray(),
    localRounds: await db.local_rounds.toArray(),
  };
}

export async function importBackup(data: BackupData): Promise<void> {
  await db.transaction(
    "rw",
    [
      db.profile,
      db.answers,
      db.dailyProgress,
      db.campaignProgress,
      db.userRating,
      db.progreso_leccion,
      db.racha_discipulado,
      db.local_sessions,
      db.local_players,
      db.local_rounds,
    ],
    async () => {
      await db.profile.clear();
      await db.answers.clear();
      await db.dailyProgress.clear();
      await db.campaignProgress.clear();
      await db.userRating.clear();
      await db.progreso_leccion.clear();
      await db.racha_discipulado.clear();
      await db.local_sessions.clear();
      await db.local_players.clear();
      await db.local_rounds.clear();

      if (data.profile) await db.profile.put(data.profile);
      if (data.answers.length) await db.answers.bulkAdd(data.answers);
      if (data.dailyProgress.length)
        await db.dailyProgress.bulkPut(data.dailyProgress);
      if (data.campaignProgress.length)
        await db.campaignProgress.bulkPut(data.campaignProgress);
      if (data.userRating) await db.userRating.put(data.userRating);

      // v3 opcional (backups v2 no traen estos campos → no-op)
      if (data.progresoLeccion?.length)
        await db.progreso_leccion.bulkPut(data.progresoLeccion);
      if (data.rachaDiscipulado)
        await db.racha_discipulado.put(data.rachaDiscipulado);
      if (data.localSessions?.length)
        await db.local_sessions.bulkPut(data.localSessions);
      if (data.localPlayers?.length)
        await db.local_players.bulkPut(data.localPlayers);
      if (data.localRounds?.length)
        await db.local_rounds.bulkPut(data.localRounds);
    },
  );
}
