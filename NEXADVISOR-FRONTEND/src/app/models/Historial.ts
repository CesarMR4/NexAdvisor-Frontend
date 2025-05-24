import { Estudiante } from "./Estudiante";
import { Asesor } from "./Asesor";
export class Historial{
    id: number = 0;
    descripcion: String = "";
    fecha: Date = new Date();
    estudiante: Estudiante= new Estudiante();
    asesor: Asesor= new Asesor();
}