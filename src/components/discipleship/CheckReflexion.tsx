import { useState } from "react";
import { Button } from "../Button";

export type OpcionCheck = { id: number; texto: string };

export function CheckReflexion({
  pregunta,
  opciones,
  onResponder,
}: {
  pregunta: string;
  opciones: OpcionCheck[];
  onResponder: (opcionIdx: number) => void;
}) {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <p className="text-lg font-medium leading-relaxed text-noche-100">
        {pregunta}
      </p>

      <div role="radiogroup" className="space-y-3">
        {opciones.map((o, i) => {
          const activa = sel === i;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={activa}
              onClick={() => setSel(i)}
              className={`group flex w-full min-h-[56px] items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400 focus-visible:ring-offset-2 focus-visible:ring-offset-noche-950 ${
                activa
                  ? "border-alba-400 bg-alba-400/10"
                  : "border-noche-700 bg-noche-800/60 hover:border-noche-600"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  activa
                    ? "border-alba-400 bg-alba-400 text-noche-950"
                    : "border-noche-600 text-transparent"
                }`}
              >
                ✓
              </span>
              <span
                className={`text-base leading-relaxed ${activa ? "text-alba-200" : "text-noche-100"}`}
              >
                {o.texto}
              </span>
            </button>
          );
        })}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={sel === null}
        onClick={() => sel !== null && onResponder(sel)}
        className="!text-sm !font-black uppercase tracking-widest"
      >
        Responder
      </Button>
    </div>
  );
}
