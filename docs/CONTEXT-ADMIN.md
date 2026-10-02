# CONTEXT ADMIN — Mente en el Camino (Selah)

Área: **Administración**
Última actualización: 2026-10-01
Estado: 🟢 Fase 2 en curso. Tareas 1 y 2 cerradas. Tarea 3 esperando datos.

---

## 1. Mi rol

Asistente especializado en **ADMINISTRACIÓN DEL PROYECTO**: PWA, deploy,
analítica, Core Web Vitals, escalabilidad, migración a backend, gestión de
usuarios y contenido. **NO toco lógica de juego, ni visual, ni UX de flujos.**

---

## 2. Mi territorio

### Archivos que puedo modificar

- `vite.config.ts` (configuración de build, PWA, chunk splitting)
- `package.json` (dependencias y scripts administrativos)
- `package-lock.json` (generado por npm)
- `vercel.json` (si hace falta)
- `public/` (íconos PWA, manifest, favicon) — pero favicon.svg es de Visual
- `docs/` (documentación administrativa)
- `.gitignore` (exclusiones)
- `README.md`
- Nuevos archivos de configuración: `supabase/`, `scripts/`, etc.

### Archivos que NO toco

- `src/**` → territorio de Funcional, Visual, UX. Solo pido cambios.
- `index.html` → territorio de Visual/UX. Solo pido cambios.
- `public/favicon.svg` → territorio de Visual.

---

## 3. Responsabilidades

### Prioridad 1 — Producción real

1. **PWA** (`vite-plugin-pwa`): ✅ CERRADA
   - Manifest, service worker, íconos generados.
   - Instalable en Chrome confirmado.

2. **Analytics**: ✅ CERRADA
   - Vercel Web Analytics activo.
   - Vercel Speed Insights activo.
   - Documentado en `docs/ANALYTICS.md`.

3. **Core Web Vitals**: ⏳ EN CURSO
   - Esperando ~24-48h de tráfico real.
   - Leer datos, interpretar, reportar, escalar si aplica.

### Prioridad 2 — Crecimiento

4. **Migración a Supabase** (Fase 2.5):
   - Cuentas de usuario (auth).
   - Sincronización de progreso entre dispositivos.
   - Ranking online.
   - Modo multijugador (salas con código).

5. **Gestión de contenido**:
   - Documentar workflow para agregar preguntas.
   - Definir proceso de revisión teológica.
   - Versionado de preguntas.

### Prioridad 3 — Mantenimiento

6. **Deploy y CI/CD**:
   - Flujo GitHub → Vercel documentado.
   - Rollback si algo sale mal.
   - Preview deployments para pruebas.

7. **Costos**: todo en plan gratuito (Vercel + GitHub + Supabase free).

8. **Backup**: repositorio (GitHub) + export local (Dexie ya lo permite).

---

## 4. Estado actual del proyecto (2026-10-01)

### Infraestructura

- **Repo**: `github.com/silverth/mente-en-el-camino`
- **Deploy**: Vercel automático desde `main`.
- **URL producción**: https://mente-en-el-camino.vercel.app
- **Nombre público de la app**: **Selah** (rebrand Fase 2).
- **Nombre interno del repo**: `mente-en-el-camino` (sin cambio).

### Servicios activos

- ✅ **PWA**: manifest, SW, 4 íconos (192, 512, maskable, apple-touch).
- ✅ **Vercel Web Analytics**: midiendo uso real (Hobby Free).
- ✅ **Vercel Speed Insights**: midiendo Core Web Vitals (Hobby Free).
- 🔴 **Supabase**: sin empezar (Fase 2.5).
- 🔴 **Panel de administración**: sin empezar.

### Costos actuales

- Vercel: **$0** (plan Hobby).
- GitHub: **$0** (repo público/privado free).
- Total: **$0/mes**.

---

## 5. Tareas de Fase 2 — Estado detallado

| #   | Tarea                               | Estado              | Notas                                                               |
| --- | ----------------------------------- | ------------------- | ------------------------------------------------------------------- |
| 1   | PWA (manifest + SW + íconos)        | ✅ Cerrada          | Manifest "Selah", SW autoUpdate, 4 PNG, instalable en Chrome        |
| 2   | Vercel Analytics + Speed Insights   | ✅ Cerrada          | Deps instaladas, componentes integrados, doc en `docs/ANALYTICS.md` |
| 3   | Core Web Vitals (leer datos reales) | ⏳ Esperando 24-48h | Interpretar LCP/INP/CLS, escalar si aplica                          |
| 4   | Workflow de contenido               | 🔴 Sin empezar      | Documentar cómo agregar preguntas (bloquea a Funcional)             |
| 5   | Migración a Supabase                | 🔴 Sin empezar      | Fase 2.5 (auth, ranking, multijugador)                              |
| 6   | Backup de progreso                  | 🔴 Sin empezar      | Export/import JSON desde Profile                                    |

---

## 6. Archivos clave del territorio Admin (creados/modificados en Fase 2)

### `vite.config.ts`

Configuración completa de VitePWA:

- `registerType: "autoUpdate"`, `injectRegister: "auto"`
- Manifest: `name: "Selah — Trivia Bíblica"`, `short_name: "Selah"`
- `theme_color: "#F5B544"`, `background_color: "#0B0F1A"`
- `display: "standalone"`, `orientation: "portrait"`
- 3 íconos registrados (192, 512, maskable)
- Workbox: `globPatterns`, `navigateFallback`, `cleanupOutdatedCaches`
- `devOptions.enabled: false` (PWA solo en build/preview)

### `.gitignore`

Añadida línea `dev-dist` (artefacto de VitePWA en dev).

### `package.json`

Dependencias añadidas en Fase 2:

- `@vercel/analytics` — Web Analytics
- `@vercel/speed-insights` — Core Web Vitals

### `public/` — Nuevos assets PWA

- `pwa-192x192.png` — ícono estándar
- `pwa-512x512.png` — ícono estándar grande
- `maskable-icon-512x512.png` — ícono maskable Android
- `apple-touch-icon.png` (180×180) — ícono iOS

**Diseño del ícono**: llama neón con gradiente alba-500 (`#F5B544`) → fuego-500 (`#F97316`) sobre fondo noche-900 (`#0B0F1A`). Referencias bíblicas: Jeremías 23:29, Lucas 24:32.

### `docs/ANALYTICS.md` (nuevo)

Guía completa de interpretación de métricas:

- Qué se mide y qué NO (principio de privacidad para menores).
- Métricas de uso (visitors, page views, bounce rate, referrers).
- Core Web Vitals con umbrales.
- Protocolo de escalado a Visual/Funcional/UX.
- Limitaciones del plan Hobby.
- Métricas clave para Test #2.

### `src/main.tsx` (handoff a Funcional, aplicado)

Añadidos `<Analytics />` y `<SpeedInsights />` dentro de `<StrictMode>`, después de `<App />`.

---

## 7. Cómo trabajo

1. Recibo tarea del usuario (product owner).
2. Verifico que es territorio Admin.
3. Propongo plan con justificación técnica y costo (debe ser $0).
4. Ejecuto paso a paso con verificaciones.
5. Documento en `docs/` del repo.
6. Actualizo `CHANGELOG.md` general vía handoff al chat principal.
7. Si necesito cambios en `src/`, `index.html` o `public/favicon.svg` → **handoff** documentado para Visual/UX/Funcional.

---

## 8. Reglas de oro

- Todo en plan gratuito (no pagar sin autorización).
- Nunca romper producción sin avisar.
- Documentar cada decisión en `docs/`.
- Probar en preview deployment antes de publicar.
- Respetar privacidad de menores (nada de tracking invasivo).
- Backup antes de migraciones grandes.
- Un chat por área, todo pasa por el product owner.

---

## 9. Handoffs pendientes (a otras áreas)

| #   | Tarea                                                                   | Área destino | Estado       |
| --- | ----------------------------------------------------------------------- | ------------ | ------------ |
| 1   | Cambiar textos "Mente en el Camino" → "Selah" en Home y demás pantallas | UX           | ⏳ Pendiente |
| 2   | Adaptar microcopy "palabra" → "evento" en Timeline                      | UX           | ⏳ Pendiente |

**Nota**: los 4 handoffs de PWA (index.html, favicon, icons.svg, textos) fueron gestionados por Visual y UX el 2026-09-24 / 2026-09-25.

---

## 10. Próximos pasos priorizados

### Inmediato (cuando llegue el momento)

1. **Tarea 3 — Core Web Vitals**: leer datos reales cuando haya 24-48h de tráfico. Interpretar LCP/INP/CLS. Escalar a Visual/Funcional si aplica.

### Después de Test #2 (con 5 jóvenes)

2. **Tarea 4 — Workflow de contenido**: documentar cómo Funcional puede agregar preguntas sin romper el banco. Definir proceso de revisión teológica (RVR1960).

### Fase 2.5

3. **Tarea 5 — Supabase**: diseño de schema, auth, ranking, multijugador.

### Baja prioridad

4. **Tarea 6 — Backup de progreso**: export/import JSON desde Profile.

---

## 11. Referencias rápidas

### Deploy

- **Local dev**: `npm run dev` → http://localhost:5173
- **Build**: `npm run build` → genera `dist/`
- **Preview**: `npm run preview` → http://localhost:4173 (PWA activa)
- **Tests**: `npm run test` / `npm run test:run`
- **Deploy**: push a `main` → Vercel redeploya (1-2 min)
- **Commit**: GitHub Desktop (no terminal)

### Dashboards

- **Vercel**: https://vercel.com/dashboard → proyecto `mente-en-el-camino`
- **Analytics**: pestaña Analytics (barra lateral)
- **Speed Insights**: pestaña Speed Insights
- **GitHub**: https://github.com/silverth/mente-en-el-camino

### Métricas baseline (2026-10-01)

| Métrica            | Valor                  |
| ------------------ | ---------------------- |
| Preguntas en banco | 70                     |
| Categorías activas | 5 (de 9)               |
| Tipos de pregunta  | 7/7                    |
| Tests unitarios    | 66/66                  |
| Bundle gzip        | 180.87 kB              |
| Precache PWA       | 15 entries · 803.84 KB |
| PWA installable    | ✅ Chrome              |
| Web Analytics      | ✅ Funcionando         |
| Speed Insights     | ⏳ Recolectando        |
| Insignias          | 19                     |
| Principios del día | 31                     |

---

## 12. Historial de Fase 2 (Admin)

- **2026-09-24** — Tarea 1 CERRADA: PWA configurada + app rebrand a "Selah".
- **2026-09-25** — Tarea 2 CERRADA: Vercel Analytics + Speed Insights integrados.
- **2026-10-01** — Esperando datos reales de Speed Insights para arrancar Tarea 3.

---

## 13. Cómo pedirme tareas

Frases útiles para arrancar:

- _"Arranquemos Tarea 3 (Core Web Vitals)"_
- _"Diseñemos el plan de migración a Supabase"_
- _"Documenta el workflow de contenido"_
- _"Diseñemos el sistema de backup de progreso"_

Si la tarea cae fuera de mi territorio (`src/**`, `index.html`, `public/favicon.svg`), te daré un **handoff** documentado para que lo lleves al chat correspondiente.

---

**Fin del documento.**
