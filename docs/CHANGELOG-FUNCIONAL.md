### 2026-11-04 · Fase 4 · B1 — Protección de usuarios existentes (HOTFIX)

**Bloqueador detectado por el Maestro** (falla del contrato v2, no del área):
`hasCompletedOnboarding` devolvía `false` para usuarios con `userRating`
real pre-Fase 4 pero sin `onboardingCompleted` (campo nuevo). Forzaría
onboarding + recalibración de ELO real (Regla de Oro 1 y 4).

**Fix aplicado** (doble defensa):

- **A · Self-heal en `hasCompletedOnboarding` + `init()`**: nuevo helper
  puro `shouldMigrateOnboarding(profile, rating)`. Se auto-migra el flag
  si `profile.onboardingCompleted === undefined` y `rating.answeredCount > 0`.
  Idempotente. No afecta a usuarios nuevos (`answeredCount === 0`).
  No afecta a perfiles ya decididos (`true`/`false`).
- **B · Guard en `completeOnboarding`**: si `userRating.answeredCount > 0`
  → NO recalibra, solo marca `onboardingCompleted = true`. Belt & suspenders.

**Desviación del literal del Maestro**: el fix B propuesto comprobaba
`profile.userRating !== undefined`, pero `userRating` no es campo de
`UserProfile` (es tabla/store separado). Se implementó la **intención**
usando `userRating.answeredCount > 0` desde el store. Flag reportado al
Maestro.

**Archivos modificados** (aditivos):

- `src/db/database.ts` — `+ shouldMigrateOnboarding` · `~ hasCompletedOnboarding`
  (self-heal) · `+ comentario` en `createDefaultProfile`.
- `src/store/useGameStore.ts` — `+ import shouldMigrateOnboarding` · `~ init`
  (migración eager) · `~ completeOnboarding` (guard B1).

**Tests nuevos** (+8):

- `src/store/useGameStore.onboarding.test.ts` → **+2** (existing user con
  `answeredCount > 0`: NO calibra; flag true: no-op total). Total archivo: 14.
- `src/utils/integrity.test.ts` → **+6** (`shouldMigrateOnboarding`: los 6
  casos del helper puro). Total archivo: 10.

**Contrato de `hasCompletedOnboarding` tras B1**:

```ts
// src/db/database.ts
export async function hasCompletedOnboarding(): Promise<boolean>;
// → true  si profile.onboardingCompleted === true
// → true  si perfil pre-Fase 4 con answeredCount > 0 (auto-migra, idempotente)
// → false si profile.onboardingCompleted === false
// → false si answeredCount === 0 (usuario nuevo, sin progreso real)
// → false si perfil no existe
// Async. App.tsx debe manejar estado de carga.
```
