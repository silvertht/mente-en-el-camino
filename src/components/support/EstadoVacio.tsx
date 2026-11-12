export function EstadoVacio({
  mensaje = "Tu camino empieza con una lección.",
}: {
  mensaje?: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-12 text-center"
    >
      <span aria-hidden="true" className="text-4xl text-noche-500">
        ○
      </span>
      <p className="text-noche-300 text-sm max-w-[28ch]">{mensaje}</p>
    </div>
  );
}
