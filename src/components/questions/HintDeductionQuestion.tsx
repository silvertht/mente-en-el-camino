import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
  const [revealedHints, setRevealedHints] = useState(0);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const lockedRef = useRef(false);

  useEffect(() => {
    lockedRef.current = false;
    setRevealedHints(0);
    setInput("");
    setSubmitted(false);
  }, [question.id]);

  const revealNextHint = () => {
    if (lockedRef.current || disabled || submitted) return;
    if (revealedHints < question.hints.length) {
      setRevealedHints((n) => n + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedRef.current || disabled || submitted || !input.trim()) return;
    lockedRef.current = true;
    setSubmitted(true);
    onAnswer(input, revealedHints);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-wider text-reino-400 font-bold mb-2">
          Adivina el personaje o concepto
        </p>
        <h2 className="text-lg text-slate-300">
          Pistas disponibles: {question.hints.length - revealedHints} de{" "}
          {question.hints.length}
        </h2>
      </div>

      <div className="space-y-2">
        {question.hints.slice(0, revealedHints).map((hint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-noche-800 rounded-xl p-4 border-l-4 border-reino-500 flex gap-3 items-start"
          >
            <span className="text-reino-400 font-bold flex-shrink-0">
              #{index + 1}
            </span>
            <p className="text-slate-200">{hint}</p>
          </motion.div>
        ))}
      </div>

      {revealedHints < question.hints.length && (
        <Button
          variant="ghost"
          size="sm"
          onClick={revealNextHint}
          disabled={disabled || submitted}
        >
          💡 Revelar pista ({revealedHints + 1}/{question.hints.length}) −5 pts
        </Button>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu respuesta…"
          disabled={disabled || submitted}
          autoComplete="off"
          className={[
            "w-full p-4 rounded-xl bg-noche-800 border-2 border-noche-700",
            "text-white text-lg placeholder-slate-500",
            "focus:outline-none focus:border-alba-500 focus:shadow-lg focus:shadow-alba-500/20 transition-all",
            "disabled:opacity-60",
          ].join(" ")}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={disabled || submitted || !input.trim()}
        >
          {submitted ? "Enviado" : "Confirmar respuesta"}
        </Button>
      </form>
    </div>
  );
}
