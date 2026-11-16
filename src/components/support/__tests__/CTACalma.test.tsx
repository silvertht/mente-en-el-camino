import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CTACalma } from "../CTACalma";

describe("CTACalma", () => {
  it("label MC-026 + aria-label con número de lección", () => {
    render(<CTACalma onClick={() => {}} leccionNumero={3} />);
    const btn = screen.getByRole("button", {
      name: "Entrar a la lección 3 con calma",
    });
    expect(btn).toHaveTextContent("Entrar con calma");
  });

  it("loading: disabled + aria-label 'Cargando'", () => {
    render(<CTACalma onClick={() => {}} leccionNumero={3} loading />);
    const btn = screen.getByRole("button", { name: /cargando lección 3/i });
    expect(btn).toBeDisabled();
  });

  it("target ≥44×44: min-h-11", () => {
    render(<CTACalma onClick={() => {}} leccionNumero={1} />);
    const btn = screen.getByRole("button", {
      name: /entrar a la lección 1/i,
    });
    expect(btn.className).toContain("min-h-11");
  });
});
