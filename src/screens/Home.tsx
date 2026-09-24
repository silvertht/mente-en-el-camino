import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useGameStore } from "../store/useGameStore";
import { CATEGORY_LIST } from "../data/categories";
import {
  countQuestionsByCategory,
  pickAdaptiveQuestions,
} from "../data/questions";
import { getTodayPrinciple } from "../data/dailyPrinciples";
import { CategoryCard } from "../components/CategoryCard";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { StatPill } from "../components/StatPill";
import { GradientText } from "../components/GradientText";
import { getTodayProgress } from "../db/database";
import { xpProgressInLevel } from "../utils/scoring";
import { staggerContainer, fadeInUp, popIn } from "../utils/animations";
import type { CategoryId } from "../types";

interface Props {
  onStartGame: () => void;
  onOpenProfile: () => void;
}

export function Home({ onStartGame, onOpenProfile }: Props) {
  const profile = useGameStore((s) => s.profile);
  const startGame = useGameStore((s) => s.startGame);
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);
  const counts = countQuestionsByCategory();

  // Principio del día (rotación determinística por fecha — ver dailyPrinciples.ts)
  const principle = getTodayPrinciple();

  useEffect(() => {
    getTodayProgress().then((p) => setDailyCompleted(!!p?.completed));
  }, []);

  if (!profile) return null;

  const xpProgress = xpProgressInLevel(profile.xp);
  const totalBadges = profile.badges.length;

  const handleDaily = async () => {
    if (loadingGame || dailyCompleted) return;
    setLoadingGame(true);
    try {
      const questions = await pickAdaptiveQuestions(10);
      startGame("daily", questions);
      onStartGame();
    } finally {
      setLoadingGame(false);
    }
  };

  const handleCategory = async (categoryId: CategoryId) => {
    if (loadingGame) return;
    setLoadingGame(true);
    try {
      const questions = await pickAdaptiveQuestions(10, categoryId);
      if (questions.length === 0) return;
      startGame("campaign", questions);
      onStartGame();
    } finally {
      setLoadingGame(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl p-5 pb-20 sm:p-8"
      >
        {/* ============ 1. IDENTIDAD ============ */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex items-start justify-between gap-4"
        >
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-alba-500 animate-pulse-soft motion-reduce:animate-none" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-alba-500">
                El camino comienza
              </p>
            </div>
            <h1 className="mb-1 text-3xl font-black leading-[1.05] sm:text-4xl">
              <GradientText shimmer className="inline-block">
                Selah
              </GradientText>
            </h1>
            <p className="mb-3 text-xs italic tracking-wide text-white/60">
              Pausa. Reflexiona. Aprende.
            </p>
            <p className="text-sm text-white/75">
              {profile.streak > 0 ? (
                <>
                  <span className="font-semibold text-white">
                    {profile.nickname}
                  </span>
                  , llevas{" "}
                  <span className="font-semibold text-fuego-400">
                    {profile.streak}
                  </span>{" "}
                  {profile.streak === 1 ? "día" : "días"} caminando.
                </>
              ) : (
                <>
                  Hola,{" "}
                  <span className="font-semibold text-white">
                    {profile.nickname}
                  </span>
                  . Te esperábamos.{" "}
                  <span className="inline-block animate-float motion-reduce:animate-none">
                    👋
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Avatar — glow sin blur-lg (radial-gradient nativo) */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenProfile}
            aria-label="Abrir perfil"
            className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-alba-500/40 bg-gradient-to-br from-noche-700 to-noche-800 text-3xl shadow-lg shadow-alba-500/20 transition-colors hover:border-alba-400 sm:h-18 sm:w-18"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,181,68,0.30) 0%, transparent 70%)",
              }}
            />
            <span className="absolute inset-0 rounded-full border-2 border-alba-500/30 animate-pulse-soft motion-reduce:animate-none" />
            <span className="relative">{profile.avatar ?? "🙂"}</span>
          </motion.button>
        </motion.div>

        {/* ============ 2. PALABRA PARA HOY ============ */}
        <motion.section
          variants={popIn}
          className="mb-8"
          aria-labelledby="palabra-hoy-titulo"
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              id="palabra-hoy-titulo"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-alba-500"
            >
              Palabra para hoy
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-alba-500/40 to-transparent" />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-noche-700/60 bg-noche-800/60 p-6 sm:p-7">
            {/* Línea dorada superior */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-alba-500/60 to-transparent"
            />

            {/* Comilla decorativa */}
            <div
              aria-hidden="true"
              className="absolute -top-6 left-5 select-none font-serif text-8xl leading-none text-alba-500/10"
            >
              "
            </div>

            {/* Versículo (jerarquía principal) */}
            <p className="relative mb-3 text-center text-sm italic leading-relaxed text-white/90 sm:text-base">
              {principle.text}
            </p>

            {/* Referencia (acento) */}
            <p className="relative mb-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-alba-500">
              — {principle.ref}
            </p>

            {/* Divider sutil */}
            <div className="relative mb-5 h-px bg-gradient-to-r from-transparent via-noche-700 to-transparent" />

            {/* Aplicación y reflexión (jerarquía descendente) */}
            <div className="relative space-y-5">
              <div>
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-alba-500/80">
                  Hoy
                </p>
                <p className="text-sm leading-relaxed text-white/80">
                  {principle.application}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-reino-400/80">
                  Para pensar
                </p>
                <p className="text-sm italic leading-relaxed text-white/65">
                  {principle.reflection}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============ 3. RETO DE HOY ============ */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl border border-alba-500/40 shadow-2xl shadow-alba-500/20">
            {/* Fondo dorado (gradient estático) */}
            <div className="absolute inset-0 bg-gradient-to-br from-alba-600 via-alba-500 to-alba-400" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60" />

            {/* Rayos de sol — conic-gradient ESTÁTICO, sin blur, sin animación
                (antes: 500×500px con blur-lg + animate-rays → carísimo en móvil) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] opacity-15"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, white 15deg, transparent 30deg, transparent 180deg, white 195deg, transparent 210deg)",
              }}
            />

            <div className="relative p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🌅</span>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-noche-900/80">
                  El reto de hoy
                </p>
              </div>

              <h2 className="mb-2 text-2xl font-black leading-tight text-noche-900 sm:text-3xl">
                {dailyCompleted
                  ? "¡Ya completaste el día!"
                  : "Recorre 10 preguntas"}
              </h2>
              <p className="mb-6 text-sm font-semibold text-noche-900/80">
                {dailyCompleted
                  ? "Vuelve mañana para mantener la racha 🔥"
                  : "Un paso más en tu camino."}
              </p>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={handleDaily}
                disabled={dailyCompleted || loadingGame}
                className={[
                  "!text-sm !font-black uppercase tracking-widest",
                  dailyCompleted
                    ? ""
                    : "!bg-noche-950 !text-alba-400 hover:!bg-black",
                ].join(" ")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {loadingGame && (
                    <svg
                      className="h-4 w-4 animate-spin motion-reduce:animate-none"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.25"
                      />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  <span>
                    {dailyCompleted
                      ? "✓ Completado hoy"
                      : loadingGame
                        ? "Preparando…"
                        : "→ Comenzar travesía"}
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ============ 4. BITÁCORA ============ */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Bitácora del viajero
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-noche-700 to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatPill
              icon="⭐"
              label="Nivel"
              value={profile.level}
              color="text-alba-400"
              glowColor="rgba(245,181,68,0.15)"
              onClick={onOpenProfile}
            />
            <StatPill
              icon="🔥"
              label="Racha"
              value={profile.streak}
              suffix="d"
              color="text-fuego-400"
              glowColor="rgba(249,115,22,0.15)"
              onClick={onOpenProfile}
            />
            <StatPill
              icon="🏅"
              label="Medallas"
              value={totalBadges}
              color="text-reino-400"
              glowColor="rgba(124,58,237,0.15)"
              onClick={onOpenProfile}
            />
          </div>

          <div className="mt-5">
            <ProgressBar
              value={xpProgress.current}
              max={xpProgress.needed}
              label={`${xpProgress.current} / ${xpProgress.needed} XP para nivel ${profile.level + 1}`}
              showLabel
            />
          </div>
        </motion.div>

        {/* ============ 5. SENDAS ============ */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                Elige tu senda
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Cinco rutas para crecer hoy
              </p>
            </div>
            <span className="hidden text-[10px] font-mono uppercase tracking-widest text-white/30 sm:block">
              {CATEGORY_LIST.length} rutas
            </span>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={[
              "grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3",
              loadingGame ? "pointer-events-none opacity-60" : "",
            ].join(" ")}
          >
            {CATEGORY_LIST.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                questionCount={counts[cat.id] ?? 0}
                onClick={handleCategory}
                disabled={(counts[cat.id] ?? 0) === 0 || loadingGame}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={fadeInUp}
          className="mt-10 text-center text-[9px] uppercase tracking-[0.4em] text-white/20"
        >
          Selah · {new Date().getFullYear()}
        </motion.p>
      </motion.header>
    </div>
  );
}
