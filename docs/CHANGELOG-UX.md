# CHANGELOG-UX — Mente en el Camino (Selah)

Registro cronológico exclusivo del área UX.
Para cambios de otras áreas: `CHANGELOG.md` (global).
Para contratos inter-área: `INTERFACES-UX.md`.
Para contexto maestro del área: `CONTEXT-UX.md`.

---

## Metadatos

| Campo                | Valor                                                              |
| -------------------- | ------------------------------------------------------------------ |
| Área                 | Experiencia de Usuario (UX)                                        |
| Proyecto             | Mente en el Camino (marca pública: Selah)                          |
| Fase activa          | 4 (Fase B: Cerrada · Onboarding en producción)                     |
| Última actualización | 2026-11-09                                                         |
| Estado del área      | Completado. Onboarding, Gate y tests en producción (post-fix B-1). |

---

## 1. Estado del área (snapshot 2026-11-09)

| Métrica                     | Valor                                            |
| --------------------------- | ------------------------------------------------ |
| Fase activa                 | 4 (Fase B cerrada)                               |
| Handoffs cerrados           | 7 (H-02.1, H-02.2-A, H-03, H-04, H-05, H-06, D4) |
| Handoffs abiertos           | 1 (H-01 opcional)                                |
| Tareas propias activas      | 0                                                |
| Hallazgos abiertos          | 0                                                |
| Bugs funcionales (post-fix) | 0                                                |
| Tests unitarios             | **164/164** (verificado 2026-11-09)              |
| Bundle gzip                 | **184.03 kB** (verificado 2026-11-04)            |
| Build                       | Limpio (477 modules)                             |
| Producción                  | **✅ Activo (Fix B-1 desplegado)**               |

---

## 2. Incidente B-1 (Post-mortem y Fix)

- **Bug**: `Onboarding.tsx` evaluaba `q.correctAnswer || q.correct || q.answer`, pero las preguntas eran `MultipleChoiceQuestion` (usan `correctIndex`). Esto hacía que la respuesta correcta fuera siempre `undefined`, resultando en calibración a 1000 (mínimo) para todos los usuarios nuevos.
- **Fix (H-FUN-04)**: Aplicado por Funcional y autorizado por el Maestro. Se importó `MultipleChoiceQuestion`, se tipó `const q = onboardingQuestions[step] as MultipleChoiceQuestion;` y se corrigió la extracción a `const correctAnswer = q.options[q.correctIndex];`.
- **Verificación manual (PO)**: 3 correctas → ELO ~1450. 3 incorrectas → ELO 1000. Funcionando.
- **Estado**: En producción (`fix(funcional): corregir evaluación de respuestas en Onboarding`).

---

## 3. Contrato Funcional A1-A3 respetado (y corrección de baseline)

- **A1 (No partida)**: Se mantiene. UX no llama a `startGame()` ni `answerQuestion()`.
- **A2 (Gate async)**: Se mantiene (Splash + fail-open).
- **A3 (Import directo)**: Se mantiene.
- **Corrección de baseline**: UX había reportado erróneamente **165 tests**. El total real previo era **164**. Tras el fix de Funcional, el total real y verificado es **164/164 passing**.

---

## 4. Evidencia de Implementación y Tests (Fase B)

| Archivo                           | Acción           | Detalle                                                                |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `src/screens/Onboarding.tsx`      | Creado           | 3 pasos, feedback a11y, manejo de error, sin botón atrás.              |
| `src/App.tsx`                     | Modificado       | Gate con Splash (pulse sutil), fail-open.                              |
| `src/screens/Onboarding.test.tsx` | Creado/Corregido | Tests T1-T3 (T1/T2 validan arrays correctos, T3 valida error + retry). |

**Commits**:

- `feat(ux): onboarding screen + gate en App.tsx (Fase B)`
- `test(ux): cobertura de flujo de onboarding (T1-T3)` (Corregido por Funcional)
- `fix(funcional): corregir evaluación de respuestas en Onboarding (H-FUN-04)`

---

## 5. Historial cronológico

### 5.1 Fase 4

#### 2026-11-09 — Cierre de Fase B y Post-mortem del Bug B-1

- Se confirma el fix en producción del Bug B-1 (evaluación de `correctIndex` en lugar de propiedades inexistentes).
- UX asume el fallo del smoke test original y de los tests de flujo que replicaban la lógica del bug.
- Se corrige el baseline de tests a 164 (el 165 anterior era un falso positivo por el test mal implementado).
- Onboarding en producción, calibrando usuarios correctamente (ELO 1000 a 1450).

#### 2026-11-05 — Implementación Onboarding y Tests de Flujo (Fase B)

- **Creado**: `src/screens/Onboarding.tsx` con máquina de estados y A1.
- **Modificado**: `src/App.tsx` con el Gate A2 (Splash, fail-open).
- **Creado**: `src/screens/Onboarding.test.tsx` (T1-T3). _(Nota: posteriormente corregidos por Funcional)._

---

## 6. Convenciones (NUEVA REGLA CRÍTICA)

- **Entradas**: una por jornada, fecha ISO (`YYYY-MM-DD`).
- **IDs de handoff**: `H-NN` (entregado) · `H-RNN` (recibido). No se reutilizan.
- **Estados**: ✅ cerrado · ⏸ pendiente/bloqueado · 📝 redactado · 🟢 opcional · ⚠️ conflicto · ❌ retirado.
- **Al aplicar parches de diff**: verificar que el `+` del diff **no** se copia al archivo.
- **React.memo**: Aislar hooks con `useState` en hijos requiere `React.memo` para cortar la propagación del re-render al padre.
- **REGLA DE TESTING (Lección de B-1)**:
  1. Todo componente que consuma datos de otra área **requiere al menos un test de COMPORTAMIENTO real**, no solo un smoke test ("renderiza sin crashear").
  2. Los tests **NO deben duplicar la lógica del componente** (el error original fue que el test simulaba la respuesta leyendo la misma propiedad incorrecta).
  3. Los tests deben validar el **comportamiento observable**: qué feedback se renderiza en pantalla y qué argumentos exactos (ej. `[true, true, true]`) se pasan a las funciones externas.

---

**Fin de `CHANGELOG-UX.md` (Fase 4 · 2026-11-09).**
