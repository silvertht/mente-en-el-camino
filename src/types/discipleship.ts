import type { CategoryId } from "./index";

// ============================================================
// CONTENIDO EDITORIAL (content layer, lazy-loaded)
// ============================================================
export type NivelNumber = 1 | 2 | 3;
export type LeccionNumber = 1 | 2 | 3;

export interface FeedbackCorrecto {
  afirmacion: string; // D2: prefijo "Así es." obligatorio
  dato: string;
  referenciaRVR1960: string; // P10 — obligatorio
  reflexion: string;
}

export interface PreguntaReflexion {
  id: string; // `${sendaId}:${n}:${l}:${q}`
  enunciado: string;
  opciones: string[];
  correctIndex: number;
  feedbackCorrecto: FeedbackCorrecto;
  pistaReintento: string; // ≤12 palabras + referencia RVR1960
  referenciaRVR1960: string; // P10 — obligatorio
}

export interface LeccionDiscipulado {
  id: string; // `${sendaId}:${n}:${l}`
  sendaId: CategoryId; // P3: reutiliza taxonomía de trivia
  nivelNumber: NivelNumber;
  leccionNumber: LeccionNumber;
  titulo: string;
  introduccion: string;
  preguntas: PreguntaReflexion[];
}

export interface NivelDiscipulado {
  sendaId: CategoryId;
  nivelNumber: NivelNumber;
  titulo: string;
  lecciones: LeccionDiscipulado[]; // siempre 3
}

export interface SendaDiscipulado {
  sendaId: CategoryId;
  titulo: string;
  descripcion: string;
  niveles: NivelDiscipulado[]; // siempre 3 (MVP)
  esPiloto: boolean;
}

// ============================================================
// PROGRESO PERSISTIDO (Dexie v3)
// ============================================================
export type EstadoLeccion = "sin_empezar" | "en_curso" | "recorrida" | "repaso";
// "bloqueada" es DERIVADA (selector), no se persiste.

export interface ProgresoLeccion {
  id: string; // PK `${sendaId}:${n}:${l}`
  sendaId: CategoryId;
  nivelNumber: NivelNumber;
  leccionNumber: LeccionNumber;
  estado: EstadoLeccion;
  tarjetaIdx: number;
  preguntaIdx: number;
  primeraRecorridaAt?: number;
  ultimoRepasoAt?: number;
  vecesRepasada: number;
  ultimaActividadAt: number;
}

export interface RachaDiscipulado {
  id: "global";
  current: number;
  best: number;
  lastDay: string | null; // "YYYY-MM-DD"
}

// ============================================================
// MULTIJUGADOR LOCAL (P7: modelo separado)
// ============================================================
export type EstadoPartidaLocal = "activa" | "finalizada";

export interface LocalSession {
  id?: number;
  status: EstadoPartidaLocal;
  startedAt: number;
  finishedAt: number | null;
  roundsPerPlayer: number;
}

export interface LocalPlayer {
  id?: number;
  sessionId: number;
  displayName: string;
  order: number;
  finalScore: number;
}

export interface LocalRound {
  id?: number;
  sessionId: number;
  roundNumber: number;
  playerId: number;
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
  points: number;
}
