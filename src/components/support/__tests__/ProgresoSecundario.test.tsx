import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgresoSecundario } from "../ProgresoSecundario";

describe("ProgresoSecundario", () => {
  it("contexto=paso: MC-031 + aria-label con título", () => {
    render(
      <ProgresoSecundario
        actual={2}
        total={5}
        contexto="paso"
        tituloLeccion="El buen samaritano"
      />,
    );
    expect(screen.getByText("Paso 2 de 5")).toBeInTheDocument();
    const pb = screen.getByRole("progressbar");
    expect(pb).toHaveAttribute(
      "aria-label",
      "Paso 2 de 5 en la lección El buen samaritano",
    );
  });

  it("contexto=lecciones: MC-016", () => {
    render(<ProgresoSecundario actual={1} total={3} contexto="lecciones" />);
    expect(screen.getByText("Llevas 1 de 3 lecciones")).toBeInTheDocument();
  });

  it("C4: total=0 → no renderiza (guard defensivo, no NaN)", () => {
    const { container } = render(
      <ProgresoSecundario actual={0} total={0} contexto="lecciones" />,
    );
    expect(container.firstChild).toBeNull();
  });
});
