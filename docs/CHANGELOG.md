### 2026-11-04 — Funcional · H-04/H-05 CERRADOS · Merge autorizado a main

- **H-05 CERRADO**: `src/data/onboardingQuestions.ts` con 3 preguntas MC
  (onb-001 fácil Noé · onb-002 media 40 · onb-003 difícil Belsasar/Daniel 5:25).
  Q3 cambiada de Elías a Belsasar (B1=Opción B) para evitar duplicación con
  per-010. RVR1960 completo. application/reflection `// revisado: 2026-11-04`.
  Fuera de ALL_QUESTIONS y QUESTIONS_BY_CATEGORY (no entra en pool adaptativo).
- **H-04 CERRADO**: `completeOnboarding(results: boolean[]): Promise<void>`
  atómico, idempotente, con null-guard (W1) + in-flight guard (DF-1).
  No otorga XP/puntos/badges. `UserProfile.onboardingCompleted?: boolean`
  (opcional, sin migración Dexie). `MenteEnElCaminoDB` intacto.
- **Gate EXPUESTO**: `hasCompletedOnboarding(): Promise<boolean>` en
  `src/db/database.ts`.
- **Tests**: 151/151 (127 baseline + 24 nuevos). Build limpio (475 modules).
  Bundle gzip 182.34 kB (+0.22 kB vs baseline).
- **Warnings A1–A3 elevados a CONTRATO para UX Fase B**:
  A1 no rutear por answerQuestion/startGame; A2 gate async con estado de
  carga; A3 importar de `../data/onboardingQuestions` directo.
- **Limitaciones documentadas** (L1-L3): atomicidad local, sin unit test I/O
  de gate, in-flight guard en memoria. Validación end-to-end en Test #2.
- **Merge a main AUTORIZADO por el Maestro**. PO ejecuta. Sin cambios de
  comportamiento en producción (nada importa todavía los nuevos módulos).
- **Siguiente**: UX Fase B (`Onboarding.tsx` + gate). Funcional queda en cola
  (R5 → banco 70→110+) hasta cerrar onboarding end-to-end.
