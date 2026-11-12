import { useEffect, useRef, useState } from "react";
import { useDiscipleshipStore } from "../store/useDiscipleshipStore";
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
  leccionN,
  nivelX,
  total,
  contenido,
  pregunta,
}: any) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const iniciar = useDiscipleshipStore((s: any) => s.iniciarLeccion);
  const responder = useDiscipleshipStore((s: any) => s.responderCheck);
  const finalizar = useDiscipleshipStore((s: any) => s.finalizarLeccion);

  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
    iniciar(leccionId);
  }, [leccionId, iniciar]);

  const onResponder = (idx: number) => {
    const r = responder(leccionId, 0, idx);
    setFeedback({
      correcto: r.correcto,
      respuesta: r.feedback,
      pista: r.pista,
      referencia: r.referencia,
    });
  };

  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="py-4 text-2xl font-semibold text-alba-400 outline-none"
      >
        Lección {leccionN}
      </h1>
      <ProgresoLeccion leccionN={leccionN} nivelX={nivelX} total={total} />
      <div className="mt-6 space-y-4">
        {contenido.map((c: any) => (
          <TarjetaContenido key={c.id} titulo={c.titulo} cuerpo={c.cuerpo} />
        ))}
      </div>
      <div className="mt-8">
        <CheckReflexion
          pregunta={pregunta.texto}
          opciones={pregunta.opciones}
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
          <Button
            variant="primary"
            fullWidth
            onClick={() => finalizar(leccionId)}
          >
            Continuar
          </Button>
        </div>
      )}
    </main>
  );
}
