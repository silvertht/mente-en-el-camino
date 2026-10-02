# CHANGELOG-VISUAL — Área Visual · Mente en el Camino (Selah)

**Área**: Visual
**Fase**: 2 (en curso)
**Última actualización**: 2026-10-01
**Estado del área**: ✅ Limpia. Sin pendientes activos hasta Test #2.

> ⚠️ **IMPORTANTE**: Este documento es **exclusivo del área Visual**.
> El CHANGELOG general del proyecto es `docs/CHANGELOG.md` y contiene
> los cambios de las 4 áreas (Funcional, Visual, UX, Admin).
> Aquí solo se registra lo que Visual cambió, propone o requiere de
> otras áreas.

---

## 📊 ESTADO DEL ÁREA VISUAL

| Aspecto                                 | Estado       |
| --------------------------------------- | ------------ |
| Handoffs PWA (Admin → Visual)           | ✅ Cerrados  |
| Handoff TapToPlace (UX → Visual)        | ✅ Cerrado   |
| Fix paleta `Button.tsx`                 | ✅ Cerrado   |
| Handoff género TapToPlace (UX → Visual) | ✅ Cerrado   |
| Pendientes activos Visual               | 🟢 Ninguno   |
| Bloqueado por                           | Test #2 (UX) |

**Métricas del área**:
| Métrica | Valor |
|---|---|
| Tests unitarios | 66/66 ✅ |
| Build time | ~1 s |
| Bundle gzip | 180.98 kB |
| Precache PWA | 15 entries · 804.10 KB |
| Favicon | ✅ llama Selah |
| Archivos nuevos en Fase 2 | 1 (`TapToPlace.tsx`) |
| Archivos modificados en Fase 2 | 6 |
| Archivos eliminados en Fase 2 | 1 (`icons.svg`) |
| Archivos marcados @deprecated | 1 (`SortableList.tsx`) |

---

## 📅 HISTORIAL — VISUAL · FASE 2

### 2026-09-24 · Handoffs PWA (Admin → Visual)

**Origen**: Admin cerró la PWA en Fase 2 y dejó 4 handoffs. Los #1, #3, #4
son territorio Visual. El #2 (textos "Mente en el Camino" → "Selah") es UX.

#### Handoff 1 — `index.html` ✅

**Archivo**: `index.html`
**Cambios**:

- `lang="en"` → `lang="es"`.
- `<title>` → `Selah — Trivia Bíblica` (alineado con `manifest.name`).
- Añadido `<meta name="description">` con slogan.
- Añadido `<meta name="theme-color" content="#F5B544">` (idéntico al
  `theme_color` del manifest).
- Añadido `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`.
- Añadidas metas iOS: `apple-mobile-web-app-capable`,
  `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`.
- `viewport-fit=cover` añadido (safe-area-inset para notch/isla).

**NO se añadió** `<link rel="manifest">` (lo inyecta `vite-plugin-pwa`).

**Commit**: `[VISUAL] Handoff 1 PWA — index.html con marca Selah, theme-color y metas iOS`

**Verificado**: pestaña del navegador muestra "Selah — Trivia Bíblica".
Manifest carga con `theme_color #F5B544`, `background_color #0B0F1A`,
`orientation portrait`, `display standalone`.

---

#### Handoff 3 — `public/favicon.svg` ✅

**Archivo**: `public/favicon.svg`
**Antes**: rayo morado de Vite (default de plantilla).
**Ahora**: llama teardrop rediseñada.

**Cambios visuales**:

- Gradiente vertical `alba-400 (#FFD166)` → `alba-500 (#F5B544)` →
  `fuego-500 (#F97316)`.
- Núcleo interior (gota alargada) con gradiente alba claro
  (`#FFE08A` → `#F5B544`).
- Glow radial cálido detrás de la llama (`fuego-500` al 65% opacidad).
- Fondo rounded square `rx=14` con gradiente `#151129` → `#060912`.
- Diseño alineado 1:1 con los íconos PWA de Admin (`pwa-192x192.png`,
  `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon.png`).
- Peso: ~700 bytes. Sin filtros, sin librerías.

**Commit**: `[VISUAL] Handoff 3 PWA — favicon.svg rediseñado como llama Selah (alba→fuego)`

**Verificado**: abriendo `/favicon.svg` en navegador, comparado 1:1 con
los PNG de Admin.

---

#### Handoff 4 — `public/icons.svg` eliminado ✅

**Archivo**: `public/icons.svg`
**Verificaciones antes de eliminar**:

- Runtime: DevTools → Network con filtro `icons.svg` → **0/8 requests**.
- Código: búsqueda global en VS Code (Ctrl+Shift+F) → 9 resultados,
  todos en documentación (`CHANGELOG.md`, `CONTEXT-VISUAL.md`,
  `PROJECT.md`), ninguno en `.tsx`, `.ts`, `.html` o `.css`.

**Resultado**: archivo confirmado huérfano. Eliminado sin romper build
ni runtime.

**Impacto**: precache PWA bajó 16 → 15 entries · 815 → 799 KB.

**Commit**: `[VISUAL] Handoff 4 PWA — eliminar public/icons.svg (placeholder sin uso)`

---

### 2026-09-25 · Handoff TapToPlace (UX → Visual)

**Origen**: UX detectó que el drag & drop (`SortableList.tsx` con Motion
Reorder) tiene lag táctil en móvil y incumple WCAG 2.2 AA · 2.5.7
(Dragging Movements). Solicitó reemplazarlo por tap-to-place tipo
Duolingo/Kahoot.

#### Creado — `src/components/questions/TapToPlace.tsx` ✅

**Componente nuevo** (~200 líneas). Autocontenido, sin lógica de negocio.

**Contrato**:

```tsx
interface TapToPlaceProps {
  items: string[]; // ya desordenados por el padre
  onAnswer: (order: number[]) => void; // índices sobre `items`
  hint: string; // aria-describedby
  submitLabel: string; // texto del botón confirmar
  title?: string; // título opcional (h2)
  itemGender?: "f" | "m"; // concordancia gramatical (default "f")
  disabled?: boolean;
}
```
