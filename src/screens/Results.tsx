import { motion } from "motion/react";
import { useGameStore } from "../store/useGameStore";
import { summarizeGame, formatScore } from "../utils/scoring";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { BadgeCard } from "../components/BadgeCard";
import { GradientText } from "../components/GradientText";
import { useCountUp } from "../hooks/useCountUp";
import {
  fadeInUp,
  popIn,
  scaleIn,
  staggerContainer,
} from "../utils/animations";

interface Props {
  onHome: () => void;
  onPlayAgain?: () => void;
  onProfile?: () => void;
}

interface Podium {
  emoji: string;
  label: string;
  ring: string;
  aura: string;
}

function getPodium(accuracy: number, perfect: boolean): Podium {
  if (perfect) {
    return {
      emoji: "🏆",
      label: "Oro perfecto",
      ring: "ring-alba-400",
      aura: "radial-gradient(circle, rgba(255,209,102,0.35) 0%, transparent 70%)",
    };
  }
  if (accuracy >= 80) {
    return {
      emoji: "🥇",
      label: "Oro",
      ring: "ring-alba-400/70",
      aura: "radial-gradient(circle, rgba(255,209,102,0.25) 0%, transparent 70%)",
    };
  }
  if (accuracy >= 60) {
    return {
      emoji: "🥈",
      label: "Plata",
      ring: "ring-reino-400/70",
      aura: "radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 70%)",
    };
  }
  if (accuracy >= 40) {
    return {
      emoji: "🥉",
      label: "Bronce",
      ring: "ring-alba-600/70",
      aura: "radial-gradient(circle, rgba(209,143,30,0.22) 0%, transparent 70%)",
    };
  }
  return {
    emoji: "🌱",
    label: "Semilla",
    ring: "ring-vida-400/60",
    aura: "radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)",
  };
}

function getHeadline(accuracy: number, perfect: boolean): string {
  if (perfect) return "¡Perfecto!";
  if (accuracy >= 80) return "¡Excelente!";
  if (accuracy >= 60) return "¡Muy bien!";
  if (accuracy >= 40) return "¡Bien hecho!";
  return "¡Sigue así!";
}

function getClosingMessage(accuracy: number, perfect: boolean): string {
  if (perfect) return "Hoy no fallaste ni una. Sigue así.";
  if (accuracy >= 80) return "Buen camino. Cada respuesta te acerca.";
  if (accuracy >= 40) return "Vas aprendiendo. Mañana será mejor.";
  return "Lo importante es que volviste. Mañana te espera otra oportunidad.";
}

export function Results({ onHome, onPlayAgain, onProfile }: Props) {
  const game = useGameStore((s) => s.game);
  const newlyUnlockedBadges = useGameStore((s) => s.newlyUnlockedBadges);

  if (!game) return null;

  const summary = summarizeGame(game.answers);
  const podium = getPodium(summary.accuracy, summary.perfect);
  const headline = getHeadline(summary.accuracy, summary.perfect);
  const closingMessage = getClosingMessage(summary.accuracy, summary.perfect);

  const points = useCountUp(summary.totalPoints, 1200);
  const accuracy = useCountUp(summary.accuracy, 1200);

  return (
    <div className="relative min-h-screen text-white p-4 sm:p-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-2xl space-y-6 pb-12 pt-6"
      >
        {/* ── Eyebrow ─────────────────────────────────────────── */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-alba-400/70"
        >
          Resultado
        </motion.p>

        {/* ── Titular ─────────────────────────────────────────── */}
        <motion.h1
          variants={popIn}
          className="text-center text-4xl font-black leading-tight sm:text-5xl"
        >
          <GradientText>{headline}</GradientText>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-center text-sm text-white/60 sm:text-base"
        >
          {summary.correct} de {game.answers.length} correctas
        </motion.p>

        {/* ── Medalla ─────────────────────────────────────────── */}
        <motion.div
          variants={scaleIn}
          className="flex flex-col items-center gap-4 py-2"
        >
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-20 sm:-inset-28"
              style={{ background: podium.aura }}
            />
            <div
              className={[
                "relative flex h-32 w-32 items-center justify-center rounded-full sm:h-40 sm:w-40",
                "bg-gradient-to-b from-white/5 to-transparent",
                "ring-2",
                podium.ring,
              ].join(" ")}
            >
              <span className="text-6xl drop-shadow-[0_0_22px_rgba(255,209,102,0.55)] sm:text-7xl">
                {podium.emoji}
              </span>
            </div>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-alba-400">
            {podium.label}
          </p>
        </motion.div>

        {/* ── Mensaje de cierre (microcopy UX) ─────────────────── */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto max-w-md text-center text-sm italic text-white/70"
        >
          {closingMessage}
        </motion.p>

        {/* ── Stats ───────────────────────────────────────────── */}
        <motion.div variants={fadeInUp}>
          <Card
            variant="elevated"
            className="grid grid-cols-2 gap-x-4 gap-y-6 p-6"
          >
            <Stat
              label="Puntos"
              value={formatScore(points)}
              color="text-alba-400"
            />
            <Stat
              label="Precisión"
              value={`${accuracy}%`}
              color="text-vida-400"
            />
            <Stat
              label="Correctas"
              value={String(summary.correct)}
              color="text-vida-400"
            />
            <Stat
              label="Incorrectas"
              value={String(summary.wrong)}
              color="text-alerta-400"
            />
          </Card>
        </motion.div>

        {/* ── Insignias ───────────────────────────────────────── */}
        {newlyUnlockedBadges.length > 0 && (
          <motion.div variants={fadeInUp}>
            <Card variant="elevated" className="p-6">
              <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-alba-400/70">
                Recompensas
              </p>
              <h2 className="mb-6 text-center text-lg font-bold">
                <GradientText>¡Nuevas insignias!</GradientText>
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-4"
              >
                {newlyUnlockedBadges.map((badge) => (
                  <motion.div key={badge.id} variants={popIn}>
                    <BadgeCard badge={badge} unlocked size="lg" />
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </motion.div>
        )}

        {/* ── Acciones (jerarquía UX) ─────────────────────────── */}
        <motion.div variants={fadeInUp} className="space-y-4 pt-2">
          {onPlayAgain && (
            <Button variant="primary" size="lg" fullWidth onClick={onPlayAgain}>
              🔁 Jugar otra vez
            </Button>
          )}

          {/* Text-links secundarios */}
          <div className="flex items-center justify-center gap-6 text-sm">
            {onProfile && (
              <button
                type="button"
                onClick={onProfile}
                className="font-medium text-reino-400 transition-colors hover:text-reino-300"
              >
                👤 Ver mi bitácora
              </button>
            )}
            <button
              type="button"
              onClick={onHome}
              className="font-medium text-white/50 transition-colors hover:text-white"
            >
              Al inicio
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-alba-400/60">
        {label}
      </p>
      <p className={`text-2xl font-bold tabular-nums sm:text-3xl ${color}`}>
        {value}
      </p>
    </div>
  );
}
