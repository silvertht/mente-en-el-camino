/**
 * deviceTier.ts
 * ---------------------------------------------------------------------------
 * Detección de capacidad del dispositivo + preferencias de accesibilidad.
 * Área: VISUAL. No contiene lógica de negocio.
 *
 * Señales usadas:
 *   - navigator.hardwareConcurrency  (nº de núcleos lógicos)
 *   - navigator.deviceMemory         (GB de RAM — solo Chromium)
 *   - navigator.connection.saveData  (modo ahorro de datos)
 *   - prefers-reduced-motion         (accesibilidad)
 *
 * Todo es defensivo: si una API no existe, se asume un valor neutro.
 * ---------------------------------------------------------------------------
 */

export type DeviceTier = "low" | "mid" | "high";

export interface VisualConfig {
  /** Nivel detectado del dispositivo */
  tier: DeviceTier;
  /** El usuario pidió reducir movimiento (accesibilidad) */
  reduceMotion: boolean;
  /** El navegador pide ahorro de datos */
  saveData: boolean;
  /** Nº de estrellas a renderizar (0–15) */
  starCount: number;
  /** Nº de blobs de aurora (0–3) */
  auroraBlobs: number;
  /** Mostrar capa de rayos rotatorios */
  showRays: boolean;
  /** Mostrar textura de grano */
  showGrain: boolean;
  /** Activar animaciones CSS */
  animate: boolean;
}

/* -------------------------------------------------------------------------- */
/* Lectura defensiva de APIs                                                  */
/* -------------------------------------------------------------------------- */

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

const isBrowser =
  typeof window !== "undefined" && typeof navigator !== "undefined";

/** Núcleos lógicos. Fallback neutro: 4 (ni premiar ni castigar). */
function readCores(): number {
  if (!isBrowser) return 4;
  const n = navigator.hardwareConcurrency;
  return typeof n === "number" && n > 0 ? n : 4;
}

/** GB de RAM. deviceMemory es solo Chromium → fallback neutro: 4. */
function readMemory(): number {
  if (!isBrowser) return 4;
  const mem = (navigator as NavigatorWithHints).deviceMemory;
  return typeof mem === "number" && mem > 0 ? mem : 4;
}

/** Modo ahorro de datos (Android/Chrome). */
function readSaveData(): boolean {
  if (!isBrowser) return false;
  return Boolean((navigator as NavigatorWithHints).connection?.saveData);
}

/** Preferencia de accesibilidad del sistema. */
export function prefersReducedMotion(): boolean {
  if (!isBrowser || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* -------------------------------------------------------------------------- */
/* Clasificación por tier                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Umbrales acordados con el feedback del test #1:
 *   low  → cores < 4  O  RAM < 4 GB      (o reduce-motion / save-data)
 *   high → cores >= 8 Y  RAM >= 8 GB
 *   mid  → el resto
 */
export function detectDeviceTier(): DeviceTier {
  const cores = readCores();
  const memory = readMemory();

  if (cores < 4 || memory < 4) return "low";
  if (cores >= 8 && memory >= 8) return "high";
  return "mid";
}

/* -------------------------------------------------------------------------- */
/* Mapa de efectos por tier                                                   */
/* -------------------------------------------------------------------------- */

type TierEffects = Omit<VisualConfig, "tier" | "reduceMotion" | "saveData">;

const EFFECTS_BY_TIER: Record<DeviceTier, TierEffects> = {
  // Gama baja: cero animaciones costosas, una sola aurora, sin rayos ni grano.
  low: {
    starCount: 0,
    auroraBlobs: 1,
    showRays: false,
    showGrain: false,
    animate: false,
  },
  // Gama media: 8 estrellas + 2 auroras. Sin rayos (conic-gradient es caro).
  mid: {
    starCount: 8,
    auroraBlobs: 2,
    showRays: false,
    showGrain: true,
    animate: true,
  },
  // Gama alta: la experiencia completa pero contenida (15 estrellas, no 60).
  high: {
    starCount: 15,
    auroraBlobs: 3,
    showRays: true,
    showGrain: true,
    animate: true,
  },
};

/* -------------------------------------------------------------------------- */
/* Construcción y caché                                                       */
/* -------------------------------------------------------------------------- */

function buildVisualConfig(): VisualConfig {
  const tier = detectDeviceTier();
  const reduceMotion = prefersReducedMotion();
  const saveData = readSaveData();
  const effects = EFFECTS_BY_TIER[tier];

  // reduce-motion manda: congela todo lo que se mueva.
  // save-data: degrada a un nivel conservador (sin rayos, sin animación).
  const killMotion = reduceMotion || saveData;

  return {
    tier: killMotion && tier === "high" ? "mid" : tier,
    reduceMotion,
    saveData,
    ...effects,
    animate: killMotion ? false : effects.animate,
    showRays: killMotion ? false : effects.showRays,
    // Con movimiento reducido dejamos estrellas *estáticas* (gratis) para no
    // perder la sensación de cielo nocturno.
    starCount: reduceMotion && effects.starCount === 0 ? 10 : effects.starCount,
    auroraBlobs: Math.min(effects.auroraBlobs, 2),
  };
}

let cachedConfig: VisualConfig | null = null;

/** Devuelve la config visual (cacheada). */
export function getVisualConfig(): VisualConfig {
  if (!cachedConfig) cachedConfig = buildVisualConfig();
  return cachedConfig;
}

/** Recalcula la config (útil si cambia una preferencia en runtime). */
export function refreshVisualConfig(): VisualConfig {
  cachedConfig = buildVisualConfig();
  return cachedConfig;
}

/* -------------------------------------------------------------------------- */
/* Suscripción a cambios de prefers-reduced-motion                            */
/* -------------------------------------------------------------------------- */

/**
 * Escucha cambios en `prefers-reduced-motion` en tiempo real.
 * Devuelve una función de limpieza.
 */
export function watchReduceMotion(onChange: () => void): () => void {
  if (!isBrowser || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => {
    cachedConfig = null; // invalidar caché
    onChange();
  };

  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }

  // Safari antiguo
  mql.addListener(handler);
  return () => mql.removeListener(handler);
}
