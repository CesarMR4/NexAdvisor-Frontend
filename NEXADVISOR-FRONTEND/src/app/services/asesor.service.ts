import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asesor } from '../models/Asesor';
import { Auxiliar } from '../models/Auxiliar';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  private baseUrl = 'http://localhost:8080/asesores'

  //private baseUrl = `${environment.apiUrl}/asesores`;

  constructor(private http: HttpClient) { }

registrar(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/registrar`, formData);
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
  getAllAsesores(): Observable<Asesor[]> {
  return this.http.get<Asesor[]>(`${this.baseUrl}`);
}

}
