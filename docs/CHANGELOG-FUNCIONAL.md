# CHANGELOG FUNCIONAL — Mente en el Camino (Selah)

> ⚠️ Documento EXCLUSIVO del área Funcional.
> El CHANGELOG global lo mantiene el chat maestro en `docs/CHANGELOG.md`.
> Las áreas Visual, UX y Admin tienen su propio `CHANGELOG-{ÁREA}.md`.

**Área responsable**: Funcional (lógica de negocio, estado, persistencia,
modelo de datos, tests).
**Última actualización**: 2026-10-02 (Fase 3 · R3 cerrado, verificado manualmente).
**Estado del área**: ✅ Rating adaptativo R1-R3 cerrado y en producción.

---

## 📊 ESTADO DEL ÁREA

| Aspecto                       | Valor / Estado                   |
| ----------------------------- | -------------------------------- |
| Preguntas en banco            | 70                               |
| Tipos de pregunta             | 7/7                              |
| Categorías con contenido      | 5 de 9                           |
| Data educativa completa       | 70/70                            |
| acceptedAnswers normalizadas  | 6/6                              |
| Tests unitarios               | 127/127 (esperado, re-verificar) |
| Sistema puntaje / XP / racha  | ✅ Activo                        |
| **Rating adaptativo (ELO)**   | ✅ Activo en producción          |
| Dificultad adaptativa clásica | 🟡 Deprecada (retirar en R5)     |
| Persistencia Dexie            | ✅ v2 con tabla `userRating`     |
| Backup export/import          | ✅ Incluye rating (version: 2)   |
| Bundle gzip                   | ~181.5 kB                        |
| Migración Supabase            | 🔴 Fase 3.5                      |
| Multijugador                  | 🔴 Fase 3.5                      |

---

## 📅 HISTORIAL FUNCIONAL

### 2026-10-02 · Fase 3 · R3 — Selector de preguntas por rating (CAMBIO VISIBLE)

**Objetivo**: reemplazar la lógica interna de `pickAdaptiveQuestions` por
el sistema de rating, manteniendo firma pública sin cambios.

**Cambio visible para el usuario**:

- El rating determina qué preguntas recibe.
- Experto con rating 1800 recibe difíciles desde la primera partida.
- Novato con rating 1000 no recibe `hint-deduction dificil` (cap 1400).

**Archivos tocados**:

- `src/utils/rating.ts`:
  - Nuevo cap `MAX_STRETCH = 400` y campo `maxStretch` en `RatingConfig`.
  - `pickQuestionsByRating` filtra el pool por `userRating + maxStretch`
    antes de aplicar banda. Si el cap deja el pool corto, devuelve menos
    preguntas (regla estricta: mejor pocas que frustrar).
  - `splitPoolByBand` y `clampRating` documentados como públicos.

- `src/utils/rating.test.ts`:
  - +6 tests del cap (total **61**).
  - Casos: excluye fuera del cap, permite límite exacto, experto recibe
    la más difícil, respeta `maxStretch` custom, cap vacío → array vacío,
    invariante `MAX_STRETCH === 400`.

- `src/data/questions/index.ts`:
  - `pickAdaptiveQuestions` reescrito: lee `getUserRating()`, delega en
    `pickQuestionsByRating`.
  - Puerta explícita de "trampas" eliminada: el cap ya excluye
    `hint-deduction + dificil` para novatos.
  - Firma pública **sin cambios**.
  - Imports de `getRecentAccuracy`/`getOrCreateProfile` eliminados.

- `src/data/questions/index.test.ts`:
  - Reescrito con mock de `getUserRating` (mismo conteo: 15 tests).
  - Nuevo test: "experto recibe más difíciles que novato".

**Verificación**:

- Verificado **manualmente** por el PO: editando `userRating.global` en
  IndexedDB:
  - Rating 1000 → solo fáciles/medias, sin `hint-deduction dificil`. ✅
  - Rating 1800 → difíciles con `hint-deduction`. ✅
- **Pendiente re-verificar en próximo build**: `npm run test` (127/127)
  y `npm run build` (limpio). No se capturó output final en el hilo.

**Decisiones tomadas** (confirmadas por PO antes de R3):

1. **Puerta de trampas explícita eliminada** — el cap `MAX_STRETCH=400`
   ya filtra naturalmente. Código más limpio y coherente.
2. **Cap duro `userRating + 400`** — principio ELO clásico, evita
   frustración (un usuario 1200 nunca recibe pregunta de 1720).
3. **Banda vacía → filler** — limitación conocida, se resuelve con
   ampliación de banco (plan S1-S5).

### 2026-10-02 · Fase 3 · R2 — Persistencia del rating

**Objetivo**: el rating persiste entre sesiones. Aún sin tocar el selector
de preguntas (eso es R3). Comportamiento visible idéntico al usuario.

**Archivos tocados**:

- `src/types/index.ts`:
  - `UserRating` gana campo `id: string` (clave primaria Dexie).
  - Sin este campo Dexie no puede crear la tabla.

- `src/db/database.ts`:
  - Nueva tabla `userRating` con Dexie `version(2)`.
  - Migración idempotente: datos de v1 intactos. **`MenteEnElCaminoDB`
    no se renombra**.
  - Nuevas funciones:
    - `createDefaultUserRating()` — rating 1200 por defecto.
    - `getUserRating()` — obtiene o crea.
    - `saveUserRating()` — persiste.
    - `resetUserRating()` — reinicia a 1200.
  - `resetProfile` limpia también `userRating`.
  - `exportBackup`/`importBackup` incluyen `userRating` (`version: 2`).
  - `getRecentAccuracy` marcado `@deprecated` (retirar en R5).

- `src/store/useGameStore.ts`:
  - Estado `userRating` cargado en `init()` junto al perfil.
  - `answerQuestion` actualiza el rating tras cada respuesta (no bloqueante).
  - Nuevas acciones:
    - `calibrateWithResults(results: boolean[])` — onboarding.
    - `resetRating()` — debug / reset.
  - `pickAdaptiveQuestions` seguía activo: comportamiento visible idéntico.

**Verificación**:

- 121/121 tests ✅.
- Build limpio ✅.
- Bundle +0.53 kB gzip.
- IndexedDB muestra tabla `userRating` con registro `local-player`.

### 2026-10-02 · Fase 3 · R1 — Módulo de rating aislado

**Objetivo**: crear el motor de rating como módulo puro, testeable, sin
dependencias del store ni Dexie. Cero riesgo funcional.

**Archivos nuevos**:

- `src/utils/rating.ts`:
  - Fórmula ELO-like con K-factor adaptativo (K=32 early / K=16 stable).
  - `getQuestionRating(question)` — deriva rating desde dificultad + tipo.
  - `calibrateInitialRating(results)` — 0-3 aciertos → 1000-1450.
  - `pickQuestionsByRating(pool, rating, count, options)` — selector con
    banda ±(150/100) y mezcla 60/20/20.
  - `getRatingLabel(rating)` — etiqueta cualitativa para UI.
  - `clampRating`, `getRatingBand`, `splitPoolByBand`, `updateRating`,
    `calcExpectedScore`, `calcRatingDelta`, `getKFactor`.

- `src/utils/rating.test.ts`: 55 tests.

**Archivos modificados**:

- `src/types/index.ts`:
  - Nuevos tipos: `UserRating`, `RatingSnapshot`, `RatingConfig`.

**No integrado aún**: store, db y screens sin tocar. El módulo queda
tree-shaken en el bundle final hasta R2.

**Verificación**:

- 121/121 tests ✅ (66 + 55 nuevos).
- Bundle prácticamente sin cambios (+0.11 kB gzip).

### 2026-10-01 · Fase 3 iniciada

- Fase 2 no tocó territorio Funcional.
- Handoff de Admin (Analytics) aplicado por el chat principal en `src/main.tsx`.
- **Estado del banco verificado**: 70 preguntas, todas con `verse`,
  `verseText`, `application`, `reflection`. `acceptedAnswers` 6/6 correctas.
- **Desglose real** (auditoría):
  - evangelios: 20 · versiculos: 20 · personajes: 10 · parabolas: 10 · valores: 10.
  - Tipos: MC 17 · TF 15 · who-said-it **2** · fill 10 · hint 6 · verse-scramble 10 · timeline 10.
  - Dificultad: fácil 20 · medio 32 · difícil 18.

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
- **Auditorías en dev**: `auditQuestionData()`, `auditAcceptedAnswers()`,
  `window.audit`, `window.auditAA`.
- **Normalización de datos**: evangelios, personajes, versiculos.

### 2026-09-23 · Fase 1 · Ronda 1 — Base adaptativa

- `dailyPrinciples.ts` (31 principios).
- `Badge.verse?: { ref, text }`.
- `getRecentAccuracy(limit)`.
- `pickAdaptiveQuestions`.
- `auditQuestionData()`.

---

## 📤 HANDOFFS QUE FUNCIONAL HA ENTREGADO

### → UX · Onboarding de calibración (3 preguntas)

**Estado**: 🟡 Entregado, sin aplicar.

**Contrato técnico**:

```ts
// store
calibrateWithResults(results: boolean[]): Promise<void>
// Recibe 3 booleanos (aciertos de las 3 preguntas de calibración).
// Actualiza userRating.global:
//   0/3 → 1000
//   1/3 → 1150
//   2/3 → 1300
//   3/3 → 1450
// NO incrementa answeredCount → mantiene K=32 en las primeras partidas reales.
```
