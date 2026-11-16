import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressBar } from "../ProgressBar";

describe("ProgressBar — aria-label (C2)", () => {
  it("propaga aria-label al role=progressbar", () => {
    render(
      <ProgressBar
        value={2}
        max={5}
        aria-label="Paso 2 de 5 en la lección X"
      />,
    );
    const pb = screen.getByRole("progressbar");
    expect(pb).toHaveAttribute("aria-label", "Paso 2 de 5 en la lección X");
  });

  it("sin aria-label: no renderiza el atributo (backward compat)", () => {
    render(<ProgressBar value={1} max={3} />);
    const pb = screen.getByRole("progressbar");
    expect(pb).not.toHaveAttribute("aria-label");
  });
});
