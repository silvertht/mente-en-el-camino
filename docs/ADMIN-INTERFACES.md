# ADMIN-INTERFACES — Cómo Admin se liga con los otros chats

> Define canales, protocolos y fronteras entre el chat Admin y los otros chats.
> **Owner**: Admin · **Última actualización**: 2026-11-10

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
| `src/**` (resto)                |      ❌       |     ✅     | ✅ (visual) |    ✅ (UX)     |
| `index.html`                    |      ❌       |     ❌     |     ✅      | ✅ (microcopy) |

## 3. Protocolo de Handoff

Formato único de Admin hacia otras áreas:

## 4. Handoffs Históricos y APIs entregadas a otras áreas

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
