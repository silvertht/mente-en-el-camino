// SVG serpenteante estático: un solo <path>, sin animación (rendimiento móvil).
export function CaminoPath({
  puntos,
  recorridos,
}: {
  puntos: { x: number; y: number }[];
  recorridos: number;
}) {
  if (puntos.length < 2) return null;
  const d = puntos.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = puntos[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q ${cx} ${prev.y}, ${cx} ${(prev.y + p.y) / 2} Q ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");
  const idx = Math.min(recorridos, puntos.length - 1);
  const corte = puntos[idx];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <path
        d={d}
        fill="none"
        stroke="var(--color-noche-600)"
        strokeWidth="3"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
      {corte && (
        <path
          d={`M ${puntos[0].x} ${puntos[0].y} L ${corte.x} ${corte.y}`}
          fill="none"
          stroke="var(--color-alba-400)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
