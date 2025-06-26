import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puntuacion } from '../models/Puntuacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private baseUrl = 'http://localhost:8080/puntuaciones';

  constructor(private http: HttpClient) {}

  registrarPuntuacion(puntuacion: Puntuacion, idReserva: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/registrar/${idReserva}`, puntuacion);
  }

  listarPuntuaciones(): Observable<Puntuacion[]> {
    return this.http.get<Puntuacion[]>(`${this.baseUrl}`);
  }

  listarPorAsesor(idAsesor: number): Observable<Puntuacion[]> {
    return this.http.get<Puntuacion[]>(`${this.baseUrl}/asesor/${idAsesor}`);
  }
  obtenerPromedioPorAsesor(idAsesor: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/promedio/${idAsesor}`);
}


}
