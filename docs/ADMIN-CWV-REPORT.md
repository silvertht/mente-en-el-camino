# Reporte de Core Web Vitals y Diagnóstico de Bundle — Selah

**Fecha**: 2026-11-10
**Área**: Admin
**Estado**: CERRADO

## 1. Tabla Comparativa Final (Antes vs. Después)

| Métrica                   | Baseline Original | Después (M1+M3)  | **Final (H-FUN-03 en prod)** |
| :------------------------ | :---------------- | :--------------- | :--------------------------- |
| **Bundle Inicial (gzip)** | 184.12 kB         | 184.12 kB        | **29.49 kB** (¡-84%!)        |
| **LCP**                   | 2.5 s (Amarillo)  | 2.7 s (Amarillo) | **2.0 s (Verde 🟢)**         |
| **CLS**                   | 0                 | 0                | **0** (Perfecto)             |
| **Performance Score**     | 96                | 95               | **92** (Verde)               |
| **JS sin usar**           | 94 KiB            | 59 KiB           | 82 KiB (mejor LCP neto)      |

## 2. Diagnóstico y Acciones Aplicadas

1. **El Problema**: El bundle inicial era de 184 kB gzip. Lighthouse reportó 94 KiB de JS sin usar. El Treemap reveló que `react-dom`, `dexie` y `motion` se cargaban en el primer render innecesariamente.
2. **M1 (`manualChunks`)**: Aplicado en `vite.config.ts`. Separó vendors, permitiendo el cacheo a largo plazo.
3. **M3 (`vercel.json`)**: Cabeceras de caché inmutable para los assets (`/assets/*`).
4. **H-FUN-03 (Lazy Load)**: `data/questions` se carga asíncronamente al pulsar "Jugar", reduciendo el bundle inicial drásticamente a 29.49 kB.

## 3. Conclusión

El LCP entró en zona verde (2.0s) y el peso inicial se redujo en un 84%. La experiencia en móviles (especialmente iOS) es ahora instantánea en la carga de la pantalla principal (Home).
