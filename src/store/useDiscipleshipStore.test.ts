import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  useDiscipleshipStore,
  selectEstadoLeccion,
  selectProximoPaso,
  selectPosicionAReanudar,
  selectEstadoNivel,
  selectEstadoSenda,
  selectProgresoNivel,
  selectProgresoSenda,
} from "./useDiscipleshipStore";
import { db } from "../db/database";
import { eventBus } from "./eventBus";
import { getLeccion } from "../data/discipleship";
import type { ProgresoLeccion } from "../types/discipleship";

vi.mock("../db/database", () => ({
  db: {
    progresoLeccion: { put: vi.fn(), toArray: vi.fn().mockResolvedValue([]) },
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
        pistaReintento: "Pista",
        referenciaRVR1960: "Mateo 1:1",
      },
    ],
  })),
}));

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
    expect(res.correcto).toBe(true);
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
    expect(saved.primeraRecorridaAt).toBe(12345);
    expect(saved.vecesRepasada).toBe(1);
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

  it("#9 selectEstadoLeccion: retorna 'sin_empezar' para la primera lección", () => {
    expect(
      selectEstadoLeccion(useDiscipleshipStore.getState(), "evangelios:1:1"),
    ).toBe("sin_empezar");
  });

  it("#10 selectEstadoLeccion: retorna 'bloqueado' si el hermano anterior no está recorrido", () => {
    expect(
      selectEstadoLeccion(useDiscipleshipStore.getState(), "evangelios:1:2"),
    ).toBe("bloqueado");
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
    expect(
      selectProximoPaso(useDiscipleshipStore.getState())?.leccionNumber,
    ).toBe(2);
  });

  it("#13 eventBus: emite y recibe eventos", () => {
    const listener = vi.fn();
    const unsub = eventBus.on(listener);
    eventBus.emit("leccion_iniciada", { test: 1 });
    expect(listener).toHaveBeenCalledWith("leccion_iniciada", { test: 1 });
    unsub();
    eventBus.emit("leccion_iniciada", { test: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

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

  it("#17 selectPosicionAReanudar: retorna tarjeta y pregunta exactas", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: {
        "evangelios:1:1": mockProgreso("en_curso", {
          tarjetaIdx: 2,
          preguntaIdx: 1,
        }),
      },
    });
    const pos = selectPosicionAReanudar(
      useDiscipleshipStore.getState(),
      "evangelios:1:1",
    );
    expect(pos?.tarjetaIdx).toBe(2);
    expect(pos?.preguntaIdx).toBe(1);
  });

  it("#18 selectProximoPaso: retorna null si todo está recorrido", () => {
    const allRecorridas: Record<string, ProgresoLeccion> = {};
    for (let n = 1; n <= 3; n++) {
      for (let l = 1; l <= 3; l++) {
        allRecorridas[`evangelios:${n}:${l}`] = mockProgreso("recorrida", {
          nivelNumber: n,
          leccionNumber: l,
        });
      }
    }
    useDiscipleshipStore.setState({ progresoLecciones: allRecorridas });
    expect(selectProximoPaso(useDiscipleshipStore.getState())).toBeNull();
  });

  it("#19 selectEstadoLeccion: nivel 2 bloqueado hasta completar nivel 1", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: { "evangelios:1:1": mockProgreso("recorrida") },
    });
    expect(
      selectEstadoLeccion(useDiscipleshipStore.getState(), "evangelios:2:1"),
    ).toBe("bloqueado");
  });

  it("#20 selectProgresoNivel: cuenta lecciones recorridas reales", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: {
        "evangelios:1:1": mockProgreso("recorrida", {
          nivelNumber: 1,
          leccionNumber: 1,
        }),
        "evangelios:1:2": mockProgreso("recorrida", {
          nivelNumber: 1,
          leccionNumber: 2,
        }),
      },
    });
    const prog = selectProgresoNivel(
      useDiscipleshipStore.getState(),
      "evangelios:1",
    );
    expect(prog.recorridas).toBe(2);
    expect(prog.total).toBe(3);
  });

  it("#21 selectProgresoSenda: cuenta el total de la senda", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: {
        "evangelios:1:1": mockProgreso("recorrida"),
        "evangelios:2:1": mockProgreso("recorrida", { nivelNumber: 2 }),
      },
    });
    const prog = selectProgresoSenda(
      useDiscipleshipStore.getState(),
      "evangelios",
    );
    expect(prog.recorridas).toBe(2);
    expect(prog.total).toBe(9);
  });

  it("#22 selectEstadoNivel: 'recorrido' si sus 3 lecciones están recorridas", () => {
    useDiscipleshipStore.setState({
      progresoLecciones: {
        "evangelios:1:1": mockProgreso("recorrida", { leccionNumber: 1 }),
        "evangelios:1:2": mockProgreso("recorrida", { leccionNumber: 2 }),
        "evangelios:1:3": mockProgreso("recorrida", { leccionNumber: 3 }),
      },
    });
    expect(
      selectEstadoNivel(useDiscipleshipStore.getState(), "evangelios:1"),
    ).toBe("recorrido");
  });

  it("#23 selectEstadoSenda: 'recorrida' si sus 3 niveles están recorridos", () => {
    const allRecorridas: Record<string, any> = {};
    for (let n = 1; n <= 3; n++) {
      for (let l = 1; l <= 3; l++) {
        allRecorridas[`evangelios:${n}:${l}`] = mockProgreso("recorrida", {
          nivelNumber: n,
          leccionNumber: l,
        });
      }
    }
    useDiscipleshipStore.setState({ progresoLecciones: allRecorridas });
    expect(
      selectEstadoSenda(useDiscipleshipStore.getState(), "evangelios"),
    ).toBe("recorrida");
  });

  // --- NUEVOS TESTS: BUG B1 ---

  it("#31 B1: responderCheck devuelve correcto:true con correctIndex=1 y selected=1", () => {
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

    // Forzamos el mock para que la pregunta tenga correctIndex: 1
    vi.mocked(getLeccion).mockReturnValueOnce({
      id: "evangelios:1:1",
      preguntas: [
        {
          id: "q1",
          correctIndex: 1,
          feedbackCorrecto: { afirmacion: "Así es." },
          pistaReintento: "Pista",
          referenciaRVR1960: "Mateo 1:1",
        },
      ],
    } as any);

    const res = useDiscipleshipStore.getState().responderCheck(0, 1);
    expect(res.correcto).toBe(true);
  });

  it("#32 B1: responderCheck es defensivo a strings (opcionIdx='1')", () => {
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

    // Forzamos el mock para que la pregunta tenga correctIndex: 1
    vi.mocked(getLeccion).mockReturnValueOnce({
      id: "evangelios:1:1",
      preguntas: [
        {
          id: "q1",
          correctIndex: 1,
          feedbackCorrecto: { afirmacion: "Así es." },
          pistaReintento: "Pista",
          referenciaRVR1960: "Mateo 1:1",
        },
      ],
    } as any);

    const res = useDiscipleshipStore.getState().responderCheck(0, "1" as any);
    expect(res.correcto).toBe(true);
  });
});
