import { Asesor } from "./Asesor";

export class Horario {
    id: number = 0;
    dia: number = 0;
    horaInicio: Date = new Date(); 
    horaFin: Date = new Date();    
    asesor: Asesor = new Asesor();
}
