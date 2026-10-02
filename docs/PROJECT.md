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
**Estado**: PWA instalable + Analytics activo. Fase 3 en curso (validación + crecimiento).

## 2. Stack técnico

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS v4 (@theme en src/index.css, NO tailwind.config.js)
- Motion (motion/react, NO framer-motion)
- Zustand v5 (estado global)
- Dexie.js (IndexedDB, offline-first)
- vite-plugin-pwa (CONFIGURADO — manifest, SW, 4 íconos)
- @vercel/analytics + @vercel/speed-insights
- Vitest 5 (66 tests pasando)
- GitHub Desktop + Vercel

## 3. Estructura de archivos

src/
├── types/index.ts → tipos TypeScript
├── data/
│ ├── categories.ts → 9 categorías (5 activas)
│ ├── badges.ts → 19 insignias
│ ├── dailyPrinciples.ts → 31 principios del día
│ └── questions/
│ ├── index.ts → pickAdaptiveQuestions + audit
│ ├── evangelios.ts → 14 preguntas
│ ├── personajes.ts → 10 preguntas
│ ├── versiculos.ts → 17 preguntas
│ ├── parabolas.ts → 10 preguntas
│ └── valores.ts → 10 preguntas
│ (Total: 70 preguntas)
├── db/database.ts → Dexie
├── store/useGameStore.ts → Zustand
├── utils/
│ ├── scoring.ts
│ ├── animations.ts
│ └── deviceTier.ts
├── components/
│ ├── ... (visuales)
│ └── questions/ → 7 tipos + TapToPlace + 2 wrappers
│ (SortableList @deprecated)
└── screens/
├── Home.tsx · Game.tsx · Results.tsx · Profile.tsx
public/
├── 4 íconos PWA
└── favicon.svg (llama Selah)

## 4. Sistema de juego

- **Puntos**: fácil 10 · medio 20 · difícil 30
- **Bonus rapidez**: hasta +50%
- **Bonus racha**: +10 pts desde la 3ª correcta consecutiva
- **Pistas**: −5 pts por pista pagada (1ª gratis)
- **XP**: +10 acierto / +3 intento
- **Nivel**: floor(sqrt(xp / 100)) + 1
- **Racha diaria**: escudo de gracia cada 7 días
- **Rating adaptativo (ELO-like)**:
  - K=32 early / K=16 stable.
  - `MAX_STRETCH = 400` (nunca sirve pregunta > userRating + 400).
  - Bandas ±(150/100), mezcla 60/20/20.
  - Reemplaza al sistema anterior por accuracy.
  - `getRatingLabel()` para mostrar en UI.
  - `calibrateWithResults()` para onboarding.
- **Insignias**: 19

## 5. Tipos de pregunta (7/7)

1. multiple-choice · 2. true-false · 3. verse-scramble · 4. who-said-it
2. timeline · 6. fill-blank · 7. hint-deduction

`verse-scramble` y `timeline` usan **TapToPlace**.

## 6. Paleta "Noche y Alba"

- **Noche**: 950 #060912 · 900 #0B0F1A · 800 #131A2B · 700 #1E2842 · 600 #2D3A5A
- **Alba**: 400 #FFD166 · 500 #F5B544 · 600 #D18F1E · 700 #A36D12
- **Reino**: 400 #A78BFA · 500 #7C3AED · 600 #5B21B6
- **Fuego**: 400 #FB923C · 500 #F97316
- **Vida**: 400 #34D399 · 500 #10B981
- **Alerta**: 400 #F87171 · 500 #EF4444

**Prohibido**: slate-_, amber-_, emerald-_, red-_, indigo-\*.

## 7. Convenciones de código

- PascalCase componentes, camelCase utilidades
- `import type` para tipos
- Zustand: selectores atómicos
- Motion: `import { motion } from 'motion/react'`
- Tailwind v4: sin tailwind.config.js
- Comentarios en español

## 8. Deploy

- Local: `npm run dev` → http://localhost:5173
- Build: `npm run build`
- Tests: `npm run test`
- Preview: `npm run preview` → http://localhost:4173
- Producción: push a main → Vercel auto
- Commits: GitHub Desktop

## 9. Estado de las áreas (Fase 3)

| Área      | Estado                  | Pendiente real                                  |
| --------- | ----------------------- | ----------------------------------------------- |
| Funcional | ✅ Rating R1-R3 cerrado | R5 limpieza · Ampliar banco 70 → 110+           |
| Visual    | ✅ Fase 2 limpia        | Rating en Profile (handoff) · Bloqueado Test #2 |
| UX        | ✅ Fase 2 cerrada       | Onboarding calibración · Test #2                |
| Admin     | ⏳ Tarea 3 activa       | Core Web Vitals · Supabase (Fase 3.5)           |

## 10. Roadmap Fase 3

### Prioridad 1 — Validación

- [ ] **Test #2 con los 5 jóvenes** ← PRÓXIMO
- [ ] Análisis de feedback (UX)
- [ ] Lectura Core Web Vitals (Admin)

### Prioridad 2 — Crecimiento

- [ ] Ampliar banco 70 → 100+ (Funcional + Admin workflow)
- [ ] Onboarding de primera vez (UX)
- [ ] Notificaciones para racha (UX + Admin)
- [ ] Retirar `SortableList.tsx` (Visual)

### Prioridad 3 — Escalabilidad (Fase 3.5)

- [ ] Migración a Supabase
- [ ] Panel de administración
- [ ] Modo claro opcional (Visual)

## 11. Reglas de oro

1. Nunca romper lógica funcional sin avisar
2. Mobile-first siempre
3. Nunca exponer node_modules a GitHub
4. Cada respuesta enseña
5. Contenido teológico revisado (RVR1960)
6. Optimizar peso
7. Un chat por área, todo pasa por el product owner
8. **NUNCA renombrar `MenteEnElCaminoDB`** (rompe IndexedDB)

## 12. Métricas actuales

| Métrica            | Valor                  |
| ------------------ | ---------------------- |
| Preguntas en banco | 70                     |
| Categorías activas | 5 (de 9)               |
| Tipos de pregunta  | 7/7                    |
| Insignias          | 19                     |
| Principios del día | 31                     |
| Tests unitarios    | 127/127                |
| Bundle gzip        | 181.51 kB              |
| Precache PWA       | 15 entries · 805.98 KB |
| PWA installable    | ✅ Chrome              |
| Web Analytics      | ✅ Funcionando         |
| Speed Insights     | ⏳ Recolectando        |
| Rating adaptativo  | ✅ Activo              |

## 13. Historial de fases

- **Fase 1** (sep 2026): MVP completo. Funcional (3 rondas) · Visual (4 rondas) · UX (4 sesiones).
- **Fase 2** (sep-oct 2026): Producción. PWA + Analytics + TapToPlace + Rebrand Selah + accesibilidad.
- **Fase 3** (en curso): Validación con usuarios + crecimiento.

## 14. Workflow

1. Product owner define tarea.
2. Abre chat del área.
3. Pega `PROJECT.md` + `CONTEXT-{área}.md` + `CHANGELOG-{área}.md` + `CHANGELOG.md` global.
4. Chat entrega solución.
5. Product owner aplica, verifica, commitea, push.
6. Vercel redeploya.
7. Actualiza `CHANGELOG-{área}.md` local.
8. **Solo al volver al chat maestro**: actualiza `CHANGELOG.md` global.

## 15. Documentos en docs/

- `PROJECT.md` (este)
- `CHANGELOG.md` (global — solo toca el chat maestro)
- `CONTEXT-{área}.md` + `CHANGELOG-{área}.md` (por área)
- `ANALYTICS.md`
- `FEEDBACK.md`
