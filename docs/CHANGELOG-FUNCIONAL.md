### 2026-11-10 · Fase 4 · Ampliación del banco (Sesión 1) — 70 → 80 preguntas

**Objetivo**: Añadir 10 preguntas nuevas de alta calidad, activando las categorías inactivas.

**Preguntas añadidas**:

- `gen-001`: Génesis · MC · Fácil (Caín y Abel)
- `gen-002`: Génesis · TF · Medio (Torre de Babel)
- `gen-003`: Génesis · Fill-blank · Difícil (Abraham e Isaac)
- `exo-001`: Éxodo · MC · Fácil (Décima plaga)
- `exo-002`: Éxodo · TF · Fácil (El maná y el reposo)
- `exo-003`: Éxodo · Who-said-it · Medio (Moisés en el Mar Rojo)
- `apo-001`: Apologética · MC · Medio (Primer testigo de la resurrección)
- `apo-002`: Apologética · Fill-blank · Difícil (1 Pedro 3:15)
- `his-001`: Historia · MC · Fácil (Martín Lutero)
- `his-002`: Historia · TF · Fácil (Cristianos en Antioquía)

**Cambios estructurales**:

- Creados: `genesis.ts`, `exodo.ts`, `apologetica.ts`, `historia-iglesia.ts`.
- Actualizado: `index.ts` (dynamic imports para 9 categorías, nuevos conteos estáticos, `loadQuestionBank`).
- Actualizado: `index.test.ts` (espera 80 preguntas, valida nuevas categorías).

**Verificación**:

- `npx vitest run` → [PENDIENTE]
- `npm run build` → [PENDIENTE]

**Commit**: `feat(funcional): añadir 10 preguntas al banco (Fase 4 - Sesión 1)`.
**Sin push a main**.
