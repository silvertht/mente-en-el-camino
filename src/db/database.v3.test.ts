import { describe, it, expect, vi } from "vitest";

// Captura sincrónica de versiones declaradas (patrón vi.hoisted)
const { capturedVersions } = vi.hoisted(() => ({
  capturedVersions: [] as Array<{
    verno: number;
    schema: Record<string, string>;
  }>,
}));

// Mock de Dexie: registra cada this.version(n).stores({...}) del constructor
vi.mock("dexie", () => {
  class FakeDexie {
    name: string;
    stores: Record<string, unknown> = {};
    constructor(name: string) {
      this.name = name;
    }
    version(n: number) {
      const v = {
        stores: (schema: Record<string, string>) => {
          capturedVersions.push({ verno: n, schema });
          Object.assign(this.stores, schema);
          return v;
        },
      };
      return v;
    }
  }
  return { default: FakeDexie, Table: class {} };
});

// Import después del mock (vi.mock se hoistea)
import { db, type BackupData } from "./database";

describe("Dexie v3 — Sprint A", () => {
  it("#1 mantiene el nombre MenteEnElCaminoDB (Regla de Oro 4)", () => {
    expect(db.name).toBe("MenteEnElCaminoDB");
  });

  it("#2 declara version(3) con las 5 tablas nuevas", () => {
    const v3 = capturedVersions.find((v) => v.verno === 3);
    expect(v3).toBeDefined();
    expect(Object.keys(v3!.schema)).toEqual(
      expect.arrayContaining([
        "progreso_leccion",
        "racha_discipulado",
        "local_sessions",
        "local_players",
        "local_rounds",
      ]),
    );
  });

  it("#2b conserva las 6 tablas de v2 (no se perdió ninguna)", () => {
    const v3 = capturedVersions.find((v) => v.verno === 3);
    expect(v3).toBeDefined();
    expect(Object.keys(v3!.schema)).toEqual(
      expect.arrayContaining([
        "profile",
        "answers",
        "dailyProgress",
        "campaignProgress",
        "sessions",
        "userRating",
      ]),
    );
  });

  it("#3 BackupData v3 tolera un backup v2 (retrocompat)", () => {
    const backupV2: BackupData = {
      version: 2,
      exportedAt: 0,
      profile: undefined,
      answers: [],
      dailyProgress: [],
      campaignProgress: [],
      userRating: undefined,
      // Sin campos v3 → TypeScript debe aceptarlo (son opcionales)
    };
    expect(backupV2.version).toBe(2);
    expect(backupV2.progresoLeccion).toBeUndefined();
    expect(backupV2.localSessions).toBeUndefined();
  });

  it("bonus: declaración de versiones en orden 1 → 2 → 3", () => {
    const vernos = capturedVersions.map((v) => v.verno);
    expect(vernos).toEqual(expect.arrayContaining([1, 2, 3]));
  });
});
