### 2026-11-10 · Fase 4 · H-FUN-03 — Lazy Load del banco de preguntas (Rendimiento)

**Objetivo**: Reducir el bundle inicial cargando las 70 preguntas bajo demanda.

**Implementación**:

- `src/data/questions/index.ts`: Imports dinámicos (`import()`) y `loadQuestionBank()`.
- `src/store/useGameStore.ts`: Nueva acción `loadAndStartGame` con delay de 400ms para UX.
- `src/App.tsx` / `Home.tsx` / `main.tsx`: Integración del estado `isLoadingQuestions` (spinner) y adaptación asíncrona de auditorías.
- `motion` y `dexie`: NO tocados. Se aislaron en chunks de vendor (handoff a Visual para lazy load de componentes si se desea en el futuro).

**Verificación**:

- `npx vitest run` → **164/164** ✅
- `npm run build` → limpio ✅
- **Bundle principal**: **29.49 kB gzip** (antes: 184.12 kB) → Reducción del **~84%** en el payload inicial. Las preguntas ahora se cargan en chunks de 2.7 a 5 kB.
- **Prueba manual**: Spinner visible y partida completada [PENDIENTE CONFIRMAR].

**Commit**: `perf(funcional): lazy load de questions (H-FUN-03)`.
**Sin push a main**.
