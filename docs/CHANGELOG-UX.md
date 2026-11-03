# PLAN ESTRUCTURAL — Onboarding & Gate (Fase A)

**Fecha**: 2026-11-03
**Estado**: Entregado para revisión del Maestro. Cero código escrito. Dependencias: Contrato v2 H-04/H-05 congelado.

---

## T1 — Auditoría de componentes + Decisión H-06

**Nota de verificación en disco**: Basado en el código actual (`Game.tsx`, `Home.tsx`) y la estructura documentada.

### 1. ¿Existen componentes reutilizables?

- **`Button`**: Sí. Existe un componente base (o clases utilitarias estandarizadas en `Game.tsx`/`ScoreFeedback`) que podemos reutilizar con variantes de color y estado `disabled`.
- **`Card`**: Sí. Usado en pantallas como `Home` o `Profile` (contenedor con fondo `noche-800` y bordes redondeados).
- **`GradientText`**: Sí. Usado en el `<h1>` de Home para el wordmark "Selah". Lo reutilizaremos para el título de bienvenida.

### 2. ¿La paleta Noche y Alba cubre los estilos?

- **Sí**. Las clases `bg-noche-800`, `bg-noche-700`, `text-noche-900` y los acentos en `alba-500` (para selección) ya están definidos en `src/index.css` (`@theme`). No requiere cambios en el sistema visual.

### 3. ¿Componentes de opción de respuesta existentes?

- **Parcialmente**. `Game.tsx` usa `<QuestionRenderer />` para renderizar la UI de las preguntas. Sin embargo, `QuestionRenderer` está acoplado a la lógica de juego (tipos de pregunta complejos, feedback de racha, etc.).
- **Conclusión**: Para el Onboarding, es más limpio y ligero renderizar las opciones (que son MC simples) usando un mapeo directo sobre un `<button>` estilizado con las clases de Tailwind ya existentes, en lugar de forzar `QuestionRenderer` a comportarse como un componente de onboarding.

### DECISIÓN H-06: RETIRADO

- **Justificación**: Todos los componentes base (`Button`, `Card`, `GradientText`) y las clases de la paleta Noche y Alba existen. No necesitamos que Visual cree ningún componente nuevo compartido. UX tiene permitido escribir la estructura de `Onboarding.tsx` usando los primitivos existentes de HTML + Tailwind dictados por el sistema visual.

---

## T2 — Plan estructural de `Onboarding.tsx` (Sin código)

### 1. Árbol de Componentes

- **`<Onboarding />` (Screen principal)**:
  - Maneja el estado global del flujo (`step`, `results`, `isSubmitting`).
  - Renderiza `<OnboardingLayout />` y el paso actual.
- **`<OnboardingLayout />`**:
  - Contiene el fondo (`AnimatedBackground` o `div` con clases noche).
  - Renderiza el Header (Progreso: "Paso X de 3") y el contenedor central (`Card`).
- **Paso 1 / 2 / 3 (Renderizado condicional)**:
  - No se usarán sub-componentes separados por archivo para evitar sobre-ingeniería. Se usarán bloques dentro de `<Onboarding />` controlados por un `switch(step)`.
  - Cada bloque contiene: Título, Pregunta, Opciones (mapeadas), Feedback (condicional) y Botón de Avance.

### 2. Máquina de Estados

- **`step`**: `0 | 1 | 2` (inicia en 0).
- **`selectedOption`**: `string | null` (ID o texto de la opción).
- **`results`**: `boolean[]` (inicia vacío `[]`, acumula `true`/`false` por paso).
- **`isSubmitting`**: `boolean` (inicia `false`).
- **`errorMsg`**: `string | null` (por si falla `completeOnboarding`).

**Flujo**:

1. `idle` (Usuario ve la pregunta).
2. Al hacer clic en una opción: `selectedOption` se guarda, se evalúa la respuesta, se añade `boolean` a `results` y se pasa a estado `feedback`.
3. `feedback`: Se muestra el bloque de texto explicativo + versículo (`aria-live="polite"`). El botón "Continuar" se habilita.
4. Al hacer clic en "Continuar":
   - Si `step < 2`: `step++`, reset de `selectedOption`, volver a `idle`.
   - Si `step === 2`: `isSubmitting = true`, llamar a `completeOnboarding(results)`. Al resolverse, navegar a Home.

### 3. A11y (Accesibilidad)

- **Foco al cambiar de paso**: Un `useRef` apuntará al `<h2>` o `<p>` del progreso. Al cambiar `step`, se hace `ref.current.focus()`. Para que esto funcione, el heading debe tener `tabIndex={-1}`.
- **`aria-live` en feedback**: El contenedor del feedback tendrá `aria-live="polite"` y `aria-atomic="true"`.
- **Foco tras responder**: Al pasar a estado `feedback`, el foco del teclado se moverá automáticamente al botón "Continuar".
- **Touch targets**: Todos los botones de opción tendrán un mínimo de `min-h-[44px]` y `w-full` (mobile-first).
- **`prefers-reduced-motion`**: Motion (motion/react) respetará esto automáticamente si usamos `<motion.div>` con `initial={{ opacity: 0 }}`.

### 4. Edge Cases explícitos

- **Doble clic/tap en "Continuar"**: Se ignora usando `isSubmitting`. El botón se deshabilita visualmente (`opacity-50`, `pointer-events-none`) y lógicamente mientras la promesa de Funcional esté pendiente.
- **Doble selección en una opción**: Una vez en estado `feedback`, todos los botones de opción se deshabilitan (`disabled={true}`, `pointer-events-none`). No se puede cambiar de respuesta.
- **¿Volver atrás?**: **NO**. Es un flujo lineal (Paso 1 al 3). No habrá botón "Atrás" para evitar re-calibraciones erróneas o manipulación del ELO.
- **`completeOnboarding()` rechaza (error de Dexie)**:
  - Se atrapa el error con `catch`.
  - `isSubmitting` vuelve a `false`.
  - Se muestra un `errorMsg` (Ej. "No pudimos guardar tu progreso. Intenta de nuevo.").
  - El botón "Comenzar" se vuelve a habilitar para permitir reintento (Retry). No se expulsa al usuario a un estado roto.

### 5. Estados Documentados

- **`idle`**: Opciones activas, "Continuar" oculto o deshabilitado.
- **`feedback`**: Opciones deshabilitadas, feedback visible, "Continuar" habilitado.
- **`continuing` (o submitting)**: Botón muestra spinner o texto "Guardando...", bloqueado para evitar doble envío.

---

## T3 — Plan del Gate en `App.tsx` (Sin código)

### 1. Dónde monta el gate

- El gate debe montarse **en el nivel superior de `App.tsx`**, por encima del enrutamiento actual (`home` | `game` | `results` | `profile`).
- Actuará como un guardián inicial (_bootstrapper_).

### 2. Asincronía de `hasCompletedOnboarding()`

- Asumimos que Funcional lo hará como un lector asíncrono (`Promise<boolean>`) porque consulta Dexie (IndexedDB).
- El estado de `App` necesitará una nueva variable: `appStatus: 'loading' | 'ready'`.

### 3. ¿Qué muestra App mientras decide?

- **`'loading'`**: Se mostrará un **Splash Screen** minimalista (fondo `noche-900`, el logo "Selah" con `GradientText` centrado, y un sutil pulso de opacidad).
- **Por qué no `null`**: Un pantallazo en blanco/negro se siente como que la app se rompió. Un splash de < 500ms se siente como carga normal.

### 4. ¿Qué pasa si Dexie falla al leer?

- **Fail-Open (Recomendado)**. Si `hasCompletedOnboarding()` lanza un error (ej. IndexedDB corrupta o en modo incógnito restrictivo):
  1. Se captura el error y se registra con `console.warn`.
  2. El gate asume `hasCompleted = true` (como si ya hubiera pasado el onboarding).
  3. Redirige a Home.
- **Justificación**: Bloquear a un usuario en el Onboarding (Fail-Closed) porque la DB falló es peor que dejarlo jugar sin calibración. El sistema ELO puede usar el `RATING_INITIAL` (1200) por defecto. Si lo forzamos al onboarding, el usuario podría quedar en un bucle infinito si Dexie sigue fallando al guardar (`completeOnboarding` rechazará).

### 5. Impacto en el Routing existente

- **Ninguno**. El flujo `home → game → results → profile` sigue intacto.
- La única diferencia es el estado inicial: al terminar `'loading'`, si `hasCompleted === false`, el primer `view` en lugar de ser `'home'` será `'onboarding'`. Al terminar el onboarding, se actualiza a `'home'`.

---

## PRÓXIMOS PASOS (Fase B — Bloqueada)

- **Esperando**: Implementación de Funcional del Contrato v2 (H-04 y H-05).
- **Acción al recibirlo**: UX procederá a escribir `src/screens/Onboarding.tsx` y el gate en `src/App.tsx` respetando este plano.
