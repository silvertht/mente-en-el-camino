import { useEffect, useRef } from "react";
import { Button } from "../components/Button";

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
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  void leccionId;

  return (
    <main className="mx-auto max-w-md px-4 pb-40 pt-16 text-center">
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
