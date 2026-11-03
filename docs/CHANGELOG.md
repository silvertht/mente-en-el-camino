- **Plan estructural Onboarding + Gate (UX, Fase A) APROBADO** con 3 correcciones:
  - C1: H-06 retirado condicionado a verificación en disco de Button/Card/
    GradientText. UX debe confirmar rutas exactas (no "estructura documentada").
    Si falla → H-06 reactivado (Baja, no bloquea Funcional).
  - C2: no persistencia parcial de results si el usuario cierra la app a mitad.
    Al reiniciar, onboarding reinicia en Paso 1. Debe documentarse.
  - C3: clarificar estado `step === 2 + feedback` (cierre "Todo listo..." + label
    "Comenzar"). No divergir en Fase B.
- **T3 Gate APROBADO**: splash durante `appStatus: 'loading'`, fail-open si Dexie
  falla en lectura (Home con RATING_INITIAL). No afecta routing existente.
