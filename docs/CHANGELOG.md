# CHANGELOG — Mente en el Camino (Selah)

Registro cronológico de cambios por área (Funcional, Visual, UX, Admin).
Formato: `[ÁREA] Descripción · Estado`.

**Última actualización**: 2026-09-24 · Fase 2 · Admin cerró PWA, Visual activo.
**Estado del proyecto**: PWA instalable. Fase 2 en curso.

---

## 📊 ESTADO GLOBAL ACTUAL

| Área          | Estado             | Pendiente real                                |
| ------------- | ------------------ | --------------------------------------------- |
| **Funcional** | ✅ Fase 1 cerrada  | Ampliar banco 70 → 100+ (post Test #2)        |
| **Visual**    | 🔄 Fase 2 activa   | Cerrar 3 handoffs PWA                         |
| **UX**        | ⏳ 1 handoff       | Cambiar textos "Mente en el Camino" → "Selah" |
| **Admin**     | ✅ Tarea 1 cerrada | Analytics + Core Web Vitals + Supabase        |

**Métricas**:

| Métrica            | Valor                    |
| ------------------ | ------------------------ |
| Preguntas en banco | 70                       |
| Categorías activas | 5 (de 9)                 |
| Tipos de pregunta  | 7/7                      |
| Tests unitarios    | 66/66 pasando            |
| Build              | ✓ 629 ms, sin errores TS |
| Bundle gzip        | 181.65 kB                |
| Precache PWA       | 16 entries · 815 KB      |
| PWA installable    | ✅ Chrome                |
| Insignias          | 19                       |
| Principios del día | 31                       |

---

## 2026-09-24 — FASE 2 · Admin · Tarea 1 CERRADA: PWA

### [ADMIN] PWA configurada + rebrand a "Selah"

**Decisión de marca (autorizada por el product owner)**:

- Nombre público de la app: **Selah** ("pausa, medita" — hebreo, Salmos).
- Slogan: "Pausa. Reflexiona. Aprende."
- Nombre interno del repo/proyecto: `mente-en-el-camino` (no cambia).

**Configurado en `vite.config.ts`**:

- Manifest completo: `name: "Selah — Trivia Bíblica"`, `short_name: "Selah"`.
- `theme_color: "#F5B544"`, `background_color: "#0B0F1A"`.
- `display: "standalone"`, `orientation: "portrait"`.
- 3 íconos PWA + apple-touch-icon registrados.
- Workbox: autoUpdate, precache del shell, `devOptions.enabled: false`.

**`.gitignore`**: añadida línea `dev-dist`.

**Nuevos assets en `public/`**:

- `pwa-192x192.png`
- `pwa-512x512.png`
- `maskable-icon-512x512.png`
- `apple-touch-icon.png` (180×180)
- Diseño: llama neón alba-500 → fuego-500 sobre noche-900.
- Referencia: Jeremías 23:29 ("mi palabra es fuego"), Lucas 24:32.

**Commit en `main`**: `[ADMIN] PWA configurada — manifest Selah + SW + íconos`

**Verificación técnica**:
| Métrica | Valor |
|---|---|
| `npm run build` | ✅ |
| `dist/manifest.webmanifest` | ✅ |
| `dist/sw.js` + workbox | ✅ |
| Precache | 16 entries · 815 KB |
| Bundle JS gzip | 181.65 kB (baseline) |
| Deploy Vercel | ✅ automático |
| Install prompt Chrome | ✅ confirmado |

**Handoffs pendientes** (territorio Visual/UX):

| #   | Tarea                                                                 | Área destino |
| --- | --------------------------------------------------------------------- | ------------ |
| 1   | Actualizar `index.html` (título Selah, theme-color, apple-touch-icon) | Visual       |
| 2   | Cambiar textos "Mente en el Camino" → "Selah" en pantallas            | UX           |
| 3   | Rediseñar `public/favicon.svg` (hoy: rayo morado de Vite)             | Visual       |
| 4   | Revisar/eliminar `public/icons.svg` (placeholder sin uso)             | Visual       |

---

## 2026-09-23 / 2026-09-24 — FASE 1 (consolidado)

### [SISTEMA] Documentación maestra

- Creada documentación maestra del proyecto (`docs/`).
- Estructurado el proyecto en 4 áreas: Funcional, Visual, UX, Admin.
- Paleta "Noche y Alba" como fuente única de verdad visual.
- Stack: React 19 · TypeScript · Vite 8 · Tailwind v4 · Zustand v5 ·
  Dexie · Motion · vite-plugin-pwa.

### [FEEDBACK] Test #1 — 5 jóvenes

**Hallazgos**:

1. **Rendimiento**: algunos teléfonos sienten la app pesada y lenta.
2. **Preguntas trampa**: molestan al mezclarse con fáciles.
3. **Percepción general**: "se siente vacía", "sin principios".

**Acciones**:

- Visual: optimización (deviceTier + AnimatedBackground).
- Funcional: dificultad adaptativa.
- UX: microcopy cálido + identidad cristiana visible.

---

## 🎨 VISUAL — Resumen Fase 1

### Ronda 1 — Optimización + rediseño base

- `deviceTier.ts` (low/mid/high).
- `AnimatedBackground` optimizado (60 → 0/8/15 estrellas, sin blurs).
- `Results.tsx` rediseñado (podio 5 niveles).
- `Profile.tsx` rediseñado (hero + vitrina).
- `Skeleton.tsx` (6 variantes).
- `HintDeductionQuestion` microinteracciones.

### Ronda 2 — Modales custom

- `Modal.tsx`, `BadgeDetailModal.tsx`, `PromptDialog.tsx`, `ConfirmDialog.tsx`.
- Focus trap + accesibilidad completa.

### Ronda 3 — Cierre handoffs UX

- `Home.tsx` migración paleta + pulido.
- `index.css` scrollbar invisible + fix salto.

### Ronda 4 — UI de los 2 tipos nuevos

- `SortableList.tsx` + `VerseScrambleQuestion.tsx` + `TimelineQuestion.tsx`.

---

## ⚙️ FUNCIONAL — Resumen Fase 1

### Ronda 1 — Handoffs + dificultad adaptativa

- `dailyPrinciples.ts` (31 principios).
- `Badge.verse?` añadido.
- `getRecentAccuracy` + `pickAdaptiveQuestions`.

### Ronda 2 — Bugs críticos post-test

- Timer reescrito con `requestAnimationFrame`.
- Hint-deduction pista inicial gratis.
- `normalizeAnswer()` para tildes.

### Ronda 3 — Tipos nuevos + tests

- `verse-scramble` + `timeline` implementados.
- Banco: 56 → 70 preguntas.
- Vitest setup: 66 tests pasando.

---

## 🟣 UX — Resumen Fase 1

- Sesión 1: Microcopy global + reorden Home.
- Sesión 2: Microcopy tipos nuevos.
- Sesión 3: Validación `SortableList` (fix aria-live).
- Sesión 4: Validaciones navegador.

---

## 📋 Pendientes activos (Fase 2)

| #   | Tarea                                         | Área              | Estado          |
| --- | --------------------------------------------- | ----------------- | --------------- |
| 1   | Actualizar `index.html`                       | Visual            | 🔄 Activo       |
| 2   | Cambiar textos "Mente en el Camino" → "Selah" | UX                | ⏳              |
| 3   | Rediseñar `favicon.svg`                       | Visual            | 🔄 Activo       |
| 4   | Revisar `icons.svg`                           | Visual            | 🔄 Activo       |
| 5   | Vercel Analytics + Core Web Vitals            | Admin             | ⏳              |
| 6   | Validar en móvil real (Test #2)               | UX                | ⏳              |
| 7   | Ampliar banco 70 → 100+                       | Funcional         | 🟡 Post Test #2 |
| 8   | Onboarding primera vez                        | UX                | ⏸               |
| 9   | Migración a Supabase                          | Admin + Funcional | 🟢              |

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
