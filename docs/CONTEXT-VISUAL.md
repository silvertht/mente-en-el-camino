# CONTEXT-VISUAL — Área Visual · Mente en el Camino (Fase 4)

Documento de traspaso para el asistente especializado en el **área Visual**.
Última actualización: 2026-11-11 (Cierre Fase 4).
Estado: ✅ Área limpia. Refactor base completado. Listos para Fase 5.

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

- ❌ **Lógica de negocio**: scoring, niveles, rachas, insignias, rating ELO.
- ❌ **Flujos UX**: onboarding, navegación, microcopy, textos de marca.
- ❌ **Administración**: PWA config (más allá de la UI), analytics, deploy, Supabase.

---

## 2. CONTEXTO DEL PROYECTO

**Nombre técnico**: mente-en-el-camino
**Nombre público (marca)**: Selah ("pausa, medita").
**Stack Técnico (Foco Visual)**:

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (configuración vía `@theme` en `src/index.css`, NO `tailwind.config.js`).
- Motion (`motion/react`, NO `framer-motion`).
- Zustand v5 (consumo selectores atómicos).
- Dexie.js (IndexedDB, no tocado por Visual).

---

## 3. TERRITORIO (ARCHIVOS MODIFICABLES)

### Base y Sistema de Diseño

- `src/index.css` — paleta `@theme`, keyframes, reset.
- `src/utils/animations.ts` — variantes Motion.
- `index.html` — título, metas, theme-color.
- `src/components/Button.tsx` — **Refactorizado en Fase 4 (min-h-11, type="button")**.
- `src/components/Card.tsx` — **Refactorizado en Fase 4 (variante `bare` añadida)**.
- `src/components/Modal.tsx` — Modal base para todos los diálogos (focus trap, scroll lock).
- `src/components/ProgressBar.tsx` — Barra de progreso reutilizable.
- `src/components/StatPill.tsx`, `BadgeCard.tsx`, `CategoryCard.tsx`.

### Pantallas (capa visual)

- `src/screens/Home.tsx` — **Actualizado en Fase 4: grid-cols-2, 9 sendas dinámicas, modal PWA**.
- `src/screens/Game.tsx` — **Actualizado en Fase 4: flecha de retorno con touch target 44px**.
- `src/screens/Profile.tsx` — Refactorizado para usar `Card`.
- `src/screens/Onboarding.tsx` — Refactorizado para usar `Button` y `Card`.

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

- **Prohibido**: `slate-*` (excepto deuda heredada en Card), `amber-*`, `emerald-*`, `red-*`, `indigo-*`, `sky-*`, `lime-*`, `rose-*`, `orange-*`, `purple-*`.
- **Permitido**: `noche-*`, `alba-*`, `reino-*`, `fuego-*`, `vida-*`, `alerta-*`, `white/*`.

---

## 5. CONVENCIONES Y REGLAS DE ORO

1. **Tailwind v4**: Clases custom vía `@theme`. Uso de `min-h-11` para tamaño táctil (44px).
2. **Motion**: Solo animar `transform` y `opacity`. NUNCA `boxShadow`, `borderColor` o `filter: blur`.
3. **Mobile-first**: Diseñar para 360px y escalar.
4. **A11y**: Focus visible (`ring-alba-400`), `aria-live="polite"`, modales con `role="dialog"` y foco atrapado.
5. **Reutilización**: Todo botón debe usar `<Button>`, toda tarjeta `<Card>`, todo diálogo `<Modal>`.

---

## 6. ESTADO ACTUAL DEL ÁREA (Cierre Fase 4)

### ✅ Cerrado en Fase 4

- **H-06 (Componentes Base)**: Refactor de `Button` (touch target 44px, `type="button"`) y `Card` (nueva variante `bare`). Uso de estos componentes en `Onboarding` y `Profile`.
- **Limpieza**: Eliminación definitiva de `SortableList.tsx` (cero imports activos).
- **PWA UI**: Modal de instalación iOS (`useInstallPrompt`) usando el `Modal` base. Flecha de retorno en `Game.tsx` con fondo y touch target 44px.
- **9 Sendas**: `Home.tsx` ahora renderiza las 9 categorías dinámicamente. Grid ajustado a `grid-cols-2` en móvil. Colores de las categorías adaptados a la paleta Noche y Alba.

### 🟢 Pendientes / Deuda Técnica

- `RATING_TIERS` duplicado en `Profile.tsx`. Bloqueado por Funcional (`getRatingTiers()`).
- Variantes `default`, `elevated` y `outlined` de `Card` conservan `bg-slate-800` (deuda heredada, no tocada para no romper contraste en Profile).

---

## 7. PRIMEROS PASOS PARA EL SUCESOR

1. Leer este documento + `VISUAL-INTERFACES.md` + `CHANGELOG-VISUAL.md`.
2. Verificar `npm run build` y tests.
3. Abrir `npm run dev` e inspeccionar Home (9 sendas), Game (flecha), Onboarding y Profile.
4. En la Fase 5, el reto es diseñar el **"Espacio de Discipulado"** (mapas de niveles, lecciones). Se recomienda usar el patrón de "Camino Serpenteante" (zigzag vertical) con nodos `Card`/`Button` y abrir un `Modal` para el detalle de la lección.
