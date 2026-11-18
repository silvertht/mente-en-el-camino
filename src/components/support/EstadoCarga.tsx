/**
 * EstadoCarga — Visual v3.1
 * Skeletons con efecto shimmer + spinner sutil para mejorar percepción de carga.
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
      className="flex flex-col items-center justify-center space-y-5 p-6 w-full"
    >
      <span className="sr-only">{mensaje}</span>

      {/* Spinner sutil centrado */}
      <div className="w-7 h-7 border-2 border-alba-500/80 border-t-transparent rounded-full animate-spin motion-reduce:animate-none" />

      {/* Skeletons con shimmer */}
      <div className="w-full space-y-3">
        <div className="h-16 rounded-2xl bg-noche-800/30 border border-noche-700/30 skeleton-shimmer" />
        <div className="h-16 rounded-2xl bg-noche-800/30 border border-noche-700/30 skeleton-shimmer" />
        <div className="h-16 rounded-2xl bg-noche-800/30 border border-noche-700/30 skeleton-shimmer" />
      </div>
    </div>
  );
}
