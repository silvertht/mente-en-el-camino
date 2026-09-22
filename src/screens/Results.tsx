import { useGameStore } from "../store/useGameStore";
import { summarizeGame, formatScore } from "../utils/scoring";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { BadgeCard } from "../components/BadgeCard";

interface Props {
  onHome: () => void;
}

export function Results({ onHome }: Props) {
  const game = useGameStore((s) => s.game);
  const newlyUnlockedBadges = useGameStore((s) => s.newlyUnlockedBadges);

  if (!game) return null;

  const summary = summarizeGame(game.answers);

  const headline = summary.perfect
    ? "¡Perfecto! 🏆"
    : summary.accuracy >= 70
      ? "¡Muy bien! 🎉"
      : summary.accuracy >= 40
        ? "¡Buen intento! 💪"
        : "Sigue practicando 📚";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center pt-4">
          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
            Resultado
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
            {headline}
          </h1>
          <p className="text-slate-400">
            {summary.correct} de {game.answers.length} correctas
          </p>
        </div>

        <Card variant="elevated" className="grid grid-cols-2 gap-4">
          <Stat
            label="Puntos"
            value={formatScore(summary.totalPoints)}
            color="text-amber-400"
          />
          <Stat
            label="Precisión"
            value={`${summary.accuracy}%`}
            color="text-emerald-400"
          />
          <Stat
            label="Correctas"
            value={String(summary.correct)}
            color="text-emerald-400"
          />
          <Stat
            label="Incorrectas"
            value={String(summary.wrong)}
            color="text-red-400"
          />
        </Card>

        {newlyUnlockedBadges.length > 0 && (
          <Card variant="elevated">
            <h2 className="text-lg font-bold text-amber-400 mb-4 text-center">
              ¡Nuevas insignias desbloqueadas!
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {newlyUnlockedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} unlocked size="lg" />
              ))}
            </div>
          </Card>
        )}

        <div className="space-y-3">
          <Button variant="primary" size="lg" fullWidth onClick={onHome}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
