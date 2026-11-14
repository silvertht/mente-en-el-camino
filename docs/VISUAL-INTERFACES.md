# VISUAL-INTERFACES — Contratos y Deudas entre Áreas · Mente en el Camino (Fase 5)

Este documento detalla cómo el **Área Visual** se conecta con las otras áreas.
Última actualización: 2026-11-14 (Cierre Fase 5).

---

## 1. CONTRATOS DE COMPONENTES BASE (Fase 4)

### 1.1 `Button.tsx`

- **Props**: `variant` ("primary" | "secondary" | "ghost" | "danger" | "reino"), `size` ("sm" | "md" | "lg"), `fullWidth` (boolean), `children`, `onClick`, `disabled`, `className`.
- **Reglas**: Renderiza `<button>` con `min-h-11` (44px). `type="button"` por defecto.
- **Uso**: Obligatorio para todos los CTAs.

### 1.2 `Card.tsx`

- **Props**: `variant` ("default" | "elevated" | "outlined" | "bare"), `children`, `className`, + `HTMLAttributes<HTMLDivElement>` (acepta `onClick`, `role`, `aria-*`).
- **Reglas**: `bare` no tiene bg/padding/border (solo `rounded-2xl`). El caller inyecta clases vía `className`.
- **Deuda**: `default`/`elevated`/`outlined` usan `bg-slate-800` (heredado Fase 4).

### 1.3 `Modal.tsx`

- **Props**: `open`, `onClose`, `title`, `subtitle`, `children`, `footer`, `disableOverlayClose`, `initialFocusRef`.
- **Reglas**: Único componente autorizado para diálogos. Focus trap, scroll lock, `role="dialog"`, `aria-modal`. Bottom-sheet en móvil.

---

## 2. CONTRATOS DE COMPONENTES FASE 5

### 2.1 `Leccion.tsx` (pantalla)

```typescript
interface LeccionProps {
  leccionId: string; // formato "sendaId:nivelNumber:leccionNumber"
  onContinuar: () => void; // al terminar las 3 preguntas → Cierre
  onVolver: () => void; // botón "←" o abandonar
}
```
