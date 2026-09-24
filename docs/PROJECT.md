# MENTE EN EL CAMINO — Contexto Maestro (Fase 2)

## 1. Qué es

Trivia bíblica interactiva para jóvenes (13-25 años) con retos mentales
reales y componente educativo. Cada respuesta acompaña con explicación,
versículo, aplicación y reflexión.

**Nombre técnico**: mente-en-el-camino
**Nombre visible**: Mente en el Camino
**Repo**: github.com/silverth/mente-en-el-camino
**URL producción**: https://mente-en-el-camino.vercel.app
**Estado**: MVP funcional desplegado. Fase 2 en curso (medición, crecimiento).

## 2. Stack técnico

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS v4 (configuración vía @theme en src/index.css, NO tailwind.config.js)
- Motion (motion/react, antes Framer Motion)
- Zustand v5 (estado global)
- Dexie.js (IndexedDB, persistencia offline)
- vite-plugin-pwa (instalado, SIN CONFIGURAR)
- Vitest 5 (tests unitarios, 66 pasando)
- GitHub Desktop + Vercel para deploy

## 3. Estructura de archivos

src/
├── types/index.ts → todos los tipos TypeScript
├── data/
│ ├── categories.ts → 9 categorías (5 activas)
│ ├── badges.ts → 19 insignias (con verse)
│ ├── dailyPrinciples.ts → 31 principios del día
│ └── questions/
│ ├── index.ts → helpers + pickAdaptiveQuestions + audit
│ ├── evangelios.ts → 14 preguntas
│ ├── personajes.ts → 10 preguntas
│ ├── versiculos.ts → 17 preguntas
│ ├── parabolas.ts → 10 preguntas
│ └── valores.ts → 10 preguntas
│ (Total: 70 preguntas)
├── db/database.ts → Dexie: profile, answers, daily, campaign, sessions
├── store/useGameStore.ts → Zustand: state + actions
├── utils/
│ ├── scoring.ts → puntos, niveles, rachas, insignias
│ ├── animations.ts → variantes Motion
│ └── deviceTier.ts → detección de capacidad del dispositivo
├── hooks/useCountUp.ts
├── test/setup.ts → config vitest
├── components/
│ ├── Button, Card, ProgressBar, Timer, BadgeCard, CategoryCard
│ ├── ScoreFeedback, QuestionRenderer, AnimatedBackground, GradientText
│ ├── StatPill, Skeleton, Modal, BadgeDetailModal, PromptDialog, ConfirmDialog
│ └── questions/ → 7 tipos + SortableList + 2 wrappers
└── screens/
├── Home.tsx → rediseñado (identidad + reto + bitácora + sendas)
├── Game.tsx → rediseñado (dots + timer flotante + racha)
├── Results.tsx → rediseñado (podio de 5 niveles)
└── Profile.tsx → rediseñado (bitácora + vitrina)

## 4. Sistema de juego

- **Puntos base**: fácil 10, medio 20, difícil 30
- **Bonus rapidez**: hasta +50% si responde instantáneo
- **Bonus racha**: +10 pts a partir de la 3ª correcta consecutiva
- **Penalización pistas**: −5 pts por pista pagada (la 1ª es gratis)
- **XP**: +10 por acierto, +3 por intento
- **Nivel**: level = floor(sqrt(xp / 100)) + 1
- **Racha diaria**: escudo de gracia cada 7 días
- **Dificultad adaptativa**: pickAdaptiveQuestions ajusta según accuracy reciente
  - accuracy > 70% → sube dificultad
  - accuracy < 40% → baja dificultad
  - trampas (hint-deduction difícil) solo si nivel ≥ 3 y accuracy > 65%
- **Insignias**: 19, evaluadas al terminar partida

## 5. Tipos de pregunta (7/7 implementados)

1. multiple-choice · 2. true-false · 3. verse-scramble · 4. who-said-it
2. timeline · 6. fill-blank · 7. hint-deduction

Todos con: explanation + verse + verseText + application + reflection.

## 6. Paleta "Noche y Alba"

- **Noche**: 950 #060912 · 900 #0B0F1A · 800 #131A2B · 700 #1E2842 · 600 #2D3A5A
- **Alba**: 400 #FFD166 · 500 #F5B544 · 600 #D18F1E · 700 #A36D12
- **Reino**: 400 #A78BFA · 500 #7C3AED · 600 #5B21B6
- **Fuego**: 400 #FB923C · 500 #F97316
- **Vida**: 400 #34D399 · 500 #10B981
- **Alerta**: 400 #F87171 · 500 #EF4444

Configurada en @theme de src/index.css (Tailwind v4).
**Prohibido**: slate-_, amber-_, emerald-_, red-_, indigo-\*.

## 7. Convenciones de código

- Componentes PascalCase, archivos con nombre del componente
- Funciones utilitarias camelCase
- Tipos en src/types/index.ts, import con `import type`
- Zustand: selectores atómicos, NUNCA devolver objetos sin useShallow
- Motion: `import { motion } from 'motion/react'`
- Tailwind v4: sin tailwind.config.js, todo vía @theme
- Comentarios y variables en español cuando aplique

## 8. Deploy

- Local: `npm run dev` → http://localhost:5173
- Build: `npm run build` → genera dist/
- Tests: `npm run test`
- Producción: push a main → Vercel redeploya automático (1-2 min)
- GitHub Desktop para commits (no terminal)

## 9. Estado de las áreas

| Área      | Estado          | Pendientes                                   |
| --------- | --------------- | -------------------------------------------- |
| Funcional | ✅ Cerrado      | Ampliar banco 70 → 100+ (post Test #2)       |
| Visual    | ✅ Cerrado      | Íconos PWA (bloqueado por Admin)             |
| UX        | ⏳ 1 validación | Validar en móvil real                        |
| Admin     | 🔴 Sin empezar  | PWA · Analytics · Core Web Vitals · Supabase |

## 10. Roadmap Fase 2 (post-Test #2)

### Prioridad 1 — Producción real

- [ ] Configurar PWA (manifest, íconos, service worker) [Admin + Visual]
- [ ] Instalar Vercel Analytics + Speed Insights [Admin]
- [ ] Medir Core Web Vitals reales en móvil [Admin]

### Prioridad 2 — Crecimiento

- [ ] Ampliar banco a 100+ preguntas [Funcional]
- [ ] Onboarding de primera vez [UX]
- [ ] Sistema de notificaciones para racha [UX + Admin]
- [ ] Migración a Supabase (cuentas + multijugador) [Admin + Funcional]

### Prioridad 3 — Pulido

- [ ] Análisis Test #2 y siguientes [UX]
- [ ] Microinteracciones refinadas [Visual]
- [ ] Modo claro opcional [Visual]

## 11. Reglas de oro

1. Nunca romper lógica funcional sin avisar
2. Mobile-first siempre
3. Nunca exponer node_modules a GitHub
4. Cada respuesta enseña
5. Contenido teológico revisado antes de publicar (RVR1960)
6. Optimizar peso: assets ligeros, sin librerías grandes
7. Un chat por área, todo pasa por el usuario (product owner)

## 12. Métricas actuales

| Métrica            | Valor    |
| ------------------ | -------- |
| Preguntas en banco | 70       |
| Categorías activas | 5 (de 9) |
| Tipos de pregunta  | 7/7      |
| Insignias          | 19       |
| Principios del día | 31       |
| Tests unitarios    | 66/66    |
| Build time         | 629 ms   |
| Bundle gzip        | 181 kB   |

## 13. Historial de fases

- **Fase 1** (sep 2026): construcción del MVP completo.
  Funcional (3 rondas) · Visual (4 rondas) · UX (4 sesiones).
- **Fase 2** (en curso): producción, medición, crecimiento.
