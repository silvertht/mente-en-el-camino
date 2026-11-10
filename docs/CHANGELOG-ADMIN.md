### 2026-11-10 — Fase 4: T1, M1, M3 y T3 CERRADOS (Ejecución)

- **T1**: `CONTENT-WORKFLOW.md` commiteado (`706a298`).
- **M1 (manualChunks)**: APLICADO. Vendor split (react, motion, dexie, zustand) en `vite.config.ts`.
- **M3 (vercel.json)**: APLICADO. Cache immutable para `/assets/*`.
- **M2 (Fuentes)**: DESCARTADO. La app usa system fonts (no hay `@font-face`).
- **Lighthouse "Después" (M1+M3)**:
  - Score: 95/100 (variación normal).
  - JS sin usar: **94 KiB -> 59 KiB** (¡-37%!).
  - CLS: 0. FCP: 1.0s. LCP: 2.7s (fluctuación por múltiples requests locales).
- **H-FUN-03**: Emitido a Funcional con alcance reducido (lazy load de `data/questions`, NO de dexie).
- **T3**: CERRADO formalmente. 164/164 tests + Build limpio + M1/M3 aplicados + Lighthouse reportado.
