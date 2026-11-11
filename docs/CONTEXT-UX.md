# CONTEXT-UX — Mente en el Camino (Selah)

Documento maestro del área UX. Define identidad, territorio, principios, marca, estado por fase, decisiones consolidadas, hallazgos abiertos, pendientes, métricas y metodología operativa.

## Metadatos

| Campo                       | Valor                                                                                                                     |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Área**                    | Experiencia de Usuario (UX)                                                                                               |
| **Proyecto**                | Mente en el Camino (marca pública: Selah)                                                                                 |
| **Fase activa**             | 5 (Fase 4 cerrada)                                                                                                        |
| **Última actualización**    | 2026-11-11                                                                                                                |
| **Estado del área**         | Onboarding validado en producción. Modal PWA y flecha de retorno integrados. Regla de tests de comportamiento instaurada. |
| **Documentos relacionados** | `CHANGELOG-UX.md`, `INTERFACES-UX.md`, `MICROCOPY-ONBOARDING.md`, `CHANGELOG.md`                                          |

---

## 1. Identidad del área

### 1.1 Misión

UX gobierna la **experiencia del usuario de punta a punta**: cómo recorre la app, qué lee, qué toca, en qué orden, con qué fricción y con qué accesibilidad. Trabaja en la frontera entre lo visual y lo funcional: no diseña el sistema visual ni la lógica, pero sí define cómo el usuario los recorre.

### 1.2 Responsabilidades formales

1. Diseñar flujos de usuario (onboarding, primera partida, retorno, abandono).
2. Redactar y mantener el microcopy global y el de cada tipo de pregunta.
3. Diseñar el sistema de notificaciones de racha diaria.
4. Garantizar accesibilidad AA (teclado, lectores de pantalla, contraste, concordancia de género).
5. Analizar feedback de testers y traducirlo a mejoras ejecutables.
6. Velar por la coherencia de la marca "Selah" en todo texto user-facing.
7. Documentar handoffs a otras áreas cuando una decisión UX requiera cambios fuera de su territorio.

### 1.3 Límites explícitos

UX **no hace**:

- Lógica de negocio, scoring, persistencia ni estado global (Funcional).
- Sistema visual, paleta, animaciones ni componentes de interacción (Visual).
- Configuración de PWA, manifest, Workbox, analytics ni infraestructura (Admin).

---

## 2. Territorio

### 2.1 Archivos modificables directamente por UX

| Archivo                            | Tipo de intervención permitida          |
| :--------------------------------- | :-------------------------------------- |
| `src/screens/Home.tsx`             | Flujo de entrada, jerarquía, microcopy  |
| `src/screens/Game.tsx`             | Flujo de partida, microcopy de estados  |
| `src/screens/Results.tsx`          | Flujo de cierre, celebración, microcopy |
| `src/screens/Profile.tsx`          | Jerarquía de perfil, microcopy          |
| `src/screens/Onboarding.tsx`       | Flujo completo, estados, a11y (Fase B)  |
| `src/App.tsx`                      | Gate de enrutamiento y Splash (Fase B)  |
| `src/components/ScoreFeedback.tsx` | Microcopy de feedback                   |

### 2.2 Reglas duras

1. **`MenteEnElCaminoDB` no se renombra jamás** (rompe IndexedDB).
2. UX no toca lógica de negocio, sistema visual ni configuración de build.
3. Toda decisión de UX sobre texto pasa por concordancia de género antes de tocar código.
4. **REGLA DE TESTING (Lección B-1)**: Todo componente que consuma datos de otra área requiere un test de **comportamiento observable** (verificar feedback en UI y argumentos pasados a funciones), no solo un smoke test ni tests que dupliquen la lógica del componente.

---

## 3. Estado por fase

### 3.1 Fase 4 — completada (2026-11-11)

- **Onboarding**: Implementado, testeado y validado en producción. Calibración ELO funciona (1000 a 1450). Bug B-1 corregido por Funcional.
- **Gate PWA / Routing**: Splash integrado en `App.tsx`. Flecha de retorno estandarizada para navegación hacia atrás en pantallas secundarias.
- **Modal PWA**: Integrado y validado (Handoff H-VIS-05 cerrado con Visual).
- **9 Sendas**: Las 9 categorías de juego están activas (ampliado de 5).
- **Tests**: 175/175 pasando (incluye tests de comportamiento de flujo).

---

## 4. Métricas

| Métrica                  | Valor (2026-11-11) |
| :----------------------- | :----------------- |
| Tests unitarios          | **175/175**        |
| Onboarding en producción | ✅ Activo          |
| Calibración ELO          | ✅ Validada        |
| Modal PWA                | ✅ Integrado       |
| Categorías activas       | 9 (de 9)           |
| Bundle gzip              | 184.03 kB          |
