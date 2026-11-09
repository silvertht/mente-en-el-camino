### 2026-11-09 — 🔴 B-1 ARREGLADO · H-FUN-04 CERRADO · Onboarding funcional en producción

- **B-1 RESUELTO**: Onboarding.tsx evaluaba `q.correctAnswer || q.correct ||
q.answer` con preguntas `MultipleChoiceQuestion` (correctIndex). Resultado:
  correctAnswer === undefined siempre → feedback "Casi." en correctas →
  completeOnboarding([false,false,false]) → calibración a 1000.
- **Fix**: `const correctAnswer = q.options[q.correctIndex];` (patrón ya usado
  en checkAnswer del store). 2 líneas + 1 import + 1 cast.
- **Verificación**: 164/164 tests · build limpio · bundle 184.12 kB
  (−0.01 kB) · prueba manual confirmada (3 correctas → ELO ≈1450;
  3 incorrectas → ELO 1000 mínimo).
- **Reglas nuevas**:
  1. Componentes que consuman datos de otra área requieren test de
     COMPORTAMIENTO real, no solo smoke test.
  2. Tests no duplican lógica del componente; validan comportamiento
     observable.
  3. El Maestro prueba manualmente toda feature nueva antes de aprobar
     paso a producción.
  4. Funcional debe confirmar prueba manual propia antes de pasar al PO.
- **Fallo de proceso reconocido**: el bug estuvo en producción desde
  682e60e. Smoke test de UX insuficiente + tests T1-T3 replicaron el bug +
  Maestro aprobó Fase B sin prueba manual. Corregido con las 4 reglas.
- **Estado**: Fix pusheado a main (autorizado). Vercel deploya. Onboarding
  funcional en producción.
