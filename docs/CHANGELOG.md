### 2026-11-04 — Funcional · Auditoría H-04/H-05 v2 · 8 decisiones del Maestro

- **B1 RESUELTO (Opción B)**: Q3 del onboarding duplicaba per-010 (Elías /
  2 Reyes 2:11). Se cambia Q3 a Alt 1 (Belsasar / Daniel 5:25) con fallback
  Alt 2 (Esteban / Hechos 7:59) o Alt 3 (Gedeón / Jueces 7:7). per-010 intacta.
- **W1 (Opción A)**: completeOnboarding valida userRating antes de calibrar;
  null-guard explícito. calibrateWithResults intacto (R2).
- **W2 (Opción A)**: mock DB en tests, sin fake-indexeddb (no toca package.json).
- **DF-1 (A)**: atomicidad local + in-flight guard.
- **DF-2 (A)**: application/reflection redactados, no visibles en onboarding.
- **DF-3 (A)**: H-04 + H-05 en paralelo (B1 ya decidido).
- **DF-4 (A)**: branch fase4/onboarding-h04-h05 desde 5a1b120.
- **DF-5 (A)**: FUNCIONAL-INTERFACES.md v4 con 3 contratos nuevos.
- **Estado**: Funcional implementa; entrega CHANGELOG-FUNCIONAL.md +
  FUNCIONAL-INTERFACES.md v4 + build/tests/bundle para revisión del Maestro.
