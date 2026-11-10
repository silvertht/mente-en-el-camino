### 2026-11-10 · Fix: Mostrar 9 sendas en Home y paleta de colores

- **Datos**: Corregido `src/data/categories.ts` para exportar las 9 categorías en `CATEGORY_LIST` (antes solo exportaba las 5 de `MVP_CATEGORIES`).
- **Deuda de Diseño**: Se actualizaron los colores de fondo de las categorías (`amber`, `emerald`, `red`, etc.) a la paleta oficial (alba, reino, vida, fuego, alerta).
- **Grid (Home.tsx)**: Se cambiaron las columnas del grid de `grid-cols-1` a `grid-cols-2` en móvil, `sm:grid-cols-3` y `lg:grid-cols-4` para soportar las 9 sendas sin scroll infinito.
- **Dinamismo**: Se reemplazó el texto hardcodeado "Cinco rutas" por `{CATEGORY_LIST.length} rutas`.
- **Métricas**: 174/174 tests pasando, build limpio.
