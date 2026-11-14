---

## 📄 3. `docs/CHANGELOG-ADMIN.md` — reemplazo completo

```markdown
# CHANGELOG ADMIN — Mente en el Camino (Selah)

> Documento exclusivo del área Admin. Registra solo cambios, decisiones, handoffs emitidos y pendientes internos.

**Última actualización**: 2026-11-12
**Estado**: Fase 5 CERRADA. H-ADM-01 en producción (`df05116`).

---

## DEUDA TÉCNICA DIFERIDA

Registro vivo. Se revisa al inicio de cada fase.

| Ítem                                                | Prioridad | Nota                                                                                                                                                                             | Candidato  |
| :-------------------------------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `sourcemap: true` en producción                     | Baja      | Expone código fuente vía `.map` públicos. Considerar `"hidden"` o `false`. No afecta bundle gzip ni CWV.                                                                         | Fase 6     |
| Precache 876.05 KiB / 32 entries                    | Media     | Alto para datos móviles en primera instalación de SW. **H-ADM-01d** mueve 8 chunks de contenido a runtime SWR para reducirlo. No afecta LCP (precache es background post-paint). | Fase 6     |
| `npm audit`: 24 vulns (3 low, 17 moderate, 4 high)  | Baja      | Pre-existentes; `npm install` reporta "up to date". Revisar `npm audit --json` y aplicar `npm audit fix` solo si no rompe build/tests.                                           | Fase 6     |
| `SOURCEMAP_BROKEN` (tailwind en build)              | Baja      | WARN pre-existente. No causado por H-ADM-01. No bloquea.                                                                                                                         | Sin acción |
| `inlineDynamicImports` deprecated (vite-plugin-pwa) | Baja      | WARN cosmético. Esperar update upstream.                                                                                                                                         | Sin acción |
| Mensaje commit `df05116` malformado                 | Cosmético | Empieza con `"` y sin cuerpo (cmd Windows `-m` multilínea). Sin impacto funcional. No se corrige (historia pusheada).                                                            | Sin acción |

---

## FASE 5 (Cerrada)

### 2026-11-12 — H-ADM-01: Estrategia de caché PWA para Discipulado

- **Migración `generateSW` → `injectManifest`**: creado `src/sw.ts` custom con `precacheAndRoute`, `cleanupOutdatedCaches`, `NavigationRoute` (SPA fallback) y `StaleWhileRevalidate` para `evangelios-*`.
- **Fix crítico de seguridad de datos**: `registerType` cambiado de `"autoUpdate"` a `"prompt"`. Eliminados `skipWaiting: true` y `clientsClaim: true` de HEAD `af7ad91`. Motivo: `autoUpdate` podía recargar mid-lección → violación directa de "nunca borrar progreso local sin aviso".
- **Precache**: 32 entries, 876.05 KiB. Incluye shell (`index.html`, `index-*.js`), vendors (`react` 67.48, `motion` 44.37, `dexie` 31.34, `zustand`), 5 chunks lazy Discipulado (`ElCamino` 2.09, `Leccion` 1.69, `CierreLeccion` 0.62, `JugarEnGrupo` 3.12, `EstadoOffline` 0.54), 8 chunks de contenido, CSS, fonts, iconos.
- **Runtime SWR**: 2 chunks `evangelios-*` (5.08 + 4.32 kB gzip), `cacheName: "evangelios-v1"`, expiración 30 días, `maxEntries: 5`. Excluidos del precache vía `globIgnores`.
- **`manualChunks`**: sin cambios desde Fase 4 (regla vendors react/motion/dexie/zustand intacta). Nombres semánticos de chunks descartados: Workbox matchea por hash, no por nombre.
- **`vendor-motion` 44 kB**: diferido. No bloquea LCP (precache corre post-paint). Reevaluar solo si Speed Insights post-deploy muestra LCP > 2.5 s.
- **`useOnlineStatus`** (Visual): validado. Solo `navigator.onLine` + eventos, sin probe. Sin cambios.
- **devDeps añadidos**: `workbox-core`, `workbox-expiration`, `workbox-precaching`, `workbox-routing`, `workbox-strategies` (`^7.3.0`).
- **Documentación**: creado `docs/OFFLINE-STRATEGY.md`; sección bump `evangelios-v*` en `docs/CONTENT-WORKFLOW.md`.
- **Optimización bundle inicial**: reducido a **33.49 kB gzip** (objetivo ≤ 35 kB ✅). Baseline Fase 4 era 29.49 kB; +4 kB por features H-FUN-05/H-VIS-06, dentro de presupuesto.
- **Tests**: **203/203 verdes**.
- **Build**: verde. `dist/sw.js` (23.58 kB raw / 7.80 kB gzip) + `sw.js.map`. 511 módulos cliente + 78 módulos SW.
- **Deploy**: commit `df05116` pusheado a `main` por el PO. Vercel auto-deploy.
- **Handoffs aprobados**: H-ADM-01a (→ Funcional), H-ADM-01b (→ Contenido), H-ADM-01c (→ Visual, futuro), H-ADM-01d (→ Funcional, futuro). Ninguno bloqueante.

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
