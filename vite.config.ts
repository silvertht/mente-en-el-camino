import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // 'autoUpdate': el SW se actualiza solo y toma control en la
      // siguiente carga. Ideal para un juego con datos offline en Dexie.
      registerType: "autoUpdate",
      injectRegister: "auto",

      // Archivos de public/ que no pasan por el bundler pero deben cachearse.
      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png",
        "maskable-icon-512x512.png",
      ],

      manifest: {
        name: "Selah — Trivia Bíblica",
        short_name: "Selah",
        description:
          "Trivia bíblica interactiva para jóvenes. Aprende la Palabra de Dios con retos mentales reales: cada respuesta enseña, cada versículo transforma.",
        lang: "es",
        dir: "ltr",
        theme_color: "#F5B544", // alba-500
        background_color: "#0B0F1A", // noche-900
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        categories: ["education", "games", "lifestyle"],
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        // Shell de la app: HTML/CSS/JS + SVG + PNG de public/
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        // Fallback SPA: cualquier ruta desconocida sirve index.html.
        // (Aunque hoy no usamos rutas, esto blinda si más adelante
        // se agrega React Router.)
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],

        // Los datos del juego viven en Dexie/IndexedDB. No necesitamos
        // runtime caching agresivo en esta fase.
        runtimeCaching: [],
      },

      // En dev el SW queda apagado para evitar cachés fantasma.
      // Probar PWA SIEMPRE con: npm run build && npm run preview
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
