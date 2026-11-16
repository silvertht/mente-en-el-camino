import { ProgressBar } from "../ProgressBar";

/**
 * ProgresoSecundario — E7 #5 / H-VIS-07b
 * S2 → MC-016 "Llevas [N] de [M] lecciones"
 * S4 → MC-031 "Paso [N] de [M]" (NO cableado por D2 en H-VIS-07b)
 * C4: guard defensivo total=0 → no renderiza (evita NaN en ProgressBar).
 */
export interface ProgresoSecundarioProps {
  actual: number;
  total: number;
  contexto: "paso" | "lecciones";
  tituloLeccion?: string;
}

export function ProgresoSecundario({
  actual,
  total,
  contexto,
  tituloLeccion,
}: ProgresoSecundarioProps) {
  if (total <= 0) return null;

  const texto =
    contexto === "paso"
      ? `Paso ${actual} de ${total}`
      : `Llevas ${actual} de ${total} lecciones`;

  const ariaLabel =
    contexto === "paso" && tituloLeccion
      ? `Paso ${actual} de ${total} en la lección ${tituloLeccion}`
      : texto;

  return (
    <div className="space-y-2">
      <p className="text-white/70 text-xs" aria-hidden="true">
        {texto}
      </p>
      <ProgressBar
        value={actual}
        max={total}
        aria-label={ariaLabel}
        showLabel={false}
      />
    </div>
  );
}
