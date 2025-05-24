import { Comentario } from "./Comentario";
import { Estudiante } from "./Estudiante";

export class Respuesta{
    id: number = 0;
    contenido: String = "";
    fechacreacion: Date = new Date();
    estudiante: Estudiante = new Estudiante();
    comentario: Comentario = new Comentario;
}