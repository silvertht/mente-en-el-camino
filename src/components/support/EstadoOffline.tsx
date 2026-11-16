import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export interface EstadoOfflineProps {
  /** Contenido a mostrar cuando hay conexión (wrapper pattern preservado). */
  children?: React.ReactNode;
  /** Global/S3 → MC-029 · S6 → MC-051 */
  contexto?: "global" | "s3" | "s6";
}

export function EstadoOffline({
  children,
  contexto = "global",
}: EstadoOfflineProps) {
  const online = useOnlineStatus();
  if (online) return <>{children}</>;

  const mensaje =
    contexto === "s6"
      ? "Guardado aquí. Se sincroniza luego." // MC-051
      : "Sin conexión. Puedes seguir con lo descargado."; // MC-029

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex flex-col items-center gap-3 p-6 text-center"
    >
      <span aria-hidden="true" className="text-3xl text-noche-400">
        ⌁
      </span>
      <p className="text-noche-200 text-sm">{mensaje}</p>
    </div>
  );
}
