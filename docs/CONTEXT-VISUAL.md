# CONTEXT-VISUAL — Área Visual · Mente en el Camino (Fase 2)

Documento de traspaso para el asistente especializado en el **área Visual**.
Última actualización: 2026-10-01 (Fase 2).
Estado: ✅ Área limpia. Sin pendientes activos hasta Test #2.

---

## 1. QUÉ ES EL ÁREA VISUAL

Especializada en:

- Diseño visual y coherencia de paleta.
- Tipografía, espaciado, iconografía.
- Animaciones y microinteracciones.
- Componentes visuales (botones, cards, modales, skeletons).
- Responsive y mobile-first.
- Accesibilidad visual (contraste, tamaños táctiles, focus visible).
- Rendimiento gráfico.

**NO toca**:

- ❌ Lógica de negocio (scoring, niveles, rachas, insignias).
- ❌ Flujos UX (onboarding, navegación, microcopy).
- ❌ Administración (PWA config, analytics, deploy, Supabase).

---

## 2. CONTEXTO DEL PROYECTO

**Nombre técnico**: mente-en-el-camino
**Nombre público**: Selah ("pausa, medita" — hebreo, Salmos)
**Slogan**: "Pausa. Reflexiona. Aprende."
**Tipo**: Trivia bíblica interactiva para jóvenes (13-25 años).
**Estado**: PWA instalable + métricas activas. Fase 2 en curso.
**Repo**: `github.com/silverth/mente-en-el-camino`
**Producción**: `https://mente-en-el-camino.vercel.app`

**Stack**:

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS v4 (configuración vía `@theme` en `src/index.css`, **NO**
  `tailwind.config.js`)
- Motion (`motion/react`, **NO** `framer-motion`)
- Zustand v5
- Dexie.js (IndexedDB)
- `vite-plugin-pwa` (CONFIGURADO por Admin en Fase 2)

---

## 3. TERRITORIO (ARCHIVOS QUE PUEDO MODIFICAR)

### Base

- `src/index.css` — paleta `@theme`, keyframes, reset, utilidades.
- `src/utils/animations.ts` — variantes Motion.
- `index.html` — título, meta tags, favicon.
- `public/favicon.svg` — llama Selah.
- `public/icons.svg` — ❌ ELIMINADO en Fase 2 (handoff 4).

### Componentes visuales

- `src/components/Button.tsx` ⚠️ (paleta arreglada en Fase 2 — ver §8).
- `src/components/Card.tsx`
- `src/components/ProgressBar.tsx`
- `src/components/Timer.tsx`
- `src/components/BadgeCard.tsx`
- `src/components/CategoryCard.tsx`
- `src/components/AnimatedBackground.tsx`
- `src/components/GradientText.tsx`
- `src/components/StatPill.tsx`
- `src/components/Skeleton.tsx`
- `src/components/Modal.tsx`
- `src/components/BadgeDetailModal.tsx`
- `src/components/PromptDialog.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/components/ScoreFeedback.tsx` (solo estilos)
- `src/components/QuestionRenderer.tsx` (solo estilos)

### Componentes de preguntas

- `src/components/questions/TapToPlace.tsx` ✅ NUEVO (Fase 2).
- `src/components/questions/VerseScrambleQuestion.tsx` ✅ Migrado a TapToPlace.
- `src/components/questions/TimelineQuestion.tsx` ✅ Migrado a TapToPlace.
- `src/components/questions/SortableList.tsx` ⚠️ **@deprecated** (Fase 2).
  - NO usar en código nuevo. Pendiente eliminar tras Test #2.
  - Ningún archivo lo importa (verificado con búsqueda global).
- Otros 5 tipos de pregunta (`MultipleChoice`, `TrueFalse`, `WhoSaidIt`,
  `FillBlank`, `HintDeduction`) — solo estilos si toca.

### Pantallas (solo capa visual)

- `src/screens/Home.tsx` ⚠️ territorio compartido con UX y Funcional.
- `src/screens/Results.tsx`
- `src/screens/Profile.tsx`
- `src/App.tsx` (solo el estado de carga).

---

## 4. PALETA "NOCHE Y ALBA"

Definida en `src/index.css` dentro de `@theme`. **Fuente única de verdad**.

| Nombre              | Hex                                                       | Clase                     |
| ------------------- | --------------------------------------------------------- | ------------------------- |
| **Noche** (fondos)  | `#060912` / `#0B0F1A` / `#131A2B` / `#1E2842` / `#2D3A5A` | `noche-950` … `noche-600` |
| **Alba** (dorado)   | `#FFD166` / `#F5B544` / `#D18F1E` / `#A36D12`             | `alba-400` … `alba-700`   |
| **Reino** (violeta) | `#A78BFA` / `#7C3AED` / `#5B21B6`                         | `reino-400` … `reino-600` |
| **Fuego** (racha)   | `#FB923C` / `#F97316`                                     | `fuego-400/500`           |
| **Vida** (correcto) | `#34D399` / `#10B981`                                     | `vida-400/500`            |
| **Alerta** (error)  | `#F87171` / `#EF4444`                                     | `alerta-400/500`          |

**Prohibido**: `slate-*`, `amber-*`, `emerald-*`, `red-*`, `indigo-*`.
**Permitido**: `noche-*`, `alba-*`, `reino-*`, `fuego-*`, `vida-*`,
`alerta-*`, `white/*`.

---

## 5. CONVENCIONES DE CÓDIGO

### Tailwind v4

- Clases custom: `text-alba-400`, `bg-noche-800`, `border-noche-700`.
- Sin `tailwind.config.js`. Todo vía `@theme` en CSS.
- Utilidades responsive mobile-first (`sm:`, `md:`, `lg:`).

### Motion

- Import: `import { motion, AnimatePresence } from "motion/react";`
- Variantes en `src/utils/animations.ts`.
- Respetar `useReducedMotion()` para guards locales.
- **Motion solo anima `transform` y `opacity`**. Nunca `boxShadow`,
  `borderColor`, `filter: blur` (repaint por frame).

### Componentes

- PascalCase, archivos con nombre del componente.
- Props claras, sin lógica de negocio.
- Comentarios y variables en español cuando aplique.
- Botones: variantes `primary`, `secondary`, `ghost`, `danger`, `reino`.

### Zustand

- Selectores atómicos (una pieza por selector).
- **NUNCA** devolver objetos nuevos sin `useShallow`.

### Reglas de oro

1. Nunca romper lógica funcional sin avisar.
2. Mobile-first siempre.
3. Nunca exponer `node_modules` a GitHub.
4. Cada respuesta enseña (contenido teológico revisado).
5. Optimizar peso: assets ligeros, sin librerías grandes.

---

## 6. ESTADO ACTUAL DEL ÁREA

### ✅ Cerrado en Fase 1 (4 rondas)

- Optimización de rendimiento (deviceTier, AnimatedBackground).
- Rediseño Results (podio 5 niveles), Profile (hero + vitrina).
- Modales custom (Modal, BadgeDetail, Prompt, Confirm).
- UI de tipos nuevos (SortableList + 2 wrappers).
- Accesibilidad final (aria-live, prefers-reduced-motion).
- Build limpio: 181.65 kB gzip (baseline).

### ✅ Cerrado en Fase 2 (esta sesión)

**Handoffs PWA (Admin → Visual)**
| # | Tarea | Estado |
|---|-------|--------|
| 1 | `index.html` con marca Selah, theme-color, metas iOS | ✅ |
| 3 | `public/favicon.svg` rediseñado (llama alba→fuego) | ✅ |
| 4 | `public/icons.svg` eliminado (huérfano confirmado) | ✅ |

**Handoff UX → Visual: TapToPlace**

- `src/components/questions/TapToPlace.tsx` (nuevo componente).
- Reemplaza drag & drop por tap-to-place en `verse-scramble` y `timeline`.
- Motivos: lag táctil + incumplimiento WCAG 2.2 AA · 2.5.7.
- `SortableList.tsx` marcado `@deprecated`.

**Fix paleta `Button.tsx`**

- Reemplazados `amber-*`, `slate-*`, `red-*` por `alba-*`, `noche-*`, `alerta-*`.
- Añadida variante `reino`.

**Handoff género en TapToPlace**

- Nueva prop `itemGender?: "f" | "m"` (default `"f"`).
- `TimelineQuestion` pasa `"m"`. `VerseScrambleQuestion` usa `"f"`.

### 🟢 Pendientes (bloqueados hasta Test #2)

| Pendiente                                   | Bloqueado por  |
| ------------------------------------------- | -------------- |
| Microinteracciones refinadas                | Post Test #2   |
| Modo claro (opcional)                       | Prioridad baja |
| Eliminar `SortableList.tsx` definitivamente | Post Test #2   |

---

## 7. APRENDIZAJES Y PATRONES

### Rendimiento

- **NUNCA** `backdrop-blur` en elementos animados.
- **NUNCA** `filter: blur()` en bucles de render.
- **NUNCA** animar `boxShadow` ni `borderColor` (repaint por frame).
  - ⚠️ El viejo `SortableList` lo hacía en `whileDrag` → lag táctil.
  - `TapToPlace` lo resolvió animando solo `opacity` + `scale`.
- **SIEMPRE** animar solo `transform` y `opacity`.
- **PREFERIR** `radial-gradient` antes que blur.

### Tap-to-place (patrón nuevo, Fase 2)

- Slots fijos + banco desordenado + tap = una acción (WCAG-friendly).
- Botón confirmar deshabilitado hasta llenar todos los slots.
- `aria-live` anuncia cada acción ("X colocada en posición N").
- `itemGender` para concordancia gramatical en lector de pantalla.

### Accesibilidad

- Todo modal: `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- Focus trap + restauración de foco.
- `aria-live="polite"` para mensajes de estado.
- Tamaños táctiles ≥44px (`min-h-11` en Tailwind v4).
- `prefers-reduced-motion` → guard local + guard global.
- Focus visible: `ring-alba-400` + `ring-offset-noche-900`.

### Motion

- `Reorder` de Motion para listas ordenables (❌ deprecado en TapToPlace).
- `AnimatePresence` para entradas/salidas.
- `useReducedMotion()` respeta preferencia del SO.

### Tailwind v4

- `animate-[glow_3s...]` requiere `--animate-glow` en `@theme`.
- Clases con comas dentro de `shadow-[...]` → usar `_`.
- `min-h-11` = 44px (tamaño táctil mínimo iOS/Android).

### localStorage / assets

- Antes de borrar un asset de `public/`: verificar runtime (DevTools →
  Network) **y** código (Ctrl+Shift+F en VS Code).
- Ignorar `node_modules` en búsquedas globales.

---

## 8. HISTORIAL DE CAMBIOS VISUAL (Fase 2)

### 2026-09-24 — Handoffs PWA 1, 3, 4

- `index.html`: título Selah, theme-color #F5B544, metas iOS,
  `viewport-fit=cover`, `lang="es"`.
- `favicon.svg`: llama teardrop con gradiente alba→fuego, núcleo interior,
  glow radial, fondo rounded square.
- `icons.svg`: eliminado (0 requests runtime + 0 imports de código).

### 2026-09-25 — TapToPlace + fix Button

- `TapToPlace.tsx` nuevo (~200 líneas). Tap-to-place accesible.
- `VerseScrambleQuestion.tsx` y `TimelineQuestion.tsx` migrados.
- `SortableList.tsx` marcado `@deprecated`.
- `Button.tsx`: paleta prohibida → permitida + variante `reino`.
- Bundle gzip: 181.65 kB → 179.39 kB (−2.26 kB).
- Precache: 16 → 15 entries.

### 2026-09-25 — Handoff género TapToPlace

- Nueva prop `itemGender?: "f" | "m"` en `TapToPlace`.
- `TimelineQuestion` pasa `"m"` + hint adaptado ("evento").
- `VerseScrambleQuestion` sin cambios (usa default `"f"`).
- Bundle gzip: 179.39 kB → 180.98 kB (+1.59 kB, delta del objeto `pron`).

### Métricas actuales

| Métrica         | Valor                  |
| --------------- | ---------------------- |
| Tests unitarios | 66/66 ✅               |
| Build time      | ~1 s                   |
| Bundle gzip     | 180.98 kB              |
| Precache PWA    | 15 entries · 804.10 KB |
| Favicon         | ✅ llama Selah         |
| PWA installable | ✅ Chrome              |

---

## 9. COLABORACIONES

### Con Admin

- ✅ Handoffs PWA 1, 3, 4 cerrados.
- Pendiente futuro: campo `screenshots` en manifest (warnings opcionales
  de Chrome para "Richer PWA Install UI").

### Con UX

- ✅ Handoff TapToPlace cerrado (drag & drop → tap-to-place).
- ✅ Handoff género cerrado (`itemGender`).
- ⏳ Pendiente: Test #2 con 5 jóvenes.
- Pendiente futuro: onboarding primera vez.

### Con Funcional

- Sin pendientes activos.
- Contrato `onAnswer(order: number[])` en `TapToPlace` se mantiene igual
  al de `SortableList`. Índices sobre `items` ya desordenados por el padre.
- Si hay cambio de tipos, Funcional avisa.

---

## 10. PRIMEROS PASOS PARA EL SUCESOR

### Día 1

1. Leer este documento + `PROJECT.md` + `CHANGELOG.md`.
2. Verificar `npm run build` (debe estar limpio).
3. Verificar `npm run test` (debe estar en 66/66).
4. Abrir la app en local (`npm run dev`).
5. Inspeccionar visualmente:
   - Home, Game, Results, Profile.
   - Pregunta `verse-scramble` y `timeline` (TapToPlace).
   - Verificar `aria-label` de chips (devolverlo/devolverla según tipo).

### Cuando llegue la primera tarea

1. Confirmar territorio Visual.
2. Verificar en `CHANGELOG.md` si está pendiente.
3. Proponer solución con justificación técnica.
4. Entregar archivo completo.
5. Actualizar `CHANGELOG.md`.

### Cuando haya bloqueo

- **PWA/manifest**: coordinar con Admin.
- **Lógica**: escalar a Funcional.
- **Microcopy/flujo**: escalar a UX.
- **Product owner (usuario)**: todo pasa por él.

---

## 11. REFERENCIA POR ÁREA

- **Funcional**: dueño de store, scoring, DB, tipos, datos.
- **UX**: dueño de flujos, microcopy, onboarding, textos de marca.
- **Admin**: dueño de PWA, analytics, deploy, Supabase.
- **Visual** (yo): dueño de todo lo que se ve, anima e interactúa visualmente.

**No hay comunicación directa entre chats** — todo pasa por el usuario
(product owner).

---

## 12. FRASE PARA EL SUCESOR

> "Fase 2 activa. PWA configurada, marca 'Selah' consolidada, favicon con
> llama alba→fuego, TapToPlace implementado (drag & drop eliminado),
> Button.tsx con paleta arreglada, concordancia de género en aria-labels.
> Área Visual limpia. Sin pendientes activos hasta Test #2. Cuando llegue
> Test #2: microinteracciones refinadas + modo claro opcional + retirar
> `SortableList.tsx` definitivamente. No tocar lógica. Respetar paleta.
> Motion solo anima transform/opacity. Ser quirúrgico."

---

**Fin del CONTEXT-VISUAL (Fase 2 · actualizado 2026-10-01).**
