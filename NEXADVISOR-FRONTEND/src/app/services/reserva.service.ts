import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/Reserva';
import { ReservaDTO } from '../models/ReservaDTO';
 
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl: string = 'http://localhost:8080/reserva';

  constructor(private http: HttpClient) {}

  // Obtener reservas por ID del asesor
  getByAsesor(id: number): Observable<ReservaDTO[]> {
    return this.http.get<ReservaDTO[]>(`${this.baseUrl}/asesor/${id}`);
  }

  // Eliminar una reserva
  eliminar(id: number): Observable<string> {
  return this.http.delete(`${this.baseUrl}?id=${id}`, { responseType: 'text' });
}

  // Actualizar el estado de una reserva
  actualizarEstado(id: number, estado: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/actualizarEstado?idReserva=${id}&estado=${estado}`,
      {}
    );
  }

  // Actualizar el comentario del asesor
  actualizarComentario(id: number, comentario: string): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/comentario/${id}`, comentario, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
  insertar(reserva: Reserva): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}`, reserva);
}
getByEstudiante(idEstudiante: number): Observable<Reserva[]> {
  return this.http.get<Reserva[]>(`${this.baseUrl}/estudiante/${idEstudiante}`);
}


}
