import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "reino";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-alba-500 hover:bg-alba-400 active:bg-alba-600 text-noche-950 font-bold shadow-lg shadow-alba-500/20",
  secondary:
    "bg-noche-700 hover:bg-noche-600 active:bg-noche-800 text-white font-semibold",
  ghost: "bg-transparent hover:bg-noche-700/50 text-white/80 font-medium",
  danger:
    "bg-alerta-500 hover:bg-alerta-400 active:bg-alerta-500 text-white font-bold",
  reino:
    "bg-reino-500 hover:bg-reino-400 active:bg-reino-600 text-white font-bold shadow-lg shadow-reino-500/20",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-xl",
  lg: "px-7 py-3.5 text-lg rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "transition-all duration-150 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-alba-400",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-noche-900",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        "active:scale-[0.97]",
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
