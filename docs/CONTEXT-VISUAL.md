# CONTEXT-VISUAL — Área Visual · Mente en el Camino (Fase 3)

Documento de traspaso para el asistente especializado en el **área Visual**.
Última actualización: 2026-10-02 (Fase 3).
Estado: ✅ Área limpia. Sin pendientes activos hasta Test #2.

---

## 1. QUÉ ES EL ÁREA VISUAL

Especializada en todo lo que el usuario ve, siente e interactúa visualmente:

- Diseño visual, coherencia de paleta y sistema de diseño.
- Tipografía, espaciado, iconografía y jerarquía visual.
- Animaciones, transiciones y microinteracciones (Motion).
- Componentes visuales (botones, cards, modales, skeletons, barras de progreso).
- Responsive y mobile-first (diseño para 360px base).
- Accesibilidad visual (contrastes, tamaños táctiles, focus visible, `aria-labels`).
- Rendimiento gráfico (evitar repaints, optimizar animaciones).

**NO toca (límites estrictos)**:

- ❌ **Lógica de negocio**: scoring, niveles, rachas, insignias, rating ELO, cálculos.
- ❌ **Flujos UX**: onboarding, navegación, microcopy, textos de marca, decisiones de qué mostrar.
- ❌ **Administración**: PWA config, analytics, deploy, Supabase, variables de entorno.

---

## 2. CONTEXTO DEL PROYECTO

**Nombre técnico**: mente-en-el-camino
**Nombre público (marca)**: Selah ("pausa, medita" — hebreo, aparece 74 veces en los Salmos).
**Slogan**: "Pausa. Reflexiona. Aprende."
**Tipo**: Trivia bíblica interactiva para jóvenes (13-25 años).
**Estado**: PWA instalable + Analytics activo. Fase 3 en curso (validación + crecimiento).
**Repo**: `github.com/silvertht/mente-en-el-camino`
**Producción**: `https://mente-en-el-camino.vercel.app`

**Stack Técnico (Foco Visual)**:

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS v4 (configuración vía `@theme` en `src/index.css`, **NO** existe `tailwind.config.js`).
- Motion (`motion/react`, **NO** `framer-motion`).
- Zustand v5 (estado global, solo consumo selectores atómicos).
- Dexie.js (IndexedDB, no tocado por Visual).

---

## 3. TERRITORIO (ARCHIVOS QUE PUEDO MODIFICAR)

### Base

- `src/index.css` — paleta `@theme`, keyframes, reset, utilidades.
- `src/utils/animations.ts` — variantes Motion (fadeInUp, popIn, staggerContainer, etc.).
- `index.html` — título, meta tags, theme-color, favicon.
- `public/favicon.svg` — llama Selah (alba→fuego).

### Componentes visuales

- `src/components/Button.tsx` (variantes: primary, secondary, ghost, danger, reino).
- `src/components/Card.tsx` (variantes: default, elevated).
- `src/components/ProgressBar.tsx`
- `src/components/Timer.tsx`
- `src/components/BadgeCard.tsx`
- `src/components/CategoryCard.tsx`
- `src/components/AnimatedBackground.tsx`
- `src/components/GradientText.tsx`
- `src/components/StatPill.tsx`
- `src/components/Skeleton.tsx`
- `src/components/Modal.tsx` (base para modales).
- `src/components/BadgeDetailModal.tsx`
- `src/components/PromptDialog.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/components/ScoreFeedback.tsx` (solo estilos).
- `src/components/QuestionRenderer.tsx` (solo estilos).

### Componentes de preguntas

- `src/components/questions/TapToPlace.tsx` ✅ (Fase 2 — reemplazo de drag & drop).
- `src/components/questions/VerseScrambleQuestion.tsx` (usa TapToPlace).
- `src/components/questions/TimelineQuestion.tsx` (usa TapToPlace).
- `src/components/questions/SortableList.tsx` ⚠️ **@deprecated** (Pendiente eliminar post Test #2. Cero imports actuales).
- Estilos de los otros 5 tipos (`MultipleChoice`, `TrueFalse`, `WhoSaidIt`, `FillBlank`, `HintDeduction`).

### Pantallas (solo capa visual, territorio compartido)

- `src/screens/Home.tsx` ⚠️ (compartido con UX y Funcional).
- `src/screens/Results.tsx`
- `src/screens/Profile.tsx`
- `src/App.tsx` (solo el estado de carga).

---

## 4. PALETA "NOCHE Y ALBA"

Definida en `src/index.css` dentro de `@theme`. **Fuente única de verdad**.

| Nombre              | Hex                                                       | Clase Tailwind            |
| :------------------ | :-------------------------------------------------------- | :------------------------ |
| **Noche** (fondos)  | `#060912` / `#0B0F1A` / `#131A2B` / `#1E2842` / `#2D3A5A` | `noche-950` … `noche-600` |
| **Alba** (dorado)   | `#FFD166` / `#F5B544` / `#D18F1E` / `#A36D12`             | `alba-400` … `alba-700`   |
| **Reino** (violeta) | `#A78BFA` / `#7C3AED` / `#5B21B6`                         | `reino-400` … `reino-600` |
| **Fuego** (racha)   | `#FB923C` / `#F97316`                                     | `fuego-400/500`           |
| **Vida** (correcto) | `#34D399` / `#10B981`                                     | `vida-400/500`            |
| **Alerta** (error)  | `#F87171` / `#EF4444`                                     | `alerta-400/500`          |

**Reglas de color**:

- **Prohibido**: `slate-*` (excepto preexistentes heredados), `amber-*`, `emerald-*`, `red-*`, `indigo-*`.
- **Permitido**: `noche-*`, `alba-*`, `reino-*`, `fuego-*`, `vida-*`, `alerta-*`, `white/*`.

---

## 5. CONVENCIONES Y REGLAS DE ORO

1. **Tailwind v4**: Clases custom (`text-alba-400`, `bg-noche-800`). Sin `tailwind.config.js`. Todo vía `@theme` en CSS. Uso de `min-h-11` para tamaño táctil mínimo (44px).
2. **Motion**: Import `import { motion } from "motion/react"`. **Solo animar `transform` y `opacity`**. NUNCA animar `boxShadow`, `borderColor` o `filter: blur` (causan repaint por frame y lag en móviles).
3. **Mobile-first**: Todo diseño se piensa primero para 360px y luego escala con `sm:`, `md:`, `lg:`.
4. **Nunca romper lógica funcional**: Si un cambio visual afecta un componente con lógica, coordinar con Funcional.
5. **Nunca exponer `node_modules`**.
6. **Accesibilidad (A11y)**: Focus visible (`ring-alba-400`), `aria-live="polite"` para estados, modales con `role="dialog"` y `aria-labelledby`.

---

## 6. ESTADO ACTUAL DEL ÁREA (Fase 3)

### ✅ Cerrado en Fase 1

- Optimización de rendimiento (deviceTier, AnimatedBackground).
- Rediseño Results (podio 5 niveles), Profile (hero + vitrina).
- Modales custom (Modal, BadgeDetail, Prompt, Confirm).
- UI de tipos nuevos.

### ✅ Cerrado en Fase 2

- **PWA Handoffs**: `index.html` con marca Selah, favicon de llama, eliminación de `icons.svg`.
- **TapToPlace**: Reemplazo de drag & drop por tap-to-place (accesible y sin lag).
- **Fix Button**: Paleta arreglada + variante `reino`.
- **Género**: Concordancia gramatical (`itemGender`) en TapToPlace.

### ✅ Cerrado en Fase 3 (2026-10-02)

- **Handoff Funcional → Visual**: Integración del rating ELO en `Profile.tsx` (Card "Experiencia", número animado, label y barra de progreso).

### 🟢 Pendientes (Bloqueados hasta Test #2)

- Microinteracciones refinadas.
- Modo claro opcional.
- Eliminar `SortableList.tsx` definitivamente.

---

## 7. APRENDIZAJES Y PATRONES (Para el sucesor)

- **Rendimiento**: Usar `radial-gradient` en lugar de `blur` para efectos de glow.
- **Tap-to-place**: Slots fijos + banco desordenado + tap. Confirmar deshabilitado hasta llenar slots. `aria-live` para anunciar acciones.
- **Asset deletion**: Antes de borrar algo en `public/`, verificar runtime (DevTools Network) y código (Ctrl+Shift+F).

---

## 8. PRIMEROS PASOS PARA EL SUCESOR

### Día 1

1. Leer este documento + `PROJECT.md` + `CHANGELOG-VISUAL.md` + `VISUAL-INTERFACES.md`.
2. Verificar `npm run build` (limpio, ~182 kB gzip).
3. Verificar `npm run test` (127/127).
4. Abrir `npm run dev` e inspeccionar Home, Game, Results, Profile (verificar la nueva card de rating).

### Cuando llegue la primera tarea

1. Confirmar territorio Visual.
2. Revisar `VISUAL-INTERFACES.md` para ver si hay deudas pendientes.
3. Proponer solución técnica.
4. Entregar archivo completo.
5. Actualizar `CHANGELOG-VISUAL.md`.

---

**Fin del CONTEXT-VISUAL (Fase 3).**
