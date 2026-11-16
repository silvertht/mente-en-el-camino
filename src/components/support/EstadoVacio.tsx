import { Button } from "../Button";

export interface EstadoVacioProps {
  /** S0 → MC-004 "Tu camino empieza con una lección." · S1 → MC-013 "Aún no hay lecciones aquí. Vuelve pronto." */
  contexto?: "s0" | "s1";
  /** Override explícito del texto. Prioridad sobre `contexto`. */
  mensaje?: string;
  /** CTA opcional (E7 #10: "Texto + CTA, sin dependencia de color"). */
  ctaLabel?: string;
  onCTA?: () => void;
}

export function EstadoVacio({
  contexto,
  mensaje,
  ctaLabel,
  onCTA,
}: EstadoVacioProps) {
  const mensajeFinal =
    mensaje ??
    (contexto === "s1"
      ? "Aún no hay lecciones aquí. Vuelve pronto." // MC-013
      : "Tu camino empieza con una lección."); // MC-004

  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-12 text-center"
    >
      <span aria-hidden="true" className="text-4xl text-noche-500">
        ○
      </span>
      <p className="text-noche-300 text-sm max-w-[28ch]">{mensajeFinal}</p>
      {ctaLabel && onCTA && (
        <Button variant="secondary" onClick={onCTA}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
