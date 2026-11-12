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
    <div className="space-y-4">
      <p className="text-noche-100 text-base">{pregunta}</p>
      <div role="radiogroup" className="space-y-2">
        {opciones.map((o, i) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={sel === i}
            onClick={() => setSel(i)}
            className={`w-full min-h-[44px] rounded-xl px-4 py-3 text-left text-sm
              border transition-colors
              ${
                sel === i
                  ? "bg-alba-400/15 border-alba-400 text-alba-200"
                  : "bg-noche-800/60 border-noche-700 text-noche-100"
              }
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400`}
          >
            {o.texto}
          </button>
        ))}
      </div>
      <Button
        variant="primary"
        fullWidth
        disabled={sel === null}
        onClick={() => sel !== null && onResponder(sel)}
      >
        Responder
      </Button>
    </div>
  );
}
