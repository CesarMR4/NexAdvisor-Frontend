import { Asesor } from "./Asesor";

export class Horario {
  id: number = 0;
  dia: number = 0;
  horaInicio: string = ''; // 🟢 antes era Date
  horaFin: string = '';    // 🟢 antes era Date
  asesor: Asesor = new Asesor();
}