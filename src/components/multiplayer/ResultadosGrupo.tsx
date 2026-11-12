import { Button } from "../Button";
import { useMultiplayerStore } from "../../store/useMultiplayerStore";
import { colorJugadorSeguro } from "../../utils/multiplayerVisual";
import { DesempatePanel } from "./DesempatePanel";

export function ResultadosGrupo() {
  const jugadores = useMultiplayerStore((s: any) => s.jugadores as any[]);
  const ganadorId = useMultiplayerStore((s: any) => s.ganadorId);
  const reset = useMultiplayerStore((s: any) => s.resetPartida);

  if (ganadorId === null) return <DesempatePanel />;

  const ganador = jugadores.find((j: any) => j.id === ganadorId);
  const c = ganador ? colorJugadorSeguro(ganador.colorToken) : null;

  return (
    <section className="space-y-6">
      <div
        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${c?.bg ?? "bg-noche-700"} ${c?.text ?? "text-noche-100"}`}
      >
        <span aria-hidden="true" className="text-4xl">
          {ganador?.icono ?? "♛"}
        </span>
      </div>
      <h2 className="text-center text-alba-400 text-lg font-semibold">
        Ganador: {ganador?.nombre}
      </h2>
      <ul className="space-y-2">
        {jugadores.map((j: any) => (
          <li
            key={j.id}
            className="flex justify-between rounded-xl bg-noche-800/60 px-4 py-3 text-sm text-noche-100"
          >
            <span>{j.nombre}</span>
            <span className="tabular-nums">
              {j.puntuacion} pts · {j.fallos} fallos
            </span>
          </li>
        ))}
      </ul>
      <div className="fixed inset-x-4 bottom-4 space-y-2">
        <Button variant="primary" fullWidth onClick={reset}>
          Otra ronda
        </Button>
        <Button variant="ghost" fullWidth onClick={reset}>
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}
