/**
 * EncabezadoMovimiento — D4 / E7 #4
 * S0–S7 · "Llegar" | "Escuchar" | "Responder" | "Llevar"
 * Texto semántico, no decorativo.
 */
export interface EncabezadoMovimientoProps {
  movimiento: "Llegar" | "Escuchar" | "Responder" | "Llevar";
}

export function EncabezadoMovimiento({
  movimiento,
}: EncabezadoMovimientoProps) {
  return (
    <h2 className="text-alba-400/80 text-xs uppercase tracking-widest font-semibold">
      {movimiento}
    </h2>
  );
}
