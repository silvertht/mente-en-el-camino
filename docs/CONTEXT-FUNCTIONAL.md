# CONTEXT FUNCIONAL — Mente en el Camino (Selah)

Área: **Funcional** (lógica de negocio, estado, persistencia, modelo de
datos, tests).
Última actualización: 2026-11-10 (Cierre Fase 4).
Estado: ✅ 110 preguntas, Lazy Load, Anti-Exploit cerrado.

---

## 1. Mi rol

Asistente especializado en **lógica de negocio, estado, persistencia y
modelo de datos** del juego.

**NO toco**:

- Diseño visual.
- UX de flujos.
- Administración.
- PWA.
- Analytics.
- Infraestructura / deploy.

**Sí toco**:

- Tipos TypeScript.
- Datos de juego (preguntas, categorías, insignias, principios).
- Lógica de puntaje, XP, niveles, rachas, insignias.
- Sistema de rating adaptativo.
- Persistencia Dexie.
- Estado global (Zustand).
- Tests unitarios.

---

## 2. Mi territorio

### Archivos que puedo modificar

- `src/types/index.ts`
- `src/data/categories.ts`
- `src/data/badges.ts`
- `src/data/dailyPrinciples.ts`
- `src/data/questions/*.ts` (incluyendo `index.ts`)
- `src/data/onboardingQuestions.ts`
- `src/db/database.ts`
- `src/store/useGameStore.ts`
- `src/utils/scoring.ts`
- `src/utils/rating.ts`
- `src/utils/*.test.ts`
- `src/test/setup.ts`
- `vitest.config.ts`

### Archivos compartidos (con coordinación previa)

- `src/main.tsx`
- `src/screens/Home.tsx`
- `src/screens/App.tsx` (Gate)

### Archivos que NO toco

- `src/components/**`
- `src/screens/Results.tsx`, `Profile.tsx`, `Game.tsx`
- `src/index.css`, `src/App.tsx` (rutas visuales)
- `index.html`, `vite.config.ts`, `public/`
- `docs/CHANGELOG.md` global
- `docs/ANALYTICS.md`, `docs/CONTENT-WORKFLOW.md`, `docs/FEEDBACK.md`

---

## 3. Cómo me ligo a las otras áreas

### ↔️ Funcional → UX

- **Onboarding**: `completeOnboarding(results)` implementado y atómico.
- **Loading state**: `isLoadingQuestions` expuesto para que UX muestre spinners (sin delay artificial).
- **Feedback**: Cada `Question` tiene `explanation`, `application`, `reflection`, `verse`, `verseText`.

### ↔️ Funcional → Visual

- **Rating visible**: `getRatingLabel(userRating.global)`.
- **Conteo**: `countQuestionsByCategory()` y `getQuestionsByCategory()`.
- **Insignias**: `BADGES` en `src/data/badges.ts`.

### ↔️ Funcional → Admin

- **Métricas**: 175 tests, 110 preguntas, bundle 29 kB (principal).
- **Dexie**: `version(2)` con tabla `userRating`.
- **Auditorías**: `window.audit`, `window.auditAA`.

---

## 4. Reglas funcionales críticas

- **NUNCA renombrar `MenteEnElCaminoDB`** (Regla de Oro 4). Solo `version(N)`.
- Persistencia local primero (Dexie). Online es Fase 3.5.
- Mobile-first siempre.
- Contenido teológico revisado (RVR1960).
- **Regla Pedagógica (Fase 4)**: Cero pistas de orden en Timelines, explicaciones con el "por qué" teológico, y reflexiones aplicables al joven.
- Tests antes de commitear (175/175).
- Si toco archivo compartido, aviso al chat correspondiente.

---

## 5. Sistema de juego (spec viva)

### Puntos y XP

- Base por dificultad: fácil 10 · medio 20 · difícil 30.
- XP acierto: +10. XP intento (fallo): +3.
- `level = floor(sqrt(xp / 100)) + 1`.

### Rating adaptativo (ELO)

- **K-Factor**: 32 (early) / 16 (stable).
- **MAX_STRETCH = 400**: Filtra preguntas que superen `userRating + 400`.
- **Selección**: `pickQuestionsByRating` mezcla 60/20/20.
- **Anti-Exploit**: `answerQuestion` es efímero (no guarda en Dexie). La persistencia (ELO, XP, respuestas) ocurre **solo** en `finishGame`.

### Lazy Load (H-FUN-03)

- El banco de 110 preguntas está dividido en chunks dinámicos.
- `loadQuestionBank()` se invoca bajo demanda (al iniciar partida).
- `loadAndStartGame()` maneja el estado de carga en Zustand.

### Migración Onboarding (B1)

- `hasCompletedOnboarding()` auto-migra usuarios antiguos (con `answeredCount > 0`) a `onboardingCompleted = true` para proteger su progreso.

---

## 6. Métricas actuales (Cierre Fase 4)

| Métrica                 | Valor                                                            |
| ----------------------- | ---------------------------------------------------------------- |
| Preguntas en banco      | **110**                                                          |
| Categorías activas      | **9** (las 5 originales + Génesis, Éxodo, Apologética, Historia) |
| Tests unitarios         | **175/175**                                                      |
| Bundle gzip (principal) | **~29 kB**                                                       |
| PWA installable         | ✅ Chrome                                                        |
| Rating ELO              | ✅ Activo con MAX_STRETCH                                        |
| Costo                   | $0/mes                                                           |
