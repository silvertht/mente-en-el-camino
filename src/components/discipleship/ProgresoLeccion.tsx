import { ProgressBar } from "../ProgressBar";

export function ProgresoLeccion({
  leccionN,
  nivelX,
  total,
}: {
  leccionN: number;
  nivelX: number;
  total: number;
}) {
  const pct = Math.round((leccionN / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={leccionN}
      aria-label={`Lección ${leccionN} de ${total} en el Nivel ${nivelX}`}
      className="space-y-1"
    >
      <ProgressBar value={pct} />
      <p className="text-xs text-noche-400 tabular-nums">
        {leccionN} / {total}
      </p>
    </div>
  );
}
