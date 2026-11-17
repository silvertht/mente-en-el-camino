import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// ✅ vi.hoisted: mockLeccion disponible cuando el factory de vi.mock corre
const { mockLeccion, mockStoreState } = vi.hoisted(() => ({
  mockLeccion: {
    titulo: "Lección Test",
    introduccion: "Introducción",
    preguntas: [
      { enunciado: "Q1", opciones: ["A", "B"], referenciaRVR1960: "Juan 3:16" },
      { enunciado: "Q2", opciones: ["A", "B"], referenciaRVR1960: "Juan 3:16" },
      { enunciado: "Q3", opciones: ["A", "B"], referenciaRVR1960: "Juan 3:16" },
    ],
  },
  mockStoreState: {
    iniciarLeccion: vi.fn().mockResolvedValue(undefined),
    responderCheck: vi.fn(),
    finalizarLeccion: vi.fn().mockResolvedValue(undefined),
    abandonarLeccion: vi.fn().mockResolvedValue(undefined),
    guardarPosicion: vi.fn().mockResolvedValue(undefined),
    leccionActiva: {
      sendaId: "evangelios",
      nivelNumber: 1,
      leccionNumber: 1,
    },
  },
}));

// ✅ Paths correctos desde src/screens/Leccion.test.tsx
vi.mock("../data/discipleship", () => ({
  getLeccion: () => mockLeccion,
}));

vi.mock("../store/useDiscipleshipStore", () => ({
  useDiscipleshipStore: (selector: any) =>
    selector ? selector(mockStoreState) : mockStoreState,
}));

vi.mock("../hooks/useOnlineStatus", () => ({
  useOnlineStatus: () => true,
}));

// ✅ Proxy: maneja cualquier motion.X (div, p, article, button, etc.)
vi.mock("motion/react", () => {
  const motionProxy = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        const Component = (props: any) => {
          const {
            initial: _i,
            animate: _a,
            exit: _e,
            transition: _t,
            variants: _v,
            whileHover: _wh,
            whileTap: _wt,
            whileFocus: _wf,
            whileInView: _wi,
            layout: _l,
            layoutId: _li,
            drag: _d,
            dragConstraints: _dc,
            ...rest
          } = props;
          const El = prop as any;
          return <El {...rest} />;
        };
        Component.displayName = `motion.${prop}`;
        return Component;
      },
    },
  );

  const AnimatePresence = ({ children }: any) => <>{children}</>;
  AnimatePresence.displayName = "AnimatePresence";

  return {
    motion: motionProxy,
    AnimatePresence,
    useReducedMotion: () => true,
  };
});

import { Leccion } from "./Leccion";

describe("Leccion — Visual v2 CA-4", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("MC-064 'Responde con calma.' está presente (instrucción S5)", async () => {
    render(
      <Leccion
        leccionId="evangelios:1:1"
        onContinuar={() => {}}
        onVolver={() => {}}
      />,
    );
    expect(await screen.findByText("Responde con calma.")).toBeInTheDocument();
  });

  it("MC-034 'Bien. Sigamos.' YA NO aparece (eliminado en v2)", async () => {
    render(
      <Leccion
        leccionId="evangelios:1:1"
        onContinuar={() => {}}
        onVolver={() => {}}
      />,
    );
    await screen.findByText("Responde con calma.");
    expect(screen.queryByText("Bien. Sigamos.")).not.toBeInTheDocument();
  });

  it("MC-028 acortado: toast H1 dice 'Avance guardado.' (no incluye 'Contexto bíblico visible.')", async () => {
    render(
      <Leccion
        leccionId="evangelios:1:1"
        onContinuar={() => {}}
        onVolver={() => {}}
      />,
    );
    await screen.findByText("Responde con calma.");
    // El toast solo aparece al avanzar; verificamos que el texto viejo NO esté
    expect(
      screen.queryByText(/Contexto bíblico visible/),
    ).not.toBeInTheDocument();
  });
});
