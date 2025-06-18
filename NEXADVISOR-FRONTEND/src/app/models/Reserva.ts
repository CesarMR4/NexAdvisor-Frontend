import { Estudiante } from "./Estudiante";
import { Asesor } from "./Asesor";

export class Reserva{
    id: number = 0;
    fechaReserva: Date = new Date();
    horaReserva: String = "";
    estado: String = "";
    puntuacion?: number;
    comentarioAsesor: String ="";
    estudiante: Estudiante = new Estudiante();
    asesor: Asesor = new Asesor();


}