export function EstadoCarga({ label = "Cargando…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="space-y-3 p-4"
    >
      <span className="sr-only">{label}</span>
      <div className="h-16 rounded-2xl bg-noche-800/60 animate-pulse" />
      <div className="h-16 rounded-2xl bg-noche-800/60 animate-pulse" />
      <div className="h-16 rounded-2xl bg-noche-800/60 animate-pulse" />
    </div>
  );
}
