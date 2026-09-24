/**
 * VerseScrambleQuestion.tsx
 * ---------------------------------------------------------------------------
 * Pregunta tipo `verse-scramble`: ordenar las palabras de un versículo.
 *
 * Área: VISUAL (UI). La validación vive en useGameStore.checkAnswer
 * comparando `selectedOrder` con `question.correctOrder`.
 * ---------------------------------------------------------------------------
 */

import type { VerseScrambleQuestion as VSQuestion } from "../../types";
import { SortableList } from "./SortableList";

interface Props {
  question: VSQuestion;
  onAnswer: (order: number[]) => void;
  disabled?: boolean;
}

export function VerseScrambleQuestion({
  question,
  onAnswer,
  disabled = false,
}: Props) {
  return (
    <SortableList
      items={question.words}
      onSubmit={onAnswer}
      disabled={disabled}
      labels={{
        title: "Ordena las palabras",
        hint: "Arrastra para ordenar. También puedes usar las flechas.",
        submitLabel: "Confirmar orden",
      }}
    />
  );
}
