import { create } from "zustand";
import { db } from "../db/database";
import { eventBus } from "./eventBus";
import type { CategoryId } from "../types";
import type {
  ProgresoLeccion,
  RachaDiscipulado,
  EstadoLeccion,
} from "../types/discipleship";
import {
  getLeccion,
  loadDiscipleshipContent,
  isDiscipleshipContentLoaded,
} from "../data/discipleship";

// Helper para fecha YYYY-MM-DD
const todayKey = () => new Date().toISOString().split("T")[0];

interface DiscipleshipStore {
  // Estado
  contenidoCargado: boolean;
  isLoadingDiscipleship: boolean;
  progresoLecciones: Record<string, ProgresoLeccion>;
  racha: RachaDiscipulado | null;
  leccionActiva: {
    sendaId: CategoryId;
    nivelNumber: 1 | 2 | 3;
    leccionNumber: 1 | 2 | 3;
    tarjetaIdx: number;
    preguntaIdx: number;
    enRepaso: boolean;
  } | null;

  // Acciones
  loadDiscipleshipContent: () => Promise<void>;
  initProgreso: () => Promise<void>;
  iniciarLeccion: (
    sendaId: CategoryId,
    n: 1 | 2 | 3,
    l: 1 | 2 | 3,
  ) => Promise<void>;
  guardarPosicion: (tarjetaIdx: number, preguntaIdx: number) => Promise<void>;
  responderCheck: (
    preguntaIdx: number,
    selected: number,
  ) => { correct: boolean; feedback?: any };
  reintentarCheck: (preguntaIdx: number) => void;
  finalizarLeccion: () => Promise<void>;
  abandonarLeccion: () => Promise<void>;
  reabrirLeccion: (
    sendaId: CategoryId,
    n: 1 | 2 | 3,
    l: 1 | 2 | 3,
  ) => Promise<void>;
}

export const useDiscipleshipStore = create<DiscipleshipStore>((set, get) => ({
  contenidoCargado: false,
  isLoadingDiscipleship: false,
  progresoLecciones: {},
  racha: null,
  leccionActiva: null,

  loadDiscipleshipContent: async () => {
    if (isDiscipleshipContentLoaded()) {
      set({ contenidoCargado: true });
      return;
    }
    set({ isLoadingDiscipleship: true });
    await loadDiscipleshipContent();
    set({ contenidoCargado: true, isLoadingDiscipleship: false });
  },

  initProgreso: async () => {
    const allProgress = await db.progresoLeccion.toArray();
    const map: Record<string, ProgresoLeccion> = {};
    allProgress.forEach((p) => {
      map[p.id] = p;
    });

    let racha = await db.rachaDiscipulado.get("global");
    if (!racha) {
      racha = { id: "global", current: 0, best: 0, lastDay: null };
      await db.rachaDiscipulado.put(racha);
    }

    set({ progresoLecciones: map, racha });
  },

  iniciarLeccion: async (sendaId, n, l) => {
    const id = `${sendaId}:${n}:${l}`;
    const existing = get().progresoLecciones[id];

    let nuevoEstado: EstadoLeccion = "en_curso";
    let tarjetaIdx = 0;
    let preguntaIdx = 0;
    let enRepaso = false;

    if (existing) {
      nuevoEstado =
        existing.estado === "recorrida" ? "repaso" : existing.estado;
      tarjetaIdx = existing.tarjetaIdx;
      preguntaIdx = existing.preguntaIdx;
      enRepaso =
        existing.estado === "recorrida" || existing.estado === "repaso";
    }

    const record: ProgresoLeccion = {
      id,
      sendaId,
      nivelNumber: n,
      leccionNumber: l,
      estado: nuevoEstado,
      tarjetaIdx,
      preguntaIdx,
      primeraRecorridaAt: existing?.primeraRecorridaAt,
      ultimoRepasoAt: existing?.ultimoRepasoAt,
      vecesRepasada: existing?.vecesRepasada ?? 0,
      ultimaActividadAt: Date.now(),
    };

    await db.progresoLeccion.put(record);
    set((state) => ({
      progresoLecciones: { ...state.progresoLecciones, [id]: record },
      leccionActiva: {
        sendaId,
        nivelNumber: n,
        leccionNumber: l,
        tarjetaIdx,
        preguntaIdx,
        enRepaso,
      },
    }));

    eventBus.emit("leccion_iniciada", { leccionId: id, enRepaso });
  },

  guardarPosicion: async (tarjetaIdx, preguntaIdx) => {
    const { leccionActiva, progresoLecciones } = get();
    if (!leccionActiva) return;
    const id = `${leccionActiva.sendaId}:${leccionActiva.nivelNumber}:${leccionActiva.leccionNumber}`;
    const existing = progresoLecciones[id];
    if (!existing) return;

    const updated = {
      ...existing,
      tarjetaIdx,
      preguntaIdx,
      ultimaActividadAt: Date.now(),
    };

    // Actualizamos el estado local inmediatamente para UI fluida
    set((state) => ({
      progresoLecciones: { ...state.progresoLecciones, [id]: updated },
      leccionActiva: { ...leccionActiva, tarjetaIdx, preguntaIdx },
    }));

    // Persistencia
    await db.progresoLeccion.put(updated);
    eventBus.emit("posicion_guardada", {
      leccionId: id,
      tarjetaIdx,
      preguntaIdx,
    });
  },

  responderCheck: (preguntaIdx, selected) => {
    // EFÍMERO: No toca Dexie. Patrón anti-exploit.
    const { leccionActiva } = get();
    if (!leccionActiva) return { correct: false };

    const leccion = getLeccion(
      leccionActiva.sendaId,
      leccionActiva.nivelNumber,
      leccionActiva.leccionNumber,
    );
    if (!leccion) return { correct: false };

    const p = leccion.preguntas[preguntaIdx];
    const correct = p.correctIndex === selected;

    eventBus.emit("check_respondido", {
      leccionId: leccion.id,
      preguntaIdx,
      correct,
    });

    return { correct, feedback: correct ? p.feedbackCorrecto : null };
  },

  reintentarCheck: (preguntaIdx) => {
    const { leccionActiva } = get();
    if (!leccionActiva) return;
    const id = `${leccionActiva.sendaId}:${leccionActiva.nivelNumber}:${leccionActiva.leccionNumber}`;
    eventBus.emit("check_reintentado", { leccionId: id, preguntaIdx });
  },

  finalizarLeccion: async () => {
    const { leccionActiva, progresoLecciones, racha } = get();
    if (!leccionActiva) return;

    const id = `${leccionActiva.sendaId}:${leccionActiva.nivelNumber}:${leccionActiva.leccionNumber}`;
    const existing = progresoLecciones[id];
    if (!existing) return;

    const isRepaso = leccionActiva.enRepaso;
    const now = Date.now();
    const today = todayKey();

    // Transacción atómica
    await db.transaction(
      "rw",
      db.progresoLeccion,
      db.rachaDiscipulado,
      async () => {
        // 1. Actualizar Lección
        const updatedProgreso: ProgresoLeccion = {
          ...existing,
          estado: "recorrida",
          primeraRecorridaAt: existing.primeraRecorridaAt ?? now, // Anti-farming
          ultimoRepasoAt: isRepaso ? now : existing.ultimoRepasoAt,
          vecesRepasada: isRepaso
            ? existing.vecesRepasada + 1
            : existing.vecesRepasada,
          ultimaActividadAt: now,
        };
        await db.progresoLeccion.put(updatedProgreso);

        // 2. Actualizar Racha (B5 separada)
        let newRacha = { ...racha! };
        if (newRacha.lastDay !== today) {
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
          newRacha.current =
            newRacha.lastDay === yesterday ? newRacha.current + 1 : 1;
          newRacha.best = Math.max(newRacha.best, newRacha.current);
          newRacha.lastDay = today;
          await db.rachaDiscipulado.put(newRacha);
        }

        // 3. Emitir eventos (post-commit exitoso)
        eventBus.emit("leccion_recorrida", {
          leccionId: id,
          enRepaso: isRepaso,
        });

        // Lógica de desbloqueo
        if (!isRepaso) {
          const nivelPrefix = `${leccionActiva.sendaId}:${leccionActiva.nivelNumber}:`;
          const nivelProgreso = Object.values(progresoLecciones).filter((p) =>
            p.id.startsWith(nivelPrefix),
          );
          const todasRecorridas = [1, 2, 3].every(
            (l) =>
              l === leccionActiva.leccionNumber ||
              nivelProgreso.find((p) => p.leccionNumber === l)?.estado ===
                "recorrida",
          );
          if (todasRecorridas) {
            eventBus.emit("nivel_recorrido", {
              sendaId: leccionActiva.sendaId,
              nivelNumber: leccionActiva.nivelNumber,
            });
            if (leccionActiva.nivelNumber === 3) {
              eventBus.emit("senda_recorrida", {
                sendaId: leccionActiva.sendaId,
              });
            } else {
              eventBus.emit("nivel_desbloqueado", {
                sendaId: leccionActiva.sendaId,
                nivelNumber: leccionActiva.nivelNumber + 1,
              });
            }
          }
        }
      },
    );

    // Actualizar estado local (CORREGIDO: await fuera de set)
    const updatedRacha = await db.rachaDiscipulado.get("global");

    set((state) => ({
      progresoLecciones: {
        ...state.progresoLecciones,
        [id]: {
          ...existing,
          estado: "recorrida",
          primeraRecorridaAt: existing.primeraRecorridaAt ?? now,
        },
      },
      racha: updatedRacha ?? state.racha,
      leccionActiva: null,
    }));
  },

  abandonarLeccion: async () => {
    const { leccionActiva } = get();
    if (!leccionActiva) return;
    const id = `${leccionActiva.sendaId}:${leccionActiva.nivelNumber}:${leccionActiva.leccionNumber}`;
    eventBus.emit("posicion_guardada", {
      leccionId: id,
      tarjetaIdx: leccionActiva.tarjetaIdx,
      preguntaIdx: leccionActiva.preguntaIdx,
    });
    set({ leccionActiva: null });
  },

  reabrirLeccion: async (sendaId, n, l) => {
    await get().iniciarLeccion(sendaId, n, l);
  },
}));

// ==========================================
// SELECTORES (Derivados)
// ==========================================

export const selectEstadoLeccion = (
  state: DiscipleshipStore,
  id: string,
): EstadoLeccion | "bloqueada" => {
  const p = state.progresoLecciones[id];
  if (p) return p.estado;

  const [sendaId, nStr, lStr] = id.split(":");
  const n = Number(nStr);
  const l = Number(lStr);

  if (n === 1 && l === 1) return "sin_empezar";

  if (l > 1) {
    const prevId = `${sendaId}:${n}:${l - 1}`;
    const prev = state.progresoLecciones[prevId];
    if (prev?.estado === "recorrida" || prev?.estado === "repaso")
      return "sin_empezar";
  } else if (n > 1) {
    const prevNivelPrefix = `${sendaId}:${n - 1}:`;
    const prevNivel = Object.values(state.progresoLecciones).filter((p) =>
      p.id.startsWith(prevNivelPrefix),
    );
    const allRecorridas = [1, 2, 3].every(
      (l) =>
        prevNivel.find((p) => p.leccionNumber === l)?.estado === "recorrida" ||
        prevNivel.find((p) => p.leccionNumber === l)?.estado === "repaso",
    );
    if (allRecorridas) return "sin_empezar";
  }
  return "bloqueada";
};

export const selectProximoPaso = (state: DiscipleshipStore) => {
  const sendaId: CategoryId = "evangelios";
  for (let n = 1; n <= 3; n++) {
    for (let l = 1; l <= 3; l++) {
      const id = `${sendaId}:${n}:${l}`;
      const estado = selectEstadoLeccion(state, id);
      if (estado !== "recorrida") {
        return {
          sendaId,
          nivelNumber: n as 1 | 2 | 3,
          leccionNumber: l as 1 | 2 | 3,
          estado,
        };
      }
    }
  }
  return null;
};

export const selectPosicionAReanudar = (
  state: DiscipleshipStore,
  id: string,
) => {
  const p = state.progresoLecciones[id];
  if (!p) return null;
  return {
    tarjetaIdx: p.tarjetaIdx,
    preguntaIdx: p.preguntaIdx,
    enRepaso: p.estado === "repaso",
  };
};
