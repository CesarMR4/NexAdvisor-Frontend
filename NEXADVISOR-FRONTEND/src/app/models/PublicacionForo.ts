import { Estudiante } from './Estudiante';

export interface PublicacionForo {
  id?: number;
  titulo: string;
  contenido: string;
  fechaPublicacion?: Date;
  estudiante: Estudiante;
}
