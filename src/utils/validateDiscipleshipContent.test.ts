import { describe, it, expect } from "vitest";
import { validarPreguntaReflexion } from "./validateDiscipleshipContent";
import type { PreguntaReflexion } from "../types/discipleship";

const base: PreguntaReflexion = {
  id: "x:1:1:1",
  enunciado: "¿?",
  opciones: ["A", "B"],
  correctIndex: 0,
  feedbackCorrecto: {
    afirmacion: "Así es. Ok.",
    dato: "Dato.",
    referenciaRVR1960: "Juan 1:1",
    reflexion: "¿?",
  },
  pistaReintento: "Pista corta con ref.",
  referenciaRVR1960: "Juan 1:1",
};

describe("validarPreguntaReflexion", () => {
  it("#20 rechaza sin referenciaRVR1960", () => {
    const e = validarPreguntaReflexion({ ...base, referenciaRVR1960: "" });
    expect(e.some((x) => x.includes("RVR1960"))).toBe(true);
  });

  it("#21 rechaza sin las 4 partes del feedback", () => {
    const e1 = validarPreguntaReflexion({
      ...base,
      feedbackCorrecto: { ...base.feedbackCorrecto, dato: "" },
    });
    const e2 = validarPreguntaReflexion({
      ...base,
      feedbackCorrecto: { ...base.feedbackCorrecto, reflexion: "" },
    });
    const e3 = validarPreguntaReflexion({
      ...base,
      feedbackCorrecto: { ...base.feedbackCorrecto, referenciaRVR1960: "" },
    });
    expect(e1.some((x) => x.includes("dato"))).toBe(true);
    expect(e2.some((x) => x.includes("reflexion"))).toBe(true);
    expect(e3.some((x) => x.includes("referenciaRVR1960"))).toBe(true);
  });

  it("#22 rechaza pistaReintento > 12 palabras", () => {
    const e = validarPreguntaReflexion({
      ...base,
      pistaReintento:
        "una pista extremadamente larga que excede el límite de doce palabras y sigue y sigue más",
    });
    expect(e.some((x) => x.includes("pistaReintento"))).toBe(true);
  });

  it("#23 rechaza afirmación sin 'Así es.'", () => {
    const e = validarPreguntaReflexion({
      ...base,
      feedbackCorrecto: { ...base.feedbackCorrecto, afirmacion: "Exacto." },
    });
    expect(e.some((x) => x.includes("D2"))).toBe(true);
  });

  it("acepta la pregunta base (control positivo)", () => {
    expect(validarPreguntaReflexion(base)).toEqual([]);
  });
});
