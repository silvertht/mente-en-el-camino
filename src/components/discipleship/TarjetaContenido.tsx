import { Card } from "../Card";

export function TarjetaContenido({
  titulo,
  cuerpo,
}: {
  titulo: string;
  cuerpo: string;
}) {
  return (
    <Card
      variant="bare"
      className="rounded-3xl bg-gradient-to-br from-noche-800/80 to-noche-900/60 border border-noche-700/60 p-6 sm:p-8"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-alba-500 text-lg" aria-hidden="true">
          📖
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-alba-500/80">
          Para meditar
        </span>
      </div>
      <h3 className="mb-4 text-xl font-bold leading-tight text-white">
        {titulo}
      </h3>
      <p className="text-base leading-relaxed text-noche-100">{cuerpo}</p>
    </Card>
  );
}
