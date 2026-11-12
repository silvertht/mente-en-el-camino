// TEMPORAL: mientras Funcional entrega types/multiplayer.ts.
// Cuando exista, reemplazar este bloque por:
//   import type { ColorToken } from "../types/multiplayer";
//   export type { ColorToken };
export type ColorToken = "alba" | "reino" | "vida" | "fuego";

export type ColorJugadorStyle = {
  num: number;
  bg: string;
  ring: string;
  text: string;
};

export const COLOR_JUGADOR: Record<ColorToken, ColorJugadorStyle> = {
  alba: {
    num: 1,
    bg: "bg-alba-400",
    ring: "ring-alba-400",
    text: "text-noche-950",
  },
  reino: {
    num: 2,
    bg: "bg-reino-400",
    ring: "ring-reino-400",
    text: "text-noche-950",
  },
  vida: {
    num: 3,
    bg: "bg-vida-400",
    ring: "ring-vida-400",
    text: "text-noche-950",
  },
  fuego: {
    num: 4,
    bg: "bg-fuego-400",
    ring: "ring-fuego-400",
    text: "text-noche-950",
  },
};

// Getter seguro. No depende del tipo ColorToken en el punto de uso.
// Acepta unknown y devuelve siempre un estilo válido (fallback alba).
export function colorJugadorSeguro(token: unknown): ColorJugadorStyle {
  const t = token as ColorToken;
  const index = COLOR_JUGADOR as Record<string, ColorJugadorStyle | undefined>;
  return index[t] ?? COLOR_JUGADOR.alba;
}
