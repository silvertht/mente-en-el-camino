# Guía de Analítica y Core Web Vitals — Selah

**Última actualización:** 2026-09-25
**Área responsable:** Admin
**Herramientas:** Vercel Web Analytics + Vercel Speed Insights (plan Hobby, $0)

---

## 1. ¿Qué estamos midiendo?

Dos herramientas complementarias, ambas integradas en la app vía `src/main.tsx`:

| Herramienta        | Qué mide                                          | Componente          |
| ------------------ | ------------------------------------------------- | ------------------- |
| **Web Analytics**  | Uso: page views, visitors, bounce rate, referrers | `<Analytics />`     |
| **Speed Insights** | Rendimiento real: LCP, INP, CLS                   | `<SpeedInsights />` |

**Principio de privacidad:** datos **anónimos y agregados**. Sin cookies, sin tracking individual, sin PII. Apto para menores según GDPR y COPPA. No se rastrea a ningún usuario de forma identificable.

---

## 2. Métricas de Uso (Web Analytics)

### Visitors vs Page Views

- **Visitors:** usuarios únicos (por dispositivo + sesión).
- **Page Views:** cargas totales de la app. Un usuario puede generar varios.
- **Relación esperada:** 1 visitor = 2-5 page views (Home → Game → Results → Profile).

### Bounce Rate

- % de usuarios que se van sin interactuar.
- **Objetivo:** < 40% (a más interacción, mejor).
- **Si sube > 60%:** escalar a UX → el onboarding no engancha.

### Pages (por ruta)

> ⚠️ La app es SPA (sin React Router), así que **todo aparece como `/`**.
> Para medir pantallas específicas (Home, Game, Results) necesitaríamos
> **eventos personalizados** (feature de pago en plan Hobby).
> **Acción futura:** evaluar alternativa en Fase 2.5 si es crítico.

### Referrers

- Desde dónde llegan: WhatsApp, Instagram, link directo, etc.
- Útil para saber qué canal funciona mejor para compartir.

---

## 3. Métricas de Rendimiento (Speed Insights)

Core Web Vitals reales, medidos desde dispositivos de usuarios.

| Métrica                             | Qué mide                                  | Bueno   | Mejorable     | Malo    |
| ----------------------------------- | ----------------------------------------- | ------- | ------------- | ------- |
| **LCP** (Largest Contentful Paint)  | Velocidad de carga del elemento principal | < 2.5s  | 2.5s – 4s     | > 4s    |
| **INP** (Interaction to Next Paint) | Respuesta a clics/toques                  | < 200ms | 200ms – 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift)   | Estabilidad visual (saltos de layout)     | < 0.1   | 0.1 – 0.25    | > 0.25  |

**Interpretación:** Vercel muestra 3 colores:

- 🟢 **Verde:** 75%+ de visitas cumplen el objetivo → todo bien.
- 🟡 **Amarillo:** necesita mejora.
- 🔴 **Rojo:** prioridad alta, escalar.

---

## 4. Guía de Interpretación y Escalado

### Si LCP > 2.5s

- **Significa:** la app tarda en mostrar contenido.
- **Causa probable:** bundle de 581 kB (warning del build).
- **Acción:** escalar a **Visual + Funcional** → implementar **code splitting**:
  - Lazy load de pantallas (`React.lazy`)
  - Lazy load de Dexie + datos de preguntas
  - Considerar `build.chunkSizeWarningLimit`

### Si INP > 200ms

- **Significa:** la app se siente lenta al interactuar.
- **Causa probable:** `AnimatedBackground` o animaciones Motion pesadas en gama baja.
- **Acción:** escalar a **Visual** → revisar `deviceTier.ts` y reducir animaciones en tiers bajos.

### Si CLS > 0.1

- **Significa:** contenido salta mientras carga.
- **Causa probable:** imágenes sin dimensiones o fuentes sin `font-display`.
- **Acción:** escalar a **Visual** → revisar Skeleton components y layout shifts.

### Si Bounce Rate > 60%

- **Significa:** usuarios entran y se van sin jugar.
- **Causa probable:** onboarding poco claro.
- **Acción:** escalar a **UX** → revisar Home + microcopy de bienvenida.

### Si Visitors caen después de subir

- **Significa:** perdimos tracción.
- **Acción:** revisar con product owner → ¿campaña de difusión? ¿Test #2?

---

## 5. Cómo acceder a los datos

### Web Analytics

1. https://vercel.com/dashboard → proyecto `mente-en-el-camino`
2. Pestaña **Analytics** (barra lateral)
3. Filtros: rango (7d/30d), entorno (Production/Preview)

### Speed Insights

1. Mismo proyecto → pestaña **Speed Insights**
2. Verás métricas por dispositivo (Desktop/Mobile) y entorno
3. **Necesita ~24-48h de tráfico real** para mostrar datos significativos

---

## 6. Métricas clave para el Test #2

Cuando los 5 jóvenes usen la app, observar:

| #   | Métrica                  | Qué nos dice                                                  |
| --- | ------------------------ | ------------------------------------------------------------- |
| 1   | **Retención D1**         | ¿Vuelven al día siguiente? (necesita eventos custom → futuro) |
| 2   | **Sesiones por usuario** | ¿Cuántas veces abren la app?                                  |
| 3   | **Page Views / Visitor** | ¿Cuántas pantallas navegan por sesión?                        |
| 4   | **Bounce Rate**          | ¿Se van sin jugar?                                            |
| 5   | **LCP móvil**            | ¿La app carga rápido en sus teléfonos?                        |
| 6   | **INP móvil**            | ¿Responde bien a los toques?                                  |
| 7   | **CLS móvil**            | ¿Hay saltos que confundan?                                    |
| 8   | **Referrers**            | ¿Cómo llegaron? (WhatsApp, link directo, etc.)                |

---

## 7. Limitaciones del plan Hobby

| Feature                | Hobby (Free) | Pro ($20/mes) |
| ---------------------- | ------------ | ------------- |
| Web Analytics básico   | ✅           | ✅            |
| Speed Insights         | ✅           | ✅            |
| Eventos personalizados | ❌           | ✅            |
| Retención detallada    | ❌           | ✅            |
| Funnels                | ❌           | ✅            |
| Datos > 1 mes          | ❌           | ✅            |

**Decisión actual:** mantener Hobby ($0). Si tras Test #2 vemos necesidad de eventos custom (retención D1, abandono por pregunta), reevaluar con product owner.

---

## 8. Cómo se integra en el código (referencia)

**Archivo:** `src/main.tsx`

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
);
```
