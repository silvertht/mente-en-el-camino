import { motion, useReducedMotion } from "motion/react";

export function IntersticialPasa({
  nombreJugador,
  onContinuar,
}: {
  nombreJugador: string;
  onContinuar: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-noche-950/95 px-6"
    >
      <p className="text-noche-100 text-lg text-center">
        Pasa el dispositivo a{" "}
        <strong className="text-alba-400">{nombreJugador}</strong>.
      </p>
      <button
        type="button"
        onClick={onContinuar}
        className="w-full min-h-[44px] rounded-xl bg-alba-400 text-noche-950 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
      >
        Estoy listo
      </button>
    </motion.div>
  );
}
