# FUNCIONAL-INTERFACES — Contratos públicos del área Funcional

**Última actualización**: 2026-11-14 (Cierre Fase 5.1).
**Versión de contratos**: v5.2 (desde v4.2).

---

## 🆕 Cambios v4.2 → v5.0 → v5.1 → v5.2

### v5.0 (Sprint A-C, Fase 5)

- **Nuevas tablas Dexie v3**: `progreso_leccion`, `racha_discipulado`, `local_sessions`, `local_players`, `local_rounds`.
- **Nuevo store**: `useDiscipleshipStore` (selectores + acciones + 11 eventos).
- **Nuevo store**: `useMultiplayerStore` (modelo separado).
- **Nuevos tipos**: `EstadoLeccion`, `EstadoNivel`, `EstadoSenda`, `ProgresoLeccion`, `RachaDiscipulado`, `SendaDiscipulado`, `LeccionDiscipulado`, `NivelDiscipulado`, `PreguntaReflexion`, `FeedbackCorrecto`, `LocalSession`, `LocalPlayer`, `LocalRound`, `EstadoPartidaLocal`, `Jugador`, `EstadoPartida`, `ColorToken`.

### v5.1 (Quality Pass — fixes P0)

- **`ResultadoCheck`** incluye `reflexion?` (feedback completo).
- **`ContextoLeccion`** añadido (race condition fix).
- **`responderCheck`** acepta tercer parámetro `contexto?: ContextoLeccion`.

### v5.2 (Fase 5.1 — cierre documental)

- **Dexie**: propiedades de clase en **snake_case** (fix B1: era camelCase, no coincidía con esquema).
- **`responderCheck`** usa `Number(selected)` (defensivo contra strings).
- **Test de integración**: 54 aserciones de contenido real (evangelios).

---

## 📐 Tipos públicos (src/types/)

### `CategoryId` (sin cambios)

```ts
type CategoryId =
  | "evangelios"
  | "personajes"
  | "versiculos"
  | "parabolas"
  | "valores"
  | "genesis"
  | "exodo"
  | "apologetica"
  | "historia-iglesia";
```
