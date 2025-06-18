import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl: string = 'http://localhost:8080/reserva';

  constructor(private http: HttpClient) {}

  // Obtener reservas por ID del asesor
  getByAsesor(idAsesor: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.baseUrl}/asesor/${idAsesor}`);
  }

  // Eliminar una reserva
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}?id=${id}`);
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
    return this.http.put<void>(
      `${this.baseUrl}/comentario/${id}`,
      comentario,
      {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
      }
    );
  }
  insertar(reserva: Reserva): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}`, reserva);
}

}
