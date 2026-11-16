import { useId, useState } from "react";
import { Button } from "../Button";

/**
 * ContextoBiblico — D7 / E7 #1
 * S3 (siempre-visible) · S5/S6 (colapsable)
 * - heading: MC-024 "Contexto bíblico"
 * - cita:    MC-025 "[Libro] [C]:[V] (RVR1960)"
 * - body:    opcional (R6 pendiente). Si vacío → solo cita.
 * A11y: aria-labelledby, aria-expanded, aria-controls, foco visible.
 */
export interface ContextoBiblicoProps {
  variant: "siempre-visible" | "colapsable";
  heading?: string;
  body?: string;
  cita: string;
  defaultExpanded?: boolean;
  id?: string;
}

export function ContextoBiblico({
  variant,
  heading = "Contexto bíblico",
  body,
  cita,
  defaultExpanded = false,
  id = "ctx-biblico",
}: ContextoBiblicoProps) {
  const uid = useId();
  const baseId = `${id}-${uid}`;
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (variant === "siempre-visible") {
    const headingId = `${baseId}-heading`;
    return (
      <section
        aria-labelledby={headingId}
        className="rounded-2xl bg-noche-900/60 border border-noche-700 p-5 space-y-3"
      >
        <h3
          id={headingId}
          className="text-alba-400 text-xs font-semibold uppercase tracking-widest"
        >
          {heading}
        </h3>
        {body ? (
          <p className="text-white/80 text-sm leading-relaxed">{body}</p>
        ) : null}
        <p className="text-alba-200/80 text-sm italic">{cita}</p>
      </section>
    );
  }

  // variant === "colapsable" (S5/S6)
  const btnId = `${baseId}-btn`;
  return (
    <section
      aria-labelledby={btnId}
      className="rounded-2xl bg-noche-900/60 border border-noche-700 overflow-hidden"
    >
      <Button
        id={btnId}
        variant="ghost"
        fullWidth
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={baseId}
        className="justify-between text-left text-alba-400 text-xs font-semibold uppercase tracking-widest"
      >
        <span>{heading}</span>
        <span aria-hidden="true">{expanded ? "▲" : "▼"}</span>
      </Button>
      <div id={baseId} hidden={!expanded} className="px-5 pb-5 pt-1 space-y-2">
        {body ? (
          <p className="text-white/80 text-sm leading-relaxed">{body}</p>
        ) : null}
        <p className="text-alba-200/80 text-sm italic">{cita}</p>
      </div>
    </section>
  );
}
