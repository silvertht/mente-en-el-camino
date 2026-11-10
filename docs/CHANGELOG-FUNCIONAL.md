### 2026-11-10 · Fase 4 · Ampliación del banco (Sesión 2) — 80 → 90 preguntas

**Objetivo**: Añadir 10 preguntas nuevas, balanceando las categorías con menos contenido.

**Preguntas añadidas**:

- `gen-004`: Génesis · MC · Fácil (La serpiente en el Edén)
- `gen-005`: Génesis · Fill-blank · Medio (Creación a imagen de Dios)
- `gen-006`: Génesis · Timeline · Difícil (Creación → Diluvio → Babel → Abraham)
- `exo-004`: Éxodo · MC · Fácil (La vara de Moisés)
- `exo-005`: Éxodo · Who-said-it · Medio (Faraón: "¿Quién es Jehová?")
- `exo-006`: Éxodo · MC · Difícil (Los 40 años en el desierto)
- `apo-003`: Apologética · MC · Fácil (Duda de Tomás)
- `apo-004`: Apologética · TF · Fácil (Fe basada en hechos históricos)
- `his-003`: Historia · MC · Fácil (Pedro en Pentecostés)
- `his-004`: Historia · TF · Medio (Pablo y las epístolas)

**Cambios estructurales**:

- Actualizado: `index.ts` (nuevos conteos estáticos: 90 preguntas en total).
- Actualizado: `index.test.ts` (espera 90 preguntas, valida los nuevos conteos de las categorías).

**Verificación**:

- `npx vitest run` → [PENDIENTE]
- `npm run build` → [PENDIENTE]

**Commit**: `feat(funcional): añadir 10 preguntas al banco (Fase 4 - Sesión 2)`.
**Sin push a main**.
