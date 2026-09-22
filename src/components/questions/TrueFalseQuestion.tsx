import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { TrueFalseQuestion as TFQuestion } from "../../types";

interface Props {
  question: TFQuestion;
  onAnswer: (value: boolean) => void;
  disabled?: boolean;
}

export function TrueFalseQuestion({
  question,
  onAnswer,
  disabled = false,
}: Props) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    lockedRef.current = false;
    setSelected(null);
  }, [question.id]);

  const handleSelect = (value: boolean) => {
    if (lockedRef.current || disabled || selected !== null) return;
    lockedRef.current = true;
    setSelected(value);
    onAnswer(value);
  };

  const revealed = selected !== null;

  const options = [
    { value: true, label: "Verdadero", emoji: "✓" },
    { value: false, label: "Falso", emoji: "✗" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-noche-800/70 rounded-2xl p-6 border border-noche-700">
        <p className="text-xs uppercase tracking-wider text-alba-400 font-bold mb-2">
          ¿Verdadero o falso?
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {question.statement}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selected === option.value;
          const isCorrect = option.value === question.correct;

          let bg = "bg-noche-800 hover:bg-noche-700 border-noche-700";
          if (revealed && isCorrect)
            bg = "bg-vida-500 border-vida-400 shadow-lg shadow-vida-500/30";
          else if (revealed && isSelected && !isCorrect)
            bg =
              "bg-alerta-500 border-alerta-400 shadow-lg shadow-alerta-500/30";
          else if (revealed) bg = "bg-noche-800 border-noche-700 opacity-50";

          return (
            <motion.button
              key={String(option.value)}
              type="button"
              onClick={() => handleSelect(option.value)}
              disabled={disabled || selected !== null}
              whileHover={selected === null ? { scale: 1.03 } : {}}
              whileTap={selected === null ? { scale: 0.97 } : {}}
              className={[
                "flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 transition-all",
                bg,
                selected !== null ? "cursor-default" : "cursor-pointer",
              ].join(" ")}
            >
              <span className="text-4xl">{option.emoji}</span>
              <span className="text-white text-lg font-bold">
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
