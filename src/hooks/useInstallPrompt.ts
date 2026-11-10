import { useState, useEffect, useCallback } from "react";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// 🚨 VARIABLES GLOBALES (Fuera del hook)
// Esto asegura que el evento se capture apenas se importe el archivo
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
let isGlobalListenerAttached = false;

const attachGlobalPwaListener = () => {
  if (typeof window === "undefined" || isGlobalListenerAttached) return;

  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    console.log(
      "✅ [PWA Debug] Evento 'beforeinstallprompt' capturado globalmente.",
    );
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    // Disparamos un evento custom para avisar a los componentes montados
    window.dispatchEvent(new Event("pwa-prompt-captured"));
  });

  window.addEventListener("appinstalled", () => {
    console.log(
      "✅ [PWA Debug] Evento 'appinstalled'. La PWA se ha instalado.",
    );
    globalDeferredPrompt = null;
    window.dispatchEvent(new Event("pwa-installed"));
  });

  isGlobalListenerAttached = true;
};

// Ejecutamos esto inmediatamente al importar el hook
attachGlobalPwaListener();

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Detección de Standalone
    const isStandaloneMode = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    const standalone = isStandaloneMode || isIOSStandalone;

    setIsStandalone(standalone);

    // 2. Detección de OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /ipad|iphone|ipod/.test(userAgent) ||
      (window.navigator.platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(userAgent);

    setIsIOS(isIOSDevice && !standalone);
    setIsAndroid(isAndroidDevice && !standalone);

    // 3. Sincronizar con eventos globales
    const handlePromptCaptured = () => {
      console.log(
        "🔄 [PWA Debug] Sincronizando estado del hook con evento capturado.",
      );
      setDeferredPrompt(globalDeferredPrompt);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("pwa-prompt-captured", handlePromptCaptured);
    window.addEventListener("pwa-installed", handleInstalled);

    return () => {
      window.removeEventListener("pwa-prompt-captured", handlePromptCaptured);
      window.removeEventListener("pwa-installed", handleInstalled);
    };
  }, []);

  // Función para disparar el prompt
  const installApp = useCallback(async () => {
    console.log(
      "👉 [PWA Debug] Botón presionado. deferredPrompt actual:",
      !!deferredPrompt,
    );

    if (!deferredPrompt) {
      console.warn(
        "⚠️ [PWA Debug] No hay prompt disponible. El navegador no ha disparado el evento o la app ya está instalada.",
      );
      return false;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`✅ [PWA Debug] El usuario eligió: ${outcome}`);

    if (outcome === "accepted") {
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return {
    isIOS,
    isAndroid,
    isStandalone,
    canInstall: !!deferredPrompt,
    installApp,
  };
}
