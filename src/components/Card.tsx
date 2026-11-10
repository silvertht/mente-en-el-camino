import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined" | "bare";
}

const VARIANTS = {
  default: "bg-slate-800 rounded-2xl p-5",
  elevated: "bg-slate-800 rounded-2xl p-5 shadow-xl shadow-black/30",
  outlined: "bg-slate-800/50 rounded-2xl p-5 border border-slate-700",
  // H-06: sin bg/padding/border propios. El caller manda vía className.
  // Base `rounded-2xl` se mantiene para conservar la silueta del sistema.
  bare: "rounded-2xl",
};

export function Card({
  variant = "default",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={[VARIANTS[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
