import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("motion/react", () => ({
  motion: {
    article: ({ initial, animate, transition, ...props }: any) => (
      <article {...props} />
    ),
  },
}));

import { FeedbackReflexion } from "../FeedbackReflexion";

describe("FeedbackReflexion — Visual v2 fade-in", () => {
  it("renderiza role=status con aria-live=polite (D1 'Así es.' intacto)", () => {
    render(
      <FeedbackReflexion
        data={{
          correcto: true,
          referencia: "Juan 3:16 (RVR1960)",
          reflexion: "Dios nos amó primero.",
        }}
      />,
    );
    const article = screen.getByRole("status");
    expect(article).toHaveAttribute("aria-live", "polite");
    expect(article).toHaveAttribute("aria-atomic", "true");
    expect(screen.getByText("Así es.")).toBeInTheDocument();
  });

  it("renderiza 'Casi.' cuando incorrecto", () => {
    render(
      <FeedbackReflexion
        data={{ correcto: false, referencia: "Juan 3:16", pista: "Pista" }}
      />,
    );
    expect(screen.getByText("Casi.")).toBeInTheDocument();
  });
});
