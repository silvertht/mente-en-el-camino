import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useInstallPrompt } from "../useInstallPrompt";

const mockMatchMedia = (matches: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe("useInstallPrompt", () => {
  const originalUserAgent = window.navigator.userAgent;

  beforeEach(() => {
    mockMatchMedia(false);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it("detecta correctamente iOS (iPhone) y expone isIOS=true", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
      configurable: true,
    });
    const { result } = renderHook(() => useInstallPrompt());
    expect(result.current.isIOS).toBe(true);
    expect(result.current.isAndroid).toBe(false);
  });

  it("detecta correctamente Android (Chrome)", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36",
      configurable: true,
    });
    const { result } = renderHook(() => useInstallPrompt());
    expect(result.current.isAndroid).toBe(true);
    expect(result.current.isIOS).toBe(false);
  });

  it("captura beforeinstallprompt globalmente y dispara installApp en Android", async () => {
    const { result } = renderHook(() => useInstallPrompt());
    expect(result.current.canInstall).toBe(false);

    const mockPrompt = vi.fn().mockResolvedValue(undefined);
    const mockEvent = {
      preventDefault: vi.fn(),
      prompt: mockPrompt,
      userChoice: Promise.resolve({ outcome: "accepted", platform: "android" }),
    };

    // Simulamos que el navegador dispara el evento
    act(() => {
      const event = new Event("beforeinstallprompt");
      Object.assign(event, mockEvent);
      window.dispatchEvent(event);
    });

    expect(result.current.canInstall).toBe(true);

    await act(async () => {
      await result.current.installApp();
    });

    expect(mockPrompt).toHaveBeenCalled();
    expect(result.current.canInstall).toBe(false);
  });
});
