/**
 * TapToPlace.tsx
 * ---------------------------------------------------------------------------
 * Interacción tap-to-place (sentence builder tipo Duolingo/Kahoot) para
 * preguntas que requieren armar una secuencia:
 *   - `verse-scramble`: ordenar palabras de un versículo.
 *   - `timeline`: ordenar eventos cronológicamente.
 *
 * Reemplaza a `SortableList.tsx` (drag & drop con Motion Reorder) por
 * decisión UX del 2026-09-25:
 *   - Lag táctil en móvil con Motion Reorder.
 *   - Incumple WCAG 2.2 AA · 2.5.7 (Dragging Movements).
 *   - 3 fases (hold + move + release) → 1 toque.
 *
 * CONTRATO:
 *   - `items` viene YA DESORDENADO por el padre (el juego).
 *   - `onAnswer(order)` devuelve una secuencia de índices sobre `items`
 *     (la posición original de cada ítem, en el orden elegido por el usuario).
 *   - NO contiene lógica de negocio. La validación vive en useGameStore.
 *
 * Área: VISUAL. Sin lógica de negocio.
 * ---------------------------------------------------------------------------
 */

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "../Button";

interface TapToPlaceProps {
  /** Ítems en su orden inicial (ya desordenados por el juego). */
  items: string[];
  /** Callback con el orden elegido: índices sobre `items`. */
  onAnswer: (order: number[]) => void;
  /** Texto guía persistente (aria-describedby). */
  hint: string;
  /** Etiqueta del botón de confirmar. */
  submitLabel: string;
  /** Título opcional sobre el hint. Si no se pasa, no se renderiza. */
  title?: string;
  /** Bloquea interacción (tras confirmar o si el padre lo pide). */
  disabled?: boolean;
}

export function TapToPlace({
  items,
  onAnswer,
  hint,
  submitLabel,
  title,
  disabled = false,
}: TapToPlaceProps) {
  const reduceMotion = useReducedMotion();
  const hintId = useId();

  /**
   * Asignación de slots: array de longitud `items.length`.
   *   slotAssignments[i] = índice original sobre `items`, o null si vacío.
   * El orden del array ES el orden visual de los slots (1º, 2º, 3º...).
   */
  const [slotAssignments, setSlotAssignments] = useState<(number | null)[]>(
    () => Array(items.length).fill(null),
  );

  /** Ítems ya colocados en algún slot (para derivar el banco). */
  const placedIndices = useMemo(
    () => new Set(slotAssignments.filter((v): v is number => v !== null)),
    [slotAssignments],
  );

  /** Chips visibles en el banco (todos menos los colocados). */
  const bankItems = useMemo(
    () =>
      items
        .map((text, idx) => ({ text, idx }))
        .filter(({ idx }) => !placedIndices.has(idx)),
    [items, placedIndices],
  );

  const filledCount = slotAssignments.filter((v) => v !== null).length;
  const isComplete = filledCount === items.length;

  /** Mensaje para lectores de pantalla (aria-live). */
  const [liveMessage, setLiveMessage] = useState("");

  /* ── Reset si cambia la pregunta ─────────────────────────────────── */
  useEffect(() => {
    setSlotAssignments(Array(items.length).fill(null));
    setLiveMessage("");
  }, [items]);

  /* ── Handlers ────────────────────────────────────────────────────── */

  const handlePlace = useCallback(
    (originalIndex: number) => {
      if (disabled) return;
      const firstEmpty = slotAssignments.findIndex((v) => v === null);
      if (firstEmpty === -1) return;
      const next = [...slotAssignments];
      next[firstEmpty] = originalIndex;
      setSlotAssignments(next);
      setLiveMessage(
        `${items[originalIndex]} colocada en posición ${firstEmpty + 1} de ${items.length}.`,
      );
    },
    [disabled, slotAssignments, items],
  );

  const handleReturn = useCallback(
    (slotIndex: number) => {
      if (disabled) return;
      const originalIndex = slotAssignments[slotIndex];
      if (originalIndex === null) return;
      const next = [...slotAssignments];
      next[slotIndex] = null;
      setSlotAssignments(next);
      setLiveMessage(`${items[originalIndex]} devuelta al banco.`);
    },
    [disabled, slotAssignments, items],
  );

  const handleConfirm = useCallback(() => {
    if (disabled || !isComplete) return;
    onAnswer(slotAssignments as number[]);
  }, [disabled, isComplete, onAnswer, slotAssignments]);

  /* ── Motion (respeta prefers-reduced-motion) ─────────────────────── */
  const chipMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.92 },
      };

  /* ── Estilos compartidos ─────────────────────────────────────────── */
  const chipBase = [
    "inline-flex items-center justify-center",
    "min-h-11 px-3 py-2", // 44px táctil mínimo
    "rounded-xl text-sm font-medium sm:text-base",
    "transition-colors duration-150",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-alba-400",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-noche-900",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

  /* ── Render ──────────────────────────────────────────────────────── */

  return (
    <div className="space-y-5">
      {/* Anuncio accesible (solo lectores de pantalla) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      {/* Header (título + hint) */}
      <div>
        {title ? (
          <h2 className="text-lg font-semibold text-white/90">{title}</h2>
        ) : null}
        <p
          id={hintId}
          className={
            title
              ? "mt-1 text-xs text-white/60 sm:text-sm"
              : "text-xs text-white/60 sm:text-sm"
          }
        >
          {hint}
        </p>
      </div>

      {/* Zona de construcción (slots) */}
      <div
        role="group"
        aria-label="Zona de construcción del orden"
        aria-describedby={hintId}
        className="flex min-h-[72px] flex-wrap gap-2 rounded-2xl border border-noche-700/60 bg-noche-800/60 p-3"
      >
        {slotAssignments.map((assignedIdx, slotIndex) => (
          <div
            key={`slot-${slotIndex}`}
            className="flex min-h-11 min-w-11 items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              {assignedIdx === null ? (
                <motion.span
                  key={`empty-${slotIndex}`}
                  {...chipMotion}
                  transition={{ duration: 0.12 }}
                  aria-hidden="true"
                  className="flex min-h-11 min-w-11 select-none items-center justify-center rounded-xl border border-dashed border-noche-600 font-mono text-xs text-white/30"
                >
                  {slotIndex + 1}
                </motion.span>
              ) : (
                <motion.button
                  key={`filled-${slotIndex}-${assignedIdx}`}
                  {...chipMotion}
                  transition={{ duration: 0.15 }}
                  type="button"
                  onClick={() => handleReturn(slotIndex)}
                  disabled={disabled}
                  aria-label={`${items[assignedIdx]}. En posición ${slotIndex + 1} de ${items.length}. Activa para devolverla al banco.`}
                  className={`${chipBase} border border-alba-600 bg-alba-500 text-noche-950 hover:bg-alba-400 active:bg-alba-600`}
                >
                  {items[assignedIdx]}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Banco */}
      <div
        role="group"
        aria-label="Banco de ítems disponibles"
        aria-describedby={hintId}
        className="flex min-h-[72px] flex-wrap gap-2 rounded-2xl border border-noche-700/40 bg-noche-900/60 p-3"
      >
        {bankItems.length === 0 ? (
          <p className="self-center px-2 text-xs text-white/40">
            Todos los ítems están colocados.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {bankItems.map(({ text, idx }) => (
              <motion.button
                key={`bank-${idx}`}
                {...chipMotion}
                transition={{ duration: 0.15 }}
                type="button"
                onClick={() => handlePlace(idx)}
                disabled={disabled}
                aria-label={`${text}. Activa para colocarla en el siguiente espacio disponible.`}
                className={`${chipBase} border border-noche-600 bg-noche-700 text-white hover:bg-noche-600 active:bg-noche-800`}
              >
                {text}
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Confirmar */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleConfirm}
        disabled={disabled || !isComplete}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
