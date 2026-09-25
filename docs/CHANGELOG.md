# CHANGELOG — Mente en el Camino (Selah)

Registro cronológico de cambios por área (Funcional, Visual, UX, Admin).
Formato: `[ÁREA] Descripción · Estado`.

**Última actualización**: 2026-09-25 · Fase 2 · Visual cerró handoff género TapToPlace.
**Estado del proyecto**: PWA instalable + métricas activas. Fase 2 en curso.

---

## 📊 ESTADO GLOBAL ACTUAL

| Área          | Estado                     | Pendiente real                                 |
| ------------- | -------------------------- | ---------------------------------------------- |
| **Funcional** | ✅ Fase 1 cerrada          | Ampliar banco 70 → 100+ (post Test #2)         |
| **Visual**    | ✅ Fase 2 limpia           | Bloqueado hasta Test #2                        |
| **UX**        | ✅ Handoffs 1 y 2 cerrados | Test #2 con los 5 jóvenes                      |
| **Admin**     | ⏳ Tarea 3 esperando datos | Core Web Vitals (24-48h) · Supabase (Fase 2.5) |

**Métricas**:

| Métrica            | Valor                  |
| ------------------ | ---------------------- |
| Preguntas en banco | 70                     |
| Categorías activas | 5 (de 9)               |
| Tipos de pregunta  | 7/7                    |
| Tests unitarios    | 66/66                  |
| Bundle gzip        | 180.87 kB              |
| Precache PWA       | 15 entries · 803.84 KB |
| PWA installable    | ✅ Chrome              |
| Web Analytics      | ✅ Funcionando         |
| Speed Insights     | ⏳ Recolectando        |
| Insignias          | 19                     |
| Principios del día | 31                     |

---

## 2026-09-25 — FASE 2 · Visual · Handoff género TapToPlace CERRADO

### [VISUAL] Concordancia de género en TapToPlace (handoff UX)

**Origen**: Al adaptar Timeline ("palabra" → "evento") se detectó que
`TapToPlace.tsx` usaba pronombres femeninos fijos en `aria-label` y
`aria-live`. Correcto para `verse-scramble` (palabras), incorrecto para
`timeline` (eventos).

**Solución implementada**:

- Nueva prop opcional `itemGender?: "f" | "m"` con default `"f"`
  (retrocompatible con `verse-scramble`).
- Objeto `pron` interno resuelve las 4 variantes:
  - `colocada` / `colocado`
  - `devuelta` / `devuelto`
  - `colocarla` / `colocarlo`
  - `devolverla` / `devolverlo`
- `TimelineQuestion.tsx` pasa `itemGender="m"`.
- Aprovechado el cambio para adaptar el hint de Timeline:
  "Toca un evento y colócalo en su orden. Toca de nuevo para devolverlo."
  (cierra Pendiente #10).

**Archivos modificados**:

- `src/components/questions/TapToPlace.tsx`
- `src/components/questions/TimelineQuestion.tsx`

**Archivos sin cambios**:

- `src/components/questions/VerseScrambleQuestion.tsx` (usa default "f").

**Accesibilidad**:

- Lector de pantalla anuncia concordancia correcta en ambos tipos.
- Sin cambios en comportamiento táctil/teclado.
- Sin cambios en paleta, animaciones o bundle.

**Verificación**:
| Métrica | Valor |
|---|---|
| `npm run build` | ✅ limpio |
| Tests unitarios | ✅ 66/66 |
| Lector de pantalla en Timeline | ✅ verificado en local |
| Lector de pantalla en Verse-scramble | ✅ verificado en local |

**Commit en `main`**:

- `[VISUAL] Handoff UX — Concordancia de género en TapToPlace (itemGender prop)`

**Estado del área Visual**: ✅ Sin pendientes activos. Bloqueado hasta Test #2.

---

## 2026-09-25 — FASE 2 · UX → VISUAL · Handoff género en TapToPlace

### [UX→VISUAL] Pronombres de género hardcodeados en TapToPlace

**Estado**: ✅ Cerrado por Visual (ver entrada "2026-09-25 · Visual · Handoff género TapToPlace CERRADO" arriba).

**Origen**: Al adaptar Timeline ("palabra" → "evento") se detectó que
`TapToPlace.tsx` usa pronombres femeninos fijos en `aria-label` y `aria-live`.
Correcto para verse-scramble, incorrecto para timeline.

**Impacto**: Usuarios con lector de pantalla en Timeline escuchan
concordancia incorrecta ("Diluvio colocada en posición 1").

**Archivos afectados** (Visual):

- `src/components/questions/TapToPlace.tsx` → añadir prop opcional
  `itemGender?: "f" | "m"` (default `"f"`). Ajustar 4 strings:
  - `aria-label` slot: "Activa para devolver**la** al banco."
  - `aria-label` banco: "Activa para colocar**la** en el siguiente espacio..."
  - `aria-live` colocar: "... **colocada** en posición N..."
  - `aria-live` devolver: "... **devuelta** al banco."
- `src/components/questions/TimelineQuestion.tsx` → pasar `itemGender="m"`.

**Propuesta de solución**:

```tsx
interface TapToPlaceProps {
  // ... resto igual
  /**
   * Género gramatical de los ítems, para concordancia de pronombres
   * en aria-labels y aria-live. Default: "f" (compat con verse-scramble).
   */
  itemGender?: "f" | "m";
}
```
