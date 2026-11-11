import type { CategoryId } from "../../types";
import type {
  SendaDiscipulado,
  LeccionDiscipulado,
} from "../../types/discipleship";

const SENDAS_BY_ID: Partial<Record<CategoryId, SendaDiscipulado>> = {};
let isLoaded = false;
let loadingPromise: Promise<void> | null = null;

// ============================================================
// LAZY LOAD (H-FUN-03 · patrón Fase 4)
// ============================================================

export async function loadDiscipleshipContent(): Promise<void> {
  if (isLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const { SENDA_EVANGELIOS } = await import("./evangelios");
    SENDAS_BY_ID.evangelios = SENDA_EVANGELIOS;
    isLoaded = true;
  })();

  return loadingPromise;
}

export function isDiscipleshipContentLoaded(): boolean {
  return isLoaded;
}

// ============================================================
// HELPERS
// ============================================================

export function getSenda(sendaId: CategoryId): SendaDiscipulado | undefined {
  return SENDAS_BY_ID[sendaId];
}

export function getSendaPiloto(): SendaDiscipulado | undefined {
  return SENDAS_BY_ID.evangelios;
}

export function getLeccion(
  sendaId: CategoryId,
  nivelNumber: 1 | 2 | 3,
  leccionNumber: 1 | 2 | 3,
): LeccionDiscipulado | undefined {
  const senda = SENDAS_BY_ID[sendaId];
  if (!senda) return undefined;
  const nivel = senda.niveles.find((n) => n.nivelNumber === nivelNumber);
  return nivel?.lecciones.find((l) => l.leccionNumber === leccionNumber);
}

export function countLecciones(): number {
  return Object.values(SENDAS_BY_ID).reduce(
    (acc, s) =>
      acc + (s?.niveles.reduce((a, n) => a + n.lecciones.length, 0) ?? 0),
    0,
  );
}
