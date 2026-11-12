import { Button } from "../Button";
import { useMultiplayerStore } from "../../store/useMultiplayerStore";

export function DesempatePanel() {
  const reset = useMultiplayerStore((s: any) => s.resetPartida);
  return (
    <section className="space-y-6 text-center">
      <p className="text-2xl text-alba-400 font-semibold">Ambos ganan.</p>
      <Button variant="primary" fullWidth onClick={reset}>
        Otra ronda
      </Button>
    </section>
  );
}
