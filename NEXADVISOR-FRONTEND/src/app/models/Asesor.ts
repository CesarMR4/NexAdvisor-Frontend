export class Asesor {
  id: number = 0;
  nombre: string = "";
  email: string = "";
  password: string = "";
  direccion: string = "";
  telefono: string = "";

  // URL o ruta al currículum (PDF)
  curriculum?: string;

  sector: string = "";
  carrera: string = "";
  fechaRegistro: Date = new Date();
  rol: string = "asesor";
}
