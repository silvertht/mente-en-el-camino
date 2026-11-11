# FUNCIONAL-INTERFACES — Contratos públicos del área Funcional

**Última actualización**: 2026-11-10 (Cierre Fase 4).
**Versión de contratos**: v4.2 (desde v4.1).

---

## 🆕 Cambios v4.1 → v4.2 (Fase 4)

- **Nuevas categorías**: 4 categorías añadidas (Génesis, Éxodo, Apologética, Historia). El banco total es de 110 preguntas.
- **Lazy Load**: El banco de preguntas ya no se carga en el bundle inicial. Se usa `loadQuestionBank()`.
- **Nuevo estado y acción**: `isLoadingQuestions` y `loadAndStartGame()`.
- **Anti-Exploit**: `answerQuestion` ya no persiste en Dexie. `finishGame` centraliza la persistencia.

---

## 📐 Tipos públicos (src/types/index.ts)

### `CategoryId`

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
