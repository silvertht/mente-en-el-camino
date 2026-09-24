/**
 * AnimatedBackground.tsx
 * ---------------------------------------------------------------------------
 * Fondo animado "Noche y Alba".
 *
 * Optimizado tras el feedback del test #1 (rendimiento en móviles gama baja):
 *   - 60 estrellas → máx. 15 (según tier del dispositivo)
 *   - Sin `backdrop-blur` ni `filter: blur()` → radial-gradients nativos
 *   - Solo se animan `transform` y `opacity` (GPU-friendly)
 *   - Respeta `prefers-reduced-motion` y `save-data`
 *   - Contención de pintura (`contain: paint`)
 *
 * Área: VISUAL. Sin lógica de negocio.
 * ---------------------------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import {
  getVisualConfig,
  refreshVisualConfig,
  watchReduceMotion,
  type VisualConfig,
} from "../utils/deviceTier";

/* -------------------------------------------------------------------------- */
/* Datos estáticos                                                            */
/* -------------------------------------------------------------------------- */

interface AuroraBlob {
  color: string;
  x: string;
  y: string;
  size: string;
  duration: number;
  delay: number;
}

// Paleta Noche y Alba: reino-500, alba-500, vida-500
const AURORA_BLOBS: AuroraBlob[] = [
  {
    color: "rgba(124, 58, 237, 0.30)", // reino-500
    x: "14%",
    y: "6%",
    size: "62vmax",
    duration: 26,
    delay: 0,
  },
  {
    color: "rgba(245, 181, 68, 0.16)", // alba-500
    x: "82%",
    y: "24%",
    size: "50vmax",
    duration: 32,
    delay: -8,
  },
  {
    color: "rgba(16, 185, 129, 0.12)", // vida-500
    x: "46%",
    y: "92%",
    size: "56vmax",
    duration: 38,
    delay: -16,
  },
];

const STAR_TINTS = [
  "rgba(255, 255, 255, 0.92)",
  "rgba(255, 209, 102, 0.90)", // alba-400
  "rgba(167, 139, 250, 0.85)", // reino-400
];

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/* -------------------------------------------------------------------------- */
/* Generación determinista de estrellas                                       */
/* -------------------------------------------------------------------------- */

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  tint: string;
}

const PHI = 0.61803398875;
const R2 = 0.7548776662;

/**
 * Secuencia de baja discrepancia (tipo espiral áurea): parece aleatoria
 * pero es 100% estable entre renders → sin parpadeos ni re-layouts.
 */
function buildStars(count: number): Star[] {
  if (count <= 0) return [];
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const x = ((i * PHI) % 1) * 100;
    const y = ((i * R2) % 1) * 100;
    const size = i % 5 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2;
    // delay negativo = la animación ya está en curso → nunca arrancan sincronizadas
    const delay = -((i * 0.53) % 5);
    const duration = 2.8 + ((i * 7) % 18) / 10;

    stars.push({
      id: i,
      x,
      y,
      size,
      delay,
      duration,
      tint: STAR_TINTS[i % STAR_TINTS.length],
    });
  }

  return stars;
}

/* -------------------------------------------------------------------------- */
/* Componente                                                                 */
/* -------------------------------------------------------------------------- */

export function AnimatedBackground() {
  const [config, setConfig] = useState<VisualConfig>(() => getVisualConfig());

  // Reacciona si el usuario cambia "reducir movimiento" con la app abierta.
  useEffect(
    () => watchReduceMotion(() => setConfig(refreshVisualConfig())),
    [],
  );

  const { animate, reduceMotion, tier } = config;
  const stars = useMemo(() => buildStars(config.starCount), [config.starCount]);
  const blobs = useMemo(
    () => AURORA_BLOBS.slice(0, config.auroraBlobs),
    [config.auroraBlobs],
  );

  const isHighEnd = tier === "high";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-noche-950"
      style={{ contain: "paint" }}
    >
      {/* ── 1. Gradiente base (estático, coste ~0) ───────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #131A2B 0%, #0B0F1A 48%, #060912 100%)",
        }}
      />

      {/* ── 2. Aurora: radial-gradients suaves, SIN blur ─────────────────── */}
      {blobs.map((b, i) => (
        <div
          key={`aurora-${i}`}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            // `translate` (propiedad independiente) centra el blob;
            // `transform` queda libre para la animación → no se pisan.
            translate: "-50% -50%",
            background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, transparent 68%)`,
            animation: animate
              ? `float ${b.duration}s ease-in-out ${b.delay}s infinite`
              : undefined,
            willChange: animate ? "transform" : undefined,
          }}
        />
      ))}

      {/* ── 3. Rayos: solo gama alta (conic-gradient es caro) ────────────── */}
      {config.showRays && (
        <div
          className="absolute"
          style={{
            inset: "-30%",
            background:
              "conic-gradient(from 0deg at 50% 50%," +
              "transparent 0deg, rgba(245,181,68,0.07) 11deg, transparent 23deg," +
              "transparent 58deg, rgba(124,58,237,0.06) 70deg, transparent 82deg," +
              "transparent 138deg, rgba(245,181,68,0.05) 150deg, transparent 162deg," +
              "transparent 360deg)",
            animation: animate ? "rays 70s linear infinite" : undefined,
            willChange: animate ? "transform" : undefined,
          }}
        />
      )}

      {/* ── 4. Estrellas: máx. 15, solo opacity ──────────────────────────── */}
      {stars.map((s) => (
        <span
          key={`star-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.tint,
            // El glow (box-shadow) solo en gama alta: es paint costoso.
            boxShadow: isHighEnd
              ? `0 0 ${s.size * 3}px rgba(255, 209, 102, 0.45)`
              : undefined,
            opacity: animate ? undefined : 0.75,
            animation: animate
              ? `pulse-soft ${s.duration}s ease-in-out ${s.delay}s infinite`
              : undefined,
            willChange: animate ? "opacity" : undefined,
          }}
        />
      ))}

      {/* ── 5. Grano: SVG estático, se rasteriza una sola vez ────────────── */}
      {config.showGrain && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: GRAIN_URL,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
            opacity: reduceMotion ? 0.02 : 0.035,
          }}
        />
      )}

      {/* ── 6. Viñeta (estática) ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 85% at 50% 45%, transparent 42%, rgba(6,9,18,0.88) 100%)",
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
