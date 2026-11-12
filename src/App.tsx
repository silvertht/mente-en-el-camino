import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { useGameStore } from "./store/useGameStore";
import { useDiscipleshipStore } from "./store/useDiscipleshipStore";
import { hasCompletedOnboarding } from "./db/database";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { HomeSkeleton } from "./components/Skeleton";
import { GradientText } from "./components/GradientText";
import { EstadoCarga } from "./components/support/EstadoCarga";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Results } from "./screens/Results";
import { Profile } from "./screens/Profile";
import { Onboarding } from "./screens/Onboarding";

// Lazy: las 4 pantallas de Fase 5 salen del bundle principal.
const ElCamino = lazy(() =>
  import("./screens/ElCamino").then((m) => ({ default: m.ElCamino })),
);
const Leccion = lazy(() =>
  import("./screens/Leccion").then((m) => ({ default: m.Leccion })),
);
const CierreLeccion = lazy(() =>
  import("./screens/CierreLeccion").then((m) => ({ default: m.CierreLeccion })),
);
const JugarEnGrupo = lazy(() =>
  import("./screens/JugarEnGrupo").then((m) => ({ default: m.JugarEnGrupo })),
);

type Screen =
  | "home"
  | "game"
  | "results"
  | "profile"
  | "elcamino"
  | "leccion"
  | "cierre"
  | "grupo";

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
  const isLoadingQuestions = useGameStore((s) => s.isLoadingQuestions);
  const resetGame = useGameStore((s) => s.resetGame);

  const initProgreso = useDiscipleshipStore((s) => s.initProgreso);
  const loadDiscipleship = useDiscipleshipStore(
    (s) => s.loadDiscipleshipContent,
  );

  const [screen, setScreen] = useState<Screen>("home");
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);
  const [leccionActiva, setLeccionActiva] = useState<string | null>(null);

  useEffect(() => {
    init();
    initProgreso().catch(() => {});
    loadDiscipleship().catch(() => {});
  }, [init, initProgreso, loadDiscipleship]);

  useEffect(() => {
    hasCompletedOnboarding()
      .then(setOnboardingDone)
      .catch(() => setOnboardingDone(true));
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
    setLeccionActiva(null);
    setScreen("home");
  };

  const onSiguienteLeccion = () => {
    if (!leccionActiva) {
      setScreen("elcamino");
      return;
    }
    const [s, n, l] = leccionActiva.split(":");
    const nextL = Number(l) + 1;
    if (nextL <= 3) {
      setLeccionActiva(`${s}:${n}:${nextL}`);
      setScreen("leccion");
      return;
    }
    const nextN = Number(n) + 1;
    if (nextN <= 3) {
      setLeccionActiva(`${s}:${nextN}:1`);
      setScreen("leccion");
      return;
    }
    setLeccionActiva(null);
    setScreen("elcamino");
  };

  return (
    <>
      <AnimatedBackground />

      {isLoadingQuestions && (
        <div className="fixed inset-0 z-50 bg-noche-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-alba-500 border-t-transparent rounded-full animate-spin" />
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
          onOpenCamino={() => setScreen("elcamino")}
          onOpenGrupo={() => setScreen("grupo")}
        />
      )}

      {screen === "elcamino" && (
        <Suspense fallback={<EstadoCarga />}>
          <ElCamino
            onSelectLeccion={(id) => {
              setLeccionActiva(id);
              setScreen("leccion");
            }}
          />
        </Suspense>
      )}
      {screen === "leccion" && leccionActiva && (
        <Suspense fallback={<EstadoCarga />}>
          <Leccion
            leccionId={leccionActiva}
            onContinuar={() => setScreen("cierre")}
            onVolver={() => setScreen("elcamino")}
          />
        </Suspense>
      )}
      {screen === "cierre" && leccionActiva && (
        <Suspense fallback={<EstadoCarga />}>
          <CierreLeccion
            leccionId={leccionActiva}
            onSiguiente={onSiguienteLeccion}
            onVolver={() => {
              setLeccionActiva(null);
              setScreen("elcamino");
            }}
          />
        </Suspense>
      )}
      {screen === "grupo" && (
        <Suspense fallback={<EstadoCarga />}>
          <JugarEnGrupo onBack={goHome} />
        </Suspense>
      )}
    </>
  );
}

export default App;
