# CONTEXT ADMIN — Mente en el Camino (Selah)

**Área**: Administración
**Última actualización**: 2026-11-12
**Estado**: Fase 5 en curso. H-ADM-01 (caché PWA Discipulado) cerrado condicional. Pendiente: verificación build.

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
- `src/hooks/useInstallPrompt.ts` — Lógica de instalación PWA (asignada por el Maestro).
- `src/sw.ts` — Service Worker custom (`injectManifest`, asignado en Fase 5).

### Archivos que NO toco

- `src/**` (excepto hooks autorizados explícitamente por el Maestro como `useInstallPrompt` y `src/sw.ts`).
- `index.html`, `public/favicon.svg` — Visual.

---

## 3. Cómo me ligo con los otros chats

**Principio transversal**: cero comunicación directa entre chats. Todo mensaje viaja por el **product owner (chat maestro)**. Emito handoffs escritos; el PO los entrega al área destino; el área destino los aplica y responde "cerrado". Nunca aplico cambios fuera de mi territorio. Detalle en `docs/ADMIN-INTERFACES.md`.

---

## 4. Estado Actual de Infraestructura (Fase 5 en curso)

- **Repo**: `github.com/silverth/mente-en-el-camino` (rama `main`). HEAD af7ad91 al arranque Fase 5.
- **URL**: https://mente-en-el-camino.vercel.app
- **Deploy**: Vercel auto desde `main`.
- **Core Web Vitals (Producción, baseline Fase 4)**:
  - **LCP**: 2.0 s (Verde).
  - **CLS**: 0 (Perfecto).
  - **Performance Score**: 92/100.
- **Bundle Inicial (baseline Fase 4)**: 29.49 kB (gzip). Post-H-FUN-05: 33.49 kB gzip. Objetivo H-ADM-01: ≤ 35 kB.
- **PWA**: Instalable iOS/Android. Hook `useInstallPrompt` implementado. **Fase 5**: migrado a `injectManifest` con `src/sw.ts` custom; `registerType: "prompt"` (sin auto-reload).
- **Caché**: precache (5 chunks Discipulado + shell + vendors + iconos) + runtime SWR (`evangelios-*`, `cacheName: "evangelios-v1"`).
- **Costo**: $0/mes (Plan Hobby).

---

## 5. Tareas Fase 5 — Estado

1. **H-ADM-01 (caché PWA Discipulado)**: ✅ cerrado condicional. Pendiente verificación build post-aplicación.
2. **Notificaciones Push / Rachas (PWA)**: pendiente. Plan técnico: `injectManifest` (ya en su sitio) + VAPID + Supabase `push_subscriptions` + Vercel Cron diario. Ver H-ADM-01 §3 del handoff.
3. **Supabase**: pendiente. Migración para multijugador y persistencia de rachas.

---

## 6. Comandos

- Dev: `npm run dev`
- Build: `npm run build`
- Tests: `npm run test`
- Deploy: push a `main` → Vercel auto.

**Fin del documento.**
