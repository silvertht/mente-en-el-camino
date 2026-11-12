import { create } from "zustand";
import { db } from "../db/database";
import { eventBus } from "./eventBus";
import {
  getLeccion,
  loadDiscipleshipContent,
  isDiscipleshipContentLoaded,
} from "../data/discipleship";
import type { CategoryId } from "../types";
import type {
  ProgresoLeccion,
  RachaDiscipulado,
  EstadoLeccion,
  PosicionReanudar,
  ResultadoCheck,
} from "../types/discipleship";

const todayKey = () => new Date().toISOString().split("T")[0];

interface DiscipleshipStore {
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

  loadDiscipleshipContent: () => Promise<void>;
  initProgreso: () => Promise<void>;
  iniciarLeccion: (
    sendaId: CategoryId,
    n: 1 | 2 | 3,
    l: 1 | 2 | 3,
  ) => Promise<void>;
  guardarPosicion: (tarjetaIdx: number, preguntaIdx: number) => Promise<void>;
  responderCheck: (preguntaIdx: number, selected: number) => ResultadoCheck;
  reintentarCheck: (leccionId: string, preguntaIdx: number) => void;
  finalizarLeccion: () => Promise<void>;
  abrirRepaso: (leccionId: string) => Promise<void>;
  reabrirLeccion: (sendaId: string, n: number, l: number) => Promise<void>;
  abandonarLeccion: () => Promise<void>;
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
    set((state) => ({
      progresoLecciones: { ...state.progresoLecciones, [id]: updated },
      leccionActiva: { ...leccionActiva, tarjetaIdx, preguntaIdx },
    }));
    await db.progresoLeccion.put(updated);
    eventBus.emit("posicion_guardada", {
      leccionId: id,
      tarjetaIdx,
      preguntaIdx,
    });
  },

  responderCheck: (preguntaIdx, selected) => {
    const { leccionActiva } = get();
    if (!leccionActiva)
      return { correcto: false, feedback: "", referencia: "" };

    const leccion = getLeccion(
      leccionActiva.sendaId,
      leccionActiva.nivelNumber,
      leccionActiva.leccionNumber,
    );
    if (!leccion) return { correcto: false, feedback: "", referencia: "" };

    const p = leccion.preguntas[preguntaIdx];
    const correcto = p.correctIndex === selected;

    eventBus.emit("check_respondido", {
      leccionId: leccion.id,
      preguntaIdx,
      correcto,
    });

    return {
      correcto,
      feedback: correcto
        ? p.feedbackCorrecto.afirmacion
        : "Inténtalo de nuevo.",
      pista: p.pistaReintento,
      referencia: p.referenciaRVR1960,
    };
  },

  reintentarCheck: (leccionId, preguntaIdx) => {
    eventBus.emit("check_reintentado", { leccionId, preguntaIdx });
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

    await db.transaction(
      "rw",
      db.progresoLeccion,
      db.rachaDiscipulado,
      async () => {
        const updatedProgreso: ProgresoLeccion = {
          ...existing,
          estado: "recorrida",
          primeraRecorridaAt: existing.primeraRecorridaAt ?? now,
          ultimoRepasoAt: isRepaso ? now : existing.ultimoRepasoAt,
          vecesRepasada: isRepaso
            ? existing.vecesRepasada + 1
            : existing.vecesRepasada,
          ultimaActividadAt: now,
        };
        await db.progresoLeccion.put(updatedProgreso);

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
      },
    );

    const updatedRacha = await db.rachaDiscipulado.get("global");
    set((state) => ({
      progresoLecciones: {
        ...state.progresoLecciones,
        [id]: { ...existing, estado: "recorrida" },
      },
      racha: updatedRacha ?? state.racha,
      leccionActiva: null,
    }));
    eventBus.emit("leccion_recorrida", { leccionId: id, enRepaso: isRepaso });
  },

  abrirRepaso: async (leccionId: string) => {
    const [sendaId, n, l] = leccionId.split(":");
    await get().iniciarLeccion(
      sendaId as CategoryId,
      Number(n) as 1 | 2 | 3,
      Number(l) as 1 | 2 | 3,
    );
  },

  reabrirLeccion: async (sendaId: string, n: number, l: number) => {
    await get().iniciarLeccion(
      sendaId as CategoryId,
      n as 1 | 2 | 3,
      l as 1 | 2 | 3,
    );
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
}));

// ==========================================
// SELECTORES (Derivados)
// ==========================================
export const selectEstadoLeccion = (
  state: DiscipleshipStore,
  id: string,
): EstadoLeccion => {
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
        prevNivel.find((p) => p.leccionNumber === l)?.estado === "recorrida",
    );
    if (allRecorridas) return "sin_empezar";
  }
  return "bloqueado";
};

export const selectProximoPaso = (state: DiscipleshipStore) => {
  const sendaId: CategoryId = "evangelios";
  for (let n = 1; n <= 3; n++) {
    for (let l = 1; l <= 3; l++) {
      const id = `${sendaId}:${n}:${l}`;
      const estado = selectEstadoLeccion(state, id);
      if (estado !== "recorrida") {
        return { sendaId, nivelNumber: n, leccionNumber: l, estado };
      }
    }
  }
  return null;
};

export const selectPosicionAReanudar = (
  state: DiscipleshipStore,
  id: string,
): PosicionReanudar | null => {
  const p = state.progresoLecciones[id];
  if (!p) return null;
  return { tarjetaIdx: p.tarjetaIdx, preguntaIdx: p.preguntaIdx };
};

export const selectEstadoNivel = (
  _state: DiscipleshipStore,
  _id: string,
): EstadoLeccion => "sin_empezar";
export const selectEstadoSenda = (
  _state: DiscipleshipStore,
  _id: string,
): EstadoLeccion => "sin_empezar";
export const selectProgresoSenda = (
  _state: DiscipleshipStore,
  _id: string,
) => ({ recorridas: 0, total: 3 });
export const selectProgresoNivel = (
  _state: DiscipleshipStore,
  _id: string,
) => ({ recorridas: 0, total: 3 });
