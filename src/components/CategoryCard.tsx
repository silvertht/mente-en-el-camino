import { motion } from "motion/react";
import type { Category } from "../types";
import { Card } from "./Card";

interface CategoryCardProps {
  category: Category;
  questionCount: number;
  onClick: (categoryId: Category["id"]) => void;
  disabled?: boolean;
}

export function CategoryCard({
  category,
  questionCount,
  onClick,
  disabled = false,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.03, y: -4 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="cursor-pointer"
      onClick={() => !disabled && onClick(category.id)}
    >
      <Card
        variant="elevated"
        className={[
          "flex flex-col gap-3 h-full relative overflow-hidden",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {/* Barra de color superior */}
        <div
          className={[
            "absolute top-0 left-0 right-0 h-1.5",
            category.color,
          ].join(" ")}
        />

        {/* Emoji grande */}
        <div className="text-4xl" aria-hidden="true">
          {category.emoji}
        </div>

        {/* Nombre y descripción */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
          <p className="text-sm text-slate-400 leading-snug">
            {category.description}
          </p>
        </div>

        {/* Contador de preguntas */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-700">
          <span className="text-xs text-slate-500">
            {questionCount} pregunta{questionCount !== 1 ? "s" : ""}
          </span>
          <span className="text-xs font-semibold text-amber-400">Jugar →</span>
        </div>
      </Card>
    </motion.div>
  );
}
