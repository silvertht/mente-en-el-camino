# VISUAL-INTERFACES — Contratos y Deudas entre Áreas · Mente en el Camino (Fase 4)

Este documento detalla cómo el **Área Visual** se conecta con las otras áreas.

---

## 1. CONTRATOS DE COMPONENTES BASE

### 1.1 `Button.tsx`

- **Props**: `variant` ("primary" | "secondary" | "ghost" | "danger" | "reino"), `size` ("sm" | "md" | "lg"), `fullWidth` (boolean), `children`, `onClick`, `disabled`.
- **Reglas**: Renderiza un `<button>` con `min-h-11` (44px) garantizado. `type="button"` por defecto para evitar submits.
- **Uso**: Obligatorio para todos los CTAs.

### 1.2 `Card.tsx`

- **Props**: `variant` ("default" | "elevated" | "outlined" | "bare"), `children`, `className`.
- **Reglas**: La variante `bare` no tiene fondo, padding ni borde (solo `rounded-2xl`). El caller inyecta las clases visuales vía `className`.
- **Deuda**: `default`, `elevated` y `outlined` usan `bg-slate-800` heredado. No cambiar sin coordinar con Profile.

### 1.3 `Modal.tsx`

- **Props**: `open`, `onClose`, `title`, `subtitle`, `children`, `footer`, `disableOverlayClose`, `initialFocusRef`.
- **Reglas**: Único componente autorizado para diálogos. Garantiza focus trap, scroll lock, `role="dialog"` y `aria-modal`. En móvil se comporta como bottom-sheet.

---

## 2. VISUAL ↔ FUNCIONAL

### 2.1 Deuda Técnica Activa

- **Rating Tiers (Profile.tsx)**: Visual duplica los umbrales de `getRatingLabel` en una constante `RATING_TIERS`. **Solución requerida**: Funcional debe exponer `getRatingTiers()` en `utils/rating.ts`. Estado: Pendiente.

### 2.2 Contratos de Datos

- **Home (9 Sendas)**: Visual consume `CATEGORY_LIST` desde `src/data/categories.ts`. Funcional/UX debe asegurar que las 9 categorías tengan sus propiedades (`id`, `name`, `emoji`, `color`) y que la paleta de colores en `color` use los tokens `bg-alba-*`, `bg-vida-*`, etc.

---

## 3. VISUAL ↔ UX

- **Regla de Microcopy**: Visual no inventa textos. Todo texto en pantalla (labels, modales, botones) es definido por UX.
- **Modal de Instalación (iOS)**: El texto instructivo fue proporcionado por el PO/UX. Visual solo lo maquetó en el `Modal`.

---

## 4. VISUAL ↔ ADMIN

- **PWA**: Visual construyó la UI del botón "Instalar App" y el modal iOS. Admin administra el hook `useInstallPrompt` y la configuración de `vite-plugin-pwa`.
