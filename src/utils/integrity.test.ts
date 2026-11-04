import { describe, it, expect } from "vitest";
import { MenteEnElCaminoDB, hasCompletedOnboarding } from "../db/database";
import { MAX_STRETCH } from "../utils/rating";
import { onboardingQuestions } from "../data/onboardingQuestions";
import { ALL_QUESTIONS } from "../data/questions";

describe("Integridad Fase 4 (H-04/H-05)", () => {
  it("MenteEnElCaminoDB nombre intacto (Regla de Oro 4)", () => {
    // Instanciar NO abre conexión (Dexie conecta lazy al primer query).
    // En jsdom sin IndexedDB, `db.name` sigue siendo válido.
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
});
