import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import {
  pickAdaptiveQuestions,
  auditQuestionData,
  auditAcceptedAnswers,
  ALL_QUESTIONS,
  countQuestionsByCategory,
  getQuestionsByCategory,
  getQuestionById,
  loadQuestionBank,
} from "./index";

vi.mock("../../db/database", () => ({
  getUserRating: vi.fn(),
}));

import { getUserRating } from "../../db/database";

const mockGetUserRating = vi.mocked(getUserRating);

const baseRating = {
  id: "local-player",
  global: 1200,
  answeredCount: 0,
  lastUpdatedAt: Date.now(),
};

describe("Questions Index (Lazy Load)", () => {
  beforeAll(async () => {
    await loadQuestionBank();
  });

  describe("auditQuestionData", () => {
    it("reporta 100% en los 4 campos educativos", async () => {
      const r = await auditQuestionData();
      expect(r.total).toBe(ALL_QUESTIONS.length);
      expect(r.withVerse).toBe(r.total);
      expect(r.withVerseText).toBe(r.total);
      expect(r.withApplication).toBe(r.total);
      expect(r.withReflection).toBe(r.total);
      expect(r.missing.verse).toEqual([]);
      expect(r.missing.verseText).toEqual([]);
      expect(r.missing.application).toEqual([]);
      expect(r.missing.reflection).toEqual([]);
    });
  });

  describe("auditAcceptedAnswers", () => {
    it("todas las hint-deduction cumplen las reglas", async () => {
      const r = await auditAcceptedAnswers();
      expect(r.malformed).toEqual([]);
      expect(r.total).toBeGreaterThan(0);
    });
  });

  describe("getQuestionsByCategory", () => {
    it("devuelve preguntas en categorías activas", () => {
      expect(getQuestionsByCategory("evangelios").length).toBeGreaterThan(0);
      expect(getQuestionsByCategory("versiculos").length).toBeGreaterThan(0);
      expect(getQuestionsByCategory("personajes").length).toBeGreaterThan(0);
      expect(getQuestionsByCategory("parabolas").length).toBeGreaterThan(0);
      expect(getQuestionsByCategory("valores").length).toBeGreaterThan(0);
    });

    it("devuelve los nuevos conteos en las categorías de la Sesión 2", () => {
      expect(getQuestionsByCategory("genesis").length).toBe(6);
      expect(getQuestionsByCategory("exodo").length).toBe(6);
      expect(getQuestionsByCategory("apologetica").length).toBe(4);
      expect(getQuestionsByCategory("historia-iglesia").length).toBe(4);
    });
  });

  describe("getQuestionById", () => {
    it("devuelve la pregunta si existe", () => {
      const q = getQuestionById("ev-001");
      expect(q).toBeDefined();
      expect(q?.id).toBe("ev-001");
    });

    it("devuelve undefined si no existe", () => {
      expect(getQuestionById("fake-id-xyz-000")).toBeUndefined();
    });
  });

  describe("countQuestionsByCategory", () => {
    it("incluye los conteos actualizados del banco (90 preguntas)", () => {
      const counts = countQuestionsByCategory();
      expect(counts.evangelios).toBe(20);
      expect(counts.genesis).toBe(6);
      expect(counts.exodo).toBe(6);
      expect(counts.apologetica).toBe(4);
      expect(counts["historia-iglesia"]).toBe(4);
    });

    it("la suma de conteos equivale a ALL_QUESTIONS.length (90)", () => {
      const counts = countQuestionsByCategory();
      const sum = Object.values(counts).reduce((a, b) => a + b, 0);
      expect(sum).toBe(90);
      expect(ALL_QUESTIONS.length).toBe(90);
    });
  });

  describe("pickAdaptiveQuestions", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("usuario nuevo (rating 1200) nunca recibe hint-deduction dificil", async () => {
      mockGetUserRating.mockResolvedValue({ ...baseRating, global: 1200 });

      for (let i = 0; i < 10; i++) {
        const questions = await pickAdaptiveQuestions(10);
        const traps = questions.filter(
          (q) => q.type === "hint-deduction" && q.difficulty === "dificil",
        );
        expect(traps).toHaveLength(0);
      }
    });

    it("usuario experto (rating 1800) sí puede recibir hint-deduction dificil", async () => {
      mockGetUserRating.mockResolvedValue({ ...baseRating, global: 1800 });

      let found = 0;
      for (let i = 0; i < 30; i++) {
        const questions = await pickAdaptiveQuestions(10);
        found += questions.filter(
          (q) => q.type === "hint-deduction" && q.difficulty === "dificil",
        ).length;
      }
      expect(found).toBeGreaterThan(0);
    });

    it("usuario experto recibe más difíciles que un novato", async () => {
      mockGetUserRating.mockResolvedValue({ ...baseRating, global: 1800 });
      const expertPicks: string[] = [];
      for (let i = 0; i < 5; i++) {
        const qs = await pickAdaptiveQuestions(10);
        expertPicks.push(
          ...qs.filter((q) => q.difficulty === "dificil").map((q) => q.id),
        );
      }

      mockGetUserRating.mockResolvedValue({ ...baseRating, global: 1000 });
      const novicePicks: string[] = [];
      for (let i = 0; i < 5; i++) {
        const qs = await pickAdaptiveQuestions(10);
        novicePicks.push(
          ...qs.filter((q) => q.difficulty === "dificil").map((q) => q.id),
        );
      }

      expect(expertPicks.length).toBeGreaterThan(novicePicks.length);
    });

    it("respeta categoryId si se pasa", async () => {
      mockGetUserRating.mockResolvedValue(baseRating);
      const questions = await pickAdaptiveQuestions(3, "genesis");
      expect(questions.every((q) => q.category === "genesis")).toBe(true);
    });

    it("no devuelve más preguntas que las pedidas", async () => {
      mockGetUserRating.mockResolvedValue(baseRating);
      const questions = await pickAdaptiveQuestions(3);
      expect(questions.length).toBeLessThanOrEqual(3);
    });

    it("no repite preguntas dentro de la misma selección", async () => {
      mockGetUserRating.mockResolvedValue(baseRating);
      const questions = await pickAdaptiveQuestions(8);
      const ids = questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("categoría con pocas preguntas (apologetica) → devuelve lo disponible (respetando cap)", async () => {
      mockGetUserRating.mockResolvedValue(baseRating); // Rating 1200
      const questions = await pickAdaptiveQuestions(5, "apologetica");

      // apo-001 (medio), apo-003 (facil), apo-004 (facil) pasan el filtro.
      // apo-002 (dificil) es filtrada por el MAX_STRETCH.
      expect(questions.length).toBe(3);
      expect(questions.every((q) => q.category === "apologetica")).toBe(true);
    });
  });
});
