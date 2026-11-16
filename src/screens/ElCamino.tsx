import { useEffect, useRef } from "react";
import {
  useDiscipleshipStore,
  selectEstadoLeccion,
  selectEstadoNivel,
  selectEstadoSenda,
  selectProgresoSenda,
} from "../store/useDiscipleshipStore";
import { getSendaPiloto } from "../data/discipleship";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { SendaHeader } from "../components/discipleship/SendaHeader";
import { NivelHito } from "../components/discipleship/NivelHito";
import { LeccionNode } from "../components/discipleship/LeccionNode";
import { EstadoVacio } from "../components/support/EstadoVacio";
import { EstadoCarga } from "../components/support/EstadoCarga";
import { EstadoOffline } from "../components/support/EstadoOffline";
import { FeedbackInline } from "../components/support/FeedbackInline";
import { EncabezadoMovimiento } from "../components/support/EncabezadoMovimiento";
import { ProgresoSecundario } from "../components/support/ProgresoSecundario";

export function ElCamino({
  onSelectLeccion,
  onVolver,
}: {
  onSelectLeccion: (leccionId: string) => void;
  onVolver: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const online = useOnlineStatus();

  useDiscipleshipStore((s) => s.progresoLecciones);
  const contenidoCargado = useDiscipleshipStore((s) => s.contenidoCargado);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  if (!online) {
    return (
      <EstadoOffline contexto="global">
        <></>
      </EstadoOffline>
    );
  }
  if (!contenidoCargado) return <EstadoCarga contexto="s0" />;

  const senda = getSendaPiloto();
  if (!senda) return <EstadoVacio contexto="s1" />;

  const state = useDiscipleshipStore.getState();
  const stSenda = selectEstadoSenda(state, senda.sendaId);
  const progsSenda = selectProgresoSenda(state, senda.sendaId);

  return (
    <main className="relative mx-auto max-w-md px-4 pb-32">
      {/* D3: MC-012 en mount. FeedbackInline se auto-oculta a los 300ms. */}
      <div className="pt-4">
        <FeedbackInline texto={`Entrando a ${senda.titulo}.`} />
      </div>

      <div className="flex items-center gap-2 pt-4">
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver al inicio"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-noche-800/60 border border-noche-700 text-noche-200 hover:text-alba-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400 focus-visible:ring-offset-2 focus-visible:ring-offset-noche-950"
        >
          ←
        </button>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-semibold text-alba-400 outline-none"
        >
          El Camino
        </h1>
      </div>

      <div className="mt-2">
        <EncabezadoMovimiento movimiento="Llegar" />
      </div>

      <div className="mt-4">
        <SendaHeader
          nombre={senda.titulo}
          estado={stSenda}
          progreso={progsSenda}
        />
      </div>

      <div className="relative mt-8 space-y-10">
        {senda.niveles.map((nivel) => {
          const stNivel = selectEstadoNivel(
            state,
            `${senda.sendaId}:${nivel.nivelNumber}`,
          );

          // D2: ProgresoSecundario MC-016 por nivel (S2).
          // Cast String() para evitar error de literal no asignable en selectEstadoLeccion.
          const leccionesNivel = nivel.lecciones;
          const totalNivel = leccionesNivel.length;
          const recorridasNivel = leccionesNivel.filter((lec) => {
            const lecId = `${senda.sendaId}:${nivel.nivelNumber}:${lec.leccionNumber}`;
            const st = selectEstadoLeccion(state, lecId);
            const s = String(st);
            return s === "recorrida" || s === "recorrido";
          }).length;

          return (
            <div key={nivel.nivelNumber} className="space-y-4">
              <NivelHito
                numero={nivel.nivelNumber}
                nombre={nivel.titulo}
                estado={stNivel}
              />
              <ProgresoSecundario
                actual={recorridasNivel}
                total={totalNivel}
                contexto="lecciones"
              />
              <ul className="grid grid-cols-1 gap-4">
                {nivel.lecciones.map((lec, i) => {
                  const lecId = `${senda.sendaId}:${nivel.nivelNumber}:${lec.leccionNumber}`;
                  const stLec = selectEstadoLeccion(state, lecId);
                  return (
                    <li key={lecId} className="flex justify-center">
                      <LeccionNode
                        id={lecId}
                        numero={lec.leccionNumber}
                        titulo={lec.titulo}
                        estado={stLec}
                        onClick={(id) => {
                          if (stLec !== "bloqueado") onSelectLeccion(id);
                        }}
                        index={i}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
