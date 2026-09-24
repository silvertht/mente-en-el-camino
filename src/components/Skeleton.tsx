/**
 * Skeleton.tsx
 * ---------------------------------------------------------------------------
 * Placeholder visual para estados de carga.
 *
 * Uso:
 *   <Skeleton variant="title" width="60%" />
 *   <SkeletonBadgeGrid count={8} />
 *   <HomeSkeleton />
 *
 * Área: VISUAL. Sin lógica de negocio.
 * ---------------------------------------------------------------------------
 */

import type { CSSProperties } from "react";

type SkeletonVariant = "text" | "title" | "block" | "circle" | "badge" | "pill";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
}

const VARIANTS: Record<SkeletonVariant, string> = {
  text: "h-3 rounded-md",
  title: "h-6 rounded-lg",
  block: "h-24 rounded-2xl",
  circle: "rounded-full aspect-square",
  badge: "h-16 w-16 rounded-full",
  pill: "h-8 rounded-full",
};

/**
 * Bloque base. Anima con `pulse` (fade suave).
 * `motion-reduce:animate-none` respeta prefers-reduced-motion.
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  style,
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        relative overflow-hidden bg-noche-700/60
        animate-pulse motion-reduce:animate-none
        ${VARIANTS[variant]}
        ${className}
      `}
      style={{ width, height, ...style }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Presets                                                                    */
/* -------------------------------------------------------------------------- */

/** Fila de 3 stat-pills (perfil, resultados). */
export function SkeletonStatsRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/5 bg-noche-800/60 p-3 sm:p-4"
        >
          <div className="flex flex-col items-center gap-2">
            <Skeleton variant="circle" width={20} height={20} />
            <Skeleton variant="text" width="60%" height={8} />
            <Skeleton variant="title" width="50%" height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Grid de insignias (perfil). */
export function SkeletonBadgeGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton variant="badge" />
          <Skeleton variant="text" width="70%" height={8} />
        </div>
      ))}
    </div>
  );
}

/** Card genérica tipo pregunta o info. */
export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/5 bg-noche-800/60 p-6">
      <Skeleton variant="title" width="50%" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "70%" : "100%"}
        />
      ))}
    </div>
  );
}

/** Hero de perfil (avatar + nombre + barra XP). */
export function SkeletonProfileHero() {
  return (
    <div className="rounded-2xl border border-white/5 bg-noche-800/60 p-6 sm:p-8">
      <div className="flex flex-col items-center gap-5">
        <Skeleton variant="circle" width={96} height={96} />
        <Skeleton variant="title" width={160} height={24} />
        <div className="w-full max-w-md space-y-2">
          <div className="flex justify-between">
            <Skeleton variant="text" width={70} height={10} />
            <Skeleton variant="text" width={90} height={10} />
          </div>
          <Skeleton variant="pill" width="100%" height={10} />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton aproximado de la pantalla Home.
 * Se usa como estado de carga inicial de la app (ver App.tsx).
 */
export function HomeSkeleton() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6 pt-6">
        {/* Hero */}
        <div className="space-y-3 text-center">
          <Skeleton
            variant="text"
            width={120}
            height={10}
            className="mx-auto"
          />
          <Skeleton
            variant="title"
            width={260}
            height={36}
            className="mx-auto"
          />
          <Skeleton
            variant="text"
            width={200}
            height={12}
            className="mx-auto"
          />
        </div>

        {/* Fila de stats */}
        <SkeletonStatsRow />

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="block" height={96} />
          ))}
        </div>
      </div>
    </div>
  );
}
