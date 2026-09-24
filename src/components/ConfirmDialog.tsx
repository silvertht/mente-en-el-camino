import { useRef } from "react";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, onConfirm, onCancel }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="¿Reiniciar tu camino?"
      disableOverlayClose
      initialFocusRef={cancelRef}
      footer={
        <>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-xl bg-alerta-500 py-3 font-bold text-white transition-colors hover:bg-alerta-400"
          >
            Sí, reiniciar
          </button>
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl py-3 font-medium text-white/60 transition-colors hover:text-white"
          >
            Mejor no
          </button>
        </>
      }
    >
      <p className="text-center text-white/80">
        Esto borrará tu XP, tu racha y tus insignias. No se puede deshacer.
      </p>
    </Modal>
  );
}
