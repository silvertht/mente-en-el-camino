import type { Badge } from "../types";

export const BADGES: Badge[] = [
  // ---------- Primeros pasos ----------
  {
    id: "primer-paso",
    name: "Primer Paso",
    description: "Completaste tu primera pregunta.",
    emoji: "👣",
    condition: "Responder 1 pregunta",
  },
  {
    id: "primera-victoria",
    name: "Primera Victoria",
    description: "Acertaste tu primera pregunta.",
    emoji: "✅",
    condition: "Responder correctamente 1 pregunta",
  },
  {
    id: "primer-desafio",
    name: "Primer Desafío",
    description: "Completaste tu primer desafío diario.",
    emoji: "🌅",
    condition: "Completar un desafío diario",
  },

  // ---------- Rachas ----------
  {
    id: "racha-3",
    name: "Constante",
    description: "Jugaste 3 días seguidos.",
    emoji: "🔥",
    condition: "Racha de 3 días",
  },
  {
    id: "racha-7",
    name: "Fiel",
    description: "Jugaste 7 días seguidos.",
    emoji: "⚡",
    condition: "Racha de 7 días",
  },
  {
    id: "racha-30",
    name: "Perseverante",
    description: "Jugaste 30 días seguidos.",
    emoji: "🏔️",
    condition: "Racha de 30 días",
  },

  // ---------- Precisión ----------
  {
    id: "perfecto-10",
    name: "Perfecto",
    description: "Completaste un desafío diario sin fallar.",
    emoji: "💎",
    condition: "10/10 en un desafío diario",
  },
  {
    id: "sin-pistas",
    name: "Deductor",
    description: "Acertaste una pregunta de pistas sin usar ninguna.",
    emoji: "🧠",
    condition: "Acertar una pregunta hint-deduction sin pistas",
  },
  {
    id: "velocista",
    name: "Velocista",
    description: "Respondiste correctamente en menos de 5 segundos.",
    emoji: "💨",
    condition: "Respuesta correcta en <5s",
  },

  // ---------- Categorías ----------
  {
    id: "evangelista",
    name: "Evangelista",
    description: "Completaste la categoría de Evangelios.",
    emoji: "✝️",
    condition: "Completar categoría evangelios",
  },
  {
    id: "conoce-personajes",
    name: "Conoce Personajes",
    description: "Completaste la categoría de Personajes Bíblicos.",
    emoji: "👤",
    condition: "Completar categoría personajes",
  },
  {
    id: "memoriza-versiculos",
    name: "Memoriza",
    description: "Completaste la categoría de Versículos.",
    emoji: "📖",
    condition: "Completar categoría versiculos",
  },
  {
    id: "cuentacuentos",
    name: "Cuentacuentos",
    description: "Completaste la categoría de Parábolas.",
    emoji: "🌾",
    condition: "Completar categoría parabolas",
  },
  {
    id: "vida-en-valores",
    name: "Vida en Valores",
    description: "Completaste la categoría de Valores y Vida.",
    emoji: "💛",
    condition: "Completar categoría valores",
  },

  // ---------- Niveles ----------
  {
    id: "nivel-5",
    name: "Creciendo",
    description: "Alcanzaste el nivel 5.",
    emoji: "🌱",
    condition: "Llegar a nivel 5",
  },
  {
    id: "nivel-10",
    name: "Maduro",
    description: "Alcanzaste el nivel 10.",
    emoji: "🌳",
    condition: "Llegar a nivel 10",
  },
  {
    id: "nivel-20",
    name: "Sabio",
    description: "Alcanzaste el nivel 20.",
    emoji: "🦉",
    condition: "Llegar a nivel 20",
  },

  // ---------- Comunidad (Fase 2) ----------
  {
    id: "anfitrion",
    name: "Anfitrión",
    description: "Creaste una sala multijugador.",
    emoji: "🏠",
    condition: "Crear una sala",
  },
  {
    id: "campeon-sala",
    name: "Campeón de Sala",
    description: "Ganaste una partida multijugador.",
    emoji: "🏆",
    condition: "Quedar 1° en una sala",
  },
];

// Helpers
export function getBadge(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export function getBadgesByIds(ids: string[]): Badge[] {
  return ids
    .map((id) => getBadge(id))
    .filter((b): b is Badge => b !== undefined);
}
