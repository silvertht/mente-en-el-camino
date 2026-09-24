import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// ============================================================
// DEV ONLY — utilidades expuestas en window para depuración
// Este bloque NO llega a producción (Vite lo elimina).
// ============================================================
if (import.meta.env.DEV) {
  import("./data/questions").then(
    ({ auditQuestionData, auditAcceptedAnswers, ALL_QUESTIONS }) => {
      (window as unknown as { audit: typeof auditQuestionData }).audit =
        auditQuestionData;
      (window as unknown as { auditAA: typeof auditAcceptedAnswers }).auditAA =
        auditAcceptedAnswers;
      (window as unknown as { ALL: typeof ALL_QUESTIONS }).ALL = ALL_QUESTIONS;

      console.log(
        "%c📊 audit() · auditAA() · ALL listos",
        "color:#F5B544;font-weight:bold;",
      );
    },
  );
}