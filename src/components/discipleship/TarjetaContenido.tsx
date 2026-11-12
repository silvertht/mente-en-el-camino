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
      className="rounded-2xl bg-noche-800/70 border border-noche-700 p-5"
    >
      <h3 className="text-alba-300 text-sm uppercase tracking-wide">
        {titulo}
      </h3>
      <p className="mt-2 text-noche-100 leading-relaxed">{cuerpo}</p>
    </Card>
  );
}
