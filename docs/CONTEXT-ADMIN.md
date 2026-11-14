# CONTEXT ADMIN — Mente en el Camino (Selah)

**Área**: Administración
**Última actualización**: 2026-11-12
**Estado**: Fase 5 CERRADA. H-ADM-01 en producción (commit `df05116`). Fase 6 próxima.

---

## 1. Rol

Asistente especializado en **administración del proyecto**: PWA, deploy, analítica, Core Web Vitals, escalabilidad, migración a backend, gestión documental de contenido y backup. No toco lógica de juego, ni visual, ni UX de flujos.

---

## 2. Territorio

### Archivos que toco

- `vite.config.ts` — build, PWA, chunk splitting (`manualChunks`).
- `package.json` / `package-lock.json` — deps y scripts.
- `vercel.json` — configuración Vercel (headers de caché).
- `public/*` — íconos PWA, manifest.
- `docs/*` — documentación administrativa.
- `src/sw.ts` — Service Worker custom (asignado en Fase 5).
- `src/hooks/useInstallPrompt.ts` — Lógica de instalación PWA (asignada por el Maestro).

### Archivos que NO toco

- `src/**` (excepto `src/sw.ts` y `src/hooks/useInstallPrompt.ts`, asignados explícitamente por el Maestro).
- `index.html`, `public/favicon.svg` — Visual.

---

## 3. Cómo me ligo con los otros chats

**Principio transversal**: cero comunicación directa entre chats. Todo mensaje viaja por el **product owner (chat maestro)**. Emito handoffs escritos; el PO los entrega al área destino; el área destino los aplica y responde "cerrado". Nunca aplico cambios fuera de mi territorio. Detalle en `docs/ADMIN-INTERFACES.md`.

---

## 4. Estado Final Fase 5

### 4.1. Repo y deploy

- **Repo**: `github.com/silverth/mente-en-el-camino` (rama `main`).
- **HEAD en cierre Fase 5**: `df05116` (H-ADM-01). Base anterior: `af7ad91` (H-VIS-06).
- **URL**: https://mente-en-el-camino.vercel.app
- **Deploy**: Vercel auto desde `main`.
- **Coste**: $0/mes (Plan Hobby).

### 4.2. Arquitectura PWA (estado final)

- **Estrategia**: `injectManifest` con SW custom en `src/sw.ts`.
- **`registerType`**: **`prompt`** (⚠️ cambió desde `autoUpdate` en Fase 5 — ver §4.3).
- **Sin** `skipWaiting()` ni `clientsClaim()` en el flujo normal del SW.
- **SW custom** (`src/sw.ts`):
  - `precacheAndRoute(self.__WB_MANIFEST)` + `cleanupOutdatedCaches()`.
  - `NavigationRoute` con `createHandlerBoundToURL("/index.html")`, denylist `/^\/api\//` (SPA fallback).
  - `StaleWhileRevalidate` para `**/evangelios-*.js`, `cacheName: "evangelios-v1"`, `maxEntries: 5`, `maxAgeSeconds: 30 días`.
  - Listener `message` para `{ type: "SKIP_WAITING" }` (activación manual futura vía H-ADM-01c).

### 4.3. Fix crítico de seguridad de datos (Fase 5)

HEAD `af7ad91` tenía `registerType: "autoUpdate"` + `skipWaiting: true` + `clientsClaim: true`. Efecto: el SW nuevo se auto-activaba mid-sesión → recarga forzada → **pérdida de estado en memoria** (violación directa del requisito no negociable "**nunca borrar progreso local sin aviso**").

**Corregido en H-ADM-01**: `registerType: "prompt"`. El SW nuevo queda en `waiting`; activa al cerrar todas las pestañas o vía `postMessage({ type: "SKIP_WAITING" })`. El progreso en IndexedDB (`MenteEnElCaminoDB`) nunca se toca. Regla de Oro 4 intacta.

### 4.4. Estrategia de caché (Fase 5)

**Precache** (32 entries, 876.05 KiB, ejecución background post-paint — no afecta LCP):

- `index.html` (SPA shell)
- `index-*.js` (bundle inicial, 33.49 kB gzip)
- Vendors: `vendor-react` (67.48 kB gzip), `vendor-motion` (44.37 kB gzip), `vendor-dexie` (31.34 kB gzip), `vendor-zustand`
- Chunks lazy Discipulado (5): `ElCamino` (2.09), `Leccion` (1.69), `CierreLeccion` (0.62), `JugarEnGrupo` (3.12), `EstadoOffline` (0.54)
- Chunks de contenido: `personajes`, `valores`, `parabolas`, `exodo`, `genesis`, `historia-iglesia`, `apologetica`, `versiculos`
- CSS, fonts, iconos PWA, manifest

**Runtime SWR** (excluido de precache vía `globIgnores`):

- `evangelios-DD1Vr3PR.js` (5.08 kB gzip) — `cacheName: "evangelios-v1"`
- `evangelios-B0nTj5-t.js` (4.32 kB gzip) — `cacheName: "evangelios-v1"`

**Versionado**: precache invalida por hash (`__WB_MANIFEST` + `cleanupOutdatedCaches()`). Runtime `evangelios-v1` requiere bump manual → ver `docs/CONTENT-WORKFLOW.md`.

### 4.5. Core Web Vitals

- **LCP**: 2.0 s (verde, baseline Fase 4). Objetivo post-Fase 5: ≤ 2.5 s.
- **CLS**: 0 (perfecto).
- **Bundle inicial**: 33.49 kB gzip (objetivo ≤ 35 kB ✅, margen 1.51 kB).
- **Performance Score**: 92/100 (Fase 4).

### 4.6. Validaciones Fase 5

- **`useOnlineStatus`** (Visual): ✅ validado. Solo `navigator.onLine` + eventos `online`/`offline`. Sin probe de red (coherente con P4 sin servidor). Se conserva sin cambios.
- **Tests**: 203/203 verdes.
- **Build**: verde. Bundle ≤ 35 kB. `dist/sw.js` generado (7.80 kB gzip).

---

## 5. Fase 6 — Pendientes (alcance Admin)

1. **Notificaciones Push / Rachas (PWA)**: VAPID + Supabase `push_subscriptions` + Vercel Cron diario. Plan técnico esbozado en H-ADM-01 (mensaje de chat, no doc).
2. **Supabase**: migración para multijugador y persistencia de rachas.
3. **Deuda técnica diferida** — ver `CHANGELOG-ADMIN.md` §Deuda Técnica Diferida:
   - `sourcemap: true` en producción.
   - Precache 876.05 KiB / 32 entries (H-ADM-01d).
   - `npm audit`: 24 vulnerabilities pre-existentes.

---

## 6. Comandos

- Dev: `npm run dev`
- Build: `npm run build`
- Tests: `npm run test`
- Deploy: push a `main` → Vercel auto.

**Fin del documento.**
