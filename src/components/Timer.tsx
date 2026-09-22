import { useEffect, useState } from "react";
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

export function Timer({
  seconds,
  onTimeUp,
  paused = false,
  size = "md",
}: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (paused || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, remaining, onTimeUp]);

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
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  return elapsed;
}
