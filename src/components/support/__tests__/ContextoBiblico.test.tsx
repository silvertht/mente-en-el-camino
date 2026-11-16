import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContextoBiblico } from "../ContextoBiblico";

describe("ContextoBiblico", () => {
  it("siempre-visible: renderiza heading + cita con id literal (C1)", () => {
    render(
      <ContextoBiblico
        variant="siempre-visible"
        id="ctx-biblico"
        heading="Contexto bíblico"
        cita="Juan 3:16 (RVR1960)"
      />,
    );
    const section = document.getElementById("ctx-biblico");
    expect(section).toBeInTheDocument();
    expect(screen.getByText("Contexto bíblico")).toBeInTheDocument();
    expect(screen.getByText("Juan 3:16 (RVR1960)")).toBeInTheDocument();
  });

  it("colapsable: aria-expanded + aria-controls literal (C1)", () => {
    render(
      <ContextoBiblico
        variant="colapsable"
        id="ctx-biblico"
        heading="Contexto bíblico"
        cita="x"
      />,
    );
    const btn = screen.getByRole("button", { name: /contexto bíblico/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveAttribute("aria-controls", "ctx-biblico");
    expect(document.getElementById("ctx-biblico")).toBeInTheDocument();
  });

  it("colapsable: onFirstExpand dispara 1 sola vez", () => {
    const onFirstExpand = vi.fn();
    render(
      <ContextoBiblico
        variant="colapsable"
        id="ctx-biblico"
        heading="x"
        cita="y"
        onFirstExpand={onFirstExpand}
      />,
    );
    const btn = screen.getByRole("button", { name: /x/i });
    fireEvent.click(btn);
    expect(onFirstExpand).toHaveBeenCalledTimes(1);
    fireEvent.click(btn); // close
    fireEvent.click(btn); // open again
    expect(onFirstExpand).toHaveBeenCalledTimes(1); // no se repite
  });

  it("R6 fallback: body vacío → solo cita", () => {
    render(
      <ContextoBiblico
        variant="siempre-visible"
        heading="h"
        cita="Salmo 23:1 (RVR1960)"
      />,
    );
    expect(screen.queryByText(/editorial/)).not.toBeInTheDocument();
    expect(screen.getByText("Salmo 23:1 (RVR1960)")).toBeInTheDocument();
  });
});
