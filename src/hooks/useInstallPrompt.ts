import { useState, useEffect, useCallback } from "react";

// Tipado global para el evento de instalación (no viene por defecto en TS)
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Detección de Standalone (¿ya está instalada?)
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;
      // En iOS, Safari tiene una propiedad no estándar: navigator.standalone
      const isIOSStandalone = (window.navigator as any).standalone === true;
      return isStandaloneMode || isIOSStandalone;
    };

    const standalone = checkStandalone();
    setIsStandalone(standalone);

    // 2. Detección de OS
    const userAgent = window.navigator.userAgent.toLowerCase();

    // iOS: incluye iPad (que en iOS 13+ se hace pasar por MacIntel)
    const isIOSDevice =
      /ipad|iphone|ipod/.test(userAgent) ||
      (window.navigator.platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1);

    const isAndroidDevice = /android/.test(userAgent);

    // Solo mostramos avisos si NO está instalada
    setIsIOS(isIOSDevice && !standalone);
    setIsAndroid(isAndroidDevice && !standalone);

    // 3. Capturar evento de Android (beforeinstallprompt)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 4. Escuchar si el usuario instala la app
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Función para disparar el prompt nativo en Android
  const installApp = useCallback(async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return {
    isIOS,
    isAndroid,
    isStandalone,
    canInstall: !!deferredPrompt, // true si es Android y el prompt está listo
    installApp,
  };
}
