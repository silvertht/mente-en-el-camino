# INTERFACES-UX — Mente en el Camino (Selah)

Documento de contratos formales de colaboración entre el área UX y las demás áreas del proyecto.

## 1. Handoffs Entregados (Cerrados)

### H-VIS-05 — Modal de Instalación PWA

| Campo        | Contenido                                                                                                                                      |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID**       | H-VIS-05                                                                                                                                       |
| **Destino**  | Visual                                                                                                                                         |
| **Contexto** | Tras completar el Onboarding, UX determinó que es el momento óptimo para sugerir la instalación de la PWA, sin interrumpir la primera partida. |
| **Archivo**  | `src/components/PwaInstallModal.tsx` (y trigger en `App.tsx` o `Home.tsx`).                                                                    |
| **Cambio**   | Modal nativo con fondo `noche-800`, texto cálido, botón "Instalar" (alba-500) y botón "Más tarde" (texto plano).                               |
| **Estado**   | ✅ **Cerrado**. Implementado por Visual y verificado por UX.                                                                                   |

### H-FUN-04 — Fix Bug B-1 (Evaluación Onboarding)

| Campo        | Contenido                                                                                                                        |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **ID**       | H-FUN-04                                                                                                                         |
| **Destino**  | Funcional                                                                                                                        |
| **Contexto** | `Onboarding.tsx` evaluaba mal las respuestas (`correctAnswer` en vez de `correctIndex`), calibrando a todos los usuarios a 1000. |
| **Cambio**   | Funcional corrigió el tipado a `MultipleChoiceQuestion` y el acceso a `q.options[q.correctIndex]`.                               |
| **Estado**   | ✅ **Cerrado**. En producción.                                                                                                   |

### H-04 / H-05 — Onboarding (Lógica y Datos)

- **Estado**: ✅ **Cerrado**. Funcional implementó `completeOnboarding` y `onboardingQuestions`.

---

## 2. Handoffs Pendientes (Abiertos)

_Actualmente no hay handoffs abiertos bloqueantes para UX._
