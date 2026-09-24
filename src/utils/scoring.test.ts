import { describe, it, expect } from "vitest";
import {
    calculateQuestionScore,
    xpForAnswer,
    calculateLevel,
    xpProgressInLevel,
    updateStreak,
    summarizeGame,
    formatScore,
    formatTime,
    BASE_POINTS,
    STREAK_BONUS,
    HINT_PENALTY,
    SPEED_BONUS_MAX,
} from "./scoring";
import type { AnsweredQuestion, UserProfile } from "../types";

// ============================================================
// Fixtures
// ============================================================

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date(2026, 8, 23, 12, 0, 0).getTime(); // 23 sept 2026, mediodía local

function makeProfile(overrides: Partial<UserProfile> = {}): UserProfile {
    return {
        id: "local-player",
        nickname: "Tester",
        createdAt: NOW,
        xp: 0,
        level: 1,
        streak: 0,
        lastPlayedAt: null,
        badges: [],
        graceShieldAvailable: false,
        ...overrides,
    };
}

// ============================================================
// calculateQuestionScore
// ============================================================

describe("calculateQuestionScore", () => {
    // Caso base sin bonus: timeSpent = timeLimit → speedBonus = 0
    const neutralInput = {
        timeSpent: 30,
        timeLimit: 30,
        currentStreak: 0,
        hintsUsed: 0,
        correct: true,
    } as const;

    it("devuelve 0 si la respuesta es incorrecta (sin importar la dificultad)", () => {
        expect(
            calculateQuestionScore({ ...neutralInput, difficulty: "facil", correct: false }),
        ).toBe(0);
        expect(
            calculateQuestionScore({ ...neutralInput, difficulty: "dificil", correct: false }),
        ).toBe(0);
    });

    it("devuelve BASE_POINTS[difficulty] sin bonus ni penalización", () => {
        expect(
            calculateQuestionScore({ ...neutralInput, difficulty: "facil" }),
        ).toBe(BASE_POINTS.facil); // 10

        expect(
            calculateQuestionScore({ ...neutralInput, difficulty: "medio" }),
        ).toBe(BASE_POINTS.medio); // 20

        expect(
            calculateQuestionScore({ ...neutralInput, difficulty: "dificil" }),
        ).toBe(BASE_POINTS.dificil); // 30
    });

    it("aplica bonus de rapidez proporcional al tiempo restante", () => {
        // respuesta a mitad de tiempo → ratio = 0.5 → bonus = round(base * 0.5 * 0.5)
        const half = calculateQuestionScore({
            ...neutralInput,
            difficulty: "medio",
            timeSpent: 15,
            timeLimit: 30,
        });
        // base 20 + bonus round(20 * 0.5 * 0.5) = 20 + 5 = 25
        expect(half).toBe(25);

        // respuesta instantánea → ratio = 1 → bonus completo
        const instant = calculateQuestionScore({
            ...neutralInput,
            difficulty: "medio",
            timeSpent: 0,
            timeLimit: 30,
        });
        // base 20 + bonus round(20 * 0.5 * 1) = 20 + 10 = 30
        expect(instant).toBe(30);
    });

    it("no aplica bonus negativo si timeSpent > timeLimit (clamp 0)", () => {
        const late = calculateQuestionScore({
            ...neutralInput,
            difficulty: "medio",
            timeSpent: 100,
            timeLimit: 30,
        });
        expect(late).toBe(BASE_POINTS.medio); // sin bonus
    });

    it("aplica bonus de racha a partir del 3er acierto consecutivo", () => {
        const streak2 = calculateQuestionScore({
            ...neutralInput,
            difficulty: "facil",
            currentStreak: 2,
        });
        expect(streak2).toBe(BASE_POINTS.facil); // sin bonus

        const streak3 = calculateQuestionScore({
            ...neutralInput,
            difficulty: "facil",
            currentStreak: 3,
        });
        expect(streak3).toBe(BASE_POINTS.facil + STREAK_BONUS); // 10 + 10 = 20
    });

    it("penaliza HINT_PENALTY por cada pista usada", () => {
        const noHints = calculateQuestionScore({
            ...neutralInput,
            difficulty: "medio",
            hintsUsed: 0,
        });
        const two = calculateQuestionScore({
            ...neutralInput,
            difficulty: "medio",
            hintsUsed: 2,
        });
        expect(noHints - two).toBe(2 * HINT_PENALTY); // 10
    });

    it("nunca devuelve un número negativo (clamp a 0)", () => {
        const many = calculateQuestionScore({
            ...neutralInput,
            difficulty: "facil",
            hintsUsed: 10,
        });
        expect(many).toBeGreaterThanOrEqual(0);
        expect(many).toBe(0); // 10 - 50 → clamp a 0
    });

    it("combinación completa: base + rapidez + racha − pistas", () => {
        const points = calculateQuestionScore({
            difficulty: "dificil",
            correct: true,
            timeSpent: 0,
            timeLimit: 30,
            currentStreak: 5,
            hintsUsed: 1,
        });
        // 30 + round(30*0.5*1)=15 + 10 − 5 = 50
        expect(points).toBe(50);
    });

    it("SPEED_BONUS_MAX es 0.5 (invariante del sistema)", () => {
        expect(SPEED_BONUS_MAX).toBe(0.5);
    });
});

// ============================================================
// XP y niveles
// ============================================================

describe("xpForAnswer", () => {
    it("+10 XP por acierto", () => {
        expect(xpForAnswer(true)).toBe(10);
    });
    it("+3 XP por fallo", () => {
        expect(xpForAnswer(false)).toBe(3);
    });
});

describe("calculateLevel", () => {
    it("nivel 1 en el rango [0, 99]", () => {
        expect(calculateLevel(0)).toBe(1);
        expect(calculateLevel(99)).toBe(1);
    });
    it("nivel 2 en 100 XP", () => {
        expect(calculateLevel(100)).toBe(2);
    });
    it("nivel 3 en 400 XP", () => {
        expect(calculateLevel(400)).toBe(3);
    });
    it("nivel 4 en 900 XP", () => {
        expect(calculateLevel(900)).toBe(4);
    });
    it("es monótonamente creciente", () => {
        expect(calculateLevel(100)).toBeLessThan(calculateLevel(1000));
        expect(calculateLevel(1000)).toBeLessThan(calculateLevel(10000));
    });
});

describe("xpProgressInLevel", () => {
    it("en 0 XP: current=0, needed=100, percent=0", () => {
        const p = xpProgressInLevel(0);
        expect(p.current).toBe(0);
        expect(p.needed).toBe(100);
        expect(p.percent).toBe(0);
    });

    it("en 50 XP: mitad del nivel 1", () => {
        const p = xpProgressInLevel(50);
        expect(p.current).toBe(50);
        expect(p.needed).toBe(100);
        expect(p.percent).toBe(50);
    });

    it("en 100 XP: arranca nivel 2 con current=0", () => {
        const p = xpProgressInLevel(100);
        expect(p.current).toBe(0);
        expect(p.needed).toBe(300); // 400 - 100
        expect(p.percent).toBe(0);
    });

    it("current siempre < needed en cualquier XP", () => {
        [0, 50, 99, 100, 399, 400, 500, 900, 1500].forEach((xp) => {
            const p = xpProgressInLevel(xp);
            expect(p.current).toBeLessThan(p.needed);
        });
    });
});

// ============================================================
// updateStreak
// ============================================================

describe("updateStreak", () => {
    it("primer juego (lastPlayedAt null) → racha 1", () => {
        const updated = updateStreak(makeProfile(), NOW);
        expect(updated.streak).toBe(1);
        expect(updated.lastPlayedAt).toBe(NOW);
    });

    it("mismo día → racha se mantiene, solo se actualiza timestamp", () => {
        const profile = makeProfile({
            streak: 5,
            lastPlayedAt: NOW - 60_000, // hace 1 minuto
        });
        const updated = updateStreak(profile, NOW);
        expect(updated.streak).toBe(5);
        expect(updated.lastPlayedAt).toBe(NOW);
    });

    it("día siguiente → racha +1", () => {
        const profile = makeProfile({
            streak: 4,
            lastPlayedAt: NOW - DAY,
        });
        const updated = updateStreak(profile, NOW);
        expect(updated.streak).toBe(5);
    });

    it("recarga escudo de gracia al llegar a múltiplo de 7 días", () => {
        const profile = makeProfile({
            streak: 6,
            lastPlayedAt: NOW - DAY,
            graceShieldAvailable: false,
        });
        const updated = updateStreak(profile, NOW);
        expect(updated.streak).toBe(7);
        expect(updated.graceShieldAvailable).toBe(true);
    });

    it("2+ días sin jugar CON escudo → +1 racha y consume escudo", () => {
        const profile = makeProfile({
            streak: 10,
            lastPlayedAt: NOW - 2 * DAY,
            graceShieldAvailable: true,
        });
        const updated = updateStreak(profile, NOW);
        expect(updated.streak).toBe(11);
        expect(updated.graceShieldAvailable).toBe(false);
    });

    it("2+ días sin jugar SIN escudo → racha vuelve a 1", () => {
        const profile = makeProfile({
            streak: 10,
            lastPlayedAt: NOW - 2 * DAY,
            graceShieldAvailable: false,
        });
        const updated = updateStreak(profile, NOW);
        expect(updated.streak).toBe(1);
    });
});

// ============================================================
// summarizeGame
// ============================================================

describe("summarizeGame", () => {
    const makeAnswer = (
        correct: boolean,
        pointsEarned: number,
        timeSpent = 10,
    ): AnsweredQuestion => ({
        questionId: "q-x",
        correct,
        timeSpent,
        pointsEarned,
        answeredAt: NOW,
    });

    it("resumen vacío: cero todo", () => {
        const s = summarizeGame([]);
        expect(s.correct).toBe(0);
        expect(s.wrong).toBe(0);
        expect(s.totalPoints).toBe(0);
        expect(s.accuracy).toBe(0);
        expect(s.perfect).toBe(false);
        expect(s.fastestAnswer).toBeNull();
    });

    it("partida perfecta: 3/3 → accuracy 100, perfect true", () => {
        const s = summarizeGame([
            makeAnswer(true, 20, 5),
            makeAnswer(true, 15, 3),
            makeAnswer(true, 25, 8),
        ]);
        expect(s.correct).toBe(3);
        expect(s.wrong).toBe(0);
        expect(s.totalPoints).toBe(60);
        expect(s.accuracy).toBe(100);
        expect(s.perfect).toBe(true);
        expect(s.fastestAnswer).toBe(3);
    });

    it("partida mixta: 2/3 → accuracy 67", () => {
        const s = summarizeGame([
            makeAnswer(true, 20, 5),
            makeAnswer(false, 0, 30),
            makeAnswer(true, 15, 4),
        ]);
        expect(s.correct).toBe(2);
        expect(s.wrong).toBe(1);
        expect(s.accuracy).toBe(67); // round(2/3*100)
        expect(s.perfect).toBe(false);
        expect(s.fastestAnswer).toBe(4);
    });

    it("xpGained cuenta aciertos × 10 + fallos × 3", () => {
        const s = summarizeGame([
            makeAnswer(true, 20),
            makeAnswer(false, 0),
            makeAnswer(true, 15),
        ]);
        expect(s.xpGained).toBe(10 + 3 + 10);
    });
});

// ============================================================
// Formato
// ============================================================

describe("formatScore", () => {
    it("devuelve string", () => {
        expect(typeof formatScore(0)).toBe("string");
        expect(typeof formatScore(1234)).toBe("string");
        expect(typeof formatScore(999999)).toBe("string");
    });
});

describe("formatTime", () => {
    it("menos de 60 → 'Xs'", () => {
        expect(formatTime(0)).toBe("0s");
        expect(formatTime(30)).toBe("30s");
        expect(formatTime(59)).toBe("59s");
    });

    it("60+ → 'Xm Ys'", () => {
        expect(formatTime(60)).toBe("1m 0s");
        expect(formatTime(125)).toBe("2m 5s");
        expect(formatTime(3600)).toBe("60m 0s");
    });
});