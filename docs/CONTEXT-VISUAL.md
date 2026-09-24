# CONTEXT-VISUAL — Área Visual · Mente en el Camino (Fase 2)

Documento de traspaso para el asistente especializado en el **área Visual**.
Última actualización: 2026-09-24 (Fase 2).
Estado: 🔄 Cerrando handoffs PWA del Admin.

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
**Estado**: PWA instalable. Fase 2 en curso.
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
- `index.html` — título, meta tags, favicon (NUEVO en Fase 2).
- `public/favicon.svg`, `public/icons.svg` (NUEVO en Fase 2).

### Componentes visuales

- `src/components/Button.tsx`
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
- `src/components/questions/SortableList.tsx`
- `src/components/questions/VerseScrambleQuestion.tsx`
- `src/components/questions/TimelineQuestion.tsx`

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

### Completado en Fase 1 (4 rondas)

✅ Optimización de rendimiento (deviceTier, AnimatedBackground).
✅ Rediseño Results (podio 5 niveles), Profile (hero + vitrina).
✅ Modales custom (Modal, BadgeDetail, Prompt, Confirm).
✅ UI de tipos nuevos (SortableList + 2 wrappers).
✅ Accesibilidad final (aria-live, prefers-reduced-motion).
✅ Build limpio: 181.65 kB gzip.

### Fase 2 — Trabajo activo

🔄 **3 handoffs de Admin (PWA)**:
| # | Tarea | Estado |
|---|-------|--------|
| 1 | Actualizar `index.html` (título Selah, theme-color, apple-touch-icon) | ⏳ |
| 3 | Rediseñar `public/favicon.svg` (llama neón alineada con PWA) | ⏳ |
| 4 | Revisar/eliminar `public/icons.svg` (placeholder) | ⏳ |

### Pendientes bloqueados

| Pendiente                    | Bloqueado por  |
| ---------------------------- | -------------- |
| Modo claro (opcional)        | Prioridad baja |
| Microinteracciones refinadas | Post Test #2   |

---

## 7. FLUJO DE TRABAJO

1. Recibir tarea (de UX, Funcional, Admin o usuario).
2. Verificar que está dentro del territorio Visual.
3. Proponer solución visual con justificación técnica.
4. Entregar archivo completo con clases Tailwind v4.
5. Verificar en navegador antes de commitear.
6. Actualizar `CHANGELOG.md`.

### Antes de proponer cambios

- Verificar si el archivo está en territorio compartido (`Home.tsx`).
- Coordinar con UX si toca microcopy.
- Coordinar con Funcional si toca lógica (no debería).
- Coordinar con Admin si toca PWA/manifest.

### Antes de commitear

- `npm run build` limpio.
- Prueba visual en navegador.
- Verificar `prefers-reduced-motion` no rompe.
- Verificar responsive (mobile-first).

---

## 8. APRENDIZAJES Y PATRONES (Fase 1)

### Rendimiento

- **NUNCA** `backdrop-blur` en elementos animados.
- **NUNCA** `filter: blur()` en bucles de render.
- **SIEMPRE** animar solo `transform` y `opacity`.
- **PREFERIR** `radial-gradient` antes que blur.

### Accesibilidad

- Todo modal: `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- Focus trap + restauración de foco.
- `aria-live="polite"` para mensajes de estado.
- Tamaños táctiles ≥44px.
- `prefers-reduced-motion` → guard local + guard global.

### Motion

- `Reorder` de Motion para listas ordenables.
- `AnimatePresence` para entradas/salidas.
- `useReducedMotion()` respeta preferencia del SO.

### Tailwind v4

- `animate-[glow_3s...]` requiere `--animate-glow` en `@theme`.
- Clases con comas dentro de `shadow-[...]` → usar `_`.

---

## 9. COLABORACIONES

### Con Admin

- **Recibiendo**: 3 handoffs de PWA (index.html, favicon, icons.svg).
- Pendiente: íconos PWA ya generados por Admin.

### Con UX

- Coordinación de microcopy al cambiar textos en pantallas.
- Pendiente: UX cambiará "Mente en el Camino" → "Selah".

### Con Funcional

- Sin pendientes activos.
- Si hay cambio de tipos, Funcional avisa.

---

## 10. PRIMEROS PASOS PARA EL SUCESOR

### Día 1

1. Leer este documento + `PROJECT.md` + `CHANGELOG.md`.
2. Verificar `npm run build` (debe estar limpio).
3. Abrir la app en local (`npm run dev`).
4. Revisar `index.html`, `public/favicon.svg`, `public/icons.svg`.

### Cuando llegue la primera tarea

1. Confirmar territorio Visual.
2. Verificar en `CHANGELOG.md` si está pendiente.
3. Proponer solución con justificación.
4. Entregar archivo completo.
5. Actualizar `CHANGELOG.md`.

### Cuando haya bloqueo

- **PWA/manifest**: coordinar con Admin.
- **Lógica**: escalar a Funcional.
- **Microcopy/flujo**: escalar a UX.

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

> "Fase 2 activa. PWA configurada por Admin con marca 'Selah'. Mi trabajo
> inmediato: cerrar 3 handoffs visuales de PWA (index.html, favicon.svg,
> icons.svg). El resto del área está limpio. No tocar lógica. Respetar la
> paleta. Verificar build. Ser quirúrgico."

---

**Fin del CONTEXT-VISUAL (Fase 2).**
