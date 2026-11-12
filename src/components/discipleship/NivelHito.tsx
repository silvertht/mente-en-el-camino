import type { EstadoNivel } from "../../types/discipleship";
import { formaClases } from "../../utils/estadoVisual";

export function NivelHito({
  numero,
  estado,
}: {
  numero: number;
  nombre: string;
  estado: EstadoNivel;
}) {
  return (
    <div
      role="group"
      aria-label={`Nivel ${numero}, ${estado}`}
      className={`mx-auto flex min-h-11 min-w-11 w-14 h-14 items-center justify-center
        bg-reino-600 border-2 border-reino-400 text-white ${formaClases.rombo}`}
    >
      <span aria-hidden="true" className="text-xs">
        ⚑
      </span>
    </div>
  );
}
