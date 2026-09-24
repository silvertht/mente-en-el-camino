# CONTEXTO: ÁREA DE ADMINISTRACIÓN

Proyecto: Mente en el Camino (ver PROJECT.md para contexto maestro)

## Tu rol

Asistente especializado en ADMINISTRACIÓN DEL CONTENIDO, DEPLOY,
ANALÍTICA y ESCALABILIDAD. Trabajas en la infraestructura del proyecto.

## Áreas de trabajo

1. **Gestión de contenido**
   - Cómo agregar/editar/eliminar preguntas sin romper el juego
   - Estructura de archivos de contenido por categoría
   - Revisión teológica del contenido antes de publicar
   - Versionado de preguntas (si cambias una, no afectes partidas activas)

2. **Deploy y CI/CD**
   - GitHub Desktop para commits
   - Vercel: deploy automático al hacer push a main
   - Rollback si algo sale mal
   - Preview deployments para pruebas antes de publicar

3. **Analítica** (pendiente)
   - Integrar Vercel Analytics o Plausible
   - Métricas a medir: usuarios activos, retención D1/D7, preguntas más falladas, tiempo por pregunta, abandono
   - Respetar privacidad de menores

4. **Escalabilidad**
   - Migración a Supabase cuando haya cuentas y multijugador
   - Balanceo de carga (Vercel lo maneja)
   - CDN (Vercel lo maneja)
   - Costos: todo en plan gratuito por ahora

5. **Gestión de usuarios** (fase 2)
   - Sistema de autenticación con Supabase
   - Roles: jugador, líder de grupo, admin
   - Panel de administración para revisar contenido reportado

6. **Backup y recuperación**
   - Export/import de progreso local (ya implementado en Dexie)
   - Backup del repositorio (GitHub lo maneja)
   - Backup de base de datos (fase 2 con Supabase)

## Estado actual

- Repo en GitHub: silverth/mente-en-el-camino
- Deploy en Vercel: mente-en-el-camino.vercel.app
- Sin analítica aún
- Sin usuarios/cuentas (solo localStorage)
- Sin panel de administración
- Costos: $0 (todo free tier)

## Pendientes administrativos

- [ ] Documentar workflow para agregar preguntas
- [ ] Configurar Vercel Analytics
- [ ] Crear guía para validación teológica del contenido
- [ ] Preparar migración a Supabase (fase 2)
- [ ] Definir política de privacidad (para menores)
- [ ] Sistema de reporte de errores en preguntas

## Convenciones

- Nunca hacer push directo a main sin probar en local
- Mensajes de commit descriptivos en español
- Nombres de archivos y categorías en kebab-case
- Un commit = un cambio lógico
- Probar en móvil antes de cada deploy importante

## Cómo trabajar

1. Describe la tarea administrativa
2. Yo te doy pasos específicos o scripts
3. Documenta cada decisión en `docs/` del repo
