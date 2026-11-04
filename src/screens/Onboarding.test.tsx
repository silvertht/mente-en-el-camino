import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Onboarding } from "./Onboarding";

// Mock del store para evitar dependencias de Dexie en este test de UI puro
vi.mock("../store/useGameStore", () => ({
  useGameStore: (selector: any) => selector({ completeOnboarding: vi.fn() }),
}));

describe("Onboarding Screen", () => {
  it("renderiza la bienvenida y la primera pregunta sin crashear", () => {
    render(<Onboarding onComplete={() => {}} />);

    // Verifica la bienvenida (Paso 1)
    expect(screen.getByText(/No es un examen/i)).toBeInTheDocument();
    // Verifica que el progreso está en Paso 1
    expect(screen.getByText(/Paso 1 de 3/i)).toBeInTheDocument();
  });
});
