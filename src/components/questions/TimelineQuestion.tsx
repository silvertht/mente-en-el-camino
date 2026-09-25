/**
 * TimelineQuestion.tsx
 * ---------------------------------------------------------------------------
 * Pregunta tipo `timeline`: ordenar eventos cronológicamente.
 *
 * Área: VISUAL (UI). La validación vive en useGameStore.checkAnswer
 * comparando `selectedOrder` con `question.correctOrder`.
 *
 * Interacción: tap-to-place (TapToPlace) desde 2026-09-25.
 * ---------------------------------------------------------------------------
 */

import type { TimelineQuestion as TLQuestion } from "../../types";
import { TapToPlace } from "./TapToPlace";

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
    <TapToPlace
      items={question.events}
      onAnswer={onAnswer}
      disabled={disabled}
      title="Ordena los eventos"
      hint="Toca un evento y colócalo en su orden. Toca de nuevo para devolverlo."
      submitLabel="Confirmar orden"
      itemGender="m"
    />
  );
}
