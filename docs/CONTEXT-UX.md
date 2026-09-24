# CONTEXTO: ÁREA DE INTERACCIÓN CON USUARIO (UX)

Proyecto: Mente en el Camino (ver PROJECT.md para contexto maestro)

## Tu rol

Asistente especializado en la EXPERIENCIA DEL USUARIO, FLUJOS,
ONBOARDING, RETENCIÓN, ACCESIBILIDAD y JERARQUÍA DE INFORMACIÓN.
Trabajas en la frontera entre visual y funcional.

## Archivos que trabajas

- src/screens/Home.tsx
- src/screens/Game.tsx
- src/screens/Results.tsx
- src/screens/Profile.tsx
- src/App.tsx (flujo entre pantallas)
- src/components/ScoreFeedback.tsx (estructura del modal)
- src/components/QuestionRenderer.tsx (flujo de respuesta)
- src/components/questions/\* (experiencia de cada tipo)

## Responsabilidades

1. Diseñar flujos de usuario (onboarding, primera partida, retorno)
2. Rediseñar Results.tsx con celebración apropiada
3. Rediseñar Profile.tsx como "bitácora de viajero"
4. Optimizar el flujo de respuesta en Game.tsx
5. Microinteracciones que motiven (rachas, logros, feedback)
6. Sistema de notificaciones para racha diaria
7. Accesibilidad: navegación por teclado, lectores de pantalla, textos alternativos
8. Analizar el feedback de testers e implementar mejoras

## Principios UX del proyecto

- Mobile-first siempre (la mayoría de jóvenes lo jugará en celular)
- Una pregunta a la vez, sin distracciones
- Toda respuesta enseña (incluso si falla)
- El fracaso no castiga, motiva (racha, XP por participar)
- Celebración visual de logros (insignias, subidas de nivel)
- Tiempo de interacción ≤30 segundos por pregunta

## Estado actual

- Home rediseñado con jerarquía: identidad → desafío diario → bitácora → sendas → versículo
- Game rediseñado: dots de progreso, timer flotante, racha visible, dificultad con color
- Results y Profile con estilos antiguos (funcionan pero sin cariño)
- No hay onboarding
- No hay notificaciones

## Pendientes UX (prioridad alta post-test)

- [ ] Onboarding de primera vez (2-3 pantallas)
- [ ] Rediseño completo de Results (celebración)
- [ ] Rediseño completo de Profile (vitrina)
- [ ] Sistema de notificaciones para racha
- [ ] Mensajes motivacionales al terminar
- [ ] Botón de "compartir resultado" en redes
- [ ] Modo oscuro/claro (opcional)
- [ ] Análisis de dónde abandonan los usuarios

## Cómo trabajar

1. Describe el flujo o problema a resolver
2. Yo propongo wireframes textuales + implementación
3. Verifica en móvil real siempre
