# CHANGELOG FUNCIONAL — Mente en el Camino (Selah)

> ⚠️ Documento EXCLUSIVO del área Funcional.
> El CHANGELOG global es `docs/CHANGELOG.md`.

**Área responsable**: Funcional.
**Última actualización**: 2026-10-02 (Fase 3 · R3 cerrado).
**Estado del área**: ✅ Sistema de rating adaptativo en producción.

---

## 📊 ESTADO DEL ÁREA

| Aspecto                  | Estado                          |
| ------------------------ | ------------------------------- |
| Preguntas en banco       | 70                              |
| Tipos implementados      | 7/7                             |
| Categorías con contenido | 5 de 9                          |
| Tests unitarios          | 127/127                         |
| Sistema puntaje/XP/racha | ✅                              |
| **Rating adaptativo**    | ✅ Activo (reemplaza accuracy)  |
| Dificultad adaptativa    | ✅ (legacy, deprecada)          |
| Persistencia Dexie       | ✅ v2 con tabla `userRating`    |
| Export/import backup     | ✅ Helpers listos, UI pendiente |
| Migración Supabase       | 🔴 Fase 3.5                     |
| Multijugador             | 🔴 Fase 3.5                     |

---

## 📅 HISTORIAL

### 2026-10-02 · Fase 3 · R3 — Selector de preguntas por rating

**Cambio visible**: el rating del usuario determina qué preguntas recibe.

- `src/utils/rating.ts`:
  - Nuevo cap `MAX_STRETCH = 400` y campo `maxStretch` en `RatingConfig`.
  - `pickQuestionsByRating` filtra por `userRating + maxStretch` antes de
    aplicar banda. Si el cap deja el pool corto, devuelve menos preguntas
    (regla estricta: mejor pocas que frustrar).
- `src/utils/rating.test.ts`: +6 tests del cap (total **61**).
- `src/data/questions/index.ts`:
  - `pickAdaptiveQuestions` reescrito: lee `getUserRating()` y delega en
    `pickQuestionsByRating`.
  - Puerta explícita de "trampas" eliminada: el rating filtra naturalmente
    (`hint-deduction + dificil = 1720`, fuera del cap de un usuario 1200).
  - Firma pública sin cambios.
  - Imports de `getRecentAccuracy`/`getOrCreateProfile` eliminados.
- `src/data/questions/index.test.ts`: reescrito con mock de `getUserRating`
  (15 tests, mismo conteo).
- **Verificado manualmente**: rating 1000 → solo fáciles/medias.
  Rating 1800 → difíciles con hint-deduction. ✅
- 127/127 tests ✅ · build limpio ✅.

### 2026-10-02 · Fase 3 · R2 — Persistencia del rating

- `src/types/index.ts`:
  - `UserRating` gana campo `id: string` (clave primaria Dexie).
- `src/db/database.ts`:
  - Dexie `version(2)` con tabla `userRating` (id = `local-player`).
  - Migración idempotente: datos v1 intactos.
  - Nuevas funciones: `getUserRating`, `saveUserRating`, `resetUserRating`,
    `createDefaultUserRating`.
  - `resetProfile` limpia también `userRating`.
  - `exportBackup`/`importBackup` incluyen `userRating` (`version: 2`).
  - `getRecentAccuracy` marcado `@deprecated` (se retira en R5).
- `src/store/useGameStore.ts`:
  - Estado `userRating` cargado en `init()` junto al perfil.
  - `answerQuestion` actualiza el rating tras cada respuesta.
  - Acciones nuevas: `calibrateWithResults`, `resetRating`.
  - `pickAdaptiveQuestions` seguía activo: comportamiento visible idéntico.
- 121/121 tests ✅ · build limpio ✅ · bundle +0.53 kB gzip.

### 2026-10-02 · Fase 3 · R1 — Sistema de Rating (módulo aislado)

- Nuevo `src/utils/rating.ts`:
  - Fórmula ELO-like (K=32 early / K=16 stable).
  - `getQuestionRating()` deriva rating desde dificultad + tipo.
  - `calibrateInitialRating()` para onboarding (0-3 aciertos → 1000-1450).
  - `pickQuestionsByRating()` con banda ±(150/100) y mezcla 60/20/20.
  - `getRatingLabel()` para handoff a Visual (Profile).
- Nuevo `src/utils/rating.test.ts` (55 tests).
- Nuevos tipos en `src/types/index.ts`: `UserRating`, `RatingSnapshot`,
  `RatingConfig`.
- **No integrado aún**: store, db y screens sin tocar. Cero riesgo funcional.
- 121/121 tests ✅ · bundle sin cambios (tree-shaken).

### 2026-10-01 · Fase 3 iniciada

- Fase 2 no tocó territorio Funcional.
- Handoff de Admin (Analytics) aplicado por el chat principal en `src/main.tsx`.

### 2026-09-24 · Fase 1 · Ronda 3 — CERRADA

**Tipos verse-scramble + timeline**:

- `VerseScrambleQuestion.words` + `correctOrder`.
- `TimelineQuestion.events` + `correctOrder`.
- `answerQuestion` acepta `selectedOrder`.
- Helper `ordersMatch(a, b)`.

**14 datos nuevos**:

- `versiculos.ts`: 7 verse-scramble (`ver-014` a `ver-020`).
- `evangelios.ts`: 7 timeline (`ev-014` a `ev-020`).
- Total: 56 → 70.

**Vitest setup**:

- `vitest.config.ts`, `src/test/setup.ts`.
- Scripts `test`, `test:ui`, `test:run`.
- 66 tests (scoring 33, badges 18, questions 15).
- Fix: `getNewBadges` dedupea con `Set`.

### 2026-09-23 · Fase 1 · Ronda 2 — Bugs críticos

- **Timer**: reescrito con `requestAnimationFrame`.
- **Hint-deduction**: pista 1 gratis.
- **Tildes**: `normalizeAnswer()` aplicado.
- **Auditorías**: `auditAcceptedAnswers()`, `window.audit`, `window.auditAA`.
- **Normalización de datos**: evangelios, personajes, versiculos.

### 2026-09-23 · Fase 1 · Ronda 1 — Handoffs + dificultad adaptativa

- `dailyPrinciples.ts` (31 principios).
- `Badge.verse?: { ref, text }`.
- `getRecentAccuracy(limit)`.
- `pickAdaptiveQuestions`.
- `auditQuestionData()`.

---

## 📤 HANDOFFS ENTREGADOS

| Handoff                                      | Destino | Estado       |
| -------------------------------------------- | ------- | ------------ |
| Onboarding de calibración (3 preguntas)      | UX      | 🟡 Pendiente |
| Rating visible en Profile (`getRatingLabel`) | Visual  | 🟡 Pendiente |

**Contrato UX** (onboarding):

```ts
// store
calibrateWithResults(results: boolean[]): Promise<void>
// → actualiza userRating.global a 1000/1150/1300/1450
// → NO incrementa answeredCount (mantiene K=32 al inicio)
```
