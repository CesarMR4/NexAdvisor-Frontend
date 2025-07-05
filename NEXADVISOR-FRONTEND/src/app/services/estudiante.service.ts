import { Injectable } from '@angular/core';
import { Estudiante } from '../models/Estudiante';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  //private baseUrl = 'http://localhost:8080/estudiante';
  private baseUrl = `${environment.apiUrl}/estudiante`;
  constructor(private http: HttpClient) { }

  registrar(estudiante: Estudiante): Observable<{ mensaje: string }> {
  return this.http.post<{ mensaje: string }>(this.baseUrl, estudiante);
}

  getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${id}`);
  }

  updateEstudiante(id: number, estudiante: Estudiante): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, estudiante);
  }
}
