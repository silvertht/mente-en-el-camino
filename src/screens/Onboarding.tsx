import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useGameStore } from "../store/useGameStore";
import { onboardingQuestions } from "../data/onboardingQuestions";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import type { MultipleChoiceQuestion } from "../types";

interface Props {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: Props) {
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFeedback, setIsFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  // A11y: Foco al heading al cambiar de paso
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  // H-FUN-04: las preguntas son MultipleChoiceQuestion → leer correctIndex.
  const q = onboardingQuestions[step] as MultipleChoiceQuestion;
  const correctAnswer = q.options[q.correctIndex];

  const handleSelect = (option: string) => {
    if (isFeedback) return;
    setSelectedOption(option);
    setResults((prev) => {
      const next = [...prev];
      next[step] = option === correctAnswer;
      return next;
    });
    setIsFeedback(true);
  };

  const handleNext = async () => {
    if (step < 2) {
      setStep((s) => (s + 1) as 0 | 1 | 2);
      setSelectedOption(null);
      setIsFeedback(false);
      setErrorMsg(null);
    } else {
      setIsSubmitting(true);
      try {
        await completeOnboarding(results);
        onComplete();
      } catch (error) {
        console.error("Error en completeOnboarding:", error);
        setErrorMsg("No pudimos guardar tu progreso. Intenta de nuevo.");
        setIsSubmitting(false);
      }
    }
  };

  const isCorrect = selectedOption === correctAnswer;

  return (
    <div className="min-h-screen bg-noche-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card
          variant="bare"
          className="bg-noche-800 border border-noche-700 p-6 shadow-xl"
        >
          {/* Progreso */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Paso {step + 1} de 3
            </p>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i <= step ? "bg-alba-500" : "bg-noche-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Cabecera (Bienvenida solo en Step 0) */}
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-black text-white mb-2 outline-none"
          >
            {step === 0 ? (
              <>
                Te damos la bienvenida al camino.
                <span className="block text-sm font-medium text-slate-300 mt-2">
                  No es un examen. Es tu punto de partida.
                  <br />
                  Tus respuestas ajustan el reto a tu nivel.
                </span>
              </>
            ) : (
              <span className="sr-only">Paso {step + 1}</span>
            )}
          </h2>

          {/* Pregunta */}
          <p className="text-lg text-slate-200 font-medium mb-6">
            {q.question}
          </p>

          {/* Opciones */}
          <div className="space-y-3">
            {(q.options || []).map((opt: string) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={isFeedback || isSubmitting}
                aria-label={`Seleccionar opción: ${opt}`}
                className={`w-full min-h-[44px] p-4 text-left rounded-xl border font-medium transition-colors ${
                  selectedOption === opt
                    ? isCorrect
                      ? "bg-vida-500/20 border-vida-500 text-vida-400"
                      : "bg-alerta-500/20 border-alerta-500 text-alerta-400"
                    : "bg-noche-900/50 border-noche-700 text-slate-200 hover:border-alba-500/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Feedback (A11y: aria-live) */}
          <div aria-live="polite" aria-atomic="true" className="mt-6">
            {isFeedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-noche-900/80 border border-noche-700 rounded-xl"
              >
                <p
                  className={`font-black mb-1 ${
                    isCorrect ? "text-vida-400" : "text-alerta-400"
                  }`}
                >
                  {isCorrect ? "Así es." : "Casi."} {q.verse}
                </p>
                <p className="text-sm text-slate-300">
                  {q.explanation || "Aprendamos juntos."}
                </p>

                {step === 2 && (
                  <p className="mt-4 pt-4 border-t border-noche-700 text-alba-400 font-bold">
                    Todo listo. Tu camino empieza aquí.
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Error de envío */}
          {errorMsg && (
            <p
              className="mt-4 text-sm text-alerta-400 text-center"
              aria-live="assertive"
            >
              {errorMsg}
            </p>
          )}

          {/* Botón Continuar / Comenzar */}
          {isFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleNext}
                disabled={isSubmitting}
                aria-label={
                  step === 2
                    ? "Comenzar tu camino en Selah"
                    : `Continuar al paso ${step + 2}`
                }
              >
                {isSubmitting
                  ? "Guardando..."
                  : step === 2
                    ? "Comenzar"
                    : "Continuar"}
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
