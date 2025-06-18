import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curriculum {
  id?: number;
  textoCurriculum: string;
  reporteIA: string;
  reservaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  private baseUrl = 'http://localhost:8080/curriculum';

  constructor(private http: HttpClient) {}

  analizarCurriculum(idReserva: number, textoCurriculum: string): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.post(`${this.baseUrl}/analizar/${idReserva}`, textoCurriculum, {
      headers,
      responseType: 'text'
    });
  }

  obtenerReportePorReserva(idReserva: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${this.baseUrl}/reporte/${idReserva}`);
  }
}
