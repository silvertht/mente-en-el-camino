import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMultiplayerStore } from "./useMultiplayerStore";
import { db, getUserRating } from "../db/database";
import { eventBus } from "./eventBus";

vi.mock("../db/database", () => ({
  db: {
    localSessions: {
      add: vi.fn().mockResolvedValue(123),
      get: vi.fn().mockResolvedValue({ id: 123, status: "activa" }),
      put: vi.fn(),
    },
    localPlayers: {
      bulkAdd: vi.fn().mockResolvedValue([1, 2]),
      put: vi.fn(),
    },
    localRounds: { bulkAdd: vi.fn() },
    transaction: vi.fn((...args: any[]) => {
      const callback = args[args.length - 1];
      if (typeof callback === "function") return callback();
    }),
  },
  getUserRating: vi.fn().mockResolvedValue({ global: 1200 }),
}));

vi.mock("../utils/rating", () => ({
  pickQuestionsByRating: vi.fn().mockResolvedValue([]),
}));

describe("useMultiplayerStore (API Canónica)", () => {
  let emitSpy: any;
  beforeEach(() => {
    vi.clearAllMocks();
    useMultiplayerStore.getState().resetPartida();
    emitSpy = vi.spyOn(eventBus, "emit");
  });

  it("#25 iniciarPartida: guarda en Dexie y establece el estado 'en_curso'", async () => {
    const jugadoresIniciales = [
      { id: "1", nombre: "A", icono: "user1", colorToken: "alba" as const },
      { id: "2", nombre: "B", icono: "user2", colorToken: "reino" as const },
    ];
    await useMultiplayerStore.getState().iniciarPartida(jugadoresIniciales);

    expect(getUserRating).toHaveBeenCalled();
    expect(db.localSessions.add).toHaveBeenCalled();
    expect(db.localPlayers.bulkAdd).toHaveBeenCalled();

    const state = useMultiplayerStore.getState();
    expect(state.estadoPartida).toBe("en_curso");
    expect(state.jugadores).toHaveLength(2);
    expect(state.jugadores[0].nombre).toBe("A");
    expect(state.turnoActualId).toBe("1");
  });

  it("#26 responderTurno: actualiza puntaje/fallos y avanza turno", () => {
    useMultiplayerStore.setState({
      estadoPartida: "en_curso",
      jugadores: [
        {
          id: "1",
          nombre: "A",
          icono: "u1",
          colorToken: "alba",
          puntuacion: 0,
          fallos: 0,
        },
        {
          id: "2",
          nombre: "B",
          icono: "u2",
          colorToken: "reino",
          puntuacion: 0,
          fallos: 0,
        },
      ],
      turnoActualId: "1",
    });

    useMultiplayerStore.getState().responderTurno(0);

    const state = useMultiplayerStore.getState();
    expect(state.jugadores[0].puntuacion).toBe(10);
    expect(state.turnoActualId).toBe("2");
  });

  it("#27 finalizarPartida: expone ganadorId por menos fallos", async () => {
    useMultiplayerStore.setState({
      sessionId: 123, // 👈 AÑADIDO: Evita el return temprano
      estadoPartida: "en_curso",
      jugadores: [
        {
          id: "1",
          nombre: "A",
          icono: "u1",
          colorToken: "alba",
          puntuacion: 10,
          fallos: 1,
        },
        {
          id: "2",
          nombre: "B",
          icono: "u2",
          colorToken: "reino",
          puntuacion: 10,
          fallos: 0,
        },
      ],
    });

    await useMultiplayerStore.getState().finalizarPartida();

    const state = useMultiplayerStore.getState();
    expect(state.estadoPartida).toBe("finalizada");
    expect(state.ganadorId).toBe("2");
    expect(emitSpy).toHaveBeenCalledWith(
      "partida_finalizada",
      expect.any(Object),
    );
  });

  it("#28 resetPartida: limpia el estado a 'idle'", () => {
    useMultiplayerStore.setState({
      estadoPartida: "finalizada",
      jugadores: [
        {
          id: "1",
          nombre: "A",
          icono: "",
          colorToken: "alba",
          puntuacion: 0,
          fallos: 0,
        },
      ],
    });
    useMultiplayerStore.getState().resetPartida();
    const state = useMultiplayerStore.getState();
    expect(state.estadoPartida).toBe("idle");
    expect(state.jugadores).toHaveLength(0);
    expect(state.turnoActualId).toBeNull();
  });
});
