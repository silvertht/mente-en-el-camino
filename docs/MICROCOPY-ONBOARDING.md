# MICROCOPY-ONBOARDING — Mente en el Camino (Selah)

## 1. Identidad y Tono

- **Marca**: Selah (Pausa. Reflexiona. Aprende.)
- **Público**: Jóvenes de 13 a 25 años.
- **Tono**: Cálido, cercano, no condescendiente. Segunda persona ("tú").
- **Prohibido**: "Examen", "Test", "Evaluación", "¡Felicidades!", "Usuario", "Completado".
- **Regla de oro**: Frases de máximo 12 palabras. Mobile-first.

## 2. Pantalla 1 (Bienvenida + Pregunta 1)

- **Título**: "Te damos la bienvenida al camino."
- **Subtítulo**: "No es un examen. Es tu punto de partida. Tus respuestas ajustan el reto a tu nivel."
- **Progreso**: "Paso 1 de 3" (`aria-label="Paso 1 de 3 en el onboarding"`).
- **Pregunta**: "¿Quién construyó el arca?" (Opciones: Moisés, Noé, Abraham, David).
- **Feedback**: "Así es. Noé. Génesis 6:14. El arca fue refugio del primer pacto." (`aria-live="polite"`).
- **Botón**: "Continuar" (`aria-label="Continuar al paso 2"`).

## 3. Pantalla 2 (Pregunta 2)

- **Progreso**: "Paso 2 de 3".
- **Pregunta**: "¿Cuántos días ayunó Jesús en el desierto?" (Opciones: 7, 21, 40, 50).
- **Feedback**: "Así es. 40. Mateo 4:2. Jesús venció la tentación con la Palabra."
- **Botón**: "Continuar" (`aria-label="Continuar al paso 3"`).

## 4. Pantalla 3 (Pregunta 3 + Cierre)

- **Progreso**: "Paso 3 de 3".
- **Pregunta**: "¿Qué profeta fue llevado al cielo en un torbellino?" (Opciones: Eliseo, Elías, Enoc, Isaías).
- **Feedback**: "Así es. Elías. 2 Reyes 2:11. El torbellino no lo venció: lo llevó."
- **Cierre**: "Todo listo. Tu camino empieza aquí."
- **Botón**: "Comenzar" (`aria-label="Comenzar tu camino en Selah"`).

## 5. Transiciones y A11y

- Foco al heading al cambiar de paso (`tabIndex={-1}`).
- Feedback en contenedor con `aria-live="polite"` y `aria-atomic="true"`.
- Botones de opción con `min-h-[44px]` y `w-full`.
- `prefers-reduced-motion` respetado en las animaciones de feedback y Splash.
