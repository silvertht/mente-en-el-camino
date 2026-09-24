/**
 * TimelineQuestion.tsx
 * ---------------------------------------------------------------------------
 * Pregunta tipo `timeline`: ordenar eventos cronológicamente.
 *
 * Área: VISUAL (UI). La validación vive en useGameStore.checkAnswer
 * comparando `selectedOrder` con `question.correctOrder`.
 * ---------------------------------------------------------------------------
 */

import type { TimelineQuestion as TLQuestion } from "../../types";
import { SortableList } from "./SortableList";

interface Props {
  question: TLQuestion;
  onAnswer: (order: number[]) => void;
  disabled?: boolean;
}

export function TimelineQuestion({
  question,
  onAnswer,
  disabled = false,
}: Props) {
  return (
    <SortableList
      items={question.events}
      onSubmit={onAnswer}
      disabled={disabled}
      labels={{
        title: "Ordena los eventos",
        hint: "Arrastra para ordenar. También puedes usar las flechas.",
        submitLabel: "Confirmar orden",
      }}
    />
  );
}
