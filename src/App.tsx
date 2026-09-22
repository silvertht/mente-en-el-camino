import { useEffect, useState } from "react";
import { useGameStore } from "./store/useGameStore";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Results } from "./screens/Results";
import { Profile } from "./screens/Profile";

type Screen = "home" | "game" | "results" | "profile";

function App() {
  const init = useGameStore((s) => s.init);
  const profile = useGameStore((s) => s.profile);
  const isLoading = useGameStore((s) => s.isLoading);
  const resetGame = useGameStore((s) => s.resetGame);
  const [screen, setScreen] = useState<Screen>("home");

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading || !profile) {
    return (
      <>
        <AnimatedBackground />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-alba-400 text-lg animate-pulse font-bold tracking-widest uppercase">
            Cargando…
          </p>
        </div>
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
