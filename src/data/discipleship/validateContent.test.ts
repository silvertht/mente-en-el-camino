import { describe, it, expect } from "vitest";
import { SENDA_EVANGELIOS } from "./evangelios";
import { validarSenda } from "../../utils/validateDiscipleshipContent";

describe("Contenido Discipulado · evangelios (MVP)", () => {
  it("#24 la senda completa pasa el validador", () => {
    expect(validarSenda(SENDA_EVANGELIOS)).toEqual([]);
  });

  it("#25 estructura: 3 niveles × 3 lecciones × 3 preguntas = 27", () => {
    expect(SENDA_EVANGELIOS.niveles).toHaveLength(3);
    for (const n of SENDA_EVANGELIOS.niveles) {
      expect(n.lecciones).toHaveLength(3);
      for (const l of n.lecciones) {
        expect(l.preguntas).toHaveLength(3);
      }
    }
    const total = SENDA_EVANGELIOS.niveles.reduce(
      (acc, n) => acc + n.lecciones.reduce((a, l) => a + l.preguntas.length, 0),
      0,
    );
    expect(total).toBe(27);
  });

  it("todas las afirmaciones empiezan con 'Así es.' (D2)", () => {
    for (const n of SENDA_EVANGELIOS.niveles) {
      for (const l of n.lecciones) {
        for (const p of l.preguntas) {
          expect(p.feedbackCorrecto.afirmacion.startsWith("Así es.")).toBe(
            true,
          );
        }
      }
    }
  });

  it("todas las referencias RVR1960 no están vacías", () => {
    for (const n of SENDA_EVANGELIOS.niveles) {
      for (const l of n.lecciones) {
        for (const p of l.preguntas) {
          expect(p.referenciaRVR1960.trim().length).toBeGreaterThan(0);
          expect(
            p.feedbackCorrecto.referenciaRVR1960.trim().length,
          ).toBeGreaterThan(0);
        }
      }
    }
  });
});
