---

### 3. `docs/CHANGELOG-FUNCIONAL.md` (REEMPLAZAR COMPLETO)

```markdown
# CHANGELOG FUNCIONAL — Mente en el Camino (Selah)

**Última actualización**: 2026-11-10 (Cierre Fase 4).
**Estado del área**: ✅ 110 preguntas, 175/175 tests, ELO protegido, Anti-Exploit.

---

## 📅 HISTORIAL FUNCIONAL

### 2026-11-10 · Fase 4 · CIERRE DOCUMENTAL

- Sincronización de los 3 documentos para el arranque de la Fase 5.
- 175/175 tests verdes.

### 2026-11-10 · Fase 4 · Sesión 4 (Banco 110) + Fix Timeline

- Banco ampliado a 110 preguntas (Génesis, Éxodo, Apologética e Historia llegan a 10 cada una).
- **Fix Timeline**: Se eliminaron pistas de orden ("Día 1", "Día 6") en `gen-006` y `ev-013`.
- **Reglas pedagógicas aplicadas**: Cero pistas en enunciados, explicaciones con el "por qué", reflexiones aplicables.

### 2026-11-10 · Fase 4 · Fix Exploit (Test #2)

- **Bug crítico**: El XP y el ELO se guardaban al responder (permitía inflar estadísticas abandonando).
- **Solución**: `answerQuestion` se volvió efímero. La persistencia se centralizó en `finishGame`.
- Añadidos tests de anti-exploit (`useGameStore.antiExploit.test.ts`).

### 2026-11-10 · Fase 4 · Sesión 3 (Banco 100)

- Banco ampliado a 100 preguntas.

### 2026-11-10 · Fase 4 · Sesión 2 (Banco 90)

- Banco ampliado a 90 preguntas.

### 2026-11-10 · Fase 4 · Sesión 1 (Banco 80)

- Banco ampliado a 80 preguntas.
- Activación de las 4 categorías inactivas.
- Lazy Load adaptado a 9 categorías.

### 2026-11-10 · Fase 4 · H-FUN-03 (Lazy Load)

- Implementación de `loadQuestionBank()`.
- El bundle principal bajó de 184 kB a 29 kB (gzip).
- Se eliminó el delay artificial de 400ms en `loadAndStartGame`.

### 2026-11-04 · Fase 4 · H-04/H-05 + B1 (Onboarding)

- 3 preguntas de onboarding creadas.
- `completeOnboarding` implementado (atómico).
- **Fix B1**: Protección de usuarios preexistentes (`hasCompletedOnboarding` auto-migra si `answeredCount > 0`).

### 2026-10-02 · Fase 3 · R1-R3 (Rating ELO)

- Implementación del sistema ELO con `MAX_STRETCH = 400`.
- Persistencia de la tabla `userRating` en Dexie v2.

_(Historial anterior de Fase 1 y 2 se mantiene igual)_
