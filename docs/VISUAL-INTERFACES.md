# VISUAL-INTERFACES — Contratos y Deudas entre Áreas · Mente en el Camino (Fase 3)

Este documento detalla cómo el **Área Visual** se conecta con las otras áreas del proyecto (Funcional, UX, Admin).
Sirve para que el Chat Maestro sepa exactamente qué está bloqueando a quién y qué APIs/componentes se están compartiendo.

---

## 1. VISUAL ↔ FUNCIONAL

### 1.1 Deuda Técnica Activa (Visual → Funcional)

- **Problema**: En `src/screens/Profile.tsx`, para poder pintar la barra de progreso del rating, el Área Visual ha tenido que duplicar los umbrales de los tiers en una constante local (`RATING_TIERS`). Actualmente hace espejo de los umbrales que viven en `src/utils/rating.ts` (función `getRatingLabel`).
- **Riesgo**: Si Funcional cambia los umbrales en el futuro (ej. de 1100 a 1050), la barra visual se romperá o desincronizará porque la constante local no se actualizará sola.
- **Solución requerida**: Funcional debe exponer una función `getRatingTiers()` o similar en `rating.ts` que devuelva los límites exactos. Visual eliminará la constante duplicada y consumirá esa función.
- **Estado**: Pendiente de que Funcional abra chat para implementarlo. Marcado con `TODO(handoff Funcional)` en el código.

### 1.2 Contratos de Componentes

- **TapToPlace**: Visual expone este componente. El contrato es `items: string[]`, `onAnswer: (order: number[]) => void`, `hint: string`, `submitLabel: string`, `itemGender?: "f" | "m"`. Funcional NO debe modificar esta interfaz sin avisar a Visual.
- **Consumo del Store**: Visual consume `useGameStore((s) => s.userRating?.global)` y `getRatingLabel()`. Visual NO modifica la lógica ELO.

---

## 2. VISUAL ↔ UX

### 2.1 Observación Abierta (UX → Visual)

- **Problema**: En un perfil virgen (0 partidas), el rating inicial es `1200` ("Explorador"). Mostrar 1200 puede ser confuso para el usuario (no entiende por qué no empieza en 0).
- **Solución requerida**: UX debe decidir si prefiere que se muestre "—", "Sin calibrar", u ocultar el número hasta la primera partida.
- **Estado**: Si UX aprueba el cambio, Visual implementa el ajuste visual en `Profile.tsx` en 5 minutos.

### 2.2 Bloqueo Actual

- Visual está bloqueado para microinteracciones y refinamientos hasta que UX realice el **Test #2** con los 5 jóvenes.

### 2.3 Microcopy

- **Regla**: Visual no inventa microcopy. Todos los textos en pantalla (labels, mensajes de error, textos de botones) son definidos por UX y Visual solo los estiliza.

---

## 3. VISUAL ↔ ADMIN

### 3.1 Configuración Pendiente (Visual → Admin)

- **Problema**: Falta añadir capturas de pantalla (`screenshots`) en el `manifest.json` de la PWA para habilitar la "Richer PWA Install UI" de Chrome.
- **Solución**: Admin debe configurar `vite-plugin-pwa` para incluirlas.
- **Estado**: Prioridad baja.

### 3.2 Colaboración Futura (Fase 3.5)

- Cuando Admin migre a Supabase (auth, ranking, multijugador), Visual necesitará diseñar las pantallas de Login, Registro y Leaderboard. Visual esperará el diseño del esquema por parte de Admin/Funcional.

---

**Fin del VISUAL-INTERFACES.md.**
