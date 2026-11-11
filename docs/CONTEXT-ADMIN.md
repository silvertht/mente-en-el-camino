# CONTEXT ADMIN — Mente en el Camino (Selah)

**Área**: Administración
**Última actualización**: 2026-11-10
**Estado**: Fase 4 cerrada. Fase 5 próxima (Notificaciones PWA / Supabase).

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

### Archivos que NO toco

- `src/**` (excepto hooks autorizados explícitamente por el Maestro como `useInstallPrompt`).
- `index.html`, `public/favicon.svg` — Visual.

---

## 3. Cómo me ligo con los otros chats

**Principio transversal**: cero comunicación directa entre chats. Todo mensaje viaja por el **product owner (chat maestro)**. Emito handoffs escritos; el PO los entrega al área destino; el área destino los aplica y responde "cerrado". Nunca aplico cambios fuera de mi territorio. Detalle en `docs/ADMIN-INTERFACES.md`.

---

## 4. Estado Actual de Infraestructura (Post Fase 4)

- **Repo**: `github.com/silverth/mente-en-el-camino` (rama `main`).
- **URL**: https://mente-en-el-camino.vercel.app
- **Deploy**: Vercel auto desde `main`.
- **Core Web Vitals (Producción)**:
  - **LCP**: 2.0 s (Verde).
  - **CLS**: 0 (Perfecto).
  - **Performance Score**: 92/100.
- **Bundle Inicial**: 29.49 kB (gzip) — Reducción del 84% tras aplicar H-FUN-03.
- **PWA**: Instalable en iOS y Android. Hook `useInstallPrompt` implementado para manejar la lógica de instalación (Android captura global de `beforeinstallprompt`, iOS expone estado para modal).
- **Costo**: $0/mes (Plan Hobby).

---

## 5. Tareas Fase 5 — Próximos Pasos

1. **Notificaciones Push / Rachas (PWA)**: Evaluar migración a `injectManifest` en `vite-plugin-pwa` y configurar Vercel Cron Jobs + VAPID.
2. **Supabase**: Migración para Multijugador y persistencia de rachas.

---

## 6. Comandos

- Dev: `npm run dev`
- Build: `npm run build`
- Tests: `npm run test`
- Deploy: push a `main` → Vercel auto.

**Fin del documento.**
