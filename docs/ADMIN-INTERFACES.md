# ADMIN-INTERFACES — Cómo Admin se liga con los otros chats

> Define canales, protocolos y fronteras entre el chat Admin y los otros chats.
> **Owner**: Admin · **Última actualización**: 2026-11-12

---

## 1. Principio transversal

Cero comunicación directa. Todo pasa por el PO (chat maestro).

## 2. Frontera de archivos

| Archivo                         |     Admin     | Funcional  |   Visual    |       UX       |
| :------------------------------ | :-----------: | :--------: | :---------: | :------------: |
| `vite.config.ts`                |      ✅       |     ❌     |     ❌      |       ❌       |
| `vercel.json`                   |      ✅       |     ❌     |     ❌      |       ❌       |
| `package.json` (deps)           |      ✅       |     ✅     |     ❌      |       ❌       |
| `public/*`                      |      ✅       |     ❌     |     ❌      |       ❌       |
| `docs/`                         |  ✅ (admin)   | ✅ (suyos) |     ❌      |       ❌       |
| `src/hooks/useInstallPrompt.ts` | ✅ (asignado) |     ❌     |     ❌      |       ❌       |
| `src/sw.ts`                     | ✅ (asignado) |     ❌     |     ❌      |       ❌       |
| `src/**` (resto)                |      ❌       |     ✅     | ✅ (visual) |    ✅ (UX)     |
| `index.html`                    |      ❌       |     ❌     |     ✅      | ✅ (microcopy) |

## 3. Protocolo de Handoff

Formato único de Admin hacia otras áreas:

## 4. Handoffs Históricos y APIs entregadas a otras áreas

### Handoffs Activos/Cerrados en Fase 5:

- `H-ADM-01` (Cerrado condicional): Estrategia de caché PWA para Discipulado. Migración `injectManifest`, `registerType: "prompt"`, runtime SWR evangelios, fix crítico de `autoUpdate`.
  - `H-ADM-01a` (→ Funcional): Confirmar que `src/sw.ts` no se importa desde `main.tsx` ni chunks eager. Sin cambios en store/DB.
  - `H-ADM-01b` (→ Contenido): Bump `cacheName: "evangelios-v1"→"v2"` en `src/sw.ts` cada vez que se actualice contenido de evangelios. Doc: `docs/CONTENT-WORKFLOW.md`.
  - `H-ADM-01c` (→ Visual, no bloqueante): UI "Nueva versión disponible" con `useRegisterSW` + `postMessage({ type: 'SKIP_WAITING' })`. **No requerido para H-ADM-01.**

### Handoffs Activos/Cerrados en Fase 4:

- `H-FUN-03` (Cerrado): Lazy load de `data/questions` para reducir el bundle inicial.

### APIs y Hooks entregados a otras áreas:

- **`useInstallPrompt` (Admin → Visual)**
  - **Ubicación**: `src/hooks/useInstallPrompt.ts`
  - **Firma**: `const { isIOS, isAndroid, isStandalone, canInstall, installApp } = useInstallPrompt();`
  - **Uso por Visual**:
    - Si `isIOS` es `true`: Mostrar modal instructivo de "Añadir a pantalla de inicio".
    - Si `canInstall` es `true` (Android): El botón debe llamar a `installApp()`.
    - El listener de `beforeinstallprompt` está a nivel global (fuera de React) para evitar pérdida del evento.

- **`useOnlineStatus` (Visual → validado por Admin en H-ADM-01)**
  - **Ubicación**: `src/hooks/useOnlineStatus.ts`
  - **Firma**: `const isOnline: boolean = useOnlineStatus();`
  - **Estado**: ✅ validado. Solo `navigator.onLine` + eventos `online`/`offline`. Sin probe de red (coherente con P4 sin servidor). Sin cambios.
