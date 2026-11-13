import { useEffect, useRef, useState } from "react";
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

  const iniciarLeccion = useDiscipleshipStore((s) => s.iniciarLeccion);
  const responderCheck = useDiscipleshipStore((s) => s.responderCheck);
  const finalizarLeccion = useDiscipleshipStore((s) => s.finalizarLeccion);
  const abandonarLeccion = useDiscipleshipStore((s) => s.abandonarLeccion);
  const guardarPosicion = useDiscipleshipStore((s) => s.guardarPosicion);

  const leccionActivaStore = useDiscipleshipStore((s) => s.leccionActiva);

  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [finalizando, setFinalizando] = useState(false);
  const [avanceGuardado, setAvanceGuardado] = useState(false);
  const [iniciando, setIniciando] = useState(true);
  const [errorInicio, setErrorInicio] = useState(false);

  useEffect(() => {
    console.log("🟢 useEffect iniciarLeccion disparado para:", leccionId);
    headingRef.current?.focus();
    setIniciando(true);
    setErrorInicio(false);

    iniciarLeccion(sendaId, n, l)
      .then(() => {
        console.log("✅ iniciarLeccion terminó con éxito");
        setIniciando(false);
      })
      .catch((error) => {
        console.error("🚨 ERROR REAL EN INICIAR LECCION:", error);
        setIniciando(false);
        setErrorInicio(true);
      });

    return () => {
      console.log("🔴 Cleanup: abandonarLeccion disparado");
      abandonarLeccion().catch(console.error);
    };
  }, [sendaId, n, l, iniciarLeccion, abandonarLeccion, leccionId]);

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

  if (!leccion) {
    return (
      <main className="mx-auto max-w-md px-4 pb-32">
        <p className="p-6 text-noche-300">
          No pudimos abrir la lección. Vuelve al camino.
        </p>
        <Button variant="ghost" fullWidth onClick={onVolver}>
          Volver
        </Button>
      </main>
    );
  }

  if (errorInicio) {
    return (
      <main className="mx-auto max-w-md px-4 pb-32">
        <p className="p-6 text-noche-300">
          No pudimos abrir la lección. Reintenta.
        </p>
        <Button variant="ghost" fullWidth onClick={volverAlCamino}>
          Volver al camino
        </Button>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-md px-4 pb-32">
        <EstadoCarga />
      </main>
    );
  }

  const totalPreguntas = leccion.preguntas.length;
  const esUltima = preguntaIdx >= totalPreguntas - 1;
  const preguntaActual = leccion.preguntas[preguntaIdx];

  const onResponder = (opcionIdx: number) => {
    const r: ResultadoCheck = responderCheck(preguntaIdx, opcionIdx, {
      sendaId,
      nivelNumber: n,
      leccionNumber: l,
    });
    setFeedback({
      correcto: r.correcto,
      respuesta: r.feedback,
      pista: r.pista,
      referencia: r.referencia,
      reflexion: r.reflexion,
    });
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
      // no bloquea el avance si falla persistencia
    }
    setPreguntaIdx(next);
    setFeedback(null);
    setAvanceGuardado(true);
    setTimeout(() => setAvanceGuardado(false), 1800);
  };

  return (
    <main className="mx-auto max-w-md px-4 pb-40">
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
      <ProgresoLeccion leccionN={l} nivelX={n} total={3} />

      {avanceGuardado && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 inset-x-4 mx-auto max-w-md rounded-xl border border-vida-500/40 bg-vida-500/15 px-4 py-2 text-sm text-vida-300 shadow-lg shadow-vida-500/10"
        >
          <span aria-hidden="true">✓</span> Avance guardado
        </div>
      )}

      {preguntaIdx === 0 && (
        <div className="mt-6">
          <TarjetaContenido
            titulo={leccion.titulo}
            cuerpo={leccion.introduccion}
          />
        </div>
      )}

      <section className="mt-8 space-y-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-alba-500">
            Reflexión {preguntaIdx + 1} de {totalPreguntas}
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-reino-300/80">
            [UX] Contexto bíblico: {preguntaActual.referenciaRVR1960}
          </span>
        </div>

        <CheckReflexion
          key={preguntaIdx}
          pregunta={preguntaActual.enunciado}
          opciones={preguntaActual.opciones.map((texto, i) => ({
            id: i,
            texto,
          }))}
          onResponder={onResponder}
        />
      </section>

      {feedback && (
        <div className="mt-4">
          <FeedbackReflexion data={feedback} />
        </div>
      )}

      {feedback?.correcto && (
        <div className="fixed inset-x-4 bottom-4 mx-auto max-w-md">
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
      )}
    </main>
  );
}
