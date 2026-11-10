### 2026-11-10 · H-06: Button y Card base + limpieza SortableList

**H-06 — Extracción de componentes base**

- `Button.tsx`: añadido `min-h-11` (touch target 44px mobile-first) y `type="button"` por defecto para evitar submits accidentales. Sin cambios en variantes ni tamaños.
- `Card.tsx`: añadida variante `variant="bare"` (sin bg/padding/border) para que pantallas con estilo propio la consuman sin alterar su apariencia. Las variantes previas conservan su `bg-slate-800` como deuda heredada.
- `Onboarding.tsx`: contenedor pasa a `<Card variant="bare">`; botón Continuar pasa a `<Button variant="primary" size="md" fullWidth>`. Microcopy, lógica, `onboardingQuestions` y a11y intactos. Botones de opción sin cambios (state-based).
- `Profile.tsx`: `StatCard` y card de rating usan `<Card variant="bare">` con el mismo `className` actual. **Cero cambio visual.** Deuda `RATING_TIERS` sigue pendiente de `getRatingTiers()` (Funcional).
- `Home.tsx` y `Game.tsx`: no requirieron cambios (Home ya consumía `Button`; los botones de Game son especializados).

**Deltas visuales aceptados (Onboarding "Continuar")**

- `text-noche-900` → `text-noche-950` (más contraste).
- Disabled: `bg-slate-500 opacity-70` → primary atenuado (`opacity-50`). Elimina slate heredado.
- Se añade `shadow-lg shadow-alba-500/20`.

**Limpieza**

- `src/components/questions/SortableList.tsx`: eliminado. Confirmado huérfano mediante `findstr` (solo quedaba una mención en un comentario histórico de `TapToPlace.tsx`). Sin tests asociados.

**Métricas finales**

- Tests: **164/164** ✅
- Build time: **967 ms** ✅
- Bundle main (`index-*.js`): **28.59 kB gzip**
- CSS: 10.84 kB → **10.73 kB gzip**
- Precache PWA: 820.93 KiB → **820.13 KiB**
