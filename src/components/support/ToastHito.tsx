import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * ToastHito — D6 / E7 #2 / Visual v3 (FALLO 2)
 * Rediseñado como una "pill" flotante discreta y centrada (iOS/Android style).
 * Z-index: 40 (Capa 4). No interfiere con el CTA sticky (Capa 3).
 */
export interface ToastHitoProps {
  hito: "H1" | "H2" | "H3";
  texto: string;
  online: boolean;
  open: boolean;
  onClose?: () => void;
  durationMs?: number;
}

export function ToastHito({
  hito,
  texto,
  online,
  open,
  onClose,
  durationMs = 4000,
}: ToastHitoProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open || !onClose) return;
    const t = setTimeout(onClose, durationMs);
    return () => clearTimeout(t);
  }, [open, onClose, durationMs]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-hito={hito}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: reduced ? 0.001 : 0.2 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 max-w-[90vw] rounded-full bg-noche-900/90 backdrop-blur-sm px-4 py-2 text-white/80 text-xs flex items-center gap-2 shadow-md pointer-events-none truncate"
        >
          <span
            aria-hidden="true"
            className={`text-[10px] ${online ? "text-alba-400" : "text-alerta-400"}`}
          >
            {online ? "✓" : "!"}
          </span>
          <span className="whitespace-nowrap">{texto}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
