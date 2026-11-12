import { motion, useReducedMotion } from "motion/react";
import { Button } from "../Button";
import { useMultiplayerStore } from "../../store/useMultiplayerStore";

export function IntersticialPasa({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const jugadores = useMultiplayerStore((s: any) => s.jugadores as any[]);
  const turnoId = useMultiplayerStore((s: any) => s.turnoActualId);
  const actual = jugadores.find((j: any) => j.id === turnoId);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-noche-950/95 px-6"
    >
      <p className="text-noche-100 text-lg text-center">
        Pasa el dispositivo a{" "}
        <strong className="text-alba-400">{actual?.nombre ?? "Jugador"}</strong>
        .
      </p>
      <Button variant="primary" size="lg" fullWidth>
        Estoy listo
      </Button>
      <div className="sr-only">{children}</div>
    </motion.div>
  );
}
