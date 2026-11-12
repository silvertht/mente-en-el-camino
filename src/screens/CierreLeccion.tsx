import { useEffect, useRef } from "react";
import { Button } from "../components/Button";

export function CierreLeccion({
  onSiguiente,
  onVolver,
}: {
  onSiguiente?: () => void;
  onVolver: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className="mx-auto max-w-md px-4 pb-32 pt-10 text-center">
      <span
        aria-hidden="true"
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vida-500 text-2xl text-white"
      >
        ✓
      </span>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-semibold text-alba-400 outline-none"
      >
        Así es. Has dado un paso más.
      </h1>
      <div className="fixed inset-x-4 bottom-4 space-y-2">
        {onSiguiente && (
          <Button variant="primary" fullWidth onClick={onSiguiente}>
            Siguiente lección
          </Button>
        )}
        <Button variant="ghost" fullWidth onClick={onVolver}>
          Volver al camino
        </Button>
      </div>
    </main>
  );
}
