# Guía de Analítica y Core Web Vitals — Selah (Mente en el Camino)

## 1. ¿Qué estamos midiendo?

Utilizamos dos herramientas gratuitas de Vercel:

- **Vercel Web Analytics:** Nos dice **qué** hace la gente (páginas vistas, eventos personalizados).
- **Vercel Speed Insights:** Nos dice **cómo de rápido** lo hacen (rendimiento real en sus dispositivos).

**Principio de privacidad:** Todos los datos son **anónimos y agregados**. No se rastrea a usuarios individuales, no se usan cookies, y se respeta el GDPR. Es apto para una app con jóvenes.

## 2. Métricas Clave de Rendimiento (Speed Insights)

Estos son los tres pilares de Google (Core Web Vitals). Los datos vienen de usuarios reales, no de una simulación.

| Métrica                             | Significado                                                                                    | Objetivo (Bueno)       |
| :---------------------------------- | :--------------------------------------------------------------------------------------------- | :--------------------- |
| **LCP** (Largest Contentful Paint)  | Tiempo que tarda en cargar el elemento más grande de la pantalla (ej. una imagen o el título). | **< 2.5 segundos**     |
| **INP** (Interaction to Next Paint) | Tiempo que tarda la app en responder a un clic o toque.                                        | **< 200 milisegundos** |
| **CLS** (Cumulative Layout Shift)   | Cuánto "salta" el contenido de la pantalla mientras carga.                                     | **< 0.1**              |

_Fuente de objetivos: Documentación de Vercel. Un sitio es "bueno" si el 75% de las visitas cumplen estos valores._

## 3. Métricas Clave de Uso (Web Analytics)

- **Page Views / Visitors:** Número total de visitas y usuarios únicos.
- **Retención D1:** ¿Cuántos usuarios vuelven al día siguiente? (Clave para el hábito).
- **Sesiones por usuario:** ¿Cuántas veces abren la app en un periodo?
- **Preguntas respondidas por sesión:** ¿Están jugando partidas completas?
- **Tasa de abandono:** ¿En qué pregunta o pantalla se van? (Podemos usar `track()` para eventos personalizados).
- **Distribución por categoría:** ¿Qué temas les interesan más?
- **Dispositivos:** ¿Móvil o Desktop? (Priorizar mobile-first).
- **Países:** ¿Desde dónde nos visitan? (Útil para idioma o contenido).

## 4. Cómo interpretar los datos (Guía rápida)

### Si el LCP es > 2.5s

- **Qué significa:** La app tarda en mostrar contenido.
- **Qué hacer:** Escalar a **Visual/Funcional**. Posible causa: el bundle de JavaScript es muy grande (581 kB). Se debe considerar **Code Splitting** (dividir el código) o cargar los datos de preguntas solo cuando se necesiten (Lazy Loading).

### Si el INP es > 200ms

- **Qué significa:** La app se siente "lenta" o "pesada" al tocar botones.
- **Qué hacer:** Escalar a **Visual/Funcional**. Posible causa: el `AnimatedBackground` o animaciones complejas en móviles de gama baja. Revisar `deviceTier.ts`.

### Si el CLS es > 0.1

- **Qué significa:** La interfaz "salta" mientras carga, causando clics accidentales.
- **Qué hacer:** Escalar a **Visual**. Posible causa: imágenes sin dimensiones definidas o anuncios.

### Si la Retención D1 es baja (< 20%)

- **Qué significa:** Los usuarios no ven razón para volver.
- **Qué hacer:** Escalar a **UX**. Revisar el "Principio del Día", la racha, y el sistema de insignias. ¿Hay suficiente contenido nuevo para el día 2?

### Si la Tasa de abandono es alta en la misma pregunta

- **Qué significa:** Esa pregunta en particular es confusa, muy difícil o tiene un bug.
- **Qué hacer:** Escalar a **Funcional**. Revisar la redacción, la dificultad adaptativa o la lógica de esa pregunta.

## 5. Cómo acceder a los datos

1. Ve a tu dashboard de **Vercel**.
2. Selecciona el proyecto `mente-en-el-camino`.
3. En la barra lateral, haz clic en la pestaña **Analytics**.
4. Verás dos secciones: **Web Analytics** (uso) y **Speed Insights** (rendimiento). Los datos comienzan a aparecer **a los pocos minutos** de que los usuarios usen la app.

## 6. Eventos Personalizados (Futuro)

Actualmente, Vercel Web Analytics en plan **Hobby (Gratuito)** solo mide vistas de página. Para medir cosas como "Cuántos usuarios terminan una partida", necesitaremos **eventos personalizados**. Esta función es de pago (Pro).

- **Acción futura:** Si queremos medir la retención y el abandono en detalle, tendremos que evaluar el plan Pro o usar una herramienta alternativa.
