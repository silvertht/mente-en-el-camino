---

## 3. `docs/CHANGELOG-VISUAL.md` — completo

```markdown
# CHANGELOG-VISUAL — Área Visual · Mente en el Camino (Selah)

**Área**: Visual
**Última actualización**: 2026-11-14 (Cierre Fase 5)

---

## 📅 HISTORIAL — VISUAL · FASE 5

### 2026-11-13 · Fix P0: Race Condition en Leccion.tsx

- **Bug**: usuario seleccionaba opción correcta ("Para cumplir la profecía de Miqueas"), pero la app respondía "Casi." con `📖` vacío.
- **Causa**: `responderCheck` leía `leccionActiva` del store, que se seteaba async (tras `db.progresoLeccion.put`). Si el usuario interactuaba antes de que terminara, el store devolvía fallback vacío.
- **Fix (Funcional)**: añadido 3er parámetro opcional `ctx?: { sendaId, nivelNumber, leccionNumber }` a `responderCheck`. `ResultadoCheck` ahora incluye `reflexion?: string`.
- **Fix (Visual)**: 4 líneas en `Leccion.tsx` `onResponder`:
  - Pasa `{ sendaId, nivelNumber: n, leccionNumber: l }` como 3er param.
  - Usa `r.reflexion` directo del store (no deriva de `preguntaActual.feedbackCorrecto.reflexion`).
- **Defensa adicional**: `ready` gate (spinner `EstadoCarga` mientras `iniciarLeccion` persiste) + `errorInicio` handling.
- **Verificación**: `tsc` 0 errores, `build` exit 0, 511 modules, 1.13s, bundle inicial 33.68 kB gzip.
- **Archivos modificados**: `src/screens/Leccion.tsx` (1 archivo).
- **Bundle delta**: `index-*` +0.04 kB, `Leccion-*` +0.13 kB.
- **Lección aprendida**: race conditions UI↔store no detectables por `tsc` ni tests de store aislados. Añadir tests de integración en Fase 6.

### 2026-11-13 · Quality Pass Fase 5.1 — TV1–TV8

Contexto: 10 usuarios reportaron 8 bugs P0/P1 en el día 1 post-Fase 5.

**Bugs P0 (bloqueantes end-to-end)**:

- **TV1 — Leccion.tsx solo renderizaba preguntas[0]**:
  - Antes: `responderCheck(0, idx)` hardcoded. Solo se veía pregunta 1.
  - Después: `useState(preguntaIdx)` + `responderCheck(preguntaIdx, idx)` + botón "Siguiente reflexión". Se ven las 3 preguntas.
  - Archivo: `src/screens/Leccion.tsx`.

- **TV2 — FeedbackReflexion no mostraba reflexión**:
  - Antes: `FeedbackData.reflexion` nunca se pasaba.
  - Después: `FeedbackData.reflexion` se pasa + renderiza en bloque "Para meditar".
  - Archivos: `src/screens/Leccion.tsx`, `src/components/discipleship/FeedbackReflexion.tsx`.

- **TV3 — Sin botón de retorno (B2 usuario)**:
  - Antes: no había forma de salir del Discipulado sin recargar la app.
  - Después: botón "←" 44×44 px + `onVolver` desde App a ElCamino. `abandonarLeccion()` antes de volver.
  - Archivos: `src/App.tsx`, `src/screens/ElCamino.tsx`, `src/screens/Leccion.tsx`, `src/screens/CierreLeccion.tsx`.

**Bugs P1 (calidad)**:

- **TV4 — Lógicas vacías (B5 usuario)**:
  - Spinner `finalizando` + toast "Avance guardado" tras `guardarPosicion`.
  - Archivo: `src/screens/Leccion.tsx`.

- **TV5 — Look "formulario de registro" (B4 usuario)**:
  - `TarjetaContenido` con gradiente + emoji + "Para meditar".
  - `CheckReflexion` sin radio nativo: tarjetas seleccionables con check.
  - `FeedbackReflexion` como "tarjeta de aprendizaje" con borde lateral.
  - Archivos: 3 componentes discipleship.

- **TV6 — Aspecto "tosco" (B6 usuario)**:
  - Espaciado generoso: `pb-40`, `space-y-10`, `gap-4`, `rounded-3xl`, `p-6`/`p-8`.
  - Archivos: `ElCamino`, `Leccion`, `CierreLeccion`.

- **TV7 — Novedades no promocionadas (B6 usuario)**:
  - Badge "Nuevo" (alba-400) en botón "Tu camino" con `localStorage["selah:camino-visto"]`.
  - Archivo: `src/screens/Home.tsx`.

- **TV8 — Basamento bíblico visible (B3 usuario)**:
  - Línea "Reflexión N de 3 · [UX] Contexto bíblico: {ref}" antes de cada pregunta.
  - Archivo: `src/screens/Leccion.tsx`.

**Verificación Fase 5.1**:

- `tsc` 0 errores.
- `test:run` 209/209 verdes (15 archivos).
- `build` exit 0, 511 modules, 1.14s.
- Bundle inicial 33.64 kB gzip ≤ 35 kB.
- 5 chunks lazy: `ElCamino`, `Leccion`, `CierreLeccion`, `JugarEnGrupo`, `EstadoOffline`.
- Grep palabras prohibidas: 0 hits.
- Fase 4 sin regresión.
- Archivos modificados: 9 (App, Home, ElCamino, Leccion, CierreLeccion, FeedbackReflexion, TarjetaContenido, CheckReflexion + 1 opcional).

### 2026-11-12 · H-VIS-06 — Implementación completa

Contexto: cierre formal de H-VIS-06 (Discipulado + Multijugador Local).

**27 componentes entregados**:

- **Discipulado (9 archivos)**: ElCamino, Leccion, CierreLeccion (pantallas) + SendaHeader, NivelHito, LeccionNode, CaminoPath, EstadoBadge, TarjetaContenido, ProgresoLeccion, CheckReflexion, FeedbackReflexion + estadoVisual util. **Total: 12** (9 componentes + 3 pantallas).
- **Multijugador (9 archivos)**: JugarEnGrupo (pantalla) + SetupJugadores, JugadorSlot, IntersticialPasa, MarcadorJugadores, TurnoJugador, ResultadosGrupo, DesempatePanel + multiplayerVisual util. **Total: 8**.
- **Soporte (5 archivos)**: EstadoVacio, EstadoCarga, EstadoError, EstadoOffline + useOnlineStatus hook.
- **App/Home (2 modificados)**: App.tsx (state-based nav, React.lazy + Suspense, carga stores), Home.tsx (2 accesos nuevos).

**Router state-based**:

- 4 pantallas nuevas: `elcamino`, `leccion`, `cierre`, `grupo`.
- `React.lazy` + `Suspense` con fallback `EstadoCarga`.
- Patrón de Fase 4 respetado. NO se usa `react-router-dom` (deuda no autorizada, `src/router.tsx` eliminado por ser error).

**Sistema de diseño**:

- 5 estados visuales distinguibles sin color (forma + icono + etiqueta): `sin_empezar`, `en_curso`, `recorrida`/`recorrido`, `bloqueado`, `repaso`.
- Identidad multijugador: 4 colores (alba/reino/vida/fuego) + número (1–4) + icono (A3 requisito).
- Paleta Noche y Alba aplicada en todos los componentes.

**Verificación H-VIS-06**:

- `tsc` 0 errores.
- `test:run` 203/203 verdes.
- `build` exit 0, 511 modules, 1.01s.
- Bundle inicial 33.49 kB gzip ≤ 35 kB.
- 5 chunks lazy: ElCamino (2.09 kB), Leccion (1.69 kB), CierreLeccion (0.62 kB), JugarEnGrupo (3.12 kB), EstadoOffline (0.54 kB).
- Grep palabras prohibidas: 0 hits.
- Fase 4 sin regresión.

**3 mejoras aprobadas por PO post-cierre**:

- `DesempatePanel` → `resetPartida()` en lugar de `finalizarPartida()`.
- `SetupJugadores` → `Omit<Jugador, "puntuacion" | "fallos">[]` explícito.
- `MarcadorJugadores` → puntuaciones reactivas desde `jugador.puntuacion`.

### 2026-11-11 · Decisiones de producto y correcciones de ruta

- **D1 (PO)**: "Recorrida/Recorrido" reemplaza "Completado" en toda la UI.
- **A1–A5 (PO)**:
  - A1: Arrancar maquetado con placeholders `[UX]`.
  - A2: Camino top-down.
  - A3: Paleta oficial multijugador (alba/reino/vida/fuego) + número + icono.
  - A4: Sin confeti (glow estático en ganador).
  - A5: `getRatingTiers()` diferido a Fase 6.
- **Ruta canónica**: `src/store/` (SINGULAR, sin "s"). Corregidos 8 archivos que usaban `src/stores/` (plural).
- **`ColorToken` en `Record<>`**: errores de propagación de error-type corregidos con getter seguro `colorJugadorSeguro()` en 5 archivos.
- **10 bugs propios corregidos**: paths `../`, implicit `any`, unused vars, `StatPill` sin `children`, rename `completados`→`recorridos`.

### 2026-11-10 a 2026-11-11 · Reconciliación con Funcional

- **Contradicción resuelta** (`git pull` HEAD `187480a`):
  - Mi reporte §5 decía "selectores stubs".
  - Funcional decía "selectores reales".
  - Verificación: cronología. Mi §5 era correcto contra el código de ese momento. Funcional implementó después. Ambos teníamos razón en momentos distintos.
- **`src/router.tsx` eliminado**: era mío, error mío. No era de Fase 4. No restaurar.
- **`src/stores/` (plural)**: no debe existir. Solo `src/store/` (singular).

---

## 📅 HISTORIAL — VISUAL · FASE 4 (mantenido para contexto)

### 2026-11-11 · Fix: Mostrar 9 sendas en Home

- `CATEGORY_LIST` con 9 categorías.
- Colores de categorías adaptados a paleta oficial.
- Grid `grid-cols-2` en móvil, `sm:grid-cols-3`, `lg:grid-cols-4`.
- Dinamismo: `{CATEGORY_LIST.length} rutas`.

### 2026-11-10 · H-VIS-05: Instalación PWA y flecha de retorno

- `useInstallPrompt` integrado. Modal iOS con icono SVG. Botón Android dispara `installApp()`.
- `Game.tsx`: flecha de retorno con touch target 44×44.

### 2026-11-10 · H-06: Extracción de componentes base

- `Button.tsx`: `min-h-11` + `type="button"`.
- `Card.tsx`: variante `bare` (sin bg/padding/border).
- Refactor `Onboarding` y `Profile` a `<Button>` y `<Card>`.
- Eliminado `SortableList.tsx` (huérfano).

---

## 📊 ESTADO FINAL FASE 5

| Métrica                  | Valor                                              |
| ------------------------ | -------------------------------------------------- |
| Componentes entregados   | 27                                                 |
| Pantallas nuevas         | 4 (ElCamino, Leccion, CierreLeccion, JugarEnGrupo) |
| Pantallas modificadas    | 2 (App, Home)                                      |
| Bundle inicial (gzip)    | 33.68 kB ≤ 35 kB ✅                                |
| Chunks lazy              | 5                                                  |
| Tests verdes             | 209/209 ✅                                         |
| `tsc --noEmit`           | 0 errores ✅                                       |
| Palabras prohibidas (UI) | 0 hits ✅                                          |
| Fase 4 sin regresión     | ✅                                                 |

**Fase 5 CERRADA. Fase 6 pendiente de asignación.**

---

## 🔮 BACKLOG FASE 6 (heredado)

- `getRatingTiers()` en `utils/rating.ts` (Funcional).
- `StatPill` aceptar `children` (Visual).
- `Card` variants: quitar `bg-slate-800` heredado de Fase 4.
- `vendor-motion` 44.37 kB gzip en bundle inicial (evaluar si CWV lo requiere).
- Nombres hashed de chunks → `manualChunks` (Admin, H-ADM-01).
- Comentarios legacy con "usuario"/"test" en `TapToPlace`, `AnimatedBackground`, `ScoreFeedback` (cleanup Fase 6).
- `[UX] Contexto bíblico:` — placeholder pendiente de cierre por UX.
- `SOURCEMAP_BROKEN` warning de `@tailwindcss/vite`.
- `inlineDynamicImports` warning de service worker (Admin).
- Añadir tests de integración UI↔store (lección aprendida del P0).
