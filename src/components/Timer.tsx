import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface TimerProps {
  seconds: number;
  onTimeUp?: () => void;
  paused?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { box: 56, text: "text-lg", stroke: 3 },
  md: { box: 72, text: "text-2xl", stroke: 4 },
  lg: { box: 104, text: "text-4xl", stroke: 5 },
};

/**
 * Countdown basado en timestamps absolutos (Date.now) + rAF.
 *
 * Por qué no `setInterval(fn, 1000)`:
 *  - setInterval acumula drift (~5-15 ms por tick).
 *  - Si el componente padre re-renderiza (nuevo `onTimeUp` inline),
 *    el effect se limpia y reinicia, matando el tick en curso.
 *
 * Esta implementación:
 *  - Calcula `remaining` desde `startRef.current` → exacto sin drift.
 *  - Guarda `onTimeUp` en ref → no reinicia el rAF al cambiar el callback.
 *  - Solo depende de `[paused, seconds]` → estable durante toda la pregunta.
 */
export function Timer({
  seconds,
  onTimeUp,
  paused = false,
  size = "md",
}: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const onTimeUpRef = useRef(onTimeUp);
  const startRef = useRef<number>(Date.now());
  const firedRef = useRef(false);

  // Mantener el callback actualizado SIN que dispare re-runs del rAF
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Reset cuando cambia `seconds` (nueva pregunta / nuevo timeLimit)
  useEffect(() => {
    startRef.current = Date.now();
    firedRef.current = false;
    setRemaining(seconds);
  }, [seconds]);

  // Countdown por rAF — preciso, sin drift, sin retraso inicial
  useEffect(() => {
    if (paused || seconds <= 0) return;

    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const left = Math.max(0, seconds - Math.floor(elapsed / 1000));

      // Solo dispara re-render cuando cambia el segundo (React hace bail-out
      // si el valor es idéntico, así que esto es prácticamente gratis)
      setRemaining(left);

      if (left <= 0) {
        if (!firedRef.current) {
          firedRef.current = true;
          onTimeUpRef.current?.();
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [paused, seconds]);

  const isLow = remaining <= 5;
  const isMid = remaining <= seconds / 2;

  const color = isLow
    ? "#F87171" // alerta-400
    : isMid
      ? "#F5B544" // alba-500
      : "#34D399"; // vida-400

  const { box, text, stroke } = SIZES[size];
  const radius = (box - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = seconds > 0 ? remaining / seconds : 0;
  const dashOffset = circumference * (1 - percent);

  return (
    <motion.div
      animate={isLow ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.6, repeat: isLow ? Infinity : 0 }}
      className="relative flex-shrink-0"
      style={{ width: box, height: box }}
    >
      <svg
        width={box}
        height={box}
        className="absolute inset-0 -rotate-90"
        aria-hidden
      >
        <circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          stroke="#1E2842"
          strokeWidth={stroke}
        />
        <circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
          }}
        />
      </svg>
      <div
        className={[
          "absolute inset-0 flex items-center justify-center font-bold tabular-nums text-white",
          text,
        ].join(" ")}
      >
        {remaining}
      </div>
    </motion.div>
  );
}

/**
 * Segundos transcurridos desde que `active` se volvió true.
 * Usa Date.now() → exacto aunque el interval se retrase.
 * Al desactivarse, vuelve a 0 (para la siguiente pregunta).
 */
export function useElapsedTime(active: boolean): number {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active) {
      setElapsed(0);
      return;
    }
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 250); // 250 ms → display cambia a tiempo real sin drift perceptible
    return () => clearInterval(interval);
  }, [active]);

  return elapsed;
}
