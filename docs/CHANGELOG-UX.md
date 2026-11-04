# CHANGELOG-UX — Mente en el Camino (Selah)

Registro cronológico exclusivo del área UX.
Para cambios de otras áreas: `CHANGELOG.md` (global).
Para contratos inter-área: `INTERFACES-UX.md`.
Para contexto maestro del área: `CONTEXT-UX.md`.

---

## Metadatos

| Campo                | Valor                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Área                 | Experiencia de Usuario (UX)                                                                                                |
| Proyecto             | Mente en el Camino (marca pública: Selah)                                                                                  |
| Fase activa          | 4 (Fase B: Onboarding + Tests de Flujo)                                                                                    |
| Última actualización | 2026-11-04                                                                                                                 |
| Estado del área      | Onboarding.tsx + App.tsx implementados. Tests de flujo T1-T3 añadidos. Pendiente de revisión final del Maestro para merge. |

---

## 1. Estado del área (snapshot 2026-11-04)

| Métrica                     | Valor                                            |
| --------------------------- | ------------------------------------------------ |
| Fase activa                 | 4 (Fase B)                                       |
| Handoffs cerrados           | 7 (H-02.1, H-02.2-A, H-03, H-04, H-05, H-06, D4) |
| Handoffs abiertos           | 1 (H-01 opcional)                                |
| Tareas propias activas      | 0 (Onboarding implementado y testeado)           |
| Hallazgos abiertos          | 0                                                |
| Bugs funcionales detectados | 0                                                |
| Tests unitarios             | **165/165** (verificado 2026-11-04)              |
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
- **A3 (Import directo)**: Usa `import { onboardingQuestions } from "../data/onboardingQuestions";`.

---

## 4. Evidencia de Implementación y Tests (Fase B)

| Archivo                           | Acción     | Detalle                                                              |
| --------------------------------- | ---------- | -------------------------------------------------------------------- |
| `src/screens/Onboarding.tsx`      | Creado     | 3 pasos, feedback a11y, manejo de error, sin botón atrás.            |
| `src/App.tsx`                     | Modificado | Gate con Splash (pulse sutil), fail-open. Routing existente intacto. |
| `src/screens/Onboarding.test.tsx` | Modificado | Tests de flujo T1-T3 + opcionales (doble clic, aria-live).           |

**Resultados de verificación en disco (2026-11-04)**:

- **Build**: `✓ 477 modules transformed` · Limpio (0 errores TS).
- **Tests**: `165/165 passed` (8 archivos de test, incluye T1, T2, T3 y opcionales).
- **Bundle gzip**: **184.03 kB** (sin cambio por tests, es el mismo de Fase B).
- **Precache PWA**: 15 entries · 815.99 KiB.
- **Prueba manual móvil**: Pendiente de validación del PO en su entorno local.

**Commit sugerido**: `test(ux): cobertura de flujo de onboarding (T1-T3)`

---

## 5. Historial cronológico

### 5.1 Fase 4

#### 2026-11-04 — Implementación Onboarding y Tests de Flujo (Fase B)

**Origen**: El Maestro aprueba el Plan Fase A y Funcional entrega H-04/H-05 (merge a main). UX procede a escribir el código y los tests de flujo exigidos por el Maestro para desbloquear el merge.

- **Creado**: `src/screens/Onboarding.tsx` con máquina de estados, a11y y A1.
- **Modificado**: `src/App.tsx` con el Gate A2 (Splash, fail-open).
- **Modificado**: `src/screens/Onboarding.test.tsx` añadiendo T1 (3 correctas), T2 (3 incorrectas), T3 (error + retry) y opcional de doble clic.
- **Verificación**: Build limpio, 165/165 tests, bundle 184.03 kB.
- **Estado**: Pendiente de revisión final del Maestro y merge a main.

---

## 6. Convenciones

- **Entradas**: una por jornada, fecha ISO (`YYYY-MM-DD`).
- **IDs de handoff**: `H-NN` (entregado) · `H-RNN` (recibido). No se reutilizan.
- **Estados**: ✅ cerrado · ⏸ pendiente/bloqueado · 📝 redactado · 🟢 opcional · ⚠️ conflicto · ❌ retirado.
- **Regla de verificación**: ningún handoff se cierra sin verificación en disco.
- **Al aplicar parches de diff**: verificar que el `+` del diff **no** se copia al archivo.
- **React.memo**: Aislar hooks con `useState` en hijos requiere `React.memo` para cortar la propagación del re-render al padre (confirmado en H-02.2-A).

---

**Fin de `CHANGELOG-UX.md` (Fase 4 · 2026-11-04).**
