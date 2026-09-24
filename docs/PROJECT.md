# MENTE EN EL CAMINO — Contexto Maestro

## 1. Qué es

Trivia bíblica interactiva para jóvenes (13-25 años) con retos mentales reales
y componente educativo. No es solo "preguntas y respuestas": cada respuesta
acompaña con explicación, versículo, aplicación y reflexión.

**Nombre técnico**: mente-en-el-camino
**Nombre visible**: Mente en el Camino
**Repo**: github.com/silverth/mente-en-el-camino
**URL producción**: https://mente-en-el-camino.vercel.app
**Estado**: MVP funcional desplegado, listo para iteración con feedback real.

## 2. Stack técnico

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS v4 (configuración vía @theme en src/index.css, NO tailwind.config.js)
- Motion (motion/react, antes Framer Motion) para animaciones
- Zustand v5 (estado global)
- Dexie.js (IndexedDB, persistencia offline)
- vite-plugin-pwa (instalado, aún sin configurar)
- GitHub Desktop + Vercel para deploy

## 3. Estructura de archivos

src/
├── types/index.ts → todos los tipos TypeScript
├── data/
│ ├── categories.ts → 9 categorías (5 activas en MVP)
│ ├── badges.ts → ~19 insignias
│ └── questions/
│ ├── index.ts → helpers: getQuestionsByCategory, pickRandom, shuffle
│ ├── evangelios.ts → 10 preguntas
│ ├── personajes.ts → 10 preguntas
│ ├── versiculos.ts → 10 preguntas
│ ├── parabolas.ts → 10 preguntas
│ └── valores.ts → 10 preguntas
├── db/database.ts → Dexie: profile, answers, dailyProgress, campaignProgress, sessions
├── store/useGameStore.ts → Zustand: init, startGame, answerQuestion, nextQuestion, finishGame
├── utils/
│ ├── scoring.ts → puntos, niveles, rachas, insignias, resumen
│ └── animations.ts → variantes Motion: fadeInUp, popIn, celebrate, staggerContainer
├── hooks/useCountUp.ts → contador animado
├── components/
│ ├── Button, Card, ProgressBar, Timer, BadgeCard, CategoryCard
│ ├── ScoreFeedback, QuestionRenderer, AnimatedBackground, GradientText, StatPill
│ └── questions/ → MultipleChoice, TrueFalse, FillBlank, WhoSaidIt, HintDeduction
└── screens/
├── Home.tsx → rediseñado con paleta Noche y Alba
├── Game.tsx → rediseñado con dots de progreso y timer flotante
├── Results.tsx → pendiente de rediseño
└── Profile.tsx → pendiente de rediseño

## 4. Sistema de juego

- **Puntos base**: fácil 10, medio 20, difícil 30
- **Bonus por rapidez**: hasta +50% si responde en menos de la mitad del tiempo
- **Bonus racha**: +10 pts por cada correcta consecutiva a partir de la 3ª
- **Penalización pistas**: −5 pts por pista usada (tipo hint-deduction)
- **XP**: +10 por acierto, +3 por intento
- **Fórmula de nivel**: `level = floor(sqrt(xp / 100)) + 1`
  - Nivel 1 → 0 XP · Nivel 2 → 100 XP · Nivel 3 → 400 XP · Nivel 4 → 900 XP
- **Racha diaria**: si juega cada día +1. Si se salta días, consume "escudo de gracia" (se recarga cada 7 días de racha). Si no tiene escudo, racha vuelve a 1.
- **Insignias**: ~19, evaluadas en `evaluateBadges` al terminar partida.

## 5. Tipos de pregunta (7)

1. `multiple-choice` — 3-4 opciones, una correcta
2. `true-false` — enunciado, verdadero/falso
3. `verse-scramble` — ordenar palabras (UI pendiente)
4. `who-said-it` — cita, adivinar personaje
5. `timeline` — ordenar eventos (UI pendiente)
6. `fill-blank` — completar versículo con opciones
7. `hint-deduction` — pistas progresivas + escribir respuesta

Cada pregunta incluye:

- `explanation` (obligatoria)
- `verse` + `verseText` (referencia y texto)
- `application` (práctica)
- `reflection` (pregunta para grupo)

## 6. Contenido actual

50 preguntas en 5 categorías activas:

- evangelios (10)
- personajes (10)
- versiculos (10)
- parabolas (10)
- valores (10)

Categorías futuras (sin contenido): genesis, exodo, apologetica, historia-iglesia.

## 7. Paleta "Noche y Alba"

- **Noche** (fondos): 950 #060912, 900 #0B0F1A, 800 #131A2B, 700 #1E2842, 600 #2D3A5A
- **Alba** (dorado principal): 400 #FFD166, 500 #F5B544, 600 #D18F1E, 700 #A36D12
- **Reino** (violeta): 400 #A78BFA, 500 #7C3AED, 600 #5B21B6
- **Fuego** (racha): 400 #FB923C, 500 #F97316
- **Vida** (correcto): 400 #34D399, 500 #10B981
- **Alerta** (error): 400 #F87171, 500 #EF4444

Configurada en `@theme` de Tailwind v4 dentro de `src/index.css`.

## 8. Animaciones personalizadas (CSS keyframes)

- `float` (4s): flotar suave
- `shimmer` (3s): brillo que recorre
- `glow` (2s): resplandor
- `pulse-soft` (3s): pulsación suave
- `rays` (8s): rotación de rayos

Variantes Motion en `src/utils/animations.ts`:
`fadeInUp`, `fadeIn`, `scaleIn`, `popIn`, `slideInRight`, `staggerContainer`, `celebrate`.

## 9. Convenciones de código

- Componentes en PascalCase, archivos con nombre del componente
- Funciones utilitarias en camelCase
- Tipos en `src/types/index.ts`, importados con `import type`
- Zustand: selectores atómicos (una pieza por selector), NUNCA devolver objetos nuevos sin `useShallow`
- Motion: `import { motion } from 'motion/react'` (NO 'framer-motion')
- Tailwind v4: sin tailwind.config.js, todo vía `@theme` en CSS
- Comentarios y nombres de variables en español cuando aplique

## 10. Deploy

- **Local**: `npm run dev` → http://localhost:5173
- **Build**: `npm run build` → genera `dist/`
- **Producción**: push a main en GitHub → Vercel redeploya automático en 1-2 min
- **GitHub Desktop** para commits y push (no usa terminal)

## 11. Roadmap pendiente

### Fase 1 (post-test):

- [ ] Rediseñar Results.tsx (celebración tipo podio)
- [ ] Rediseñar Profile.tsx (vitrina de insignias)
- [ ] Configurar PWA (manifest, íconos, service worker)
- [ ] Implementar tipos verse-scramble y timeline
- [ ] Incorporar feedback de los 5 testers

### Fase 2 (después):

- [ ] Modo multijugador en vivo (salas con código)
- [ ] Supabase para cuentas y ranking online
- [ ] Más contenido (>100 preguntas)
- [ ] Panel de administración de contenido
- [ ] Sonidos sutiles

## 12. Reglas de oro

1. Nunca romper la lógica funcional sin avisar
2. Mobile-first siempre (la mayoría jugará en teléfono)
3. Nunca exponer `node_modules` a GitHub (.gitignore Node)
4. Cada respuesta enseña, aunque sea incorrecta
5. Contenido teológico revisado antes de publicar
6. Optimizar peso: assets ligeros, evitar librerías grandes innecesarias
