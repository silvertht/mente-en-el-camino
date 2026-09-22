import { create } from "zustand";
import type {
  AnsweredQuestion,
  Badge,
  GameMode,
  GameState,
  Question,
  UserProfile,
} from "../types";
import {
  getOrCreateProfile,
  saveProfile,
  saveAnswer,
  getCompletedCategories,
  markDailyCompleted,
} from "../db/database";
import {
  calculateQuestionScore,
  calculateLevel,
  evaluateBadges,
  getNewBadges,
  summarizeGame,
  updateStreak,
  xpForAnswer,
} from "../utils/scoring";

// ============================================================
// ESTADO DE LA TIENDA
// ============================================================

interface GameStoreState {
  profile: UserProfile | null;
  game: GameState | null;
  isLoading: boolean;
  error: string | null;

  lastAnswerCorrect: boolean | null;
  lastAnswerPoints: number;
  lastAnswerExplanation: string | null;

  newlyUnlockedBadges: Badge[];

  init: () => Promise<void>;
  setNickname: (nickname: string) => Promise<void>;
  startGame: (mode: GameMode, questions: Question[]) => void;
  answerQuestion: (params: {
    selectedIndex?: number;
    selectedBool?: boolean;
    selectedText?: string;
    timeSpent: number;
    hintsUsed?: number;
  }) => Promise<void>;
  nextQuestion: () => void;
  finishGame: () => Promise<void>;
  resetGame: () => void;
  clearFeedback: () => void;
  clearNewBadges: () => void;
}

// ============================================================
// TIENDA
// ============================================================

export const useGameStore = create<GameStoreState>((set, get) => ({
  profile: null,
  game: null,
  isLoading: false,
  error: null,
  lastAnswerCorrect: null,
  lastAnswerPoints: 0,
  lastAnswerExplanation: null,
  newlyUnlockedBadges: [],

  // ----------------------------------------------------------
  init: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await getOrCreateProfile();
      const level = calculateLevel(profile.xp);
      const synced = { ...profile, level };
      if (level !== profile.level) await saveProfile(synced);
      set({ profile: synced, isLoading: false });
    } catch (e) {
      set({ error: (e as Error).message, isLoading: false });
    }
  },

  // ----------------------------------------------------------
  setNickname: async (nickname) => {
    const { profile } = get();
    if (!profile) return;
    const updated = { ...profile, nickname: nickname.trim() || "Peregrino" };
    await saveProfile(updated);
    set({ profile: updated });
  },

  // ----------------------------------------------------------
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

  // ----------------------------------------------------------
  answerQuestion: async ({
    selectedIndex,
    selectedBool,
    selectedText,
    timeSpent,
    hintsUsed = 0,
  }) => {
    const { game, profile } = get();
    if (!game || !profile) return;

    const question = game.questions[game.currentIndex];
    const isCorrect = checkAnswer(question, {
      selectedIndex,
      selectedBool,
      selectedText,
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
    const xpGained = xpForAnswer(isCorrect);
    const newXp = profile.xp + xpGained;
    const newLevel = calculateLevel(newXp);

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

    const updatedProfile: UserProfile = {
      ...profile,
      xp: newXp,
      level: newLevel,
    };

    set({
      game: updatedGame,
      profile: updatedProfile,
      lastAnswerCorrect: isCorrect,
      lastAnswerPoints: points,
      lastAnswerExplanation: question.explanation,
    });

    await saveAnswer(answer);
    await saveProfile(updatedProfile);
  },

  // ----------------------------------------------------------
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

  // ----------------------------------------------------------
  finishGame: async () => {
    const { game, profile } = get();
    if (!game || !profile) return;

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

    // IDs de TODAS las insignias que debería tener el jugador ahora
    const allBadgeIds = evaluateBadges({
      profile: { ...withStreak, level: finalLevel, xp: finalXp },
      totalAnswered: game.answers.length,
      totalCorrect: summary.correct,
      perfectDaily: game.mode === "daily" && summary.perfect,
      noHintsCorrect,
      fastCorrect: fastest < 5,
      completedCategories,
    });

    // Solo las NUEVAS (las que aún no tenía)
    const newBadges = getNewBadges(withStreak.badges, allBadgeIds);

    // Unir las que ya tenía + las nuevas (sin duplicados)
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
      newlyUnlockedBadges: newBadges,
    });
  },

  // ----------------------------------------------------------
  resetGame: () => {
    set({
      game: null,
      lastAnswerCorrect: null,
      lastAnswerPoints: 0,
      lastAnswerExplanation: null,
      newlyUnlockedBadges: [],
    });
  },

  // ----------------------------------------------------------
  clearFeedback: () => {
    set({
      lastAnswerCorrect: null,
      lastAnswerPoints: 0,
      lastAnswerExplanation: null,
    });
  },

  // ----------------------------------------------------------
  clearNewBadges: () => {
    set({ newlyUnlockedBadges: [] });
  },
}));

// ============================================================
// HELPERS INTERNOS
// ============================================================

interface AnswerInput {
  selectedIndex?: number;
  selectedBool?: boolean;
  selectedText?: string;
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
      const normalized = input.selectedText.trim().toLowerCase();
      return question.acceptedAnswers.some(
        (a) => a.trim().toLowerCase() === normalized,
      );
    }

    case "verse-scramble":
    case "timeline":
      return input.selectedBool === true;

    default:
      return false;
  }
}

// ============================================================
// SELECTORES ÚTILES
// ============================================================

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
