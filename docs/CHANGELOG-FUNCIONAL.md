---

## 📄 Documento 3: `docs/CHANGELOG-FUNCIONAL.md`

```markdown
# CHANGELOG FUNCIONAL — Mente en el Camino (Selah)

**Última actualización**: 2026-11-14 (Cierre Fase 5.1).
**Estado del área**: ✅ 212 tests, Discipulado funcional, Multijugador Local, Dexie v3, Race Condition resuelto.

---

## 📅 HISTORIAL FUNCIONAL

### 2026-11-14 · Fase 5.1 · CIERRE DOCUMENTAL

- Sincronización de los 3 documentos (`CONTEXT-FUNCTIONAL.md`, `FUNCIONAL-INTERFACES.md`, `CHANGELOG-FUNCIONAL.md`) para el arranque de la Fase 6.
- **212/212 tests verdes**.
- **Bundle: 33.68 kB gzip** (`index-DnYJSvfY.js`).
- Cierre formal de Fase 5.1 (Quality Pass post-feedback).

---

### 2026-11-13 · Fase 5.1 · Fix P0 Dexie snake_case

**Síntoma:** `TypeError: Cannot read properties of undefined (reading 'put')` al iniciar lección en localhost.

**Causa raíz:** Desajuste de nombres entre esquema Dexie (`progreso_leccion`, snake_case) y propiedades de la clase `MenteEnElCaminoDB` (`progresoLeccion`, camelCase). Al ser `undefined`, `put()` explotaba.

**Fix aplicado (6 archivos):**

- `src/db/database.ts`: propiedades de clase renombradas a snake_case.
- `src/store/useDiscipleshipStore.ts`: `db.progreso_leccion` y `db.racha_discipulado`.
- `src/store/useMultiplayerStore.ts`: `db.local_sessions`, `db.local_players`, `db.local_rounds`.
- 3 archivos de test actualizados (mocks con nombres reales).

**Verificación:** 212/212 tests verdes. Build 0 errores. Bundle 33.68 kB gzip.

**Aprendizaje:** Los mocks de test no detectaron este bug porque mockeaban `db.progresoLeccion` (camelCase), validando el mock en lugar de la realidad. **Deuda:** los mocks deben reflejar el esquema real de Dexie.

---

### 2026-11-13 · Fase 5.1 · Fix P0 Race Condition

**Síntoma:** Usuario responde correctamente → app muestra "Casi." (falso negativo).

**Causa raíz:** Race condition entre el `useEffect` async de `iniciarLeccion` y el `onClick` sync del botón "Responder". `leccionActiva` puede ser `null` → guard devuelve `{correcto: false, feedback: "", referencia: ""}`.

**Fix aplicado:**

- **Nuevo tipo `ContextoLeccion`** (`{ sendaId, nivelNumber, leccionNumber }`).
- **`responderCheck(preguntaIdx, selected, contexto?)`** ahora acepta contexto explícito.
- **Fallback a `leccionActiva`** para compatibilidad con tests y código previo.
- **`ResultadoCheck.reflexion`** añadido (feedback incompleto del store).

**Cambio en Visual (4 líneas en `Leccion.tsx`):**

```typescript
const r = responderCheck(preguntaIdx, opcionIdx, {
  sendaId,
  nivelNumber: n,
  leccionNumber: l,
});
```
