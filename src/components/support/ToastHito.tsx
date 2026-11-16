import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * ToastHito — D6 / E7 #2
 * S3/S5/S6 · hitos H1/H2/H3 · 1 toast por evento · no apilable.
 * Offline: MC-051 se pasa como texto por el parent.
 * A11y: role="status" aria-live="polite" aria-atomic="true".
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
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: reduced ? 0.001 : 0.2 }}
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 rounded-2xl bg-noche-800 border border-alba-400/40 px-4 py-3 text-white/90 text-sm flex items-start gap-3 shadow-lg"
        >
          <span
            aria-hidden="true"
            className={online ? "text-alba-400" : "text-alerta-400"}
          >
            {online ? "✓" : "!"}
          </span>
          <span className="flex-1">{texto}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
