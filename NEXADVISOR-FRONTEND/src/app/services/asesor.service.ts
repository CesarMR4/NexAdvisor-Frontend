import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asesor } from '../models/Asesor';
import { Auxiliar } from '../models/Auxiliar';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  private baseUrl = 'http://localhost:8080/api/asesores';

  constructor(private http: HttpClient) { }

  registrar(asesor: Asesor): Observable<void> {
    // Cambiar URL para registrar según backend
    return this.http.post<void>(`${this.baseUrl}/registrar`, asesor);
  }

  getAsesorById(id: number): Observable<Asesor> {
    return this.http.get<Asesor>(`${this.baseUrl}/${id}`);
  }

  updateAsesor(id: number, asesor: Asesor): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, asesor);
  }
  buscarPorCarrera(carrera: string): Observable<Asesor[]> {
    return this.http.get<Asesor[]>(`${this.baseUrl}/buscar/carrera/${carrera}`);
  }

  buscarPorSector(sector: string): Observable<Asesor[]> {
    return this.http.get<Asesor[]>(`${this.baseUrl}/buscar/sector/${sector}`);
  }
  resetPassword(aux: Auxiliar): Observable<string> {
    return this.http.put(`${this.baseUrl}/reset-password`, aux, { responseType: 'text' });
  }

}
