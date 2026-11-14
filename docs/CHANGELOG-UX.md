# CHANGELOG-UX — Mente en el Camino (Selah)

## Metadatos

| Campo                    | Valor                                                                                       |
| :----------------------- | :------------------------------------------------------------------------------------------ |
| **Fase activa**          | 6 (Fase 5 cerrada)                                                                          |
| **Última actualización** | 2026-11-14                                                                                  |
| **Estado del área**      | Fase 5 cerrada. Documentación sincronizada. Handoffs H-FUN-05, H-VIS-06, H-ADM-01 abiertos. |

---

## Historial Fase 5 (2026-11-11 a 2026-11-14)

### 2026-11-14 — Cierre documental y sincronización

- **Sincronización de los 4 documentos maestros:** `CONTEXT-UX.md`, `INTERFACES-UX.md`, `MICROCOPY-DISCIPULADO.md`, `CHANGELOG-UX.md`.
- **`MICROCOPY-DISCIPULADO.md` → v0.1.1:** añadidos UX-1 ("Pasa el dispositivo a [nombre]"), UX-2 ("Ambos ganan"), UX-3 ("Lección [N] · [Título], [estado]"). Contexto bíblico. Casa del Alfarero como tono pastoral inmutable.
- **6 Reglas de Oro documentadas como inmutables** en `CONTEXT-UX.md` §2 (D4).
- **Palabras prohibidas documentadas como inmutables:** Examen · Test · Evaluación · ¡Felicidades! · Usuario · Completado.
- **Tono pastoral Casa del Alfarero** (Jeremías 18) documentado como inmutable.
- **Feedback de usuarios B4:** `[PENDIENTE — contenido no disponible al cierre.]` Se incorporará cuando el PO lo facilite.
- **Estado:** 4 documentos actualizados. Commit y push pendientes de ejecución por agente con acceso al repo.

### 2026-11-11 — Auditoría de tono y prohibición de «Completado»

- **Auditoría de tono contra `MICROCOPY-ONBOARDING.md`:** detectadas infracciones en el microcopy original del Discipulado.
- **Prohibición formal de «Completado»** (D1). Sustituto canónico: «Recorrida/Recorrido».
- **Afirmación estándar «Así es.»** (D2), heredada del Onboarding.
- **Patrón de feedback de 4 partes:** afirmación + dato + RVR1960 + reflexión breve.
- **Frases ≤12 palabras** como criterio de aceptación.
- **Criterios de aceptación ampliados a 16** (incluidos 13–16 de auditoría de tono).
- **Riesgo de handoff documentado:** strings de test existentes que puedan asertar «Completado». A Funcional como precondición de H-FUN-05.

### 2026-11-11 — Resoluciones del PO (D1–D6, P1–P10, I1–I5)

- **D1:** «Recorrida/Recorrido» canónico. «Completado» prohibido.
- **D2:** «Así es.» afirmación estándar.
- **D3:** `MICROCOPY-DISCIPULADO.md` propio con referencia cruzada.
- **D4:** Las 6 Reglas de Oro del Maestro sustituyen a las 4 anteriores.
- **D5/P9:** `FEEDBACK.md` vacío. No bloqueante. Hipótesis de tono desde Onboarding.
- **P1:** MVP 1 Senda piloto · 3 niveles × 3 lecciones.
- **P2:** Senda → Nivel → Lección. «Senda» canónico. «Sendero» solo sinónimo.
- **P3:** Las 9 Sendas de trivia son los ejes del Discipulado.
- **P4:** Sin cuentas en Fase 5. Progreso local en Dexie. Multi-dispositivo post-MVP.
- **P5:** Repaso cuenta para racha, no para progresión.
- **P6:** Reintento ilimitado. Sin timer.
- **P7:** Multijugador Local: solo trivia general.
- **P8:** Sin límite de tiempo en Discipulado.
- **P10:** RVR1960 confirmado.
- **I1:** Bundle canónico 29.49 kB gzip.
- **I2:** 110 preguntas en 9 Sendas.
- **I5:** «Torbellino» correcto. «Torbullino» descartado.

### 2026-11-11 — Contrato UX Discipulado v0.1

- **10 entregables** del contrato UX: objetivos, flujo, pantallas S0–S9, reglas de progresión R1–R9, microcopy, necesidades de datos, a11y AA, edge cases, 16 criterios de aceptación, dependencias.
- **Handoffs emitidos:** H-FUN-05 (datos/estados/eventos), H-VIS-06 (mapa/nodos/hitos), H-ADM-01 (offline/caché).
- **Principio rector:** camino de crecimiento, no evaluación.

---

## Historial Fase 4 (2026-11-04 a 2026-11-11)

### 2026-11-11 — Cierre documental y 9 Sendas

- Sincronización de los 4 documentos maestros de UX.
- Confirmación de las 9 Sendas activas.
- Modal PWA (H-VIS-05) y flecha de retorno integrados.
- Baseline de tests: **175/175**.

### 2026-11-09 — Post-mortem y Fix Bug B-1

- **Incidente:** `Onboarding.tsx` calibraba a todos a 1000 (`correctAnswer` vs `correctIndex`).
- **Fix:** `H-FUN-04` (`q.options[q.correctIndex]`).
- **Lección UX:** Regla de Tests de Comportamiento. Baseline real: 164.

### 2026-11-05 — Tests de flujo y Fase B

- `Onboarding.tsx` (3 pasos) y Gate en `App.tsx` (Splash + fail-open).
- Tests T1–T3 y test de doble clic.

### 2026-11-04 — Fase A (Plan estructural)

- Auditoría de componentes (H-06 retirado).
- Máquina de estados y edge cases del Onboarding.
- Gate asíncrono (A2) y Fail-Open.
