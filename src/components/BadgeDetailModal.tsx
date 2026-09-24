import { Modal } from "./Modal";
import type { Badge } from "../types";

interface Props {
  badge: Badge | null;
  unlocked: boolean;
  onClose: () => void;
}

export function BadgeDetailModal({ badge, unlocked, onClose }: Props) {
  const open = badge !== null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={badge?.name ?? ""}
      subtitle={unlocked ? "✨ Desbloqueada" : "🔒 Aún no la desbloqueas"}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-alba-500 py-3 font-bold text-noche-950 transition-colors hover:bg-alba-400"
        >
          {unlocked ? "Cerrar" : "Entendido"}
        </button>
      }
    >
      {badge && (
        <div className="flex flex-col items-center gap-4 py-2">
          {/* Medalla grande */}
          <div
            className={[
              "flex h-24 w-24 items-center justify-center rounded-full text-5xl",
              unlocked
                ? "bg-gradient-to-br from-alba-400/30 to-alba-600/10 ring-2 ring-alba-400/60"
                : "bg-noche-700/60 grayscale opacity-60",
            ].join(" ")}
            aria-hidden="true"
          >
            {badge.emoji}
          </div>

          {unlocked ? (
            <>
              <p className="text-center text-white/80">{badge.description}</p>

              {/* Versículo (ya parte del tipo oficial) */}
              {badge.verse && (
                <div className="w-full rounded-xl border border-alba-500/20 bg-alba-500/5 px-4 py-3">
                  <p className="text-center text-sm italic text-alba-400/90">
                    "{badge.verse.text}"
                  </p>
                  <p className="mt-1 text-center text-xs font-semibold text-alba-400/70">
                    — {badge.verse.ref}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-center text-white/80">
                <span className="font-semibold text-white/60">
                  Cómo obtenerla:{" "}
                </span>
                {badge.condition}
              </p>
              <p className="text-center text-sm italic text-alba-400/70">
                Sigue caminando. Las mejores medallas se ganan con constancia.
              </p>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
