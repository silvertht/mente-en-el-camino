import { useMultiplayerStore } from "../../store/useMultiplayerStore";
import { MarcadorJugadores } from "./MarcadorJugadores";

export function TurnoJugador({
  pregunta,
}: {
  pregunta?: { texto: string; opciones: string[] };
}) {
  const jugadores = useMultiplayerStore((s: any) => s.jugadores as any[]);
  const turnoId = useMultiplayerStore((s: any) => s.turnoActualId);
  const responder = useMultiplayerStore((s: any) => s.responderTurno);

  const q = pregunta ?? {
    texto: "Pregunta de prueba",
    opciones: ["A", "B", "C", "D"],
  };

  return (
    <section className="space-y-4">
      <MarcadorJugadores jugadores={jugadores} activoId={turnoId} />
      <div className="rounded-2xl bg-noche-800/70 p-5 text-noche-100">
        {q.texto}
      </div>
      <div className="space-y-2">
        {q.opciones.map((o, i) => (
          <button
            key={i}
            type="button"
            onClick={() => responder(i)}
            className="w-full min-h-[44px] rounded-xl bg-noche-800/60 border border-noche-700 px-4 py-3 text-left text-sm text-noche-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
          >
            {o}
          </button>
        ))}
      </div>
    </section>
  );
}
