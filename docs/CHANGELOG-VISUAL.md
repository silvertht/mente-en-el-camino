# CHANGELOG-VISUAL — Área Visual · Mente en el Camino (Selah)

**Área**: Visual
**Fase**: 3 (en curso)
**Última actualización**: 2026-10-02
**Estado del área**: ✅ Limpia. Sin pendientes activos hasta Test #2.

> ⚠️ **IMPORTANTE**: Este documento es **exclusivo del área Visual**.
> El CHANGELOG general del proyecto es `docs/CHANGELOG.md` y contiene los cambios de las 4 áreas (Funcional, Visual, UX, Admin).
> Aquí solo se registra lo que Visual cambió, propuso o requiere.

---

## 📊 ESTADO DEL ÁREA VISUAL

| Aspecto                                 | Estado       |
| :-------------------------------------- | :----------- |
| Handoffs PWA (Admin → Visual)           | ✅ Cerrados  |
| Handoff TapToPlace (UX → Visual)        | ✅ Cerrado   |
| Fix paleta `Button.tsx`                 | ✅ Cerrado   |
| Handoff género TapToPlace (UX → Visual) | ✅ Cerrado   |
| Handoff rating ELO (Funcional → Visual) | ✅ Cerrado   |
| Pendientes activos Visual               | 🟢 Ninguno   |
| Bloqueado por                           | Test #2 (UX) |

**Métricas del área**:
| Métrica | Valor |
| :--- | :--- |
| Tests unitarios | 127/127 ✅ |
| Build time | ~1.80 s |
| Bundle gzip | 182.12 kB |
| Precache PWA | 15 entries · 808.71 KiB |
| Favicon | ✅ llama Selah |
| Archivos nuevos (Fase 2/3) | 1 (`TapToPlace.tsx`) |
| Archivos eliminados | 1 (`icons.svg`) |
| Archivos @deprecated | 1 (`SortableList.tsx`) |

---

## 📅 HISTORIAL — VISUAL · FASE 3

### 2026-10-02 · Handoff Funcional → Visual: rating ELO en Profile

**Origen**: Funcional implementó un sistema de rating ELO-like (`src/utils/rating.ts`). Solicitó exponer el valor en `src/screens/Profile.tsx` para que el usuario vea su nivel de experiencia.

**Implementación**:

- Creada una nueva card visual "Experiencia" en `Profile.tsx` (posicionada entre los StatCards superiores y la Vitrina de medallas).
- **Contenido**:
  - Icono: 📈
  - Número: Rating actual (con animación `useCountUp`).
  - Etiqueta: Rango actual (ej. "Explorador") usando `getRatingLabel()`.
  - Barra de progreso: Muestra el avance dentro del tier actual (animada con `scaleX` vía Motion).
- **Accesibilidad (A11y)**:
  - Envoltorio: `role="group"` con `aria-label="Tu nivel de experiencia: [rating] puntos, [label]"`.
  - Barra: `role="progressbar"` con `aria-valuenow`, `aria-valuemin`, `aria-valuemax` y `aria-valuetext`.
- **Estilo**: Paleta Noche y Alba (`alba-400` para el número, `reino-400` para el label, gradiente `alba-500` a `fuego-500` para la barra). Sin `backdrop-blur`.
- **Manejo de estado**: Fallback a `RATING_INITIAL` (1200) si `userRating` es undefined.

**Incidente Técnico (Git) resuelto**:

- Durante el push, el usuario experimentó una corrupción del repositorio Git local (`refs/remotes/origin/HEAD` y `refs/heads/main` rotos).
- Se diagnosticó que los archivos y el commit del rating ya estaban seguros en `origin/main`.
- Se resolvió renombrando `.git` a `.git.old` y regenerando el repositorio con `git init` y `git fetch origin`. No hubo pérdida de archivos.

**Métricas post-handoff**:

- Bundle gzip: 180.98 kB → **182.12 kB** (+1.14 kB).
- Precache PWA: 15 entries · 804.10 KiB → **808.71 KiB**.
- Tests: **127/127**.

---

## 📅 HISTORIAL — VISUAL · FASE 2

### 2026-09-25 · Handoff género TapToPlace

- Nueva prop `itemGender?: "f" | "m"` en TapToPlace (default "f").
- `TimelineQuestion` pasa `"m"`. `VerseScrambleQuestion` usa default.
- Bundle gzip: 179.39 kB → 180.98 kB.

### 2026-09-25 · TapToPlace + fix Button

- `TapToPlace.tsx` nuevo (~200 líneas). Reemplaza drag & drop por lag táctil y WCAG 2.2 AA.
- `SortableList.tsx` marcado `@deprecated`.
- `Button.tsx`: Paleta prohibida (`amber`, `slate`, `red`) reemplazada por permitida + variante `reino`.
- Bundle gzip: 181.65 kB → 179.39 kB (−2.26 kB).

### 2026-09-24 · Handoffs PWA

- `index.html`: título Selah, theme-color #F5B544, metas iOS, `viewport-fit=cover`.
- `favicon.svg`: llama teardrop con gradiente alba→fuego.
- `icons.svg`: eliminado (huérfano).
