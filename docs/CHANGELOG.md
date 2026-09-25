# CHANGELOG — Mente en el Camino (Selah)

Registro cronológico de cambios por área (Funcional, Visual, UX, Admin).
Formato: `[ÁREA] Descripción · Estado`.

**Última actualización**: 2026-09-25 · Fase 2 · Visual cerró handoff género. Listo para Test #2.
**Estado del proyecto**: PWA instalable + métricas activas. Fase 2 en curso.

---

## 📊 ESTADO GLOBAL ACTUAL

| Área          | Estado                     | Pendiente real                                 |
| ------------- | -------------------------- | ---------------------------------------------- |
| **Funcional** | ✅ Fase 1 cerrada          | Ampliar banco 70 → 100+ (post Test #2)         |
| **Visual**    | ✅ Fase 2 limpia           | Bloqueado hasta Test #2                        |
| **UX**        | ✅ Handoffs 1 y 2 cerrados | Test #2 con los 5 jóvenes                      |
| **Admin**     | ⏳ Tarea 3 esperando datos | Core Web Vitals (24-48h) · Supabase (Fase 2.5) |

**Métricas**:

| Métrica            | Valor                  |
| ------------------ | ---------------------- |
| Preguntas en banco | 70                     |
| Categorías activas | 5 (de 9)               |
| Tipos de pregunta  | 7/7                    |
| Tests unitarios    | 66/66                  |
| Bundle gzip        | 180.87 kB              |
| Precache PWA       | 15 entries · 803.84 KB |
| PWA installable    | ✅ Chrome              |
| Web Analytics      | ✅ Funcionando         |
| Speed Insights     | ⏳ Recolectando        |
| Insignias          | 19                     |
| Principios del día | 31                     |

---

## 2026-09-25 — FASE 2 · Visual · Handoff género TapToPlace CERRADO

### [VISUAL] Concordancia de género en TapToPlace

**Origen**: Al adaptar Timeline ("palabra" → "evento") se detectó que
`TapToPlace.tsx` usaba pronombres femeninos fijos en `aria-label` y
`aria-live`. Correcto para `verse-scramble` (palabras), incorrecto para
`timeline` (eventos).

**Solución implementada**:

- Nueva prop opcional `itemGender?: "f" | "m"` con default `"f"`.
- Objeto `pron` interno resuelve 4 variantes: colocada/colocado,
  devuelta/devuelto, colocarla/colocarlo, devolverla/devolverlo.
- `TimelineQuestion.tsx` pasa `itemGender="m"`.

**Archivos modificados**: `TapToPlace.tsx`, `TimelineQuestion.tsx`.
**Sin cambios**: `VerseScrambleQuestion.tsx` (usa default "f").

**Verificación**: build limpio, 66/66 tests, lector de pantalla OK.

**Estado del área Visual**: ✅ Sin pendientes activos. Bloqueado hasta Test #2.

---

## 2026-09-25 — FASE 2 · UX → VISUAL · Handoff género en TapToPlace

**Estado**: ✅ Cerrado por Visual.

**Origen**: Pronombres femeninos hardcodeados en `TapToPlace.tsx`.

**Solución**: prop `itemGender?: "f" | "m"` (default "f").

---

## 2026-09-25 — FASE 2 · UX · Handoff 2 CERRADO

### [UX] Timeline hint "palabra" → "evento"

- `TimelineQuestion.tsx`: hint → "Toca un evento y colócalo en su orden.
  Toca de nuevo para devolverlo."
- `VerseScrambleQuestion.tsx` sin cambios (correcto con "palabra").
- Botón "Confirmar orden" genérico.

**Estado Handoff 2**: ✅ Cerrado.

---

## 2026-09-25 — FASE 2 · UX · Handoff 1 CERRADO

### [UX] Rebrand "Mente en el Camino" → "Selah" en pantallas

- `Home.tsx:91` `<h1>`: "Selah" con GradientText shimmer.
- `Home.tsx`: subtítulo "Pausa. Reflexiona. Aprende.".
- `Home.tsx:388` footer: "Selah · {año}".

**No modificado (regla dura)**: `MenteEnElCaminoDB` en `database.ts`.
Renombrar rompería IndexedDB de usuarios existentes.

**Estado**: ✅ Cerrado.

---

## 2026-09-25 — FASE 2 · Admin · Tarea 2 CERRADA: Analytics

### [ADMIN] Vercel Analytics + Speed Insights integradas

- `@vercel/analytics` + `@vercel/speed-insights` instaladas.
- `src/main.tsx`: `<Analytics />` + `<SpeedInsights />`.
- Plan Hobby (Free). **Costo: $0/mes.**
- Documentación: `docs/ANALYTICS.md`.
- Bundle gzip: 180.87 kB (+1.48 kB).
- Precache: 15 entries · 803.84 KB.
- Analytics funcionando ✅. Speed Insights recolectando ⏳.

---

## 2026-09-25 — FASE 2 · Visual · Handoff UX TapToPlace CERRADO

### [VISUAL] TapToPlace reemplaza drag & drop + fix paleta Button

**Archivos nuevos**: `TapToPlace.tsx`.
**Modificados**: `VerseScrambleQuestion.tsx`, `TimelineQuestion.tsx`,
`SortableList.tsx` (deprecated), `Button.tsx` (fix paleta + variante reino).

**Cambios**: botón "Confirmar orden" solo se habilita al llenar todos los slots.
**Accesibilidad**: chips `<button>`, aria-live, focus visible, ≥44px.
**Bundle**: 181.65 → 179.39 kB (−2.26 kB).

---

## 2026-09-24 — FASE 2 · Visual · Handoffs PWA CERRADOS

- Handoff 1: `index.html` (lang es, título Selah, metas iOS).
- Handoff 3: `favicon.svg` (llama teardrop alba→fuego).
- Handoff 4: `icons.svg` eliminado.

---

## 2026-09-24 — FASE 2 · Admin · Tarea 1 CERRADA: PWA

### [ADMIN] PWA configurada + rebrand a "Selah"

- Marca: Selah (pausa, medita — hebreo, Salmos).
- Slogan: "Pausa. Reflexiona. Aprende.".
- `vite.config.ts` con manifest, Workbox, íconos.
- 4 íconos PWA generados.

---

## 2026-09-23 / 2026-09-24 — FASE 1 (consolidado)

### [SISTEMA] Documentación maestra

4 áreas: Funcional, Visual, UX, Admin. Paleta "Noche y Alba".

### [FEEDBACK] Test #1 — 5 jóvenes

1. Rendimiento. 2. Preguntas trampa. 3. "Vacía / sin principios". 4. Drag & drop con lag.

**Acciones**: deviceTier + AnimatedBackground, dificultad adaptativa,
microcopy cálido, TapToPlace.

### [VISUAL] Fase 1 — 4 rondas

Optimización + Results/Profile. Modales custom. Home + scrollbar.
SortableList + tipos nuevos.

### [FUNCIONAL] Fase 1 — 3 rondas

dailyPrinciples + dificultad adaptativa. Bugs críticos. Tipos nuevos + vitest (66 tests).

### [UX] Fase 1 — 4 sesiones

Microcopy global. Microcopy tipos nuevos. Validación SortableList. Validaciones navegador.

---

## 📋 Pendientes activos (Fase 2)

| #   | Tarea                                       | Área              | Estado             |
| --- | ------------------------------------------- | ----------------- | ------------------ |
| 1   | **Test #2 con los 5 jóvenes**               | UX                | 🔥 PRÓXIMO         |
| 2   | Core Web Vitals (24-48h)                    | Admin             | ⏳ Esperando datos |
| 3   | Ampliar banco 70 → 100+                     | Funcional         | 🟡 Post Test #2    |
| 4   | Onboarding primera vez                      | UX                | ⏸ Post Test #2     |
| 5   | Migración a Supabase (Fase 2.5)             | Admin + Funcional | 🟢                 |
| 6   | Retirar `SortableList.tsx` definitivamente  | Visual            | 🟢 Post Test #2    |
| 7   | Renombrar comentarios Funcional (cosmético) | Funcional         | 🟢 Opcional        |

---

## 🔑 Reglas de oro

1. Nunca romper lógica funcional sin avisar.
2. Mobile-first siempre.
3. Nunca exponer `node_modules` a GitHub.
4. Cada respuesta enseña.
5. Contenido teológico revisado (RVR1960).
6. Optimizar peso.
7. Un chat por área, todo pasa por el usuario (product owner).
8. **NUNCA renombrar `MenteEnElCaminoDB`** (rompe IndexedDB de usuarios).

---

**Fin del CHANGELOG.**
