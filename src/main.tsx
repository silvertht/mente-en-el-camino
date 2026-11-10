import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
);

// ============================================================
// DEV ONLY — utilidades expuestas en window para depuración
// Este bloque NO llega a producción (Vite lo elimina).
// ============================================================
if (import.meta.env.DEV) {
  import("./data/questions").then(
    ({
      auditQuestionData,
      auditAcceptedAnswers,
      ALL_QUESTIONS,
      loadQuestionBank, // <- Importamos esto para forzar la carga
    }) => {
      // H-FUN-03: Como ahora son funciones asíncronas, las envolvemos
      // para que impriman el resultado directamente en la consola.

      (window as any).audit = async () => {
        const result = await auditQuestionData();
        console.table(result);
        return result;
      };

      (window as any).auditAA = async () => {
        const result = await auditAcceptedAnswers();
        console.table(result.malformed.length > 0 ? result.malformed : result);
        return result;
      };

      (window as any).ALL = async () => {
        await loadQuestionBank();
        console.table(ALL_QUESTIONS);
        return ALL_QUESTIONS;
      };

      console.log(
        "%c📊 audit() · auditAA() · ALL() listos (asíncronos)",
        "color:#F5B544;font-weight:bold;",
      );
    },
  );
}
