import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  initialValue: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export function PromptDialog({
  open,
  initialValue,
  onSubmit,
  onCancel,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincroniza el input cada vez que se abre
  useEffect(() => {
    if (open) setValue(initialValue);
  }, [open, initialValue]);

  const trimmed = value.trim();
  const isEmpty = trimmed.length === 0;
  const unchanged = trimmed === initialValue.trim();
  const showEmptyWarning = isEmpty && value.length > 0;
  const canSave = !isEmpty && !unchanged;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onSubmit(trimmed);
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="¿Cómo te llamas en el camino?"
      subtitle="Puedes cambiarlo cuando quieras."
      initialFocusRef={inputRef}
      footer={
        <>
          <button
            type="submit"
            form="prompt-dialog-form"
            disabled={!canSave}
            className="w-full rounded-xl bg-alba-500 py-3 font-bold text-noche-950 transition-colors hover:bg-alba-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl py-3 font-medium text-white/60 transition-colors hover:text-white"
          >
            Cancelar
          </button>
        </>
      }
    >
      <form id="prompt-dialog-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 20))}
          placeholder="Tu apodo"
          maxLength={20}
          autoComplete="off"
          className="w-full rounded-xl border-2 border-noche-700 bg-noche-900 p-4 text-lg text-white placeholder-white/30 transition-all focus:border-alba-500 focus:outline-none focus:shadow-[0_0_0_4px_rgba(245,181,68,0.15)]"
        />

        {showEmptyWarning && (
          <p className="mt-2 text-xs text-alerta-400">
            Escribe algo, aunque sea corto.
          </p>
        )}

        <p className="mt-2 text-right text-xs tabular-nums text-white/40">
          {value.length}/20
        </p>
      </form>
    </Modal>
  );
}
