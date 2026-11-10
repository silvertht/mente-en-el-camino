### 2026-11-10 · H-VIS-05: Instalación PWA y flecha de retorno

**Instalación PWA (Home)**

- Integración del hook `useInstallPrompt` (Admin).
- Botón "Instalar App" discreto (ghost) al final del scroll, visible solo si `!isStandalone`.
- Lógica UI: si `isIOS`, abre un Modal custom; si `canInstall` (Android), dispara `installApp()`.
- Modal iOS: Implementado sobre el componente base `Modal.tsx` (garantiza scroll lock, focus trap y `role="dialog"`). Incluye icono SVG de compartir y texto instructivo. Se añadió un botón "Entendido" vía prop `footer` para cierre visible táctil.

**Game.tsx (Flecha de retorno)**

- Mejora de visibilidad: fondo `bg-noche-800/50`, borde sutil y mayor tamaño de icono (`text-xl`).
- Accesibilidad: se forzó un área táctil mínima de `min-w-[44px] min-h-[44px]`.
