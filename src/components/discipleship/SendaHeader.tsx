import type { EstadoSenda } from "../../types/discipleship";
import { EstadoBadge } from "./EstadoBadge";

export function SendaHeader({
  nombre,
  estado,
  progreso,
}: {
  nombre: string;
  estado: EstadoSenda;
  progreso: { recorridas: number; total: number };
}) {
  return (
    <header
      aria-label={`Senda ${nombre}, ${estado}`}
      className="sticky top-0 z-10 -mx-4 px-4 py-3
        bg-noche-950/85 backdrop-blur border-b border-noche-800"
    >
      <h2 className="text-alba-400 text-xs uppercase tracking-wider">
        Senda de {nombre}
      </h2>
      <div className="mt-1 flex items-center justify-between text-noche-200 text-sm">
        <EstadoBadge estado={estado} />
        <span className="tabular-nums">
          {progreso.recorridas} / {progreso.total}
        </span>
      </div>
    </header>
  );
}
