import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { WhoSaidItQuestion as WSQuestion } from "../../types";

interface Props {
  question: WSQuestion;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
}

export function WhoSaidItQuestion({
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
    <div className="space-y-6">
      <div className="bg-noche-800/70 rounded-2xl p-6 border border-noche-700 relative overflow-hidden">
        <span className="absolute -top-2 left-6 text-6xl text-alba-500/30 font-serif leading-none select-none">
          "
        </span>
        <p className="text-xs uppercase tracking-wider text-alba-400 font-bold mb-3 pl-4">
          ¿Quién lo dijo?
        </p>
        <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed italic pl-4 pr-2">
          {question.quote}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = index === question.correctIndex;
          const revealed = selected !== null;

          let bg = "bg-noche-800 hover:bg-noche-700 border-noche-700";
          if (revealed && isCorrect)
            bg = "bg-vida-500 border-vida-400 shadow-lg shadow-vida-500/30";
          else if (revealed && isSelected && !isCorrect)
            bg =
              "bg-alerta-500 border-alerta-400 shadow-lg shadow-alerta-500/30";
          else if (revealed) bg = "bg-noche-800 border-noche-700 opacity-50";

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={disabled || selected !== null}
              whileHover={selected === null ? { scale: 1.02 } : {}}
              whileTap={selected === null ? { scale: 0.97 } : {}}
              className={[
                "p-4 rounded-xl border-2 text-white font-semibold text-lg transition-all",
                bg,
                selected !== null ? "cursor-default" : "cursor-pointer",
              ].join(" ")}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
