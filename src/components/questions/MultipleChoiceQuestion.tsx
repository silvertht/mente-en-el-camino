import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { MultipleChoiceQuestion as MCQuestion } from "../../types";

interface Props {
  question: MCQuestion;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function MultipleChoiceQuestion({
  question,
  onAnswer,
  disabled = false,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    lockedRef.current = false;
    setSelected(null);
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (lockedRef.current || disabled || selected !== null) return;
    lockedRef.current = true;
    setSelected(index);
    onAnswer(index);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-6">
        {question.question}
      </h2>

      {question.options.map((option, index) => {
        const isSelected = selected === index;
        const isCorrect = index === question.correctIndex;
        const revealed = selected !== null;

        let bg = "bg-noche-800 hover:bg-noche-700 border-noche-700";
        if (revealed && isCorrect)
          bg = "bg-vida-500 border-vida-400 shadow-lg shadow-vida-500/30";
        else if (revealed && isSelected && !isCorrect)
          bg = "bg-alerta-500 border-alerta-400 shadow-lg shadow-alerta-500/30";
        else if (revealed) bg = "bg-noche-800 border-noche-700 opacity-50";

        return (
          <motion.button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
            disabled={disabled || selected !== null}
            whileHover={selected === null ? { scale: 1.01 } : {}}
            whileTap={selected === null ? { scale: 0.98 } : {}}
            className={[
              "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
              bg,
              selected !== null ? "cursor-default" : "cursor-pointer",
            ].join(" ")}
          >
            <span
              className={[
                "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm",
                revealed && (isCorrect || isSelected)
                  ? "bg-white/25 text-white"
                  : "bg-noche-700 text-slate-300",
              ].join(" ")}
            >
              {LETTERS[index]}
            </span>
            <span className="text-white text-base sm:text-lg font-medium flex-1">
              {option}
            </span>
            {revealed && isCorrect && <span className="text-2xl">✓</span>}
            {revealed && isSelected && !isCorrect && (
              <span className="text-2xl">✗</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
