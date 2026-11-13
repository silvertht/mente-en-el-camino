import { create } from "zustand";
import { db, getUserRating } from "../db/database";
import { eventBus } from "./eventBus";
import { pickQuestionsByRating } from "../utils/rating";
import type { Question } from "../types";
import type { Jugador, EstadoPartida } from "../types/multiplayer";
import type { LocalSession } from "../types/discipleship";

interface MultiplayerState {
  sessionId: number | null;
  estadoPartida: EstadoPartida;
  jugadores: Jugador[];
  turnoActualId: string | null;
  ganadorId: string | null;
  isLoading: boolean;
  currentRound: number;
  preguntas: Question[];

  iniciarPartida: (
    jugadoresIniciales: Omit<Jugador, "puntuacion" | "fallos">[],
  ) => Promise<void>;
  responderTurno: (opcionIdx: number) => void;
  finalizarPartida: () => Promise<void>;
  resetPartida: () => void;
}

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  sessionId: null,
  estadoPartida: "idle",
  jugadores: [],
  turnoActualId: null,
  ganadorId: null,
  isLoading: false,
  currentRound: 1,
  preguntas: [],

  iniciarPartida: async (jugadoresIniciales) => {
    set({ isLoading: true });
    try {
      const rating = await getUserRating();
      const preguntas = await pickQuestionsByRating(
        [],
        rating.global,
        jugadoresIniciales.length * 3,
      );

      const sessionData: LocalSession = {
        status: "activa",
        startedAt: Date.now(),
        finishedAt: null,
        roundsPerPlayer: 3,
      };
      const sessionId = await db.local_sessions.add(sessionData); // ✅ snake_case

      const newPlayers = jugadoresIniciales.map((j, i) => ({
        sessionId,
        displayName: j.nombre,
        order: i,
        finalScore: 0,
      }));

      const playerIds = await db.local_players.bulkAdd(newPlayers, {
        allKeys: true,
      }); // ✅ snake_case

      const jugadoresConStats: Jugador[] = jugadoresIniciales.map((j, i) => ({
        ...j,
        id: String(playerIds[i]),
        puntuacion: 0,
        fallos: 0,
      }));

      set({
        sessionId,
        estadoPartida: "en_curso",
        jugadores: jugadoresConStats,
        turnoActualId: jugadoresConStats[0].id,
        currentRound: 1,
        preguntas,
        isLoading: false,
      });
      eventBus.emit("partida_iniciada", {
        sessionId,
        playerCount: jugadoresIniciales.length,
      });
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  responderTurno: (opcionIdx) => {
    const { turnoActualId, jugadores, currentRound, preguntas } = get();
    if (!turnoActualId || !jugadores.length) return;

    const currentIndex = jugadores.findIndex((j) => j.id === turnoActualId);
    const questionIndex = (currentRound - 1) * jugadores.length + currentIndex;
    const pregunta = preguntas[questionIndex];

    const isCorrect = pregunta
      ? pregunta.type === "multiple-choice" &&
        opcionIdx === pregunta.correctIndex
      : opcionIdx === 0;
    const puntos = isCorrect ? 10 : 0;
    const fallos = isCorrect ? 0 : 1;

    const updatedJugadores = jugadores.map((j) =>
      j.id === turnoActualId
        ? { ...j, puntuacion: j.puntuacion + puntos, fallos: j.fallos + fallos }
        : j,
    );

    let nextIndex = currentIndex + 1;
    let nextRound = currentRound;

    if (nextIndex >= jugadores.length) {
      nextIndex = 0;
      nextRound += 1;
    }

    set({
      jugadores: updatedJugadores,
      turnoActualId: jugadores[nextIndex].id,
      currentRound: nextRound,
    });
  },

  finalizarPartida: async () => {
    const { jugadores, sessionId } = get();
    if (!jugadores.length || !sessionId) return;

    const maxScore = Math.max(...jugadores.map((j) => j.puntuacion));
    let winners = jugadores.filter((j) => j.puntuacion === maxScore);

    if (winners.length > 1) {
      const minWrongs = Math.min(...winners.map((j) => j.fallos));
      winners = winners.filter((j) => j.fallos === minWrongs);
    }
    const ganadorId = winners.length === 1 ? winners[0].id : null;

    await db.transaction(
      "rw",
      db.local_players,
      db.local_sessions,
      async () => {
        // ✅ snake_case
        for (const j of jugadores) {
          await db.local_players.put({
            // ✅ snake_case
            id: Number(j.id),
            sessionId,
            displayName: j.nombre,
            order: 0,
            finalScore: j.puntuacion,
          });
        }
        const currentSession = await db.local_sessions.get(sessionId); // ✅ snake_case
        if (currentSession) {
          await db.local_sessions.put({
            // ✅ snake_case
            ...currentSession,
            status: "finalizada",
            finishedAt: Date.now(),
          });
        }
      },
    );

    eventBus.emit("partida_finalizada", { sessionId, ganadorId });
    set({ estadoPartida: "finalizada", ganadorId });
  },

  resetPartida: () => {
    set({
      sessionId: null,
      estadoPartida: "idle",
      jugadores: [],
      turnoActualId: null,
      ganadorId: null,
      currentRound: 1,
      preguntas: [],
    });
  },
}));
