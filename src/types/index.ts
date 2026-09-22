// ============================================================
// MENTE EN EL CAMINO — Tipos principales
// ============================================================

// ---------- Categorías ----------
export type CategoryId =
  | "evangelios"
  | "personajes"
  | "versiculos"
  | "parabolas"
  | "valores"
  | "genesis"
  | "exodo"
  | "apologetica"
  | "historia-iglesia";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  emoji: string;
  color: string; // clase Tailwind, ej: 'bg-amber-500'
}

// ---------- Dificultad ----------
export type Difficulty = "facil" | "medio" | "dificil";

// ---------- Tipos de pregunta ----------
export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "verse-scramble"
  | "who-said-it"
  | "timeline"
  | "fill-blank"
  | "hint-deduction";

// ---------- Base común a todas las preguntas ----------
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  category: CategoryId;
  difficulty: Difficulty;
  points: number;
  timeLimit?: number; // segundos; si no se define, se usa el default del modo
  explanation: string; // por qué es correcta
  verse?: string; // referencia bíblica, ej: 'Juan 3:16'
  verseText?: string; // texto del versículo
  application?: string; // aplicación práctica
  reflection?: string; // pregunta para reflexionar en grupo
}

// ---------- Variantes por tipo ----------
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  statement: string;
  correct: boolean;
}

export interface VerseScrambleQuestion extends BaseQuestion {
  type: "verse-scramble";
  verseReference: string;
  correctOrder: string[];
}

export interface WhoSaidItQuestion extends BaseQuestion {
  type: "who-said-it";
  quote: string;
  options: string[];
  correctIndex: number;
}

export interface TimelineQuestion extends BaseQuestion {
  type: "timeline";
  events: string[];
  correctOrder: number[];
}

export interface FillBlankQuestion extends BaseQuestion {
  type: "fill-blank";
  verseWithBlank: string;
  options: string[];
  correctIndex: number;
}

export interface HintDeductionQuestion extends BaseQuestion {
  type: "hint-deduction";
  hints: string[]; // de más vaga a más específica
  answer: string;
  acceptedAnswers: string[]; // variantes aceptadas
}

// ---------- Unión discriminada ----------
export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | VerseScrambleQuestion
  | WhoSaidItQuestion
  | TimelineQuestion
  | FillBlankQuestion
  | HintDeductionQuestion;

// ---------- Usuario ----------
export interface UserProfile {
  id: string;
  nickname: string;
  avatar?: string;
  createdAt: number;
  xp: number;
  level: number;
  streak: number;
  lastPlayedAt: number | null;
  badges: string[];
  graceShieldAvailable: boolean; // escudo de gracia
}

// ---------- Progreso ----------
export interface AnsweredQuestion {
  questionId: string;
  correct: boolean;
  timeSpent: number;
  pointsEarned: number;
  answeredAt: number;
  hintsUsed?: number;
}

export interface DailyChallengeProgress {
  date: string; // 'YYYY-MM-DD'
  completed: boolean;
  score: number;
  questionIds: string[];
}

export interface CampaignProgress {
  categoryId: CategoryId;
  level: number;
  completed: boolean;
  bestScore: number;
}

// ---------- Insignias ----------
export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  condition: string;
}

// ---------- Sesión multijugador (Fase 2) ----------
export interface GameSession {
  id: string;
  hostId: string;
  code: string;
  questionIds: string[];
  status: "waiting" | "playing" | "finished";
  players: string[];
  createdAt: number;
}

// ---------- Modos de juego ----------
export type GameMode = "daily" | "campaign" | "study" | "multiplayer";

export interface GameState {
  mode: GameMode;
  questions: Question[];
  currentIndex: number;
  score: number;
  streak: number;
  hintsUsed: number;
  answers: AnsweredQuestion[];
  startedAt: number;
  finishedAt: number | null;
}
