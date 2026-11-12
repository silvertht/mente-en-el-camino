import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { EstadoLeccion } from "../../types/discipleship";
import { getVisual, formaClases } from "../../utils/estadoVisual";

const COLOR: Record<EstadoLeccion, string> = {
  sin_empezar: "bg-noche-900 border-noche-500 text-noche-300",
  en_curso: "bg-alba-400/15 border-alba-400 text-alba-300 ring-alba-400/40",
  recorrida: "bg-vida-500 border-vida-400 text-white",
  bloqueado: "bg-noche-700 border-noche-600 text-noche-400",
  repaso: "bg-reino-400/10 border-reino-400 text-reino-300",
};

export type LeccionNodeProps = {
  id: string;
  numero: number;
  titulo: string;
  estado: EstadoLeccion;
  onClick: (id: string) => void;
  index: number;
};

export const LeccionNode = memo(function LeccionNode({
  id,
  numero,
  titulo,
  estado,
  onClick,
  index,
}: LeccionNodeProps) {
  const reduce = useReducedMotion();
  const v = getVisual(estado);
  const disabled = estado === "bloqueado";
  const aria = `Lección ${numero} · ${titulo}, ${estado}`;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-label={aria}
      onClick={() => !disabled && onClick(id)}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : index * 0.04, duration: 0.28 }}
      className={`relative flex min-h-11 min-w-11 items-center justify-center
        w-14 h-14 border-2 ${formaClases[v.forma]} ${COLOR[estado]}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400
        focus-visible:ring-offset-2 focus-visible:ring-offset-noche-950
        disabled:cursor-not-allowed`}
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {estado === "bloqueado"
          ? v.icono
          : estado === "recorrida"
            ? v.icono
            : numero}
      </span>
      {estado === "en_curso" && !reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-alba-400/30"
          animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
});
