import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Question } from "../types";
import { Button } from "./Button";
import { celebrate, popIn } from "../utils/animations";

interface ScoreFeedbackProps {
  correct: boolean;
  points: number;
  question: Question;
  isLastQuestion: boolean;
  onNext: () => void;
}

const CORRECT_TITLES = ["¡Bien!", "¡Exacto!", "¡Así es!", "¡Vas bien!"];
const INCORRECT_TITLES = [
  "Casi.",
  "No era esa.",
  "Uy, pero aprendiste algo.",
  "Sigue, esto enseña.",
];

function getFeedbackTitle(correct: boolean, questionId: string | number) {
  const titles = correct ? CORRECT_TITLES : INCORRECT_TITLES;
  const seed = Array.from(String(questionId)).reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0,
  );
  return titles[seed % titles.length];
}

export function ScoreFeedback({
  correct,
  points,
  question,
  isLastQuestion,
  onNext,
}: ScoreFeedbackProps) {
  const title = getFeedbackTitle(correct, question.id);
  const titleId = useRef(
    `feedback-title-${Math.random().toString(36).slice(2, 9)}`,
  ).current;
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Foco al feedback al aparecer ─────────────────────────────────────
     UX spec punto 5: "el foco se mueve al ScoreFeedback al aparecer".
     Se enfoca el contenedor (tabIndex=-1) para que el lector de pantalla
     lea su contenido y el usuario de teclado pueda Tab al botón "Siguiente". */
  useEffect(() => {
    containerRef.current?.focus();
  }, [question.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 flex items-end justify-center bg-noche-950/80 p-4 pointer-events-auto sm:items-center sm:p-6"
      >
        <motion.div
          ref={containerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-live="polite"
          aria-atomic="true"
          variants={popIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto focus:outline-none"
        >
          <div className="relative overflow-hidden rounded-3xl border border-noche-700/60 bg-noche-800 shadow-2xl shadow-black/60">
            {/* Cabecera con gradiente */}
            <div
              className={[
                "relative overflow-hidden p-6 text-center",
                correct
                  ? "bg-gradient-to-br from-vida-400 via-vida-500 to-emerald-700"
                  : "bg-gradient-to-br from-alerta-400 via-alerta-500 to-red-700",
              ].join(" ")}
            >
              {correct && (
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)] animate-pulse-soft motion-reduce:animate-none" />
                </div>
              )}

              <motion.div
                variants={celebrate}
                initial="hidden"
                animate="visible"
                className="relative mb-2 text-6xl"
                aria-hidden="true"
              >
                {correct ? "🎉" : "💭"}
              </motion.div>

              <h2
                id={titleId}
                className="relative text-2xl font-bold text-white drop-shadow"
              >
                {title}
              </h2>

              {correct && points > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative mt-1.5 inline-block rounded-full bg-white/30 px-4 py-1 text-lg font-bold text-noche-900"
                >
                  +{points} puntos
                </motion.p>
              )}
            </div>

            {/* Contenido educativo */}
            <div className="space-y-4 p-5">
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-alba-400">
                  Por qué
                </p>
                <p className="leading-relaxed text-white/85">
                  {question.explanation}
                </p>
              </div>

              {question.verse && (
                <div className="rounded-xl border-l-4 border-alba-500 bg-noche-900/70 p-4">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-alba-400">
                    {question.verse}
                  </p>
                  {question.verseText && (
                    <p className="text-sm italic leading-relaxed text-white/75">
                      "{question.verseText}"
                    </p>
                  )}
                </div>
              )}

              {question.application && (
                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-white/45">
                    Para tu vida
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">
                    {question.application}
                  </p>
                </div>
              )}

              {question.reflection && (
                <div className="rounded-xl border border-reino-500/30 bg-reino-600/20 p-4">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-reino-400">
                    Para pensar
                  </p>
                  <p className="text-sm italic leading-relaxed text-white/75">
                    {question.reflection}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 pt-0">
              <Button variant="primary" size="lg" fullWidth onClick={onNext}>
                {isLastQuestion ? "Ver resultados →" : "Siguiente pregunta →"}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
