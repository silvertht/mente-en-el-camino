### 2026-11-09 · Fase 4 · H-FUN-04 — Fix evaluación de respuestas en Onboarding (B-1 cerrado)

**Síntoma reportado** (handoff HANDOFF-ADMIN→FUN-04, verificado en `main`):
`npx vitest run` mostraba **4 fallos** en `src/screens/Onboarding.test.tsx`
que a primera vista parecían bugs del test. Tras diagnóstico formal:

- **Bug del test (mitad 1)**: `getCorrectAnswer` usaba
  `q.correctAnswer || q.correct || q.answer`, todos `undefined` en
  `onboardingQuestions.ts` (que usa `correctIndex: number`). → fix aplicado.
- **Bug del componente (B-1, raíz)**: `src/screens/Onboarding.tsx:26-27`
  hacía exactamente lo mismo: `q.correctAnswer || q.correct || q.answer`.
  Consecuencia productiva: `correctAnswer === undefined` **siempre** →
  `option === undefined → false` → **todo feedback era "Casi."**,
  **todo `results` era `[false, false, false]`**, **todo `rating`
  calibraba a 1000 (mínimo)**. Bug vivo en producción (`ac3e6da`) desde
  `682e60e` según el Maestro.

**Fix aplicado (autorizado por el Maestro — Opción A con condiciones)**:

- `src/screens/Onboarding.tsx` (2 líneas + 1 import):
  ```diff
  + import type { MultipleChoiceQuestion } from "../types";
  - const q = onboardingQuestions[step] as any;
  - const correctAnswer = q.correctAnswer || q.correct || q.answer;
  + const q = onboardingQuestions[step] as MultipleChoiceQuestion;
  + const correctAnswer = q.options[q.correctIndex];
  ```
