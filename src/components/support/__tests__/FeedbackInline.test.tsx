import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FeedbackInline } from "../FeedbackInline";

describe("FeedbackInline", () => {
  it("aria-live=polite y texto visible al montar", () => {
    render(<FeedbackInline texto="Abriendo tu camino." />);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(el).toHaveTextContent("Abriendo tu camino.");
  });

  it("se oculta tras 300ms (tope duro)", () => {
    vi.useFakeTimers();
    render(<FeedbackInline texto="x" durationMs={10000} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
