# CHANGELOG-UX — Mente en el Camino (Selah)

Registro cronológico **exclusivo del área UX**.
Para cambios de otras áreas, consultar `CHANGELOG.md` (global).
Para contratos inter-área, consultar `INTERFACES-UX.md`.
Para el contexto maestro del área, consultar `CONTEXT-UX.md`.

---

## Metadatos del documento

| Campo                     | Valor                                                                     |
| ------------------------- | ------------------------------------------------------------------------- |
| Área                      | Experiencia de Usuario (UX)                                               |
| Proyecto                  | Mente en el Camino (marca pública: Selah)                                 |
| Fase activa               | 3                                                                         |
| Última actualización      | 2026-10-01                                                                |
| Estado del área           | Reconocimiento pre-Test #2 cerrado. Test #2 en pausa por decisión del PO. |
| Documento anterior        | `CHANGELOG-UX.md` (Fase 2, 2026-09-25)                                    |
| Próxima revisión esperada | Al reactivarse Test #2 o al aplicar el fix de `AnswerParams`              |

---

## Índice

1. Estado del área (snapshot)
2. Handoffs activos (tabla)
3. Decisiones clave (tabla)
4. Historial cronológico
   - 4.1 Fase 3
   - 4.2 Fase 2
   - 4.3 Fase 1
5. Métricas históricas
6. Convenciones de este documento

---

## 1. Estado del área (snapshot 2026-10-01)

### 1.1 Contadores

| Métrica                          | Valor                                                                |
| -------------------------------- | -------------------------------------------------------------------- |
| Fase activa                      | 3                                                                    |
| Handoffs cerrados históricamente | 5                                                                    |
| Handoffs cerrados en Fase 2      | 2 (Selah + Timeline microcopy)                                       |
| Handoffs cerrados en Fase 3      | 1 (verificación de género `TapToPlace`)                              |
| Handoffs abiertos                | 2 (comentarios Funcional opcional · `useElapsedTime` por determinar) |
| Tareas propias activas           | 1 (Test #2 en pausa)                                                 |
| Tareas propias bloqueadas        | 3 (onboarding, notificaciones, validación móvil)                     |
| Hallazgos abiertos               | 2 (§4.1.1 y §4.1.2)                                                  |

### 1.2 Archivos en territorio UX

Modificados históricamente en Fase 2:

- `src/screens/Home.tsx`
- `src/components/questions/TimelineQuestion.tsx`

Delegados a otras áreas (UX no toca sin coordinación):

- `src/components/questions/TapToPlace.tsx` (Visual)
- `src/data/dailyPrinciples.ts` (Funcional)
- `src/types/index.ts` (Funcional)

### 1.3 Salud del código verificado

Verificado el 2026-10-01 (solo lectura, sin modificar): **8 de 8 archivos sanos**. 0 bugs funcionales. 2 hallazgos cosméticos/rendimiento registrados.

---

## 2. Handoffs activos (a 2026-10-01)

### 2.1 Entregados por UX a otras áreas

| ID   | Handoff                                                                | Área destino                        | Fecha entrega | Estado                                      | Prioridad |
| ---- | ---------------------------------------------------------------------- | ----------------------------------- | ------------- | ------------------------------------------- | --------- |
| H-01 | Comentarios de cabecera en `dailyPrinciples.ts:2` y `types/index.ts:2` | Funcional                           | 2026-09-25    | 🟢 Opcional (no bloqueante, no user-facing) | Baja      |
| H-02 | Posible re-render `useElapsedTime` en `Game.tsx`                       | Por determinar (Funcional o Visual) | 2026-10-01    | ⏸ Pendiente decisión PO                     | Media     |

### 2.2 Recibidos por UX de otras áreas

| ID    | Handoff                                                    | Área origen | Fecha      | Estado                                      |
| ----- | ---------------------------------------------------------- | ----------- | ---------- | ------------------------------------------- |
| H-R01 | Rebrand PWA a Selah                                        | Admin       | 2026-09-24 | ✅ Cerrado (aplicado en Handoff 1 Fase 2)   |
| H-R02 | Integración `@vercel/analytics` + `@vercel/speed-insights` | Admin       | 2026-09-25 | ✅ Cerrado                                  |
| H-R03 | Spec TapToPlace → implementado y género cerrado            | Visual      | 2026-09-25 | ✅ Cerrado (verificado en disco 2026-10-01) |

### 2.3 Handoffs entre áreas que afectan a UX (informativo)

Ninguno activo. Históricamente: ninguno.

---

## 3. Decisiones clave (consolidadas)

### 3.1 Fase 1

| #     | Decisión                         | Resultado                                  | Consecuencia                               |
| ----- | -------------------------------- | ------------------------------------------ | ------------------------------------------ |
| F1-D1 | Modales custom                   | Aprobado con 7 requisitos de accesibilidad | `Modal.tsx` cumple AA                      |
| F1-D2 | Formulario clarificación Test #1 | Descartado                                 | Mejoras visuales ya atacaron "vacío"       |
| F1-D3 | Onboarding primera vez           | Pospuesto hasta Test #2                    | Pendiente #4 Fase 3                        |
| F1-D4 | Badge "sin-pistas" (Deductor)    | Opción A: sin cambios funcionales          | Badge intacto                              |
| F1-D5 | Microcopy 7 tipos de pregunta    | Aprobado                                   | Aplicado en producción                     |
| F1-D6 | `SortableList.tsx`               | Aprobado con fix `aria-live`               | Componente funcional (post. `@deprecated`) |
| F1-D7 | Handle bottom-sheet              | Opción A: eliminar                         | Eliminado (prometía swipe inexistente)     |

### 3.2 Fase 2

| #     | Decisión                                | Resultado                                                   | Consecuencia                                  |
| ----- | --------------------------------------- | ----------------------------------------------------------- | --------------------------------------------- |
| F2-D1 | Drag & drop → TapToPlace                | Aprobado por PO                                             | WCAG 2.2 AA · 2.5.7 resuelto; −2.26 kB bundle |
| F2-D2 | Botón "Confirmar orden" en TapToPlace   | Se habilita solo al llenar todos los slots                  | Cambio de comportamiento vs `SortableList`    |
| F2-D3 | `MenteEnElCaminoDB`                     | No renombrar jamás                                          | Regla dura (protege IndexedDB)                |
| F2-D4 | Subtítulo de Home                       | "Pausa. Reflexiona. Aprende." bajo `<h1>`                   | Coherencia Selah                              |
| F2-D5 | Hint de Timeline                        | Versión larga (13 palabras) por simetría con Verse-scramble | Microcopy consistente                         |
| F2-D6 | Rebrand Mente en el Camino → Selah      | Solo en pantallas, no en DB                                 | Handoff 1 cerrado                             |
| F2-D7 | Microcopy Timeline "palabra" → "evento" | Aplicado + género delegado a Visual                         | Handoff 2 cerrado                             |

### 3.3 Fase 3

| #     | Decisión                               | Resultado                    | Consecuencia                                                |
| ----- | -------------------------------------- | ---------------------------- | ----------------------------------------------------------- |
| F3-D1 | Test #2                                | En pausa por decisión del PO | Paquete redactado y listo; priorizar avances de otras áreas |
| F3-D2 | Fix `AnswerParams` en `Game.tsx`       | Pendiente decisión PO        | Recomendación UX: post-Test #2                              |
| F3-D3 | Handoff `useElapsedTime` / `Timer.tsx` | Pendiente dueño              | Recomendación UX: observar en Test #2, decidir después      |

---

## 4. Historial cronológico

### 4.1 Fase 3

#### 2026-10-01 — Reconocimiento pre-Test #2 CERRADO

**Origen**: Arranque de Fase 3. Antes de diseñar o ejecutar Test #2, se verificó en disco el estado real del código para descartar bugs y alinear los changelogs de área y global (existía contradicción documental sobre el estado del handoff de género en `TapToPlace.tsx`).

**Archivos verificados (solo lectura)**:

| Archivo                                              | Estado | Hallazgo                                                                          |
| ---------------------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `src/screens/Home.tsx`                               | ✅     | `<h1>` = "Selah", subtítulo "Pausa. Reflexiona. Aprende.", footer "Selah · {año}" |
| `src/App.tsx`                                        | ✅     | Flujo home → game → results → profile estable                                     |
| `src/screens/Game.tsx`                               | ⚠️     | `AnswerParams` sin `selectedOrder` (cosmético, no funcional)                      |
| `src/store/useGameStore.ts`                          | ✅     | `questions` inmutable: `startGame` y `nextQuestion` no lo mutan                   |
| `src/components/QuestionRenderer.tsx`                | ✅     | Wrap de `selectedOrder` correcto en verse-scramble y timeline                     |
| `src/components/questions/TimelineQuestion.tsx`      | ✅     | `itemGender="m"` + hint "Toca un evento y colócalo en su orden."                  |
| `src/components/questions/VerseScrambleQuestion.tsx` | ✅     | Sin `itemGender` (default `"f"`) — correcto para "palabra"                        |
| `src/components/questions/TapToPlace.tsx`            | ✅     | `itemGender?: "f" \| "m"` implementado (default `"f"`)                            |

**Cadena de datos verificada (sin bug de reset)**:
