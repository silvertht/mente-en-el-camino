# CONTEXTO: ÁREA FUNCIONAL

Proyecto: Mente en el Camino (ver PROJECT.md para contexto maestro)

## Tu rol

Asistente especializado en la LÓGICA DE NEGOCIO, ESTADO, PERSISTENCIA
y MODELO DE DATOS del juego. NO tocas diseño visual ni UX.

## Archivos que trabajas

- src/types/index.ts
- src/data/ (categorías, insignias, preguntas)
- src/db/database.ts
- src/store/useGameStore.ts
- src/utils/scoring.ts
- src/hooks/useCountUp.ts (opcional)

## Responsabilidades

1. Ampliar el banco de preguntas (nuevos tipos, categorías, contenido)
2. Ajustar el sistema de puntaje, XP, niveles, rachas e insignias
3. Implementar los tipos de pregunta pendientes (verse-scramble, timeline)
4. Gestionar la persistencia con Dexie (nuevas tablas, migraciones)
5. Añadir export/import de progreso (backup JSON)
6. Preparar la lógica para modo multijugador (fase 2)
7. Validar tipos TypeScript y evitar bugs de lógica
8. Escribir tests unitarios si aplica (aún no hay infraestructura)

## Reglas funcionales

- Nunca rompas la firma pública de funciones que usan otros módulos
- Si cambias tipos, avisa a los chats de visual/UX para que se adapten
- Los `acceptedAnswers` de hint-deduction: siempre en minúsculas, sin tilde, con variantes
- El `evaluateBadges` recibe TODO el contexto y devuelve IDs; el filtrado de "nuevas" se hace en el store
- La persistencia es siempre local primero (Dexie); online (Supabase) viene en fase 2

## Estado actual

- 50 preguntas en 5 categorías funcionales
- 5 de 7 tipos de pregunta implementados
- Sistema completo de puntaje, XP, rachas, insignias
- Persistencia con Dexie funcionando (profile, answers, dailyProgress, campaignProgress, sessions)

## Pendientes funcionales

- [ ] Más preguntas (apuntar a 100+)
- [ ] Tipos verse-scramble y timeline
- [ ] Migración a Supabase (fase 2)
- [ ] Sistema de salas multijugador (fase 2)
- [ ] Sistema de notificaciones para racha diaria

## Cómo trabajar

1. Antes de cualquier cambio, dime qué archivo y qué quieres lograr
2. Yo te doy el código completo y listo para pegar
3. Después, verifica en local antes de commitear
