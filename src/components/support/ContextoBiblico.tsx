import { useId, useState } from "react";
import { Button } from "../Button";

/**
 * ContextoBiblico — D7 / E7 #1 / H-VIS-07b
 * S3/S4 (siempre-visible) · S5 (colapsable) · S6 (colapsable)
 * C1: si el caller pasa id, se usa LITERAL (responsabilidad del caller garantizar unicidad).
 * D5: onFirstExpand se dispara 1 sola vez, la primera vez que se expande (colapsable).
 * R6: si body vacío → solo cita MC-025.
 */
export interface ContextoBiblicoProps {
  variant: "siempre-visible" | "colapsable";
  heading?: string;
  body?: string;
  cita: string;
  defaultExpanded?: boolean;
  id?: string;
  onFirstExpand?: () => void;
}

export function ContextoBiblico({
  variant,
  heading = "Contexto bíblico",
  body,
  cita,
  defaultExpanded = false,
  id,
  onFirstExpand,
}: ContextoBiblicoProps) {
  const fallbackId = useId();
  const baseId = id ?? `ctx-biblico-${fallbackId}`;
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [hasExpanded, setHasExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && !hasExpanded) {
      setHasExpanded(true);
      onFirstExpand?.();
    }
  };

  if (variant === "siempre-visible") {
    const headingId = `${baseId}-heading`;
    return (
      <section
        id={baseId}
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
        onClick={handleToggle}
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
