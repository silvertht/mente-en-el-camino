export type ColorToken = "alba" | "reino" | "vida" | "fuego";

export interface Jugador {
  id: string;
  nombre: string;
  icono: string;
  colorToken: ColorToken;
  puntuacion: number;
  fallos: number;
}

export type EstadoPartida = "idle" | "setup" | "en_curso" | "finalizada";
