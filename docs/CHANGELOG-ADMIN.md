# CHANGELOG ADMIN — Mente en el Camino (Selah)

> Documento exclusivo del área Admin. Registra solo cambios, decisiones, handoffs emitidos y pendientes internos.

**Última actualización**: 2026-11-10
**Estado**: Fase 4 Cerrada.

---

## FASE 4 (Cerrada)

### 2026-11-10 — Cierre de Fase 4 y Optimización de Rendimiento

- **T1 (Documentación)**: Creado `docs/CONTENT-WORKFLOW.md` (guía de contenido). Commit `706a298`.
- **T2 (Diagnóstico CWV)**:
  - Lighthouse inicial: Score 96, LCP 2.5s.
  - Identificados 94 KiB de JS sin usar (`react-dom`, `dexie`, `motion`) mediante Treemap.
- **M1 (Code Splitting)**: Aplicado `manualChunks` en `vite.config.ts` separando vendors (react, motion, dexie, zustand). Mejora del cacheo y reducción del hilo principal.
- **M3 (Caché Vercel)**: Creado `vercel.json` con cabeceras `Cache-Control: public, max-age=31536000, immutable` para `/assets/*`.
- **H-FUN-03 (Lazy Load)**: Emitido a Funcional y aplicado. Carga diferida de `data/questions`.
- **T3 (Cierre CWV)**:
  - Bundle inicial: **29.49 kB** (gzip) (¡-84%!).
  - LCP final: **2.0 s** (Verde).
  - Score Lighthouse: 92.
  - Tests: 164/164.
- **PWA Instalación (Fix Android)**:
  - Creado `src/hooks/useInstallPrompt.ts`.
  - Fix aplicado: `beforeinstallprompt` se captura a nivel global (fuera de React) para evitar que Chrome Android lo pierda.
  - Añadidos 4 tests unitarios para la detección de OS (iOS/Android/Standalone).
  - Tests totales del proyecto: **168/168**.

---

## FASE 3 (Cerrada)

### 2026-10-02 — Sesión: Tarea 3 (guía CWV) + Tarea 4 (workflow redactado)

- Tarea 3: Guía CWV entregada. Pendiente muestra de producción.
- Tarea 4: `docs/CONTENT-WORKFLOW.md` redactado.

### 2026-09-25 — Tarea 2 CERRADA: Analytics

- Deps: `@vercel/analytics` + `@vercel/speed-insights`.
- `<Analytics />` y `<SpeedInsights />` en `main.tsx`.
- Doc creado: `docs/ANALYTICS.md`.

### 2026-09-24 — Tarea 1 CERRADA: PWA + rebrand Selah

- `vite.config.ts`: configurado `VitePWA`.
- Generados 4 íconos en `public/`.
