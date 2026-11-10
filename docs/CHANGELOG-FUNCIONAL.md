### 2026-11-10 · Fase 4 · H-FUN-03 — Lazy Load del banco de preguntas (Rendimiento)

**Objetivo**: Reducir el bundle inicial cargando las 70 preguntas bajo demanda.

**Implementación**:

- `src/data/questions/index.ts`: Imports dinámicos (`import()`) y `loadQuestionBank()`.
- `src/store/useGameStore.ts`: Nueva acción `loadAndStartGame`.
  - **[FIX 2026-11-10]**: Se eliminó un delay artificial de 400ms que penalizaba conexiones rápidas. Ahora la carga es inmediata y el spinner se muestra de forma orgánica solo si el componente tarda en resolver.
- `src/App.tsx` / `Home.tsx` / `main.tsx`: Integración del estado `isLoadingQuestions` (spinner) y adaptación asíncrona de auditorías.

**Verificación**:

- `npx vitest run` → **164/164** ✅
- `npm run build` → limpio ✅
- **Bundle principal**: **29.49 kB gzip** (antes: 184.12 kB) → Reducción del **~84%** en el payload inicial.
- **Prueba manual**: Inicio casi instantáneo verificado.

**Commit**: `fix(funcional): eliminar delay artificial en carga de preguntas`.
**Sin push a main**.
