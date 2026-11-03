# CONTEXT-UX — Mente en el Camino (Selah)

Documento maestro del área UX. Define identidad, territorio, principios, marca, estado por fase, decisiones consolidadas, hallazgos abiertos, pendientes, métricas y metodología operativa. Es autocontenido: si alguien lee solo este documento, entiende el área completa.

---

## Metadatos del documento

| Campo                   | Valor                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| Área                    | Experiencia de Usuario (UX)                                                  |
| Proyecto                | Mente en el Camino (repo interno)                                            |
| Marca pública           | Selah                                                                        |
| Fase activa             | 3                                                                            |
| Última actualización    | 2026-10-01                                                                   |
| Estado del área         | Reconocimiento pre-Test #2 cerrado. Test #2 en pausa por decisión del PO.    |
| Documentos relacionados | `CHANGELOG-UX.md`, `INTERFACES-UX.md`, `CHANGELOG.md` (global), `PROJECT.md` |
| Documento anterior      | `CONTEXT-UX.md` (Fase 2, 2026-09-25)                                         |

---

## Índice

1. Identidad del área
2. Territorio
3. Principios rectores
4. Marca Selah
5. Metodología operativa
6. Estado por fase
7. Decisiones clave consolidadas
8. Hallazgos abiertos
9. Pendientes activos
10. Métricas
11. Relación con otras áreas
12. Primeros pasos para un chat nuevo de UX
13. Referencias cruzadas

---

## 1. Identidad del área

### 1.1 Misión

UX gobierna la **experiencia del usuario de punta a punta**: cómo recorre la app, qué lee, qué toca, en qué orden, con qué fricción y con qué accesibilidad. Trabaja en la frontera entre lo visual y lo funcional: **no diseña el sistema visual ni la lógica**, pero sí define cómo el usuario los recorre.

### 1.2 Responsabilidades formales

1. Diseñar flujos de usuario (onboarding, primera partida, retorno, abandono).
2. Redactar y mantener el microcopy global y el de cada tipo de pregunta.
3. Diseñar el sistema de notificaciones de racha diaria.
4. Garantizar accesibilidad AA (teclado, lectores de pantalla, contraste, concordancia de género en `aria-label` / `aria-live`).
5. Analizar feedback de testers y traducirlo a mejoras ejecutables.
6. Velar por la coherencia de la marca "Selah" en todo texto user-facing.
7. Documentar handoffs a otras áreas cuando una decisión UX requiera cambios fuera de su territorio.

### 1.3 NO responsabilidades (límites explícitos)

UX **no hace**:

- Lógica de negocio, scoring, persistencia ni estado global (Funcional).
- Sistema visual, paleta, animaciones ni componentes de interacción (Visual).
- Configuración de PWA, manifest, Workbox, analytics ni infraestructura (Admin).
- Decisiones de contenido teológico ni banco de preguntas (Funcional + revisión RVR1960).
- Cambios de tipos, datos ni tests unitarios (Funcional).
- Decisiones finales de prioridad entre áreas (Product Owner).

### 1.4 Autoridad de decisión

UX **decide** sobre:

- Todo texto user-facing.
- Orden y jerarquía de la información en pantalla.
- Flujos de navegación.
- Requisitos de accesibilidad.
- Metáfora y tono de la app.
- Criterios de aceptación de cualquier componente que afecte la experiencia.

UX **propone** (no decide) sobre:

- Cómo implementar visualmente una decisión UX (decide Visual).
- Cómo modelar un dato necesario para una decisión UX (decide Funcional).
- Cómo configurar técnicamente una necesidad UX (decide Admin).

---

## 2. Territorio

### 2.1 Archivos modificables directamente por UX

| Archivo                               | Tipo de intervención permitida          |
| ------------------------------------- | --------------------------------------- |
| `src/screens/Home.tsx`                | Flujo de entrada, jerarquía, microcopy  |
| `src/screens/Game.tsx`                | Flujo de partida, microcopy de estados  |
| `src/screens/Results.tsx`             | Flujo de cierre, celebración, microcopy |
| `src/screens/Profile.tsx`             | Jerarquía de perfil, microcopy          |
| `src/App.tsx`                         | Flujo entre pantallas                   |
| `src/components/ScoreFeedback.tsx`    | Microcopy de feedback                   |
| `src/components/QuestionRenderer.tsx` | Microcopy de tipos (no estructura)      |
| `src/components/questions/*`          | Microcopy únicamente (no estructura)    |

### 2.2 Archivos NO modificables sin coordinación formal

| Archivo                                   | Área dueña     | Motivo                          |
| ----------------------------------------- | -------------- | ------------------------------- |
| `src/store/useGameStore.ts`               | Funcional      | Lógica de estado                |
| `src/utils/scoring.ts`                    | Funcional      | Cálculo de puntos y niveles     |
| `src/db/database.ts`                      | Funcional      | Persistencia IndexedDB          |
| `src/data/*`                              | Funcional      | Banco de preguntas y principios |
| `src/types/index.ts`                      | Funcional      | Contratos de tipos              |
| `src/components/questions/TapToPlace.tsx` | Visual         | Componente de interacción       |
| `src/components/Timer.tsx`                | Por determinar | Ver `INTERFACES-UX.md` §5       |
| `src/index.css`                           | Visual         | Sistema visual                  |
| `AnimatedBackground.tsx`                  | Visual         | Fondo animado                   |
| `index.html`                              | Visual         | Metadatos y metas               |
| `vite.config.ts`                          | Admin          | Build y PWA                     |
| `public/manifest.webmanifest`             | Admin          | PWA                             |
| `public/icons/*`                          | Admin / Visual | Íconos PWA                      |

### 2.3 Regla de bloqueo

Si una tarea UX depende de un archivo fuera de su territorio, **UX no lo modifica**. Redacta un handoff con: contexto, archivo destino, cambio propuesto, criterios de aceptación y prioridad. El PO decide a qué área lo deriva. Ver `INTERFACES-UX.md` para el protocolo completo.

### 2.4 Reglas duras (nunca violar)

1. **`MenteEnElCaminoDB` no se renombra jamás**. Rompe IndexedDB de usuarios existentes (perfil, XP, insignias, racha).
2. **UX no toca lógica de negocio**. Si un cambio de UX requiere lógica nueva, se redacta handoff.
3. **UX no toca el sistema visual**. Si un cambio de UX requiere estilo nuevo, se redacta handoff.
4. **UX no toca configuración de build**. Si un cambio de UX requiere configuración, se redacta handoff.
5. **Toda decisión de UX sobre texto user-facing pasa por concordancia de género** antes de tocar código.

---

## 3. Principios rectores

Estos principios son **no negociables** y aplican a cualquier propuesta o cambio de UX.

### 3.1 Principios de experiencia

1. **Mobile-first siempre**. Toda decisión se valida primero en móvil real.
2. **Una pregunta a la vez**, sin distracciones fuera del foco.
3. **Toda respuesta enseña**: cada interacción deja aprendizaje (explicación, versículo, aplicación o reflexión).
4. **El fracaso no castiga, motiva**: los errores se enmarcan como parte del camino, nunca como "Error" ni "Incorrecto".
5. **Celebración visual de logros** sin caer en infantilización.
6. **Tiempo de interacción ≤30 s por pregunta** (incluye lectura y respuesta).
7. **Mobile-first también en peso**: evitar librerías grandes, assets ligeros.

### 3.2 Principios de microcopy

1. **Segunda persona** ("tú", "caminas", "eliges").
2. **Metáfora del camino/viaje** ("senda", "travesía", "paso", "peregrino").
3. **Verbos en presente**.
4. **Frases ≤12 palabras** (tolerancia justificada a 13 cuando la simetría lo exige, precedente: hint de Timeline).
5. **Vocabulario prohibido**: "¡Felicidades!", "Error", "Usuario", "Completado".
6. **Vocabulario preferido**: "tú", metáfora camino/viaje, presente.
7. **Concordancia de género obligatoria** en microcopy visible y en `aria-label` / `aria-live`.

### 3.3 Principios de accesibilidad

1. **AA como mínimo** (WCAG 2.2).
2. **Navegación por teclado** funcional en todos los flujos.
3. **Lectores de pantalla**: `aria-label`, `aria-live`, `aria-describedby` correctos.
4. **`prefers-reduced-motion`** respetado en toda animación.
5. **Contraste** verificado en todos los textos user-facing.
6. **Concordancia de género en `aria-label` / `aria-live`** (femenino: "colócala"; masculino: "colócalo").
7. **Tap targets ≥44×44 px**.

### 3.4 Principios de jerarquía

1. **Identidad → contenido del día → reto → progreso → sendas** (orden consolidado en Home).
2. **Una acción principal por pantalla**, visualmente dominante.
3. **Progresión visible** (XP, racha, nivel, insignias).
4. **El feedback siempre aparece después de la respuesta**, nunca antes.

---

## 4. Marca Selah

### 4.1 Identidad verbal

- **Nombre público**: Selah (hebreo, "pausa, medita", Salmos).
- **Slogan**: "Pausa. Reflexiona. Aprende."
- **Nombre interno del repo**: mente-en-el-camino (no cambia).
- **Identificador de base de datos**: `MenteEnElCaminoDB` — **regla dura: jamás renombrar**.

### 4.2 Reglas de aplicación

- "Selah" **no se traduce** ni se explica en cada uso.
- El slogan aparece **solo** bajo el `<h1>` de Home, no repetido en cada pantalla.
- La metáfora del camino sigue viva ("El camino comienza" se mantiene).
- Coherencia de voz y tono en todas las pantallas: segunda persona, metáfora del camino, presente.

### 4.3 Dónde NO aparece Selah

- En `MenteEnElCaminoDB` (regla dura).
- En comentarios de cabecera de archivos de otras áreas (territorio Funcional).
- En logs internos, tests unitarios ni nombres de commits.

### 4.4 Aplicación en Home (verificada en disco el 2026-10-01)

- `<h1>`: "Selah" con `GradientText` shimmer.
- Subtítulo bajo `<h1>`: "Pausa. Reflexiona. Aprende."
- Footer: "Selah · {año}".

---

## 5. Metodología operativa

### 5.1 Al abrir una jornada de UX

1. Leer `CONTEXT-UX.md` (este documento).
2. Leer `CHANGELOG-UX.md` (estado más reciente).
3. Leer `CHANGELOG.md` global (estado del proyecto).
4. Leer `INTERFACES-UX.md` (contratos con otras áreas).
5. **Pedir al PO** lo que se necesita para arrancar (archivos, decisiones, autorizaciones).
6. **No tocar código sin eso**.

### 5.2 Durante la jornada

1. **Microcopy primero**: proponer textos con concordancia de género antes de tocar código.
2. **Respetar territorios**: si algo bloquea, redactar handoff.
3. **Verificar en disco** cualquier afirmación documental antes de actuar sobre ella.
4. **Mobile-first**: validar decisiones en móvil real cuando aplique.

### 5.3 Al cerrar la jornada

1. Actualizar `CHANGELOG-UX.md` con entrada(s) del día.
2. Actualizar `CHANGELOG.md` global si aplica.
3. Actualizar `CONTEXT-UX.md` si cambió estado, territorio o principios.
4. Actualizar `INTERFACES-UX.md` si cambió un contrato inter-área.
5. Registrar handoffs abiertos con ID y prioridad.

### 5.4 Verificación en disco (regla)

Ningún handoff se da por cerrado solo porque el área destino lo diga. UX **verifica en disco** con `findstr` o inspección manual. Precedente: 2026-10-01, handoff de género en `TapToPlace.tsx` (figuraba como cerrado en `CHANGELOG.md` global pero como pendiente en `CHANGELOG-UX.md`; la verificación en disco resolvió la contradicción).

### 5.5 Resolución de contradicciones documentales

Si `CHANGELOG-UX.md` y `CHANGELOG.md` global discrepan:

1. Verificar en disco el estado real.
2. Corregir **ambos** documentos para reflejar la verdad del código.
3. Registrar la corrección en la entrada del día.

---

## 6. Estado por fase

### 6.1 Fase 1 — completada

- Microcopy global aplicado en todas las pantallas.
- Microcopy de los 7 tipos de pregunta aprobado.
- Validaciones de scroll, modales y `prefers-reduced-motion` en PC.
- Accesibilidad AA validada.
- Reorden de Home: identidad → palabra para hoy → reto → bitácora → sendas.

### 6.2 Fase 2 — completada

#### Handoff 1 — Rebrand "Mente en el Camino" → "Selah"

- `Home.tsx:91` `<h1>`: "Selah" (con `GradientText` shimmer).
- `Home.tsx`: subtítulo "Pausa. Reflexiona. Aprende." bajo el `<h1>`.
- `Home.tsx:388` footer: "Selah · {año}".
- `MenteEnElCaminoDB` **no renombrado** (regla dura).

#### Handoff 2 — Microcopy Timeline "palabra" → "evento"

- `TimelineQuestion.tsx`: hint "Toca un evento y colócalo en su orden. Toca de nuevo para devolverlo."
- `VerseScrambleQuestion.tsx`: sin cambios (usa "palabra" femenino).
- Handoff colateral a Visual: género gramatical en `TapToPlace.tsx`. **✅ CERRADO el 2026-09-25** (verificado en disco 2026-10-01). Prop `itemGender?: "f" | "m"` implementada.

#### TapToPlace — Spec entregada a Visual

- Spec completa: wireframe, estados, interacciones, reglas de negocio, criterios WCAG 2.2 AA, microcopy exacto, criterios de aceptación.
- Visual implementó `TapToPlace.tsx` e integró en los 2 wrappers (`TimelineQuestion`, `VerseScrambleQuestion`).
- `SortableList.tsx` marcado `@deprecated`.
- Bundle gzip: −2.26 kB.

### 6.3 Fase 3 — en curso

#### Reconocimiento pre-Test #2 (2026-10-01) — cerrado

- Verificación en disco de 8 archivos clave: `Home`, `App`, `Game`, `useGameStore`, `QuestionRenderer`, `TimelineQuestion`, `VerseScrambleQuestion`, `TapToPlace`.
- **Código sano para Test #2. 0 bugs funcionales.**
- Cadena de datos `Game → QuestionRenderer → Timeline/VerseScramble → TapToPlace` confirmada estable (sin bug de reset).
- **Corrección documental**: handoff de género `TapToPlace` marcado como CERRADO (antes figuraba como pendiente por desfase).
- **2 hallazgos menores abiertos** (§8).

#### Test #2 — en pausa

- Paquete completo redactado: guion 15 min, formulario 6 preguntas, métricas, instrucciones PO, plantilla de análisis.
- **Estado**: ⏸ En pausa por decisión del PO (prioriza avances de otras áreas).
- **Documentación completa**: en `CHANGELOG-UX.md` §4.1.1.

---

## 7. Decisiones clave consolidadas

### 7.1 Fase 1

| #     | Decisión                         | Resultado                                         |
| ----- | -------------------------------- | ------------------------------------------------- |
| F1-D1 | Modales custom                   | Aprobado con 7 requisitos de accesibilidad        |
| F1-D2 | Formulario clarificación Test #1 | Descartado (mejoras visuales ya atacaron "vacío") |
| F1-D3 | Onboarding primera vez           | Pospuesto hasta datos reales de Test #2           |
| F1-D4 | Badge "sin-pistas" (Deductor)    | Opción A: sin cambios funcionales                 |
| F1-D5 | Microcopy 7 tipos de pregunta    | Aprobado                                          |
| F1-D6 | `SortableList.tsx`               | Aprobado con fix `aria-live`                      |
| F1-D7 | Handle bottom-sheet              | Opción A: eliminar (prometía swipe inexistente)   |

### 7.2 Fase 2

| #     | Decisión                                | Resultado                                                   |
| ----- | --------------------------------------- | ----------------------------------------------------------- |
| F2-D1 | Drag & drop → TapToPlace                | Aprobado por PO (lag táctil + WCAG 2.2 AA · 2.5.7)          |
| F2-D2 | Botón "Confirmar orden" en TapToPlace   | Se habilita solo al llenar todos los slots                  |
| F2-D3 | `MenteEnElCaminoDB`                     | No renombrar jamás                                          |
| F2-D4 | Subtítulo de Home                       | "Pausa. Reflexiona. Aprende." bajo el `<h1>`                |
| F2-D5 | Hint de Timeline                        | Versión larga (13 palabras) por simetría con Verse-scramble |
| F2-D6 | Rebrand a Selah                         | Solo en pantallas, no en DB                                 |
| F2-D7 | Microcopy Timeline "palabra" → "evento" | Aplicado + género delegado a Visual (cerrado)               |

### 7.3 Fase 3

| #     | Decisión                               | Resultado                                           |
| ----- | -------------------------------------- | --------------------------------------------------- |
| F3-D1 | Test #2                                | En pausa por decisión del PO                        |
| F3-D2 | Fix `AnswerParams` en `Game.tsx`       | Pendiente decisión PO (recomendación: post-Test #2) |
| F3-D3 | Handoff `useElapsedTime` / `Timer.tsx` | Pendiente dueño (Funcional o Visual)                |

---

## 8. Hallazgos abiertos (Fase 3)

### 8.1 Hallazgo H-02.1 — `AnswerParams` incompleto en `Game.tsx`

| Campo            | Valor                                                                              |
| ---------------- | ---------------------------------------------------------------------------------- |
| Ubicación        | `src/screens/Game.tsx`, interface local `AnswerParams`                             |
| Descripción      | No declara `selectedOrder?: number[]`                                              |
| Impacto          | Cosmético, no funcional (spread + contravarianza TS permiten compilar y funcionar) |
| Territorio       | UX (`Game.tsx` es territorio UX)                                                   |
| Acción propuesta | Añadir el campo en un commit limpio                                                |
| Estado           | Pendiente decisión PO (ahora o post-Test #2; recomendación UX: post-Test #2)       |
| Prioridad        | Baja                                                                               |

### 8.2 Hallazgo H-02.2 — Posible re-render por segundo en `Game.tsx`

| Campo            | Valor                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Ubicación        | `useElapsedTime(isAnswering)` en `Game.tsx`                                                                     |
| Descripción      | Si el hook devuelve un valor que cambia cada segundo, `Game` re-renderiza cada segundo mientras el joven piensa |
| Impacto          | No es bug funcional; puede sentirse como lag en móviles de gama baja (coincide con Test #1)                     |
| Territorio       | Por determinar (dueño de `Timer.tsx`)                                                                           |
| Acción propuesta | Observar en Test #2 con pregunta explícita de fluidez. Si se confirma, derivar handoff formal                   |
| Estado           | Pendiente decisión PO (dueño del archivo)                                                                       |
| Prioridad        | Media                                                                                                           |

---

## 9. Pendientes activos (Fase 3)

| #   | Tarea                                  | Estado      | Bloqueada por                                 |
| --- | -------------------------------------- | ----------- | --------------------------------------------- |
| 1   | Test #2 con los 5 jóvenes              | ⏸ En pausa  | Decisión PO: priorizar avances de otras áreas |
| 2   | Fix `AnswerParams` en `Game.tsx`       | ⏸ Pendiente | Decisión PO: ahora o post-Test #2             |
| 3   | Handoff `useElapsedTime` / `Timer.tsx` | ⏸ Pendiente | Decisión PO: dueño del archivo                |
| 4   | Onboarding primera vez                 | ⏸ Pospuesto | Datos de Test #2                              |
| 5   | Notificaciones de racha                | ⏸ Pospuesto | Datos de Test #2 + coordinación Admin         |
| 6   | Validar `SortableList` con teclado     | ⏸ Pospuesto | Móvil real                                    |
| 7   | Validar `SortableList` con touch       | ⏸ Pospuesto | Móvil real                                    |
| 8   | Validar microcopy en móvil real        | ⏸ Pospuesto | Móvil real                                    |

---

## 10. Métricas

### 10.1 Métricas del área

| Métrica                       | Valor (2026-10-01) |
| ----------------------------- | ------------------ |
| Handoffs cerrados (histórico) | 5                  |
| Handoffs abiertos             | 2                  |
| Decisiones consolidadas       | 15                 |
| Hallazgos abiertos            | 2                  |
| Archivos verificados en disco | 8                  |
| Bugs funcionales detectados   | 0                  |

### 10.2 Métricas del producto (heredadas de Fase 2)

| Métrica            | Valor                  |
| ------------------ | ---------------------- |
| Preguntas en banco | 70                     |
| Categorías activas | 5 (de 9)               |
| Tipos de pregunta  | 7/7                    |
| Insignias          | 19                     |
| Principios del día | 31                     |
| Tests unitarios    | 66/66                  |
| Bundle gzip        | 180.87 kB              |
| Precache PWA       | 15 entries · 803.84 KB |
| PWA installable    | ✅ Chrome              |
| Web Analytics      | ✅ Funcionando         |
| Speed Insights     | ⏳ Recolectando        |
| Costo mensual      | $0                     |

---

## 11. Relación con otras áreas

Para los contratos formales, ver `INTERFACES-UX.md`. Resumen:

| Área          | Qué le entrega UX                                                                       | Qué recibe UX                                                             |
| ------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **PO**        | Handoffs, decisiones UX, paquetes de validación, análisis de datos                      | Prioridades, autorizaciones, feedback, requerimientos                     |
| **Funcional** | Microcopy, criterios de accesibilidad, campos necesarios en tipos                       | Avisos de cambios de estado, nuevos tipos de pregunta, cambios en scoring |
| **Visual**    | Specs de componentes interactivos, microcopy embebido, correcciones de concordancia     | Validación de accesibilidad, avisos de cambios de comportamiento          |
| **Admin**     | Requisitos de notificación, analítica necesaria, microcopy dependiente de configuración | Cambios en manifest, nuevas capacidades técnicas                          |

---

## 12. Primeros pasos para un chat nuevo de UX

### 12.1 Al iniciar

1. Leer `CONTEXT-UX.md` (este documento).
2. Leer `CHANGELOG-UX.md` (estado más reciente).
3. Leer `CHANGELOG.md` global (estado del proyecto).
4. Leer `INTERFACES-UX.md` (contratos con otras áreas).
5. **Preguntar al PO**:
   - ¿Hay decisiones pendientes que me afecten?
   - ¿Qué archivos necesito revisar antes de arrancar?
   - ¿Cuál es la prioridad de hoy?

### 12.2 Verificaciones mínimas

1. `npm run build` limpio.
2. `npm run test` → 66/66 (o el número actualizado).
3. Inspección en disco de cualquier afirmación documental contradictoria.

### 12.3 Qué hacer según la instrucción del PO

| Instrucción                 | Acción                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------- |
| "Ejecuta Test #2"           | Pedir los 4 datos faltantes (modo, alcance, prioridad paralela, testers) y arrancar |
| "Diseña onboarding"         | Reactivar diseño pospuesto con datos de Test #2                                     |
| "Diseña notificaciones"     | Coordinar con Admin (PWA + push)                                                    |
| "Aplica fix `AnswerParams`" | 2 min, un commit limpio                                                             |
| "Cierra handoff de género"  | Ya está cerrado; verificar en disco y actualizar docs                               |
| "Prioriza otra área"        | Respetar prioridad del PO; registrar en `CHANGELOG-UX.md`                           |

---

## 13. Referencias cruzadas

| Documento               | Función                       | Cuándo se usa              |
| ----------------------- | ----------------------------- | -------------------------- |
| `CHANGELOG-UX.md`       | Historial cronológico de UX   | Al cerrar cada jornada     |
| `INTERFACES-UX.md`      | Contratos con otras áreas     | Antes de cualquier handoff |
| `CHANGELOG.md` (global) | Estado del proyecto completo  | Al iniciar jornada         |
| `PROJECT.md`            | Contexto maestro del producto | Al iniciar jornada         |
| `docs/ANALYTICS.md`     | Detalle de Vercel Analytics   | Durante Test #2            |

---

**Fin de `CONTEXT-UX.md` (Fase 3 · 2026-10-01).**
