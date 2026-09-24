/**
 * Modal.tsx
 * ---------------------------------------------------------------------------
 * Modal base con accesibilidad completa:
 *   - role="dialog" + aria-modal + aria-labelledby
 *   - Focus trap real (Tab/Shift+Tab ciclan dentro)
 *   - Focus inicial al primer interactivo (o al ref pasado)
 *   - Restaurar foco al elemento que lo abrió
 *   - Bloqueo de scroll del body con cleanup
 *   - Cierre con ESC (siempre) y click en overlay (configurable)
 *   - Respeta prefers-reduced-motion
 *   - Mobile-first: bottom-sheet en <640px, centrado en desktop
 *
 * Área: VISUAL. Sin lógica de negocio.
 * ---------------------------------------------------------------------------
 */

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** Si true, click en overlay NO cierra (para ConfirmDialog destructivo). */
  disableOverlayClose?: boolean;
  /** Elemento que debe recibir el foco inicial. Si no se pasa, el primer focusable. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  disableOverlayClose = false,
  initialFocusRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useRef(
    `modal-title-${Math.random().toString(36).slice(2, 9)}`,
  ).current;
  const reduceMotion = useReducedMotion();

  /* ── Guardar foco previo + restaurarlo al cerrar ────────────────────── */
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [open]);

  /* ── Bloquear scroll del body ───────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* ── Focus inicial + focus trap ─────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus inicial en el siguiente frame (los elementos deben existir ya)
    const raf = requestAnimationFrame(() => {
      const target =
        initialFocusRef?.current ??
        dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      target?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC siempre cierra
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !active || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !active || !dialog.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, initialFocusRef]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          role="presentation"
        >
          {/* ── Overlay ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.001 : 0.18 }}
            onClick={disableOverlayClose ? undefined : onClose}
            className="absolute inset-0 bg-noche-950/80"
            aria-hidden="true"
          />

          {/* ── Panel ───────────────────────────────────────────────── */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
            }
            transition={{
              duration: reduceMotion ? 0.001 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "relative flex w-full max-w-lg flex-col overflow-hidden",
              "max-h-[90vh]",
              "rounded-t-3xl border border-white/5 bg-noche-800",
              "shadow-2xl shadow-black/60",
              "sm:mx-4 sm:rounded-3xl",
            ].join(" ")}
          >
            {/* Header */}
            <div className="px-6 pb-4 pt-6">
              <h2
                id={titleId}
                className="text-center text-xl font-bold text-white sm:text-2xl"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-center text-sm text-white/60">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Body (scrollable) */}
            {children && (
              <div className="overflow-y-auto px-6 pb-4">{children}</div>
            )}

            {/* Footer */}
            {footer && (
              <div className="space-y-2 border-t border-white/5 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
