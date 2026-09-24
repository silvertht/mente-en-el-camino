# CHANGELOG — Mente en el Camino

Registro cronológico de cambios por área (Funcional, Visual, UX, Admin).
Formato: `[ÁREA] Descripción · Estado`.

**Última actualización**: 2026-09-24 · Cierre Fase 1, inicio Fase 2.
**Estado del proyecto**: MVP funcional desplegado. Fase 2 en curso.

---

## 📊 ESTADO GLOBAL ACTUAL

| Área          | Estado            | Pendiente real                               |
| ------------- | ----------------- | -------------------------------------------- |
| **Funcional** | ✅ Fase 1 cerrada | Ampliar banco 70 → 100+ (post Test #2)       |
| **Visual**    | ✅ Fase 1 cerrada | Íconos PWA (bloqueado por Admin)             |
| **UX**        | ⏳ 1 validación   | Validar en móvil real                        |
| **Admin**     | 🔴 Sin empezar    | PWA · Analytics · Core Web Vitals · Supabase |

**Métricas**:

| Métrica                      | Valor                    |
| ---------------------------- | ------------------------ |
| Preguntas en banco           | 70                       |
| Categorías activas           | 5 (de 9)                 |
| Tipos de pregunta            | 7/7 (lógica + UI)        |
| Data educativa completa      | 70/70 (100 %)            |
| acceptedAnswers normalizadas | 6/6 (100 %)              |
| Tests unitarios              | 66/66 pasando            |
| Build                        | ✓ 629 ms, sin errores TS |
| Bundle gzip                  | 181 kB                   |
| Insignias                    | 19                       |
| Principios del día           | 31                       |

---

## 2026-09-24 — CIERRE DE FASE 1 / INICIO DE FASE 2

### [SISTEMA] Transición a Fase 2

- **Fase 1 cerrada**: MVP funcional completo.
  - Funcional: 3 rondas, 70 preguntas, 7/7 tipos, 66 tests pasando.
  - Visual: 4 rondas, modales custom, SortableList, accesibilidad AA.
  - UX: 4 sesiones, microcopy cálido, validaciones cerradas.
- **Fase 2 iniciada**: producción, medición, crecimiento.

### [ADMIN] Inicio de Fase 2

- Chat Admin creado. Territorio: PWA, Analytics, Core Web Vitals, Supabase.
- **Primera tarea**: configurar `vite-plugin-pwa` + íconos + service worker.
- Pendiente: Vercel Analytics, migración a Supabase (fase 2.5).

### [ROADMAP] Prioridades Fase 2

| #   | Tarea                              | Área              | Prioridad |
| --- | ---------------------------------- | ----------------- | --------- |
| 1   | Configurar PWA                     | Admin + Visual    | 🔥 Alta   |
| 2   | Vercel Analytics + Core Web Vitals | Admin             | 🔥 Alta   |
| 3   | Validar en móvil real (Test #2)    | UX                | 🔥 Alta   |
| 4   | Ampliar banco 70 → 100+            | Funcional         | 🟡 Media  |
| 5   | Onboarding primera vez             | UX                | 🟡 Media  |
| 6   | Migración a Supabase               | Admin + Funcional | 🟢 Baja   |

---

## 2026-09-23 / 2026-09-24 — FASE 1 (consolidado)

### [SISTEMA] Documentación maestra

- Creada documentación maestra del proyecto (`docs/`).
- Estructurado el proyecto en 4 áreas: **Funcional**, **Visual**, **UX**, **Admin**.
- Definida paleta "Noche y Alba" como única fuente de verdad visual.
- Definido stack: React 19 · TypeScript · Vite 8 · Tailwind v4 (`@theme`) ·
  Zustand v5 · Dexie · Motion · vite-plugin-pwa (instalado, sin configurar).

---

### [FEEDBACK] Test #1 — 5 jóvenes

**Método**: uso libre + formulario post-sesión.
**Dispositivos**: varios (algunos de gama baja/media).

**Hallazgos**:

1. **Rendimiento**: algunos teléfonos sienten la interfaz pesada y lenta.
2. **Preguntas trampa**: molestan al mezclarse con fáciles. Sugieren aparición
   condicionada a desempeño.
3. **Percepción general**: "se siente vacía", "sin principios",
   "no es tan amigable". **Ambiguo — requiere clarificación**.

**Prioridades derivadas**:

| #   | Tarea                          | Área      | Prioridad |
| --- | ------------------------------ | --------- | --------- |
| 1   | Optimizar `AnimatedBackground` | Visual    | 🔥 Alta   |
| 2   | Dificultad adaptativa          | Funcional | 🔥 Alta   |
| 3   | Clarificar "principios"        | UX        | 🔥 Alta   |
| 4   | Medir Core Web Vitals          | Admin     | 🟡 Media  |

---

## 🎨 VISUAL — Resumen de rondas (Fase 1)

### [VISUAL] Ronda 1 — Optimización y rediseño base

**Nuevo**: `src/utils/deviceTier.ts`

- Detecta tier (low/mid/high) por `navigator.hardwareConcurrency`,
  `navigator.deviceMemory`, `prefers-reduced-motion`, `saveData`.
- Cachea resultado. Expone `watchReduceMotion()`.

**Reescrito**: `src/components/AnimatedBackground.tsx`

- 60 estrellas → 0/8/15 según tier.
- Eliminados `backdrop-blur` y `filter: blur()` → reemplazados por
  `radial-gradient` nativos.
- Solo anima `transform` y `opacity`.
- Respeta `prefers-reduced-motion` y `saveData`.

**Reescrito**: `src/screens/Results.tsx`

- Podio de 5 niveles (Oro perfecto · Oro · Plata · Bronce · Semilla).
- Contadores animados, migración paleta Noche y Alba.

**Reescrito**: `src/screens/Profile.tsx`

- Hero rediseñado, vitrina de insignias, migración paleta.

**Modificado**: `src/components/questions/HintDeductionQuestion.tsx`

- Microinteracciones (pill X/Y, barrido de brillo, glow dorado).

**Nuevo**: `src/components/Skeleton.tsx`

- 6 variantes + presets para pantallas.

**Estado**: ✅ Validado en PC.

### [VISUAL] Ronda 2 — Modales custom

**Nuevos**: `Modal.tsx`, `BadgeDetailModal.tsx`, `PromptDialog.tsx`,
`ConfirmDialog.tsx`.

- Focus trap real, accesibilidad completa, mobile-first.

**Modificado**: `Profile.tsx`, `Results.tsx`.

- Integración de modales, microcopy cálido.

**Estado**: ✅ Validado en PC.

### [VISUAL] Ronda 3 — Cierre handoffs UX + optimizaciones

**Modificado**: `BadgeDetailModal.tsx` → lectura directa de `Badge.verse`.
**Modificado**: `Home.tsx` → migración paleta + pulido + spinner.
**Modificado**: `Modal.tsx` → handle decorativo eliminado.
**Modificado**: `index.css` → scrollbar invisible + fix del salto.

**Estado**: ✅ Validado por UX.

### [VISUAL] Ronda 4 — UI de los 2 tipos nuevos

**Nuevos**:

- `src/components/questions/SortableList.tsx` (genérico, drag & drop +
  accesibilidad por teclado).
- `src/components/questions/VerseScrambleQuestion.tsx` (wrapper).
- `src/components/questions/TimelineQuestion.tsx` (wrapper).

**Modificado**: `Game.tsx` → `AnswerParams` con `selectedOrder`.

**Estado**: ✅ Aprobado por UX (pendiente validación en producción).

---

## ⚙️ FUNCIONAL — Resumen de rondas (Fase 1)

### [FUNCIONAL] Ronda 1 — Handoffs + dificultad adaptativa

**Nuevo**: `src/data/dailyPrinciples.ts`

- 31 principios con estructura `{ ref, text, application, reflection }`.
- `getTodayPrinciple(date?)`: rotación determinística por día UTC.
- `getPrincipleByIndex(index)`: acceso por índice con wrap-around.

**Modificado**: `src/types/index.ts`

- Tipo `Badge`: añadido campo opcional `verse?: { ref, text }`.

**Modificado**: `src/db/database.ts`

- Nueva función `getRecentAccuracy(limit = 20): Promise<number>`.
- Sin historial → 0.5 (neutro).

**Modificado**: `src/data/questions/index.ts`

- Funciones internas: `getWeightsForAccuracy`, `weightedPick`,
  `isTrapQuestion`.
- `pickAdaptiveQuestions(count, categoryId?)`:
  - Pesos por dificultad según accuracy de últimas 20 respuestas.
  - accuracy > 70% → sube dificultad.
  - accuracy < 40% → baja dificultad.
  - Preguntas trampa (`hint-deduction` + `dificil`) solo si
    `level ≥ 3 && accuracy > 0.65`.
- `auditQuestionData(): QuestionDataAudit`.

**Modificado**: `src/data/badges.ts`

- Las 19 insignias reciben campo `verse` (RVR1960).

**Modificado**: `src/screens/Home.tsx` (⚠️ territorio compartido con UX)

- Eliminados `VERSES_OF_DAY` y `getVerseOfDay()`.
- Handlers `handleDaily` y `handleCategory` ahora `async` + `loadingGame`.
- Añadida tarjeta "Principio del día" con los 4 campos.

**Handoffs cerrados**:

| Handoff                     | Estado                              |
| --------------------------- | ----------------------------------- |
| `Badge.verse?`              | ✅ Hecho                            |
| `dailyPrinciples.ts`        | ✅ Hecho                            |
| Confirmar data de preguntas | ✅ `auditQuestionData()` disponible |
| Dificultad adaptativa       | ✅ Implementada y confirmada        |

**Estado**: ✅ Cerrado.

### [FUNCIONAL] Ronda 2 — Bugs críticos post-test

#### Bug 1 — Timer congelado/inerte al montar la pregunta

**Reportado por**: tester en partida real.
**Causa raíz**: `setInterval` acumulaba drift + el `onTimeUp` inline del
padre reiniciaba el `useEffect` constantemente.

**Modificado**: `src/components/Timer.tsx` (territorio compartido)

- Reescrito con `requestAnimationFrame` + timestamps absolutos.
- `onTimeUp` guardado en `useRef`.
- Deps reducidas a `[paused, seconds]`.
- `useElapsedTime`: interval de 1000 ms → 250 ms.

#### Bug 2 — Hint-deduction sin pista inicial visible

**Reportado por**: tester en partida real.

**Modificado**: `src/components/questions/HintDeductionQuestion.tsx`

- Pista 1 ahora gratis y visible al montar.
- Pistas 2, 3, 4 cuestan −5 pts cada una.
- `revealedHints` arranca en 1.
- `onAnswer(input, revealedHints - 1)` → solo pistas pagadas.
- Máximo −15 pts (antes −20).

#### Bug 3 — Tildes en respuestas de texto libre

**Descubierto por**: auditoría interna.

**Modificado**: `src/store/useGameStore.ts`

- Nuevo helper `normalizeAnswer(s)`: `.trim().toLowerCase().normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")`.
- Aplicado en `case "hint-deduction"` de `checkAnswer`.

#### Optimización complementaria

**Modificado**: `src/screens/Game.tsx`

- `handleTimeUp` envuelto en `useCallback`.

#### Auditorías y herramientas

**Modificado**: `src/data/questions/index.ts`

- Nueva función pública `auditAcceptedAnswers(): AcceptedAnswersAudit`.

**Modificado**: `src/main.tsx`

- Bloque DEV expone `window.audit` y `window.auditAA`.

#### Normalización de datos

- `evangelios.ts` (ev-007): eliminado `"simón pedro"` (duplicado).
- `personajes.ts` (per-010): eliminados `"elías"` y `"profeta elías"`.
- `versiculos.ts` (ver-008): eliminados `"isaías 53:5"` y `"isaías 53"`.

**Estado**: ✅ Cerrado. Build limpio.

### [FUNCIONAL] Ronda 3 — Tareas 1 + 2 + 3 + 4

#### Tarea 1 — Badge "sin-pistas" (5 min)

**Decisión UX**: Opción A (sin cambios funcionales).

**Modificado**: `src/data/badges.ts`

- Badge `sin-pistas` (Deductor):
  - Descripción nueva: "Acertaste una pregunta de deducción usando solo la
    pista inicial."
  - Condición nueva: "Acertar una hint-deduction sin revelar pistas
    pagadas".

#### Tarea 2 — Tipos `verse-scramble` + `timeline`

**Modificado**: `src/types/index.ts`

- `VerseScrambleQuestion`: `words: string[]` + `correctOrder: number[]`.
- `TimelineQuestion`: `events: string[]` + `correctOrder: number[]`.

**Modificado**: `src/store/useGameStore.ts`

- `answerQuestion` acepta `selectedOrder?: number[]`.
- `AnswerInput` extendido con `selectedOrder`.
- Nuevo helper `ordersMatch(a, b)` para comparación posicional.
- `checkAnswer`:
  - `verse-scramble` y `timeline`: comparan `selectedOrder` con
    `question.correctOrder`.

**Modificado**: `src/data/questions/versiculos.ts`

- Añadidas 3 verse-scramble (`ver-011`, `ver-012`, `ver-013`).

**Modificado**: `src/data/questions/evangelios.ts`

- Añadidas 3 timeline (`ev-011`, `ev-012`, `ev-013`).

**Handoff a Visual**: spec de `SortableList.tsx` + 2 wrappers.

**Handoff a UX**: microcopy de los 2 tipos.

#### Tarea 3 — 14 datos adicionales

**Modificado**: `src/data/questions/versiculos.ts`

- Añadidas 7 verse-scramble (`ver-014` a `ver-020`).

**Modificado**: `src/data/questions/evangelios.ts`

- Añadidas 7 timeline (`ev-014` a `ev-020`).

**Modificado**: `src/main.tsx`

- `window.ALL` expuesto en DEV para auditar por tipo.

**Total banco**: 70 preguntas (era 56).

#### Tarea 4 — Setup vitest + tests

**Nuevo**: `vitest.config.ts` (separado de `vite.config.ts`).
**Nuevo**: `src/test/setup.ts` (jsdom + cleanup + matchMedia mock).

**Modificado**: `package.json`

- Scripts `test`, `test:ui`, `test:run`.

**Modificado**: `.gitignore`

- `coverage/`, `.vitest/`, `*.lcov`.

**Nuevos tests**:

- `src/utils/scoring.test.ts` — 33 tests.
- `src/utils/badges.test.ts` — 18 tests.
- `src/data/questions/index.test.ts` — 15 tests.

**Fix**: `src/utils/scoring.ts`

- `getNewBadges` ahora dedupea defensivamente con `Set`.

**Estado**: ✅ Cerrado. Build limpio.

---

## 🟣 UX — Resumen de sesiones (Fase 1)

### [UX] Sesión 1 — Microcopy global + reorden

- "Palabra para hoy" movida a posición 2 en Home.
- Microcopy del saludo varía según racha.
- Labels unificados: "Por qué", "Para tu vida", "Para pensar".
- "Insignias" → "Medallas" en toda la app.
- "Ver perfil" → "Ver mi bitácora".
- Títulos rotativos determinísticos en `ScoreFeedback`.
- Migración de `text-slate-*` a `text-white/*`.

### [UX] Sesión 2 — Microcopy tipos nuevos

- Título `verse-scramble`: "Ordena las palabras".
- Título `timeline`: "Ordena los eventos".
- Hint universal: "Arrastra para ordenar. También puedes usar las flechas."
- Botón: "Confirmar orden".
- 7 comportamientos UX definidos para `SortableList`.

### [UX] Sesión 3 — Validación `SortableList.tsx`

- ✅ Aprobado con 1 fix crítico + 2 menores.
- 🔴 Fix crítico: `aria-live` para lectores de pantalla.
- 🟡 Foco inicial respeta `disabled`.
- 🟡 `aria-grabbed` deprecado (no bloqueante).

### [UX] Sesión 4 — Validaciones en navegador

- ✅ Scroll invisible: rueda + teclado OK, sin layout shift.
- ✅ Modales: Esc cierra, foco vuelve, body no scrollea.
- ✅ `prefers-reduced-motion`: animaciones congeladas.

### [UX] Decisión badge "sin-pistas" (Deductor)

**Opción A**: sin cambios funcionales.

- Acción única: actualizar descripción del badge.

---

## 📋 Pendientes activos (Fase 2)

| #   | Tarea                              | Área              | Estado                |
| --- | ---------------------------------- | ----------------- | --------------------- |
| 1   | Configurar PWA (manifest + íconos) | Admin + Visual    | 🔴 Sin empezar        |
| 2   | Vercel Analytics + Core Web Vitals | Admin             | 🔴 Sin empezar        |
| 3   | Validar en móvil real (Test #2)    | UX                | ⏳ Pendiente móvil    |
| 4   | Ampliar banco 70 → 100+            | Funcional         | 🟡 Post Test #2       |
| 5   | Onboarding primera vez             | UX                | ⏸ Pospuesto a Test #2 |
| 6   | Migración a Supabase               | Admin + Funcional | 🟢 Fase 2.5           |
| 7   | Modo claro (opcional)              | Visual            | 🟢 Baja               |

---

## 📁 Archivos clave del proyecto

**Nuevos en Fase 1**:

- `src/utils/deviceTier.ts`
- `src/utils/animations.ts`
- `src/hooks/useCountUp.ts`
- `src/components/Skeleton.tsx`
- `src/components/Modal.tsx`
- `src/components/BadgeDetailModal.tsx`
- `src/components/PromptDialog.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/components/questions/SortableList.tsx`
- `src/components/questions/VerseScrambleQuestion.tsx`
- `src/components/questions/TimelineQuestion.tsx`
- `src/data/dailyPrinciples.ts`
- `vitest.config.ts`
- `src/test/setup.ts`
- `src/utils/scoring.test.ts`
- `src/utils/badges.test.ts`
- `src/data/questions/index.test.ts`

**Intactos** (regla de oro #1 respetada):

- `src/types/index.ts` (extendido, no roto)
- `src/db/database.ts` (extendido, no roto)
- `src/store/useGameStore.ts` (extendido, no roto)

---

## 🔑 Reglas de oro

1. Nunca romper lógica funcional sin avisar.
2. Mobile-first siempre.
3. Nunca exponer `node_modules` a GitHub.
4. Cada respuesta enseña.
5. Contenido teológico revisado antes de publicar (RVR1960).
6. Optimizar peso: assets ligeros.
7. Un chat por área, todo pasa por el usuario (product owner).

---

## Formato para futuras entradas
