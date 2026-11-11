# CHANGELOG-UX — Mente en el Camino (Selah)

## Metadatos

| Campo                    | Valor                                                 |
| :----------------------- | :---------------------------------------------------- |
| **Fase activa**          | 5 (Fase 4 cerrada)                                    |
| **Última actualización** | 2026-11-11                                            |
| **Estado del área**      | Documentación sincronizada. Fase 4 cerrada con éxito. |

---

## Historial Fase 4 (2026-11-04 a 2026-11-11)

### 2026-11-11 — Cierre Documental y 9 Sendas

- Sincronización de los 4 documentos maestros de UX (`CONTEXT`, `INTERFACES`, `CHANGELOG`, `MICROCOPY`).
- Confirmación de las 9 Sendas (categorías) activas en la app.
- Integración final del modal PWA (H-VIS-05) y flecha de retorno en pantallas secundarias.
- Baseline de tests confirmado en **175/175** (incluye tests de comportamiento).

### 2026-11-09 — Post-mortem y Fix Bug B-1

- **Incidente**: `Onboarding.tsx` calibraba a todos los usuarios a 1000 porque leía `correctAnswer` en lugar de `correctIndex`.
- **Fix**: Funcional aplicó `H-FUN-04` (`q.options[q.correctIndex]`).
- **Lección UX**: Se instaura la **Regla de Tests de Comportamiento**. Los tests ya no pueden duplicar lógica; deben validar comportamiento observable (UI y argumentos de funciones). El baseline real era 164, no 165.

### 2026-11-05 — Tests de Flujo y Fase B

- Implementación de `Onboarding.tsx` (3 pasos) y el Gate en `App.tsx` (Splash + fail-open).
- Creación de los tests de flujo T1-T3 (3 correctas, 3 incorrectas, error + retry) y test opcional de doble clic.

### 2026-11-04 — Fase A (Plan Estructural)

- Auditoría de componentes (H-06 retirado).
- Definición de la máquina de estados y edge cases del Onboarding.
- Definición del Gate asíncrono (A2) y Fail-Open.
