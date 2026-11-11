import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  useDiscipleshipStore,
  selectEstadoLeccion,
  selectProximoPaso,
} from "./useDiscipleshipStore";
import { db } from "../db/database";
import { eventBus } from "./eventBus";
import type { ProgresoLeccion } from "../types/discipleship";

// ============================================================
// MOCKS
// ============================================================

vi.mock("../db/database", () => ({
  db: {
    progresoLeccion: {
      put: vi.fn(),
      toArray: vi.fn().mockResolvedValue([]),
    },
    rachaDiscipulado: {
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
    // Captura el callback (siempre el último argumento) sin importar cuántas tablas se le pasen
    transaction: vi.fn((...args: any[]) => {
      const callback = args[args.length - 1];
      if (typeof callback === "function") return callback();
    }),
  },
}));

vi.mock("../data/discipleship", () => ({
  isDiscipleshipContentLoaded: () => true,
  loadDiscipleshipContent: vi.fn(),
  getLeccion: vi.fn((s, n, l) => ({
    id: `${s}:${n}:${l}`,
    preguntas: [
      {
        id: "q1",
        correctIndex: 0,
        feedbackCorrecto: { afirmacion: "Así es." },
      },
    ],
  })),
}));

// ============================================================
// HELPERS
// ============================================================

// Helper para crear un objeto ProgresoLeccion válido sin repetir código
const mockProgreso = (estado: any, extra = {}): ProgresoLeccion =>
  ({
    id: "evangelios:1:1",
    sendaId: "evangelios",
    nivelNumber: 1,
    leccionNumber: 1,
    estado,
    tarjetaIdx: 0,
    preguntaIdx: 0,
    vecesRepasada: 0,
    ultimaActividadAt: 0,
    ...extra,
  }) as ProgresoLeccion;

// ============================================================
// TESTS
// ============================================================

describe("useDiscipleshipStore", () => {
  let emitSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    useDiscipleshipStore.setState({
      progresoLecciones: {},
      racha: null,
      leccionActiva: null,
    });
    emitSpy = vi.spyOn(eventBus, "emit");
  });

  // --- Acciones ---
  it("#4 iniciarLeccion: crea registro y emite evento", async () => {
    await useDiscipleshipStore.getState().iniciarLeccion("evangelios", 1, 1);
    expect(db.progresoLeccion.put).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(
      "leccion_iniciada",
      expect.any(Object),
    );
  });

  it("#5 responderCheck: es efímero (no toca Dexie) y emite check_respondido", async () => {
    useDiscipleshipStore.setState({
      leccionActiva: {
        sendaId: "evangelios",
        nivelNumber: 1,
        leccionNumber: 1,
        tarjetaIdx: 0,
        preguntaIdx: 0,
        enRepaso: false,
      },
    });
    const res = useDiscipleshipStore.getState().responderCheck(0, 0);
    expect(res.correct).toBe(true);
    expect(db.progresoLeccion.put).not.toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(
      "check_respondido",
      expect.any(Object),
    );
  });

  it("#6 finalizarLeccion: persiste estado 'recorrida' y racha atómicamente", async () => {
    useDiscipleshipStore.setState({
      leccionActiva: {
        sendaId: "evangelios",
        nivelNumber: 1,
        leccionNumber: 1,
        tarjetaIdx: 0,
        preguntaIdx: 0,
        enRepaso: false,
      },
      progresoLecciones: { "evangelios:1:1": mockProgreso("en_curso") },
      racha: { id: "global", current: 0, best: 0, lastDay: null },
    });

    await useDiscipleshipStore.getState().finalizarLeccion();
    expect(db.transaction).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(
      "leccion_recorrida",
      expect.any(Object),
    );
    expect(useDiscipleshipStore.getState().leccionActiva).toBeNull();
  });

  it("#7 finalizarLeccion en repaso no altera primeraRecorridaAt", async () => {
    useDiscipleshipStore.setState({
      leccionActiva: {
        sendaId: "evangelios",
        nivelNumber: 1,
        leccionNumber: 1,
        tarjetaIdx: 0,
        preguntaIdx: 0,
        enRepaso: true,
      },
      progresoLecciones: {
        "evangelios:1:1": mockProgreso("repaso", { primeraRecorridaAt: 12345 }),
      },
      racha: { id: "global", current: 0, best: 0, lastDay: null },
    });

    await useDiscipleshipStore.getState().finalizarLeccion();
    const saved = vi.mocked(db.progresoLeccion.put).mock
      .calls[0][0] as ProgresoLeccion;
    expect(saved.primeraRecorridaAt).toBe(12345); // No cambió
    expect(saved.vecesRepasada).toBe(1); // Sumó repaso
  });

  it("#8 abandonarLeccion: guarda posición y limpia sesión", async () => {
    useDiscipleshipStore.setState({
      leccionActiva: {
        sendaId: "evangelios",
        nivelNumber: 1,
        leccionNumber: 1,
        tarjetaIdx: 2,
        preguntaIdx: 1,
        enRepaso: false,
      },
    });
    await useDiscipleshipStore.getState().abandonarLeccion();
    expect(emitSpy).toHaveBeenCalledWith(
      "posicion_guardada",
      expect.any(Object),
    );
    expect(useDiscipleshipStore.getState().leccionActiva).toBeNull();
  });

  // --- Selectores ---
  it("#9 selectEstadoLeccion: retorna 'sin_empezar' para la primera lección", () => {
    const state = useDiscipleshipStore.getState();
    expect(selectEstadoLeccion(state, "evangelios:1:1")).toBe("sin_empezar");
  });

  it("#10 selectEstadoLeccion: retorna 'bloqueada' si el hermano anterior no está recorrido", () => {
    const state = useDiscipleshipStore.getState();
    expect(selectEstadoLeccion(state, "evangelios:1:2")).toBe("bloqueada");
  });

  it("#11 selectEstadoLeccion: retorna 'sin_empezar' si el hermano anterior está recorrido", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: { "evangelios:1:1": mockProgreso("recorrida") },
    });
    expect(
      selectEstadoLeccion(useDiscipleshipStore.getState(), "evangelios:1:2"),
    ).toBe("sin_empezar");
  });

  it("#12 selectProximoPaso: retorna la primera no recorrida", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: { "evangelios:1:1": mockProgreso("recorrida") },
    });
    const step = selectProximoPaso(useDiscipleshipStore.getState());
    expect(step?.leccionNumber).toBe(2);
  });

  // --- EventBus ---
  it("#13 eventBus: emite y recibe eventos", () => {
    const listener = vi.fn();
    const unsub = eventBus.on(listener);
    eventBus.emit("leccion_iniciada", { test: 1 });
    expect(listener).toHaveBeenCalledWith("leccion_iniciada", { test: 1 });
    unsub();
    eventBus.emit("leccion_iniciada", { test: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  // --- Lógica de negocio extra ---
  it("#14 iniciarLeccion: si ya estaba 'recorrida', entra como 'repaso'", async () => {
    useDiscipleshipStore.setState({
      progresoLecciones: { "evangelios:1:1": mockProgreso("recorrida") },
    });
    await useDiscipleshipStore.getState().iniciarLeccion("evangelios", 1, 1);
    expect(useDiscipleshipStore.getState().leccionActiva?.enRepaso).toBe(true);
  });

  it("#15 reabrirLeccion: llama a iniciarLeccion", async () => {
    const spy = vi.spyOn(useDiscipleshipStore.getState(), "iniciarLeccion");
    await useDiscipleshipStore.getState().reabrirLeccion("evangelios", 1, 1);
    expect(spy).toHaveBeenCalledWith("evangelios", 1, 1);
  });

  it("#16 finalizarLeccion: usa transacción atómica de Dexie", async () => {
    useDiscipleshipStore.setState({
      leccionActiva: {
        sendaId: "evangelios",
        nivelNumber: 1,
        leccionNumber: 1,
        tarjetaIdx: 0,
        preguntaIdx: 0,
        enRepaso: false,
      },
      progresoLecciones: { "evangelios:1:1": mockProgreso("en_curso") },
      racha: { id: "global", current: 0, best: 0, lastDay: null },
    });
    await useDiscipleshipStore.getState().finalizarLeccion();
    expect(db.transaction).toHaveBeenCalledWith(
      "rw",
      expect.anything(),
      expect.anything(),
      expect.any(Function),
    );
  });
});
