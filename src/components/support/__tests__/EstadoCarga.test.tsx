import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EstadoCarga } from "../EstadoCarga";

describe("EstadoCarga", () => {
  it("contexto=s0: MC-007 en sr-only", () => {
    render(<EstadoCarga contexto="s0" />);
    expect(screen.getByText("Preparando tu camino…")).toBeInTheDocument();
  });

  it("contexto=s4: MC-037", () => {
    render(<EstadoCarga contexto="s4" />);
    expect(screen.getByText("Preparando tu lección…")).toBeInTheDocument();
  });

  it("sin contexto: 'Cargando…' (backward compat Fase 5)", () => {
    render(<EstadoCarga />);
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
  });

  it("role=status + aria-live=polite", () => {
    render(<EstadoCarga contexto="s0" />);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(el).toHaveAttribute("aria-atomic", "true");
  });
});
