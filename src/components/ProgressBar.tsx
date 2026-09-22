interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
}

const HEIGHTS = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  color = "bg-gradient-to-r from-alba-400 to-alba-600",
  height = "md",
  showLabel = false,
  label,
}: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs text-slate-400 font-medium">
          <span>{label}</span>
          <span className="text-alba-400">{Math.round(percent)}%</span>
        </div>
      )}
      <div
        className={[
          "w-full bg-noche-700/70 rounded-full overflow-hidden",
          "border border-noche-700",
          HEIGHTS[height],
        ].join(" ")}
      >
        <div
          className={[
            "h-full transition-all duration-700 ease-out rounded-full relative",
            "shadow-[0_0_12px_rgba(245,181,68,0.5)]",
            color,
          ].join(" ")}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Brillo interno */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
}
