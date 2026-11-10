### 2026-11-10 · Fase 4 · Fix Exploit de Abandono (Test #2)

**Objetivo**: Cerrar un bug crítico de diseño donde el XP, ELO y las respuestas se guardaban en Dexie inmediatamente después de responder, incluso si el usuario abandonaba la partida. Esto permitía inflar estadísticas saliendo y entrando.

**Solución implementada**:

- **`src/store/useGameStore.ts`**:
  - `answerQuestion`: Ahora es una función 100% efímera. Solo calcula los puntos y actualiza el estado local de la partida (`game`). Ya NO escribe en Dexie, NO toca el perfil global (`profile.xp`) ni el rating (`userRating`).
  - `finishGame`: Ahora es el ÚNICO punto de persistencia. Al completar la última pregunta, guarda en lote todas las respuestas (`saveAnswers`), procesa todo el ELO acumulado de la partida (`saveUserRating`), y aplica el XP final y las insignias (`saveProfile`).
- **`src/store/useGameStore.antiExploit.test.ts`** (Nuevo): Añadidos 2 tests que garantizan que abandonar una partida no toca la base de datos, pero terminarla sí lo hace.

**Verificación**:

- `npx vitest run` → **166/166** ✅ (se sumaron los 2 tests del exploit).
- `npm run build` → limpio ✅.
- Prueba manual: Abandonar partida verificando en pestaña Application que XP y ELO no han cambiado.

**Commits**:

- `feat(funcional): añadir 10 preguntas al banco (Fase 4 - Sesión 1)`
- `fix(funcional): evitar guardado de ELO/XP al abandonar partida (Test #2)`

**PUSH AUTORIZADO** por el Maestro.
