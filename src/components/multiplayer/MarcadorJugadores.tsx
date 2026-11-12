import { colorJugadorSeguro } from "../../utils/multiplayerVisual";
import type { Jugador } from "../../types/multiplayer";

export function MarcadorJugadores({
  jugadores,
  activoId,
}: {
  jugadores: Jugador[];
  activoId: string | null;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {jugadores.map((j) => {
        const c = colorJugadorSeguro(j.colorToken);
        const activo = j.id === activoId;
        return (
          <li key={j.id} aria-current={activo ? "true" : undefined}>
            <span
              className={`inline-flex min-h-8 items-center gap-1 rounded-full bg-noche-800/60 px-3 py-1 text-xs text-noche-200 ${
                activo ? `ring-2 ${c.ring}` : ""
              }`}
            >
              <span aria-hidden="true">{c.num}</span>
              <span className="sr-only">{j.nombre}</span>
              <span aria-hidden="true">{j.icono}</span>
              <span className="tabular-nums">{j.puntuacion}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
