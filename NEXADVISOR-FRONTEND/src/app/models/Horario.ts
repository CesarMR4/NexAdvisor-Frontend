import { Asesor } from "./Asesor";
export class Horario{
    id: number = 0;
    dia: number =0;
    Hora_inicio: Date = new Date();
    Hora_fin: Date = new Date();
    asesor: Asesor = new Asesor();
}