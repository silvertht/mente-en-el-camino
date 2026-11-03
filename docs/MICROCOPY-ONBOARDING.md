---

### 2. `MICROCOPY-ONBOARDING.md` (Documento completo)

Crea este archivo en `docs/MICROCOPY-ONBOARDING.md` o adjúntalo directamente al chat principal.

```md
# MICROCOPY-ONBOARDING — Mente en el Camino (Selah)

## 1. Identidad y Tono
- **Marca**: Selah (Pausa. Reflexiona. Aprende.)
- **Público**: Jóvenes de 13 a 25 años.
- **Tono**: Cálido, cercano, no condescendiente. Segunda persona ("tú").
- **Metáfora**: El camino/viaje (senda, paso, punto de partida).
- **Prohibido**: "Examen", "Test", "Evaluación", "¡Felicidades!", "Usuario", "Completado".
- **Regla de oro**: Frases de máximo 12 palabras. Nada de párrafos largos. Mobile-first.

---

## 2. PANTALLA 1 (Bienvenida + Pregunta 1)

| Elemento             | Texto exacto                                 | Notas / A11y                                                     |
| -------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| Título (H1)          | "Te damos la bienvenida al camino."          | Fuente grande, `GradientText`.                                   |
| Subtítulo 1          | "No es un examen. Es tu punto de partida."   | Énfasis en "No es un examen".                                    |
| Subtítulo 2          | "Tus respuestas ajustan el reto a tu nivel." | Explica el _porqué_ sin jerga técnica.                           |
| Progreso             | "Paso 1 de 3"                                | `aria-label="Paso 1 de 3 en el onboarding"`                      |
| Pregunta             | "¿Quién construyó el arca?"                  | -                                                                |
| Opciones (Botones)   | "Moisés" · "Noé" · "Abraham" · "David"       | `aria-label="Seleccionar opción: Noé"`                           |
| Feedback Correcto    | "Así es. Noé. Génesis 6:14."                 | `aria-live="polite"`                                             |
| Feedback Explicativo | "El arca fue refugio del primer pacto."      | Se muestra debajo del versículo.                                 |
| Feedback Incorrecto  | "Casi. La respuesta es Noé."                 | Sin castigar el error.                                           |
| Botón Continuar      | "Continuar"                                  | `aria-label="Continuar al paso 2"` (se habilita tras responder). |

---

## 3. PANTALLA 2 (Pregunta 2)

_Nota: En esta pantalla desaparece la bienvenida y el foco está en la pregunta y el progreso._

| Elemento             | Texto exacto                                | Notas / A11y                                |
| -------------------- | ------------------------------------------- | ------------------------------------------- |
| Progreso             | "Paso 2 de 3"                               | `aria-label="Paso 2 de 3 en el onboarding"` |
| Pregunta             | "¿Cuántos días ayunó Jesús en el desierto?" | -                                           |
| Opciones (Botones)   | "7" · "21" · "40" · "50"                    | `aria-label="Seleccionar opción: 40"`       |
| Feedback Correcto    | "Así es. 40. Mateo 4:2."                    | `aria-live="polite"`                        |
| Feedback Explicativo | "Jesús venció la tentación con la Palabra." | -                                           |
| Feedback Incorrecto  | "Casi. La respuesta es 40."                 | -                                           |
| Botón Continuar      | "Continuar"                                 | `aria-label="Continuar al paso 3"`          |

---

## 4. PANTALLA 3 (Pregunta 3 + Cierre)

| Elemento             | Texto exacto                                          | Notas / A11y                                                                                 |
| -------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Progreso             | "Paso 3 de 3"                                         | `aria-label="Paso 3 de 3 en el onboarding"`                                                  |
| Pregunta             | "¿Qué profeta fue llevado al cielo en un torbellino?" | -                                                                                            |
| Opciones (Botones)   | "Eliseo" · "Elías" · "Enoc" · "Isaías"                | `aria-label="Seleccionar opción: Elías"`                                                     |
| Feedback Correcto    | "Así es. Elías. 2 Reyes 2:11."                        | `aria-live="polite"`                                                                         |
| Feedback Explicativo | "El torbellino no lo venció: lo llevó."               | -                                                                                            |
| Feedback Incorrecto  | "Casi. La respuesta es Elías."                        | -                                                                                            |
| Texto de Cierre      | "Todo listo. Tu camino empieza aquí."                 | Aparece tras responder la P3.                                                                |
| Botón Final          | "Comenzar"                                            | `aria-label="Comenzar tu camino en Selah"` (dispara `completeOnboarding` y redirige a Home). |

---

## 5. Transiciones y Accesibilidad Global

- **Transición entre pasos**: Sin animaciones de carga largas. `prefers-reduced-motion` respetado (fade rápido o cambio seco).
- **Foco**: Al responder, el foco de teclado se mueve al bloque de feedback. Al pasar de paso, el foco vuelve al encabezado "Paso X de 3".
- **Contraste**: Texto blanco sobre fondos `noche-900` (AA validado). Botones de opción con fondo `noche-800` y borde `noche-700` (cambia a `alba-500` al seleccionar).
- **Lectores de pantalla**: El feedback se inyecta en un div con `aria-live="polite"` y `aria-atomic="true"`.
