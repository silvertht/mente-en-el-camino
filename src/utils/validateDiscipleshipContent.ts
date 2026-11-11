import type {
  PreguntaReflexion,
  LeccionDiscipulado,
  SendaDiscipulado,
} from "../types/discipleship";

export function validarPreguntaReflexion(p: PreguntaReflexion): string[] {
  const errores: string[] = [];
  if (
    !Number.isInteger(p.correctIndex) ||
    p.correctIndex < 0 ||
    p.correctIndex >= p.opciones.length
  ) {
    errores.push("correctIndex fuera de rango");
  }
  if (!p.referenciaRVR1960?.trim()) {
    errores.push("Falta referencia RVR1960 (P10)");
  }
  const f = p.feedbackCorrecto;
  if (!f?.afirmacion?.startsWith("Así es.")) {
    errores.push("Afirmación estándar D2 ausente");
  }
  if (!f?.dato?.trim()) errores.push("Feedback: falta 'dato'");
  if (!f?.referenciaRVR1960?.trim()) {
    errores.push("Feedback: falta 'referenciaRVR1960' (P10)");
  }
  if (!f?.reflexion?.trim()) errores.push("Feedback: falta 'reflexion'");

  const palabrasPista =
    p.pistaReintento?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  if (palabrasPista === 0 || palabrasPista > 12) {
    errores.push(`pistaReintento: 1–12 palabras (actual: ${palabrasPista})`);
  }
  return errores;
}

export function validarLeccion(l: LeccionDiscipulado): string[] {
  const errores: string[] = [];
  if (l.preguntas.length !== 3) {
    errores.push(
      `Lección ${l.id}: debe tener 3 preguntas (tiene ${l.preguntas.length})`,
    );
  }
  l.preguntas.forEach((p, i) => {
    validarPreguntaReflexion(p).forEach((e) =>
      errores.push(`[${l.id} q${i + 1}] ${e}`),
    );
  });
  return errores;
}

export function validarSenda(s: SendaDiscipulado): string[] {
  const errores: string[] = [];
  if (s.niveles.length !== 3) {
    errores.push(
      `Senda ${s.sendaId}: debe tener 3 niveles (tiene ${s.niveles.length})`,
    );
  }
  s.niveles.forEach((n) => {
    if (n.lecciones.length !== 3) {
      errores.push(
        `Nivel ${s.sendaId}/${n.nivelNumber}: debe tener 3 lecciones`,
      );
    }
    n.lecciones.forEach((l) =>
      validarLeccion(l).forEach((e) =>
        errores.push(`[${s.sendaId}/${n.nivelNumber}] ${e}`),
      ),
    );
  });
  return errores;
}
