import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMultiplayerStore } from "./useMultiplayerStore";
import { db, getUserRating } from "../db/database";
import { eventBus } from "./eventBus";
import { pickQuestionsByRating } from "../utils/rating";
import type { LocalRound } from "../types/discipleship";

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
  pickQuestionsByRating: vi.fn().mockResolvedValue([
    { id: "q1", type: "multiple-choice", correctIndex: 0 },
    { id: "q2", type: "multiple-choice", correctIndex: 1 },
    { id: "q3", type: "multiple-choice", correctIndex: 0 },
    { id: "q4", type: "multiple-choice", correctIndex: 1 },
  ]),
}));

describe("useMultiplayerStore", () => {
  let emitSpy: any;
  beforeEach(() => {
    vi.clearAllMocks();
    useMultiplayerStore.setState({
      sessionId: 123,
      players: [
        { id: 1, displayName: "A", order: 0, finalScore: 0, sessionId: 123 },
        { id: 2, displayName: "B", order: 1, finalScore: 0, sessionId: 123 },
      ],
      rounds: [],
      questions: [],
      currentRound: 1,
      currentPlayerIndex: 0,
    });
    emitSpy = vi.spyOn(eventBus, "emit");
  });

  it("#25 iniciarPartida: guarda en Dexie y lee el rating sin modificarlo (B7)", async () => {
    await useMultiplayerStore.getState().iniciarPartida(["A", "B"], 2);

    // B7: verifica que lee el rating pero no lo modifica
    expect(getUserRating).toHaveBeenCalled();

    // Verifica la persistencia inicial
    expect(db.localSessions.add).toHaveBeenCalled();
    expect(db.localPlayers.bulkAdd).toHaveBeenCalled();
    expect(pickQuestionsByRating).toHaveBeenCalled();

    // Los jugadores en el estado deben tener el ID asignado por la DB
    const players = useMultiplayerStore.getState().players;
    expect(players[0].id).toBe(1);
    expect(players[1].id).toBe(2);
  });

  it("#26 responderTurno: es efímero, no toca Dexie (B7)", () => {
    useMultiplayerStore.getState().responderTurno(0);

    // B7: Anti-exploit. No debe haber escrituras en DB por responder un turno
    expect(db.localRounds.bulkAdd).not.toHaveBeenCalled();
    expect(db.localPlayers.put).not.toHaveBeenCalled();
  });

  it("#27 finalizarPartida: aplica desempate por menos fallos (B10)", async () => {
    // Escenario: A (id:1) y B (id:2) empatan en 10 puntos.
    // A falló 1 pregunta, B falló 0. B debería ganar por menos fallos.
    const rounds: LocalRound[] = [
      {
        id: 1,
        sessionId: 123,
        roundNumber: 1,
        playerId: 1,
        questionId: "q1",
        selectedIndex: 0,
        isCorrect: true,
        points: 10,
      },
      {
        id: 2,
        sessionId: 123,
        roundNumber: 1,
        playerId: 2,
        questionId: "q2",
        selectedIndex: 1,
        isCorrect: true,
        points: 10,
      },
      {
        id: 3,
        sessionId: 123,
        roundNumber: 2,
        playerId: 1,
        questionId: "q3",
        selectedIndex: 1,
        isCorrect: false,
        points: 0,
      },
    ];
    useMultiplayerStore.setState({ rounds });

    await useMultiplayerStore.getState().finalizarPartida();

    // El ganador debe ser el jugador 2 (B)
    expect(emitSpy).toHaveBeenCalledWith("partida_finalizada", {
      sessionId: 123,
      winnerId: 2,
    });
    expect(db.transaction).toHaveBeenCalled();
  });
});
