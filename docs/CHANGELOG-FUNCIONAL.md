### 2026-11-10 · Fase 4 · Fix Timeline + Ampliación Sesión 3 (100 preguntas)

**Tarea 1 — Fix Bug Pedagógico (`gen-006` + `ev-013`)**:

- El PO detectó que los eventos del timeline incluían "Día 1", "Día 6", lo que hacía la pregunta trivial.
- Se reescribieron las opciones para eliminar cualquier pista de orden. Ahora el jugador debe razonar el orden bíblico, no leer los números.
- Aplicado a `gen-006` y `ev-013` (que tenía el mismo problema).

**Tarea 2 — Nuevas Reglas Pedagógicas aplicadas**:

- Distractores plausibles (no rellenos obvios).
- Explicaciones con el "por qué" teológico/histórico.
- Reflexiones que conectan con la vida del joven.

**Tarea 3 — Ampliación (90 → 100 preguntas)**:

- `gen-007`: MC · Fácil (La escalera de Jacob).
- `gen-008`: Timeline · Difícil (La vida de José).
- `exo-007`: MC · Fácil (El becerro de oro).
- `exo-008`: TF · Medio (Los Diez Mandamientos).
- `apo-005`: MC · Fácil (Unidad de la Biblia).
- `apo-006`: Fill-blank · Medio (Romanos 1:20).
- `apo-007`: Timeline · Difícil (Los 4 imperios de Daniel).
- `his-005`: MC · Fácil (Martirio de Pedro).
- `his-006`: TF · Fácil (Concilio de Nicea).
- `his-007`: Who-said-it · Medio (Lutero en Worms).

**Verificación esperada**:

- `npx vitest run` → **174/174** (se actualizó el test de conteo a 100 y el test de apologetica a 5).
- `npm run build` → limpio (bundle principal sigue en ~29 kB).

**Commits**:

- `fix(funcional): corregir opciones en pregunta de timeline (gen-006)`
- `feat(funcional): añadir 10 preguntas de calidad (Fase 4 - Sesión 3)`
  **Sin push a main**.
