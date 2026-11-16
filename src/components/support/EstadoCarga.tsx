export interface EstadoCargaProps {
  /** S0 → MC-007 "Preparando tu camino…" · S4 → MC-037 "Preparando tu lección…" */
  contexto?: "s0" | "s4";
  /** Override explícito del texto. Prioridad sobre contexto. */
  texto?: string;
  /** Alias legacy de `texto` (compatibilidad Fase 5). */
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
      className="space-y-3 p-4"
    >
      <span className="sr-only">{mensaje}</span>
      <div className="h-16 rounded-2xl bg-noche-800/60 animate-pulse motion-reduce:animate-none" />
      <div className="h-16 rounded-2xl bg-noche-800/60 animate-pulse motion-reduce:animate-none" />
      <div className="h-16 rounded-2xl bg-noche-800/60 animate-pulse motion-reduce:animate-none" />
    </div>
  );
}
