import { motion } from "motion/react";
import { useCountUp } from "../hooks/useCountUp";

interface StatPillProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  glowColor: string;
  onClick?: () => void;
}

export function StatPill({
  icon,
  label,
  value,
  suffix = "",
  color,
  glowColor,
  onClick,
}: StatPillProps) {
  const animated = useCountUp(value);

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      onClick={onClick}
      type="button"
      className="relative group bg-noche-800/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-noche-700/60 hover:border-alba-500/40 transition-colors text-left overflow-hidden"
    >
      {/* Halo interior al hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{
          background: `radial-gradient(circle at top right, ${glowColor}, transparent 70%)`,
        }}
      />

      <div className="relative">
        <div className="text-xl sm:text-2xl mb-1">{icon}</div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
          {label}
        </p>
        <p
          className={`text-lg sm:text-xl font-black ${color} leading-tight tabular-nums`}
        >
          {animated}
          {suffix}
        </p>
      </div>
    </motion.button>
  );
}
