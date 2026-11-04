# CHANGELOG-UX — Mente en el Camino (Selah)

Registro cronológico exclusivo del área UX.
Para cambios de otras áreas: `CHANGELOG.md` (global).
Para contratos inter-área: `INTERFACES-UX.md`.
Para contexto maestro del área: `CONTEXT-UX.md`.

---

## Metadatos

| Campo                | Valor                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Área                 | Experiencia de Usuario (UX)                                                                                  |
| Proyecto             | Mente en el Camino (marca pública: Selah)                                                                    |
| Fase activa          | 4 (Fase B: Implementación Onboarding)                                                                        |
| Última actualización | 2026-11-04                                                                                                   |
| Estado del área      | Onboarding.tsx + Gate App.tsx implementados y verificados. Esperando revisión del Maestro (sin push a main). |

---

## 1. Estado del área (snapshot 2026-11-04)

| Métrica                     | Valor                                            |
| --------------------------- | ------------------------------------------------ |
| Fase activa                 | 4 (Fase B)                                       |
| Handoffs cerrados           | 7 (H-02.1, H-02.2-A, H-03, H-04, H-05, H-06, D4) |
| Handoffs abiertos           | 1 (H-01 opcional)                                |
| Tareas propias activas      | 0 (Onboarding implementado, esperando revisión)  |
| Hallazgos abiertos          | 0                                                |
| Bugs funcionales detectados | 0                                                |
| Tests unitarios             | **152/152** (verificado 2026-11-04)              |
| Bundle gzip                 | **184.03 kB** (verificado 2026-11-04)            |
| Build                       | Limpio (477 modules)                             |

---

## 2. Cierre documental previo (C1-C3)

- **C1 (Componentes)**: Verificado. `Card`/`Button` son clases inline (Tailwind). `GradientText` es componente real. **H-06 retirado** definitivamente.
- **C2 (No persistencia parcial)**: Confirmado. El estado del onboarding vive en memoria (`useState`). Cierre de app a mitad = reinicio en Paso 1.
- **C3 (Cierre Paso 3)**: Implementado. "Todo listo. Tu camino empieza aquí." aparece bajo el feedback. Botón cambia a "Comenzar". Bienvenida solo en `step === 0`.

---

## 3. Contrato Funcional A1-A3 respetado

- **A1 (No partida)**: `Onboarding.tsx` **no** llama a `startGame()` ni `answerQuestion()`. Recolecta `boolean[]` (longitud exacta 3) y llama directamente a `completeOnboarding(results)`.
- **A2 (Gate async)**: `App.tsx` usa `useState<boolean | null>`. Renderiza un `<Splash />` mientras es `null`. `catch` hace `fail-open` a `Home` con `console.warn`.
- **A3 (Import directo)**: Usa `import { onboardingQuestions } from "../data/onboardingQuestions";`. Prohibido `getQuestionsByCategory`.

---

## 4. Evidencia de Implementación (Fase B)

| Archivo                           | Acción     | Detalle                                                              |
| --------------------------------- | ---------- | -------------------------------------------------------------------- |
| `src/screens/Onboarding.tsx`      | Creado     | 3 pasos, feedback a11y, manejo de error, sin botón atrás.            |
| `src/App.tsx`                     | Modificado | Gate con Splash (pulse sutil), fail-open. Routing existente intacto. |
| `src/screens/Onboarding.test.tsx` | Creado     | Test de humo: renderiza sin crashear.                                |

**Resultados de verificación en disco (2026-11-04)**:

- **Build**: `✓ 477 modules transformed` · Limpio (0 errores TS).
- **Tests**: `152/152 passed` (8 archivos de test, incluye el de humo de UX).
- **Bundle gzip**: **184.03 kB** (antes 182.34 kB → **+1.69 kB**).
- **Precache PWA**: 15 entries · 815.99 KiB.
- **Prueba manual móvil**: Pendiente de validación del PO en su entorno local.

**Commit sugerido**: `feat(ux): onboarding screen + gate en App.tsx (Fase B)`
_(Sin push a main hasta revisión del Maestro)._

---

## 5. Historial cronológico

### 5.1 Fase 4

#### 2026-11-04 — Implementación Onboarding (Fase B)

**Origen**: El Maestro aprueba el Plan Fase A y Funcional entrega H-04/H-05 (merge a main). UX procede a escribir el código.

- **Creado**: `src/screens/Onboarding.tsx` con máquina de estados, a11y y A1.
- **Modificado**: `src/App.tsx` con el Gate A2 (Splash, fail-open).
- **Creado**: `src/screens/Onboarding.test.tsx` (test de humo).
- **Verificación**: Build limpio, 152/152 tests, bundle 184.03 kB (+1.69 kB).
- **Estado**: Pendiente de commit y push por revisión del Maestro.

---

## 6. Convenciones

- **Entradas**: una por jornada, fecha ISO (`YYYY-MM-DD`).
- **IDs de handoff**: `H-NN` (entregado) · `H-RNN` (recibido). No se reutilizan.
- **Estados**: ✅ cerrado · ⏸ pendiente/bloqueado · 📝 redactado · 🟢 opcional · ⚠️ conflicto · ❌ retirado.
- **Regla de verificación**: ningún handoff se cierra sin verificación en disco.
- **Al aplicar parches de diff**: verificar que el `+` del diff **no** se copia al archivo. Los tests unitarios no detectan errores de sintaxis en screens no cubiertas; `npm run build` sí.
- **React.memo**: Aislar hooks con `useState` en hijos requiere `React.memo` para cortar la propagación del re-render al padre (confirmado en H-02.2-A).

---

**Fin de `CHANGELOG-UX.md` (Fase 4 · 2026-11-04).**
