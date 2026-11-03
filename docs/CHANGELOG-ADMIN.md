# CHANGELOG ADMIN — Mente en el Camino (Selah)

> Documento exclusivo del área Admin. Registra solo cambios, decisiones,
> handoffs emitidos y pendientes internos de Admin. NO describe el trabajo
> de otras áreas salvo como referencia de emisión/recepción de handoffs.

**Área**: Administración (PWA · Analytics · CWV · Deploy · Supabase · docs)
**Última actualización**: 2026-10-02
**Estado**: Fase 3 en curso. Tareas 1–2 cerradas. Tarea 3 guía entregada ·
esperando muestra. Tarea 4 redactada · pendiente de commit.

---

## Estado del área

| #   | Tarea                                              | Estado                                | Bloquea a                | Depende de   |
| --- | -------------------------------------------------- | ------------------------------------- | ------------------------ | ------------ |
| 1   | PWA (manifest + SW + íconos)                       | ✅ Cerrada                            | —                        | —            |
| 2   | Vercel Analytics + Speed Insights                  | ✅ Cerrada                            | —                        | —            |
| 3   | Core Web Vitals (leer datos reales)                | 🟡 Guía entregada · esperando muestra | UX (Test #2)             | Tráfico real |
| 4   | Workflow de contenido (`docs/CONTENT-WORKFLOW.md`) | 🟡 Redactado · pendiente commit       | Funcional (70 → 100+)    | —            |
| 5   | Migración a Supabase (Fase 3.5)                    | 🔴 Sin empezar                        | Funcional (multijugador) | —            |
| 6   | Backup de progreso (export/import JSON)            | 🔴 Sin empezar (baja prioridad)       | —                        | —            |

**Costo del área**: $0/mes.

---

## Entradas

### 2026-10-02 — Sesión: Tarea 3 (guía CWV) + Tarea 4 (workflow redactado)

**Tarea 3 — Guía para leer Core Web Vitals reales (entregada, no ejecutada)**

- Acceso a Vercel Speed Insights (filtros: Mobile · 7/30 días · ruta /).
- Umbrales p75: LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 · FCP ≤ 1.8 s · TTFB ≤ 800 ms.
- Detección de impacto del bundle 581 kB vía LCP attribution
  (element render delay vs resource load duration).
- Acciones por impacto/riesgo:
  - A) `React.lazy` para `Game`, `Results`, `Profile` → handoff Funcional.
  - B) Import dinámico de Dexie + `data/questions/*` → handoff Funcional.
  - C) `manualChunks` en `vite.config.ts` → Admin (solo con evidencia).
  - D) **No usar** `chunkSizeWarningLimit` como fix (silencia, no mejora).
  - E) Preload selectivo en `index.html` → handoff Visual (solo si A/B/C insuficientes).
- Handoffs propuestos: H-FUN-01 (lazy screens), H-FUN-02 (lazy Dexie+questions),
  H-VIS-01 (CLS), H-VIS-02 (preload entry).
- **Estado**: entregada. Sin ejecutar — Speed Insights sin muestra suficiente.
  Retoma cuando haya tráfico real (post Test #2).

**Tarea 4 — `docs/CONTENT-WORKFLOW.md` redactado (entregado, no creado en repo)**

- §0 Reglas no negociables.
- §1 Estructura `src/data/questions/*` + convención IDs (`categoria-tipo-NNN`).
- §2 Formato exacto por los 7 tipos.
- §3 Cómo ejecutar `auditQuestionData()` y `auditAcceptedAnswers()`.
- §4 Revisión teológica RVR1960 (2 revisores + criterios de rechazo).
- §5 Versionado (`version`, `_archive/`, versión del banco).
- §6 Checklist QA pre-commit (14 ítems).
- §7 Normalización de `acceptedAnswers` (minúsculas, sin tildes, sin `ñ`, trim, colapsar espacios, sin puntuación final).
- §8 Flujo end-to-end 70 → 100+.
- **Estado**: redactado. Pendiente: crear archivo en repo y commitear.

**Cambios en repo esta sesión**: NINGUNO. Sin commits en `main`.
**Baseline verificado**: 66/66 tests · bundle 180.87 kB gzip.

### 2026-09-25 — Tarea 2 CERRADA: Analytics

- Deps: `@vercel/analytics` + `@vercel/speed-insights`.
- `<Analytics />` y `<SpeedInsights />` en `src/main.tsx` (aplicado vía handoff H-FUN-00).
- Activación en Vercel dashboard (Hobby Free).
- Doc creado: `docs/ANALYTICS.md`.
- Bundle gzip 179.39 → 180.87 kB (+1.48 kB). 66/66 tests.

### 2026-09-24 — Tarea 1 CERRADA: PWA + rebrand Selah

- `vite.config.ts`: bloque `VitePWA(...)` (manifest "Selah", theme #F5B544, bg #0B0F1A, standalone, portrait, autoUpdate, precache shell, devOptions off).
- `.gitignore`: `dev-dist`.
- `public/`: 4 íconos (192, 512, maskable, apple-touch).
- Build limpio · manifest + sw.js en `dist/` · instalable Chrome.

---

## Handoffs emitidos por Admin

### Activos

| ID      | Tarea                                      | Destino | Emitido    | Estado     |
| ------- | ------------------------------------------ | ------- | ---------- | ---------- |
| H-UX-01 | Textos "Mente en el Camino" → "Selah"      | UX      | 2026-09-24 | ⏳ Abierto |
| H-UX-02 | Microcopy "palabra" → "evento" en Timeline | UX      | 2026-09-25 | ⏳ Abierto |

### Propuestos (condicionados a datos CWV)

| ID       | Tarea                                              | Destino   | Condición                 |
| -------- | -------------------------------------------------- | --------- | ------------------------- |
| H-FUN-01 | `React.lazy` en `App.tsx` (Game, Results, Profile) | Funcional | LCP móvil > 2.5 s         |
| H-FUN-02 | Import dinámico de Dexie + `data/questions/*`      | Funcional | LCP móvil > 2.5 s         |
| H-VIS-01 | CLS por fuentes/skeletons sin dimensiones          | Visual    | CLS p75 > 0.1             |
| H-VIS-02 | Preload del entry en `index.html`                  | Visual    | H-FUN-01/02 insuficientes |

### Cerrados (referencia)

| ID         | Tarea                                               | Cerrado por | Fecha      |
| ---------- | --------------------------------------------------- | ----------- | ---------- |
| H-VIS-00-A | `index.html` metas + title                          | Visual      | 2026-09-24 |
| H-VIS-00-B | `public/favicon.svg` (llama Selah)                  | Visual      | 2026-09-24 |
| H-VIS-00-C | Eliminar `public/icons.svg`                         | Visual      | 2026-09-24 |
| H-VIS-00-D | Paleta `Button.tsx`                                 | Visual      | 2026-09-25 |
| H-UX-00    | TapToPlace (reemplaza drag & drop)                  | Visual + UX | 2026-09-25 |
| H-FUN-00   | `<Analytics />` + `<SpeedInsights />` en `main.tsx` | Funcional   | 2026-09-25 |

---

## Pendientes internos Admin

| ID  | Pendiente                                               | Disparador                           | Costo |
| --- | ------------------------------------------------------- | ------------------------------------ | ----- |
| A1  | Ejecutar guía Tarea 3 y reportar CWV reales             | Muestra suficiente en Speed Insights | $0    |
| A2  | Crear `docs/CONTENT-WORKFLOW.md` y commitear            | Decisión del PO                      | $0    |
| A3  | Evaluar `manualChunks` en `vite.config.ts`              | Solo si LCP móvil > 2.5 s            | $0    |
| A4  | Migración Supabase (schema + auth)                      | Fase 3.5                             | $0    |
| A5  | Backup export/import JSON                               | Baja prioridad                       | $0    |
| A6  | Añadir `screenshots` al manifest PWA (warning opcional) | —                                    | $0    |
| A7  | Warning bundle >500 kB                                  | Solo si CWV lo justifican            | $0    |

---

## Baseline (2026-10-02)

| Métrica         | Valor                            |
| --------------- | -------------------------------- |
| Bundle JS gzip  | 180.87 kB                        |
| CSS gzip        | 10.22 kB                         |
| Precache PWA    | 15 entries · 803.84 kB           |
| Build time      | ~1.4 s                           |
| Tests unitarios | 66/66                            |
| PWA installable | ✅ Chrome                        |
| Web Analytics   | ✅ Funcionando                   |
| Speed Insights  | 🟡 Activo · muestra insuficiente |
| Deploy          | ✅ Auto desde `main`             |
| Costo mensual   | $0                               |

---

## Reglas de oro (Admin)

1. $0 — no pagar sin autorización del PO.
2. No romper producción sin avisar.
3. Documentar cada decisión en `docs/`.
4. Probar en preview deployment antes de publicar.
5. Privacidad de menores (tracking no invasivo).
6. Backup antes de migraciones grandes.
7. Un chat por área; todo pasa por el PO.
8. Fuera de territorio (`src/**`, `index.html`, `public/favicon.svg`) → handoff, no tocar.
9. **No usar `chunkSizeWarningLimit` como fix** — silencia warning, no mejora rendimiento.
10. Nunca renombrar `MenteEnElCaminoDB`.

**Fin del CHANGELOG-ADMIN.**
