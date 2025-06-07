import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../models/Horario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl: string = 'http://localhost:8080/horario'; // Asegúrate que esto esté bien

  constructor(private http: HttpClient) {}

  // Método para traer horarios por asesor
  getByAsesor(id: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/asesor/${id}`);
  }

  listar(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.baseUrl);
  }

  insertar(horario: Horario): Observable<void> {
    return this.http.post<void>(this.baseUrl, horario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, horario: Horario): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, horario);
  }

  obtenerPorId(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.baseUrl}/${id}`);
  }
}
