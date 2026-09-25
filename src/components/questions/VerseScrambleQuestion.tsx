/**
 * VerseScrambleQuestion.tsx
 * ---------------------------------------------------------------------------
 * Pregunta tipo `verse-scramble`: ordenar las palabras de un versículo.
 *
 * Área: VISUAL (UI). La validación vive en useGameStore.checkAnswer
 * comparando `selectedOrder` con `question.correctOrder`.
 *
 * Interacción: tap-to-place (TapToPlace) desde 2026-09-25.
 * ---------------------------------------------------------------------------
 */

import type { VerseScrambleQuestion as VSQuestion } from "../../types";
import { TapToPlace } from "./TapToPlace";

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
    <TapToPlace
      items={question.words}
      onAnswer={onAnswer}
      disabled={disabled}
      title="Ordena las palabras"
      hint="Toca una palabra y colócala en su orden. Toca de nuevo para devolverla."
      submitLabel="Confirmar orden"
    />
  );
}
