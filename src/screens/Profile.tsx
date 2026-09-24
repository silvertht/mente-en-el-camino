import { useState } from "react";
import { motion } from "motion/react";
import { useGameStore } from "../store/useGameStore";
import { BADGES } from "../data/badges";
import { BadgeCard } from "../components/BadgeCard";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { GradientText } from "../components/GradientText";
import { BadgeDetailModal } from "../components/BadgeDetailModal";
import { PromptDialog } from "../components/PromptDialog";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { xpProgressInLevel } from "../utils/scoring";
import { resetProfile as resetProfileDB } from "../db/database";
import { useCountUp } from "../hooks/useCountUp";
import { fadeInUp, popIn, staggerContainer } from "../utils/animations";
import type { Badge } from "../types";

interface Props {
  onBack: () => void;
}

export function Profile({ onBack }: Props) {
  const profile = useGameStore((s) => s.profile);
  const setNickname = useGameStore((s) => s.setNickname);
  const init = useGameStore((s) => s.init);

  const [selectedBadge, setSelectedBadge] = useState<{
    badge: Badge;
    unlocked: boolean;
  } | null>(null);
  const [promptOpen, setPromptOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!profile) return null;

  const xp = xpProgressInLevel(profile.xp);
  const unlockedCount = profile.badges.length;
  const totalBadges = BADGES.length;

  const xpTotal = useCountUp(profile.xp, 900);
  const xpCurrent = useCountUp(xp.current, 900);
  const streak = useCountUp(profile.streak, 600);

  const hasEmojiAvatar = Boolean(profile.avatar);
  const initial = profile.nickname.trim().charAt(0).toUpperCase() || "?";

  const handleEditNickname = () => setPromptOpen(true);

  const handlePromptSubmit = async (value: string) => {
    setPromptOpen(false);
    await setNickname(value);
  };

  const handleReset = () => setConfirmOpen(true);

  const handleResetConfirm = async () => {
    setConfirmOpen(false);
    await resetProfileDB();
    await init();
    onBack();
  };

  return (
    <div className="relative min-h-screen text-white p-4 sm:p-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative max-w-3xl mx-auto space-y-5 pt-2 pb-12"
      >
        {/* ── Volver + Título ─────────────────────────────────── */}
        <motion.div variants={fadeInUp} className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-sm font-medium text-white/50 transition-colors hover:text-alba-400"
          >
            ← Volver
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-black">
            Mi bitácora
          </span>
        </motion.div>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <motion.div variants={fadeInUp}>
          <Card
            variant="elevated"
            className="relative overflow-hidden p-6 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,181,68,0.18) 0%, transparent 65%)",
              }}
            />

            <div className="relative flex flex-col items-center gap-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,209,102,0.28) 0%, transparent 70%)",
                  }}
                />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-alba-400 via-alba-600 to-reino-500 p-[2px] sm:h-28 sm:w-28">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-noche-800">
                    {hasEmojiAvatar ? (
                      <span className="text-5xl sm:text-6xl">
                        {profile.avatar}
                      </span>
                    ) : (
                      <span className="text-4xl font-black sm:text-5xl">
                        <GradientText>{initial}</GradientText>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="mb-1 text-2xl font-bold sm:text-3xl">
                  {profile.nickname}
                </h1>
                <button
                  onClick={handleEditNickname}
                  className="text-xs text-alba-400/70 transition-colors hover:text-alba-400"
                >
                  ✏️ Cambiar mi nombre
                </button>
              </div>

              <div className="mt-1 w-full max-w-md">
                <div className="mb-2 flex items-baseline justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-alba-400/70">
                    Nivel {profile.level}
                  </p>
                  <p className="text-xs tabular-nums text-white/50">
                    {xpCurrent} / {xp.needed} XP
                  </p>
                </div>
                <ProgressBar value={xp.current} max={xp.needed} />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Stats rápidas ─────────────────────────────────────── */}
        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3">
          <StatCard
            icon="🔥"
            label="Días seguidos"
            value={streak}
            color="text-fuego-400"
            muted={profile.streak === 0}
          />
          <StatCard
            icon="✨"
            label="XP total"
            value={xpTotal}
            color="text-alba-400"
          />
          <StatCard
            icon="🏅"
            label="Medallas"
            value={`${unlockedCount}/${totalBadges}`}
            color="text-reino-400"
            compact
          />
        </motion.div>

        {/* ── Vitrina ────────────────────────────────────────────── */}
        <motion.div variants={fadeInUp}>
          <Card variant="elevated" className="p-6">
            <div className="mb-1 flex items-baseline justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-alba-400/70">
                Vitrina
              </p>
              <p className="text-xs tabular-nums text-white/40">
                {unlockedCount} / {totalBadges}
              </p>
            </div>
            <h2 className="mb-5 text-lg font-bold">
              <GradientText>Medallas</GradientText>
            </h2>

            {unlockedCount === 0 ? (
              <p className="py-8 text-center text-sm italic text-white/50">
                Aún no tienes medallas. Cada partida te acerca a la primera.
              </p>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4"
              >
                {BADGES.map((badge) => {
                  const unlocked = profile.badges.includes(badge.id);
                  return (
                    <motion.div key={badge.id} variants={popIn}>
                      <BadgeCard
                        badge={badge}
                        unlocked={unlocked}
                        onClick={() => setSelectedBadge({ badge, unlocked })}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* ── Reset ──────────────────────────────────────────────── */}
        <motion.div variants={fadeInUp}>
          <Button variant="danger" size="md" fullWidth onClick={handleReset}>
            Reiniciar progreso
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Modales ────────────────────────────────────────────── */}
      <BadgeDetailModal
        badge={selectedBadge?.badge ?? null}
        unlocked={selectedBadge?.unlocked ?? false}
        onClose={() => setSelectedBadge(null)}
      />
      <PromptDialog
        open={promptOpen}
        initialValue={profile.nickname}
        onSubmit={handlePromptSubmit}
        onCancel={() => setPromptOpen(false)}
      />
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleResetConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  compact = false,
  muted = false,
}: {
  icon: string;
  label: string;
  value: number | string;
  color: string;
  compact?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/5 bg-noche-800/60 p-3 text-center sm:p-4",
        "transition-opacity",
        muted ? "opacity-50" : "",
      ].join(" ")}
    >
      <p className="mb-1 text-lg" aria-hidden="true">
        {icon}
      </p>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <p
        className={[
          "font-bold tabular-nums",
          color,
          compact ? "text-base sm:text-lg" : "text-xl sm:text-2xl",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
