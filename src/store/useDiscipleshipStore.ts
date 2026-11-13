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
  EstadoNivel,
  EstadoSenda,
  PosicionReanudar,
  ResultadoCheck,
  ContextoLeccion,
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
  responderCheck: (
    preguntaIdx: number,
    selected: number,
    contexto?: ContextoLeccion,
  ) => ResultadoCheck;
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
    const allProgress = await db.progreso_leccion.toArray(); // ✅ snake_case
    const map: Record<string, ProgresoLeccion> = {};
    allProgress.forEach((p) => {
      map[p.id] = p;
    });
    let racha = await db.racha_discipulado.get("global"); // ✅ snake_case
    if (!racha) {
      racha = { id: "global", current: 0, best: 0, lastDay: null };
      await db.racha_discipulado.put(racha); // ✅ snake_case
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

    await db.progreso_leccion.put(record); // ✅ snake_case
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
    await db.progreso_leccion.put(updated); // ✅ snake_case
    eventBus.emit("posicion_guardada", {
      leccionId: id,
      tarjetaIdx,
      preguntaIdx,
    });
  },

  responderCheck: (preguntaIdx, selected, contexto) => {
    const leccionActiva = get().leccionActiva;

    const sendaId = contexto?.sendaId ?? leccionActiva?.sendaId;
    const nivelNumber = contexto?.nivelNumber ?? leccionActiva?.nivelNumber;
    const leccionNumber =
      contexto?.leccionNumber ?? leccionActiva?.leccionNumber;

    if (!sendaId || !nivelNumber || !leccionNumber) {
      if (import.meta.env.DEV) {
        console.warn(
          "[responderCheck] Sin contexto de lección: ni `contexto` ni `leccionActiva`.",
        );
      }
      return { correcto: false, feedback: "", referencia: "" };
    }

    const leccion = getLeccion(sendaId, nivelNumber, leccionNumber);
    if (!leccion) {
      if (import.meta.env.DEV) {
        console.warn("[responderCheck] getLeccion devolvió undefined.", {
          sendaId,
          nivelNumber,
          leccionNumber,
        });
      }
      return { correcto: false, feedback: "", referencia: "" };
    }

    const p = leccion.preguntas[preguntaIdx];
    if (!p) {
      if (import.meta.env.DEV) {
        console.warn("[responderCheck] Pregunta no encontrada.", {
          preguntaIdx,
        });
      }
      return { correcto: false, feedback: "", referencia: "" };
    }

    const correcto = p.correctIndex === Number(selected);

    if (import.meta.env.DEV) {
      console.log("[responderCheck] Debug", {
        preguntaId: p.id,
        preguntaIdx,
        selected,
        correctIndex: p.correctIndex,
        correcto,
      });
    }

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
      reflexion: correcto ? p.feedbackCorrecto.reflexion : undefined,
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
      db.progreso_leccion,
      db.racha_discipulado,
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
        await db.progreso_leccion.put(updatedProgreso); // ✅ snake_case

        let newRacha = { ...racha! };
        if (newRacha.lastDay !== today) {
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
          newRacha.current =
            newRacha.lastDay === yesterday ? newRacha.current + 1 : 1;
          newRacha.best = Math.max(newRacha.best, newRacha.current);
          newRacha.lastDay = today;
          await db.racha_discipulado.put(newRacha); // ✅ snake_case
        }
      },
    );

    const updatedRacha = await db.racha_discipulado.get("global"); // ✅ snake_case
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
// SELECTORES DERIVADOS
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

export const selectProgresoNivel = (
  state: DiscipleshipStore,
  nivelId: string,
): { recorridas: number; total: number } => {
  const [sendaId, nStr] = nivelId.split(":");
  const n = Number(nStr);
  let recorridas = 0;
  for (let l = 1; l <= 3; l++) {
    const p = state.progresoLecciones[`${sendaId}:${n}:${l}`];
    if (p?.estado === "recorrida") recorridas++;
  }
  return { recorridas, total: 3 };
};

export const selectProgresoSenda = (
  state: DiscipleshipStore,
  sendaId: string,
): { recorridas: number; total: number } => {
  let recorridas = 0;
  for (let n = 1; n <= 3; n++) {
    const p = selectProgresoNivel(state, `${sendaId}:${n}`);
    recorridas += p.recorridas;
  }
  return { recorridas, total: 9 };
};

export const selectEstadoNivel = (
  state: DiscipleshipStore,
  nivelId: string,
): EstadoNivel => {
  const [sendaId, nStr] = nivelId.split(":");
  const n = Number(nStr);
  const estados = [1, 2, 3].map((l) =>
    selectEstadoLeccion(state, `${sendaId}:${n}:${l}`),
  );

  if (estados.every((e) => e === "bloqueado")) return "bloqueado";
  if (estados.every((e) => e === "sin_empezar" || e === "bloqueado"))
    return "sin_empezar";
  if (estados.every((e) => e === "recorrida" || e === "repaso"))
    return "recorrido";
  if (estados.some((e) => e === "repaso")) return "repaso";
  return "en_curso";
};

export const selectEstadoSenda = (
  state: DiscipleshipStore,
  sendaId: string,
): EstadoSenda => {
  const niveles = [1, 2, 3].map((n) =>
    selectEstadoNivel(state, `${sendaId}:${n}`),
  );

  if (niveles.every((e) => e === "bloqueado")) return "bloqueado";
  if (niveles.every((e) => e === "sin_empezar" || e === "bloqueado"))
    return "sin_empezar";
  if (niveles.every((e) => e === "recorrido")) return "recorrida";
  if (niveles.some((e) => e === "repaso")) return "repaso";
  return "en_curso";
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
