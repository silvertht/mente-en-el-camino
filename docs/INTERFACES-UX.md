# INTERFACES-UX — Mente en el Camino (Selah)

Documento de **contratos formales de colaboración** entre el área UX y las demás áreas del proyecto. Define qué se entrega, qué se recibe, cómo se resuelven conflictos y quién decide en cada caso.

---

## Metadatos del documento

| Campo                   | Valor                                                                     |
| ----------------------- | ------------------------------------------------------------------------- |
| Área origen             | UX                                                                        |
| Proyecto                | Mente en el Camino (marca pública: Selah)                                 |
| Fase activa             | 3                                                                         |
| Última actualización    | 2026-10-01                                                                |
| Documentos relacionados | `CONTEXT-UX.md`, `CHANGELOG-UX.md`, `CHANGELOG.md` (global), `PROJECT.md` |
| Estado                  | Activo                                                                    |

---

## Índice

1. Principio general
2. Protocolo de handoff
3. UX ↔ Product Owner
4. UX ↔ Funcional
5. UX ↔ Visual
6. UX ↔ Admin
7. Zonas grises (por determinar)
8. Protocolo de cierre de handoff
9. Escalado
10. Plantillas
11. Ejemplos históricos
12. Log de handoffs

---

## 1. Principio general

UX trabaja en la frontera entre lo visual y lo funcional, pero **no invade ninguno de los dos**. Su aporte es el **diseño del recorrido del usuario**: qué ve, en qué orden, con qué texto, con qué fricción y con qué accesibilidad.

Cuando una tarea UX necesita cambiar un archivo de otra área:

1. UX **no lo modifica**.
2. UX **redacta un handoff**.
3. El PO decide a qué área lo deriva.
4. El área destino implementa.
5. UX **verifica en disco** que el cambio está aplicado.
6. UX cierra el handoff en `CHANGELOG-UX.md`.

---

## 2. Protocolo de handoff

### 2.1 Anatomía de un handoff UX

Todo handoff UX debe contener:

| Campo                   | Descripción                                                                  | Obligatorio |
| ----------------------- | ---------------------------------------------------------------------------- | ----------- |
| ID                      | `H-NN` (entregado) o `H-RNN` (recibido)                                      | Sí          |
| Contexto                | Por qué se necesita el cambio (feedback, auditoría, accesibilidad, deuda UX) | Sí          |
| Archivo(s) destino      | Rutas exactas                                                                | Sí          |
| Cambio propuesto        | Descripción funcional del cambio                                             | Sí          |
| Criterios de aceptación | Cómo se verifica que quedó bien                                              | Sí          |
| Prioridad               | Alta / Media / Baja                                                          | Sí          |
| Impacto si no se hace   | Qué se degrada en la experiencia                                             | Sí          |
| Snippet (opcional)      | Ejemplo de código propuesto                                                  | No          |

### 2.2 Formato en `CHANGELOG-UX.md`
