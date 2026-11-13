export type FeedbackData = {
  correcto: boolean;
  respuesta?: string;
  pista?: string;
  referencia: string;
  reflexion?: string;
};

export function FeedbackReflexion({ data }: { data: FeedbackData }) {
  const variante = data.correcto
    ? {
        borde: "border-l-vida-500",
        fondo: "bg-gradient-to-br from-vida-500/10 to-noche-800/60",
        tituloColor: "text-vida-300",
        icono: "✓",
        titulo: "Así es.",
      }
    : {
        borde: "border-l-reino-400",
        fondo: "bg-gradient-to-br from-reino-500/10 to-noche-800/60",
        tituloColor: "text-reino-300",
        icono: "↻",
        titulo: "Casi.",
      };

  return (
    <article
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`rounded-3xl border-l-4 ${variante.borde} ${variante.fondo} p-5 sm:p-6 space-y-3`}
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 items-center justify-center rounded-full ${data.correcto ? "bg-vida-500/20" : "bg-reino-500/20"} text-lg font-bold ${variante.tituloColor}`}
        >
          {variante.icono}
        </span>
        <h3 className={`text-base font-bold ${variante.tituloColor}`}>
          {variante.titulo}
        </h3>
      </header>

      {data.correcto && data.respuesta && (
        <p className="text-noche-100 text-base leading-relaxed">
          {data.respuesta}
        </p>
      )}
      {!data.correcto && data.pista && (
        <p className="text-noche-100 text-base leading-relaxed">{data.pista}</p>
      )}

      <p className="flex items-center gap-2 text-sm text-alba-300">
        <span aria-hidden="true">📖</span>
        <span className="font-semibold">{data.referencia}</span>
      </p>

      {data.correcto && data.reflexion && (
        <div className="rounded-2xl bg-noche-900/40 px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-alba-500/80 mb-1">
            Para meditar
          </p>
          <p className="text-sm italic leading-relaxed text-noche-200">
            {data.reflexion}
          </p>
        </div>
      )}

      {!data.correcto && (
        <p className="text-sm text-noche-300">Inténtalo otra vez.</p>
      )}
    </article>
  );
}
