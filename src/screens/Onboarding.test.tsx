import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Onboarding } from "./Onboarding";
import { onboardingQuestions } from "../data/onboardingQuestions";
import type { MultipleChoiceQuestion } from "../types";

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

  /**
   * Resuelve la opción correcta de una pregunta MC.
   * Las preguntas usan `correctIndex: number` (no `correctAnswer`).
   */
  const getCorrectAnswer = (index: number): string => {
    const q = onboardingQuestions[index] as MultipleChoiceQuestion;
    return q.options[q.correctIndex];
  };

  /**
   * Resuelve una opción incorrecta de una pregunta MC.
   */
  const getWrongAnswer = (index: number): string => {
    const q = onboardingQuestions[index] as MultipleChoiceQuestion;
    const correct = q.options[q.correctIndex];
    const wrong = q.options.find((o) => o !== correct);
    if (!wrong) {
      throw new Error(`No hay opción incorrecta para Q${index + 1}`);
    }
    return wrong;
  };

  /**
   * Responde una pregunta completa:
   *  1. Selecciona la opción (correcta o incorrecta).
   *  2. Espera el feedback visible ("Así es." o "Casi.").
   *  3. Avanza ("Continuar" o "Comenzar").
   */
  const playQuestion = async (index: number, useCorrect: boolean) => {
    const answerToClick = useCorrect
      ? getCorrectAnswer(index)
      : getWrongAnswer(index);

    // 1. Seleccionar opción
    fireEvent.click(
      screen.getByLabelText(`Seleccionar opción: ${answerToClick}`),
    );

    // 2. Esperar feedback (antes de avanzar)
    const feedbackPattern = useCorrect ? /Así es/i : /Casi/i;
    await waitFor(() =>
      expect(screen.getByText(feedbackPattern)).toBeInTheDocument(),
    );

    // 3. Avanzar (Continuar o Comenzar)
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

    await playQuestion(0, true);
    await playQuestion(1, true);
    await playQuestion(2, true);

    await waitFor(() => {
      expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);
      expect(mockCompleteOnboarding).toHaveBeenCalledWith([true, true, true]);
    });
  });

  // === T2: 3 incorrectas ===
  it("T2: flujo de 3 incorrectas llama a completeOnboarding con [false, false, false]", async () => {
    mockCompleteOnboarding.mockResolvedValueOnce(undefined);
    render(<Onboarding onComplete={() => {}} />);

    await playQuestion(0, false);
    await playQuestion(1, false);
    await playQuestion(2, false);

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
    mockCompleteOnboarding.mockRejectedValueOnce(new Error("Fallo de red"));
    render(<Onboarding onComplete={() => {}} />);

    await playQuestion(0, true);
    await playQuestion(1, true);
    await playQuestion(2, true); // último paso: click "Comenzar" → completeOnboarding rechaza

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

    await waitFor(() => {
      expect(mockCompleteOnboarding).toHaveBeenCalledTimes(2);
    });
  });

  // === Opcional: doble clic (in-flight guard a nivel componente) ===
  it("Opcional: doble clic en Comenzar no duplica la llamada (in-flight guard)", async () => {
    // Mock con promesa pendiente para simular "guardando..."
    let resolvePromise: () => void = () => {};
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    mockCompleteOnboarding.mockReturnValueOnce(promise);

    render(<Onboarding onComplete={() => {}} />);

    await playQuestion(0, true);
    await playQuestion(1, true);

    // Q3: controlamos manualmente el flujo para el doble clic
    const q3Correct = getCorrectAnswer(2);
    fireEvent.click(screen.getByLabelText(`Seleccionar opción: ${q3Correct}`));
    await waitFor(() =>
      expect(screen.getByText(/Así es/i)).toBeInTheDocument(),
    );

    const btn = screen.getByLabelText("Comenzar tu camino en Selah");

    // Doble clic (el segundo es no-op porque el botón ya está disabled)
    fireEvent.click(btn);
    fireEvent.click(btn);

    // Solo debe haberse llamado 1 vez
    expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);

    // Limpiar
    resolvePromise();
    await waitFor(() =>
      expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1),
    );
  });
});
