# INTERFACES-UX — Mente en el Camino (Selah)

Documento de contratos formales de colaboración entre UX y las demás áreas.

## 1. Handoffs cerrados (Fase 4)

### H-VIS-05 — Modal de Instalación PWA

Estado: ✅ Cerrado. Implementado por Visual. Verificado por UX.

### H-FUN-04 — Fix Bug B-1 (Evaluación Onboarding)

Estado: ✅ Cerrado. En producción.

### H-04 / H-05 — Onboarding (Lógica y Datos)

Estado: ✅ Cerrado. `completeOnboarding` y `onboardingQuestions` implementados.

---

## 2. Handoffs Fase 5 (abiertos)

### H-FUN-05 — Discipulado: datos, estados y eventos

| Campo                         | Contenido                                                                                                                                                  |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID**                        | H-FUN-05                                                                                                                                                   |
| **Destino**                   | Funcional                                                                                                                                                  |
| **Alcance**                   | Modelo conceptual Senda/Nivel/Lección. Estados de progreso. Recuperación de posición. Campos de feedback por pregunta. Separación de modelos Multijugador. |
| **Contrato UX de referencia** | §2, §4, §6, §8 del contrato UX (v0.1)                                                                                                                      |
| **Decisiones aplicadas**      | D1, D2, D4, P1–P8, P10                                                                                                                                     |
| **Estado**                    | 🟡 Abierto, condicionado a verificación de strings «Completado» en tests existentes.                                                                       |

**Necesidades UX (conceptuales, sin esquema):**

- Senda: id, nombre, mapeo a categoría de trivia.
- Nivel: id, senda_id, orden, prerequisito, lecciones.
- Lección: id, nivel_id, título, tarjetas, preguntas de reflexión, duración.
- Pregunta de reflexión: `correctIndex`, feedback correcto, pista de reintento, referencia RVR1960.
- Progreso de lección: estado, posición exacta, timestamps.
- Progreso de nivel y senda.
- Multijugador: modelo separado, solo trivia general.

**Eventos que UX consume:**
`leccion_iniciada`, `leccion_recorrida`, `leccion_reabierta`, `nivel_desbloqueado`, `nivel_recorrido`, `senda_recorrida`, `posicion_guardada`, `check_respondido`, `check_reintentado`, `partida_iniciada`, `partida_finalizada`.

**Precondición:** verificar strings de test que aserten «Completado». Alinear con «Recorrida/Recorrido».

**Referencia a feedback B4:** `[PENDIENTE CONFIRMACIÓN PO — contenido de B4 no disponible al cierre documental.]`

---

### H-VIS-06 — Mapa y representación visual del Discipulado

| Campo                         | Contenido                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------ |
| **ID**                        | H-VIS-06                                                                              |
| **Destino**                   | Visual                                                                                |
| **Alcance**                   | Mapa ("El Camino"), nodos Senda/Nivel/Lección, estados visuales, hitos, transiciones. |
| **Contrato UX de referencia** | §3, §7 del contrato UX (v0.1)                                                         |
| **Decisiones aplicadas**      | D1, D4                                                                                |
| **Estado**                    | 🟢 Abierto.                                                                           |

**Requisitos UX no negociables:**

- 5 estados distinguibles sin color (forma + icono + texto).
- Targets ≥44×44 px.
- Foco visible.
- `prefers-reduced-motion` respetado.
- Hitos de nivel y senda con celebración suave.
- Thumb zone en móvil.

---

### H-ADM-01 — Offline y caché de lecciones

| Campo                         | Contenido                                                                         |
| :---------------------------- | :-------------------------------------------------------------------------------- |
| **ID**                        | H-ADM-01                                                                          |
| **Destino**                   | Admin                                                                             |
| **Alcance**                   | Caché PWA de lecciones. Sincronización diferida de progreso local. Aviso offline. |
| **Contrato UX de referencia** | §3 (offline), §8 (edge cases) del contrato UX (v0.1)                              |
| **Decisiones aplicadas**      | P4, P8                                                                            |
| **Estado**                    | 🟢 Abierto.                                                                       |

**Requisitos UX no negociables:**

- Lecciones descargadas accesibles sin conexión.
- Reflexión respondible offline. Sincronización diferida con aviso.
- Aviso de offline visible, no alarmista.
- Progreso local conservado siempre.
- Sin promesa de sincronización multi-dispositivo (P4).

---

## 3. Handoffs pendientes (abiertos)

Tres handoffs Fase 5 abiertos. H-FUN-05 condicionado a verificación de strings.
