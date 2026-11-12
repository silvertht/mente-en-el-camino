import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "prompt",
      injectRegister: "auto",
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
        theme_color: "#F5B544",
        background_color: "#0B0F1A",
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
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        globIgnores: ["**/evangelios-*.js"],
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("motion") || id.includes("framer-motion"))
              return "vendor-motion";
            if (id.includes("dexie")) return "vendor-dexie";
            if (id.includes("zustand")) return "vendor-zustand";
          }
        },
      },
    },
  },
});
