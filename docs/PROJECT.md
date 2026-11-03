# MENTE EN EL CAMINO — Contexto Maestro (Fase 3)

## 1. Qué es

Trivia bíblica interactiva para jóvenes (13-25 años) con retos mentales
reales y componente educativo. Cada respuesta acompaña con explicación,
versículo, aplicación y reflexión.

**Nombre técnico**: mente-en-el-camino
**Nombre público (marca)**: Selah
**Significado de marca**: "Pausa, medita" (hebreo, aparece 74 veces en los Salmos).
**Slogan**: "Pausa. Reflexiona. Aprende."
**Repo**: github.com/silverth/mente-en-el-camino
**URL producción**: https://mente-en-el-camino.vercel.app
**Estado**: PWA + Analytics + Rating ELO activo. Fase 3 en curso.

## 2. Stack técnico

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS v4 (@theme en src/index.css, NO tailwind.config.js)
- Motion (motion/react, NO framer-motion)
- Zustand v5 (estado global)
- Dexie.js (IndexedDB, offline-first)
- vite-plugin-pwa (CONFIGURADO)
- @vercel/analytics + @vercel/speed-insights
- Vitest 5 (127 tests pasando)
- GitHub Desktop + Vercel

## 3. Estructura de archivos clave

src/
├── types/index.ts → tipos TypeScript
├── data/
│ ├── categories.ts → 9 categorías (5 activas)
│ ├── badges.ts → 19 insignias
│ ├── dailyPrinciples.ts → 31 principios
│ └── questions/ → 70 preguntas (7/7 tipos)
├── db/database.ts → Dexie v2 (profile, answers, userRating, etc)
├── store/useGameStore.ts → Zustand (estado + rating ELO)
├── utils/
│ ├── scoring.ts → puntos, XP, niveles
│ ├── rating.ts → sistema ELO-like
│ ├── animations.ts
│ └── deviceTier.ts
├── components/
│ ├── questions/ → TapToPlace + wrappers
└── screens/
├── Home.tsx · Game.tsx · Results.tsx · Profile.tsx (con rating)

## 4. Sistema de juego

- **Puntos**: fácil 10 · medio 20 · difícil 30
- **XP**: +10 acierto / +3 intento. Nivel: floor(sqrt(xp/100))+1.
- **Racha**: escudo de gracia cada 7 días.
- **Rating adaptativo ELO**:
  - K=32 early / K=16 stable.
  - `MAX_STRETCH = 400` (nunca pregunta > userRating + 400).
  - `calibrateWithResults()` para onboarding.
- **Insignias**: 19, evaluadas al terminar partida.

## 5. Tipos de pregunta (7/7)

MC, TF, verse-scramble, who-said-it, timeline, fill-blank, hint-deduction.
`verse-scramble` y `timeline` usan **TapToPlace**.

## 6. Paleta "Noche y Alba"

Noche (#060912 a #2D3A5A) · Alba (#FFD166 a #A36D12) · Reino (#A78BFA a #5B21B6) · Fuego · Vida · Alerta.
**Prohibido**: slate-_, amber-_, emerald-_, red-_, indigo-\*.

## 7. Deploy

- Local: `npm run dev` → http://localhost:5173
- Producción: push a main → Vercel auto
- Commits: GitHub Desktop

## 8. Estado de las áreas (Fase 3)

| Área      | Estado                             | Pendiente real                             |
| --------- | ---------------------------------- | ------------------------------------------ |
| Funcional | ✅ Rating R1-R3 cerrado            | R5 limpieza · Ampliar banco 70 → 110+      |
| Visual    | ✅ Rating en Profile visible       | Refinamientos · Eliminar SortableList      |
| UX        | ✅ Reconocimiento pre-Test #2      | Fix AnswerParams · Handoff Timer · Test #2 |
| Admin     | 🟡 Workflow redactado (sin commit) | Core Web Vitals · Crear archivos docs      |

## 9. Reglas de oro

1. Nunca romper lógica funcional sin avisar.
2. Mobile-first siempre.
3. Un chat por área, todo pasa por el product owner.
4. **NUNCA renombrar `MenteEnElCaminoDB`** (rompe IndexedDB).
5. Contenido teológico RVR1960.

## 10. Métricas actuales

| Métrica           | Valor                  |
| ----------------- | ---------------------- |
| Preguntas         | 70 (5 de 9 categorías) |
| Tipos de pregunta | 7/7                    |
| Tests unitarios   | 127/127                |
| Bundle gzip       | 182.12 kB              |
| PWA installable   | ✅ Chrome              |
| Rating ELO        | ✅ Activo              |
| Costo             | $0/mes                 |
