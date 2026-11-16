import { Button } from "../Button";

/**
 * CTACalma — E7 #6
 * S3 · MC-026 "Entrar con calma" · aria-label "Entrar a la lección [N] con calma".
 * Estados: normal / pressed / focus / disabled (durante carga).
 * Target ≥44×44 (Button base ya cumple min-h-11).
 */
export interface CTACalmaProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  leccionNumero: number;
}

export function CTACalma({
  onClick,
  disabled = false,
  loading = false,
  leccionNumero,
}: CTACalmaProps) {
  const label = loading ? "Cargando…" : "Entrar con calma";
  const ariaLabel = loading
    ? `Cargando lección ${leccionNumero}`
    : `Entrar a la lección ${leccionNumero} con calma`;

  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className="min-h-11"
    >
      {label}
    </Button>
  );
}
