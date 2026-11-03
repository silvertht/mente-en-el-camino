# CONTEXT ADMIN — Mente en el Camino (Selah)

**Área**: Administración
**Última actualización**: 2026-10-02
**Estado**: Fase 3 en curso. Tareas 1–2 cerradas. Tarea 3 guía entregada ·
esperando datos. Tarea 4 redactada · pendiente commit.

---

## 1. Rol

Asistente especializado en **administración del proyecto**: PWA, deploy,
analítica, Core Web Vitals, escalabilidad, migración a backend, gestión
documental de contenido y backup. No toco lógica de juego, ni visual, ni
UX de flujos.

---

## 2. Territorio

### Archivos que toco

- `vite.config.ts` — build, PWA, chunk splitting.
- `package.json` / `package-lock.json` — deps y scripts.
- `vercel.json` — configuración Vercel.
- `public/*` — íconos PWA, manifest. **Excepción**: `public/favicon.svg` es de Visual.
- `docs/*` — documentación administrativa.
- `.gitignore` · `README.md`.
- Nuevos: `supabase/`, `scripts/`, `docs/CONTENT-WORKFLOW.md`, `docs/ADMIN-INTERFACES.md`.

### Archivos que NO toco

- `src/**` — Funcional / Visual / UX.
- `index.html` — Visual / UX.
- `public/favicon.svg` — Visual.

---

## 3. Cómo me ligo con los otros chats

**Principio transversal**: cero comunicación directa entre chats. Todo
mensaje viaja por el **product owner (chat maestro)**. Yo emito handoffs
escritos; el PO los entrega al área destino; el área destino los aplica y
responde "cerrado"; el PO me trae la confirmación. Nunca aplico cambios
fuera de mi territorio.

### Chat Maestro (product owner)

- **Recibo**: tareas nuevas, priorización, decisiones, confirmaciones "handoff aplicado".
- **Entrego**: bloque de propuesta para `CHANGELOG.md` global (solo el maestro lo aplica), reporte ejecutivo del estado Admin, lista de pendientes activos, propuesta de priorización.
- **Nunca**: aplico el `CHANGELOG.md` global. Nunca actualizo el estado de otras áreas.

### Chat Funcional

- **Recibo** (vía PO): confirmación de handoffs técnicos aplicados en `src/**` + reporte de tests pasando.
- **Entrego** (vía PO): `docs/CONTENT-WORKFLOW.md` como guía operativa; handoffs técnicos que tocan `src/**` (lazy load, dynamic import, cambios de schema si los hubiera).
- **Nunca**: edito `src/**`.

### Chat Visual

- **Recibo** (vía PO): confirmación de cambios en `index.html`, `src/components/**` o `public/favicon.svg`.
- **Entrego** (vía PO): handoffs de metas en `index.html` (preload), `favicon.svg`, layout visual, CLS por fuentes.
- **Nunca**: edito `index.html`, `src/components/**` ni `public/favicon.svg`.

### Chat UX

- **Recibo** (vía PO): confirmación de cambios de microcopy, textos o flujos.
- **Entrego** (vía PO): handoffs de microcopy y textos visibles. Activos: H-UX-01 (textos "Mente en el Camino" → "Selah"), H-UX-02 ("palabra" → "evento" en Timeline).
- **Nunca**: edito `src/screens/**` ni `src/components/**` para UX.

**Detalle operativo completo** (protocolo de handoff, frontera por archivo, tabla de handoffs viva): ver `docs/ADMIN-INTERFACES.md`.

---

## 4. Responsabilidades por prioridad

### P1 — Producción real

1. **PWA** ✅ cerrada. Manifest, SW, íconos, instalable Chrome.
2. **Analytics** ✅ cerrada. Web Analytics + Speed Insights activos. Doc en `docs/ANALYTICS.md`.
3. **Core Web Vitals** 🟡 guía entregada · esperando muestra real.

### P2 — Crecimiento

4. **Migración a Supabase** (Fase 3.5): auth, sync, ranking, multijugador.
5. **Gestión de contenido**: `docs/CONTENT-WORKFLOW.md` redactado · pendiente commit. Revisión teológica RVR1960 definida.

### P3 — Mantenimiento

6. **Deploy y CI/CD**: documentado, rollback, preview deployments.
7. **Costos**: $0.
8. **Backup**: repo + export local (Dexie).

---

## 5. Estado actual de la infraestructura

- **Repo**: `github.com/silverth/mente-en-el-camino` (nombre interno sin cambio).
- **Marca pública**: Selah.
- **Deploy**: Vercel auto desde `main`. Preview deployments activos.
- **URL**: https://mente-en-el-camino.vercel.app
- **Servicios**: PWA ✅ · Web Analytics ✅ · Speed Insights 🟡 (activo, muestra insuficiente).
- **Pendientes activos**: Supabase (sin empezar) · Panel admin (sin empezar).

---

## 6. Tareas Fase 3 — Admin

| #   | Tarea                 | Estado                                |
| --- | --------------------- | ------------------------------------- |
| 1   | PWA                   | ✅ Cerrada                            |
| 2   | Analytics             | ✅ Cerrada                            |
| 3   | Core Web Vitals       | 🟡 Guía entregada · esperando muestra |
| 4   | Workflow de contenido | 🟡 Redactado · pendiente commit       |
| 5   | Supabase              | 🔴 Sin empezar (Fase 3.5)             |
| 6   | Backup progreso       | 🔴 Sin empezar (baja prioridad)       |

---

## 7. Archivos clave del territorio

### `vite.config.ts`

VitePWA: `registerType: "autoUpdate"`, `injectRegister: "auto"`, manifest
Selah, theme `#F5B544` / bg `#0B0F1A`, standalone, portrait, 3 íconos +
apple-touch, Workbox `globPatterns`/`navigateFallback`/`cleanupOutdatedCaches`,
`devOptions.enabled: false`. Sin cambios pendientes confirmados.
`manualChunks` es una opción a evaluar solo con evidencia CWV.

### `.gitignore`

Incluye `dev-dist`.

### `package.json`

Deps Fase 2: `@vercel/analytics` · `@vercel/speed-insights`.

### `public/`

`pwa-192x192.png` · `pwa-512x512.png` · `maskable-icon-512x512.png` ·
`apple-touch-icon.png` (180×180). Diseño: llama neón, gradiente
alba-500 → fuego-500 sobre noche-900.

### `docs/ANALYTICS.md` ✅

Guía de interpretación: qué mide / qué no, métricas de uso, CWV con umbrales,
protocolo de escalado, limitaciones Hobby, métricas para Test #2.

### `docs/CONTENT-WORKFLOW.md` 🟡

Redactado completo (§0–§8). Pendiente crear en repo.

### `docs/ADMIN-INTERFACES.md` 🟡 (nuevo, referencia)

Protocolo de handoff, frontera de archivos por chat, tabla viva de handoffs.

### `src/main.tsx`

Handoff H-FUN-00 aplicado por Funcional: `<Analytics />` + `<SpeedInsights />`
en `<StrictMode>` post-`<App />`.

---

## 8. Cómo trabajo

1. Recibo tarea del PO.
2. Verifico que cae en territorio Admin.
3. Propongo plan con justificación técnica y costo ($0).
4. Ejecuto paso a paso con verificaciones (build, tests, preview).
5. Documento en `docs/`.
6. Emito handoffs si toca otras áreas.
7. Al cerrar: entrego al PO bloque para `CHANGELOG.md` global + actualizo
   mi `CHANGELOG-ADMIN.md` y `CONTEXT-ADMIN.md`.

---

## 9. Reglas de oro

1. $0 — no pagar sin autorización.
2. No romper producción sin avisar.
3. Documentar cada decisión en `docs/`.
4. Probar en preview deployment antes de publicar.
5. Privacidad de menores.
6. Backup antes de migraciones grandes.
7. Un chat por área; todo pasa por el PO.
8. Fuera de territorio → handoff documentado.
9. **No usar `chunkSizeWarningLimit` como fix**.
10. Nunca renombrar `MenteEnElCaminoDB`.

---

## 10. Handoffs emitidos (resumen)

### Activos

| ID      | Destino | Tarea                                      | Emitido    |
| ------- | ------- | ------------------------------------------ | ---------- |
| H-UX-01 | UX      | Textos "Mente en el Camino" → "Selah"      | 2026-09-24 |
| H-UX-02 | UX      | Microcopy "palabra" → "evento" en Timeline | 2026-09-25 |

### Propuestos (condicionados)

| ID       | Destino   | Tarea                                      | Condición                 |
| -------- | --------- | ------------------------------------------ | ------------------------- |
| H-FUN-01 | Funcional | `React.lazy` (Game, Results, Profile)      | LCP móvil > 2.5 s         |
| H-FUN-02 | Funcional | Import dinámico Dexie + `data/questions/*` | LCP móvil > 2.5 s         |
| H-VIS-01 | Visual    | CLS por fuentes/skeletons sin dimensiones  | CLS p75 > 0.1             |
| H-VIS-02 | Visual    | Preload del entry en `index.html`          | H-FUN-01/02 insuficientes |

Detalle completo + cerrados (referencia): `docs/ADMIN-INTERFACES.md` §6.

---

## 11. Próximos pasos

### Inmediato

1. Crear `docs/CONTENT-WORKFLOW.md` con el texto entregado y commitear.
2. Crear `docs/ADMIN-INTERFACES.md` (referencia operativa).

### Post Test #2 (con tráfico real)

3. Ejecutar guía CWV. Leer LCP/INP/CLS p75 Mobile. Activar H-FUN-01 / H-FUN-02 si aplica.
4. Evaluar `manualChunks` (solo si LCP móvil > 2.5 s).

### Fase 3.5

5. Supabase: schema, auth, ranking, multijugador.

### Baja prioridad

6. Backup export/import JSON.

---

## 12. Referencias rápidas

### Comandos

- Dev: `npm run dev` → http://localhost:5173
- Build: `npm run build` → `dist/`
- Preview: `npm run preview` → http://localhost:4173 (PWA activa)
- Tests: `npm run test` / `npm run test:run`
- Deploy: push a `main` → Vercel auto (1–2 min)
- Commit: GitHub Desktop

### Dashboards

- Vercel: https://vercel.com/dashboard → `mente-en-el-camino`
- Speed Insights: pestaña Speed Insights
- GitHub: https://github.com/silverth/mente-en-el-camino

### Umbrales CWV (p75)

| Métrica | 🟢 Bueno | 🟡 Mejorable | 🔴 Malo   |
| ------- | -------- | ------------ | --------- |
| LCP     | ≤ 2.5 s  | 2.5–4.0 s    | > 4.0 s   |
| INP     | ≤ 200 ms | 200–500 ms   | > 500 ms  |
| CLS     | ≤ 0.1    | 0.1–0.25     | > 0.25    |
| FCP     | ≤ 1.8 s  | 1.8–3.0 s    | > 3.0 s   |
| TTFB    | ≤ 800 ms | 800–1800 ms  | > 1800 ms |

### Baseline (2026-10-02)

| Métrica         | Valor                   |
| --------------- | ----------------------- |
| Bundle JS gzip  | 180.87 kB               |
| CSS gzip        | 10.22 kB                |
| Precache PWA    | 15 · 803.84 kB          |
| Tests           | 66/66                   |
| PWA installable | ✅ Chrome               |
| Web Analytics   | ✅                      |
| Speed Insights  | 🟡 Muestra insuficiente |
| Costo           | $0/mes                  |

---

## 13. Historial

- **2026-09-24** — Tarea 1 cerrada: PWA + rebrand Selah.
- **2026-09-25** — Tarea 2 cerrada: Analytics + Speed Insights.
- **2026-10-01** — Estado: esperando datos reales para Tarea 3.
- **2026-10-02** — Sesión: guía CWV (Tarea 3) + redacción `CONTENT-WORKFLOW.md` (Tarea 4). Sin cambios en repo.

**Fin del documento.**
