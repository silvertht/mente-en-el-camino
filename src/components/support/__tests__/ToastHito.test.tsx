import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToastHito } from "../ToastHito";

describe("ToastHito", () => {
  it("role=status + aria-live=polite + aria-atomic=true", () => {
    render(
      <ToastHito
        hito="H1"
        open={true}
        texto="Avance guardado. Contexto bíblico visible."
        online={true}
      />,
    );
    const toast = screen.getByRole("status");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("aria-atomic", "true");
  });

  it("offline: muestra texto offline", () => {
    render(
      <ToastHito
        hito="H3"
        open={true}
        texto="Guardado aquí. Se sincroniza luego."
        online={false}
      />,
    );
    expect(
      screen.getByText("Guardado aquí. Se sincroniza luego."),
    ).toBeInTheDocument();
  });

  it("open=false: no renderiza", () => {
    render(<ToastHito hito="H1" open={false} texto="x" online={true} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
