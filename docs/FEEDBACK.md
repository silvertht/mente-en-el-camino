# FEEDBACK DE TESTERS — Mente en el Camino

## Test #1 — Septiembre 2026

**Participantes**: 5 jóvenes
**Método**: Uso libre + formulario post-sesión
**Dispositivos**: Varios (algunos de gama baja/media)

---

## 🎯 Resultados brutos

### 1. Rendimiento

- **Algunos teléfonos sintieron la interfaz pesada y lenta.**

### 2. Sistema de preguntas

- **Las preguntas trampa molestan** cuando aparecen mezcladas con fáciles.
- Sugerencia textual: "que dichas preguntas solo tengan un porcentaje de visualización si el usuario se ve sobrecalificado para las preguntas fáciles".

### 3. Percepción general

- **La plataforma se siente vacía.**
- **Carece de principios** (ambiguo — ver análisis abajo).
- **No es tan amigable con el usuario.**

---

## 🔍 Análisis técnico

### Problema 1: Rendimiento

**Causa probable**: el `AnimatedBackground` tiene demasiadas animaciones simultáneas
(60 estrellas + 3 blobs + rayos + grano + viñeta). Además hay varios `backdrop-blur`
que son costosos en GPU móvil.

**Chat responsable**: Visual (optimización) + Funcional (medir con Web Vitals).
**Prioridad**: 🔥 Alta.

### Problema 2: Dificultad adaptativa

**Causa**: el algoritmo de `pickRandomQuestions` mezcla dificultades sin considerar
el desempeño del jugador.

**Solución propuesta**: implementar sistema de dificultad adaptativa que:

- Si accuracy > 70% en últimas 20 respuestas → subir dificultad promedio.
- Si accuracy < 40% → bajar dificultad.
- Las preguntas "trampa" (hint-deduction, dificultad difícil) solo aparecen si:
  - Nivel del jugador ≥ 3, Y
  - Accuracy reciente > 65%.

**Chat responsable**: Funcional.
**Prioridad**: 🔥 Alta.

### Problema 3: "Vacía" y "sin principios"

**Ambiguo**. Necesita clarificación con los testers. Hipótesis posibles:

**A)** Falta onboarding que explique el propósito.
**B)** Falta identidad cristiana más visible (versículos, mensajes, reflexiones).
**C)** Falta contenido/recompensas (logros, misiones, progresión clara).
**D)** Falta calidez humana (microcopy frío, sin personalidad).

**Chat responsable**: UX (flujo) + Visual (cambios visuales).
**Prioridad**: 🔥 Media-Alta, pero PRIMERO clarificar con testers.

---

## 📋 Acciones inmediatas

### Antes de que los chats especializados empiecen

- [ ] Preguntar a los 5 testers qué significa "vacío" y "sin principios" con
      preguntas específicas (ver sección "Preguntas de clarificación" abajo).
- [ ] Confirmar en qué teléfonos exactos se sintió lento (marca y modelo si posible).
- [ ] Preguntar qué preguntas específicas sintieron como "trampa".

### Sprints por área

| Área      | Primera tarea                               | Prioridad |
| --------- | ------------------------------------------- | --------- |
| Funcional | Dificultad adaptativa                       | 🔥 Alta   |
| Visual    | Optimizar AnimatedBackground                | 🔥 Alta   |
| UX        | Clarificar "vacío" y diseñar onboarding     | 🔥 Alta   |
| Admin     | Medir rendimiento real con Vercel Analytics | 🟡 Media  |

---

## 🗣️ Preguntas de clarificación para los testers

**Sobre "vacío" y "sin principios":**

1. Cuando dices que se siente "vacío", ¿es porque no hay suficiente contenido,
   porque no entiendes qué hacer, o porque se siente sin alma?
2. ¿Qué esperarías ver en una app cristiana que la haga sentir "con principios"?
3. ¿Qué te haría sentir la app "más amigable"?

**Sobre rendimiento:** 4. ¿En qué momento sentiste que iba lento? (al abrir, al responder, al cambiar de pantalla) 5. ¿Qué teléfono usas? (marca y modelo)

**Sobre preguntas trampa:** 6. ¿Puedes recordar una pregunta específica que sentiste "trampa"? 7. ¿Qué te hubiera gustado que pasara en su lugar?

---

## 📊 Tabla de priorización (impacto vs esfuerzo)

| Mejora                           | Impacto | Esfuerzo | Prioridad   |
| -------------------------------- | ------- | -------- | ----------- |
| Optimizar AnimatedBackground     | Alto    | Medio    | 🥇 1º       |
| Dificultad adaptativa            | Alto    | Medio    | 🥈 2º       |
| Onboarding claro                 | Alto    | Bajo     | 🥉 3º       |
| Más versículos/mensajes visibles | Medio   | Bajo     | 4º          |
| Más insignias/logros             | Medio   | Medio    | 5º          |
| Microcopy más cálido             | Medio   | Bajo     | 6º          |
| Medir analytics                  | Alto    | Bajo     | Transversal |
