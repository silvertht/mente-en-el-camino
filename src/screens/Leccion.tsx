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

  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
    iniciarLeccion(sendaId, n, l).catch(() => {});
    return () => {
      abandonarLeccion().catch(() => {});
    };
  }, [sendaId, n, l, iniciarLeccion, abandonarLeccion]);

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

  const onResponder = (idx: number) => {
    const r: ResultadoCheck = responderCheck(0, idx);
    setFeedback({
      correcto: r.correcto,
      respuesta: r.feedback,
      pista: r.pista,
      referencia: r.referencia,
    });
  };

  const onTerminar = async () => {
    await finalizarLeccion();
    onContinuar();
  };

  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="py-4 text-2xl font-semibold text-alba-400 outline-none"
      >
        Lección {l}
      </h1>
      <ProgresoLeccion leccionN={l} nivelX={n} total={3} />
      <div className="mt-6 space-y-4">
        <TarjetaContenido
          titulo={leccion.titulo}
          cuerpo={leccion.introduccion}
        />
      </div>
      <div className="mt-8">
        <CheckReflexion
          pregunta={leccion.preguntas[0].enunciado}
          opciones={leccion.preguntas[0].opciones.map((texto, i) => ({
            id: i,
            texto,
          }))}
          onResponder={onResponder}
        />
      </div>
      {feedback && (
        <div className="mt-4">
          <FeedbackReflexion data={feedback} />
        </div>
      )}
      {feedback?.correcto && (
        <div className="fixed inset-x-4 bottom-4">
          <Button variant="primary" fullWidth onClick={onTerminar}>
            Continuar
          </Button>
        </div>
      )}
    </main>
  );
}
