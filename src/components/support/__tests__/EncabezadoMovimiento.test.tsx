import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EncabezadoMovimiento } from "../EncabezadoMovimiento";

describe("EncabezadoMovimiento", () => {
  (["Llegar", "Escuchar", "Responder", "Llevar"] as const).forEach((mov) => {
    it(`renderiza "${mov}"`, () => {
      render(<EncabezadoMovimiento movimiento={mov} />);
      expect(screen.getByText(mov)).toBeInTheDocument();
    });
  });
});
