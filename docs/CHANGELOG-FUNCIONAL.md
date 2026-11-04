# CHANGELOG FUNCIONAL — Mente en el Camino (Selah)

> ⚠️ Documento EXCLUSIVO del área Funcional.
> El CHANGELOG global lo mantiene el chat maestro en `docs/CHANGELOG.md`.
> Las áreas Visual, UX y Admin tienen su propio `CHANGELOG-{ÁREA}.md`.

**Área responsable**: Funcional (lógica de negocio, estado, persistencia,
modelo de datos, tests).
**Última actualización**: 2026-11-04 (Fase 4 · H-04/H-05 cerrados).
**Estado del área**: ✅ H-04 + H-05 implementados · 151/151 tests · build limpio.

---

## 📊 ESTADO DEL ÁREA

| Aspecto                         | Valor / Estado                     |
| ------------------------------- | ---------------------------------- |
| Preguntas en banco              | 70 (sin cambios)                   |
| Preguntas onboarding            | 3 (`onb-001` a `onb-003`)          |
| Tipos de pregunta               | 7/7                                |
| Categorías con contenido        | 5 de 9                             |
| Data educativa completa         | 70/70 + 3/3 onboarding             |
| acceptedAnswers normalizadas    | 6/6                                |
| Tests unitarios                 | **151/151** ✅                     |
| Sistema puntaje / XP / racha    | ✅ Activo                          |
| Rating adaptativo (ELO)         | ✅ Activo en producción            |
| Dificultad adaptativa clásica   | 🟡 Deprecada (retirar en R5)       |
| Persistencia Dexie              | ✅ v2 (sin `version(3)`)           |
| Backup export/import            | ✅ Incluye rating (`version: 2`)   |
| Bundle gzip (producción)        | **182.34 kB** (baseline 182.12)    |
| Migración Supabase              | 🔴 Fase 3.5                        |
| Multijugador                    | 🔴 Fase 3.5                        |
| **H-04 — completeOnboarding**   | ✅ Cerrado                         |
| **H-05 — onboardingQuestions**  | ✅ Cerrado (Alt 1 Belsasar)        |
| **Gate hasCompletedOnboarding** | ✅ Expuesto desde `db.database.ts` |

---

## 📅 HISTORIAL FUNCIONAL

### 2026-11-04 · Fase 4 · H-04/H-05 — Onboarding + calibración (CERRADO)

**Contrato**: H-04/H-05 v2 (Maestro, 2026-11-03).
**Branch**: `fase4/onboarding-h04-h05` desde `5a1b120` (confirmado).
**Push a `main`**: **NO** hasta revisión del Maestro.

**Decisiones aplicadas del Maestro**:

- **B1 = Opción B → Alt 1 (Belsasar)**. Q3 del onboarding cambiada a
  "¿Qué rey vio la escritura en la pared?" → `Belsasar` · Daniel 5:25.
  `per-010` (Elías) intacto. Duplicación verificada: Alt 1 no colisiona
  con el banco de 70.
- **W1 = Opción A**. Null-guard de `userRating` en `completeOnboarding`
  antes de invocar `calibrateWithResults`. `calibrateWithResults` **intacto**
  (contrato R2 intacto).
- **W2 = Opción A**. Mock de `../db/database` en tests. Sin `fake-indexeddb`.
  Sin tocar `package.json`.
- **DF-1 = Opción A**. In-flight guard a nivel de módulo
  (`isCompletingOnboarding`). Sin transacción cross-table. Limitación
  documentada (ver §Limitaciones).
- **DF-2 = Opción A**. `application` + `reflection` redactados (1 frase)
  con `// revisado: 2026-11-04`. No se muestran en onboarding (microcopy
  solo feedback + explicación), pero mantienen el estándar 70/70.
- **DF-3 = Opción A**. H-04 y H-05 ejecutados juntos.
- **DF-4**. Branch `fase4/onboarding-h04-h05` desde `5a1b120`. Sin push
  a `main` hasta revisión.
- **DF-5 = Opción A**. `FUNCIONAL-INTERFACES.md` actualizado a v4 con los
  3 contratos nuevos.

**Archivos creados**:

- `src/data/onboardingQuestions.ts` — 3 MC (`onb-001` a `onb-003`),
  IDs no colisionan con banco, fuera de `ALL_QUESTIONS` y
  `QUESTIONS_BY_CATEGORY`.
- `src/data/onboardingQuestions.test.ts` — 8 tests.
- `src/store/useGameStore.onboarding.test.ts` — 12 tests.
- `src/utils/integrity.test.ts` — 4 tests.

**Archivos modificados** (aditivos, 0 líneas borradas):

- `src/types/index.ts` — `UserProfile.onboardingCompleted?: boolean`.
- `src/db/database.ts` — `hasCompletedOnboarding(): Promise<boolean>`.
- `src/store/useGameStore.ts` — `completeOnboarding(results: boolean[])`
  - in-flight guard a nivel de módulo.

**Firma exacta del gate (UX Fase B)**:

```ts
// src/db/database.ts
export async function hasCompletedOnboarding(): Promise<boolean>;
// → true si profile.onboardingCompleted === true; false en cualquier otro
//   caso (perfil inexistente, campo undefined, campo false).
// → Async (lee Dexie). App.tsx debe manejar estado de carga.
```
