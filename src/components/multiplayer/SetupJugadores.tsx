import { useState } from "react";
import { Button } from "../Button";
import { useMultiplayerStore } from "../../store/useMultiplayerStore";
import type { Jugador, ColorToken } from "../../types/multiplayer";

const CICLO: readonly ColorToken[] = ["alba", "reino", "vida", "fuego"];
const ICONOS = ["✚", "✦", "◆", "★"];

export function SetupJugadores() {
  const iniciarPartida = useMultiplayerStore((s) => s.iniciarPartida);
  const [nombre, setNombre] = useState("");
  const [locales, setLocales] = useState<Jugador[]>([]);

  const agregar = () => {
    if (locales.length >= 4 || !nombre.trim()) return;
    setLocales([
      ...locales,
      {
        id: crypto.randomUUID(),
        nombre: nombre.trim(),
        icono: ICONOS[locales.length],
        colorToken: CICLO[locales.length],
        puntuacion: 0,
        fallos: 0,
      },
    ]);
    setNombre("");
  };

  const quitar = (id: string) => setLocales(locales.filter((j) => j.id !== id));

  const armarPartida = () => {
    // Mapeo explícito al tipo que espera el store.
    const inicio: Omit<Jugador, "puntuacion" | "fallos">[] = locales.map(
      (j) => ({
        id: j.id,
        nombre: j.nombre,
        icono: j.icono,
        colorToken: j.colorToken,
      }),
    );
    iniciarPartida(inicio);
  };

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        {locales.map((j) => (
          <div
            key={j.id}
            className="flex items-center gap-3 rounded-2xl border-2 border-noche-700 bg-noche-800/60 p-3"
            aria-label={`Jugador ${j.nombre}`}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-noche-700 text-lg"
              aria-hidden="true"
            >
              {j.icono}
            </span>
            <span className="flex-1 truncate text-sm text-noche-100">
              {j.nombre}
            </span>
            <button
              type="button"
              onClick={() => quitar(j.id)}
              aria-label={`Quitar a ${j.nombre}`}
              className="min-h-11 min-w-11 rounded-full text-noche-300 hover:text-alerta-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del jugador"
          className="min-h-[44px] flex-1 rounded-xl border border-noche-700 bg-noche-800/60 px-3 text-noche-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alba-400"
        />
        <Button
          variant="secondary"
          onClick={agregar}
          disabled={locales.length >= 4 || !nombre.trim()}
        >
          Añadir
        </Button>
      </div>
      {locales.length < 2 && (
        <p role="status" className="text-xs text-alerta-400">
          Necesitas al menos 2 jugadores.
        </p>
      )}
      <div className="fixed inset-x-4 bottom-4">
        <Button
          variant="primary"
          fullWidth
          disabled={locales.length < 2}
          onClick={armarPartida}
        >
          Armar partida
        </Button>
      </div>
    </section>
  );
}
