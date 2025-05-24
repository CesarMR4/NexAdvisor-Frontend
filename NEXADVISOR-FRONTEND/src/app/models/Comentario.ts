import { Estudiante } from "./Estudiante";
export class Comentario{
    id : number = 0;
    contenido: string = "";
    fechacreacion: Date = new Date();
    estudiante: Estudiante = new Estudiante();
}