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

export function ScoreFeedback({
  correct,
  points,
  question,
  isLastQuestion,
  onNext,
}: ScoreFeedbackProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-noche-950/80 backdrop-blur-md p-4 sm:p-6 pointer-events-auto"
      >
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="relative rounded-3xl overflow-hidden bg-noche-800 border border-noche-700/60 shadow-2xl shadow-black/60">
            {/* Cabecera con gradiente */}
            <div
              className={[
                "relative p-6 text-center overflow-hidden",
                correct
                  ? "bg-gradient-to-br from-vida-400 via-vida-500 to-emerald-700"
                  : "bg-gradient-to-br from-alerta-400 via-alerta-500 to-red-700",
              ].join(" ")}
            >
              {/* Rayos de fondo en aciertos */}
              {correct && (
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)] animate-pulse-soft" />
                </div>
              )}

              <motion.div
                variants={celebrate}
                initial="hidden"
                animate="visible"
                className="relative text-6xl mb-2"
              >
                {correct ? "🎉" : "💭"}
              </motion.div>

              <h2 className="relative text-2xl font-bold text-white drop-shadow">
                {correct ? "¡Correcto!" : "Incorrecto"}
              </h2>

              {correct && points > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative text-noche-900 font-bold text-lg mt-1.5 bg-white/30 backdrop-blur-sm rounded-full px-4 py-1 inline-block"
                >
                  +{points} puntos
                </motion.p>
              )}
            </div>

            {/* Contenido educativo */}
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-alba-400 font-bold mb-1.5">
                  Explicación
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {question.explanation}
                </p>
              </div>

              {question.verse && (
                <div className="bg-noche-900/70 rounded-xl p-4 border-l-4 border-alba-500">
                  <p className="text-xs uppercase tracking-wider text-alba-400 font-bold mb-1.5">
                    {question.verse}
                  </p>
                  {question.verseText && (
                    <p className="text-slate-300 italic text-sm leading-relaxed">
                      "{question.verseText}"
                    </p>
                  )}
                </div>
              )}

              {question.application && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    Aplicación
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {question.application}
                  </p>
                </div>
              )}

              {question.reflection && (
                <div className="bg-reino-600/20 rounded-xl p-4 border border-reino-500/30">
                  <p className="text-xs uppercase tracking-wider text-reino-400 font-bold mb-1.5">
                    Para reflexionar
                  </p>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
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
