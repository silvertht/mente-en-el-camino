# Guía de Analítica y Core Web Vitals — Selah

**Última actualización:** 2026-11-10
**Área responsable:** Admin
**Herramientas:** Vercel Web Analytics + Vercel Speed Insights (plan Hobby, $0)

---

## 1. ¿Qué estamos midiendo?

| Herramienta        | Qué mide                               | Componente          |
| :----------------- | :------------------------------------- | :------------------ |
| **Web Analytics**  | Uso: page views, visitors, bounce rate | `<Analytics />`     |
| **Speed Insights** | Rendimiento real: LCP, INP, CLS        | `<SpeedInsights />` |

**Principio de privacidad:** datos anónimos y agregados. Apto para menores.

---

## 2. Línea Base (Baseline) de Producción

Tras la Fase 4, el estado actual (2026-11-10) es:

- **LCP Móvil**: **2.0s (Verde 🟢)**.
- **CLS**: **0 (Perfecto)**.
- **Bundle Inicial**: **29.49 kB (gzip)**.
- **Score Lighthouse Local**: 92/100.

---

## 3. Métricas de Uso (Web Analytics)

- **Visitors vs Page Views**: usuarios únicos vs cargas totales.
- **Bounce Rate**: Objetivo < 40%.
- **Pages**: La app es SPA, todo aparece como `/`.

---

## 4. Cómo acceder a los datos

1. https://vercel.com/dashboard → proyecto `mente-en-el-camino`.
2. Pestaña **Analytics** (Web) o **Speed Insights** (CWV).

---

## 5. Limitaciones del plan Hobby

| Feature                | Hobby (Free) | Pro ($20/mes) |
| :--------------------- | :----------- | :------------ |
| Web Analytics básico   | ✅           | ✅            |
| Speed Insights         | ✅           | ✅            |
| Eventos personalizados | ❌           | ✅            |

**Decisión actual:** mantener Hobby ($0). Para medir rachas o clics en el futuro, evaluaremos usar Supabase (Fase 5) o alternativas gratuitas.
