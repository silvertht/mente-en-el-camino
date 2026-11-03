# FUNCIONAL-INTERFACES — Contratos públicos del área Funcional

> Documento que describe **todos los contratos públicos** que Funcional
> expone a las otras áreas (Visual, UX, Admin, chat maestro).
>
> Paralelo conceptual a `ADMIN-INTERFACES.md`.
>
> **Regla**: este documento se actualiza cuando cambia un contrato. Si
> Funcional cambia la firma de una función, un tipo, o un campo de estado
> consumido por otra área, **este documento lo refleja antes del commit**.

**Última actualización**: 2026-10-02 (Fase 3 · R3 cerrado).
**Versión de contratos**: v3.

---

## 🎯 Propósito

Servir como **referencia única** para que Visual, UX y Admin sepan:

1. Qué tipos existen y cómo usarlos.
2. Qué funciones del store pueden consumir.
3. Qué funciones de DB pueden invocar.
4. Qué utilidades de scoring y rating están disponibles.
5. Qué datos estáticos existen (categorías, insignias, principios).
6. Qué cambió entre versiones de contratos.

**Sin este documento**, un área puede consumir un contrato que cambió y
romper sin aviso. **Con este documento**, los cambios son visibles y
negociables antes del commit.

---

## 📐 Tipos públicos

Todos los tipos exportados desde `src/types/index.ts`. Cualquier área
puede importarlos con `import type { X } from "../types"`.

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
