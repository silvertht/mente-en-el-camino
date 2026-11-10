import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useGameStore } from "./store/useGameStore";
import { hasCompletedOnboarding } from "./db/database";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { HomeSkeleton } from "./components/Skeleton";
import { GradientText } from "./components/GradientText";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Results } from "./screens/Results";
import { Profile } from "./screens/Profile";
import { Onboarding } from "./screens/Onboarding";

type Screen = "home" | "game" | "results" | "profile";

function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <GradientText className="text-5xl font-black tracking-tighter">
          Selah
        </GradientText>
      </motion.div>
    </div>
  );
}

function App() {
  const init = useGameStore((s) => s.init);
  const profile = useGameStore((s) => s.profile);
  const isLoading = useGameStore((s) => s.isLoading);
  const isLoadingQuestions = useGameStore((s) => s.isLoadingQuestions); // <- NUEVO
  const resetGame = useGameStore((s) => s.resetGame);

  const [screen, setScreen] = useState<Screen>("home");
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    hasCompletedOnboarding()
      .then(setOnboardingDone)
      .catch(() => {
        console.warn("hasCompletedOnboarding falló; fail-open a Home");
        setOnboardingDone(true);
      });
  }, []);

  if (isLoading || !profile) {
    return (
      <>
        <AnimatedBackground />
        <HomeSkeleton />
      </>
    );
  }

  if (onboardingDone === null) {
    return (
      <>
        <AnimatedBackground />
        <Splash />
      </>
    );
  }

  if (!onboardingDone) {
    return (
      <>
        <AnimatedBackground />
        <Onboarding onComplete={() => setOnboardingDone(true)} />
      </>
    );
  }

  const goHome = () => {
    resetGame();
    setScreen("home");
  };

  return (
    <>
      <AnimatedBackground />

      {/* NUEVO: Overlay de carga H-FUN-03 (Noche y Alba) */}
      {isLoadingQuestions && (
        <div className="fixed inset-0 z-50 bg-noche-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-alba-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-alba-400 font-bold animate-pulse text-lg">
              Preparando tu camino...
            </p>
          </div>
        </div>
      )}

      {screen === "game" && (
        <Game onFinish={() => setScreen("results")} onQuit={goHome} />
      )}
      {screen === "results" && <Results onHome={goHome} />}
      {screen === "profile" && <Profile onBack={goHome} />}
      {screen === "home" && (
        <Home
          onStartGame={() => setScreen("game")}
          onOpenProfile={() => setScreen("profile")}
        />
      )}
    </>
  );
}

export default App;
