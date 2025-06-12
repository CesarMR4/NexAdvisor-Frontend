export interface Puntuacion {
  id?: number; // Opcional porque al registrar aún no tiene id
  idEstudiante: number;
  idAsesor: number;
  puntaje: number;
  comentario: string;
}
