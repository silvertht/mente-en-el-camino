# CONTEXT-UX — Mente en el Camino (Selah)

## Metadatos

| Campo                       | Valor                                                                                                              |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Área**                    | Experiencia de Usuario (UX)                                                                                        |
| **Proyecto**                | Mente en el Camino (marca pública: Selah)                                                                          |
| **Fase activa**             | 6 (Fase 5 cerrada)                                                                                                 |
| **Última actualización**    | 2026-11-14                                                                                                         |
| **Estado del área**         | Fase 5 cerrada. Discipulado contratado (S0–S9). Microcopy v0.1.1. Handoffs H-FUN-05, H-VIS-06 y H-ADM-01 abiertos. |
| **Documentos relacionados** | `CHANGELOG-UX.md`, `INTERFACES-UX.md`, `MICROCOPY-ONBOARDING.md`, `MICROCOPY-DISCIPULADO.md`, `CONTEXT-MAESTRO.md` |

---

## 1. Identidad del área

### 1.1 Misión

UX gobierna la experiencia del usuario de punta a punta: flujos, microcopy, accesibilidad AA, notificaciones de racha y coherencia de marca Selah. Trabaja en la frontera entre lo visual y lo funcional.

### 1.2 Responsabilidades formales

1. Diseñar flujos de usuario.
2. Redactar y mantener el microcopy global y por tipo de pregunta.
3. Diseñar el sistema de notificaciones de racha diaria.
4. Garantizar accesibilidad AA.
5. Analizar feedback de testers.
6. Velar por la coherencia de la marca Selah.
7. Documentar handoffs a otras áreas.

### 1.3 Límites explícitos

UX no hace: lógica de negocio (Funcional), sistema visual (Visual), infraestructura PWA (Admin).

---

## 2. Reglas de Oro (INMUTABLES)

Las 6 Reglas de Oro de `CONTEXT-MAESTRO.md` son canónicas (decisión D4, Fase 5). Sustituyen la versión anterior de 4 reglas. No se modifican sin decisión explícita del PO.

| #     | Regla                                          | Aplicación UX                                                 |
| :---- | :--------------------------------------------- | :------------------------------------------------------------ |
| **1** | No romper lógica funcional sin avisar.         | Todo cambio UX que toque lógica se emite como handoff formal. |
| **2** | Mobile-first siempre.                          | Targets ≥44×44 px. Thumb zone. Frases ≤12 palabras.           |
| **3** | Un chat por área; todo pasa por el PO/Maestro. | UX no implementa. Emite handoffs.                             |
| **4** | NUNCA renombrar `MenteEnElCaminoDB`.           | Regla dura. Sin excepciones.                                  |
| **5** | Textos bíblicos en RVR1960.                    | Lecciones, feedback y referencias.                            |
| **6** | Cero deuda técnica.                            | Pruebas de comportamiento. Microcopy auditado.                |

### 2.2 Tono pastoral (INMUTABLE)

**Tono Selah:** cálido, cercano, no condescendiente. Segunda persona ("tú"). Frases ≤12 palabras. Mobile-first.

**Metáfora pastoral — "Casa del Alfarero" (Jeremías 18:1-6):**
El jugador es barro en proceso. Selah no evalúa el barro: acompaña al alfarero. El error no es fracaso: es parte del modelado. Todo microcopy debe leerse desde esta metáfora.

`[PENDIENTE CONFIRMACIÓN PO: definición oficial de "Casa del Alfarero" y su alcance en microcopy.]`

### 2.3 Palabras prohibidas (INMUTABLE)

Examen · Test · Evaluación · ¡Felicidades! · Usuario · Completado.

Sustitutos canónicos:

- "Completado" → "Recorrida" / "Recorrido" (D1).
- "¡Felicidades!" → "Así es." (D2).
- "Usuario" → "jugador" / "tú".
- "Examen" / "Test" / "Evaluación" → "reflexión".

### 2.4 Términos canónicos

| Término                   | Género     | Definición                                           |
| :------------------------ | :--------- | :--------------------------------------------------- |
| **Senda**                 | fem.       | Las 9 categorías de trivia. Eje temático.            |
| **Nivel**                 | masc.      | Etapa dentro de una Senda.                           |
| **Lección**               | fem.       | Unidad dentro de un Nivel.                           |
| **Recorrida / Recorrido** | fem./masc. | Estado de Lección/Senda o Nivel terminado.           |
| **Sendero**               | masc.      | Sinónimo explícito de Senda. Nunca entidad distinta. |

---

## 3. Estado por fase

### 3.1 Fase 4 — cerrada (2026-11-11)

Onboarding validado en producción. Calibración ELO (1000–1450). Bug B-1 corregido (H-FUN-04). Modal PWA integrado (H-VIS-05). 9 Sendas activas. 175/175 tests.

### 3.2 Fase 5 — cerrada (2026-11-14)

**Espacio de Discipulado (Aprendizaje):** contrato UX completo.

- **Estructura canónica:** Senda → Nivel → Lección (P2). Las 9 Sendas de trivia son los ejes del Discipulado (P3).
- **Pantallas S0–S9:** Home · Mapa · Nivel · Intro Lección · Lección · Check · Cierre · Hito · Repaso · Multijugador.
- **Estados de progreso:** Sin empezar · En curso · Recorrida/Recorrido · Bloqueado · Repaso. Distinguibles sin color.
- **Reglas de progresión R1–R9:** desbloqueo secuencial, repaso abierto, anti-farming, anti-abandono, sin timer, reintento ilimitado. Repaso cuenta para racha, no para progresión (P5).
- **MVP:** 1 Senda piloto · 3 niveles × 3 lecciones (P1). Reutiliza preguntas existentes.
- **Multijugador Local:** modo paralelo, fuera del flujo. Solo trivia general (P7). Sin cuentas (P4).
- **Microcopy:** `MICROCOPY-DISCIPULADO.md` v0.1.1. Patrón de feedback de 4 partes (afirmación + dato + RVR1960 + reflexión).

**Decisiones aplicadas:** D1–D6, P1–P10, I1–I5 (ver §4).

---

## 4. Decisiones consolidadas (Fase 5)

### 4.1 Decisiones del PO (D1–D6)

| ID     | Decisión                         | Resolución                                                                      |
| :----- | :------------------------------- | :------------------------------------------------------------------------------ |
| **D1** | Término para estado "completado" | **B — "Recorrida/Recorrido"**. Prohibido "Completado".                          |
| **D2** | Afirmación estándar de feedback  | **"Así es."**                                                                   |
| **D3** | Microcopy propio vs anexo        | **`MICROCOPY-DISCIPULADO.md` propio**, con referencia cruzada.                  |
| **D4** | Reglas de Oro                    | **Las 6 del Maestro sustituyen a las 4 anteriores.**                            |
| **D5** | `FEEDBACK.md` vacío              | Se procede con hipótesis de tono basada en Onboarding. Se valida cuando exista. |
| **D6** | Preguntas de producto            | Resueltas en P1–P10.                                                            |

### 4.2 Resoluciones de producto (P1–P10)

| ID      | Pregunta             | Resolución                                                                  |
| :------ | :------------------- | :-------------------------------------------------------------------------- |
| **P1**  | Contenido            | PO/editorial. MVP: 1 Senda piloto · 3 niveles × 3 lecciones.                |
| **P2**  | Estructura           | Senda → Nivel → Lección. "Senda" canónico. "Sendero" solo sinónimo.         |
| **P3**  | Sendas y Discipulado | Las 9 Sendas de trivia SON los ejes. Taxonomía única.                       |
| **P4**  | Cuentas              | Sin cuentas en Fase 5. Progreso local en Dexie. Multi-dispositivo post-MVP. |
| **P5**  | Repaso y racha       | Repaso cuenta para racha, no para progresión. R9 lo refleja.                |
| **P6**  | Reintento            | Ilimitado. Sin timer.                                                       |
| **P7**  | Multijugador Local   | Solo trivia general (110 preguntas). Sin mezclar con Discipulado.           |
| **P8**  | Límite de tiempo     | Sin límite en Discipulado. Timer solo en Multijugador si se decide.         |
| **P9**  | `FEEDBACK.md`        | Vacío. No bloqueante.                                                       |
| **P10** | RVR1960              | Confirmado en lecciones, feedback y referencias.                            |

### 4.3 Inconsistencias resueltas (I1–I5)

| ID     | Resolución                                      |
| :----- | :---------------------------------------------- |
| **I1** | Bundle gzip canónico: **29.49 kB**.             |
| **I2** | 110 preguntas en 9 Sendas.                      |
| **I3** | Resuelto por D4.                                |
| **I4** | Resuelto por D5/P9.                             |
| **I5** | "Torbellino" correcto. "Torbullino" descartado. |

---

## 5. Métricas

| Métrica                  | Valor (2026-11-14)               |
| :----------------------- | :------------------------------- |
| Tests unitarios          | **175/175**                      |
| Bundle gzip              | **29.49 kB**                     |
| Preguntas activas        | **110** en 9 Sendas              |
| Onboarding en producción | ✅ Activo                        |
| Modal PWA                | ✅ Integrado                     |
| Contrato Discipulado     | ✅ v0.1.1                        |
| Handoffs Fase 5 abiertos | 3 (H-FUN-05, H-VIS-06, H-ADM-01) |
