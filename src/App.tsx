import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useGameStore } from "./store/useGameStore";
import { hasCompletedOnboarding } from "./db/database"; // A2: Import real
import { AnimatedBackground } from "./components/AnimatedBackground";
import { HomeSkeleton } from "./components/Skeleton";
import { GradientText } from "./components/GradientText"; // Para el Splash
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Results } from "./screens/Results";
import { Profile } from "./screens/Profile";
import { Onboarding } from "./screens/Onboarding";

type Screen = "home" | "game" | "results" | "profile";

// Componente Splash local (A2: NUNCA null/blanco)
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
  const resetGame = useGameStore((s) => s.resetGame);

  const [screen, setScreen] = useState<Screen>("home");

  // A2: Estado asíncrono del gate
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    init();
  }, [init]);

  // A2: Verificación de Dexie con Fail-Open
  useEffect(() => {
    hasCompletedOnboarding()
      .then(setOnboardingDone)
      .catch(() => {
        console.warn("hasCompletedOnboarding falló; fail-open a Home");
        setOnboardingDone(true); // Fail-open a Home con RATING_INITIAL
      });
  }, []);

  // 1. Carga inicial del Store
  if (isLoading || !profile) {
    return (
      <>
        <AnimatedBackground />
        <HomeSkeleton />
      </>
    );
  }

  // 2. Espera de la lectura asíncrona de Onboarding
  if (onboardingDone === null) {
    return (
      <>
        <AnimatedBackground />
        <Splash />
      </>
    );
  }

  // 3. Gate: Si no ha completado el onboarding, se muestra la pantalla
  if (!onboardingDone) {
    return (
      <>
        <AnimatedBackground />
        <Onboarding onComplete={() => setOnboardingDone(true)} />
      </>
    );
  }

  // 4. Routing normal de la app (intacto)
  const goHome = () => {
    resetGame();
    setScreen("home");
  };

  return (
    <>
      <AnimatedBackground />
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
