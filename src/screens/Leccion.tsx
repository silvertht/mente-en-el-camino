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
import { ContextoBiblico } from "../components/support/ContextoBiblico";
import { ToastHito } from "../components/support/ToastHito";
import { FeedbackInline } from "../components/support/FeedbackInline";
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

  // D5/D6: un solo estado para H1/H2 (anti-apilamiento, 1 toast por evento)
  const [toastActivo, setToastActivo] = useState<"H1" | "H2" | null>(null);
  const [h1Mostrado, setH1Mostrado] = useState(false);
  const [h2Mostrado, setH2Mostrado] = useState(false);

  // D3: FeedbackInline MC-034 (Bien. Sigamos.) al cambiar pregunta
  const [mostrarFeedback034, setMostrarFeedback034] = useState(false);
  const [feedback034Key, setFeedback034Key] = useState(0);

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
        <EstadoCarga contexto="s4" />
      </main>
    );
  }

  const totalPreguntas = leccion.preguntas.length;
  const esUltima = preguntaIdx >= totalPreguntas - 1;
  const preguntaActual = leccion.preguntas[preguntaIdx];

  // D1: S3 (preguntaIdx=0) → siempre-visible. S5 (preguntaIdx>0) → colapsable.
  const varianteContexto = preguntaIdx === 0 ? "siempre-visible" : "colapsable";

  // MC-025: cita RVR1960 (defensivo: no duplicar si ya tiene (RVR1960))
  const citaRVR = preguntaActual.referenciaRVR1960.includes("RVR1960")
    ? preguntaActual.referenciaRVR1960
    : `${preguntaActual.referenciaRVR1960} (RVR1960)`;

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
      // no bloquea si falla persistencia
    }

    // C6: H1 trigger = mismo evento que toast manual anterior (guardado de avance).
    // Frecuencia: 1 vez por lección.
    if (!h1Mostrado) {
      setToastActivo("H1");
      setH1Mostrado(true);
    }

    // D3: FeedbackInline MC-034
    setMostrarFeedback034(true);
    setFeedback034Key((k) => k + 1);

    setPreguntaIdx(next);
    setFeedback(null);
  };

  // D5: H2 trigger = primera expansión del ContextoBiblico colapsable
  const onContextoFirstExpand = () => {
    if (!h2Mostrado) {
      setToastActivo("H2");
      setH2Mostrado(true);
    }
  };

  const toastTexto =
    toastActivo === "H1" || toastActivo === "H2"
      ? online
        ? "Avance guardado. Contexto bíblico visible."
        : "Guardado aquí. Se sincroniza luego."
      : "";

  return (
    <main className="mx-auto max-w-md px-4 pb-40">
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

      {/* D1/C1: ContextoBiblico único, id literal "ctx-biblico" */}
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

      {mostrarFeedback034 && (
        <div className="mt-2">
          <FeedbackInline key={feedback034Key} texto="Bien. Sigamos." />
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
