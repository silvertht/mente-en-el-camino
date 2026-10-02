# CHANGELOG ADMIN — Mente en el Camino (Selah)

> ⚠️ **DOCUMENTO EXCLUSIVO DEL ÁREA ADMIN.**
> NO confundir con `CHANGELOG.md` (consolidado de las 4 áreas).
> Este archivo registra solo cambios, decisiones y pendientes de Admin.

**Área responsable:** Administración (PWA · Analytics · Core Web Vitals · Deploy · Supabase)
**Última actualización:** 2026-10-01
**Estado del área:** 🟢 Fase 2 en curso. Tareas 1 y 2 cerradas. Tarea 3 esperando datos.

---

## 📊 ESTADO DEL ÁREA ADMIN

| #   | Tarea                             | Estado                          | Bloquea a                  | Depende de   |
| --- | --------------------------------- | ------------------------------- | -------------------------- | ------------ |
| 1   | PWA (manifest + SW + íconos)      | ✅ Cerrada                      | —                          | —            |
| 2   | Vercel Analytics + Speed Insights | ✅ Cerrada                      | —                          | —            |
| 3   | Core Web Vitals (leer datos)      | ⏳ Esperando 24-48h             | UX (Test #2)               | Tráfico real |
| 4   | Workflow de contenido             | 🔴 Sin empezar                  | Funcional (100+ preguntas) | —            |
| 5   | Migración a Supabase              | 🔴 Sin empezar (Fase 2.5)       | Funcional (multijugador)   | —            |
| 6   | Backup de progreso                | 🔴 Sin empezar (baja prioridad) | —                          | —            |

**Costo total del área:** $0/mes (Vercel Hobby + GitHub free).

---

## 2026-09-25 — TAREA 2 CERRADA: Vercel Analytics + Speed Insights

### [ADMIN] Analytics integrado en producción

**Objetivo**: tener datos objetivos antes del Test #2 con los 5 jóvenes.

**Dependencias instaladas** (`package.json`):

- `@vercel/analytics` — Web Analytics (uso).
- `@vercel/speed-insights` — Core Web Vitals (rendimiento).

**Handoff aplicado por Funcional**:

- `src/main.tsx`: añadidos `<Analytics />` y `<SpeedInsights />` dentro
  de `<StrictMode>` y después de `<App />`. Colocados al final para no
  bloquear el render inicial (protege LCP).

**Activación en Vercel dashboard**:

- Web Analytics: activado (Hobby Free).
- Speed Insights: activado (Hobby Free).

**Documentación creada**:

- `docs/ANALYTICS.md` — guía completa de interpretación:
  - Qué se mide / qué NO (privacidad de menores).
  - Métricas de uso y Core Web Vitals con umbrales.
  - Protocolo de escalado (métrica → área responsable).
  - Limitaciones del plan Hobby.
  - Métricas clave para Test #2.

**Verificación técnica**:

| Métrica               | Antes       | Después        | Cambio   |
| --------------------- | ----------- | -------------- | -------- |
| Módulos transformados | 472         | 474            | +2       |
| Bundle JS gzip        | 179.39 kB   | 180.87 kB      | +1.48 kB |
| CSS gzip              | 10.14 kB    | 10.22 kB       | +0.08 kB |
| Precache PWA          | 15 · 799 KB | 15 · 803.84 KB | +4.84 KB |
| Build time            | —           | 1.36 s         | limpio   |
| Errores TS            | 0           | 0              | —        |
| Tests unitarios       | 66/66       | 66/66          | —        |

**Verificación en producción**:

- ✅ Analytics mostrando datos reales (1 visitor, 5 page views, 0% bounce).
- ⏳ Speed Insights: esperando ~24-48h de tráfico real.

**Commits en `main`**:

- `[ADMIN] Vercel Analytics + Speed Insights — integración`
- `[ADMIN] docs/ANALYTICS.md — guía de interpretación de métricas Vercel`

**Estado:** ✅ Cerrada.

---

## 2026-09-24 — TAREA 1 CERRADA: PWA + rebrand a "Selah"

### [ADMIN] PWA configurada + app renombrada a "Selah"

**Decisión de marca** (autorizada por product owner):

- Nombre público: **Selah** ("pausa, medita" — hebreo, Salmos).
- Slogan: "Pausa. Reflexiona. Aprende."
- Nombre interno repo: `mente-en-el-camino` (sin cambio).

**Territorio Admin modificado**:

- `vite.config.ts`: bloque `VitePWA(...)` añadido.
  - Manifest: `name: "Selah — Trivia Bíblica"`, `short_name: "Selah"`.
  - `theme_color: "#F5B544"`, `background_color: "#0B0F1A"`.
  - `display: "standalone"`, `orientation: "portrait"`.
  - 3 íconos (192, 512, maskable) + apple-touch-icon.
  - Workbox: `autoUpdate`, precache shell, `devOptions.enabled: false`.
- `.gitignore`: añadida línea `dev-dist`.

**Nuevos assets en `public/`**:

- `pwa-192x192.png`
- `pwa-512x512.png`
- `maskable-icon-512x512.png`
- `apple-touch-icon.png` (180×180)

**Diseño del ícono**: llama neón, gradiente alba-500 → fuego-500 sobre noche-900.
Referencias: Jeremías 23:29, Lucas 24:32.

**Verificación técnica**:

| Métrica                       | Valor                |
| ----------------------------- | -------------------- |
| Build limpio                  | ✅                   |
| `dist/manifest.webmanifest`   | ✅                   |
| `dist/sw.js` + `workbox-*.js` | ✅                   |
| Precache                      | 16 entries · 815 KB  |
| Bundle gzip                   | 181.65 kB (baseline) |
| Deploy Vercel                 | ✅                   |
| Install prompt Chrome         | ✅ Confirmado        |

**Commit en `main`**:

- `[ADMIN] PWA configurada — manifest Selah + SW + íconos`

**Estado:** ✅ Cerrada.

---

## 📤 HANDOFFS ACTIVOS (Admin → otras áreas)

Estos son los cambios que **Admin NO puede aplicar** por límite de territorio.
Requieren intervención de otra área.

### Handoff #1 — UX

**Tarea**: Cambiar textos "Mente en el Camino" → "Selah" en toda la app.

**Archivos afectados** (territorio UX):

- `src/screens/Home.tsx` (header principal, título grande).
- Cualquier otra pantalla con el nombre visible.

**Motivo**: coherencia de marca con la PWA (manifest ya dice "Selah").
El header de Home aún dice "Mente en el Camino" → mixto visualmente.

**Estado**: ⏳ Pendiente desde 2026-09-24.

---

### Handoff #2 — UX

**Tarea**: Adaptar microcopy "palabra" → "evento" en `TimelineQuestion`.

**Archivos afectados** (territorio UX):

- `src/components/questions/TimelineQuestion.tsx` (hint).

**Motivo**: el componente `TimelineQuestion` usa `TapToPlace` cuyo
microcopy dice "palabra". Semánticamente Timeline maneja **eventos**,
no palabras. Pendiente #10 del CHANGELOG general.

**Estado**: ⏳ Pendiente desde 2026-09-25.

---

### ✅ Handoffs ya cerrados (por referencia)

Estos fueron gestionados por las otras áreas. Se listan solo para
trazabilidad:

| #   | Handoff original                             | Área que cerró | Fecha      |
| --- | -------------------------------------------- | -------------- | ---------- |
| 1   | `index.html` meta tags + title               | Visual         | 2026-09-24 |
| 2   | Rediseñar `public/favicon.svg` (llama Selah) | Visual         | 2026-09-24 |
| 3   | Revisar/eliminar `public/icons.svg`          | Visual         | 2026-09-24 |
| 4   | Fix paleta `Button.tsx`                      | Visual         | 2026-09-25 |
| 5   | TapToPlace (reemplaza drag & drop)           | Visual + UX    | 2026-09-25 |

---

## 🚧 PENDIENTES INTERNOS DE ADMIN

### Pendiente #A1 — Tarea 3: Core Web Vitals

**Cuándo**: cuando Speed Insights acumule 24-48h de tráfico real.

**Plan**:

1. Leer LCP / INP / CLS desde Vercel Speed Insights.
2. Interpretar según `docs/ANALYTICS.md`.
3. Identificar si el bundle de 581 kB (warning del build) está afectando LCP.
4. Reportar al product owner con recomendaciones.
5. Escalar a Visual/Funcional si se confirman problemas.

**Bloquea a**: UX (Test #2 requiere datos reales).
**Costo**: $0.

---

### Pendiente #A2 — Tarea 4: Workflow de contenido

**Cuándo**: cuando Funcional esté listo para ampliar de 70 → 100+ preguntas.

**Plan**:

1. Documentar en `docs/CONTENT-WORKFLOW.md`:
   - Cómo agregar pregunta a `src/data/questions/*.ts`.
   - Formato exacto por tipo (7 tipos).
   - Cómo correr `auditQuestionData()` y `auditAcceptedAnswers()`.
   - Proceso de revisión teológica (RVR1960).
   - Versionado de preguntas.
2. Checklist de QA antes de publicar preguntas.

**Bloquea a**: Funcional.

---

### Pendiente #A3 — Tarea 5: Migración a Supabase (Fase 2.5)

**Cuándo**: cuando haya usuarios recurrentes y necesidad real.

**Plan**:

1. Crear proyecto en Supabase (free tier).
2. Schema: `users`, `profiles`, `scores`, `sessions`, `multiplayer_rooms`.
3. Auth (email + Google).
4. Sincronizar Dexie ↔ Supabase (offline-first).
5. Ranking online.
6. Modo multijugador (salas con código).

**Costo**: $0 (Supabase free tier ~50k usuarios activos).
**Bloquea a**: Funcional (multijugador).

---

### Pendiente #A4 — Tarea 6: Backup de progreso

**Cuándo**: baja prioridad.

**Plan**:

1. Botón "Exportar progreso" en Profile → JSON descargable.
2. Botón "Importar progreso" → restore desde JSON.
3. Sin servidor, todo local.

**Costo**: $0.

---

### Pendiente #A5 — Warning de bundle >500 kB

**Contexto**: el build emite warning "Some chunks are larger than 500 kB".

**No es un error.** Es una sugerencia de optimización.

**Se abordará** en Tarea 3 (Core Web Vitals) si los datos reales
confirman que está afectando LCP en móvil.

**Posibles acciones futuras**:

- Code splitting con `React.lazy`.
- Lazy load de Dexie y datos de preguntas.
- Ajustar `build.chunkSizeWarningLimit`.

---

### Pendiente #A6 — Warnings opcionales del manifest PWA

**Contexto**: Chrome DevTools reporta 2 warnings opcionales:

- Falta campo `screenshots` para "Richer PWA Install UI".

**No es un error.** Es una feature de enriquecimiento del prompt
de instalación.

**Acción futura**: añadir `screenshots` al manifest con capturas
de Home y Game en formato específico.

---

## 📈 MÉTRICAS ACTUALES (baseline Admin 2026-10-01)

| Métrica         | Valor                  |
| --------------- | ---------------------- |
| Bundle JS gzip  | 180.87 kB              |
| CSS gzip        | 10.22 kB               |
| Precache PWA    | 15 entries · 803.84 KB |
| Build time      | ~1.4 s                 |
| Tests unitarios | 66/66                  |
| PWA installable | ✅ Chrome              |
| Web Analytics   | ✅ Funcionando         |
| Speed Insights  | ⏳ Recolectando        |
| Deploy Vercel   | ✅ Auto desde `main`   |
| Costo mensual   | $0                     |

---

## 🔑 REGLAS DE ORO (Admin)

1. Todo en plan gratuito (no pagar sin autorización del product owner).
2. Nunca romper producción sin avisar.
3. Documentar cada decisión en `docs/`.
4. Probar en preview deployment antes de publicar.
5. Respetar privacidad de menores (nada de tracking invasivo).
6. Backup antes de migraciones grandes.
7. Un chat por área, todo pasa por el product owner.
8. Si algo cae fuera de territorio Admin (`src/**`, `index.html`,
   `public/favicon.svg`) → handoff documentado, no tocar.

---

## 📂 ARCHIVOS CLAVE DEL TERRITORIO ADMIN
