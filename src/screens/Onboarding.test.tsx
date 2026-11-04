import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Onboarding } from "./Onboarding";
import { onboardingQuestions } from "../data/onboardingQuestions";

// Mock de useGameStore (solo completeOnboarding)
const mockCompleteOnboarding = vi.fn();
vi.mock("../store/useGameStore", () => ({
  useGameStore: (selector: any) =>
    selector({ completeOnboarding: mockCompleteOnboarding }),
}));

describe("Onboarding Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper: Juega una pregunta (selecciona opción y avanza)
  const playQuestion = (index: number, useCorrect: boolean) => {
    const q = onboardingQuestions[index] as any;
    const correctAnswer = q.correctAnswer || q.correct || q.answer;
    const options = q.options || [];
    const answerToClick = useCorrect
      ? correctAnswer
      : options.find((o: string) => o !== correctAnswer);

    // 1. Seleccionar opción
    fireEvent.click(
      screen.getByLabelText(`Seleccionar opción: ${answerToClick}`),
    );

    // 2. Hacer clic en Continuar (o Comenzar en la P3)
    const btnLabel =
      index === 2
        ? "Comenzar tu camino en Selah"
        : `Continuar al paso ${index + 2}`;
    fireEvent.click(screen.getByLabelText(btnLabel));
  };

  // === T1: 3 correctas ===
  it("T1: flujo de 3 correctas llama a completeOnboarding con [true, true, true]", async () => {
    mockCompleteOnboarding.mockResolvedValueOnce(undefined);
    render(<Onboarding onComplete={() => {}} />);

    // Q1
    playQuestion(0, true);
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );

    // Q2
    playQuestion(1, true);
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );

    // Q3
    playQuestion(2, true);

    // Verificación
    await waitFor(() => {
      expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);
      expect(mockCompleteOnboarding).toHaveBeenCalledWith([true, true, true]);
    });
  });

  // === T2: 3 incorrectas ===
  it("T2: flujo de 3 incorrectas llama a completeOnboarding con [false, false, false]", async () => {
    mockCompleteOnboarding.mockResolvedValueOnce(undefined);
    render(<Onboarding onComplete={() => {}} />);

    // Q1
    playQuestion(0, false);
    await waitFor(() => expect(screen.getByText(/Casi/i)).toBeInTheDocument());

    // Q2
    playQuestion(1, false);
    await waitFor(() => expect(screen.getByText(/Casi/i)).toBeInTheDocument());

    // Q3
    playQuestion(2, false);

    // Verificación
    await waitFor(() => {
      expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);
      expect(mockCompleteOnboarding).toHaveBeenCalledWith([
        false,
        false,
        false,
      ]);
    });
  });

  // === T3: Error + Retry ===
  it("T3: error en completeOnboarding muestra mensaje, habilita retry y permite reintentar", async () => {
    // Mock para que falle la primera vez
    mockCompleteOnboarding.mockRejectedValueOnce(new Error("Fallo de red"));
    render(<Onboarding onComplete={() => {}} />);

    playQuestion(0, true);
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );
    playQuestion(1, true);
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );
    playQuestion(2, true);

    // Verificar que aparece el error visible
    await waitFor(() => {
      expect(
        screen.getByText("No pudimos guardar tu progreso. Intenta de nuevo."),
      ).toBeInTheDocument();
    });

    // Verificar que el botón "Comenzar" está habilitado para el retry
    const retryBtn = screen.getByLabelText("Comenzar tu camino en Selah");
    expect(retryBtn).not.toBeDisabled();

    // Configurar mock para que la segunda llamada (retry) sea exitosa
    mockCompleteOnboarding.mockResolvedValueOnce(undefined);

    // Hacer retry
    fireEvent.click(retryBtn);

    // Verificar que se llamó 2 veces (la fallida y la exitosa)
    await waitFor(() => {
      expect(mockCompleteOnboarding).toHaveBeenCalledTimes(2);
    });
  });

  // === Opcionales ===
  it("Opcional: doble clic en Comenzar no duplica la llamada (in-flight guard)", async () => {
    // Mock con promesa pendiente para simular que está guardando
    let resolvePromise: any;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockCompleteOnboarding.mockReturnValueOnce(promise);

    render(<Onboarding onComplete={() => {}} />);

    playQuestion(0, true);
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );
    playQuestion(1, true);
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );
    playQuestion(2, true);

    const btn = screen.getByLabelText("Comenzar tu camino en Selah");

    // Doble clic
    fireEvent.click(btn);
    fireEvent.click(btn);

    // Solo debe haberse llamado 1 vez
    expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);

    // Limpiar
    resolvePromise();
  });
});
