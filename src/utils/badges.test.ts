import { describe, it, expect } from "vitest";
import { evaluateBadges, getNewBadges, type BadgeContext } from "./scoring";
import { BADGES } from "../data/badges";
import type { UserProfile } from "../types";

const baseProfile: UserProfile = {
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

function makeCtx(overrides: Partial<BadgeContext> = {}): BadgeContext {
    return {
        profile: baseProfile,
        totalAnswered: 0,
        totalCorrect: 0,
        perfectDaily: false,
        noHintsCorrect: false,
        fastCorrect: false,
        completedCategories: [],
        ...overrides,
    };
}

// ============================================================
// evaluateBadges — devuelve IDs (string[])
// ============================================================

describe("evaluateBadges", () => {
    it("sin contexto → sin insignias", () => {
        expect(evaluateBadges(makeCtx())).toEqual([]);
    });

    it("primer-paso al responder 1 pregunta", () => {
        expect(evaluateBadges(makeCtx({ totalAnswered: 1 }))).toContain("primer-paso");
    });

    it("primera-victoria al acertar 1", () => {
        expect(evaluateBadges(makeCtx({ totalCorrect: 1 }))).toContain(
            "primera-victoria",
        );
    });

    it("racha-3 con streak >= 3", () => {
        const ids = evaluateBadges(
            makeCtx({ profile: { ...baseProfile, streak: 3 } }),
        );
        expect(ids).toContain("racha-3");
        expect(ids).not.toContain("racha-7");
    });

    it("racha-7 acumula racha-3 + racha-7", () => {
        const ids = evaluateBadges(
            makeCtx({ profile: { ...baseProfile, streak: 7 } }),
        );
        expect(ids).toContain("racha-3");
        expect(ids).toContain("racha-7");
    });

    it("racha-30 acumula las tres insignias de racha", () => {
        const ids = evaluateBadges(
            makeCtx({ profile: { ...baseProfile, streak: 30 } }),
        );
        expect(ids).toContain("racha-3");
        expect(ids).toContain("racha-7");
        expect(ids).toContain("racha-30");
    });

    it("perfecto-10 con perfectDaily true", () => {
        expect(evaluateBadges(makeCtx({ perfectDaily: true }))).toContain(
            "perfecto-10",
        );
    });

    it("sin-pistas con noHintsCorrect true", () => {
        expect(evaluateBadges(makeCtx({ noHintsCorrect: true }))).toContain(
            "sin-pistas",
        );
    });

    it("velocista con fastCorrect true", () => {
        expect(evaluateBadges(makeCtx({ fastCorrect: true }))).toContain("velocista");
    });

    it("nivel-5, nivel-10, nivel-20 acumulativas", () => {
        const ids10 = evaluateBadges(
            makeCtx({ profile: { ...baseProfile, level: 10 } }),
        );
        expect(ids10).toContain("nivel-5");
        expect(ids10).toContain("nivel-10");
        expect(ids10).not.toContain("nivel-20");

        const ids20 = evaluateBadges(
            makeCtx({ profile: { ...baseProfile, level: 20 } }),
        );
        expect(ids20).toContain("nivel-5");
        expect(ids20).toContain("nivel-10");
        expect(ids20).toContain("nivel-20");
    });

    it("insignias de categoría por categoría completada", () => {
        const ids = evaluateBadges(
            makeCtx({
                completedCategories: ["evangelios", "personajes", "versiculos"],
            }),
        );
        expect(ids).toContain("evangelista");
        expect(ids).toContain("conoce-personajes");
        expect(ids).toContain("memoriza-versiculos");
        expect(ids).not.toContain("cuentacuentos");
        expect(ids).not.toContain("vida-en-valores");
    });

    it("no duplica IDs si varias condiciones se cumplen", () => {
        const ids = evaluateBadges(
            makeCtx({
                totalAnswered: 10,
                totalCorrect: 10,
                perfectDaily: true,
                noHintsCorrect: true,
                fastCorrect: true,
                profile: { ...baseProfile, streak: 7, level: 10 },
                completedCategories: ["evangelios"],
            }),
        );
        const unique = new Set(ids);
        expect(unique.size).toBe(ids.length);
    });

    it("todos los IDs devueltos existen en BADGES", () => {
        const ids = evaluateBadges(
            makeCtx({
                totalAnswered: 100,
                totalCorrect: 100,
                perfectDaily: true,
                noHintsCorrect: true,
                fastCorrect: true,
                profile: { ...baseProfile, streak: 30, level: 20 },
                completedCategories: [
                    "evangelios",
                    "personajes",
                    "versiculos",
                    "parabolas",
                    "valores",
                ],
            }),
        );
        const validIds = new Set(BADGES.map((b) => b.id));
        ids.forEach((id) => expect(validIds.has(id)).toBe(true));
    });

    it("hostedRoom y wonMultiplayerRoom desbloquean sus insignias", () => {
        expect(evaluateBadges(makeCtx({ hostedRoom: true }))).toContain("anfitrion");
        expect(evaluateBadges(makeCtx({ wonMultiplayerRoom: true }))).toContain(
            "campeon-sala",
        );
    });
});

// ============================================================
// getNewBadges — devuelve Badge[] (objetos)
// ============================================================

describe("getNewBadges", () => {
    it("devuelve los objetos Badge de las nuevas", () => {
        const result = getNewBadges(["primer-paso"], [
            "primer-paso",
            "primera-victoria",
            "racha-3",
        ]);
        expect(result).toHaveLength(2);
        const ids = result.map((b) => b.id);
        expect(ids).toContain("primera-victoria");
        expect(ids).toContain("racha-3");
        expect(ids).not.toContain("primer-paso");
    });

    it("devuelve array vacío si no hay nuevas", () => {
        expect(getNewBadges(["a", "b"], ["a", "b"])).toEqual([]);
    });

    it("ignora IDs que no existen en BADGES", () => {
        const result = getNewBadges([], ["primer-paso", "fake-id-xyz"]);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("primer-paso");
    });

    it("no duplica si 'after' tenía duplicados", () => {
        const result = getNewBadges([], ["primer-paso", "primer-paso"]);
        expect(result.filter((b) => b.id === "primer-paso")).toHaveLength(1);
    });
});