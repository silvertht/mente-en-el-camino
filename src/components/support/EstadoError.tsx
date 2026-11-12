import { Button } from "../Button";

export function EstadoError({
  mensaje = "Algo no cargó. Reintenta.",
  onReintentar,
}: {
  mensaje?: string;
  onReintentar?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 p-6 text-center"
    >
      <span aria-hidden="true" className="text-3xl text-alerta-400">
        ⚠
      </span>
      <p className="text-noche-200 text-sm">{mensaje}</p>
      {onReintentar && (
        <Button variant="secondary" size="sm" onClick={onReintentar}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
