import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useDiscipleshipStore } from "../store/useDiscipleshipStore";
import type { CategoryId } from "../types";
import type {
  NivelNumber,
  LeccionNumber,
  ResultadoCheck,
} from "../types/discipleship";
import { getLeccion } from "../data/discipleship";
import { ProgresoLeccion } from "../components/discipleship/ProgresoLeccion";
import { TarjetaContenido } from "../components/discipleship/TarjetaContenido";
import { CheckReflexion } from "../components/discipleship/CheckReflexion";
import {
  FeedbackReflexion,
  type FeedbackData,
} from "../components/discipleship/FeedbackReflexion";
import { Button } from "../components/Button";
import { EstadoCarga } from "../components/support/EstadoCarga";
import { ContextoBiblico } from "../components/support/ContextoBiblico";
import { ToastHito } from "../components/support/ToastHito";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function Leccion({
  leccionId,
  onContinuar,
  onVolver,
}: {
  leccionId: string;
  onContinuar: () => void;
  onVolver: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [sendaIdStr, nStr, lStr] = leccionId.split(":");
  const sendaId = sendaIdStr as CategoryId;
  const n = Number(nStr) as NivelNumber;
  const l = Number(lStr) as LeccionNumber;
  const leccion = getLeccion(sendaId, n, l);
  const online = useOnlineStatus();
  const reduced = useReducedMotion();

  const iniciarLeccion = useDiscipleshipStore((s) => s.iniciarLeccion);
  const responderCheck = useDiscipleshipStore((s) => s.responderCheck);
  const finalizarLeccion = useDiscipleshipStore((s) => s.finalizarLeccion);
  const abandonarLeccion = useDiscipleshipStore((s) => s.abandonarLeccion);
  const guardarPosicion = useDiscipleshipStore((s) => s.guardarPosicion);
  const leccionActivaStore = useDiscipleshipStore((s) => s.leccionActiva);

  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [finalizando, setFinalizando] = useState(false);
  const [iniciando, setIniciando] = useState(true);
  const [errorInicio, setErrorInicio] = useState(false);

  // D5/D6: un solo estado para H1/H2 (anti-apilamiento)
  const [toastActivo, setToastActivo] = useState<"H1" | "H2" | null>(null);
  const [h1Mostrado, setH1Mostrado] = useState(false);
  const [h2Mostrado, setH2Mostrado] = useState(false);

  // Visual v2 (CA-4): microcopy de transición
  const [mostrarSeguimos, setMostrarSeguimos] = useState(false); // MC-061
  const [mostrar062, setMostrar062] = useState(false); // MC-062
  const [mostrar063, setMostrar063] = useState(false); // MC-063
  const [h62Mostrado, setH62Mostrado] = useState(false);
  const [h63Mostrado, setH63Mostrado] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
    setIniciando(true);
    setErrorInicio(false);

    iniciarLeccion(sendaId, n, l)
      .then(() => setIniciando(false))
      .catch(() => {
        setIniciando(false);
        setErrorInicio(true);
      });

    return () => {
      abandonarLeccion().catch(console.error);
    };
  }, [sendaId, n, l, iniciarLeccion, abandonarLeccion, leccionId]);

  useEffect(() => {
    setH63Mostrado(false);
  }, [preguntaIdx]);

  const ready =
    !iniciando &&
    !errorInicio &&
    leccionActivaStore !== null &&
    leccionActivaStore.sendaId === sendaId &&
    leccionActivaStore.nivelNumber === n &&
    leccionActivaStore.leccionNumber === l;

  const volverAlCamino = async () => {
    try {
      await abandonarLeccion();
    } finally {
      onVolver();
    }
  };

  // Visual v3: Overlay de carga con backdrop-blur (tapa el starfield y evita "flash roto")
  if (!leccion || errorInicio || !ready) {
    return (
      <div className="fixed inset-0 z-50 bg-noche-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
        {errorInicio ? (
          <>
            <p className="text-noche-300 text-sm mb-4">
              No pudimos abrir la lección. Reintenta.
            </p>
            <Button variant="ghost" fullWidth onClick={volverAlCamino}>
              Volver al camino
            </Button>
          </>
        ) : !leccion ? (
          <>
            <p className="text-noche-300 text-sm mb-4">
              No pudimos abrir la lección. Vuelve al camino.
            </p>
            <Button variant="ghost" fullWidth onClick={onVolver}>
              Volver
            </Button>
          </>
        ) : (
          <div className="w-full max-w-md">
            <EstadoCarga contexto="s4" />
          </div>
        )}
      </div>
    );
  }

  const totalPreguntas = leccion.preguntas.length;
  const esUltima = preguntaIdx >= totalPreguntas - 1;
  const preguntaActual = leccion.preguntas[preguntaIdx];

  const varianteContexto = preguntaIdx === 0 ? "siempre-visible" : "colapsable";

  const citaRVR = preguntaActual.referenciaRVR1960.includes("RVR1960")
    ? preguntaActual.referenciaRVR1960
    : `${preguntaActual.referenciaRVR1960} (RVR1960)`;

  const onResponder = (opcionIdx: number) => {
    const r: ResultadoCheck = responderCheck(preguntaIdx, opcionIdx, {
      sendaId,
      nivelNumber: n,
      leccionNumber: l,
    });

    const prevFeedback = feedback;

    setFeedback({
      correcto: r.correcto,
      respuesta: r.feedback,
      pista: r.pista,
      referencia: r.referencia,
      reflexion: r.reflexion,
    });

    if (!r.correcto && prevFeedback && !prevFeedback.correcto && !h63Mostrado) {
      setH63Mostrado(true);
      setMostrar063(true);
      setTimeout(() => setMostrar063(false), 1500);
    }

    if (r.correcto && esUltima && !h62Mostrado) {
      setH62Mostrado(true);
      setMostrar062(true);
      setTimeout(() => setMostrar062(false), 2500);
    }
  };

  const onTerminar = async () => {
    if (finalizando) return;
    setFinalizando(true);
    try {
      await finalizarLeccion();
      onContinuar();
    } finally {
      setFinalizando(false);
    }
  };

  const onSiguientePregunta = async () => {
    if (finalizando) return;
    if (esUltima) {
      await onTerminar();
      return;
    }
    const next = preguntaIdx + 1;
    try {
      await guardarPosicion(0, next);
    } catch {
      // no bloquea si falla persistencia
    }

    if (!h1Mostrado) {
      setToastActivo("H1");
      setH1Mostrado(true);
    }

    if (preguntaIdx === 0 && next === 1) {
      setMostrarSeguimos(true);
      setTimeout(() => setMostrarSeguimos(false), 300);
    }

    setPreguntaIdx(next);
    setFeedback(null);
  };

  const onContextoFirstExpand = () => {
    if (!h2Mostrado) {
      setToastActivo("H2");
      setH2Mostrado(true);
    }
  };

  const toastTexto =
    toastActivo === "H1" || toastActivo === "H2"
      ? online
        ? "Avance guardado."
        : "Guardado aquí. Se sincroniza luego."
      : "";

  const crossfadeDur = reduced ? 0.001 : 0.15;
  const slideDur = reduced ? 0.15 : 0.25;
  const fadeInDur = reduced ? 0.001 : 0.2;

  return (
    <main className="relative z-10 mx-auto max-w-md px-4 pb-32">
      {/* Visual v3: Overlay para atenuar el starfield en S4/S5 */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-noche-950/60 pointer-events-none"
      />

      <ToastHito
        hito={toastActivo ?? "H1"}
        open={toastActivo !== null}
        texto={toastTexto}
        online={online}
        onClose={() => setToastActivo(null)}
      />

      <div className="flex items-center gap-2 py-4">
        <button
          type="button"
          onClick={volverAlCamino}
          aria-label="Volver al camino"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-noche-800/60 border border-noche-700 text-noche-200 hover:text-alba-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400 focus-visible:ring-offset-2 focus-visible:ring-offset-noche-950"
        >
          ←
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-noche-400">
          Lección {l} · Nivel {n}
        </p>
      </div>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="py-2 text-2xl font-semibold text-alba-400 outline-none"
      >
        {leccion.titulo}
      </h1>

      <ContextoBiblico
        variant={varianteContexto}
        id="ctx-biblico"
        heading="Contexto bíblico"
        cita={citaRVR}
        onFirstExpand={onContextoFirstExpand}
      />

      <div className="mt-3">
        <ProgresoLeccion leccionN={l} nivelX={n} total={3} />
      </div>

      {preguntaIdx === 0 && (
        <div className="mt-6">
          <TarjetaContenido
            titulo={leccion.titulo}
            cuerpo={leccion.introduccion}
          />
        </div>
      )}

      <AnimatePresence>
        {mostrarSeguimos && (
          <motion.p
            key="mc061"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: crossfadeDur }}
            className="mt-4 text-alba-300 text-sm italic"
          >
            Seguimos.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: fadeInDur }}
        className="mt-6 text-alba-400/80 text-xs uppercase tracking-widest font-semibold"
      >
        Responde con calma.
      </motion.p>

      <section className="mt-2 space-y-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-alba-500">
            Reflexión {preguntaIdx + 1} de {totalPreguntas}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={preguntaIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: crossfadeDur }}
          >
            <CheckReflexion
              pregunta={preguntaActual.enunciado}
              opciones={preguntaActual.opciones.map((texto, i) => ({
                id: i,
                texto,
              }))}
              onResponder={onResponder}
            />
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {mostrar062 && (
          <motion.p
            key="mc062"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: slideDur }}
            className="mt-4 text-alba-300 text-sm italic"
          >
            Una pregunta para ti.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mostrar063 && (
          <motion.p
            key="mc063"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: slideDur }}
            className="mt-4 text-reino-300 text-sm italic"
          >
            Tómate tu tiempo.
          </motion.p>
        )}
      </AnimatePresence>

      {feedback && (
        <div className="mt-4 scroll-mb-24">
          <FeedbackReflexion data={feedback} />
        </div>
      )}

      {/* Visual v3 / FALLO 1: Sticky CTA Bar con safe-area */}
      {feedback?.correcto && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-noche-950/80 backdrop-blur-md border-t border-noche-800/50 safe-bottom transition-transform duration-300">
          <div className="mx-auto max-w-md px-4 py-3">
            <Button
              variant="primary"
              fullWidth
              onClick={onSiguientePregunta}
              disabled={finalizando}
            >
              {finalizando
                ? "Guardando…"
                : esUltima
                  ? "Continuar"
                  : "Siguiente reflexión"}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
