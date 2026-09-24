import type { Badge } from "../types";

export const BADGES: Badge[] = [
  // ---------- Primeros pasos ----------
  {
    id: "primer-paso",
    name: "Primer Paso",
    description: "Completaste tu primera pregunta.",
    emoji: "👣",
    condition: "Responder 1 pregunta",
    verse: {
      ref: "Filipenses 1:6",
      text: "Estando persuadido de esto, que el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo.",
    },
  },
  {
    id: "primera-victoria",
    name: "Primera Victoria",
    description: "Acertaste tu primera pregunta.",
    emoji: "✅",
    condition: "Responder correctamente 1 pregunta",
    verse: {
      ref: "1 Corintios 15:57",
      text: "Mas gracias sean dadas a Dios, que nos da la victoria por medio de nuestro Señor Jesucristo.",
    },
  },
  {
    id: "primer-desafio",
    name: "Primer Desafío",
    description: "Completaste tu primer desafío diario.",
    emoji: "🌅",
    condition: "Completar un desafío diario",
    verse: {
      ref: "Lamentaciones 3:22-23",
      text: "Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.",
    },
  },

  // ---------- Rachas ----------
  {
    id: "racha-3",
    name: "Constante",
    description: "Jugaste 3 días seguidos.",
    emoji: "🔥",
    condition: "Racha de 3 días",
    verse: {
      ref: "Gálatas 6:9",
      text: "No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.",
    },
  },
  {
    id: "racha-7",
    name: "Fiel",
    description: "Jugaste 7 días seguidos.",
    emoji: "⚡",
    condition: "Racha de 7 días",
    verse: {
      ref: "Santiago 1:12",
      text: "Bienaventurado el varón que soporta la tentación; porque cuando haya resistido la prueba, recibirá la corona de vida, que Dios ha prometido a los que le aman.",
    },
  },
  {
    id: "racha-30",
    name: "Perseverante",
    description: "Jugaste 30 días seguidos.",
    emoji: "🏔️",
    condition: "Racha de 30 días",
    verse: {
      ref: "Hebreos 12:1",
      text: "Por tanto, nosotros también, teniendo en derredor nuestro tan grande nube de testigos, despojémonos de todo peso y del pecado que nos asedia, y corramos con paciencia la carrera que tenemos por delante.",
    },
  },

  // ---------- Precisión ----------
  {
    id: "perfecto-10",
    name: "Perfecto",
    description: "Completaste un desafío diario sin fallar.",
    emoji: "💎",
    condition: "10/10 en un desafío diario",
    verse: {
      ref: "Colosenses 3:23",
      text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.",
    },
  },
  {
    id: "sin-pistas",
    name: "Deductor",
    description:
      "Acertaste una pregunta de deducción usando solo la pista inicial.",
    emoji: "🧠",
    condition: "Acertar una hint-deduction sin revelar pistas pagadas",
    verse: {
      ref: "Proverbios 2:3-5",
      text: "Si clamares a la inteligencia, y a la prudencia dieres tu voz; si como a la plata la buscares, y la escudriñares como a tesoros, entonces entenderás el temor de Jehová, y hallarás el conocimiento de Dios.",
    },
  },
  {
    id: "velocista",
    name: "Velocista",
    description: "Respondiste correctamente en menos de 5 segundos.",
    emoji: "💨",
    condition: "Respuesta correcta en <5s",
    verse: {
      ref: "Salmos 119:32",
      text: "Correré por el camino de tus mandamientos, cuando hayas ensanchado mi corazón.",
    },
  },

  // ---------- Categorías ----------
  {
    id: "evangelista",
    name: "Evangelista",
    description: "Completaste la categoría de Evangelios.",
    emoji: "✝️",
    condition: "Completar categoría evangelios",
    verse: {
      ref: "Mateo 28:19-20",
      text: "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado.",
    },
  },
  {
    id: "conoce-personajes",
    name: "Conoce Personajes",
    description: "Completaste la categoría de Personajes Bíblicos.",
    emoji: "👤",
    condition: "Completar categoría personajes",
    verse: {
      ref: "Romanos 15:4",
      text: "Porque las cosas que se escribieron antes, para nuestra enseñanza se escribieron, a fin de que por la paciencia y la consolación de las Escrituras, tengamos esperanza.",
    },
  },
  {
    id: "memoriza-versiculos",
    name: "Memoriza",
    description: "Completaste la categoría de Versículos.",
    emoji: "📖",
    condition: "Completar categoría versiculos",
    verse: {
      ref: "Salmos 119:11",
      text: "En mi corazón he guardado tus dichos, para no pecar contra ti.",
    },
  },
  {
    id: "cuentacuentos",
    name: "Cuentacuentos",
    description: "Completaste la categoría de Parábolas.",
    emoji: "🌾",
    condition: "Completar categoría parabolas",
    verse: {
      ref: "Salmos 78:2",
      text: "Abriré en parábola mi boca; recitaré los misterios de lo antiguo.",
    },
  },
  {
    id: "vida-en-valores",
    name: "Vida en Valores",
    description: "Completaste la categoría de Valores y Vida.",
    emoji: "💛",
    condition: "Completar categoría valores",
    verse: {
      ref: "Gálatas 5:22-23",
      text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.",
    },
  },

  // ---------- Niveles ----------
  {
    id: "nivel-5",
    name: "Creciendo",
    description: "Alcanzaste el nivel 5.",
    emoji: "🌱",
    condition: "Llegar a nivel 5",
    verse: {
      ref: "1 Pedro 2:2",
      text: "Desead, como niños recién nacidos, la leche espiritual no adulterada, para que por ella crezcáis para salvación.",
    },
  },
  {
    id: "nivel-10",
    name: "Maduro",
    description: "Alcanzaste el nivel 10.",
    emoji: "🌳",
    condition: "Llegar a nivel 10",
    verse: {
      ref: "2 Timoteo 2:15",
      text: "Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad.",
    },
  },
  {
    id: "nivel-20",
    name: "Sabio",
    description: "Alcanzaste el nivel 20.",
    emoji: "🦉",
    condition: "Llegar a nivel 20",
    verse: {
      ref: "Proverbios 4:7",
      text: "Sabiduría ante todo; adquiere sabiduría; y sobre todas tus posesiones adquiere inteligencia.",
    },
  },

  // ---------- Comunidad (Fase 2) ----------
  {
    id: "anfitrion",
    name: "Anfitrión",
    description: "Creaste una sala multijugador.",
    emoji: "🏠",
    condition: "Crear una sala",
    verse: {
      ref: "1 Pedro 4:9",
      text: "Hospedaos los unos a los otros sin murmuraciones.",
    },
  },
  {
    id: "campeon-sala",
    name: "Campeón de Sala",
    description: "Ganaste una partida multijugador.",
    emoji: "🏆",
    condition: "Quedar 1° en una sala",
    verse: {
      ref: "1 Corintios 9:24",
      text: "¿No sabéis que los que corren en el estadio, todos a la verdad corren, pero uno solo se lleva el premio? Corred de tal manera que lo obtengáis.",
    },
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
