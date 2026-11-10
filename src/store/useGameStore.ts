import { create } from "zustand";
import type {
  AnsweredQuestion,
  Badge,
  CategoryId,
  GameMode,
  GameState,
  Question,
  UserProfile,
  UserRating,
} from "../types";
import {
  getOrCreateProfile,
  saveProfile,
  saveAnswers,
  getCompletedCategories,
  markDailyCompleted,
  getUserRating,
  saveUserRating,
  resetUserRating,
  shouldMigrateOnboarding,
} from "../db/database";
import {
  calculateQuestionScore,
  calculateLevel,
  evaluateBadges,
  getNewBadges,
  summarizeGame,
  updateStreak,
  // xpForAnswer <- ELIMINADO (ya no se usa aquí)
} from "../utils/scoring";
import {
  getQuestionRating,
  updateRating,
  calibrateInitialRating,
} from "../utils/rating";
import { pickAdaptiveQuestions } from "../data/questions";

// ============================================================
// IN-FLIGHT GUARD (DF-1)
// ============================================================
let isCompletingOnboarding = false;

// ============================================================
// ESTADO DE LA TIENDA
// ============================================================

interface GameStoreState {
  profile: UserProfile | null;
  game: GameState | null;
  userRating: UserRating | null;
  isLoading: boolean;
  isLoadingQuestions: boolean;
  error: string | null;

  lastAnswerCorrect: boolean | null;
  lastAnswerPoints: number;
  lastAnswerExplanation: string | null;

  newlyUnlockedBadges: Badge[];

  init: () => Promise<void>;
  setNickname: (nickname: string) => Promise<void>;
  startGame: (mode: GameMode, questions: Question[]) => void;
  loadAndStartGame: (
    mode: GameMode,
    count: number,
    categoryId?: CategoryId,
  ) => Promise<void>;
  answerQuestion: (params: {
    selectedIndex?: number;
    selectedBool?: boolean;
    selectedText?: string;
    selectedOrder?: number[];
    timeSpent: number;
    hintsUsed?: number;
  }) => Promise<void>;
  nextQuestion: () => void;
  finishGame: () => Promise<void>;
  resetGame: () => void;
  clearFeedback: () => void;
  clearNewBadges: () => void;
  calibrateWithResults: (results: boolean[]) => Promise<void>;
  resetRating: () => Promise<void>;
  completeOnboarding: (results: boolean[]) => Promise<void>;
}

// ============================================================
// TIENDA
// ============================================================

export const useGameStore = create<GameStoreState>((set, get) => ({
  profile: null,
  game: null,
  userRating: null,
  isLoading: false,
  isLoadingQuestions: false,
  error: null,
  lastAnswerCorrect: null,
  lastAnswerPoints: 0,
  lastAnswerExplanation: null,
  newlyUnlockedBadges: [],

  init: async () => {
    set({ isLoading: true, error: null });
    try {
      const [profile, userRating] = await Promise.all([
        getOrCreateProfile(),
        getUserRating(),
      ]);
      const level = calculateLevel(profile.xp);
      let synced: UserProfile = { ...profile, level };

      if (shouldMigrateOnboarding(profile, userRating)) {
        synced = { ...synced, onboardingCompleted: true };
        await saveProfile(synced);
      } else if (level !== profile.level) {
        await saveProfile(synced);
      }

      set({ profile: synced, userRating, isLoading: false });
    } catch (e) {
      set({ error: (e as Error).message, isLoading: false });
    }
  },

  setNickname: async (nickname) => {
    const { profile } = get();
    if (!profile) return;
    const updated = { ...profile, nickname: nickname.trim() || "Peregrino" };
    await saveProfile(updated);
    set({ profile: updated });
  },

  startGame: (mode, questions) => {
    const game: GameState = {
      mode,
      questions,
      currentIndex: 0,
      score: 0,
      streak: 0,
      hintsUsed: 0,
      answers: [],
      startedAt: Date.now(),
      finishedAt: null,
    };
    set({
      game,
      lastAnswerCorrect: null,
      lastAnswerPoints: 0,
      lastAnswerExplanation: null,
      newlyUnlockedBadges: [],
    });
  },

  loadAndStartGame: async (mode, count, categoryId) => {
    set({ isLoadingQuestions: true, error: null });
    try {
      const questions = await pickAdaptiveQuestions(count, categoryId);
      get().startGame(mode, questions);
    } catch (e) {
      set({ error: (e as Error).message });
    } finally {
      set({ isLoadingQuestions: false });
    }
  },

  answerQuestion: async ({
    selectedIndex,
    selectedBool,
    selectedText,
    selectedOrder,
    timeSpent,
    hintsUsed = 0,
  }) => {
    const { game } = get();
    if (!game) return;

    const question = game.questions[game.currentIndex];
    const isCorrect = checkAnswer(question, {
      selectedIndex,
      selectedBool,
      selectedText,
      selectedOrder,
    });

    const timeLimit = question.timeLimit ?? 30;
    const points = calculateQuestionScore({
      difficulty: question.difficulty,
      correct: isCorrect,
      timeSpent,
      timeLimit,
      currentStreak: game.streak,
      hintsUsed,
    });

    const newStreak = isCorrect ? game.streak + 1 : 0;

    const answer: AnsweredQuestion = {
      questionId: question.id,
      correct: isCorrect,
      timeSpent,
      pointsEarned: points,
      answeredAt: Date.now(),
      hintsUsed: hintsUsed || undefined,
    };

    const updatedGame: GameState = {
      ...game,
      score: game.score + points,
      streak: newStreak,
      hintsUsed: game.hintsUsed + hintsUsed,
      answers: [...game.answers, answer],
    };

    set({
      game: updatedGame,
      lastAnswerCorrect: isCorrect,
      lastAnswerPoints: points,
      lastAnswerExplanation: question.explanation,
    });
  },

  nextQuestion: () => {
    const { game } = get();
    if (!game) return;

    const nextIndex = game.currentIndex + 1;
    if (nextIndex >= game.questions.length) return;

    set({
      game: { ...game, currentIndex: nextIndex },
      lastAnswerCorrect: null,
      lastAnswerPoints: 0,
      lastAnswerExplanation: null,
    });
  },

  finishGame: async () => {
    const { game, profile, userRating } = get();
    if (!game || !profile) return;

    await saveAnswers(game.answers);

    let updatedRating = userRating;
    if (updatedRating) {
      let newGlobal = updatedRating.global;
      let newAnsweredCount = updatedRating.answeredCount;

      for (const ans of game.answers) {
        const q = game.questions.find((qq) => qq.id === ans.questionId);
        if (q) {
          const questionRating = getQuestionRating(q);
          newGlobal = updateRating(
            newGlobal,
            questionRating,
            ans.correct,
            newAnsweredCount,
          );
          newAnsweredCount++;
        }
      }

      updatedRating = {
        ...updatedRating,
        global: newGlobal,
        answeredCount: newAnsweredCount,
        lastUpdatedAt: Date.now(),
      };
      await saveUserRating(updatedRating);
    }

    const finishedGame: GameState = { ...game, finishedAt: Date.now() };
    const summary = summarizeGame(game.answers);
    const withStreak = updateStreak(profile);
    const finalXp = withStreak.xp + summary.xpGained;
    const finalLevel = calculateLevel(finalXp);
    const completedCategories = await getCompletedCategories();

    const fastest = summary.fastestAnswer ?? Infinity;
    const noHintsCorrect = game.answers.some((a) => {
      const q = game.questions.find((qq) => qq.id === a.questionId);
      return a.correct && q?.type === "hint-deduction" && !a.hintsUsed;
    });

    const allBadgeIds = evaluateBadges({
      profile: { ...withStreak, level: finalLevel, xp: finalXp },
      totalAnswered: game.answers.length,
      totalCorrect: summary.correct,
      perfectDaily: game.mode === "daily" && summary.perfect,
      noHintsCorrect,
      fastCorrect: fastest < 5,
      completedCategories,
    });

    const newBadges = getNewBadges(withStreak.badges, allBadgeIds);
    const mergedBadgeIds = Array.from(
      new Set([...withStreak.badges, ...allBadgeIds]),
    );

    const finalProfile: UserProfile = {
      ...withStreak,
      xp: finalXp,
      level: finalLevel,
      badges: mergedBadgeIds,
    };

    await saveProfile(finalProfile);

    if (game.mode === "daily") {
      await markDailyCompleted(
        summary.totalPoints,
        game.questions.map((q) => q.id),
      );
    }

    set({
      game: finishedGame,
      profile: finalProfile,
      userRating: updatedRating,
      newlyUnlockedBadges: newBadges,
    });
  },

  resetGame: () => {
    set({
      game: null,
      lastAnswerCorrect: null,
      lastAnswerPoints: 0,
      lastAnswerExplanation: null,
      newlyUnlockedBadges: [],
    });
  },

  clearFeedback: () => {
    set({
      lastAnswerCorrect: null,
      lastAnswerPoints: 0,
      lastAnswerExplanation: null,
    });
  },

  clearNewBadges: () => {
    set({ newlyUnlockedBadges: [] });
  },

  calibrateWithResults: async (results) => {
    const current = get().userRating;
    if (!current) return;
    const initial = calibrateInitialRating(results);
    const updated: UserRating = {
      ...current,
      global: initial,
      lastUpdatedAt: Date.now(),
    };
    set({ userRating: updated });
    await saveUserRating(updated);
  },

  resetRating: async () => {
    const rating = await resetUserRating();
    set({ userRating: rating });
  },

  completeOnboarding: async (results) => {
    if (results.length !== 3) {
      throw new Error(
        `completeOnboarding: results debe tener exactamente 3 elementos (recibido: ${results.length})`,
      );
    }

    const { profile, userRating } = get();
    if (profile?.onboardingCompleted) return;

    if (isCompletingOnboarding) {
      throw new Error("completeOnboarding: ya hay una llamada en curso");
    }

    if (!userRating)
      throw new Error("userRating no cargado; abortando calibración");
    if (!profile) throw new Error("profile no cargado; abortando calibración");

    isCompletingOnboarding = true;
    try {
      if (userRating.answeredCount > 0) {
        const updated: UserProfile = { ...profile, onboardingCompleted: true };
        await saveProfile(updated);
        set({ profile: updated });
        return;
      }

      await get().calibrateWithResults(results);

      const updated: UserProfile = { ...profile, onboardingCompleted: true };
      await saveProfile(updated);
      set({ profile: updated });
    } finally {
      isCompletingOnboarding = false;
    }
  },
}));

// ============================================================
// HELPERS INTERNOS Y SELECTORES (Sin cambios)
// ============================================================

interface AnswerInput {
  selectedIndex?: number;
  selectedBool?: boolean;
  selectedText?: string;
  selectedOrder?: number[];
}

function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function ordersMatch(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function checkAnswer(question: Question, input: AnswerInput): boolean {
  switch (question.type) {
    case "multiple-choice":
    case "who-said-it":
    case "fill-blank":
      return input.selectedIndex === question.correctIndex;
    case "true-false":
      return input.selectedBool === question.correct;
    case "hint-deduction": {
      if (!input.selectedText) return false;
      const normalized = normalizeAnswer(input.selectedText);
      return question.acceptedAnswers.some(
        (a) => normalizeAnswer(a) === normalized,
      );
    }
    case "verse-scramble":
    case "timeline": {
      if (!input.selectedOrder) return false;
      return ordersMatch(input.selectedOrder, question.correctOrder);
    }
    default:
      return false;
  }
}

export const selectCurrentQuestion = (s: GameStoreState): Question | null =>
  s.game ? (s.game.questions[s.game.currentIndex] ?? null) : null;

export const selectProgress = (
  s: GameStoreState,
): { current: number; total: number } => ({
  current: s.game ? s.game.currentIndex + 1 : 0,
  total: s.game ? s.game.questions.length : 0,
});

export const selectIsLastQuestion = (s: GameStoreState): boolean =>
  s.game ? s.game.currentIndex === s.game.questions.length - 1 : false;
