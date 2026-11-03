### 2026-11-03 — UX · H-02.1 cerrado · H-02.2 decisión A · Onboarding aprobado (parcial)

- **H-02.1 CERRADO**: `selectedOrder?: number[]` en `AnswerParams` (`Game.tsx`).
  Commit `8efd424`. Build limpio · 127/127 tests · diff 1+/0-.
- **H-02.2 diagnóstico E1 confirmado**: `useElapsedTime` (useState) en el fiber de
  `Game` → ~1 re-render/s de `Game` mientras `isAnswering`. No funcional; rendimiento
  en gama baja. **Decisión D1 = A**: aislar en `<ElapsedReporter>` + `elapsedRef` en
  `Game.tsx`. `Timer.tsx` no se toca. Requiere medición antes/después + build/test verde.
- **Test #2**: desacoplado (F4-D2). Se ejecuta antes de producción del onboarding,
  no antes de implementarlo. 9 supuestos documentados (CHANGELOG-UX §7.2).
- **Onboarding aprobado en principio**:
  - D2 = Sí: `Onboarding.tsx` + gate de routing en `App.tsx` son territorio UX
    (expansión explícita). Componentes reutilizables nuevos → H-06 Visual.
  - D3 = Sí: 3 preguntas (Noé/Gn 6:14 · 40/Mt 4:2 · Elías/2 R 2:11) → Funcional
    vía H-05 para RVR1960, no duplicación y tipo `Difficulty` existente.
  - Contrato H-04: `completeOnboarding(results: boolean[]): Promise<void>` atómico.
    Specs formales en `INTERFACES-UX.md` antes de pasar a Funcional.
- **Secuencia**: UX (A + specs) → Funcional (H-04/H-05 + tests) → UX (`Onboarding.tsx`)
  → Visual (H-06 si aplica) → Admin (CWV + docs + H-07 opcional) → Test #2 pre-producción.
