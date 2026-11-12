import { colorJugadorSeguro } from "../../utils/multiplayerVisual";
import type { Jugador } from "../../types/multiplayer";

export function JugadorSlot({
  jugador,
  onRemove,
}: {
  jugador: Jugador;
  onRemove: (id: string) => void;
}) {
  const c = colorJugadorSeguro(jugador.colorToken);
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border-2 border-noche-700 p-3 bg-noche-800/60"
      aria-label={`Jugador ${c.num}, ${jugador.nombre}`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${c.bg} ${c.text} font-bold`}
        aria-hidden="true"
      >
        {c.num}
      </span>
      <span aria-hidden="true" className="text-xl">
        {jugador.icono}
      </span>
      <span className="flex-1 text-noche-100 text-sm truncate">
        {jugador.nombre}
      </span>
      <button
        type="button"
        onClick={() => onRemove(jugador.id)}
        aria-label={`Quitar a ${jugador.nombre}`}
        className="min-h-11 min-w-11 rounded-full text-noche-300 hover:text-alerta-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
      >
        ✕
      </button>
    </div>
  );
}
