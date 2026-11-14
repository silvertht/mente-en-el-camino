# CONTEXT-VISUAL — Área Visual · Mente en el Camino (Selah)

Documento de traspaso para el asistente especializado en el **área Visual**.
Última actualización: 2026-11-14 (Cierre Fase 5 + Quality Pass).
Estado: ✅ Fase 5 CERRADA. Fase 6 pendiente de asignación.

---

## 1. QUÉ ES EL ÁREA VISUAL

Especializada en todo lo que el usuario ve, siente e interactúa visualmente:

- Diseño visual, coherencia de paleta y sistema de diseño.
- Tipografía, espaciado, iconografía y jerarquía visual.
- Animaciones, transiciones y microinteracciones (Motion).
- Componentes visuales (botones, cards, modales, skeletons, barras de progreso).
- Responsive y mobile-first (diseño para 360px base).
- Accesibilidad visual (contrastes, tamaños táctiles, focus visible, `aria-labels`).
- Rendimiento gráfico (evitar repaints, optimizar animaciones, code-splitting con React.lazy).

**NO toca (límites estrictos)**:

- ❌ **Lógica de negocio**: scoring, niveles, rachas, insignias, rating ELO, persistencia Dexie.
- ❌ **Flujos UX**: onboarding, navegación, microcopy, textos de marca.
- ❌ **Administración**: PWA config (más allá de la UI), analytics, deploy, Supabase, service worker.

---

## 2. CONTEXTO DEL PROYECTO

**Nombre técnico**: mente-en-el-camino
**Nombre público (marca)**: Selah ("pausa, medita").
**Stack Técnico (Foco Visual)**:

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (configuración vía `@theme` en `src/index.css`, NO `tailwind.config.js`).
- Motion (`motion/react`, NO `framer-motion`).
- Zustand v5 (consumo selectores atómicos).
- Dexie.js (IndexedDB, no tocado por Visual).
- Vitest + jsdom para tests.
- PWA via `vite-plugin-pwa` (Admin gestiona).

**Navegación**: **state-based** con `useState<Screen>` en `src/App.tsx`. **NO usa `react-router-dom`**. Patrón de Fase 4 respetado.

---

## 3. TERRITORIO (ARCHIVOS MODIFICABLES)

### Base y Sistema de Diseño

- `src/index.css` — paleta `@theme`, keyframes, reset.
- `src/utils/animations.ts` — variantes Motion.
- `index.html` — título, metas, theme-color.
- `src/components/Button.tsx` — variants (primary|secondary|ghost|danger|reino), sizes (sm|md|lg), `min-h-11`, `type="button"`.
- `src/components/Card.tsx` — variants (default|elevated|outlined|bare).
- `src/components/Modal.tsx` — focus trap, scroll lock, bottom-sheet en móvil.
- `src/components/ProgressBar.tsx`, `StatPill.tsx`, `BadgeCard.tsx`, `CategoryCard.tsx`.

### Fase 5 — Discipulado (9 archivos)

**Pantallas**

- `src/screens/ElCamino.tsx` — mapa Senda→Nivel→Lección, 5 estados visuales.
- `src/screens/Leccion.tsx` — 3 preguntas iterativas + check + feedback + cierre.
- `src/screens/CierreLeccion.tsx` — "Así es. Has dado un paso más." + CTAs.

**Componentes discipleship**

- `src/components/discipleship/SendaHeader.tsx` — cabecera sticky + progreso senda.
- `src/components/discipleship/NivelHito.tsx` — hito rombo de nivel.
- `src/components/discipleship/LeccionNode.tsx` — nodo de lección (5 estados).
- `src/components/discipleship/CaminoPath.tsx` — SVG serpenteante (lazy, estático).
- `src/components/discipleship/EstadoBadge.tsx` — icono+texto del estado.
- `src/components/discipleship/TarjetaContenido.tsx` — tarjeta "Para meditar".
- `src/components/discipleship/ProgresoLeccion.tsx` — ProgressBar con aria-label §15.
- `src/components/discipleship/CheckReflexion.tsx` — opciones seleccionables (no radio nativo).
- `src/components/discipleship/FeedbackReflexion.tsx` — feedback 4 partes como "tarjeta de aprendizaje".

**Utilidades**

- `src/utils/estadoVisual.ts` — mapeo 1:1 estado → forma + icono + etiqueta.

### Fase 5 — Multijugador Local (9 archivos)

**Pantallas**

- `src/screens/JugarEnGrupo.tsx` — hub con lazy sub-módulos.

**Componentes multiplayer**

- `src/components/multiplayer/SetupJugadores.tsx` — config 2+ jugadores.
- `src/components/multiplayer/JugadorSlot.tsx` — slot con número+icono+color.
- `src/components/multiplayer/IntersticialPasa.tsx` — "Pasa el dispositivo a [Jugador]." (UX-1).
- `src/components/multiplayer/MarcadorJugadores.tsx` — puntuaciones reactivas en vivo.
- `src/components/multiplayer/TurnoJugador.tsx` — pregunta/respuesta del turno.
- `src/components/multiplayer/ResultadosGrupo.tsx` — resultados + glow estático (sin confeti, A4=B).
- `src/components/multiplayer/DesempatePanel.tsx` — "Ambos ganan." (UX-2).

**Utilidades**

- `src/utils/multiplayerVisual.ts` — mapeo `ColorToken` → paleta + número.

### Fase 5 — Soporte (5 archivos)

- `src/components/support/EstadoVacio.tsx`
- `src/components/support/EstadoCarga.tsx` (skeleton, aria-live)
- `src/components/support/EstadoError.tsx`
- `src/components/support/EstadoOffline.tsx`
- `src/hooks/useOnlineStatus.ts` (hook `navigator.onLine`)

### App y Home (modificados en Fase 5)

- `src/App.tsx` — state-based nav con 4 pantallas nuevas (`elcamino`, `leccion`, `cierre`, `grupo`), `React.lazy` + `Suspense` para code-splitting, carga de `useDiscipleshipStore`.
- `src/screens/Home.tsx` — añadidos 2 accesos: "Tu camino" (con badge "Nuevo" persistido en localStorage) y "Jugar en grupo".

---

## 4. PALETA "NOCHE Y ALBA"

Definida en `src/index.css` dentro de `@theme`. **Fuente única de verdad**.

| Nombre              | Hex                                                       | Clase Tailwind            |
| :------------------ | :-------------------------------------------------------- | :------------------------ |
| **Noche** (fondos)  | `#060912` / `#0B0F1A` / `#131A2B` / `#1E2842` / `#2D3A5A` | `noche-950` … `noche-600` |
| **Alba** (dorado)   | `#FFD166` / `#F5B544` / `#D18F1E` / `#A36D12`             | `alba-400` … `alba-700`   |
| **Reino** (violeta) | `#A78BFA` / `#7C3AED` / `#5B21B6`                         | `reino-400` … `reino-600` |
| **Fuego** (racha)   | `#FB923C` / `#F97316`                                     | `fuego-400/500`           |
| **Vida** (correcto) | `#34D399` / `#10B981`                                     | `vida-400/500`            |
| **Alerta** (error)  | `#F87171` / `#EF4444`                                     | `alerta-400/500`          |

**Reglas de color**:

- **Prohibido**: `slate-*` (excepto deuda heredada en Card), `amber-*`, `emerald-*`, `red-*`, `indigo-*`, `sky-*`, `lime-*`, `rose-*`, `orange-*`, `purple-*`.
- **Permitido**: `noche-*`, `alba-*`, `reino-*`, `fuego-*`, `vida-*`, `alerta-*`, `white/*`.

**Identidad Multijugador** (A3 aprobado):

- Jugador 1: `alba-400` (dorado)
- Jugador 2: `reino-400` (violeta)
- Jugador 3: `vida-400` (verde)
- Jugador 4: `fuego-400` (naranja)
- **Requisito**: cada jugador se distingue también por número (1–4) + icono, no solo color. `alba` no se diluye.

---

## 5. CONVENCIONES Y REGLAS DE ORO

1. **Tailwind v4**: Clases custom vía `@theme`. Uso de `min-h-11` para tamaño táctil (44px).
2. **Motion**: Solo animar `transform` y `opacity`. NUNCA `boxShadow`, `borderColor` o `filter: blur`.
3. **Mobile-first**: Diseñar para 360px y escalar.
4. **Navegación state-based**: `useState<Screen>` en `App.tsx`. **NO usar `react-router-dom`** (deuda no autorizada).
5. **Reutilización**: Todo botón debe usar `<Button>`, toda tarjeta `<Card>`, todo diálogo `<Modal>`.
6. **Cero deuda técnica**: No duplicar estructuras (verificar `ls src/` antes de crear). No introducir dependencias nuevas sin autorización del PO.
7. **Verificar estructura antes de crear imports**: `dir src\` antes de asumir convenciones (`store` vs `stores`).
8. **Code-splitting**: Pantallas pesadas en `React.lazy` + `Suspense` con fallback `EstadoCarga`.

---

## 6. A11Y — REGLAS OBLIGATORIAS (no negociables)

| Requisito                        | Implementación                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Targets ≥44×44 px**            | `min-h-11 min-w-11` en nodos, hitos, slots; `min-h-[44px] w-full` en opciones de check/turno; `<Button>` base cumple.                      |
| **aria-labels §15**              | `"Lección [N] de [M] en el Nivel [X]"` (ProgresoLeccion), `"Nivel [N], [estado]"` (NivelHito), `"Senda [Nombre], [estado]"` (SendaHeader). |
| **aria-label UX-3**              | `"Lección [N] · [Título], [estado]"` (LeccionNode, incluye título).                                                                        |
| **aria-live**                    | `role="status" aria-live="polite" aria-atomic="true"` en `FeedbackReflexion`, `EstadoCarga`, `EstadoError`, `EstadoOffline`.               |
| **Foco visible**                 | `focus-visible:ring-2 ring-alba-400 ring-offset-2 ring-offset-noche-950` en todo nodo interactivo.                                         |
| **Foco al heading en mount**     | `tabIndex={-1}` + `useEffect(() => focus())` en ElCamino, Leccion, CierreLeccion, JugarEnGrupo.                                            |
| **prefers-reduced-motion**       | `useReducedMotion()` de Motion: desactiva stagger, pulso, rotación, transición de turno.                                                   |
| **Frases visibles ≤12 palabras** | Microcopy v0.1.1 validado. Feedback de 4 partes plegable en móvil.                                                                         |
| **Distinguible sin color**       | 5 estados con forma (círculo/hexágono/doble anillo/punteado/rombo) + icono + etiqueta + aria-label.                                        |

---

## 7. ESTADO ACTUAL DEL ÁREA (Cierre Fase 5)

### ✅ Cerrado en Fase 5

- **H-VIS-06**: 27 componentes (9 discipulado + 9 multijugador + 5 soporte + 3 pantallas + 1 util = 27). Integrados en la app real.
- **Router state-based**: 4 pantallas nuevas (`elcamino`, `leccion`, `cierre`, `grupo`) con `React.lazy` + `Suspense`.
- **Bundle**: `index-*.js` = 33.68 kB gzip ≤ 35 kB. 5 chunks lazy separados.
- **TV1**: `Leccion.tsx` itera las 3 preguntas con `useState(preguntaIdx)`.
- **TV2**: `FeedbackReflexion` renderiza la reflexión en bloque "Para meditar".
- **TV3**: botón "←" 44×44 px en ElCamino, Leccion, CierreLeccion. `onVolver` cableado desde App.
- **TV4**: spinner `finalizando` + toast "Avance guardado".
- **TV5**: rediseño "tarjeta de aprendizaje" (TarjetaContenido con gradiente, CheckReflexion sin radio nativo, FeedbackReflexion como tarjeta lateral).
- **TV6**: espaciado generoso (`pb-40`, `space-y-10`, `rounded-3xl`).
- **TV7**: badge "Nuevo" en Home con `localStorage["selah:camino-visto"]`.
- **TV8**: contexto bíblico visible antes de responder (`[UX] Contexto bíblico: {ref}`).
- **P0 Race Condition fix**: `responderCheck(preguntaIdx, opcionIdx, { sendaId, nivelNumber, leccionNumber })`. La UI ya no depende de `leccionActiva` async.

### 🟢 Pendientes / Deuda heredada

- **`RATING_TIERS`** duplicado en `Profile.tsx`. Bloqueado por Funcional (`getRatingTiers()`).
- **`Card` variants `default`/`elevated`/`outlined`** conservan `bg-slate-800` (deuda heredada de Fase 4).
- **`StatPill` no acepta `children`**. Diferido a Fase 6.
- **`vendor-motion` 44.37 kB gzip** en bundle inicial. Diferido a Fase 6 si CWV lo requiere.
- **Nombres hashed de chunks** (`ElCamino-*.js` en vez de `discipulado-*.js`). `manualChunks` diferido a Admin (H-ADM-01).
- **Comentarios legacy** con "usuario"/"test" en `TapToPlace`, `AnimatedBackground`, `ScoreFeedback`. Cleanup Fase 6.
- **`[UX] Contexto bíblico:`** placeholder pendiente de cierre por UX.
- **`SOURCEMAP_BROKEN`** warning de `@tailwindcss/vite` (preexistente).

### ⚠️ Nota sobre PWA

Admin cambió `generateSW` → `injectManifest` en paralelo (H-ADM-01). El build funciona con el cambio. Precache: 32 entries (884.74 KiB). Warnings de Admin:

- `inlineDynamicImports option is deprecated` — backlog Fase 6.

---

## 8. PRIMEROS PASOS PARA EL SUCESOR (Fase 6)

1. Leer este documento + `VISUAL-INTERFACES.md` + `CHANGELOG-VISUAL.md`.
2. Verificar `npm run test:run` (esperado 209/209) y `npm run build` (esperado 0 errores).
3. Abrir `npm run dev` e inspeccionar:
   - Home: 2 accesos nuevos (Tu camino, Jugar en grupo).
   - El Camino: mapa con 5 estados visuales.
   - Lección: 3 preguntas iterativas + feedback + reflexión.
   - Cierre: "Así es. Has dado un paso más."
   - Jugar en grupo: setup + turnos + resultados.
4. **Regla de oro nueva**: verificar estructura (`dir src\`) antes de crear archivos/imports. El bug de `stores` vs `store` no debe repetirse.
5. **Regla de oro nueva**: pantallas pesadas siempre con `React.lazy` + `Suspense`.
6. **Regla de oro nueva**: bugs P0 de integración UI↔store requieren context explícito (patrón del fix P0).
