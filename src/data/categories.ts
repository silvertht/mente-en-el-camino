import type { Category, CategoryId } from "../types";

export const CATEGORIES: Record<CategoryId, Category> = {
  evangelios: {
    id: "evangelios",
    name: "Evangelios",
    description: "La vida, milagros y enseñanzas de Jesús.",
    emoji: "✝️",
    color: "bg-alba-500", // (era amber)
  },
  personajes: {
    id: "personajes",
    name: "Personajes Bíblicos",
    description: "Hombres y mujeres usados por Dios a lo largo de la historia.",
    emoji: "👤",
    color: "bg-reino-500", // (era sky)
  },
  versiculos: {
    id: "versiculos",
    name: "Versículos",
    description: "Completa, ordena y reconoce pasajes clave de la Escritura.",
    emoji: "📖",
    color: "bg-vida-500", // (era emerald)
  },
  parabolas: {
    id: "parabolas",
    name: "Parábolas",
    description: "Las historias que Jesús usó para enseñar el Reino.",
    emoji: "🌾",
    color: "bg-fuego-500", // (era orange)
  },
  valores: {
    id: "valores",
    name: "Valores y Vida",
    description: "Decisiones, carácter y fe aplicados al día a día.",
    emoji: "💛",
    color: "bg-alerta-500", // (era rose)
  },
  genesis: {
    id: "genesis",
    name: "Génesis",
    description: "Los orígenes: creación, patriarcas y promesas.",
    emoji: "🌍",
    color: "bg-vida-400", // (era lime)
  },
  exodo: {
    id: "exodo",
    name: "Éxodo",
    description: "Liberación, ley y el pueblo en el desierto.",
    emoji: "🔥",
    color: "bg-fuego-400", // (era red)
  },
  apologetica: {
    id: "apologetica",
    name: "Apologética",
    description: "Razones para creer y defender la fe con respeto.",
    emoji: "🛡️",
    color: "bg-reino-400", // (era indigo)
  },
  "historia-iglesia": {
    id: "historia-iglesia",
    name: "Historia de la Iglesia",
    description: "De los apóstoles a hoy: cómo Dios ha obrado.",
    emoji: "🏛️",
    color: "bg-alba-600", // (era purple)
  },
};

// Lista ordenada para renderizar en pantalla (AHORA INCLUYE LAS 9)
export const CATEGORY_LIST: Category[] = Object.values(CATEGORIES);

// Helper para obtener una categoría con seguridad
export function getCategory(id: CategoryId): Category {
  return CATEGORIES[id];
}
