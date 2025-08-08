import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../models/Horario';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl: string = 'http://localhost:8080/horario'; 
  //private baseUrl: string = `${environment.apiUrl}/horario`;

  constructor(private http: HttpClient) {}

  // Método para traer horarios por asesor
  getByAsesor(id: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/asesor/${id}`);
  }

  listar(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.baseUrl);
  }

  insertar(horario: Horario): Observable<any> {
  return this.http.post<any>(this.baseUrl, horario);
}

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

 actualizar(id: number, horario: Horario): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/${id}`, horario);
}

  obtenerPorId(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.baseUrl}/${id}`);
  }
}
