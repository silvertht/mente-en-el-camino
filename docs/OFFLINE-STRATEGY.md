# OFFLINE-STRATEGY — Persistencia y Modo Offline (Selah)

> Documento del área Admin. Define el modelo de datos local, estrategia de caché PWA y comportamiento offline.
> **Owner**: Admin · **Última actualización**: 2026-11-12 · **Estado**: Fase 5 · H-ADM-01.

---

## 1. Principio

Selah es una app **local-first sin servidor** (decisión P4: sin cuentas, progreso local). No existe "sincronización" multi-dispositivo. El término correcto es **persistencia local**.

## 2. Fuente de verdad

- **Datos de progreso**: `MenteEnElCaminoDB` (Dexie/IndexedDB). **Intacta** (Regla de Oro 4). Ningún cambio en stores ni schema desde Admin.
- **Contenido estático** (lecciones, evangelios): servido por SW desde caché.
- **Estado de sesión** (lección en curso, respuestas pendientes): memoria React + Zustand (efímero). Se pierde al recargar; **no** es responsabilidad de Admin.

## 3. Estrategia de caché PWA

Ver `vite.config.ts` (`injectManifest`) + `src/sw.ts` (runtime).

### 3.1. Precache (Workbox)

Assets precacheados al instalar el SW (background, post-paint):

- `index.html` (SPA shell)
- `dist/assets/index-*.js`, `vendor-react-*.js`, `vendor-motion-*.js`, `vendor-dexie-*.js`, `vendor-zustand-*.js`
- Chunks lazy Discipulado: `ElCamino-*.js`, `Leccion-*.js`, `CierreLeccion-*.js`, `JugarEnGrupo-*.js` (+ 5.º)
- Iconos PWA (`/pwa-*.png`, `/maskable-*.png`, `/apple-touch-icon.png`, `/favicon.svg`)
- CSS, fonts

### 3.2. Runtime cache

| Patrón               | Estrategia             | Cache name      | Expiración           |
| :------------------- | :--------------------- | :-------------- | :------------------- |
| `**/evangelios-*.js` | `StaleWhileRevalidate` | `evangelios-v1` | 5 entradas · 30 días |

### 3.3. Versionado e invalidación

- **Precache**: hash de revisión en `__WB_MANIFEST`. `cleanupOutdatedCaches()` elimina entradas obsoletas al activar SW nuevo.
- **Runtime (`evangelios`)**: bump manual `evangelios-v1`→`v2` en `src/sw.ts` cada vez que cambie contenido. Ver `CONTENT-WORKFLOW.md`.

## 4. Comportamiento offline

- **Conexión**: `useOnlineStatus` (`src/hooks/useOnlineStatus.ts`) escucha `navigator.onLine` + eventos `online`/`offline`. **Sin probes** (no hay backend).
- **Aviso**: banner discreto no alarmista (Visual).
- **Funcionalidad**: app completa operativa desde precache. Solo `evangelios` requiere primera carga online.

## 5. Actualización del SW

- `registerType: "prompt"`. SW nuevo espera (`waiting`).
- **Nunca se auto-activa** mid-sesión. Activa al cerrar todas las pestañas o vía `postMessage({ type: 'SKIP_WAITING' })` (consentimiento explícito, futuro H-ADM-01c).
- **IndexedDB NO se toca** en actualizaciones. Solo precache de assets estáticos.

## 6. Regla de Oro 4 — MenteEnElCaminoDB

Ningún cambio desde Admin. Verificación en cada handoff: `src/db/**` sin diff.

## 7. Rollback

Revertir `vite.config.ts` a commit af7ad91 → SW vuelve a `generateSW` (pérdida de runtime cache de evangelios; el progreso IndexedDB se conserva).
