import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { HintDeductionQuestion as HDQuestion } from "../../types";
import { Button } from "../Button";

interface Props {
  question: HDQuestion;
  onAnswer: (selectedText: string, hintsUsed: number) => void;
  disabled?: boolean;
}

export function HintDeductionQuestion({
  question,
  onAnswer,
  disabled = false,
}: Props) {
  const totalHints = question.hints.length;
  // La primera pista es GRATIS y visible al montar. Solo las siguientes cuestan.
  const initialRevealed = Math.min(1, totalHints);

  const [revealedHints, setRevealedHints] = useState(initialRevealed);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const lockedRef = useRef(false);

  useEffect(() => {
    lockedRef.current = false;
    setRevealedHints(Math.min(1, totalHints));
    setInput("");
    setSubmitted(false);
  }, [question.id, totalHints]);

  const revealNextHint = () => {
    if (lockedRef.current || disabled || submitted) return;
    if (revealedHints < totalHints) {
      setRevealedHints((n) => n + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedRef.current || disabled || submitted || !input.trim()) return;
    lockedRef.current = true;
    setSubmitted(true);
    // Solo se envían al store las pistas PAGADAS (reveladas − 1 gratis).
    onAnswer(input, Math.max(0, revealedHints - 1));
  };

  const allHintsRevealed = revealedHints >= totalHints;
  const hasInput = input.trim().length > 0;
  const isInteractive = !disabled && !submitted;

  // Subtítulo dinámico: recalcar que la primera pista es gratis
  const subtitle = allHintsRevealed
    ? "Todas las pistas reveladas"
    : revealedHints === 1
      ? "Ya tienes una pista gratis. Léela con calma."
      : "Usa las pistas con sabiduría";

  return (
    <div className="space-y-5">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-reino-400 font-bold mb-2">
            Adivina el personaje o concepto
          </p>
          <h2 className="text-lg text-white/70">{subtitle}</h2>
        </div>

        {/* Contador de pistas */}
        <motion.div
          key={revealedHints}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="flex-shrink-0 rounded-full border border-reino-500/30 bg-reino-500/10 px-3 py-1.5"
        >
          <p className="text-xs font-bold tabular-nums text-reino-400">
            {revealedHints} / {totalHints}
          </p>
        </motion.div>
      </div>

      {/* ── Pistas ──────────────────────────────────────────────── */}
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {question.hints.slice(0, revealedHints).map((hint, index) => {
            const isFree = index === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 24, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "relative overflow-hidden rounded-xl border-l-4 bg-noche-800 p-4",
                  isFree ? "border-vida-500" : "border-reino-500",
                ].join(" ")}
              >
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
                  style={{
                    background: isFree
                      ? "linear-gradient(90deg, transparent, rgba(52,211,153,0.18), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(167,139,250,0.20), transparent)",
                  }}
                />
                <div className="relative flex items-start gap-3">
                  <span
                    className={[
                      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isFree
                        ? "bg-vida-500/20 text-vida-400"
                        : "bg-reino-500/20 text-reino-400",
                    ].join(" ")}
                  >
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-white/90">{hint}</p>
                    {isFree && (
                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-vida-400/80 font-black">
                        Pista inicial · gratis
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Botón revelar ──────────────────────────────────────── */}
      {!allHintsRevealed && (
        <motion.div
          whileHover={isInteractive ? { scale: 1.01 } : undefined}
          whileTap={isInteractive ? { scale: 0.99 } : undefined}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={revealNextHint}
            disabled={disabled || submitted}
          >
            💡 Revelar pista ({revealedHints + 1}/{totalHints}) · −5 pts
          </Button>
        </motion.div>
      )}

      {/* ── Formulario ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu respuesta…"
            disabled={disabled || submitted}
            autoComplete="off"
            className={[
              "w-full rounded-xl border-2 bg-noche-800 p-4 pr-10 text-lg text-white",
              "placeholder-white/30 transition-all duration-200",
              "focus:outline-none",
              hasInput ? "border-alba-500/50" : "border-noche-700",
              "focus:border-alba-500",
              "focus:shadow-[0_0_0_4px_rgba(245,181,68,0.15),0_0_30px_-5px_rgba(245,181,68,0.35)]",
              "disabled:opacity-60",
            ].join(" ")}
          />

          <AnimatePresence>
            {hasInput && isInteractive && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-alba-400"
                aria-hidden="true"
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={disabled || submitted || !hasInput}
        >
          {submitted ? "✓ Enviado" : "Confirmar respuesta"}
        </Button>
      </form>
    </div>
  );
}
