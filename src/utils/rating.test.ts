import { describe, it, expect } from "vitest";
import {
  RATING_MIN,
  RATING_MAX,
  RATING_INITIAL,
  K_EARLY,
  K_STABLE,
  K_EARLY_THRESHOLD,
  MAX_STRETCH,
  DIFFICULTY_BASE,
  TYPE_MODIFIER,
  DEFAULT_RATING_CONFIG,
  getQuestionRating,
  calcExpectedScore,
  calcRatingDelta,
  getKFactor,
  updateRating,
  calibrateInitialRating,
  getRatingBand,
  splitPoolByBand,
  pickQuestionsByRating,
  getRatingLabel,
  clampRating,
} from "./rating";
import type { Question, QuestionType, Difficulty } from "../types";

// ============================================================
// Fixtures
// ============================================================

function makeQuestion(
  id: string,
  difficulty: Difficulty,
  type: QuestionType,
): Question {
  return {
    id,
    type,
    category: "evangelios",
    difficulty,
    points: 10,
    explanation: "",
    ...(type === "multiple-choice"
      ? { question: "", options: [], correctIndex: 0 }
      : {}),
    ...(type === "true-false" ? { statement: "", correct: true } : {}),
    ...(type === "verse-scramble" ? { words: [], correctOrder: [] } : {}),
    ...(type === "who-said-it"
      ? { quote: "", options: [], correctIndex: 0 }
      : {}),
    ...(type === "timeline" ? { events: [], correctOrder: [] } : {}),
    ...(type === "fill-blank"
      ? { verseWithBlank: "", options: [], correctIndex: 0 }
      : {}),
    ...(type === "hint-deduction"
      ? { hints: [], answer: "", acceptedAnswers: [] }
      : {}),
  } as Question;
}

/** PRNG determinista para tests (mulberry32). */
function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================
// clampRating
// ============================================================

describe("clampRating", () => {
  it("respeta el mínimo", () => {
    expect(clampRating(RATING_MIN - 500)).toBe(RATING_MIN);
  });
  it("respeta el máximo", () => {
    expect(clampRating(RATING_MAX + 500)).toBe(RATING_MAX);
  });
  it("deja pasar valores en rango", () => {
    expect(clampRating(1400)).toBe(1400);
  });
});

// ============================================================
// getQuestionRating
// ============================================================

describe("getQuestionRating", () => {
  it("facil + multiple-choice = 1100", () => {
    expect(
      getQuestionRating(makeQuestion("q", "facil", "multiple-choice")),
    ).toBe(1100);
  });

  it("medio + multiple-choice = 1350", () => {
    expect(
      getQuestionRating(makeQuestion("q", "medio", "multiple-choice")),
    ).toBe(1350);
  });

  it("dificil + multiple-choice = 1600", () => {
    expect(
      getQuestionRating(makeQuestion("q", "dificil", "multiple-choice")),
    ).toBe(1600);
  });

  it("true-false resta 50", () => {
    expect(getQuestionRating(makeQuestion("q", "medio", "true-false"))).toBe(
      DIFFICULTY_BASE.medio + TYPE_MODIFIER["true-false"],
    );
  });

  it("hint-deduction suma 120", () => {
    expect(
      getQuestionRating(makeQuestion("q", "dificil", "hint-deduction")),
    ).toBe(DIFFICULTY_BASE.dificil + TYPE_MODIFIER["hint-deduction"]);
  });

  it("nunca baja del mínimo global", () => {
    const r = getQuestionRating(makeQuestion("q", "facil", "true-false"));
    expect(r).toBeGreaterThanOrEqual(RATING_MIN);
  });

  it("todos los tipos devuelven un entero", () => {
    const types: QuestionType[] = [
      "multiple-choice",
      "true-false",
      "verse-scramble",
      "who-said-it",
      "timeline",
      "fill-blank",
      "hint-deduction",
    ];
    for (const t of types) {
      const r = getQuestionRating(makeQuestion("q", "medio", t));
      expect(Number.isInteger(r)).toBe(true);
    }
  });
});

// ============================================================
// calcExpectedScore
// ============================================================

describe("calcExpectedScore", () => {
  it("usuario igual a pregunta → 0.5", () => {
    expect(calcExpectedScore(1300, 1300)).toBeCloseTo(0.5, 5);
  });

  it("usuario superior → expectativa > 0.5", () => {
    expect(calcExpectedScore(1600, 1300)).toBeGreaterThan(0.5);
  });

  it("usuario inferior → expectativa < 0.5", () => {
    expect(calcExpectedScore(1100, 1500)).toBeLessThan(0.5);
  });

  it("diferencia de 400 → ~0.909", () => {
    expect(calcExpectedScore(1700, 1300)).toBeCloseTo(0.909, 2);
  });

  it("siempre en (0, 1)", () => {
    const cases = [
      [800, 2200],
      [2200, 800],
      [1000, 1000],
    ];
    for (const [u, q] of cases) {
      const e = calcExpectedScore(u, q);
      expect(e).toBeGreaterThan(0);
      expect(e).toBeLessThan(1);
    }
  });
});

// ============================================================
// getKFactor
// ============================================================

describe("getKFactor", () => {
  it("K alto antes del umbral", () => {
    expect(getKFactor(0)).toBe(K_EARLY);
    expect(getKFactor(K_EARLY_THRESHOLD - 1)).toBe(K_EARLY);
  });

  it("K estable desde el umbral", () => {
    expect(getKFactor(K_EARLY_THRESHOLD)).toBe(K_STABLE);
    expect(getKFactor(1000)).toBe(K_STABLE);
  });

  it("respeta config custom", () => {
    const cfg = {
      ...DEFAULT_RATING_CONFIG,
      kEarly: 48,
      kStable: 24,
      kEarlyThreshold: 10,
    };
    expect(getKFactor(5, cfg)).toBe(48);
    expect(getKFactor(10, cfg)).toBe(24);
  });
});

// ============================================================
// calcRatingDelta
// ============================================================

describe("calcRatingDelta", () => {
  it("acierto contra igual → +K/2", () => {
    expect(calcRatingDelta(1300, 1300, true, 32)).toBeCloseTo(16, 5);
  });

  it("fallo contra igual → -K/2", () => {
    expect(calcRatingDelta(1300, 1300, false, 32)).toBeCloseTo(-16, 5);
  });

  it("acierto contra pregunta mucho más difícil → delta grande", () => {
    const hard = calcRatingDelta(1200, 1700, true, 32);
    const easy = calcRatingDelta(1200, 1100, true, 32);
    expect(hard).toBeGreaterThan(easy);
  });

  it("fallo contra pregunta fácil → castigo fuerte", () => {
    const delta = calcRatingDelta(1500, 1100, false, 32);
    expect(delta).toBeLessThan(-20);
  });
});

// ============================================================
// updateRating
// ============================================================

describe("updateRating", () => {
  it("sube al acertar contra igual", () => {
    const nuevo = updateRating(1300, 1300, true, 100);
    expect(nuevo).toBeGreaterThan(1300);
  });

  it("baja al fallar contra igual", () => {
    const nuevo = updateRating(1300, 1300, false, 100);
    expect(nuevo).toBeLessThan(1300);
  });

  it("K alto mueve más el rating que K estable", () => {
    const early = updateRating(1300, 1300, true, 0);
    const stable = updateRating(1300, 1300, true, 999);
    expect(early).toBeGreaterThan(stable);
  });

  it("clamp a RATING_MIN", () => {
    const nuevo = updateRating(RATING_MIN, 2200, false, 0);
    expect(nuevo).toBe(RATING_MIN);
  });

  it("clamp a RATING_MAX", () => {
    const nuevo = updateRating(RATING_MAX, 800, true, 0);
    expect(nuevo).toBe(RATING_MAX);
  });

  it("nunca devuelve decimales", () => {
    for (let i = 0; i < 20; i++) {
      const r = updateRating(1300, 1400, i % 2 === 0, i * 5);
      expect(Number.isInteger(r)).toBe(true);
    }
  });
});

// ============================================================
// calibrateInitialRating
// ============================================================

describe("calibrateInitialRating", () => {
  it("0/3 → 1000", () => {
    expect(calibrateInitialRating([false, false, false])).toBe(1000);
  });
  it("1/3 → 1150", () => {
    expect(calibrateInitialRating([true, false, false])).toBe(1150);
  });
  it("2/3 → 1300", () => {
    expect(calibrateInitialRating([true, true, false])).toBe(1300);
  });
  it("3/3 → 1450", () => {
    expect(calibrateInitialRating([true, true, true])).toBe(1450);
  });
  it("sin respuestas → rating inicial por defecto", () => {
    expect(calibrateInitialRating([])).toBe(RATING_INITIAL);
  });
  it("es monótona con la accuracy", () => {
    const a = calibrateInitialRating([false, false, false]);
    const b = calibrateInitialRating([true, false, false]);
    const c = calibrateInitialRating([true, true, false]);
    const d = calibrateInitialRating([true, true, true]);
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(c);
    expect(c).toBeLessThan(d);
  });
});

// ============================================================
// getRatingBand
// ============================================================

describe("getRatingBand", () => {
  it("aplica banda por defecto (−150 / +100)", () => {
    expect(getRatingBand(1300)).toEqual({ min: 1150, max: 1400 });
  });
  it("respeta bandas custom", () => {
    expect(getRatingBand(1300, 100, 50)).toEqual({ min: 1200, max: 1350 });
  });
});

// ============================================================
// splitPoolByBand
// ============================================================

describe("splitPoolByBand", () => {
  const pool = [
    makeQuestion("q-1000", "facil", "true-false"), // 1050
    makeQuestion("q-1100", "facil", "multiple-choice"), // 1100
    makeQuestion("q-1350", "medio", "multiple-choice"), // 1350
    makeQuestion("q-1600", "dificil", "multiple-choice"), // 1600
    makeQuestion("q-1720", "dificil", "hint-deduction"), // 1720
  ];

  it("separa correctamente con usuario en 1300", () => {
    const { below, within, above } = splitPoolByBand(pool, 1300);
    // banda [1150, 1400]
    expect(below.map((q) => q.id)).toEqual(["q-1000", "q-1100"]);
    expect(within.map((q) => q.id)).toEqual(["q-1350"]);
    expect(above.map((q) => q.id)).toEqual(["q-1600", "q-1720"]);
  });

  it("buckets son mutuamente excluyentes", () => {
    const { below, within, above } = splitPoolByBand(pool, 1300);
    const total = below.length + within.length + above.length;
    expect(total).toBe(pool.length);
  });

  it("usuario en el techo → above vacío", () => {
    const { above } = splitPoolByBand(pool, RATING_MAX);
    expect(above.length).toBe(0);
  });

  it("usuario en el piso → below vacío", () => {
    const { below } = splitPoolByBand(pool, RATING_MIN);
    expect(below.length).toBe(0);
  });
});

// ============================================================
// pickQuestionsByRating
// ============================================================

describe("pickQuestionsByRating", () => {
  const bigPool: Question[] = [];
  for (let i = 0; i < 30; i++) {
    bigPool.push(makeQuestion(`e-${i}`, "facil", "multiple-choice"));
    bigPool.push(makeQuestion(`m-${i}`, "medio", "multiple-choice"));
    bigPool.push(makeQuestion(`d-${i}`, "dificil", "multiple-choice"));
  }

  it("devuelve exactamente `count` cuando el pool es suficiente", () => {
    const picked = pickQuestionsByRating(bigPool, 1300, 10, {
      random: mulberry32(1),
    });
    expect(picked.length).toBe(10);
  });

  it("no repite IDs", () => {
    const picked = pickQuestionsByRating(bigPool, 1300, 20, {
      random: mulberry32(2),
    });
    const ids = new Set(picked.map((q) => q.id));
    expect(ids.size).toBe(picked.length);
  });

  it("respeta `excludeIds`", () => {
    const excluded = new Set(["e-0", "e-1", "m-0", "m-1"]);
    const picked = pickQuestionsByRating(bigPool, 1300, 20, {
      excludeIds: excluded,
      random: mulberry32(3),
    });
    for (const q of picked) {
      expect(excluded.has(q.id)).toBe(false);
    }
  });

  it("si el pool es más pequeño que `count`, devuelve todo", () => {
    const small = bigPool.slice(0, 5);
    const picked = pickQuestionsByRating(small, 1300, 10, {
      random: mulberry32(4),
    });
    expect(picked.length).toBe(5);
  });

  it("pool vacío → array vacío", () => {
    const picked = pickQuestionsByRating([], 1300, 10, {
      random: mulberry32(5),
    });
    expect(picked).toEqual([]);
  });

  it("usuario en el techo con pool variado → composición mayoritaria en banda", () => {
    const picked = pickQuestionsByRating(bigPool, 1500, 10, {
      random: mulberry32(6),
    });
    const dificiles = picked.filter((q) => q.difficulty === "dificil").length;
    expect(dificiles).toBeGreaterThanOrEqual(2);
  });

  it("redistribuye si un bucket se agota", () => {
    const onlyEasy = bigPool.filter((q) => q.difficulty === "facil");
    const picked = pickQuestionsByRating(onlyEasy, 1600, 10, {
      random: mulberry32(7),
    });
    expect(picked.length).toBe(10);
    const ids = new Set(picked.map((q) => q.id));
    expect(ids.size).toBe(10);
  });

  it("mismo seed → mismo resultado (determinista)", () => {
    const a = pickQuestionsByRating(bigPool, 1300, 10, {
      random: mulberry32(42),
    });
    const b = pickQuestionsByRating(bigPool, 1300, 10, {
      random: mulberry32(42),
    });
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });
});

// ============================================================
// pickQuestionsByRating — cap de stretch (R3)
// ============================================================

describe("pickQuestionsByRating — cap de stretch", () => {
  const variedPool = [
    makeQuestion("q-1100", "facil", "multiple-choice"), // 1100
    makeQuestion("q-1400", "medio", "who-said-it"), // 1400
    makeQuestion("q-1600", "dificil", "multiple-choice"), // 1600
    makeQuestion("q-1720", "dificil", "hint-deduction"), // 1720
  ];

  it("excluye preguntas por encima de userRating + 400", () => {
    // Usuario en 1000 → cap = 1400. Nada de 1600 ni 1720.
    const picked = pickQuestionsByRating(variedPool, 1000, 4, {
      random: mulberry32(1),
    });
    const ids = picked.map((q) => q.id);
    expect(ids).not.toContain("q-1600");
    expect(ids).not.toContain("q-1720");
  });

  it("permite preguntas en el límite exacto del cap", () => {
    // Usuario en 1000 → cap = 1400. q-1400 debe estar disponible.
    const picked = pickQuestionsByRating(variedPool, 1000, 4, {
      random: mulberry32(2),
    });
    const ids = picked.map((q) => q.id);
    expect(ids).toContain("q-1400");
  });

  it("usuario experto (1800) sí recibe la pregunta más difícil", () => {
    // Usuario en 1800 → cap = 2200. Todas disponibles.
    // q-1720 (hint-deduction dificil) cae en banda [1650, 1900] → within.
    const picked = pickQuestionsByRating(variedPool, 1800, 4, {
      random: mulberry32(3),
    });
    const ids = picked.map((q) => q.id);
    expect(ids).toContain("q-1720");
  });

  it("respeta `maxStretch` custom", () => {
    // maxStretch = 100 → usuario 1200 → cap 1300. Solo q-1100.
    const picked = pickQuestionsByRating(variedPool, 1200, 4, {
      maxStretch: 100,
      random: mulberry32(4),
    });
    const ids = picked.map((q) => q.id);
    expect(ids).toEqual(["q-1100"]);
  });

  it("si el cap deja el pool vacío, devuelve array vacío", () => {
    const hardPool = [
      makeQuestion("h1", "dificil", "hint-deduction"), // 1720
      makeQuestion("h2", "dificil", "multiple-choice"), // 1600
    ];
    // Usuario 900 → cap 1300. Ninguna pasa.
    const picked = pickQuestionsByRating(hardPool, 900, 5, {
      random: mulberry32(5),
    });
    expect(picked).toEqual([]);
  });

  it("MAX_STRETCH es 400 (invariante)", () => {
    expect(MAX_STRETCH).toBe(400);
  });
});

// ============================================================
// getRatingLabel
// ============================================================

describe("getRatingLabel", () => {
  it("Aprendiz por debajo de 1100", () => {
    expect(getRatingLabel(900)).toBe("Aprendiz");
    expect(getRatingLabel(1099)).toBe("Aprendiz");
  });
  it("Explorador entre 1100 y 1299", () => {
    expect(getRatingLabel(1100)).toBe("Explorador");
    expect(getRatingLabel(1299)).toBe("Explorador");
  });
  it("Discípulo entre 1300 y 1499", () => {
    expect(getRatingLabel(1300)).toBe("Discípulo");
  });
  it("Maestro entre 1500 y 1699", () => {
    expect(getRatingLabel(1600)).toBe("Maestro");
  });
  it("Sabio entre 1700 y 1899", () => {
    expect(getRatingLabel(1800)).toBe("Sabio");
  });
  it("Teólogo desde 1900", () => {
    expect(getRatingLabel(1900)).toBe("Teólogo");
    expect(getRatingLabel(2200)).toBe("Teólogo");
  });
  it("es monótona (no rompe en fronteras)", () => {
    const ratings = [800, 1100, 1300, 1500, 1700, 1900, 2200];
    const labels = ratings.map(getRatingLabel);
    expect(labels).toEqual([
      "Aprendiz",
      "Explorador",
      "Discípulo",
      "Maestro",
      "Sabio",
      "Teólogo",
      "Teólogo",
    ]);
  });
});
