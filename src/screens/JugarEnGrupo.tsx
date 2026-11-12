import { useEffect, useRef } from "react";
import { useMultiplayerStore } from "../store/useMultiplayerStore";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { SetupJugadores } from "../components/multiplayer/SetupJugadores";
import { TurnoJugador } from "../components/multiplayer/TurnoJugador";
import { ResultadosGrupo } from "../components/multiplayer/ResultadosGrupo";
import { EstadoOffline } from "../components/support/EstadoOffline";
import type { EstadoPartida } from "../types/multiplayer";

export function JugarEnGrupo({ onBack }: { onBack: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const online = useOnlineStatus();
  const estadoPartida = useMultiplayerStore(
    (s) => s.estadoPartida as EstadoPartida,
  );

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  if (!online)
    return (
      <EstadoOffline>
        <></>
      </EstadoOffline>
    );

  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="py-4 text-2xl font-semibold text-alba-400 outline-none"
      >
        Jugar en grupo
      </h1>

      {(estadoPartida === "idle" || estadoPartida === "setup") && (
        <SetupJugadores />
      )}
      {estadoPartida === "en_curso" && <TurnoJugador />}
      {estadoPartida === "finalizada" && <ResultadosGrupo />}

      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 text-sm text-noche-300 hover:text-alba-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400 focus-visible:ring-offset-2 focus-visible:ring-offset-noche-950"
        >
          ← Volver al inicio
        </button>
      </div>
    </main>
  );
}
