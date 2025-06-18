import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historial } from '../models/Historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private baseUrl = 'http://localhost:8080/historial';

  constructor(private http: HttpClient) {}

  registrar(historial: Historial): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, historial);
  }

  listar(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}`);
  }

  listarPorEstudiante(idEstudiante: number): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/estudiante/${idEstudiante}`);
  }
}
