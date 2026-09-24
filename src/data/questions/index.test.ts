import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    pickAdaptiveQuestions,
    auditQuestionData,
    auditAcceptedAnswers,
    ALL_QUESTIONS,
    countQuestionsByCategory,
    getQuestionsByCategory,
    getQuestionById,
} from "./index";

// ============================================================
// MOCK del módulo de DB
// ============================================================

vi.mock("../../db/database", () => ({
    getRecentAccuracy: vi.fn(),
    getOrCreateProfile: vi.fn(),
}));

import { getRecentAccuracy, getOrCreateProfile } from "../../db/database";

const mockGetRecentAccuracy = vi.mocked(getRecentAccuracy);
const mockGetOrCreateProfile = vi.mocked(getOrCreateProfile);

const baseProfile = {
    id: "local-player",
    nickname: "Tester",
    createdAt: Date.now(),
    xp: 0,
    level: 1,
    streak: 0,
    lastPlayedAt: null,
    badges: [],
    graceShieldAvailable: false,
};

// ============================================================
// Auditorías
// ============================================================

describe("auditQuestionData", () => {
    it("reporta 100% en los 4 campos educativos", () => {
        const r = auditQuestionData();
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
    it("todas las hint-deduction cumplen las reglas", () => {
        const r = auditAcceptedAnswers();
        expect(r.malformed).toEqual([]);
        expect(r.total).toBeGreaterThan(0);
    });
});

// ============================================================
// Helpers básicos
// ============================================================

describe("getQuestionsByCategory", () => {
    it("devuelve preguntas en categorías activas", () => {
        expect(getQuestionsByCategory("evangelios").length).toBeGreaterThan(0);
        expect(getQuestionsByCategory("versiculos").length).toBeGreaterThan(0);
        expect(getQuestionsByCategory("personajes").length).toBeGreaterThan(0);
        expect(getQuestionsByCategory("parabolas").length).toBeGreaterThan(0);
        expect(getQuestionsByCategory("valores").length).toBeGreaterThan(0);
    });

    it("devuelve vacío en categorías sin contenido", () => {
        expect(getQuestionsByCategory("genesis")).toEqual([]);
        expect(getQuestionsByCategory("exodo")).toEqual([]);
        expect(getQuestionsByCategory("apologetica")).toEqual([]);
        expect(getQuestionsByCategory("historia-iglesia")).toEqual([]);
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
    it("incluye categorías vacías con 0", () => {
        const counts = countQuestionsByCategory();
        expect(counts.evangelios).toBeGreaterThan(0);
        expect(counts.genesis).toBe(0);
    });

    it("la suma de conteos equivale a ALL_QUESTIONS.length", () => {
        const counts = countQuestionsByCategory();
        const sum = Object.values(counts).reduce((a, b) => a + b, 0);
        expect(sum).toBe(ALL_QUESTIONS.length);
    });
});

// ============================================================
// pickAdaptiveQuestions
// ============================================================

describe("pickAdaptiveQuestions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("usuario nuevo (accuracy 0.5, nivel 1) no recibe trampas", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.5);
        mockGetOrCreateProfile.mockResolvedValue({ ...baseProfile, level: 1 });

        const questions = await pickAdaptiveQuestions(10);

        const traps = questions.filter(
            (q) => q.type === "hint-deduction" && q.difficulty === "dificil",
        );
        expect(traps).toHaveLength(0);
    });

    it("nivel 1 con accuracy alta → sin trampas (falla el AND de nivel)", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.9);
        mockGetOrCreateProfile.mockResolvedValue({ ...baseProfile, level: 1 });

        const questions = await pickAdaptiveQuestions(10);
        const traps = questions.filter(
            (q) => q.type === "hint-deduction" && q.difficulty === "dificil",
        );
        expect(traps).toHaveLength(0);
    });

    it("nivel 3 con accuracy baja → sin trampas (falla el AND de accuracy)", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.3);
        mockGetOrCreateProfile.mockResolvedValue({ ...baseProfile, level: 5 });

        const questions = await pickAdaptiveQuestions(10);
        const traps = questions.filter(
            (q) => q.type === "hint-deduction" && q.difficulty === "dificil",
        );
        expect(traps).toHaveLength(0);
    });

    it("nivel >= 3 + accuracy > 0.65 → pueden aparecer trampas", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.9);
        mockGetOrCreateProfile.mockResolvedValue({ ...baseProfile, level: 5 });

        // Múltiples corridas: la selección es aleatoria ponderada.
        // Con pool que SÍ incluye trampas, en N corridas deberían aparecer.
        let totalTraps = 0;
        for (let i = 0; i < 15; i++) {
            const questions = await pickAdaptiveQuestions(10);
            totalTraps += questions.filter(
                (q) => q.type === "hint-deduction" && q.difficulty === "dificil",
            ).length;
        }
        expect(totalTraps).toBeGreaterThan(0);
    });

    it("respeta categoryId si se pasa", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.5);
        mockGetOrCreateProfile.mockResolvedValue(baseProfile);

        const questions = await pickAdaptiveQuestions(5, "evangelios");
        expect(questions.every((q) => q.category === "evangelios")).toBe(true);
    });

    it("no devuelve más preguntas que las pedidas", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.5);
        mockGetOrCreateProfile.mockResolvedValue(baseProfile);

        const questions = await pickAdaptiveQuestions(3);
        expect(questions.length).toBeLessThanOrEqual(3);
    });

    it("no repite preguntas dentro de la misma selección", async () => {
        mockGetRecentAccuracy.mockResolvedValue(0.5);
        mockGetOrCreateProfile.mockResolvedValue(baseProfile);

        const questions = await pickAdaptiveQuestions(8);
        const ids = questions.map((q) => q.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});