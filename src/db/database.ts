import Dexie, { type Table } from "dexie";
import type {
  AnsweredQuestion,
  CampaignProgress,
  DailyChallengeProgress,
  GameSession,
  UserProfile,
} from "../types";

// ============================================================
// BASE DE DATOS LOCAL (IndexedDB vía Dexie)
// ============================================================

export class MenteEnElCaminoDB extends Dexie {
  profile!: Table<UserProfile, string>;
  answers!: Table<AnsweredQuestion & { id?: number }, number>;
  dailyProgress!: Table<DailyChallengeProgress, string>;
  campaignProgress!: Table<CampaignProgress & { id?: string }, string>;
  sessions!: Table<GameSession, string>;

  constructor() {
    super("MenteEnElCaminoDB");

    this.version(1).stores({
      profile: "id, nickname, level, streak, lastPlayedAt",
      answers: "++id, questionId, correct, answeredAt",
      dailyProgress: "date, completed",
      campaignProgress: "id, categoryId, completed",
      sessions: "id, code, status, createdAt",
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

/**
 * Obtiene el perfil local. Si no existe, lo crea.
 */
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
  const all = await db.answers
    .orderBy("answeredAt")
    .reverse()
    .limit(limit)
    .toArray();
  return all;
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
}

export async function exportBackup(): Promise<BackupData> {
  return {
    version: 1,
    exportedAt: Date.now(),
    profile: await db.profile.get(DEFAULT_PROFILE_ID),
    answers: await db.answers.toArray(),
    dailyProgress: await db.dailyProgress.toArray(),
    campaignProgress: await db.campaignProgress.toArray(),
  };
}

export async function importBackup(data: BackupData): Promise<void> {
  await db.transaction(
    "rw",
    db.profile,
    db.answers,
    db.dailyProgress,
    db.campaignProgress,
    async () => {
      await db.profile.clear();
      await db.answers.clear();
      await db.dailyProgress.clear();
      await db.campaignProgress.clear();

      if (data.profile) await db.profile.put(data.profile);
      if (data.answers.length) await db.answers.bulkAdd(data.answers);
      if (data.dailyProgress.length)
        await db.dailyProgress.bulkPut(data.dailyProgress);
      if (data.campaignProgress.length)
        await db.campaignProgress.bulkPut(data.campaignProgress);
    },
  );
}
