import { useState } from "react";
import { useMultiplayerStore } from "../../store/useMultiplayerStore";
import { MarcadorJugadores } from "./MarcadorJugadores";
import { IntersticialPasa } from "./IntersticialPasa";
import { Button } from "../Button";
import type { Jugador } from "../../types/multiplayer";

export function TurnoJugador() {
  const jugadores = useMultiplayerStore((s) => s.jugadores as Jugador[]);
  const turnoActualId = useMultiplayerStore(
    (s) => s.turnoActualId as string | null,
  );
  const responderTurno = useMultiplayerStore((s) => s.responderTurno);
  const finalizarPartida = useMultiplayerStore((s) => s.finalizarPartida);

  const [listo, setListo] = useState(false);

  const activo = jugadores.find((j) => j.id === turnoActualId);
  const pregunta = {
    texto: "Pregunta del turno",
    opciones: ["A", "B", "C", "D"],
  };

  if (!listo) {
    return (
      <IntersticialPasa
        nombreJugador={activo?.nombre ?? "Jugador"}
        onContinuar={() => setListo(true)}
      />
    );
  }

  return (
    <section className="space-y-4">
      <MarcadorJugadores jugadores={jugadores} activoId={turnoActualId} />
      <p className="text-sm text-alba-300">Turno de: {activo?.nombre ?? "—"}</p>
      <div className="rounded-2xl bg-noche-800/70 p-5 text-noche-100">
        {pregunta.texto}
      </div>
      <div className="space-y-2">
        {pregunta.opciones.map((o, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              responderTurno(i);
              setListo(false);
            }}
            className="min-h-[44px] w-full rounded-xl border border-noche-700 bg-noche-800/60 px-4 py-3 text-left text-sm text-noche-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
          >
            {o}
          </button>
        ))}
      </div>
      <Button variant="ghost" fullWidth onClick={() => finalizarPartida()}>
        Terminar partida
      </Button>
    </section>
  );
}
