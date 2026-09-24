/**
 * SortableList.tsx
 * ---------------------------------------------------------------------------
 * Lista ordenable accesible y reutilizable para `verse-scramble` y `timeline`.
 *
 * Características:
 *   - Drag & drop con ratón y táctil (Motion Reorder).
 *   - Teclado: Tab entre ítems · Space/Enter agarra · flechas mueven ·
 *     Space/Enter suelta · Esc cancela.
 *   - Anuncio accesible (aria-live="polite") al agarrar, mover y soltar.
 *   - Foco inicial en el primer ítem (solo si NO está disabled).
 *   - Hint persistente con `aria-describedby`.
 *   - Estado "agarrado" visible: escala + sombra alba + borde alba-500.
 *   - Respeta `prefers-reduced-motion` (Motion lo hace solo).
 *   - Botón "Confirmar orden" siempre habilitado (orden inicial es válido).
 *
 * Área: VISUAL. Sin lógica de negocio.
 * ---------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import { Reorder } from "motion/react";
import { Button } from "../Button";

interface SortableItem {
  /** Índice original del ítem (identidad estable para Motion). */
  id: number;
  text: string;
}

interface SortableListProps {
  /** Ítems en su orden inicial (ya "desordenados" por el juego). */
  items: string[];
  /** Recibe el orden final como array de índices originales. */
  onSubmit: (order: number[]) => void;
  disabled?: boolean;
  labels: {
    title: string;
    hint: string;
    submitLabel: string;
  };
}

export function SortableList({
  items,
  onSubmit,
  disabled = false,
  labels,
}: SortableListProps) {
  const [order, setOrder] = useState<SortableItem[]>(() =>
    items.map((text, id) => ({ id, text })),
  );
  const [grabbedId, setGrabbedId] = useState<number | null>(null);
  /** Mensaje para lectores de pantalla (aria-live). */
  const [liveMessage, setLiveMessage] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const hintId = useRef(
    `sortable-hint-${Math.random().toString(36).slice(2, 9)}`,
  ).current;

  /* ── Reset si cambia la pregunta ─────────────────────────────────────── */
  useEffect(() => {
    setOrder(items.map((text, id) => ({ id, text })));
    setGrabbedId(null);
    setLiveMessage("");
  }, [items]);

  /* ── Foco programático por id (query DOM, sin refs tipados) ──────────── */
  const focusItem = (id: number) => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-sortable-id="${id}"]`,
    );
    el?.focus();
  };

  /* ── Foco inicial al primer ítem (solo si está habilitado) ───────────── */
  useEffect(() => {
    if (disabled) return;
    const firstId = order[0]?.id;
    if (firstId !== undefined) {
      focusItem(firstId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    onSubmit(order.map((item) => item.id));
  };

  /* ── Teclado: agarre + movimiento + suelta ───────────────────────────── */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    item: SortableItem,
    index: number,
  ) => {
    if (disabled) return;
    const isGrabbed = grabbedId === item.id;

    // Agarrar / soltar
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (isGrabbed) {
        setGrabbedId(null);
        setLiveMessage(
          `${item.text} soltado en posición ${index + 1} de ${order.length}.`,
        );
      } else {
        setGrabbedId(item.id);
        setLiveMessage(
          `${item.text} agarrado. Posición ${index + 1} de ${order.length}. ` +
          "Usa las flechas para mover, espacio para soltar.",
        );
      }
      return;
    }

    if (!isGrabbed) return;

    // Mover arriba
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      const next = [...order];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      setOrder(next);
      setLiveMessage(
        `${item.text} movido a posición ${index} de ${order.length}.`,
      );
      requestAnimationFrame(() => focusItem(item.id));
      return;
    }

    // Mover abajo
    if (e.key === "ArrowDown" && index < order.length - 1) {
      e.preventDefault();
      const next = [...order];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      setOrder(next);
      setLiveMessage(
        `${item.text} movido a posición ${index + 2} de ${order.length}.`,
      );
      requestAnimationFrame(() => focusItem(item.id));
      return;
    }

    // Cancelar agarre
    if (e.key === "Escape") {
      e.preventDefault();
      setGrabbedId(null);
      setLiveMessage(`${item.text} soltado sin mover.`);
    }
  };

  return (
    <div className="space-y-5">
      {/* ── Anuncio accesible (solo lectores de pantalla) ───────────── */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-white/90">{labels.title}</h2>
        <p id={hintId} className="mt-1 text-xs text-white/60 sm:text-sm">
          {labels.hint}
        </p>
      </div>

      {/* ── Lista ordenable ─────────────────────────────────────────── */}
      <Reorder.Group
        as="ul"
        ref={listRef}
        axis="y"
        values={order}
        onReorder={disabled ? () => { } : setOrder}
        layoutScroll
        className="m-0 list-none space-y-2 p-0"
      >
        {order.map((item, index) => {
          const isGrabbed = grabbedId === item.id;
          return (
            <Reorder.Item
              key={item.id}
              value={item}
              as="li"
              data-sortable-id={item.id}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => handleKeyDown(e, item, index)}
              aria-describedby={hintId}
              aria-grabbed={isGrabbed}
              aria-roledescription="Elemento ordenable"
              aria-label={`${item.text}, posición ${index + 1} de ${order.length}`}
              dragListener={!disabled}
              whileDrag={{
                scale: 1.04,
                boxShadow: "0 20px 40px rgba(245,181,68,0.35)",
                borderColor: "#F5B544",
              }}
              className={[
                "relative flex items-center gap-3 rounded-xl border-2 bg-noche-800 p-4 text-white",
                "transition-[border-color,box-shadow,transform] duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-alba-500",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-noche-900",
                isGrabbed
                  ? "scale-[1.02] border-alba-500 shadow-2xl shadow-alba-500/30"
                  : "border-noche-700 hover:border-noche-600",
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-grab active:cursor-grabbing",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="flex-shrink-0 select-none text-lg leading-none text-white/30"
              >
                ≡
              </span>

              <span className="flex-1 text-base sm:text-lg">{item.text}</span>

              <span
                aria-hidden="true"
                className="flex-shrink-0 font-mono text-xs tabular-nums text-white/30"
              >
                {index + 1}
              </span>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {/* ── Submit (siempre habilitado) ─────────────────────────────── */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={disabled}
      >
        {labels.submitLabel}
      </Button>
    </div>
  );
}