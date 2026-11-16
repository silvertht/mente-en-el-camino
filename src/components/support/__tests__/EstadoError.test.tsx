import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EstadoError } from "../EstadoError";

describe("EstadoError", () => {
  it("codigo=s0: MC-008", () => {
    render(<EstadoError codigo="s0" />);
    expect(
      screen.getByText("No pudimos cargar el camino. Reintenta."),
    ).toBeInTheDocument();
  });

  it("codigo=guardado: MC-059", () => {
    render(<EstadoError codigo="guardado" />);
    expect(
      screen.getByText("No pudimos guardar tu avance. Revisa tu conexión."),
    ).toBeInTheDocument();
  });

  it("role=alert + foco al mensaje en mount", () => {
    render(<EstadoError codigo="global" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    const p = screen.getByText("Algo no cargó. Reintenta.");
    expect(document.activeElement).toBe(p);
  });

  it("focusOnMount=false: no roba foco", () => {
    render(<EstadoError codigo="global" focusOnMount={false} />);
    const p = screen.getByText("Algo no cargó. Reintenta.");
    expect(document.activeElement).not.toBe(p);
  });
});
