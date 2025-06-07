import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from '../models/Horario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl = 'http://localhost:8080/horario'; // cambia el puerto si es necesario

  constructor(private http: HttpClient) {}

  listar(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}`);
  }

  registrar(horario: Horario): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, horario);
  }

  actualizar(id: number, horario: Horario): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, horario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
