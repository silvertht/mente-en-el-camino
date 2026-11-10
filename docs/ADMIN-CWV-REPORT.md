# Reporte de Core Web Vitals y Diagnóstico de Bundle — Selah

**Fecha**: 2026-11-10
**Área**: Admin
**Herramientas**: Lighthouse (Mobile, 4G), Vite-Bundle-Analyzer, Vitest.

## 1. Estado Actual (Baseline)
- **Build**: 184.12 kB gzip (592.06 kB minified). 477 módulos.
- **Tests**: 164/164 pasando.
- **Lighthouse Local**: Performance Score **96/100**.
- **Métricas Lighthouse**:
  - LCP: **2.5 s** (Límite amarillo, cerca del verde).
  - CLS: **0** (Perfecto).
  - TBT (INP aproximado): **140 ms** (Verde).
  - FCP: 1.0 s (Verde).

## 2. Diagnóstico (El problema)
Lighthouse reporta **"Reduce unused JavaScript: Est. savings of 94 KiB"**. 
El análisis del Treemap confirma que el bundle inicial incluye código que no se usa en la primera pantalla (Home):
- `react-dom` (Bloque mayor).
- `dexie` (Base de datos, no se usa en el primer render).
- `motion` (Framer Motion, animaciones).
- `src/data/questions` (Banco de preguntas).

## 3. Propuestas de Mejora (Admin)

### M1 — Code Splitting (manualChunks) en `vite.config.ts`
- **Qué**: Separar `react-dom`, `motion` y `dexie` en chunks independientes usando `manualChunks` (o `codeSplitting` en Rolldown/Vite 8).
- **Por qué**: El bundle principal bajará drásticamente. El navegador cacheará React y Motion por separado. 
- **Impacto estimado**: LCP bajará a verde (< 2.5s) y se eliminará el warning de chunk >500 kB.
- **Territorio**: Admin (config).

### M3 — Cache Inmutable en `vercel.json`
- **Qué**: Crear `vercel.json` para añadir cabeceras `Cache-Control: public, max-age=31536000, immutable` a la carpeta `/assets/*`.
- **Por qué**: Mejora el TTFB en visitas recurrentes. Actualmente no existe el archivo.
- **Territorio**: Admin (config).

### Handoff a Funcional (H-FUN-03)
- **Qué**: `React.lazy` para el componente `Game` y carga diferida de `dexie` y `data/questions`.
- **Por qué**: Son los 94 KiB que Lighthouse marca como "unused JS".
- **Territorio**: Funcional (src).

## 4. Conclusión
El proyecto tiene una base sólida (Score 96, CLS 0). Las mejoras M1 y M3 son de bajo riesgo, alto impacto y entran 100% en el territorio de Admin.