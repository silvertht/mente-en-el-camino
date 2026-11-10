### 2026-11-10 — Visual · H-06 y SortableList CERRADOS

- **H-06 CERRADO**: Refactorización de Button (min-h-11, type="button",
  estado disabled con opacity en vez de slate) y Card (variante bare).
  Reutilización de componentes existentes (sin ui/ paralela).
- **SortableList ELIMINADO**: Verificado sin imports activos (solo un
  comentario en TapToPlace.tsx). Archivo borrado.
- **Refactor aplicado**: Onboarding.tsx y Profile.tsx ahora consumen los
  componentes base. A11y intacta.
- **Métricas**: 164/164 tests · build limpio · bundle 28.59 kB gzip.
- **Push autorizado**.
- **Siguiente**: Funcional arranca la ampliación del banco (70 → 110+).
  PO en paralelo ejecutando Test #2.
