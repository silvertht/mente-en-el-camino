# ADMIN-INTERFACES — Cómo Admin se liga con los otros chats

> Define canales, protocolos y fronteras entre el chat Admin y los otros chats.
> **Owner**: Admin · **Última actualización**: 2026-11-12 · **Estado**: Fase 5 cerrada.

---

## 1. Principio transversal

Cero comunicación directa. Todo pasa por el PO (chat maestro).

## 2. Frontera de archivos

| Archivo                         |        Admin         | Funcional  |   Visual    |       UX       |
| :------------------------------ | :------------------: | :--------: | :---------: | :------------: |
| `vite.config.ts`                |          ✅          |     ❌     |     ❌      |       ❌       |
| `vercel.json`                   |          ✅          |     ❌     |     ❌      |       ❌       |
| `package.json` (deps)           |          ✅          |     ✅     |     ❌      |       ❌       |
| `public/*`                      |          ✅          |     ❌     |     ❌      |       ❌       |
| `docs/`                         |      ✅ (admin)      | ✅ (suyos) |     ❌      |       ❌       |
| `src/sw.ts`                     | ✅ (asignado Fase 5) |     ❌     |     ❌      |       ❌       |
| `src/hooks/useInstallPrompt.ts` |    ✅ (asignado)     |     ❌     |     ❌      |       ❌       |
| `src/**` (resto)                |          ❌          |     ✅     | ✅ (visual) |    ✅ (UX)     |
| `index.html`                    |          ❌          |     ❌     |     ✅      | ✅ (microcopy) |

## 3. Protocolo de Handoff

Formato único de Admin hacia otras áreas: `H-ADM-XX<letter>` con (a) contexto, (b) archivos afectados, (c) criterio de cierre, (d) bloqueante sí/no.

## 4. Configuración final de `vite.config.ts` (Fase 5)

Config poseída por Admin, vigente desde `df05116`:

```ts
VitePWA({
  strategies: "injectManifest",
  srcDir: "src",
  filename: "sw.ts",
  registerType: "prompt", // ⚠️ cambió desde "autoUpdate"
  injectRegister: "auto",
  includeAssets: [
    "favicon.svg",
    "apple-touch-icon.png",
    "maskable-icon-512x512.png",
  ],
  manifest: {
    /* intacto desde Fase 4 — P8 state-based, sin URLs nuevas */
  },
  injectManifest: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
    globIgnores: ["**/evangelios-*.js"],
  },
  devOptions: { enabled: false },
});
```
