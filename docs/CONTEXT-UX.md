# CONTEXT UX — Mente en el Camino (Selah)

Área: **Experiencia de Usuario (UX)**
Última actualización: 2026-09-25 (Fase 2)
Estado: ✅ Handoffs 1 y 2 cerrados. Pendiente activo: Test #2 y análisis.

---

## 1. Mi rol

Asistente especializado en la **experiencia del usuario, flujos, onboarding,
retención, accesibilidad y jerarquía de información**. Trabajo en la frontera
entre lo visual y lo funcional.

**Responsabilidades**:

1. Diseñar flujos de usuario (onboarding, primera partida, retorno).
2. Microcopy global y de tipos nuevos.
3. Sistema de notificaciones para racha diaria.
4. Accesibilidad: navegación por teclado, lectores de pantalla.
5. Analizar feedback de testers e implementar mejoras.
6. Coherencia de marca "Selah" en todos los textos.

---

## 2. Mi territorio

**Archivos que puedo modificar**:

- `src/screens/Home.tsx`
- `src/screens/Game.tsx`
- `src/screens/Results.tsx`
- `src/screens/Profile.tsx`
- `src/App.tsx` (flujo entre pantallas)
- `src/components/ScoreFeedback.tsx`
- `src/components/QuestionRenderer.tsx`
- `src/components/questions/*` (microcopy, no estructura)

**Archivos que NO toco sin coordinar**:

- `src/store/useGameStore.ts` (Funcional)
- `src/utils/scoring.ts` (Funcional)
- `src/db/database.ts` (Funcional)
- `src/data/*` (Funcional)
- `src/types/index.ts` (Funcional)
- `src/index.css` (Visual)
- `AnimatedBackground.tsx` (Visual)
- `index.html` (Visual en Fase 2)
- `vite.config.ts` (Admin)

**Regla de bloqueo**: si un cambio me bloquea o depende de otra área, NO lo
ejecuto. Escribo una entrada de `CHANGELOG.md` para que el product owner la
derive al área correspondiente. Yo actúo como **redactor del handoff**, no
como ejecutor.

---

## 3. Principios UX del proyecto

- Mobile-first siempre.
- Una pregunta a la vez, sin distracciones.
- Toda respuesta enseña.
- El fracaso no castiga, motiva.
- Celebración visual de logros.
- Tiempo de interacción ≤30 segundos por pregunta.
- Microcopy: segunda persona, metáfora del camino, frases ≤12 palabras.
- Nunca usar: "¡Felicidades!", "Error", "Usuario", "Completado".
- Sí usar: "tú", metáfora del camino/viaje, verbos en presente.
- **Concordancia de género**: revisar pronombres (lo/la, colócalo/colócala)
  según el sustantivo (evento/palabra). Aplica en microcopy visible y en
  `aria-label` / `aria-live`.

---

## 4. Marca "Selah" (Fase 2)

- **Nombre público**: Selah ("pausa, medita" — hebreo, Salmos).
- **Slogan**: "Pausa. Reflexiona. Aprende."
- **Nombre interno**: mente-en-el-camino (repo, no cambia).
- **Implicación UX**: reemplazar textos "Mente en el Camino" en pantallas por
  "Selah" manteniendo coherencia de voz y tono.

**Reglas de marca**:

- "Selah" NO se traduce ni se explica en cada uso.
- La metáfora del camino sigue viva ("El camino comienza" se queda).
- El slogan aparece bajo el `<h1>` en Home, no en cada pantalla.

---

## 5. Colaboraciones

### Con Visual

- Aprobé sus rondas 1, 2, 3, 4 y 5 de Fase 1.
- Definí 7 requisitos de accesibilidad de `Modal.tsx`.
- Validé `SortableList.tsx` (fix `aria-live`).
- Pedí guard `prefers-reduced-motion` en `scroll-behavior` (pendiente).
- **Fase 2 — Handoff tap-to-place**: entregué spec completa. Visual
  implementó `TapToPlace.tsx` y lo integró en los 2 wrappers (Timeline,
  Verse-scramble). Yo detecté bug de género gramatical en `TapToPlace.tsx`
  y entregué handoff con propuesta de prop `itemGender?: "f" | "m"`.
  **Estado**: pendiente de Visual.

### Con Funcional

- Handoffs cerrados: `Badge.verse?`, `dailyPrinciples.ts`, data de preguntas.
- Decisión badge "sin-pistas" (Opción A).
- Orden de tests vitest + datos de tipos nuevos.
- **Handoff cosmético pendiente**: renombrar comentarios de cabecera en
  `dailyPrinciples.ts:2` y `types/index.ts:2` cuando Funcional toque esos
  archivos. No user-facing, no bloqueante.

### Con Admin

- **Fase 2 — Handoff PWA**: recibí rebrand a Selah. Cerrado por UX.
- **Fase 2 — Analytics**: Admin integró `@vercel/analytics` y
  `@vercel/speed-insights` en `src/main.tsx` (handoff Admin → Funcional).

---

## 6. Estado actual (Fase 2)

### Completado en Fase 1

- Microcopy global aplicado.
- Microcopy de tipos nuevos aplicado.
- Validaciones de scroll, modales, reduced-motion (PC).
- Accesibilidad AA validada.

### Completado en Fase 2 (esta sesión)

✅ **Handoff 1 — Rebrand "Mente en el Camino" → "Selah"**:

- `Home.tsx:91` `<h1>`: ahora dice "Selah" (con `GradientText` shimmer).
- `Home.tsx`: subtítulo "Pausa. Reflexiona. Aprende." bajo el `<h1>`.
- `Home.tsx:388` footer: "Selah · {año}".
- **No renombrado**: `MenteEnElCaminoDB` en `db/database.ts` — rompería
  IndexedDB de usuarios. Regla dura: NO renombrar jamás.
- **Handoff cosmético a Funcional**: comentarios en `dailyPrinciples.ts:2`
  y `types/index.ts:2` (no user-facing).

✅ **Handoff 2 — Microcopy Timeline "palabra" → "evento"**:

- `TimelineQuestion.tsx`: hint nuevo "Toca un evento y colócalo en su orden.
  Toca de nuevo para devolverlo."
- `VerseScrambleQuestion.tsx`: sin cambios (ya usaba "palabra" femenino).
- Botón "Confirmar orden": sin cambio, genérico.
- **Handoff a Visual**: bug de género gramatical en `TapToPlace.tsx`
  (`colocada`, `devuelta`, `colocarla`, `devolverla` hardcodeados en
  femenino). Propuesta de prop `itemGender`.

### Pendiente activo (post Test #2)

| #   | Tarea                                   | Bloqueada por                      |
| --- | --------------------------------------- | ---------------------------------- |
| 1   | Validar `SortableList` con teclado real | Móvil                              |
| 2   | Validar `SortableList` con touch        | Móvil                              |
| 3   | Validar microcopy en móvil real         | Móvil                              |
| 4   | Test #2 con los 5 jóvenes               | Handoffs cerrados                  |
| 5   | Onboarding primera vez                  | ⏸ Pospuesto hasta datos de Test #2 |
| 6   | Sistema de notificaciones racha         | Post Test #2                       |

### Handoffs entregados a otras áreas

| Handoff                               | Área destino | Estado       |
| ------------------------------------- | ------------ | ------------ |
| Género gramatical en `TapToPlace.tsx` | Visual       | ⏳ Pendiente |
| Comentarios de cabecera en data/types | Funcional    | 🟢 Opcional  |

---

## 7. Decisiones clave tomadas

### Fase 1

| Decisión                         | Resultado                                            |
| -------------------------------- | ---------------------------------------------------- |
| Modales custom                   | ✅ Aprobado con 7 requisitos de accesibilidad.       |
| Formulario clarificación Test #1 | ❌ Descartado. Mejoras visuales ya atacaron "vacío". |
| Onboarding                       | ⏸ Pospuesto hasta datos reales de Test #2.           |
| Badge "sin-pistas" (Deductor)    | Opción A: sin cambios funcionales.                   |
| Microcopy tipos nuevos           | ✅ Aprobado.                                         |
| `SortableList.tsx`               | Aprobado con fix `aria-live`.                        |
| Handle bottom-sheet              | Opción A: eliminar (prometía swipe inexistente).     |

### Fase 2

| Decisión                                    | Resultado                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| Drag & drop → tap-to-place                  | ✅ Aprobado por product owner. Motivo: lag táctil + WCAG 2.2 AA · 2.5.7.       |
| Botón "Confirmar orden" en TapToPlace       | ✅ Se habilita solo al llenar todos los slots. Cambio respecto a SortableList. |
| "Mente en el Camino" en `MenteEnElCaminoDB` | ⛔ NO renombrar jamás. Rompe IndexedDB de usuarios.                            |
| Subtítulo de Home                           | ✅ "Pausa. Reflexiona. Aprende." bajo el `<h1>`.                               |
| Hint de Timeline                            | ✅ Versión larga (13 palabras) por simetría con Verse-scramble.                |

---

## 8. Diagnóstico técnico aprendido (drag & drop)

Causas del lag en `SortableList.tsx` (para referencia futura):

1. Falta `touch-action: none` → navegador espera ~300 ms al primer toque.
2. `whileDrag` anima `boxShadow` y `borderColor` → repaint por frame.
3. Motion Reorder mide el DOM en cada `pointermove` → jank con 10 ítems.
4. `layoutScroll` en `Reorder.Group` es overhead innecesario.
5. Sin `dragMomentum={false}` ni `dragElastic={0}` → se siente resbaloso.

**Lección**: para listas reordenables en móvil, preferir tap-to-place sobre
drag & drop. Motivos: velocidad percibida, precisión motora, accesibilidad
teclado/lector, WCAG 2.2 AA · 2.5.7.

---

## 9. Contexto de "vacío" y "sin principios" (Test #1)

**3 hipótesis manejadas**:

1. Falta de onboarding y propósito inicial.
2. Identidad cristiana y calidez poco visibles.
3. Falta de progresión, misiones y recompensas con sentido.

**Acciones tomadas en Fase 1**:

- Microcopy cálido global.
- "Principio del día" en Home (posición 2).
- Bloque post-respuesta con explicación + versículo + aplicación + reflexión.
- Rediseño visual de Results + Profile.
- Skeleton loaders.

**Validación pendiente**: Test #2 con los 5 testers originales.

---

## 10. Cómo trabajar conmigo

1. **Antes de comenzar cada jornada**: pido qué necesito para arrancar
   (archivos, decisiones, autorizaciones). No toco código sin eso.
2. **Respeto de territorios**: si algo me bloquea, escribo entrada de
   CHANGELOG para que el product owner derive al área.
3. **Microcopy primero**: propongo textos con concordancia de género
   antes de tocar código.
4. **Verificación móvil real**: siempre.

**Reglas de oro**:

- No romper lógica funcional sin avisar.
- Mobile-first.
- Cada respuesta enseña.
- Optimizar peso (assets ligeros, evitar librerías grandes).
- Frases ≤12 palabras (tolerancia a 13 justificada).

---

## 11. Primeros pasos Fase 2 (para el chat entrante)

1. Leer este documento + `PROJECT.md` + `CHANGELOG.md`.
2. Verificar `npm run build` limpio.
3. Verificar tests `npm run test` → 66/66.
4. Revisar pendientes activos en CHANGELOG.
5. Esperar instrucciones del product owner:
   - **Si pide Test #2**: diseñar plan de test con los 5 jóvenes originales
     (objetivos, métricas, guion).
   - **Si pide onboarding**: reactivar diseño pospuesto con datos del Test #2.
   - **Si pide notificaciones racha**: coordinar con Admin (PWA + push).
   - **Si Visual cierra handoff de género**: validar contra criterios de
     aceptación.

---

## 12. Métricas actuales (referencia)

| Métrica            | Valor                  |
| ------------------ | ---------------------- |
| Preguntas en banco | 70                     |
| Categorías activas | 5 (de 9)               |
| Tipos de pregunta  | 7/7                    |
| Insignias          | 19                     |
| Principios del día | 31                     |
| Tests unitarios    | 66/66                  |
| Bundle gzip        | 180.87 kB              |
| Precache PWA       | 15 entries · 803.84 KB |
| PWA installable    | ✅ Chrome              |
| Web Analytics      | ✅ Funcionando         |
| Speed Insights     | ⏳ Recolectando        |

---

**Fin del CONTEXT-UX (Fase 2 · actualizado 2026-09-25).**
