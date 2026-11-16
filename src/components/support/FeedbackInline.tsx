import { useEffect, useState } from "react";

/**
 * FeedbackInline — E7 #3
 * S0/S1/S2/S4 · MC-006/012/017/034 · NO es toast · visible ≤300 ms.
 * A11y: role="status" aria-live="polite".
 */
export interface FeedbackInlineProps {
  texto: string;
  durationMs?: number; // tope duro 300
}

export function FeedbackInline({
  texto,
  durationMs = 300,
}: FeedbackInlineProps) {
  const [visible, setVisible] = useState(true);
  const dur = Math.min(durationMs, 300);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), dur);
    return () => clearTimeout(t);
  }, [texto, dur]);

  if (!visible) return null;
  return (
    <span role="status" aria-live="polite" className="text-vida-400 text-sm">
      {texto}
    </span>
  );
}
