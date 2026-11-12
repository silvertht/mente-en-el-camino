import { create } from "zustand";
import { db, getUserRating } from "../db/database";
import { eventBus } from "./eventBus";
import { pickQuestionsByRating } from "../utils/rating";
import type { Question } from "../types";
import type {
  LocalPlayer,
  LocalRound,
  LocalSession,
} from "../types/discipleship";

interface MultiplayerState {
  sessionId: number | null;
  players: LocalPlayer[];
  rounds: LocalRound[];
  questions: Question[];
  currentRound: number;
  currentPlayerIndex: number;
  isLoading: boolean;

  iniciarPartida: (
    playerNames: string[],
    roundsPerPlayer: number,
  ) => Promise<void>;
  responderTurno: (selectedIndex: number | null) => void;
  avanzarTurno: () => void;
  finalizarPartida: () => Promise<void>;
}

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  sessionId: null,
  players: [],
  rounds: [],
  questions: [],
  currentRound: 1,
  currentPlayerIndex: 0,
  isLoading: false,

  iniciarPartida: async (playerNames, roundsPerPlayer) => {
    set({ isLoading: true });
    try {
      // B7: Solo LEEMOS el rating para seleccionar preguntas. No lo modificamos.
      const rating = await getUserRating();
      // Nota: Usamos el pool completo simulado (vacío aquí) para la selección
      const questions = await pickQuestionsByRating(
        [],
        rating.global,
        playerNames.length * roundsPerPlayer,
      );

      // 1. Crear y guardar la sesión en Dexie
      const sessionData: LocalSession = {
        status: "activa",
        startedAt: Date.now(),
        finishedAt: null,
        roundsPerPlayer,
      };
      const sessionId = await db.localSessions.add(sessionData);

      // 2. Crear y guardar los jugadores en Dexie
      const newPlayers = playerNames.map((name, i) => ({
        sessionId,
        displayName: name,
        order: i,
        finalScore: 0,
      }));
      // bulkAdd con { allKeys: true } nos devuelve los IDs generados
      const playerIds = await db.localPlayers.bulkAdd(newPlayers, {
        allKeys: true,
      });

      const playersWithIds = newPlayers.map((p, i) => ({
        ...p,
        id: playerIds[i],
      })) as LocalPlayer[];

      set({
        sessionId,
        players: playersWithIds,
        questions,
        rounds: [],
        currentRound: 1,
        currentPlayerIndex: 0,
        isLoading: false,
      });

      eventBus.emit("partida_iniciada", {
        sessionId,
        playerCount: playerNames.length,
      });
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  responderTurno: (selectedIndex) => {
    const { questions, currentRound, currentPlayerIndex, players, rounds } =
      get();
    if (!questions.length || !players.length) return;

    const qIndex = (currentRound - 1) * players.length + currentPlayerIndex;
    const q = questions[qIndex];
    if (!q) return;

    // Lógica simple de correcto (asume multiple-choice)
    const isCorrect =
      q.type === "multiple-choice" && selectedIndex === q.correctIndex;
    const points = isCorrect ? 10 : 0;

    const newRound: LocalRound = {
      id: undefined, // Se asigna en DB al finalizar
      sessionId: get().sessionId!,
      roundNumber: currentRound,
      playerId: players[currentPlayerIndex].id!,
      questionId: q.id,
      selectedIndex,
      isCorrect,
      points,
    };

    // EFÍMERO (Anti-exploit): Solo memoria
    set({ rounds: [...rounds, newRound] });
  },

  avanzarTurno: () => {
    const { currentPlayerIndex, players, currentRound } = get();
    if (currentPlayerIndex < players.length - 1) {
      set({ currentPlayerIndex: currentPlayerIndex + 1 });
    } else {
      set({ currentPlayerIndex: 0, currentRound: currentRound + 1 });
    }
  },

  finalizarPartida: async () => {
    const { sessionId, players, rounds } = get();
    if (!sessionId) return;

    // Calcular puntajes finales y fallos
    const updatedPlayers = players.map((p) => {
      const pRounds = rounds.filter((r) => r.playerId === p.id);
      const score = pRounds.reduce((sum, r) => sum + r.points, 0);
      const wrongs = pRounds.filter((r) => !r.isCorrect).length;
      return { ...p, finalScore: score, wrongs };
    });

    // B10: Desempate por menos fallos
    const maxScore = Math.max(...updatedPlayers.map((p) => p.finalScore));
    let winners = updatedPlayers.filter((p) => p.finalScore === maxScore);
    if (winners.length > 1) {
      const minWrongs = Math.min(...winners.map((p) => p.wrongs!));
      winners = winners.filter((p) => p.wrongs === minWrongs);
    }
    const winnerId = winners.length === 1 ? winners[0].id! : null;

    // Transacción atómica
    await db.transaction(
      "rw",
      db.localPlayers,
      db.localRounds,
      db.localSessions,
      async () => {
        // Actualizar puntajes de jugadores
        for (const p of updatedPlayers) {
          const { wrongs, ...playerToSave } = p; // Quitamos 'wrongs' antes de guardar
          await db.localPlayers.put(playerToSave);
        }

        // Guardar todas las rondas
        await db.localRounds.bulkAdd(rounds);

        // Marcar sesión como finalizada
        const currentSession = await db.localSessions.get(sessionId);
        if (currentSession) {
          await db.localSessions.put({
            ...currentSession,
            status: "finalizada",
            finishedAt: Date.now(),
          });
        }
      },
    );

    eventBus.emit("partida_finalizada", { sessionId, winnerId });
    set({ sessionId: null, players: [], rounds: [], questions: [] });
  },
}));
