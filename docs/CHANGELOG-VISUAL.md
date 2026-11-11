# CHANGELOG-VISUAL — Área Visual · Mente en el Camino (Selah)

**Área**: Visual
**Fase**: 4 (Cerrada)
**Última actualización**: 2026-11-11

---

## 📅 HISTORIAL — VISUAL · FASE 4

### 2026-11-11 · Fix: Mostrar 9 sendas en Home

- **Datos**: Corregido `src/data/categories.ts` para exportar las 9 categorías en `CATEGORY_LIST` (antes solo exportaba 5 de `MVP_CATEGORIES`).
- **Deuda de Diseño**: Se actualizaron los colores de fondo de las categorías (`amber`, `emerald`, `red`, etc.) a la paleta oficial (alba, reino, vida, fuego, alerta).
- **Grid (Home.tsx)**: Se cambiaron las columnas del grid de `grid-cols-1` a `grid-cols-2` en móvil, `sm:grid-cols-3` y `lg:grid-cols-4` para soportar las 9 sendas.
- **Dinamismo**: Se reemplazó el texto hardcodeado "Cinco rutas" por `{CATEGORY_LIST.length} rutas`.

### 2026-11-10 · H-VIS-05: Instalación PWA y flecha de retorno

- **Instalación PWA (Home)**: Integrado hook `useInstallPrompt`. Botón "Instalar App" (ghost) visible solo si `!isStandalone`. En iOS abre `Modal` base con icono SVG y texto instructivo. En Android dispara `installApp()`.
- **Game.tsx (Flecha de retorno)**: Fondo `bg-noche-800/50`, borde sutil y mayor tamaño de icono (`text-xl`). Área táctil forzada a `min-w-[44px] min-h-[44px]`.

### 2026-11-10 · H-06: Extracción de componentes base

- **Button.tsx**: Añadido `min-h-11` (touch target 44px) y `type="button"` por defecto. Variantes y tamaños intactos.
- **Card.tsx**: Añadida variante `variant="bare"` (sin bg/padding/border) para adoptar estilos propios sin alterar la apariencia.
- **Refactor**: `Onboarding.tsx` y `Profile.tsx` ahora consumen `<Button>` y `<Card>`.
- **Limpieza**: Eliminado definitivamente `src/components/questions/SortableList.tsx` (huérfano confirmado).
