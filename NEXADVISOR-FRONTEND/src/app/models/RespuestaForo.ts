import { Estudiante } from './Estudiante';
import { PublicacionForo } from './PublicacionForo';

export interface RespuestaForo {
  id?: number;
  contenido: string;
  fechaRespuesta?: Date;
  publicacion: PublicacionForo;
  estudiante: Estudiante;
}
