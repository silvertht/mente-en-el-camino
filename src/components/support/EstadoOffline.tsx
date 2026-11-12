import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export function EstadoOffline({ children }: { children: React.ReactNode }) {
  const online = useOnlineStatus();
  if (online) return <>{children}</>;
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-3 p-6 text-center"
    >
      <span aria-hidden="true" className="text-3xl text-noche-400">
        ⌁
      </span>
      <p className="text-noche-200 text-sm">
        Sin conexión. Puedes seguir con lo descargado.
      </p>
    </div>
  );
}
