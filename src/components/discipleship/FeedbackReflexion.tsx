export type FeedbackData = {
  correcto: boolean;
  respuesta?: string;
  pista?: string;
  referencia: string;
  reflexion?: string;
};

export function FeedbackReflexion({ data }: { data: FeedbackData }) {
  const color = data.correcto
    ? "text-vida-400 border-vida-500/40"
    : "text-reino-300 border-reino-500/40";
  const icono = data.correcto ? "✓" : "↻";
  const titulo = data.correcto ? "Así es." : "Casi.";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`rounded-2xl border ${color} bg-noche-800/60 p-4 space-y-2`}
    >
      <p className={`flex items-center gap-2 font-semibold ${color}`}>
        <span aria-hidden="true">{icono}</span> {titulo}
      </p>
      {data.correcto && data.respuesta && (
        <p className="text-noche-100 text-sm">{data.respuesta}</p>
      )}
      {!data.correcto && data.pista && (
        <p className="text-noche-100 text-sm">{data.pista}</p>
      )}
      <p className="text-alba-300 text-xs">📖 {data.referencia}</p>
      {data.correcto && data.reflexion && (
        <p className="text-noche-300 text-xs">{data.reflexion}</p>
      )}
      {!data.correcto && (
        <p className="text-noche-300 text-xs">Inténtalo otra vez.</p>
      )}
    </div>
  );
}
