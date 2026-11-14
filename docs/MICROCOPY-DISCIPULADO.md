# MICROCOPY-DISCIPULADO — Mente en el Camino (Selah)

## Metadatos

| Campo                    | Valor                                                      |
| :----------------------- | :--------------------------------------------------------- |
| **Versión**              | 0.1.1                                                      |
| **Fase**                 | 5 (cerrada)                                                |
| **Última actualización** | 2026-11-14                                                 |
| **Referencia cruzada**   | `MICROCOPY-ONBOARDING.md` (tono, patrón de feedback, a11y) |
| **Decisiones aplicadas** | D1, D2, D4, P1–P10, I1–I5                                  |
| **Estado**               | Vivo. Pendiente validación con `FEEDBACK.md` real (D5/P9). |

---

## 1. Identidad y tono

- **Marca:** Selah (Pausa. Reflexiona. Aprende.)
- **Público:** jóvenes de 13 a 25 años.
- **Tono:** cálido, cercano, no condescendiente. Segunda persona ("tú").
- **Frases:** máximo 12 palabras. Mobile-first.
- **Tono pastoral (INMUTABLE):** Casa del Alfarero (Jeremías 18:1-6). El jugador es barro en proceso. El error es parte del modelado, no fracaso.
- **Concordancia de género:** revisión obligatoria antes de tocar código.

---

## 2. Palabras prohibidas y sustitutos (INMUTABLE)

| Prohibida     | Sustituto canónico                    |
| :------------ | :------------------------------------ |
| Examen        | "reflexión"                           |
| Test          | "prueba", "verificación"              |
| Evaluación    | "reflexión"                           |
| ¡Felicidades! | "Así es."                             |
| Usuario       | "jugador", "tú"                       |
| Completado    | "Recorrida" / "Recorrido", "recorrer" |

---

## 3. Términos canónicos

| Término                   | Género     | Definición                                           |
| :------------------------ | :--------- | :--------------------------------------------------- |
| **Senda**                 | fem.       | Las 9 categorías de trivia. Eje temático.            |
| **Nivel**                 | masc.      | Etapa dentro de una Senda.                           |
| **Lección**               | fem.       | Unidad dentro de un Nivel.                           |
| **Recorrida / Recorrido** | fem./masc. | Estado de Lección/Senda o Nivel terminado.           |
| **Sendero**               | masc.      | Sinónimo explícito de Senda. Nunca entidad distinta. |

---

## 4. Títulos

| Contexto     | Texto                    |
| :----------- | :----------------------- |
| Tarjeta Home | "Tu camino"              |
| Mapa         | "El Camino"              |
| Senda        | "Senda de [Tema]"        |
| Nivel        | "Nivel [N] · [Nombre]"   |
| Lección      | "Lección [N] · [Título]" |
| Repaso       | "Repaso"                 |
| Multijugador | "Jugar en grupo"         |

---

## 5. CTAs

| Contexto        | Texto                         | `aria-label`                            |
| :-------------- | :---------------------------- | :-------------------------------------- |
| Sin empezar     | "Empezar el camino"           | "Empezar el camino de Discipulado"      |
| En curso        | "Continuar donde lo dejaste"  | "Continuar la lección donde la dejaste" |
| Nivel recorrido | "Explorar el siguiente nivel" | "Explorar el siguiente nivel"           |
| Lección         | "Comenzar" / "Continuar"      | "Comenzar la lección [N]"               |
| Check           | "Responder" / "Reintentar"    | "Responder la reflexión"                |
| Cierre          | "Siguiente lección"           | "Ir a la siguiente lección"             |
| Cierre          | "Volver al camino"            | "Volver al mapa del camino"             |
| Repaso          | "Repasar de nuevo"            | "Repasar esta lección"                  |
| Multijugador    | "Armar partida"               | "Armar una partida en grupo"            |

---

## 6. Mensajes de progreso

- "Lección [N] de [M]"
- "Llevas [N] de [M] lecciones"
- "Te falta poco para el siguiente hito"
- "Estás en el Nivel [N]"
- "Sigues donde lo dejaste"
- "Senda de [Tema]: [N] de [M]"

`aria-label` de progreso: "Lección [N] de [M] en el Nivel [X]".

**UX-3 — Etiqueta de lección con estado (a11y):**

Formato canónico: **"Lección [N] · [Título], [estado]"**

Ejemplos:

- `aria-label="Lección 1 · El arca, lista para empezar"`
- `aria-label="Lección 2 · El diluvio, sigues aquí"`
- `aria-label="Lección 3 · La promesa, recorrida"`

`[PENDIENTE CONFIRMACIÓN PO: confirmar formato de UX-3.]`

---

## 7. Estados de progreso

| Estado                | Etiqueta visible          | Microcopy                          | ¿Abre?           |
| :-------------------- | :------------------------ | :--------------------------------- | :--------------- |
| Sin empezar (lección) | "Lista para empezar"      | "Aquí empieza tu camino."          | Sí               |
| Sin empezar (nivel)   | "Listo para empezar"      | "Aquí empieza tu camino."          | Sí               |
| En curso              | "Sigues aquí"             | "Retoma donde lo dejaste."         | Sí (reanuda)     |
| Recorrida / Recorrido | "Recorrida" / "Recorrido" | "Ya la recorriste. Puedes volver." | Sí (repaso)      |
| Bloqueado             | "Aún no"                  | "Se abre al recorrer [X]."         | No (informativo) |
| Repaso                | "Repaso"                  | "Vuelve cuando quieras."           | Sí               |

Estados distinguibles sin color: forma + icono + texto.

---

## 8. Check — feedback (patrón de 4 partes)

**Patrón heredado de Onboarding:** afirmación + dato + referencia RVR1960 + reflexión breve.

| Caso                   | Patrón                                                          | Ejemplo                                                              |
| :--------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------- |
| Correcto               | "Así es. [Respuesta]. [Referencia]. [Reflexión ≤12 palabras]."  | "Así es. Noé. Génesis 6:14. El arca fue refugio del primer pacto."   |
| Incorrecto (reintento) | "Casi. [Pista ≤12 palabras]. [Referencia]. Inténtalo otra vez." | "Casi. Piensa en quién construyó. Génesis 6:14. Inténtalo otra vez." |
| Reintento libre        | —                                                               | "Puedes intentarlo de nuevo, sin prisa."                             |

Afirmación estándar: "Así es." (D2).
Nunca: "incorrecto", "fallaste", "mal".
Reintento: ilimitado (P6). Sin timer (P8).
Referencia bíblica: RVR1960 (P10).

**Contexto bíblico (INMUTABLE):**
Toda reflexión conecta con un pasaje. El pasaje se cita en RVR1960. El feedback no califica a la persona: acompaña el proceso. Casa del Alfarero: el barro se modela, no se juzga.

`[PENDIENTE CONFIRMACIÓN PO: alcance exacto del "contexto bíblico" en feedback.]`

---

## 9. Felicitaciones e hitos

- "Así es. Has dado un paso más."
- "Nivel recorrido. Se abrió un nuevo tramo del camino."
- "Senda de [Tema] recorrida. Lo llevas contigo."
- "Crecer así se siente."

Nunca "¡Felicidades!". Nunca "Completado".

---

## 10. Bloqueos

- "Aún no — primero termina «[Lección]»."
- "Este tramo se abre al recorrer el Nivel [N]."
- "Vuelve cuando hayas recorrido lo anterior."

---

## 11. Errores

- "Algo no cargó. Reintenta."
- "No pudimos guardar tu avance. Revisa tu conexión."
- "Lo intentaremos de nuevo."
- "No pudimos abrir la lección. Vuelve al camino."
- "No pudimos cargar el camino. Reintenta."

---

## 12. Estados vacíos

- "Tu camino empieza con una lección."
- "Aún no hay lecciones aquí. Vuelve pronto."
- "Aún no tienes lecciones para repasar."

---

## 13. Offline

- "Sin conexión. Puedes seguir con lo descargado."
- "Esto se sincronizará cuando vuelvas a estar en línea."
- "Guarda tu avance y vuelve con conexión."

Nunca borrar progreso local sin aviso.

---

## 14. Multijugador Local (P7)

Alcance: solo trivia general (110 preguntas). Sin mezclar con Discipulado.

| Contexto  | Texto                                       |
| :-------- | :------------------------------------------ |
| Entrada   | "Jugar en grupo"                            |
| Requisito | "Necesitas al menos 2 jugadores."           |
| Carga     | "Preparando preguntas…"                     |
| Error     | "No pudimos iniciar la partida. Reintenta." |
| Offline   | "Solo disponible con conexión."             |
| Fin       | "Otra ronda" / "Volver al inicio"           |

**UX-1 — Handoff de turno entre jugadores:**

Formato canónico: **"Pasa el dispositivo a [nombre]."**

Variantes:

- Primer turno: "Pasa el dispositivo a [nombre]. Empieza [nombre]."
- Turno siguiente: "Pasa el dispositivo a [nombre]."
- Último turno: "Pasa el dispositivo a [nombre]. Es el último turno."

`aria-live="polite"` + `aria-atomic="true"` en el aviso de cambio de turno.

`[PENDIENTE CONFIRMACIÓN PO: confirmar UX-1.]`

**UX-2 — Estado de empate ("Ambos ganan"):**

Fórmula canónica: **"Ambos ganan. [Reflexión pastoral ≤12 palabras]."**

Variantes:

- Empate 2 jugadores: "Ambos ganan. El camino se recorre mejor acompañado."
- Empate 3–4 jugadores: "Todos ganan. El camino se recorre mejor acompañado."

Nunca: "Empate técnico", "Nadie pierde", "Ganaron todos".

`[PENDIENTE CONFIRMACIÓN PO: confirmar UX-2 y tono pastoral del empate.]`

---

## 15. A11y — patrones

- Progreso: `aria-label` "Lección [N] de [M] en el Nivel [X]".
- Lección con estado (UX-3): "Lección [N] · [Título], [estado]".
- Nodo de nivel: "Nivel [N], [estado]".
- Nodo de senda: "Senda [Nombre], [estado]".
- Feedback: `aria-live="polite"` + `aria-atomic="true"`.
- Handoff de turno (UX-1): `aria-live="polite"` + `aria-atomic="true"`.
- Foco al heading al cambiar de pantalla.
- Opciones: `min-h-[44px]` y `w-full`.
- `prefers-reduced-motion`: animaciones no esenciales desactivadas.

---

## 16. Auditoría de tono

| Criterio                                   | Resultado                    |
| :----------------------------------------- | :--------------------------- |
| Cero palabras prohibidas en texto visible  | ✅                           |
| Toda frase ≤12 palabras                    | ✅                           |
| "Así es." como afirmación estándar         | ✅                           |
| Referencia RVR1960 en todo feedback        | ✅                           |
| Concordancia de género revisada            | ✅                           |
| "Recorrida/Recorrido" en todos los estados | ✅                           |
| "Senda" canónico. "Sendero" solo sinónimo. | ✅                           |
| Tono pastoral Casa del Alfarero            | ✅                           |
| UX-1, UX-2, UX-3 documentados              | 🟡 Pendiente confirmación PO |

---

## 17. Changelog del documento

| Versión | Fecha      | Cambios                                                                                   |
| :------ | :--------- | :---------------------------------------------------------------------------------------- |
| 0.1     | 2026-11-11 | Creación. Contrato UX Discipulado. D1, D2, D4, P1–P10, I1–I5.                             |
| 0.1.1   | 2026-11-14 | Añadidos UX-1, UX-2, UX-3. Contexto bíblico. Casa del Alfarero. Cierre documental Fase 5. |
