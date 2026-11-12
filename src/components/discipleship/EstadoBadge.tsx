import { getVisual, type EstadoNodo } from "../../utils/estadoVisual";

export function EstadoBadge({
  estado,
  className = "",
}: {
  estado: EstadoNodo;
  className?: string;
}) {
  const v = getVisual(estado);
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs text-noche-300 ${className}`}
    >
      <span aria-hidden="true">{v.icono}</span>
      <span>{v.etiqueta}</span>
    </span>
  );
}
