# CHANGELOG GLOBAL — Mente en el Camino (Selah)

> ⚠️ **DOCUMENTO GLOBAL**. Solo se actualiza cuando el product owner
> regresa al chat maestro. Los changelogs de cada área viven en
> `CHANGELOG-{ÁREA}.md`.

**Última actualización**: 2026-10-02 · Fase 3 en curso (Funcional R1-R3 cerrados).
**Estado**: PWA + Analytics + Rating adaptativo en producción. Test #2 en pausa.

---

## 📊 ESTADO GLOBAL (2026-10-02)

| Área      | Estado                  | Pendiente real                                  |
| --------- | ----------------------- | ----------------------------------------------- |
| Funcional | ✅ Rating R1-R3 cerrado | R5 limpieza · Ampliar banco 70 → 110+           |
| Visual    | ✅ Fase 2 limpia        | Rating en Profile (handoff) · Bloqueado Test #2 |
| UX        | ✅ Fase 2 cerrada       | Onboarding calibración · Test #2                |
| Admin     | ⏳ Tarea 3 activa       | Core Web Vitals · Supabase (Fase 3.5)           |

**Métricas**:
| Métrica | Valor |
|---------|-------|
| Preguntas en banco | 70 |
| Categorías activas | 5 (de 9) |
| Tipos de pregunta | 7/7 |
| Insignias | 19 |
| Principios del día | 31 |
| Tests unitarios | **127/127** |
| Bundle gzip | **181.51 kB** |
| Precache PWA | 15 entries · 805.98 KB |
| PWA installable | ✅ Chrome |
| Web Analytics | ✅ Funcionando |
| Speed Insights | ⏳ Recolectando |
| Rating adaptativo | ✅ Activo |
| Costo mensual | $0 |

---

## 🎯 FASE 3 — OBJETIVOS

1. **Test #2** con los 5 jóvenes (en pausa por decisión del PO).
2. **Análisis de feedback** cualitativo + cuantitativo.
3. **Lectura Core Web Vitals** y decisiones.
4. **Ampliar banco** 70 → 110+ preguntas.
5. **Onboarding** de primera vez.
6. **Notificaciones** de racha diaria.
7. **Fase 3.5**: migración a Supabase (auth, ranking, multijugador).

---

## 📋 PENDIENTES ACTIVOS (Fase 3)

| #   | Tarea                                | Área               | Estado               |
| --- | ------------------------------------ | ------------------ | -------------------- |
| 1   | Rating visible en Profile            | Visual + Funcional | 🟡 Handoff listo     |
| 2   | Onboarding calibración (3 preguntas) | UX + Funcional     | 🟡 Handoff listo     |
| 3   | **R5** — Retirar `getRecentAccuracy` | Funcional          | 🟡 Próximo           |
| 4   | Ampliar banco 70 → 110+              | Funcional          | 🟡 Post R5           |
| 5   | Lectura Core Web Vitals + decisiones | Admin              | ⏳ Datos disponibles |
| 6   | Workflow de contenido (documentar)   | Admin              | 🟡 Bloquea Funcional |
| 7   | Test #2 con los 5 jóvenes            | UX                 | ⏸ Pausa PO           |
| 8   | Notificaciones de racha              | UX + Admin         | 🟢 Post Test #2      |
| 9   | Retirar `SortableList.tsx`           | Visual             | 🟢 Post Test #2      |
| 10  | Migración a Supabase (Fase 3.5)      | Admin + Funcional  | 🟢 Futuro            |

---

## 📚 HISTORIAL CONSOLIDADO FASE 3

### 2026-10-02 — Funcional · R3 CERRADO: Selector por rating

- `pickAdaptiveQuestions` reescrito: lee `getUserRating()`, delega en
  `pickQuestionsByRating`.
- Cap `MAX_STRETCH = 400`: nunca sirve una pregunta por encima de
  `userRating + 400`.
- Puerta de "trampas" eliminada: rating filtra naturalmente.
- 61 tests de rating. Suite total: **127/127**.
- Verificado manualmente: rating 1000 → fáciles/medias.
  Rating 1800 → difíciles con hint-deduction.

### 2026-10-02 — Funcional · R2 CERRADO: Persistencia del rating

- `UserRating` con `id: string` (clave Dexie).
- Dexie `version(2)`: tabla `userRating` (id = `local-player`).
- Migración idempotente: datos v1 intactos.
- Nuevas funciones: `getUserRating`, `saveUserRating`, `resetUserRating`,
  `createDefaultUserRating`.
- `resetProfile` limpia `userRating`.
- Backup incluye `userRating` (`version: 2`).
- `getRecentAccuracy` marcado `@deprecated` (se retira en R5).
- Store: `userRating` en `init()`. `answerQuestion` actualiza rating.
- Nuevas acciones: `calibrateWithResults`, `resetRating`.
- Tests: 121/121. Bundle +0.53 kB gzip.

### 2026-10-02 — Funcional · R1 CERRADO: Módulo de rating aislado

- Nuevo `src/utils/rating.ts`: fórmula ELO-like (K=32 early / K=16 stable),
  `getQuestionRating`, `calibrateInitialRating`, `pickQuestionsByRating`,
  `getRatingLabel`.
- Nuevo `src/utils/rating.test.ts` (55 tests).
- Nuevos tipos: `UserRating`, `RatingSnapshot`, `RatingConfig`.
- No integrado aún: cero riesgo funcional.
- Tests: 66 → 121. Bundle sin cambios (tree-shaken).

### 2026-10-01 — Fase 3 iniciada

- Fase 2 no tocó territorio Funcional.
- Handoff de Admin (Analytics) aplicado en `src/main.tsx`.

---

## 📚 HISTORIAL CONSOLIDADO FASE 2

### 2026-09-25 — Visual · Handoff género TapToPlace CERRADO

- Prop `itemGender?: "f" | "m"` (default "f").
- `TimelineQuestion.tsx` pasa `"m"`. `VerseScrambleQuestion.tsx` usa default.
- Build limpio, 66/66 tests.

### 2026-09-25 — UX · Handoffs 1 y 2 CERRADOS

- **Handoff 1**: "Mente en el Camino" → "Selah" en Home.tsx.
- **Handoff 2**: microcopy Timeline "palabra" → "evento".
- No renombrado: `MenteEnElCaminoDB`.

### 2026-09-25 — Admin · Tarea 2 CERRADA: Analytics

- `@vercel/analytics` + `@vercel/speed-insights` integradas.
- Plan Hobby (Free). Costo: $0/mes.
- Docs: `docs/ANALYTICS.md`.
- Analytics ✅. Speed Insights ⏳.

### 2026-09-25 — Visual · Handoff UX TapToPlace CERRADO

- Nuevo `TapToPlace.tsx`.
- `SortableList.tsx` marcado `@deprecated`.
- `Button.tsx`: paleta arreglada + variante `reino`.
- Bundle gzip: −2.26 kB.

### 2026-09-24 — Visual · Handoffs PWA CERRADOS

- `index.html`, `favicon.svg`, `icons.svg` eliminado.

### 2026-09-24 — Admin · Tarea 1 CERRADA: PWA

- Marca pública: Selah. Slogan: "Pausa. Reflexiona. Aprende.".

---

## 📚 HISTORIAL CONSOLIDADO FASE 1

### [SISTEMA] Documentación maestra

4 áreas: Funcional, Visual, UX, Admin. Paleta "Noche y Alba".

### [FEEDBACK] Test #1 — 5 jóvenes

1. Rendimiento móviles gama baja.
2. Preguntas trampa mezcladas con fáciles. ← **RESUELTO por Rating R1-R3.**
3. "Se siente vacía", "sin principios".
4. Drag & drop con lag táctil.

### [VISUAL] Fase 1 — 4 rondas

Ronda 1: Optimización + Results/Profile + Skeleton.
Ronda 2: Modales custom.
Ronda 3: Home + scrollbar.
Ronda 4: SortableList + tipos nuevos.

### [FUNCIONAL] Fase 1 — 3 rondas

Ronda 1: dailyPrinciples + Badge.verse + dificultad adaptativa.
Ronda 2: Bugs críticos.
Ronda 3: Tipos nuevos + 14 datos + vitest.

### [UX] Fase 1 — 4 sesiones

Microcopy global, tipos nuevos, SortableList, validaciones navegador.

---

## 🔑 REGLAS DE ORO

1. Nunca romper lógica funcional sin avisar.
2. Mobile-first siempre.
3. Nunca exponer `node_modules` a GitHub.
4. Cada respuesta enseña.
5. Contenido teológico revisado (RVR1960).
6. Optimizar peso.
7. Un chat por área, todo pasa por el product owner.
8. **NUNCA renombrar `MenteEnElCaminoDB`**.

---

**Fin del CHANGELOG global (Fase 3 · R1-R3 consolidados).**
