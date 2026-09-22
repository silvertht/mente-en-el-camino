import { motion } from "motion/react";
import type { Badge } from "../types";

interface BadgeCardProps {
  badge: Badge;
  unlocked: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: (badge: Badge) => void;
}

const SIZES = {
  sm: { box: "w-16 h-16", emoji: "text-2xl" },
  md: { box: "w-20 h-20", emoji: "text-3xl" },
  lg: { box: "w-28 h-28", emoji: "text-5xl" },
};

export function BadgeCard({
  badge,
  unlocked,
  size = "md",
  onClick,
}: BadgeCardProps) {
  const { box, emoji } = SIZES[size];

  return (
    <motion.button
      whileHover={onClick ? { scale: 1.06, y: -3 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={() => onClick?.(badge)}
      className="flex flex-col items-center gap-2 group"
      type="button"
    >
      <div
        className={[
          "rounded-full flex items-center justify-center relative transition-all duration-300",
          box,
          unlocked
            ? "bg-gradient-to-br from-alba-400 via-alba-500 to-alba-600 shadow-lg shadow-alba-500/40 border-2 border-alba-400/50"
            : "bg-noche-800 border-2 border-noche-700",
        ].join(" ")}
      >
        <span
          className={[
            emoji,
            unlocked ? "drop-shadow-lg" : "grayscale opacity-30",
          ].join(" ")}
        >
          {unlocked ? badge.emoji : "🔒"}
        </span>

        {/* Brillo al hover si está desbloqueada */}
        {unlocked && (
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        {/* Anillo brillante si está desbloqueada */}
        {unlocked && (
          <div className="absolute -inset-1 rounded-full bg-alba-500/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <span
        className={[
          "text-xs font-semibold text-center leading-tight max-w-[80px] transition-colors",
          unlocked ? "text-white" : "text-slate-500",
        ].join(" ")}
      >
        {badge.name}
      </span>
    </motion.button>
  );
}
