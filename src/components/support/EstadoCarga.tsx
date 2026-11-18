/**
 * EstadoCarga — Visual v3 (FALLO 3)
 * Skeletons con efecto shimmer suave (no bloques oscuros).
 */
export interface EstadoCargaProps {
  contexto?: "s0" | "s4";
  texto?: string;
  label?: string;
}

export function EstadoCarga({ contexto, texto, label }: EstadoCargaProps) {
  const mensaje =
    texto ??
    label ??
    (contexto === "s4"
      ? "Preparando tu lección…"
      : contexto === "s0"
        ? "Preparando tu camino…"
        : "Cargando…");

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="space-y-3 p-4 w-full"
    >
      <span className="sr-only">{mensaje}</span>
      <div className="h-16 rounded-2xl bg-noche-800/30 border border-noche-700/30 skeleton-shimmer" />
      <div className="h-16 rounded-2xl bg-noche-800/30 border border-noche-700/30 skeleton-shimmer" />
      <div className="h-16 rounded-2xl bg-noche-800/30 border border-noche-700/30 skeleton-shimmer" />
    </div>
  );
}
