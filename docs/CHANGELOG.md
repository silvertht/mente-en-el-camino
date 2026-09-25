# CHANGELOG — Mente en el Camino (Selah)

Registro cronológico de cambios por área (Funcional, Visual, UX, Admin).
Formato: `[ÁREA] Descripción · Estado`.

**Última actualización**: 2026-09-25 · Fase 2 · Admin cerró Analytics. UX activo con 2 handoffs.
**Estado del proyecto**: PWA instalable + métricas activas. Fase 2 en curso.

---

## 📊 ESTADO GLOBAL ACTUAL

| Área          | Estado                     | Pendiente real                         |
| ------------- | -------------------------- | -------------------------------------- |
| **Funcional** | ✅ Fase 1 cerrada          | Ampliar banco 70 → 100+ (post Test #2) |
| **Visual**    | ✅ Fase 2 limpia           | Bloqueado hasta Test #2                |
| **UX**        | ⏳ 2 handoffs              | Textos "Selah" + microcopy Timeline    |
| **Admin**     | ⏳ Tarea 3 esperando datos | Core Web Vitals · Supabase (Fase 2.5)  |

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

## 2026-09-25 — FASE 2 · Admin · Tarea 2 CERRADA: Analytics

### [ADMIN] Vercel Analytics + Speed Insights integradas

**Origen**: Tarea 2 de Admin en Fase 2. Objetivo: tener datos objetivos
antes del Test #2 con los 5 jóvenes.

**Dependencias instaladas**:

- `@vercel/analytics` — page views, visitors, bounce rate, referrers.
- `@vercel/speed-insights` — Core Web Vitals reales (LCP, INP, CLS).

**Integración en código** (handoff Admin → Funcional, aplicado):

- `src/main.tsx`: añadidos `<Analytics />` y `<SpeedInsights />` dentro de
  `<StrictMode>` y después de `<App />`. Colocados al final del árbol para
  no bloquear el render inicial (protege LCP).

**Activación en Vercel dashboard**:

- Web Analytics: activado en plan **Hobby (Free)**.
- Speed Insights: activado en plan **Hobby (Free)**.
- **Costo: $0/mes.**

**Documentación creada**:

- `docs/ANALYTICS.md` — guía completa de interpretación: qué se mide y qué
  no, métricas de uso, Core Web Vitals con umbrales, protocolo de escalado,
  limitaciones del plan Hobby, cómo acceder al dashboard.

**Verificación técnica**:
| Métrica | Valor | Cambio |
|---|---|---|
| Módulos transformados | 474 | +2 |
| Bundle JS gzip | 180.87 kB | +1.48 kB |
| CSS gzip | 10.22 kB | +0.08 kB |
| Precache PWA | 15 entries · 803.84 KB | +4.84 KB |
| Build time | 1.36 s | limpio |
| Errores TS | 0 | — |
| Tests unitarios | 66/66 | sin cambio |

**Verificación en producción**:

- ✅ Analytics muestra datos reales (1 visitor, 5 page views, 0% bounce).
- ⏳ Speed Insights: esperando ~24-48h de tráfico real.

**Commits en `main`**:

- `[ADMIN] Vercel Analytics + Speed Insights — integración`
- `[ADMIN] docs/ANALYTICS.md — guía de interpretación`

**Handoffs restantes**:
| # | Tarea | Área | Estado |
|---|-------|------|--------|
| 1 | Textos "Mente en el Camino" → "Selah" | UX | ⏳ |
| 2 | Microcopy "palabra" → "evento" en Timeline | UX | ⏳ |

---

## 2026-09-25 — FASE 2 · Visual · Handoff UX TapToPlace CERRADO

### [VISUAL] TapToPlace reemplaza drag & drop + fix paleta Button

**Origen**: Handoff UX del 2026-09-25. Feedback de testers +
incumplimiento WCAG 2.2 AA · 2.5.7.

**Archivos nuevos**:

- `src/components/questions/TapToPlace.tsx` — componente genérico
  tap-to-place. Recibe `items: string[]` y devuelve `onAnswer(order: number[])`.

**Archivos modificados**:

- `src/components/questions/VerseScrambleQuestion.tsx` — usa TapToPlace.
- `src/components/questions/TimelineQuestion.tsx` — usa TapToPlace.
- `src/components/questions/SortableList.tsx` — marcado `@deprecated`.
- `src/components/Button.tsx` — **fix de paleta**: `amber-*`, `slate-*`,
  `red-*` reemplazados por `alba-*`, `noche-*`, `alerta-*`. Variante
  `reino` añadida.

**Cambios de comportamiento**:

- Botón "Confirmar orden" pasa a habilitarse solo al llenar todos los slots.

**Accesibilidad implementada**:

- Chips son `<button>` → Tab + Enter/Space.
- `aria-live="polite"` anuncia colocación/devolución.
- `aria-describedby` apunta al hint.
- Focus visible con ring `alba-400`.
- Tamaño táctil ≥44px.
- Respeta `prefers-reduced-motion`.

**Impacto en bundle**:

- Bundle gzip: 181.65 → 179.39 kB (−2.26 kB).
- Precache: 16 → 15 entries.

**Tests**: 66/66.

---

## 2026-09-24 — FASE 2 · Visual · Handoffs PWA CERRADOS

### [VISUAL] Cierre de los 3 handoffs visuales de PWA

**Handoff 1 — `index.html` actualizado**:

- `lang="en"` → `lang="es"`.
- `<title>` → `Selah — Trivia Bíblica`.
- Añadidos: meta description, theme-color #F5B544, apple-touch-icon,
  metas iOS, viewport-fit=cover.

**Handoff 3 — `public/favicon.svg` rediseñado**:

- Llama teardrop con gradiente alba→fuego sobre noche.
- Peso: ~700 bytes.

**Handoff 4 — `public/icons.svg` eliminado**:

- Confirmado huérfano (0 requests, 0 imports en código).

---

## 2026-09-24 — FASE 2 · Admin · Tarea 1 CERRADA: PWA

### [ADMIN] PWA configurada + rebrand a "Selah"

**Decisión de marca**:

- Nombre público: **Selah** ("pausa, medita" — hebreo, Salmos).
- Slogan: "Pausa. Reflexiona. Aprende."
- Nombre interno del repo: `mente-en-el-camino` (no cambia).

**Configurado**: `vite.config.ts` con manifest, Workbox, íconos.
**Assets**: `pwa-192x192.png`, `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon.png`.
**Verificación**: build limpio, install prompt Chrome OK, Vercel deploy OK.

---

## 2026-09-23 / 2026-09-24 — FASE 1 (consolidado)

### [SISTEMA] Documentación maestra

- 4 áreas: Funcional, Visual, UX, Admin.
- Paleta "Noche y Alba" como fuente única de verdad visual.

### [FEEDBACK] Test #1 — 5 jóvenes

**Hallazgos**:

1. Rendimiento (móviles gama baja).
2. Preguntas trampa mezcladas con fáciles.
3. "Se siente vacía", "sin principios".
4. Drag & drop con lag táctil (Fase 2).

**Acciones**: deviceTier + AnimatedBackground, dificultad adaptativa,
microcopy cálido, TapToPlace.

### [VISUAL] Fase 1 — 4 rondas

Ronda 1: Optimización + Results/Profile. Ronda 2: Modales custom.
Ronda 3: Home + scrollbar. Ronda 4: SortableList + tipos nuevos.

### [FUNCIONAL] Fase 1 — 3 rondas

Ronda 1: dailyPrinciples + dificultad adaptativa.
Ronda 2: Bugs críticos (Timer, pista, tildes).
Ronda 3: Tipos nuevos + 14 datos + vitest (66 tests).

### [UX] Fase 1 — 4 sesiones

Sesión 1: Microcopy global. Sesión 2: Microcopy tipos nuevos.
Sesión 3: Validación SortableList. Sesión 4: Validaciones navegador.

---

## 📋 Pendientes activos (Fase 2)

| #   | Tarea                                         | Área              | Estado             |
| --- | --------------------------------------------- | ----------------- | ------------------ |
| 1   | Cambiar textos "Mente en el Camino" → "Selah" | UX                | 🔄 Activo          |
| 2   | Microcopy "palabra" → "evento" en Timeline    | UX                | 🔄 Activo          |
| 3   | Core Web Vitals (24-48h)                      | Admin             | ⏳ Esperando datos |
| 4   | Test #2 con los 5 jóvenes                     | UX                | ⏳ Post handoffs   |
| 5   | Ampliar banco 70 → 100+                       | Funcional         | 🟡 Post Test #2    |
| 6   | Onboarding primera vez                        | UX                | ⏸                  |
| 7   | Migración a Supabase (Fase 2.5)               | Admin + Funcional | 🟢                 |
| 8   | Retirar `SortableList.tsx` definitivamente    | Visual            | 🟢 Post Test #2    |

---

## 🔑 Reglas de oro

1. Nunca romper lógica funcional sin avisar.
2. Mobile-first siempre.
3. Nunca exponer `node_modules` a GitHub.
4. Cada respuesta enseña.
5. Contenido teológico revisado (RVR1960).
6. Optimizar peso.
7. Un chat por área, todo pasa por el usuario (product owner).

---

**Fin del CHANGELOG.**
