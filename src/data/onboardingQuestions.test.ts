import { describe, it, expect } from "vitest";
import { onboardingQuestions } from "./onboardingQuestions";
import { ALL_QUESTIONS, QUESTIONS_BY_CATEGORY } from "./questions";
import type { MultipleChoiceQuestion } from "../types";

describe("onboardingQuestions (H-05)", () => {
  it("tiene exactamente 3 items", () => {
    expect(onboardingQuestions).toHaveLength(3);
  });

  it("todos son multiple-choice con shape válido", () => {
    for (const q of onboardingQuestions) {
      expect(q.type).toBe("multiple-choice");
      const mc = q as MultipleChoiceQuestion;
      expect(typeof mc.question).toBe("string");
      expect(Array.isArray(mc.options)).toBe(true);
      expect(mc.options).toHaveLength(4);
      expect(typeof mc.correctIndex).toBe("number");
      expect(mc.correctIndex).toBeGreaterThanOrEqual(0);
      expect(mc.correctIndex).toBeLessThan(4);
      expect(typeof q.explanation).toBe("string");
      expect(q.explanation.length).toBeGreaterThan(0);
      expect(typeof q.verse).toBe("string");
      expect(typeof q.verseText).toBe("string");
      expect((q.verseText ?? "").length).toBeGreaterThan(0);
      expect(q.points).toBeGreaterThan(0);
    }
  });

  it("dificultades en orden fácil → media → difícil", () => {
    expect(onboardingQuestions.map((q) => q.difficulty)).toEqual([
      "facil",
      "medio",
      "dificil",
    ]);
  });

  it("Q1: pregunta, opciones, correcta y versículo coinciden con el contrato", () => {
    const q = onboardingQuestions[0] as MultipleChoiceQuestion;
    expect(q.question).toBe("¿Quién construyó el arca?");
    expect(q.options).toEqual(["Moisés", "Noé", "Abraham", "David"]);
    expect(q.options[q.correctIndex]).toBe("Noé");
    expect(q.verse).toBe("Génesis 6:14");
    expect(q.explanation).toBe("El arca fue refugio del primer pacto.");
  });

  it("Q2: pregunta, opciones, correcta y versículo coinciden con el contrato", () => {
    const q = onboardingQuestions[1] as MultipleChoiceQuestion;
    expect(q.question).toBe("¿Cuántos días ayunó Jesús en el desierto?");
    expect(q.options).toEqual(["7", "21", "40", "50"]);
    expect(q.options[q.correctIndex]).toBe("40");
    expect(q.verse).toBe("Mateo 4:2");
    expect(q.explanation).toBe("Jesús venció la tentación con la Palabra.");
  });

  it("Q3: opciones, correcta (Belsasar) y versículo coinciden con Alt 1 (B1)", () => {
    const q = onboardingQuestions[2] as MultipleChoiceQuestion;
    expect(q.question).toBe("¿Qué rey vio la escritura en la pared?");
    expect(q.options).toEqual(["Nabucodonosor", "Belsasar", "Darío", "Ciro"]);
    expect(q.options[q.correctIndex]).toBe("Belsasar");
    expect(q.verse).toBe("Daniel 5:25");
    expect(q.explanation).toBe("La escritura anunció la caída de Babilonia.");
  });

  it("IDs no colisionan con el banco principal", () => {
    const bankIds = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const q of onboardingQuestions) {
      expect(bankIds.has(q.id)).toBe(false);
    }
  });

  it("no están inyectadas en QUESTIONS_BY_CATEGORY (fuera del pool adaptativo)", () => {
    const onboardingIds = new Set(onboardingQuestions.map((q) => q.id));
    for (const list of Object.values(QUESTIONS_BY_CATEGORY)) {
      for (const q of list) {
        expect(onboardingIds.has(q.id)).toBe(false);
      }
    }
  });
});
