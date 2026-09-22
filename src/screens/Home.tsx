import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useGameStore } from "../store/useGameStore";
import { CATEGORY_LIST } from "../data/categories";
import {
  countQuestionsByCategory,
  pickRandomQuestions,
  pickRandomFromCategory,
} from "../data/questions";
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

const VERSES_OF_DAY = [
  {
    text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    ref: "Salmos 119:105",
  },
  {
    text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
    ref: "Proverbios 3:5",
  },
  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
  {
    text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo.",
    ref: "Josué 10:25",
  },
  {
    text: "Jehová es mi luz y mi salvación; ¿de quién temeré?",
    ref: "Salmos 27:1",
  },
  {
    text: "El que comenzó en vosotros la buena obra, la perfeccionará.",
    ref: "Filipenses 1:6",
  },
  {
    text: "Porque yo sé los pensamientos que tengo acerca de vosotros… pensamientos de paz.",
    ref: "Jeremías 29:11",
  },
];

function getVerseOfDay() {
  return VERSES_OF_DAY[new Date().getDate() % VERSES_OF_DAY.length];
}

export function Home({ onStartGame, onOpenProfile }: Props) {
  const profile = useGameStore((s) => s.profile);
  const startGame = useGameStore((s) => s.startGame);
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const counts = countQuestionsByCategory();
  const verse = getVerseOfDay();

  useEffect(() => {
    getTodayProgress().then((p) => setDailyCompleted(!!p?.completed));
  }, []);

  if (!profile) return null;

  const xpProgress = xpProgressInLevel(profile.xp);
  const totalBadges = profile.badges.length;

  const handleDaily = () => {
    startGame("daily", pickRandomQuestions(10));
    onStartGame();
  };

  const handleCategory = (categoryId: CategoryId) => {
    const questions = pickRandomFromCategory(categoryId, 10);
    if (questions.length === 0) return;
    startGame("campaign", questions);
    onStartGame();
  };

  return (
    <div className="min-h-screen text-white relative">
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="p-5 sm:p-8 max-w-4xl mx-auto pb-20"
      >
        {/* ============ 1. IDENTIDAD ============ */}
        <motion.div
          variants={fadeInUp}
          className="flex items-start justify-between gap-4 mb-8"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-alba-500 animate-pulse-soft" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-alba-500 font-black">
                El camino comienza
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-[1.05] mb-2">
              Mente en el{" "}
              <GradientText shimmer className="inline-block">
                Camino
              </GradientText>
            </h1>
            <p className="text-sm text-slate-400">
              Hola,{" "}
              <span className="text-white font-semibold">
                {profile.nickname}
              </span>{" "}
              <span className="inline-block animate-float">👋</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenProfile}
            aria-label="Abrir perfil"
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center text-3xl border-2 border-alba-500/40 bg-gradient-to-br from-noche-700 to-noche-800 shadow-lg shadow-alba-500/20 hover:border-alba-400 transition-colors flex-shrink-0"
          >
            <span className="absolute inset-0 rounded-full border-2 border-alba-500/30 animate-pulse-soft" />
            <span className="absolute -inset-1 rounded-full bg-alba-500/20 blur-lg opacity-60" />
            <span className="relative">{profile.avatar ?? "🙂"}</span>
          </motion.button>
        </motion.div>

        {/* ============ 2. DESAFÍO DIARIO ============ */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="relative rounded-3xl overflow-hidden border border-alba-500/40 shadow-2xl shadow-alba-500/20">
            {/* Fondo dorado */}
            <div className="absolute inset-0 bg-gradient-to-br from-alba-600 via-alba-500 to-alba-400" />

            {/* Brillo diagonal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60" />

            {/* Rayos giratorios */}
            <div
              className="absolute -top-40 -right-40 w-[500px] h-[500px] opacity-25 animate-rays pointer-events-none"
              aria-hidden
            >
              <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,white_15deg,transparent_30deg,transparent_180deg,white_195deg,transparent_210deg)] rounded-full blur-lg" />
            </div>

            {/* Contenido */}
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌅</span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-noche-900/80 font-black">
                  Desafío del día
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-noche-900 leading-tight mb-2">
                {dailyCompleted
                  ? "¡Ya completaste el día!"
                  : "Recorre 10 preguntas"}
              </h2>
              <p className="text-noche-900/80 text-sm mb-6 font-semibold">
                {dailyCompleted
                  ? "Vuelve mañana para mantener la racha 🔥"
                  : "Mantén tu racha y suma puntos de experiencia"}
              </p>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={handleDaily}
                disabled={dailyCompleted}
                className={[
                  "!font-black uppercase tracking-widest !text-sm",
                  dailyCompleted
                    ? ""
                    : "!bg-noche-950 !text-alba-400 hover:!bg-black",
                ].join(" ")}
              >
                {dailyCompleted ? "✓ Completado hoy" : "→ Comenzar travesía"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ============ 3. BITÁCORA ============ */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-black">
              Bitácora del viajero
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-noche-700 to-transparent" />
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
              label="Insignias"
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

        {/* ============ 4. SENDAS ============ */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Elige tu senda
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Cinco rutas para crecer hoy
              </p>
            </div>
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest hidden sm:block">
              {CATEGORY_LIST.length} rutas
            </span>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {CATEGORY_LIST.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                questionCount={counts[cat.id] ?? 0}
                onClick={handleCategory}
                disabled={(counts[cat.id] ?? 0) === 0}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ============ 5. VERSÍCULO ============ */}
        <motion.div variants={popIn} className="mt-12">
          <div className="relative rounded-2xl p-6 sm:p-7 bg-noche-800/40 backdrop-blur-md border border-noche-700/60 overflow-hidden">
            {/* Brillo superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-alba-500/50 to-transparent" />

            <div className="absolute -top-6 left-5 text-8xl text-alba-500/10 font-serif leading-none select-none">
              "
            </div>

            <p className="relative text-slate-300 italic text-center leading-relaxed mb-3 text-sm sm:text-base">
              {verse.text}
            </p>
            <p className="relative text-center text-[10px] uppercase tracking-[0.3em] text-alba-500 font-black">
              — {verse.ref}
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-[9px] uppercase tracking-[0.4em] text-slate-700 mt-10"
        >
          Mente en el Camino · {new Date().getFullYear()}
        </motion.p>
      </motion.header>
    </div>
  );
}
