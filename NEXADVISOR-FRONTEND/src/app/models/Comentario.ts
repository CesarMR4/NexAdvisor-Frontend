import { Estudiante } from "./Estudiante";
import { Asesor } from "./Asesor";

export class Comentario {
  id: number = 0;
  contenido: string = "";
  fechacreacion: Date = new Date();
  estudiante: Estudiante = new Estudiante();
  asesor: Asesor = new Asesor();
}