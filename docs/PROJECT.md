# PROJECT — Selah

## ESTADO GLOBAL (Fase 5 Cerrada - Inicio Fase 6)

| Área      | Estado                            | Pendiente Real (Fase 6)                     |
| --------- | --------------------------------- | ------------------------------------------- |
| Funcional | 🟢 212 tests, B1 y Race Cond. fix | Arquitectura Multijugador Online (Supabase) |
| Visual    | 🟢 27 componentes, Router listo   | UI "Nueva versión PWA", manualChunks        |
| UX        | 🟢 v0.1.1, flujo validado         | Rediseño devocional (B4), Copy Push         |
| Admin     | 🟢 PWA injectManifest             | Push Notifications, Fix Sourcemaps          |

**Métricas Clave (Cierre Fase 5):**

- Tests: 212/212 (16 archivos).
- Bundle Inicial: 33.68 kB gzip (Gate <= 35 kB).
- Chunks Lazy: 5 (ElCamino, Leccion, CierreLeccion, JugarEnGrupo, EstadoOffline).
- LCP: 2.0s. Costo: $0/mes.
- Precache PWA: 885 KiB (32 entries).

**Deuda Técnica Documentada (Fase 6):**

- H-ADM-01b/c/d (Precache optimization, UI update, bump evangelios).
- 17 comentarios legacy "usuario/test".
- Sourcemap expuesto en producción.
- Tests de integración UI (evitar futuras Race Conditions).
