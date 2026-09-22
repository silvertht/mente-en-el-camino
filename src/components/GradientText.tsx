import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  shimmer?: boolean;
}

export function GradientText({
  children,
  className = "",
  shimmer = false,
}: Props) {
  return (
    <span
      className={[
        "bg-gradient-to-r from-alba-400 via-alba-500 to-alba-400 bg-clip-text text-transparent",
        shimmer ? "bg-[length:200%_auto] animate-shimmer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={shimmer ? { backgroundSize: "200% auto" } : undefined}
    >
      {children}
    </span>
  );
}
