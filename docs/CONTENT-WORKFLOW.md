## Actualización de contenido de evangelios

El chunk `evangelios-*.js` **no se precachea** (runtime `StaleWhileRevalidate`). Al modificar contenido de evangelios:

1. Bumpear el `cacheName` en `src/sw.ts`:
   ```ts
   cacheName: "evangelios-v1" → "evangelios-v2"
   ```
