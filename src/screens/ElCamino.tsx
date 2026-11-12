import { useEffect, useRef } from "react";
import { useDiscipleshipStore } from "../store/useDiscipleshipStore";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { SendaHeader } from "../components/discipleship/SendaHeader";
import { NivelHito } from "../components/discipleship/NivelHito";
import { LeccionNode } from "../components/discipleship/LeccionNode";
import { EstadoVacio } from "../components/support/EstadoVacio";
import { EstadoOffline } from "../components/support/EstadoOffline";

export function ElCamino() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const online = useOnlineStatus();
  const estructura = useDiscipleshipStore((s: any) => s.estructura);
  const selectEstadoSenda = useDiscipleshipStore(
    (s: any) => s.selectEstadoSenda,
  );
  const selectEstadoNivel = useDiscipleshipStore(
    (s: any) => s.selectEstadoNivel,
  );
  const selectEstadoLeccion = useDiscipleshipStore(
    (s: any) => s.selectEstadoLeccion,
  );
  const selectProgresoSenda = useDiscipleshipStore(
    (s: any) => s.selectProgresoSenda,
  );
  const selectProximoPaso = useDiscipleshipStore(
    (s: any) => s.selectProximoPaso,
  );
  const proximo = selectProximoPaso();

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  if (!online)
    return (
      <EstadoOffline>
        <></>
      </EstadoOffline>
    );
  if (!estructura || estructura.length === 0) return <EstadoVacio />;

  return (
    <main className="relative mx-auto max-w-md px-4 pb-24">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="py-4 text-2xl font-semibold text-alba-400 outline-none"
      >
        El Camino
      </h1>

      {estructura.map((senda: any) => (
        <section key={senda.id} className="mt-6">
          <SendaHeader
            nombre={senda.nombre}
            estado={selectEstadoSenda(senda.id)}
            progreso={selectProgresoSenda(senda.id)}
          />
          <div className="relative mt-4 space-y-6">
            {senda.niveles.map((nivel: any) => (
              <div key={nivel.id} className="space-y-4">
                <NivelHito
                  numero={nivel.numero}
                  nombre={nivel.nombre}
                  estado={selectEstadoNivel(nivel.id)}
                />
                <ul className="grid grid-cols-1 gap-3">
                  {nivel.lecciones.map((lec: any, i: number) => (
                    <li key={lec.id} className="flex justify-center">
                      <LeccionNode
                        id={lec.id}
                        numero={lec.numero}
                        titulo={lec.titulo}
                        estado={selectEstadoLeccion(lec.id)}
                        onClick={() => {
                          /* navegación a Leccion — ver §5.3 del reporte */
                        }}
                        index={i}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
      <span className="sr-only" aria-live="polite">
        {proximo ? `Próximo paso: ${proximo.leccionId}` : ""}
      </span>
    </main>
  );
}
