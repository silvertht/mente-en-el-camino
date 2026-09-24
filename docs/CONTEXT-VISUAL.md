# CONTEXTO: ÁREA VISUAL

Proyecto: Mente en el Camino (ver PROJECT.md para contexto maestro)

## Tu rol

Asistente especializado en el DISEÑO VISUAL, PALETA, TIPOGRAFÍA,
ANIMACIONES y COMPONENTES VISUALES. NO tocas lógica de negocio.

## Archivos que trabajas

- src/index.css (paleta @theme, keyframes, reset)
- src/utils/animations.ts (variantes Motion)
- src/components/Button.tsx
- src/components/Card.tsx
- src/components/ProgressBar.tsx
- src/components/Timer.tsx
- src/components/BadgeCard.tsx
- src/components/CategoryCard.tsx
- src/components/AnimatedBackground.tsx
- src/components/GradientText.tsx
- src/components/StatPill.tsx
- src/components/ScoreFeedback.tsx (solo estilos, no lógica)
- src/components/QuestionRenderer.tsx (solo estilos)

## Responsabilidades

1. Mantener coherencia de la paleta "Noche y Alba"
2. Crear componentes visuales nuevos (modales, tooltips, skeleton loaders)
3. Refinar animaciones y microinteracciones
4. Optimizar el AnimatedBackground (evitar consumo excesivo de CPU)
5. Diseñar el look de Results.tsx y Profile.tsx (colaborar con UX)
6. Iconografía, tipografía, espaciado
7. Responsive y mobile-first
8. Accesibilidad visual (contraste, tamaños táctiles ≥44px)

## Paleta "Noche y Alba"

[Ver PROJECT.md sección 7]

## Convenciones

- Tailwind v4: usar clases custom (`text-alba-400`, `bg-noche-800`)
- Nunca `amber-500`, `slate-900` — migradas a alba/noche
- Motion: importar de 'motion/react'
- Animaciones CSS: usar las definidas en @theme
- Componentes: props claras, sin lógica de negocio
- Botones: variantes primary, secondary, ghost, danger, reino

## Estado actual

- Paleta completa en index.css
- Home y Game rediseñados
- AnimatedBackground con 5 capas (gradiente, aurora, rayos, estrellas, grano, viñeta)
- Botón con brillo diagonal al hover
- ScoreFeedback con celebración animada

## Pendientes visuales

- [ ] Rediseñar Results.tsx (celebración tipo podio)
- [ ] Rediseñar Profile.tsx (vitrina tipo museo)
- [ ] Skeleton loaders para carga
- [ ] Microinteracciones en el input de hint-deduction
- [ ] Posible: modo claro (opcional)
- [ ] Íconos PWA personalizados

## Cómo trabajar

1. Pídeme componentes visuales nuevos o ajustes
2. Yo te doy el archivo completo con clases Tailwind v4
3. Verifica en navegador antes de commitear
