import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../db/database", () => ({
  getOrCreateProfile: vi.fn(),
  saveProfile: vi.fn(),
  saveAnswer: vi.fn(),
  getCompletedCategories: vi.fn().mockResolvedValue([]),
  markDailyCompleted: vi.fn(),
  getUserRating: vi.fn(),
  saveUserRating: vi.fn(),
  resetUserRating: vi.fn(),
  hasCompletedOnboarding: vi.fn(),
  shouldMigrateOnboarding: vi.fn(),
}));

import * as db from "../db/database";
import { useGameStore } from "./useGameStore";
import type { UserProfile, UserRating } from "../types";
import { RATING_INITIAL } from "../utils/rating";

const baseProfile: UserProfile = {
  id: "local-player",
  nickname: "Peregrino",
  avatar: "🙂",
  createdAt: 0,
  xp: 0,
  level: 1,
  streak: 0,
  lastPlayedAt: null,
  badges: [],
  graceShieldAvailable: false,
};

const baseRating: UserRating = {
  id: "local-player",
  global: RATING_INITIAL,
  answeredCount: 0,
  lastUpdatedAt: 0,
};

function seedStore(
  overrides: Partial<{ profile: UserProfile; userRating: UserRating }> = {},
): { calibrateSpy: ReturnType<typeof vi.fn> } {
  const profile = overrides.profile ?? baseProfile;
  const userRating = overrides.userRating ?? baseRating;
  const calibrateSpy = vi.fn().mockResolvedValue(undefined);
  useGameStore.setState({
    profile,
    userRating,
    calibrateWithResults: calibrateSpy as unknown as (
      results: boolean[],
    ) => Promise<void>,
    isLoading: false,
    error: null,
    game: null,
    lastAnswerCorrect: null,
    lastAnswerPoints: 0,
    lastAnswerExplanation: null,
    newlyUnlockedBadges: [],
  });
  return { calibrateSpy };
}

describe("completeOnboarding (H-04)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.setState({ profile: null, userRating: null });
  });

  it("(f) lanza si results no tiene exactamente 3 elementos", async () => {
    seedStore();
    await expect(
      useGameStore.getState().completeOnboarding([true, false]),
    ).rejects.toThrow(/exactamente 3/);
    await expect(
      useGameStore.getState().completeOnboarding([true, true, true, false]),
    ).rejects.toThrow(/exactamente 3/);
    await expect(
      useGameStore.getState().completeOnboarding([]),
    ).rejects.toThrow(/exactamente 3/);
  });

  it("(a) llama calibrateWithResults exactamente 1 vez con los mismos results", async () => {
    const { calibrateSpy } = seedStore();
    await useGameStore.getState().completeOnboarding([true, false, true]);
    expect(calibrateSpy).toHaveBeenCalledTimes(1);
    expect(calibrateSpy).toHaveBeenCalledWith([true, false, true]);
  });

  it("(b) persiste onboardingCompleted=true en el profile", async () => {
    seedStore();
    await useGameStore.getState().completeOnboarding([true, true, true]);
    expect(db.saveProfile).toHaveBeenCalledTimes(1);
    const saved = (
      db.saveProfile as unknown as { mock: { calls: [UserProfile][] } }
    ).mock.calls[0][0];
    expect(saved.onboardingCompleted).toBe(true);
    expect(useGameStore.getState().profile?.onboardingCompleted).toBe(true);
  });

  it("(d) idempotente: segunda llamada no recalibra ni re-marca", async () => {
    const { calibrateSpy } = seedStore();
    await useGameStore.getState().completeOnboarding([true, false, true]);
    const callsAfterFirst = (
      db.saveProfile as unknown as { mock: { calls: unknown[] } }
    ).mock.calls.length;

    await useGameStore.getState().completeOnboarding([false, false, false]);

    expect(calibrateSpy).toHaveBeenCalledTimes(1);
    expect(
      (db.saveProfile as unknown as { mock: { calls: unknown[] } }).mock.calls
        .length,
    ).toBe(callsAfterFirst);
  });

  it("(c) si calibrateWithResults lanza, onboardingCompleted NO se marca", async () => {
    const { calibrateSpy } = seedStore();
    calibrateSpy.mockImplementationOnce(async () => {
      throw new Error("calibración falló");
    });
    await expect(
      useGameStore.getState().completeOnboarding([true, true, true]),
    ).rejects.toThrow(/calibración falló/);
    expect(db.saveProfile).not.toHaveBeenCalled();
    expect(useGameStore.getState().profile?.onboardingCompleted).toBeFalsy();
  });

  it("W1: si userRating es null, lanza y NO marca flag", async () => {
    seedStore();
    useGameStore.setState({ userRating: null });
    await expect(
      useGameStore.getState().completeOnboarding([true, true, true]),
    ).rejects.toThrow(/userRating no cargado/);
    expect(db.saveProfile).not.toHaveBeenCalled();
    expect(useGameStore.getState().profile?.onboardingCompleted).toBeFalsy();
  });

  it("(e) no otorga XP, puntos ni insignias", async () => {
    seedStore();
    const before = useGameStore.getState().profile!;
    await useGameStore.getState().completeOnboarding([true, true, true]);
    const after = useGameStore.getState().profile!;
    expect(after.xp).toBe(before.xp);
    expect(after.level).toBe(before.level);
    expect(after.badges).toEqual(before.badges);
    expect(useGameStore.getState().game).toBeNull();
  });

  it("DF-1: in-flight guard bloquea segunda llamada concurrente", async () => {
    const { calibrateSpy } = seedStore();
    let resolveCalibrate: () => void = () => {};
    const pending = new Promise<void>((r) => {
      resolveCalibrate = r;
    });
    calibrateSpy.mockImplementationOnce(() => pending);

    const first = useGameStore
      .getState()
      .completeOnboarding([true, true, true]);
    await expect(
      useGameStore.getState().completeOnboarding([false, false, false]),
    ).rejects.toThrow(/ya hay una llamada en curso/);

    resolveCalibrate();
    await first;
    expect(useGameStore.getState().profile?.onboardingCompleted).toBe(true);
  });

  // ── B1 (2026-11-04) ─────────────────────────────────────
  it("B1: usuario existente con answeredCount > 0 → NO calibra, SÍ marca flag", async () => {
    const existingRating: UserRating = {
      ...baseRating,
      answeredCount: 5,
      global: 1400,
    };
    const { calibrateSpy } = seedStore({ userRating: existingRating });

    await useGameStore.getState().completeOnboarding([true, true, true]);

    expect(calibrateSpy).not.toHaveBeenCalled();
    expect(db.saveProfile).toHaveBeenCalledTimes(1);
    const saved = (
      db.saveProfile as unknown as { mock: { calls: [UserProfile][] } }
    ).mock.calls[0][0];
    expect(saved.onboardingCompleted).toBe(true);
    expect(useGameStore.getState().profile?.onboardingCompleted).toBe(true);
  });

  it("B1: usuario existente con answeredCount > 0 y flag true → no-op total", async () => {
    const existingProfile: UserProfile = {
      ...baseProfile,
      onboardingCompleted: true,
    };
    const existingRating: UserRating = {
      ...baseRating,
      answeredCount: 5,
      global: 1400,
    };
    const { calibrateSpy } = seedStore({
      profile: existingProfile,
      userRating: existingRating,
    });

    await useGameStore.getState().completeOnboarding([true, true, true]);

    expect(calibrateSpy).not.toHaveBeenCalled();
    expect(db.saveProfile).not.toHaveBeenCalled();
  });

  it.each([
    [[true, true, true]],
    [[false, false, false]],
    [[true, false, true]],
    [[false, true, false]],
  ])(
    "caso extremo %j: usuario nuevo → calibra y marca flag",
    async (results) => {
      const { calibrateSpy } = seedStore();
      await useGameStore.getState().completeOnboarding(results as boolean[]);
      expect(calibrateSpy).toHaveBeenCalledWith(results);
      expect(useGameStore.getState().profile?.onboardingCompleted).toBe(true);
    },
  );
});
