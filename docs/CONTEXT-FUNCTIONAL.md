# CONTEXT FUNCIONAL — Mente en el Camino (Selah)

Área: **Funcional** (lógica de negocio, estado, persistencia, modelo de datos, tests).
Última actualización: 2026-11-14 (Cierre Fase 5.1).
Estado: ✅ 212 tests, Discipulado funcional end-to-end, Multijugador Local, Dexie v3, Race Condition resuelto.

---

## 1. Mi rol

Asistente especializado en **lógica de negocio, estado, persistencia y modelo de datos** del juego.

**NO toco**:

- Diseño visual / UX de flujos.
- Administración / PWA / Analytics / Infra / Deploy.
- Componentes de Visual (`src/components/**`, `src/screens/**`).
- `src/sw.ts` (Admin).

**Sí toco**:

- Tipos TypeScript (`src/types/**`).
- Datos de juego (preguntas trivia, discipulado, insignias).
- Lógica de puntaje, XP, niveles, rachas, insignias.
- Rating adaptativo (ELO).
- Persistencia Dexie (`src/db/database.ts`).
- Estado global (Zustand: `src/store/**`).
- Tests unitarios y de integración (`*.test.ts`).

---

## 2. Mi territorio

### Archivos que puedo modificar

- `src/types/index.ts`, `src/types/discipleship.ts`, `src/types/multiplayer.ts`
- `src/data/categories.ts`, `src/data/badges.ts`, `src/data/dailyPrinciples.ts`
- `src/data/questions/**` (trivia)
- `src/data/discipleship/**` (Discipulado)
- `src/data/onboardingQuestions.ts`
- `src/db/database.ts`
- `src/store/useGameStore.ts`, `src/store/useDiscipleshipStore.ts`, `src/store/useMultiplayerStore.ts`, `src/store/eventBus.ts`
- `src/utils/scoring.ts`, `src/utils/rating.ts`, `src/utils/validateDiscipleshipContent.ts`
- `src/utils/*.test.ts`, `src/data/discipleship/*.test.ts`
- `src/test/setup.ts`, `vitest.config.ts`

### Archivos compartidos (con coordinación previa)

- `src/main.tsx`, `src/screens/Home.tsx`, `src/screens/App.tsx`, `src/screens/Onboarding.tsx` (gate de onboarding)

### Archivos que NO toco

- `src/components/**`, `src/screens/**` (excepto los autorizados arriba) — territorio Visual.
- `src/index.css`, `src/App.tsx` (rutas visuales).
- `index.html`, `vite.config.ts`, `src/sw.ts`, `public/` (Admin).
- `docs/CHANGELOG.md` global, `docs/ANALYTICS.md`, `docs/CONTENT-WORKFLOW.md`, `docs/FEEDBACK.md`.

---

## 3. Cómo me ligo a las otras áreas

### ↔️ Funcional → UX

- **Onboarding**: `completeOnboarding(results)` implementado y atómico.
- **Discipulado**: `iniciarLeccion()`, `responderCheck()` (con contexto), `finalizarLeccion()`.
- **Feedback**: Cada `Question` tiene `explanation`, `application`, `reflection`, `verse`, `verseText`.
- **Cada `PreguntaReflexion`** tiene `feedbackCorrecto` con 4 partes inmutables + `pistaReintento` ≤12 palabras + `referenciaRVR1960`.

### ↔️ Funcional → Visual

- **Rating visible**: `getRatingLabel(userRating.global)`.
- **Estados**: 5 estados UX (`sin_empezar`, `en_curso`, `recorrida`, `bloqueado`, `repaso`).
- **Insignias**: `BADGES` en `src/data/badges.ts`.
- **Selectores**: `selectProximoPaso`, `selectEstadoLeccion`, `selectEstadoNivel`, `selectEstadoSenda`, `selectPosicionAReanudar`, `selectProgresoSenda`, `selectProgresoNivel`.

### ↔️ Funcional → Admin

- **Métricas**: 212 tests, 110 preguntas trivia (9 categorías), 27 preguntas reflexión (senda Evangelios), bundle 33.68 kB gzip.
- **Dexie**: `version(3)` con 5 tablas nuevas (progreso_leccion, racha_discipulado, local_sessions, local_players, local_rounds).
- **Auditorías**: `window.audit`, `window.auditAA`.

---

## 4. Reglas funcionales críticas

- **NUNCA renombrar `MenteEnElCaminoDB`** (Regla de Oro 4). Solo `version(N)`.
- **Dexie: nombres snake_case en esquema Y propiedades de clase** (fix Fase 5.1). El desajuste causó bug P0.
- **`responderCheck` acepta contexto explícito** (fix Fase 5.1). No depende de `leccionActiva` (race condition).
- **Persistencia local primero** (Dexie). Online es Fase 3.5.
- **Mobile-first siempre**.
- **Contenido teológico RVR1960** (Regla de Oro 5). Feedback 4 partes obligatorias.
- **Regla Pedagógica**: Cero pistas de orden, explicaciones con "por qué" teológico, reflexiones aplicables al joven.
- **Tests antes de commitear** (212/212).
- **Si toco archivo compartido, aviso al chat correspondiente**.

---

## 5. Sistema de juego (spec viva)

### Puntos y XP (Trivia)

- Base por dificultad: fácil 10 · medio 20 · difícil 30.
- XP acierto: +10. XP intento: +3.
- `level = floor(sqrt(xp / 100)) + 1`.

### Rating adaptativo (ELO)

- **K-Factor**: 32 (early) / 16 (stable).
- **MAX_STRETCH = 400**: Cap duro.
- **Selección**: `pickQuestionsByRating` mezcla 60/20/20.
- **Anti-Exploit**: `answerQuestion` es efímero. Persistencia solo en `finishGame`.

### Discipulado (Fase 5)

- **Jerarquía**: Senda → Nivel → Lección (P2).
- **9 Sendas = 9 `CategoryId`** de trivia (P3). Reutiliza taxonomía.
- **MVP**: 1 senda piloto (`evangelios`), 3 niveles × 3 lecciones × 3 preguntas = 27 (P1).
- **5 estados de progreso**: `sin_empezar`, `en_curso`, `recorrida`, `bloqueado` (derivado), `repaso`.
- **Repaso**: suma racha (P5), NO avanza progresión, NO desbloquea.
- **Reintentos**: ilimitados (P6). Sin timer (P8).
- **Racha**: `racha_discipulado` separada de `profile.streak` (B5).
- **Anti-Exploit**: `responderCheck` es efímero. Persistencia solo en `finalizarLeccion`.

### Multijugador Local (Fase 5)

- **Modelo separado** de Discipulado (P7). Hot-seat.
- **Solo trivia general** (110 preguntas). NO afecta ELO/XP/racha del perfil (B7).
- **Desempate**: por menos fallos (B10). Si persiste, `ganadorId: null`.
- **Anti-Exploit**: `responderTurno` efímero. Persistencia solo en `finalizarPartida`.

### Lazy Load

- El banco de 110 preguntas está en chunks dinámicos.
- El contenido de Discipulado también (senda Evangelios → chunk propio).
- Multijugador y Discipulado usan `import()` dinámico en sus stores/rutas.

### Migración Dexie v2 → v3

- Aditiva pura: re-declara v2 + añade 5 tablas nuevas.
- Cero delete, cero rename.
- `backup` extendido con retrocompatibilidad v2.

---

## 6. Fixes críticos Fase 5.1 (Quality Pass)

| Bug                     | Causa                                                       | Fix                                               |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| **B1 (correctIndex 0)** | Contenido con 23/27 `correctIndex: 0`                       | Redistribución + test integración (54 aserciones) |
| **Race Condition**      | `responderCheck` dependía de `leccionActiva` (null en race) | Contexto explícito (`ContextoLeccion`)            |
| **Dexie snake_case**    | `db.progresoLeccion` (camel) vs `progreso_leccion` (snake)  | Unificación a snake_case en clase                 |
| **Feedback incompleto** | `ResultadoCheck` no incluía `reflexion`                     | Añadido `reflexion?` a `ResultadoCheck`           |

---

## 7. Métricas actuales (Cierre Fase 5.1)

| Métrica                       | Valor                        |
| ----------------------------- | ---------------------------- |
| Preguntas trivia              | 110 (9 categorías)           |
| Preguntas reflexión           | 27 (senda evangelios piloto) |
| Tests unitarios + integración | **212/212**                  |
| Bundle gzip (index)           | **33.68 kB**                 |
| PWA installable               | ✅ Chrome                    |
| Rating ELO                    | ✅ Activo con MAX_STRETCH    |
| Costo                         | $0/mes                       |
