import { useGameStore } from "../store/useGameStore";
import { BADGES } from "../data/badges";
import { BadgeCard } from "../components/BadgeCard";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { xpProgressInLevel } from "../utils/scoring";
import { resetProfile as resetProfileDB } from "../db/database";

interface Props {
  onBack: () => void;
}

export function Profile({ onBack }: Props) {
  const profile = useGameStore((s) => s.profile);
  const setNickname = useGameStore((s) => s.setNickname);
  const init = useGameStore((s) => s.init);

  if (!profile) return null;

  const xp = xpProgressInLevel(profile.xp);

  const handleEditNickname = async () => {
    const newNick = prompt("Nuevo apodo:", profile.nickname);
    if (newNick?.trim()) await setNickname(newNick);
  };

  const handleReset = async () => {
    if (!confirm("¿Borrar todo el progreso? Esta acción no se puede deshacer."))
      return;
    await resetProfileDB();
    await init();
    onBack();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
        >
          ← Volver
        </button>

        <Card variant="elevated" className="text-center">
          <div className="text-6xl mb-3">{profile.avatar ?? "🙂"}</div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {profile.nickname}
          </h1>
          <button
            onClick={handleEditNickname}
            className="text-xs text-amber-400 hover:underline"
          >
            Editar apodo
          </button>

          <div className="mt-5">
            <div className="flex justify-between text-sm text-slate-400 mb-1.5">
              <span>Nivel {profile.level}</span>
              <span>
                {xp.current} / {xp.needed} XP
              </span>
            </div>
            <ProgressBar value={xp.current} max={xp.needed} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-700">
            <div>
              <p className="text-xs uppercase text-slate-500">XP total</p>
              <p className="text-xl font-bold text-amber-400">{profile.xp}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Racha</p>
              <p className="text-xl font-bold text-orange-400">
                🔥 {profile.streak}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Insignias</p>
              <p className="text-xl font-bold text-indigo-400">
                {profile.badges.length}/{BADGES.length}
              </p>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <h2 className="text-lg font-bold text-white mb-4">Insignias</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {BADGES.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                unlocked={profile.badges.includes(badge.id)}
                onClick={(b) =>
                  alert(
                    `${b.emoji} ${b.name}\n\n${b.description}\n\nCómo: ${b.condition}`,
                  )
                }
              />
            ))}
          </div>
        </Card>

        <Button variant="danger" size="md" fullWidth onClick={handleReset}>
          Reiniciar progreso
        </Button>
      </div>
    </div>
  );
}
