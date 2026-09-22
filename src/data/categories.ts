import type { Category, CategoryId } from "../types";

export const CATEGORIES: Record<CategoryId, Category> = {
  evangelios: {
    id: "evangelios",
    name: "Evangelios",
    description: "La vida, milagros y enseñanzas de Jesús.",
    emoji: "✝️",
    color: "bg-amber-500",
  },
  personajes: {
    id: "personajes",
    name: "Personajes Bíblicos",
    description: "Hombres y mujeres usados por Dios a lo largo de la historia.",
    emoji: "👤",
    color: "bg-sky-500",
  },
  versiculos: {
    id: "versiculos",
    name: "Versículos",
    description: "Completa, ordena y reconoce pasajes clave de la Escritura.",
    emoji: "📖",
    color: "bg-emerald-500",
  },
  parabolas: {
    id: "parabolas",
    name: "Parábolas",
    description: "Las historias que Jesús usó para enseñar el Reino.",
    emoji: "🌾",
    color: "bg-orange-500",
  },
  valores: {
    id: "valores",
    name: "Valores y Vida",
    description: "Decisiones, carácter y fe aplicados al día a día.",
    emoji: "💛",
    color: "bg-rose-500",
  },
  genesis: {
    id: "genesis",
    name: "Génesis",
    description: "Los orígenes: creación, patriarcas y promesas.",
    emoji: "🌍",
    color: "bg-lime-600",
  },
  exodo: {
    id: "exodo",
    name: "Éxodo",
    description: "Liberación, ley y el pueblo en el desierto.",
    emoji: "🔥",
    color: "bg-red-600",
  },
  apologetica: {
    id: "apologetica",
    name: "Apologética",
    description: "Razones para creer y defender la fe con respeto.",
    emoji: "🛡️",
    color: "bg-indigo-500",
  },
  "historia-iglesia": {
    id: "historia-iglesia",
    name: "Historia de la Iglesia",
    description: "De los apóstoles a hoy: cómo Dios ha obrado.",
    emoji: "🏛️",
    color: "bg-purple-500",
  },
};

// Categorías activas en el MVP (las demás se activarán en fases siguientes)
export const MVP_CATEGORIES: CategoryId[] = [
  "evangelios",
  "personajes",
  "versiculos",
  "parabolas",
  "valores",
];

// Helper para obtener una categoría con seguridad
export function getCategory(id: CategoryId): Category {
  return CATEGORIES[id];
}

// Lista ordenada para renderizar en pantalla
export const CATEGORY_LIST: Category[] = MVP_CATEGORIES.map(
  (id) => CATEGORIES[id],
);
