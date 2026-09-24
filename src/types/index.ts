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
  timeLimit?: number;
  explanation: string;
  verse?: string;
  verseText?: string;
  application?: string;
  reflection?: string;
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

/**
 * Ordenar palabras de un versículo.
 * `words` = palabras en orden de presentación (desordenadas).
 * `correctOrder` = índices en `words` que forman el orden correcto.
 */
export interface VerseScrambleQuestion extends BaseQuestion {
  type: "verse-scramble";
  words: string[];
  correctOrder: number[];
}

export interface WhoSaidItQuestion extends BaseQuestion {
  type: "who-said-it";
  quote: string;
  options: string[];
  correctIndex: number;
}

/**
 * Ordenar eventos cronológicamente.
 * `events` = eventos en orden de presentación (desordenados).
 * `correctOrder` = índices en `events` que forman el orden cronológico.
 */
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
  hints: string[];
  answer: string;
  acceptedAnswers: string[];
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
  graceShieldAvailable: boolean;
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
  date: string;
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
  verse?: { ref: string; text: string };
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
