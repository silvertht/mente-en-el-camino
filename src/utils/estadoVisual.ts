import type {
  EstadoLeccion,
  EstadoNivel,
  EstadoSenda,
} from "../types/discipleship";

export type Forma =
  | "circulo"
  | "circulo-doble"
  | "hexagono"
  | "punteado"
  | "rombo"
  | "escudo";
export type EstadoNodo = EstadoLeccion | EstadoNivel | EstadoSenda;

type Visual = { forma: Forma; icono: string; etiqueta: string };

export const ESTADO_VISUAL: Record<string, Visual> = {
  sin_empezar: { forma: "circulo", icono: "○", etiqueta: "Lista para empezar" },
  en_curso: { forma: "circulo-doble", icono: "→", etiqueta: "Sigues aquí" },
  recorrida: { forma: "circulo", icono: "✓", etiqueta: "Recorrida" },
  recorrido: { forma: "circulo", icono: "✓", etiqueta: "Recorrido" },
  bloqueado: { forma: "hexagono", icono: "🔒", etiqueta: "Aún no" },
  repaso: { forma: "punteado", icono: "↻", etiqueta: "Repaso" },
};

export const HITO_NIVEL: Visual = {
  forma: "rombo",
  icono: "⚑",
  etiqueta: "Nivel",
};
export const HITO_SENDA: Visual = {
  forma: "escudo",
  icono: "♛",
  etiqueta: "Senda",
};

export const getVisual = (estado: EstadoNodo): Visual =>
  ESTADO_VISUAL[estado] ?? ESTADO_VISUAL.sin_empezar;

// Formas base (sin color): distinguibles sin paleta
export const formaClases: Record<Forma, string> = {
  circulo: "rounded-full",
  "circulo-doble": "rounded-full ring-2 ring-offset-2 ring-offset-noche-950",
  hexagono:
    "[clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)]",
  punteado: "rounded-full border-2 border-dashed",
  rombo: "[clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]",
  escudo: "[clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]",
};
