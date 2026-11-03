# ADMIN-INTERFACES — Cómo Admin se liga con los otros chats

> Documento de referencia operativa. Define canales, protocolos y fronteras
> entre el chat Admin y los otros chats (Maestro, Funcional, Visual, UX).
> NO describe contenido de trabajo — solo cómo se transporta y a quién
> corresponde cada archivo.

**Owner**: Admin · **Última actualización**: 2026-10-02

---

## 1. Principio transversal

- **Cero comunicación directa** entre chats.
- Todo mensaje viaja por el **product owner (chat maestro)**.
- El chat Admin **emite handoffs escritos**, no aplica cambios fuera de su territorio.
- Toda aceptación vuelve vía PO como "handoff cerrado".

---

## 2. Canales (qué entrego / qué recibo por chat)

### Chat Maestro

| Dirección       | Contenido                                                                                                         | Formato         |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | --------------- |
| Admin → Maestro | Bloque propuesto para `CHANGELOG.md` global · reporte ejecutivo · lista de pendientes · propuesta de priorización | Bloque markdown |
| Maestro → Admin | Tareas nuevas · decisiones · confirmaciones "handoff aplicado" · cambios de prioridad                             | Mensaje directo |

### Chat Funcional

| Dirección                  | Contenido                                                                                                                       | Formato                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Admin → Funcional          | Handoffs técnicos que tocan `src/**` (lazy load, dynamic import, cambios de schema) · `CONTENT-WORKFLOW.md` como guía operativa | `HANDOFF-ADMIN→FUN-NNN` |
| Funcional → Admin (vía PO) | Confirmación de aplicación · tests pasando · build sin warnings nuevos                                                          | Mensaje                 |

### Chat Visual

| Dirección               | Contenido                                                                                                 | Formato                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------- |
| Admin → Visual          | Handoffs que tocan `index.html`, `public/favicon.svg`, `src/components/**` (metas, preload, CLS, favicon) | `HANDOFF-ADMIN→VIS-NNN` |
| Visual → Admin (vía PO) | Confirmación de aplicación                                                                                | Mensaje                 |

### Chat UX

| Dirección           | Contenido                                                               | Formato                |
| ------------------- | ----------------------------------------------------------------------- | ---------------------- |
| Admin → UX          | Handoffs de microcopy y textos visibles (rebrand, terminología, flujos) | `HANDOFF-ADMIN→UX-NNN` |
| UX → Admin (vía PO) | Confirmación de aplicación                                              | Mensaje                |

---

## 3. Frontera de archivos

| Archivo                            |     Admin      | Funcional  |   Visual    |       UX       |
| ---------------------------------- | :------------: | :--------: | :---------: | :------------: |
| `vite.config.ts`                   |       ✅       |     ❌     |     ❌      |       ❌       |
| `package.json` (deps)              |       ✅       |     ✅     |     ❌      |       ❌       |
| `vercel.json`                      |       ✅       |     ❌     |     ❌      |       ❌       |
| `docs/`                            |   ✅ (admin)   | ✅ (suyos) |     ❌      |       ❌       |
| `.gitignore` · `README.md`         |       ✅       |     ❌     |     ❌      |       ❌       |
| `public/pwa-*.png` · `manifest`    |       ✅       |     ❌     |     ❌      |       ❌       |
| `public/favicon.svg`               |       ❌       |     ❌     |     ✅      |       ❌       |
| `index.html`                       |       ❌       |     ❌     |     ✅      | ✅ (microcopy) |
| `src/**`                           |       ❌       |     ✅     | ✅ (visual) |    ✅ (UX)     |
| `MenteEnElCaminoDB` (schema Dexie) | ❌ (prohibido) |     ✅     |     ❌      |       ❌       |

---

## 4. Protocolo de handoff

Formato único (Admin emite, otras áreas reciben):
