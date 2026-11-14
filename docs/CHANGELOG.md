# CHANGELOG — Selah

### 2026-11-14 — 🏆 CIERRE OFICIAL DE LA FASE 5: "ESPACIO DE DISCIPULADO"

**Entregado y estabilizado:**

- **UX**: Microcopy v0.1.1, prohibición de "Completado", feedback de 4 partes RVR1960.
- **Visual**: 27 componentes, router state-based, a11y §15, Quality Pass (TV1-TV8) tras feedback de usuarios.
- **Funcional**: Stores con Dexie snake_case, 4 selectores reales, API multiplayer canónica. 212 tests verdes.
- **Admin**: Migración PWA de `generateSW` a `injectManifest`. Fix de seguridad crítico: `registerType: prompt` (evita pérdida de progreso).

**Incidentes P0 y Resoluciones (QA Real):**

- **Bug B1**: Todas las respuestas salían mal. Causa: `correctIndex: 0` hardcodeado en contenido. Fix: Distribución correcta + test de integración de 54 aserciones.
- **Bug P0 (Race Condition)**: La UI respondía antes de que Dexie terminara de cargar. Fix: Pasar contexto explícito a `responderCheck`.
- **Bug P0 (Dexie)**: TypeError `reading 'put'`. Causa: Desajuste entre `camelCase` (store) y `snake_case` (schema). Fix: Unificación a `snake_case`.
- **Bug P0 (Caché)**: Vercel y Service Worker sirviendo código viejo. Fix: Redeploy forzado + limpieza de cache en clientes.

**Commits de cierre en origin/main:**

- `45bf28c` fix(fase5.1): B1 - Fix Dexie snake_case + contexto responderCheck + test integracion
- `cee72b2` fix(fase5.1): TV1-TV8 app funciona end-to-end + contexto en responderCheck
