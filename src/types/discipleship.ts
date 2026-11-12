import type { CategoryId } from "./index";

// ============================================================
// CONTRATO VISUAL (Fase 5 · H-VIS-06)
// ============================================================
export type EstadoLeccion =
  | "sin_empezar"
  | "en_curso"
  | "recorrida"
  | "bloqueado"
  | "repaso";
export type EstadoNivel =
  | "sin_empezar"
  | "en_curso"
  | "recorrido"
  | "bloqueado"
  | "repaso";
export type EstadoSenda =
  | "sin_empezar"
  | "en_curso"
  | "recorrida"
  | "bloqueado"
  | "repaso";

export interface PosicionReanudar {
  tarjetaIdx: number;
  preguntaIdx: number;
}

export interface ResultadoCheck {
  correcto: boolean;
  feedback: string;
  pista?: string;
  referencia: string;
}

// ============================================================
// CONTENIDO EDITORIAL (Content layer)
// ============================================================
export type NivelNumber = 1 | 2 | 3;
export type LeccionNumber = 1 | 2 | 3;

export interface FeedbackCorrecto {
  afirmacion: string;
  dato: string;
  referenciaRVR1960: string;
  reflexion: string;
}

export interface PreguntaReflexion {
  id: string;
  enunciado: string;
  opciones: string[];
  correctIndex: number;
  feedbackCorrecto: FeedbackCorrecto;
  pistaReintento: string;
  referenciaRVR1960: string;
}

export interface LeccionDiscipulado {
  id: string;
  sendaId: CategoryId;
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
  lecciones: LeccionDiscipulado[];
}

export interface SendaDiscipulado {
  sendaId: CategoryId;
  titulo: string;
  descripcion: string;
  niveles: NivelDiscipulado[];
  esPiloto: boolean;
}

// ============================================================
// PROGRESO PERSISTIDO (Dexie v3)
// ============================================================
export interface ProgresoLeccion {
  id: string;
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
  lastDay: string | null;
}

// ============================================================
// MULTIJUGADOR LOCAL (Modelo separado P7)
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
