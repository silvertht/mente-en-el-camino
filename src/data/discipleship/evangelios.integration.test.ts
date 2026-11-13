import { describe, it, expect, vi, beforeEach } from "vitest";
import { SENDA_EVANGELIOS } from "./evangelios";

vi.mock("../../db/database", () => ({
  db: {
    progreso_leccion: { put: vi.fn(), toArray: vi.fn().mockResolvedValue([]) }, // ✅ snake_case
    racha_discipulado: {
      // ✅ snake_case
      put: vi.fn(),
      get: vi
        .fn()
        .mockResolvedValue({
          id: "global",
          current: 0,
          best: 0,
          lastDay: null,
        }),
    },
    transaction: vi.fn((...args: any[]) => {
      const cb = args[args.length - 1];
      if (typeof cb === "function") return cb();
    }),
  },
}));

vi.mock("../../data/discipleship", async () => {
  const { SENDA_EVANGELIOS: realSenda } = await import("./evangelios");
  return {
    isDiscipleshipContentLoaded: () => true,
    loadDiscipleshipContent: vi.fn(),
    getLeccion: (_sendaId: any, n: any, l: any) => {
      const nivel = realSenda.niveles.find((nv: any) => nv.nivelNumber === n);
      return nivel?.lecciones.find((lec: any) => lec.leccionNumber === l);
    },
  };
});

import { useDiscipleshipStore } from "../../store/useDiscipleshipStore";

describe("Integración B1: contenido real de evangelios (54 aserciones)", () => {
  beforeEach(() => {
    useDiscipleshipStore.setState({
      progresoLecciones: {},
      leccionActiva: null,
      racha: null,
    });
  });

  it("F2.1: las 27 preguntas devuelven correcto:true al responder con su correctIndex real", () => {
    let assertions = 0;
    for (const nivel of SENDA_EVANGELIOS.niveles) {
      for (const leccion of nivel.lecciones) {
        for (let idx = 0; idx < leccion.preguntas.length; idx++) {
          const pregunta = leccion.preguntas[idx];
          useDiscipleshipStore.setState({
            leccionActiva: {
              sendaId: leccion.sendaId,
              nivelNumber: leccion.nivelNumber,
              leccionNumber: leccion.leccionNumber,
              tarjetaIdx: 0,
              preguntaIdx: idx,
              enRepaso: false,
            },
          });
          const res = useDiscipleshipStore
            .getState()
            .responderCheck(idx, pregunta.correctIndex);
          expect(
            res.correcto,
            `Falla en ${pregunta.id} con correctIndex=${pregunta.correctIndex}`,
          ).toBe(true);
          assertions++;
        }
      }
    }
    expect(assertions).toBe(27);
  });

  it("F2.2: las 27 preguntas devuelven correcto:false al responder con un índice incorrecto", () => {
    let assertions = 0;
    for (const nivel of SENDA_EVANGELIOS.niveles) {
      for (const leccion of nivel.lecciones) {
        for (let idx = 0; idx < leccion.preguntas.length; idx++) {
          const pregunta = leccion.preguntas[idx];
          const wrongIdx =
            (pregunta.correctIndex + 1) % pregunta.opciones.length;
          useDiscipleshipStore.setState({
            leccionActiva: {
              sendaId: leccion.sendaId,
              nivelNumber: leccion.nivelNumber,
              leccionNumber: leccion.leccionNumber,
              tarjetaIdx: 0,
              preguntaIdx: idx,
              enRepaso: false,
            },
          });
          const res = useDiscipleshipStore
            .getState()
            .responderCheck(idx, wrongIdx);
          expect(
            res.correcto,
            `Falla en ${pregunta.id} con wrongIdx=${wrongIdx}`,
          ).toBe(false);
          assertions++;
        }
      }
    }
    expect(assertions).toBe(27);
  });

  it("F2.3: distribución de correctIndex (ninguno concentra >60%)", () => {
    const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let total = 0;
    for (const nivel of SENDA_EVANGELIOS.niveles) {
      for (const leccion of nivel.lecciones) {
        for (const pregunta of leccion.preguntas) {
          counts[pregunta.correctIndex]++;
          total++;
        }
      }
    }
    expect(total).toBe(27);
    Object.values(counts).forEach((c) =>
      expect(
        c,
        `Distribución concentrada: ${JSON.stringify(counts)}`,
      ).toBeLessThanOrEqual(16),
    );
    const nonZero = Object.values(counts).filter((c) => c > 0).length;
    expect(nonZero).toBeGreaterThanOrEqual(3);
  });
});
