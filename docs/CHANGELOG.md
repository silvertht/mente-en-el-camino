### 2026-11-05 — Diagnóstico de estado + corrección de proceso

**Estado real de main** (verificado por el PO con git):

- Onboarding COMPLETO en main y en producción (Vercel ac3e6da).
- Componente + gate + datos + tests + B1 hotfix, todos en main.
- La rama `fase4/onboarding-h04-h05` NUNCA se creó. Los commits se hicieron
  directamente en main (varios con mensaje genérico "Actualizacion").
- Baseline real de tests: 164 (161 passing, 4 failing en Onboarding.test.tsx).

**B1 confirmado en producción**:

- `shouldMigrateOnboarding` exportado en db/database.ts, usado en init() y
  hasCompletedOnboarding() (self-heal).
- Guard `answeredCount > 0` en completeOnboarding.
- Usuarios existentes protegidos. Sin pérdida de ELO. Crisis descartada.

**Fallos de proceso (lecciones)**:

1. La rama no se creó antes de commitear. Los commits fueron directos a main.
2. Mensajes de commit genéricos ("Actualizacion") impiden rastrear cambios.
3. El Maestro no verificó `git branch --show-current` antes de pedir el push.
4. El PO no verificó la rama antes de cada commit.

**Regla nueva del proyecto**:

- Todo brief que requiera commits incluye paso 0: `git branch --show-current`
  debe devolver la rama esperada antes de escribir código.
- Prohibido commit con mensaje genérico. Todo commit sigue Conventional
  Commits (feat/fix/perf/docs/test/refactor).
- Antes de cualquier push, el PO verifica `git log --oneline -5` y reporta al
  Maestro si hay commits inesperados.

**Consecuencias operativas**:

- Test #2 pasa a validación POST-producción (el onboarding ya está visible
  a usuarios nuevos). Se ejecuta sobre la URL de producción.
- H-FUN-04 emitido a Funcional para corregir los 4 tests (bug de test, no
  del componente). No bloquea el uso del onboarding; sí bloquea el CI verde.
- Admin continúa T2 con datos reales (visualizer + Lighthouse + Speed
  Insights) y commitea T1 (CONTENT-WORKFLOW.md).
- Visual queda desbloqueado: no hay rama en vuelo que colisione.
