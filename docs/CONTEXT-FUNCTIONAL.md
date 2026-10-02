# CONTEXT FUNCIONAL — Mente en el Camino (Selah)

Área: **Funcional (lógica de negocio, estado, persistencia, modelo de datos)**
Última actualización: 2026-10-01 (Fase 3)
Estado: ✅ Fase 2 no tocó Funcional. Listo para Fase 3.

---

## 1. Mi rol

Asistente especializado en la **LÓGICA DE NEGOCIO, ESTADO, PERSISTENCIA
y MODELO DE DATOS** del juego.

**NO toco**: diseño visual, UX de flujos, administración, PWA, analytics.

---

## 2. Mi territorio

### Archivos que puedo modificar

- `src/types/index.ts`
- `src/data/` (categories, badges, dailyPrinciples, questions/\*)
- `src/db/database.ts`
- `src/store/useGameStore.ts`
- `src/utils/scoring.ts`
- `src/hooks/useCountUp.ts` (opcional)
- `src/utils/*.test.ts`
- `src/test/setup.ts`
- `vitest.config.ts`

### Archivos compartidos (con coordinación)

- `src/main.tsx` — bloque DEV.
- `src/screens/Home.tsx` — handlers de carga.
- `src/screens/Game.tsx` — `AnswerParams`.

### Archivos que NO toco

- `src/components/**` (excepto `components/questions/` que es Visual).
- `src/screens/Results.tsx`, `Profile.tsx` (Visual/UX).
- `src/index.css`, `src/App.tsx` (Visual).
- `index.html`, `vite.config.ts`, `public/` (Admin/Visual).

---

## 3. Responsabilidades

1. Ampliar banco de preguntas.
2. Ajustar puntaje, XP, niveles, rachas, insignias.
3. Gestionar persistencia Dexie.
4. Export/import de progreso.
5. Preparar lógica para multijugador (Fase 3.5).
6. Validar tipos TypeScript.
7. Escribir y mantener tests.

---

## 4. Reglas funcionales críticas

- **Nunca rompas la firma pública** de funciones usadas por otros módulos.
- Si cambias tipos, avisa a Visual/UX.
- `acceptedAnswers` de hint-deduction: minúsculas, sin tilde, con variantes.
- `evaluateBadges` recibe contexto, devuelve IDs. Filtrado en el store.
- Persistencia local primero (Dexie). Online es Fase 3.5.
- Mobile-first siempre.
- Contenido teológico revisado (RVR1960).
- **NUNCA renombrar `MenteEnElCaminoDB`**.

---

## 5. Sistema de juego (spec viva)

### Puntos

- Base: fácil 10 · medio 20 · difícil 30.
- Bonus rapidez: `round(base × 0.5 × ratio)` (máx +50%).
- Bonus racha: +10 pts a partir de la 3ª.
- Penalización pistas: −5 pts por pista pagada (1ª gratis).
- Clamp: `Math.max(0, total)`.

### XP y niveles

- XP acierto: +10. XP intento: +3.
- `level = floor(sqrt(xp / 100)) + 1`.

### Racha diaria

- +1 por día. Escudo de gracia cada 7 días.
- Sin escudo: racha vuelve a 1.

### Dificultad adaptativa

- Analiza últimas 20 respuestas.
- accuracy > 70% → sube dificultad.
- accuracy < 40% → baja dificultad.
- Trampas: nivel ≥ 3 y accuracy > 65%.

### Insignias

- 19 en `src/data/badges.ts`, cada una con `verse?`.

---

## 6. Tipos de pregunta (7/7)

1. multiple-choice · 2. true-false · 3. verse-scramble
2. who-said-it · 5. timeline · 6. fill-blank · 7. hint-deduction

**verse-scramble y timeline**:

- `words`/`events: string[]` — ya desordenados.
- `correctOrder: number[]` — índices sobre el array de presentación.
- UI (TapToPlace) devuelve `selectedOrder: number[]`.

---

## 7. Estado actual (Fase 3)

### Cerrado en Fase 1 (3 rondas)

- Ronda 1: dailyPrinciples + Badge.verse + dificultad adaptativa.
- Ronda 2: Bugs críticos (Timer, pista inicial, tildes).
- Ronda 3: Tipos verse-scramble + timeline + 14 datos + vitest.

### Fase 2

- **No se tocó** (por tiempo y descanso).
- Handoff de Admin (Analytics): aplicado en `src/main.tsx` por el chat principal.
- Contrato `onAnswer(order: number[])` compatible con TapToPlace.

### Pendientes activos

- Ampliar banco 70 → 100+ preguntas.
- Documentar workflow de contenido (Admin lo documenta).
- Renombrar comentarios cosméticos (opcional).

### Pendientes bloqueados

- Migración a Supabase (Fase 3.5).
- Sistema de salas multijugador (Fase 3.5).
- Notificaciones de racha (coordinar con UX + Admin).

---

## 8. Métricas actuales

| Métrica                      | Valor     |
| ---------------------------- | --------- |
| Preguntas en banco           | 70        |
| Categorías activas           | 5 (de 9)  |
| Tipos de pregunta            | 7/7       |
| Data educativa completa      | 70/70     |
| acceptedAnswers normalizadas | 6/6       |
| Tests unitarios              | 66/66     |
| Build                        | ~1 s      |
| Bundle gzip                  | 180.87 kB |
| Insignias                    | 19        |
| Principios del día           | 31        |

---

## 9. Cómo trabajar

1. Antes de cualquier cambio: dime archivo y objetivo.
2. Yo te doy código completo listo para pegar.
3. Verifica en local (`npm run build` + `npm run test`).
4. Actualiza `CHANGELOG-FUNCIONAL.md` tras cada tarea.

---

## 10. Referencias rápidas

- **Store**: `src/store/useGameStore.ts`.
- **DB**: `src/db/database.ts` — `getRecentAccuracy`, `exportBackup`, `importBackup`.
- **Scoring**: `src/utils/scoring.ts`.
- **Questions**: `src/data/questions/index.ts`.

---

**Fin del CONTEXT-FUNCIONAL (Fase 3).**
