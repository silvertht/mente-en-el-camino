# INTERFACES-UX — Handoffs entregados (Sección 3)

### H-04 — `completeOnboarding(results: boolean[]): Promise<void>` + flag `onboardingCompleted`

| Campo            | Contenido                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| ID               | H-04                                                                                             |
| Destino          | Funcional                                                                                        |
| Prioridad        | Alta                                                                                             |
| Estado           | 📝 Spec formal redactada. Pendiente implementación Funcional.                                    |
| Contexto         | Onboarding necesita persistir (a) el rating calibrado y (b) el flag "ya pasó", de forma atómica. |
| Archivos destino | `src/store/useGameStore.ts` · `src/db/database.ts` (solo si añade campo)                         |
| Territorio       | Funcional                                                                                        |

**Contrato preferido (atómico)**:

```ts
completeOnboarding(results: boolean[]): Promise<void>
```
