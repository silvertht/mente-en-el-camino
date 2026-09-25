# CHANGELOG — Mente en el Camino (Selah)

Registro cronológico de cambios por área (Funcional, Visual, UX, Admin).
Formato: `[ÁREA] Descripción · Estado`.

**Última actualización**: 2026-09-25 · Fase 2 · Visual cerró TapToPlace + fix Button.
**Estado del proyecto**: PWA instalable. Fase 2 en curso.

---

## 📊 ESTADO GLOBAL ACTUAL

| Área          | Estado               | Pendiente real                                |
| ------------- | -------------------- | --------------------------------------------- |
| **Funcional** | ✅ Fase 1 cerrada    | Ampliar banco 70 → 100+ (post Test #2)        |
| **Visual**    | ✅ Fase 2 limpia     | Bloqueado hasta Test #2                       |
| **UX**        | ✅ Handoff entregado | Cambiar textos "Mente en el Camino" → "Selah" |
| **Admin**     | ✅ Tarea 1 cerrada   | Analytics + Core Web Vitals + Supabase        |

**Métricas**:

| Métrica            | Valor                    |
| ------------------ | ------------------------ |
| Preguntas en banco | 70                       |
| Categorías activas | 5 (de 9)                 |
| Tipos de pregunta  | 7/7                      |
| Tests unitarios    | 66/66 pasando            |
| Build              | ✓ limpio, sin errores TS |
| Bundle gzip        | 179.39 kB                |
| Precache PWA       | 15 entries · 799 KB      |
| PWA installable    | ✅ Chrome                |
| Favicon            | ✅ llama Selah           |
| Insignias          | 19                       |
| Principios del día | 31                       |

---

## 2026-09-25 — FASE 2 · Visual · Handoff UX TapToPlace CERRADO

### [VISUAL] TapToPlace reemplaza drag & drop en verse-scramble y timeline

**Origen**: Handoff UX del 2026-09-25. Feedback de testers + incumplimiento
WCAG 2.2 AA · 2.5.7 (Dragging Movements). Decisión UX autorizada por
product owner.

**Motivos del cambio**:

- Lag táctil en móvil con Motion Reorder (~300 ms de espera por `touch-action`).
- `whileDrag` animaba `boxShadow` y `borderColor` → repaint por frame.
- 3 fases (hold + move + release) → 1 toque.
- Accesibilidad teclado/lector: difícil → natural.

**Archivos nuevos**:

- `src/components/questions/TapToPlace.tsx` — componente genérico
  tap-to-place. Recibe `items: string[]` (ya desordenados por el juego)
  y devuelve `onAnswer(order: number[])` con índices sobre `items`.

**Archivos modificados**:

- `src/components/questions/VerseScrambleQuestion.tsx` — usa `TapToPlace`
  en vez de `SortableList`. Microcopy: "Toca una palabra y colócala en
  su orden. Toca de nuevo para devolverla."
- `src/components/questions/TimelineQuestion.tsx` — usa `TapToPlace`.
  Microcopy: "Toca una palabra y colócala en su orden. Toca de nuevo para
  devolverla." ⚠️ _Adaptación de "palabra" → "evento" pendiente de
  confirmación UX (Pendiente #10)._
- `src/components/questions/SortableList.tsx` — marcado como
  `@deprecated` con comentario guía. NO borrado todavía (ver Pendiente #8).
- `src/components/Button.tsx` — **fix de paleta**: reemplazados `amber-*`,
  `slate-*`, `red-*` (prohibidos por PROJECT.md §6) por `alba-*`,
  `noche-*`, `alerta-*`. Añadida variante `reino` faltante
  (`reino-500`/`reino-400`/`reino-600`). Añadido
  `focus-visible:ring-offset-noche-900` para coherencia.

**Cambios de comportamiento**:

- Botón "Confirmar orden" pasa de "siempre habilitado" (SortableList) a
  "habilitado solo al llenar todos los slots" (TapToPlace). Decisión UX
  para eliminar envíos incompletos.

**Accesibilidad implementada**:

- Chips son `<button>` → Tab + Enter/Space.
- `aria-live="polite"` anuncia "X colocada en posición N de M" y
  "X devuelta al banco".
- `aria-describedby` apunta al hint en ambos grupos (construcción y banco).
- Focus visible con ring `alba-400` + offset `noche-900`.
- Tamaño táctil ≥44px (`min-h-11`).
- Respeta `prefers-reduced-motion` (Motion solo anima `opacity` y `scale`).

**Impacto en bundle**:

- Bundle gzip: 181.65 kB → **179.39 kB** (−2.26 kB).
- Precache PWA: 16 → **15 entries** · 815 KB → **799 KB** (−16 KB).
- Sin dependencias nuevas.

**Tests**: 66/66 siguen pasando. Lógica de negocio intacta.

**Pendientes generados por este handoff**:

- 🔵 Retirar `SortableList.tsx` definitivamente tras Post-Test #2 si
  sigue sin uso (Pendiente #8).
- ⚠️ Microcopy de Timeline: "palabra" → "evento" pendiente de confirmar
  con UX (Pendiente #10).

**Commits en `main`**:

- `[VISUAL] Handoff UX — TapToPlace reemplaza drag & drop en verse-scramble y timeline + fix paleta Button`
- `[VISUAL] CHANGELOG — Handoff UX TapToPlace cerrado + fix Button.tsx`

**Verificación técnica**:
| Métrica | Valor |
|---|---|
| `npm run build` | ✅ limpio |
| Tests unitarios | 66/66 |
| Bundle gzip | 179.39 kB (−2.26 kB) |
| Precache PWA | 15 entries · 799 KB |
| Botón Confirmar en alba | ✅ verificado en local |
| Tap-to-place en móvil | ✅ verificado en local |
| Navegación teclado | ✅ verificado en local |
| `prefers-reduced-motion` | ✅ verificado en local |

**Estado del área Visual**: ✅ Handoffs PWA cerrados + TapToPlace cerrado +
fix paleta Button. Sin pendientes activos hasta Test #2.

**Handoffs restantes**:
| # | Tarea | Área | Estado |
| --- | -------------------------------------------------- | ----------------- | --------------- |
| 2 | Cambiar textos "Mente en el Camino" → "Selah" | UX | ⏳ Pendiente |
| 3 | Vercel Analytics + Core Web Vitals | Admin | ⏳ Pendiente |
| 10 | Adaptar microcopy "palabra" → "evento" en Timeline | UX | ⏳ Pendiente |

**Nota para Admin**: Chrome DevTools reporta 2 warnings opcionales en el
manifest (falta campo `screenshots` para "Richer PWA Install UI"). No es
un error. Pendiente futuro.

---

## 2026-09-25 — FASE 2 · UX · Handoff a Visual (CERRADO)

### [UX→VISUAL] Reemplazar drag & drop por tap-to-place en Timeline y Verse-scramble

**Estado**: ✅ Cerrado por Visual (ver entrada "2026-09-25 · Visual · Handoff
UX TapToPlace CERRADO" arriba).

**Origen**: Feedback de testers. El drag & drop (`SortableList.tsx` con
Motion Reorder) tiene retraso táctil en móvil y se percibe tedioso.
Además, incumple WCAG 2.2 AA · 2.5.7 (Dragging Movements).

**Decisión UX** (autorizada por product owner): reemplazar el modelo de
interacción por "tap-to-place" (sentence builder tipo Duolingo/Kahoot).
Un toque = una acción. Cero arrastre.

**Argumento objetivo** (además del feedback):

- Velocidad percibida: 3 fases (hold+move+release) → 1 toque.
- Precisión motora requerida: alta → baja.
- Accesibilidad teclado/lector: difícil → natural.
- WCAG 2.2 AA · 2.5.7: ❌ incumple → ✅ cumple.

**Microcopy nuevo** (territorio UX, fijo):

- Hint: `"Toca una palabra y colócala en su orden. Toca de nuevo para devolverla."`
  (reemplaza `"Arrastra para ordenar. También puedes usar las flechas."`)

**Impacto en métricas esperadas**:

- Sin cambio en bundle (se reemplaza un componente por otro similar).
- Sin cambio en tests unitarios (lógica intacta).

---

## 2026-09-24 — FASE 2 · Visual · Handoffs PWA CERRADOS

### [VISUAL] Cierre de los 3 handoffs visuales de PWA

**Origen**: Admin cerró PWA en Fase 2 y dejó 4 handoffs. El #2 (textos
"Mente en el Camino" → "Selah") es territorio UX. Los #1, #3 y #4 eran
territorio Visual y quedaron cerrados en esta sesión.

**Handoff 1 — `index.html` actualizado**

- `lang="en"` → `lang="es"`.
- `<title>` → `Selah — Trivia Bíblica` (alineado con `manifest.name`).
- Añadido `<meta name="description">` con slogan.
- Añadido `<meta name="theme-color" content="#F5B544">`.
- Añadido `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`.
- Añadidas metas iOS: `apple-mobile-web-app-capable`,
  `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`.
- `viewport-fit=cover` añadido (safe-area-inset en móviles con notch).
- **No** se añadió `<link rel="manifest">` (lo inyecta `vite-plugin-pwa`).
- Verificado en producción: pestaña muestra "Selah — Trivia Bíblica".

**Handoff 3 — `public/favicon.svg` rediseñado**

- Antes: rayo morado de Vite (default de plantilla).
- Ahora: llama teardrop con gradiente `alba-400` → `alba-500` → `fuego-500`.
- Núcleo interior (gota alargada) con gradiente alba claro.
- Glow radial cálido detrás de la llama.
- Fondo rounded square `rx=14` con gradiente `#151129` → `#060912`.
- Diseño alineado 1:1 con los íconos PWA de Admin.
- Peso: ~700 bytes.
- Verificado abriendo `/favicon.svg` en navegador.

**Handoff 4 — `public/icons.svg` eliminado**

- Verificación runtime: DevTools → Network con filtro `icons.svg` →
  0/8 requests.
- Verificación código: búsqueda global en VS Code → 9 resultados, todos
  en documentación, ninguno en `.tsx`, `.ts`, `.html` o `.css`.
- Confirmado huérfano. Eliminado sin romper build ni runtime.

**Commits en `main`**:

- `[VISUAL] Handoff 1 PWA — index.html con marca Selah, theme-color y metas iOS`
- `[VISUAL] Handoff 3 PWA — favicon.svg rediseñado como llama Selah (alba→fuego)`
- `[VISUAL] Handoff 4 PWA — eliminar public/icons.svg (placeholder sin uso)`

**Verificación técnica**:
| Métrica | Valor |
|---|---|
| `npm run build` | ✅ limpio |
| Manifest en producción | ✅ `Selah — Trivia Bíblica` |
| theme_color en producción | ✅ `#F5B544` |
| Favicon en producción | ✅ llama Selah |
| Peticiones a `icons.svg` | 0 (eliminado) |
| Tests unitarios | 66/66 |

**Estado del área Visual**: ✅ Handoffs PWA cerrados. Ahora trabaja en
TapToPlace (handoff UX).

**Handoffs restantes**:
| # | Tarea | Área | Estado |
|---|-------|------|--------|
| 2 | Cambiar textos "Mente en el Camino" → "Selah" | UX | ⏳ Pendiente |
| 5 | Vercel Analytics + Core Web Vitals | Admin | ⏳ Pendiente |

**Nota para Admin**: Chrome DevTools reporta 2 warnings opcionales en el
manifest (falta campo `screenshots` para "Richer PWA Install UI"). No es
un error. Pendiente futuro.

---

## 2026-09-24 — FASE 2 · Admin · Tarea 1 CERRADA: PWA

### [ADMIN] PWA configurada + rebrand a "Selah"

**Decisión de marca (autorizada por el product owner)**:

- Nombre público de la app: **Selah** ("pausa, medita" — hebreo, Salmos).
- Slogan: "Pausa. Reflexiona. Aprende."
- Nombre interno del repo/proyecto: `mente-en-el-camino` (no cambia).

**Configurado en `vite.config.ts`**:

- Manifest: `name: "Selah — Trivia Bíblica"`, `short_name: "Selah"`.
- `theme_color: "#F5B544"`, `background_color: "#0B0F1A"`.
- `display: "standalone"`, `orientation: "portrait"`.
- 3 íconos PWA + apple-touch-icon.
- Workbox: autoUpdate, precache del shell.

**Nuevos assets en `public/`**:

- `pwa-192x192.png`, `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon.png`.
- Diseño: llama neón alba-500 → fuego-500 sobre noche-900.
- Referencia: Jeremías 23:29 ("mi palabra es fuego").

**Verificación**:

- `npm run build` ✅
- `manifest.webmanifest` generado ✅
- Service worker + workbox ✅
- Precache: 16 entries · 815 KB
- Bundle gzip: 181.65 kB (baseline)
- Deploy Vercel ✅
- Install prompt Chrome ✅

---

## 2026-09-23 / 2026-09-24 — FASE 1 (consolidado)

### [SISTEMA] Documentación maestra

- Creada documentación maestra del proyecto (`docs/`).
- 4 áreas: Funcional, Visual, UX, Admin.
- Paleta "Noche y Alba" como fuente única de verdad visual.
- Stack: React 19 · TypeScript · Vite 8 · Tailwind v4 · Zustand v5 · Dexie · Motion.

### [FEEDBACK] Test #1 — 5 jóvenes

**Hallazgos**:

1. **Rendimiento**: algunos teléfonos sienten la app pesada y lenta.
2. **Preguntas trampa**: molestan al mezclarse con fáciles.
3. **Percepción general**: "se siente vacía", "sin principios".
4. **Nuevo (Fase 2)**: drag & drop con lag táctil en móvil.

**Acciones**:

- Visual: optimización (deviceTier + AnimatedBackground).
- Funcional: dificultad adaptativa.
- UX: microcopy cálido + identidad cristiana visible.
- UX→Visual: TapToPlace (Fase 2, cerrado 2026-09-25).

### [VISUAL] Fase 1 — 4 rondas

- **Ronda 1**: Optimización + rediseño Results/Profile + Skeleton + HintDeduction microinteracciones.
- **Ronda 2**: Modales custom (Modal, BadgeDetail, Prompt, Confirm).
- **Ronda 3**: Migración paleta Home + scrollbar invisible.
- **Ronda 4**: SortableList + VerseScramble + Timeline UI.

### [FUNCIONAL] Fase 1 — 3 rondas

- **Ronda 1**: dailyPrinciples + Badge.verse + dificultad adaptativa.
- **Ronda 2**: Bugs críticos (Timer, pista inicial, tildes).
- **Ronda 3**: Tipos verse-scramble + timeline + 14 datos + vitest (66 tests).

### [UX] Fase 1 — 4 sesiones

- **Sesión 1**: Microcopy global + reorden Home.
- **Sesión 2**: Microcopy tipos nuevos.
- **Sesión 3**: Validación SortableList (fix aria-live).
- **Sesión 4**: Validaciones navegador.

---

## 📋 Pendientes activos (Fase 2)

| #   | Tarea                                              | Área              | Estado          |
| --- | -------------------------------------------------- | ----------------- | --------------- |
| 1   | Implementar TapToPlace (drag → tap)                | Visual            | ✅ Cerrado      |
| 2   | Cambiar textos "Mente en el Camino" → "Selah"      | UX                | ⏳              |
| 3   | Vercel Analytics + Core Web Vitals                 | Admin             | ⏳              |
| 4   | Validar en móvil real (Test #2)                    | UX                | ⏳              |
| 5   | Ampliar banco 70 → 100+                            | Funcional         | 🟡 Post Test #2 |
| 6   | Onboarding primera vez                             | UX                | ⏸               |
| 7   | Migración a Supabase                               | Admin + Funcional | 🟢              |
| 8   | Retirar `SortableList.tsx` definitivamente         | Visual            | 🟢 Post Test #2 |
| 9   | Arreglar paleta de `Button.tsx`                    | Visual            | ✅ Cerrado      |
| 10  | Adaptar microcopy "palabra" → "evento" en Timeline | UX                | ⏳              |

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
