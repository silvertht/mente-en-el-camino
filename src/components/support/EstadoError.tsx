import { useEffect, useRef } from "react";
import { Button } from "../Button";

const MENSAJES_ERROR = {
  s0: "No pudimos cargar el camino. Reintenta.", // MC-008
  s3: "No pudimos abrir la lección. Vuelve al camino.", // MC-030
  global: "Algo no cargó. Reintenta.", // MC-058
  guardado: "No pudimos guardar tu avance. Revisa tu conexión.", // MC-059
  retry: "Lo intentaremos de nuevo.", // MC-060
} as const;

export type EstadoErrorCodigo = keyof typeof MENSAJES_ERROR;

export interface EstadoErrorProps {
  /** MC-008 / MC-030 / MC-058 / MC-059 / MC-060 */
  codigo?: EstadoErrorCodigo;
  /** Override explícito del texto. Prioridad sobre `codigo`. */
  mensaje?: string;
  onReintentar?: () => void;
  /** Foco al mensaje en mount (default true, spec role="alert"). */
  focusOnMount?: boolean;
}

export function EstadoError({
  codigo,
  mensaje,
  onReintentar,
  focusOnMount = true,
}: EstadoErrorProps) {
  const mensajeFinal =
    mensaje ?? (codigo ? MENSAJES_ERROR[codigo] : MENSAJES_ERROR.global);
  const mensajeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (focusOnMount) mensajeRef.current?.focus();
  }, [focusOnMount]);

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 p-6 text-center rounded-2xl bg-noche-900/60 border border-noche-700/50 w-full max-w-md mx-auto"
    >
      <span aria-hidden="true" className="text-3xl text-alerta-400">
        ⚠
      </span>
      <p
        ref={mensajeRef}
        tabIndex={-1}
        className="text-noche-200 text-sm rounded focus:outline-2 focus:outline-alerta-400/60 focus:outline-offset-4"
      >
        {mensajeFinal}
      </p>
      {onReintentar && (
        <Button variant="secondary" size="sm" onClick={onReintentar}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
