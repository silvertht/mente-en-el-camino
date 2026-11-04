### 2026-11-04 — UX · Fase B entregada · ⚠️ BLOQUEADOR: usuarios existentes perderían rating

- **Fase B ENTREGADA** (rama local, sin push): `Onboarding.tsx` + gate en
  `App.tsx`. 152/152 tests · build limpio · bundle 184.03 kB (+1.69 kB).
  C1–C3 resueltos · A1–A3 respetados.
- **BLOQUEADOR DETECTADO POR EL MAESTRO (falla del contrato v2, no de UX)**:
  `hasCompletedOnboarding()` devuelve `false` para usuarios existentes (perfil
  con `userRating` real pero SIN `onboardingCompleted`). Al desplegar, esos
  usuarios serían forzados al onboarding y `completeOnboarding` recalibraría
  su ELO real → pérdida de progreso (Regla de Oro 1 y 4).
- **Fix requerido (Funcional, ~15 min)**:
  A) Migración de datos en `database.ts`: si `profile.userRating !== undefined`
  y `onboardingCompleted === undefined` → setear `true` (idempotente, sin
  subir versión Dexie).
  B) Guard defensivo en `completeOnboarding`: si usuario existente con rating
  → marcar flag sin calibrar.
  C) 3 tests nuevos: existente con rating, existente ya onboardeado, usuario
  nuevo.
- **Lección para futuros contratos** (Regla del Maestro): todo contrato que
  toque datos de usuario debe declarar explícitamente el caso de usuarios
  pre-migración. El contrato v2 no lo hizo.
- **Tests del flujo onboarding**: 1 smoke test es insuficiente. Mínimo 3 más
  (3 correctas → `[T,T,T]`; 3 incorrectas → `[F,F,F]`; error → retry). No
  bloquea, pero se añaden antes del merge.
- **H-06**: retirado de Fase B (C1 confirmó Button/Card son clases inline).
  **Reactivado al backlog de Visual** para futura extracción de componentes.
- **Merge a main**: NO autorizado hasta fix + tests. Sin push.
