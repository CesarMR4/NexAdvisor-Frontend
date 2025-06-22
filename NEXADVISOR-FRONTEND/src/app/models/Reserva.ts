import { Estudiante } from "./Estudiante";
import { Asesor } from "./Asesor";

export class Reserva {
  id: number = 0;
  fechaReserva: Date = new Date();
  horaReserva: string = ''; // ✅
  estado: string = '';      // ✅
  puntuacion?: number;
  comentarioAsesor: string = ''; // ← ✅ importante
  estudiante: Estudiante = new Estudiante();
  asesor: Asesor = new Asesor();
}