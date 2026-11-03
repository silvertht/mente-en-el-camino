# CONTEXT FUNCIONAL — Mente en el Camino (Selah)

Área: **Funcional** (lógica de negocio, estado, persistencia, modelo de
datos, tests).
Última actualización: 2026-10-02 (Fase 3 · R1-R3 cerrados).
Estado: ✅ Rating adaptativo en producción, verificado manualmente.

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

- `src/types/index.ts` — todos los tipos del juego.
- `src/data/categories.ts` — definición de categorías.
- `src/data/badges.ts` — definición de insignias.
- `src/data/dailyPrinciples.ts` — principios del día.
- `src/data/questions/*.ts` — banco de preguntas.
- `src/data/questions/index.ts` — selector, auditorías, helpers.
- `src/db/database.ts` — Dexie, persistencia, backup.
- `src/store/useGameStore.ts` — estado global, acciones.
- `src/utils/scoring.ts` — puntaje, XP, niveles, rachas, insignias.
- `src/utils/rating.ts` — sistema de rating ELO.
- `src/hooks/useCountUp.ts` — opcional.
- `src/utils/*.test.ts` — tests.
- `src/test/setup.ts`.
- `vitest.config.ts`.

### Archivos compartidos (con coordinación previa)

- `src/main.tsx` — bloque `if (import.meta.env.DEV)`.
- `src/screens/Home.tsx` — handlers de carga (`pickAdaptiveQuestions`).
- `src/screens/Game.tsx` — `AnswerParams` y contrato `onAnswer`.

### Archivos que NO toco

- `src/components/**` (excepto `components/questions/` que es Visual).
- `src/screens/Results.tsx`, `Profile.tsx` (Visual/UX).
- `src/index.css`, `src/App.tsx` (Visual).
- `index.html`, `vite.config.ts`, `public/` (Admin/Visual).
- `docs/CHANGELOG.md` global (lo mantiene el chat maestro).
- `docs/ANALYTICS.md`, `docs/CONTENT-WORKFLOW.md`, `docs/FEEDBACK.md` (Admin).

---

## 3. Cómo me ligo a las otras áreas

Esta sección es la clave del contexto: qué contrato expongo, qué espera
cada área de mí, y qué necesito de ellas.

### ↔️ Funcional → UX

**Qué entrego a UX**:

1. **Onboarding de calibración** (handoff activo, sin aplicar):
   - Contrato: `calibrateWithResults(results: boolean[]): Promise<void>`.
   - UX decide cómo servir las 3 preguntas, cómo recolectar los booleanos,
     cuándo llamar la acción.
   - Trigger propuesto: `userRating.answeredCount === 0`.
   - Urgencia: media. Sin onboarding, el rating sube en 30 respuestas.

2. **Sistema de racha diaria** (ya vivo, sin cambios en Fase 3):
   - `updateStreak(profile, now)` — contrato estable.
   - Escudo de gracia cada 7 días.
   - UX decide microcopy y presentación visual.

3. **Feedback post-respuesta**:
   - Cada `Question` tiene `explanation`, `application`, `reflection`,
     `verse`, `verseText`.
   - UX decide jerarquía visual.
   - Funcional garantiza 70/70 con todos los campos.

4. **Señales de puntaje** (para microcopy):
   - `lastAnswerCorrect`, `lastAnswerPoints`, `lastAnswerExplanation` en
     store. UX decide cómo presentarlas.

**Qué necesito de UX**:

- Feedback cualitativo del Test #2 sobre la sensación de dificultad.
  Si el usuario percibe que sigue fácil aun con rating alto, ajustamos
  `DIFFICULTY_BASE` o `TYPE_MODIFIER` en `rating.ts`.
- Decisión sobre onboarding: ¿lo implementamos o el rating orgánico basta?
- Definición de dónde vive el flag `onboardingCompletado`.

### ↔️ Funcional → Visual

**Qué entrego a Visual**:

1. **Rating visible en Profile** (handoff activo, sin aplicar):
   - Contrato: `getRatingLabel(userRating.global)` → string.
   - `userRating` disponible en store: `useGameStore((s) => s.userRating)`.
   - Visual solo LEE. No modifica tipos ni store.
   - Ubicación sugerida: tarjeta junto a nivel/racha/medallas.

2. **Conteo de preguntas por categoría**:
   - `countQuestionsByCategory(): Record<CategoryId, number>`.
   - Home ya lo usa para deshabilitar categorías vacías.

3. **Lista de preguntas por categoría**:
   - `getQuestionsByCategory(categoryId): Question[]`.

4. **Tipos de pregunta** (7/7):
   - Cada tipo tiene su estructura específica documentada en
     `FUNCIONAL-INTERFACES.md`.
   - Visual ya tiene los 7 componentes + 2 wrappers en
     `src/components/questions/`.

5. **Datos de insignias**:
   - `BADGES` en `src/data/badges.ts` (19 insignias, cada una con `verse?`).
   - Visual decide cómo presentarlas en Profile.

6. **Principios del día**:
   - `getTodayPrinciple()` en `src/data/dailyPrinciples.ts` (31).
   - Home ya lo consume.

**Qué necesito de Visual**:

- Iconos + colores de las **4 categorías nuevas** (`genesis`, `exodo`,
  `apologetica`, `historia-iglesia`) **antes de la Sesión S3** del plan
  de ampliación. Sin esto, las preguntas nuevas no pueden ir a producción.
- Diseño de la tarjeta de rating en Profile (solo presentación).

### ↔️ Funcional → Admin

**Qué entrego a Admin**:

1. **Métricas actuales para `docs/ANALYTICS.md`**:
   - 127 tests, bundle ~181.5 kB gzip, 15 entries PWA.
   - Rating adaptativo ELO activo (nuevo dato en ANALYTICS.md).

2. **Plan de ampliación de banco** (este documento, §9):
   - Admin lo necesita para documentar `CONTENT-WORKFLOW.md`.

3. **Tabla `userRating` en Dexie v2**:
   - Admin debe verificar que backup/export funciona en producción.
   - Nuevo `version: 2` en backup JSON.

4. **Auditorías en dev** (`window.audit`, `window.auditAA`):
   - Admin puede invocarlas desde consola del navegador para verificar
     calidad del banco en producción.

**Qué necesito de Admin**:

1. **`CONTENT-WORKFLOW.md` documentado** — bloquea arranque de la
   ampliación de banco.
   - Formato de authoring.
   - Proceso RVR1960 (verificar fair use educativo).
   - Checklist por sesión.
   - Ubicación de marca `// revisado: YYYY-MM-DD`.

2. **Verificación de Core Web Vitals** post-R3:
   - El rating no debería afectar bundle (solo lógica).
   - Confirmar que LCP/FID/CLS no cambiaron.

3. **Migración a Supabase** (Fase 3.5):
   - Funcional prepara abstracciones cuando Admin defina el esquema.

### ↔️ Funcional → Chat maestro

**Qué entrego**:

- `CHANGELOG-FUNCIONAL.md` (historia completa).
- `CONTEXT-FUNCIONAL.md` (este archivo).
- `FUNCIONAL-INTERFACES.md` (contratos públicos).

Chat maestro consolida en `CHANGELOG.md` global.
Chat maestro decide prioridades entre áreas.

**Qué necesito**:

- Decisión sobre R4 (rating visible en Profile) y R5 (limpieza).
- Decisión sobre arrancar ampliación de banco vs. modos de juego.
- Confirmación de que el workflow de contenido está listo.

---

## 4. Reglas funcionales críticas

- **Nunca rompas la firma pública** de funciones usadas por otros módulos.
  En particular: `pickAdaptiveQuestions(count, categoryId?)` mantiene firma
  aunque cambió internamente en R3.
- Si cambias tipos, avisa a Visual/UX.
- `acceptedAnswers` de hint-deduction: minúsculas, sin tilde, con variantes.
- `evaluateBadges` recibe contexto, devuelve IDs. Filtrado en el store.
- Persistencia local primero (Dexie). Online es Fase 3.5.
- Mobile-first siempre.
- Contenido teológico revisado (RVR1960).
- **NUNCA renombrar `MenteEnElCaminoDB`**. Solo `version(N)`.
- Tests antes de commitear.
- Si toco archivo compartido (`Home.tsx`, `Game.tsx`, `main.tsx`), aviso
  al chat correspondiente antes de commitear.

---

## 5. Sistema de juego (spec viva)

### Puntos

- Base por dificultad: fácil 10 · medio 20 · difícil 30.
- Bonus rapidez: `round(base × 0.5 × ratio)` (máx +50%).
- Bonus racha: +10 pts a partir de la 3ª correcta consecutiva.
- Penalización pistas: −5 pts por pista pagada (1ª gratis).
- Clamp final: `Math.max(0, total)`.

### XP y niveles

- XP acierto: +10.
- XP intento (fallo): +3.
- `level = floor(sqrt(xp / 100)) + 1`.

### Racha diaria

- +1 por día de juego.
- Escudo de gracia cada 7 días.
- Sin escudo disponible: racha vuelve a 1.
- Con escudo: consume y +1 racha aunque pasen 2+ días.

### **Rating adaptativo (Fase 3 · R1-R3)** ✅ ACTIVO

Sistema ELO-like que **reemplaza** la dificultad adaptativa clásica.

**Fórmula**:
