import { useEffect, useRef } from "react";
import { useMultiplayerStore } from "../store/useMultiplayerStore";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { SetupJugadores } from "../components/multiplayer/SetupJugadores";
import { IntersticialPasa } from "../components/multiplayer/IntersticialPasa";
import { TurnoJugador } from "../components/multiplayer/TurnoJugador";
import { ResultadosGrupo } from "../components/multiplayer/ResultadosGrupo";
import { EstadoOffline } from "../components/support/EstadoOffline";

export function JugarEnGrupo() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const online = useOnlineStatus();
  const estado = useMultiplayerStore((s: any) => s.estadoPartida);

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
      {estado === "idle" || estado === "setup" ? <SetupJugadores /> : null}
      {estado === "en_curso" ? (
        <IntersticialPasa>
          <TurnoJugador />
        </IntersticialPasa>
      ) : null}
      {estado === "finalizada" ? <ResultadosGrupo /> : null}
    </main>
  );
}
