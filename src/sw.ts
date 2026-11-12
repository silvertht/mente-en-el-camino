/// <reference lib="webworker" />
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

declare const self: ServiceWorkerGlobalScope;

// registerType: "prompt" → NO llamamos skipWaiting() ni clientsClaim().
// El SW nuevo espera; activa al cerrar todas las pestañas o consentimiento explícito.

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// SPA navigation fallback (equivalente a navigateFallback de generateSW)
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("/index.html"), {
    denylist: [/^\/api\//],
  }),
);

// evangelios: runtime StaleWhileRevalidate (excluido del precache vía globIgnores)
registerRoute(
  ({ url }) => /\/assets\/evangelios-[\w-]+\.js$/.test(url.pathname),
  new StaleWhileRevalidate({
    cacheName: "evangelios-v1",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 5,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  }),
);

// Canal para activación manual del SW (futuro H-ADM-01c → Visual)
self.addEventListener("message", (event) => {
  if ((event.data as { type?: string })?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
