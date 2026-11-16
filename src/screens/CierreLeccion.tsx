import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { ContextoBiblico } from "../components/support/ContextoBiblico";
import { ToastHito } from "../components/support/ToastHito";
import { EncabezadoMovimiento } from "../components/support/EncabezadoMovimiento";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function CierreLeccion({
  leccionId,
  onSiguiente,
  onVolver,
}: {
  leccionId: string;
  onSiguiente: () => void;
  onVolver: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const online = useOnlineStatus();
  // D5: H3 toast al montar S6
  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  void leccionId;

  // D5: H3 → MC-050 (online) / MC-051 (offline)
  const toastTexto = online
    ? "Avance guardado."
    : "Guardado aquí. Se sincroniza luego.";

  return (
    <main className="mx-auto max-w-md px-4 pb-40 pt-16 text-center">
      <ToastHito
        hito="H3"
        open={toastVisible}
        texto={toastTexto}
        online={online}
        onClose={() => setToastVisible(false)}
      />

      <EncabezadoMovimiento movimiento="Llevar" />

      <span
        aria-hidden="true"
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-vida-500 text-3xl text-white shadow-xl shadow-vida-500/20"
      >
        ✓
      </span>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mx-auto max-w-[20ch] text-2xl font-semibold leading-tight text-alba-400 outline-none sm:text-3xl"
      >
        Así es. Has dado un paso más.
      </h1>

      {/* D8: MC-045 placeholder */}
      <p className="mt-6 text-sm italic text-white/70">
        Te llevas: [editorial]
      </p>

      {/* D8: MC-046 placeholder */}
      <div className="mt-6 text-left rounded-2xl bg-noche-900/60 border border-noche-700 p-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-alba-400">
          Versículo para tu semana
        </p>
        <p className="text-sm italic text-white/80">[cita RVR1960]</p>
      </div>

      {/* D7/C1: ContextoBiblico colapsable con id literal */}
      <div className="mt-4 text-left">
        <ContextoBiblico
          variant="colapsable"
          id="ctx-biblico"
          heading="Contexto bíblico"
          cita="[Libro] [Capítulo]:[Versículo] (RVR1960)"
        />
      </div>

      <div className="fixed inset-x-4 bottom-4 mx-auto max-w-md space-y-2">
        <Button variant="primary" fullWidth onClick={onSiguiente}>
          Siguiente lección
        </Button>
        <Button variant="ghost" fullWidth onClick={onVolver}>
          Volver al camino
        </Button>
      </div>
    </main>
  );
}
