import { describe, it, expect, beforeAll } from "vitest";
import {
  MenteEnElCaminoDB,
  hasCompletedOnboarding,
  shouldMigrateOnboarding,
} from "../db/database";
import { MAX_STRETCH } from "../utils/rating";
import { onboardingQuestions } from "../data/onboardingQuestions";
import { ALL_QUESTIONS, loadQuestionBank } from "../data/questions"; // <- IMPORT NUEVO
import type { UserProfile, UserRating } from "../types";

describe("Integridad Fase 4 (H-04/H-05)", () => {
  // H-FUN-03: Necesitamos cargar el banco para validar que onboardingQuestions NO está dentro
  beforeAll(async () => {
    await loadQuestionBank();
  });

  it("MenteEnElCaminoDB nombre intacto (Regla de Oro 4)", () => {
    const instance = new MenteEnElCaminoDB();
    expect(instance.name).toBe("MenteEnElCaminoDB");
  });

  it("MAX_STRETCH sigue siendo 400 (rating.ts intacto)", () => {
    expect(MAX_STRETCH).toBe(400);
  });

  it("onboardingQuestions fuera de ALL_QUESTIONS (no entra al pool adaptativo)", () => {
    const bankIds = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const q of onboardingQuestions) {
      expect(bankIds.has(q.id)).toBe(false);
    }
  });

  it("hasCompletedOnboarding es una función exportada (H-04)", () => {
    expect(typeof hasCompletedOnboarding).toBe("function");
  });

  it("shouldMigrateOnboarding es una función exportada (B1)", () => {
    expect(typeof shouldMigrateOnboarding).toBe("function");
  });
});

describe("shouldMigrateOnboarding (B1 · 2026-11-04)", () => {
  const baseProfile: UserProfile = {
    id: "local-player",
    nickname: "Peregrino",
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
    global: 1200,
    answeredCount: 0,
    lastUpdatedAt: 0,
  };

  it("perfil undefined → false (usuario nuevo sin persistencia)", () => {
    expect(shouldMigrateOnboarding(undefined, baseRating)).toBe(false);
  });

  it("perfil sin flag + answeredCount > 0 → true (usuario pre-Fase 4 con progreso)", () => {
    expect(
      shouldMigrateOnboarding(baseProfile, { ...baseRating, answeredCount: 5 }),
    ).toBe(true);
  });

  it("perfil sin flag + answeredCount === 0 → false (usuario nuevo con rating default)", () => {
    expect(shouldMigrateOnboarding(baseProfile, baseRating)).toBe(false);
  });

  it("perfil sin flag + rating undefined → false", () => {
    expect(shouldMigrateOnboarding(baseProfile, undefined)).toBe(false);
  });

  it("perfil con onboardingCompleted === true → false (ya decidido)", () => {
    expect(
      shouldMigrateOnboarding(
        { ...baseProfile, onboardingCompleted: true },
        { ...baseRating, answeredCount: 5 },
      ),
    ).toBe(false);
  });

  it("perfil con onboardingCompleted === false → false (ya decidido)", () => {
    expect(
      shouldMigrateOnboarding(
        { ...baseProfile, onboardingCompleted: false },
        { ...baseRating, answeredCount: 5 },
      ),
    ).toBe(false);
  });
});
