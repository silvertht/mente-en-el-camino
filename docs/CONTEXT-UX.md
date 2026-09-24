# CONTEXT UX — Mente en el Camino (Selah)

Área: **Experiencia de Usuario (UX)**
Última actualización: 2026-09-24 (Fase 2)
Estado: 🔄 Fase 2 activa. Handoff 2 de PWA pendiente.

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

---

## 4. Marca "Selah" (Fase 2)

- **Nombre público**: Selah ("pausa, medita" — hebreo, Salmos).
- **Slogan**: "Pausa. Reflexiona. Aprende."
- **Nombre interno**: mente-en-el-camino (repo, no cambia).
- **Implicación UX**: reemplazar textos "Mente en el Camino" en pantallas por
  "Selah" manteniendo coherencia de voz y tono.

---

## 5. Colaboraciones (Fase 1 y Fase 2)

### Con Visual

- Aprobé sus rondas 1, 2, 3, 4 y 5 de Fase 1.
- Definí 7 requisitos de accesibilidad de `Modal.tsx`.
- Validé `SortableList.tsx` (fix `aria-live`).
- Pedí guard `prefers-reduced-motion` en `scroll-behavior` (pendiente).
- **Fase 2**: recibí handoff del Admin. Coordino cambio de textos.

### Con Funcional

- Handoffs cerrados: `Badge.verse?`, `dailyPrinciples.ts`, data de preguntas.
- Decisión badge "sin-pistas" (Opción A).
- Orden de tests vitest + datos de tipos nuevos.

### Con Admin

- **Fase 2**: recibí handoff de PWA. Textos "Mente en el Camino" → "Selah".

---

## 6. Estado actual (Fase 2)

### Completado en Fase 1

- Microcopy global aplicado.
- Microcopy de tipos nuevos aplicado.
- Validaciones de scroll, modales, reduced-motion (PC).
- Accesibilidad AA validada.

### Fase 2 — Trabajo activo

🔄 **Handoff 2 de PWA**: cambiar textos "Mente en el Camino" → "Selah" en:

- `src/screens/Home.tsx` (header: título principal).
- Cualquier otro lugar donde aparezca el nombre antiguo.
- Revisar también `ScoreFeedback`, `Results`, `Profile`.

### Pendiente bloqueado

| #   | Tarea                                   | Bloqueada por             |
| --- | --------------------------------------- | ------------------------- |
| 1   | Validar `SortableList` con teclado real | Móvil                     |
| 2   | Validar `SortableList` con touch        | Móvil                     |
| 3   | Validar microcopy en móvil real         | Móvil                     |
| 4   | Onboarding                              | ⏸ Pospuesto hasta Test #2 |
| 5   | Análisis Test #2                        | Test #2 ejecutado         |

---

## 7. Decisiones clave tomadas (Fase 1)

| Decisión                         | Resultado                                            |
| -------------------------------- | ---------------------------------------------------- |
| Modales custom                   | ✅ Aprobado con 7 requisitos de accesibilidad.       |
| Formulario clarificación Test #1 | ❌ Descartado. Mejoras visuales ya atacaron "vacío". |
| Onboarding                       | ⏸ Pospuesto hasta datos reales de Test #2.           |
| Badge "sin-pistas" (Deductor)    | Opción A: sin cambios funcionales.                   |
| Microcopy tipos nuevos           | ✅ Aprobado.                                         |
| `SortableList.tsx`               | Aprobado con fix `aria-live`.                        |
| Handle bottom-sheet              | Opción A: eliminar (prometía swipe inexistente).     |

---

## 8. Contexto de "vacío" y "sin principios" (Test #1)

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

## 9. Cómo trabajar conmigo

1. Describe el flujo o problema a resolver.
2. Yo propongo wireframes textuales + implementación.
3. Verifica en móvil real siempre.

**Reglas de oro**:

- No romper lógica funcional sin avisar.
- Mobile-first.
- Cada respuesta enseña.
- Optimizar peso (assets ligeros, evitar librerías grandes).

---

## 10. Primeros pasos Fase 2

1. Leer este documento + `PROJECT.md` + `CHANGELOG.md`.
2. Verificar `npm run build` limpio.
3. Abrir la app en local y buscar todas las apariciones de "Mente en el Camino".
4. Coordinar con Visual si algún cambio toca territorio compartido.
5. Aplicar cambios con verificación en móvil.

---

**Fin del CONTEXT-UX (Fase 2).**
