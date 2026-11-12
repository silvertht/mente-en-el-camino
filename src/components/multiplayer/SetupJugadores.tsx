import { useState } from "react";
import { Button } from "../Button";
import { JugadorSlot } from "./JugadorSlot";
import { useMultiplayerStore } from "../../store/useMultiplayerStore";
import type { ColorToken } from "../../utils/multiplayerVisual";

const CICLO: readonly ColorToken[] = ["alba", "reino", "vida", "fuego"];

export function SetupJugadores() {
  const jugadores = useMultiplayerStore((s: any) => s.jugadores as any[]);
  const iniciarPartida = useMultiplayerStore((s: any) => s.iniciarPartida);
  const reset = useMultiplayerStore((s: any) => s.resetPartida);
  const [nombre, setNombre] = useState("");

  const agregar = () => {
    if (jugadores.length >= 4 || !nombre.trim()) return;
    iniciarPartida([
      ...jugadores,
      {
        id: crypto.randomUUID(),
        nombre: nombre.trim(),
        icono: "✚",
        colorToken: CICLO[jugadores.length],
        puntuacion: 0,
        fallos: 0,
      },
    ]);
    setNombre("");
  };

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        {jugadores.map((j: any) => (
          <JugadorSlot key={j.id} jugador={j} onRemove={() => reset()} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del jugador"
          className="flex-1 min-h-[44px] rounded-xl bg-noche-800/60 border border-noche-700 px-3 text-noche-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
        />
        <Button
          variant="secondary"
          onClick={agregar}
          disabled={jugadores.length >= 4 || !nombre.trim()}
        >
          Añadir
        </Button>
      </div>
      {jugadores.length < 2 && (
        <p role="status" className="text-alerta-400 text-xs">
          Necesitas al menos 2 jugadores.
        </p>
      )}
      <div className="fixed inset-x-4 bottom-4">
        <Button
          variant="primary"
          fullWidth
          disabled={jugadores.length < 2}
          onClick={() => iniciarPartida(jugadores)}
        >
          Armar partida
        </Button>
      </div>
    </section>
  );
}
