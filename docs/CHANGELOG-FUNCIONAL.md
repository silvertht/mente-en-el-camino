### 2026-11-10 · Fase 4 · Ampliación del banco (Sesión 4 - FINAL) — 100 → 110 preguntas

**Objetivo**: Añadir las últimas 10 preguntas de la Fase 4, consolidando el banco en 110 preguntas y balanceando las 4 categorías nuevas.

**Preguntas añadidas**:

- `gen-009`: Génesis · MC · Fácil (El descanso en el séptimo día).
- `gen-010`: Génesis · Fill-blank · Medio (Rebeca, esposa de Isaac).
- `exo-009`: Éxodo · TF · Fácil (El cruce del Mar Rojo).
- `exo-010`: Éxodo · Who-said-it · Difícil (Moisés golpeando la peña).
- `apo-008`: Apologética · MC · Fácil (David, autor de los Salmos).
- `apo-009`: Apologética · Fill-blank · Medio (Defensa con mansedumbre).
- `apo-010`: Apologética · Timeline · Difícil (Cronología de la iglesia primitiva).
- `his-008`: Historia · TF · Fácil (La imprenta de Gutenberg).
- `his-009`: Historia · MC · Fácil (El Edicto de Milán y Constantino).
- `his-010`: Historia · MC · Medio (San Agustín de Hipona).

**Reglas pedagógicas aplicadas (Sesión 3 y 4)**:

- Cero pistas en enunciados de Timeline (eliminados los "Día 1", "Día 6").
- Explicaciones centradas en el "por qué" teológico/histórico.
- Reflexiones prácticas para la vida del joven.

**Cambios estructurales**:

- Actualizado: `index.ts` (conteo estático: 110 preguntas, 10 en cada una de las 4 nuevas categorías).
- Actualizado: `index.test.ts` (espera 110 preguntas; test de apologética ajustado a 7 tras el filtro del ELO).

**Verificación**:

- `npx vitest run` → **175/175** ✅ (incluye el bloque `getQuestionById` restaurado).
- `npm run build` → limpio ✅.

**Commit**: `feat(funcional): añadir 10 preguntas finales al banco (Fase 4 - Sesión 4)`.
**Sin push a main**.
