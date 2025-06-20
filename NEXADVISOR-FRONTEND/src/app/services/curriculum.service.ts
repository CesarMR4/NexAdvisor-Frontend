import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

  analizarCurriculum(idReserva: number, archivo: File): Observable<string> {
    const formData = new FormData();
    formData.append('archivo', archivo);  

    return this.http.post(`${this.baseUrl}/analizar/${idReserva}`, formData, {
      responseType: 'text'
    });
  }

  obtenerReportePorReserva(idReserva: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${this.baseUrl}/reporte/${idReserva}`);
  }

  descargarReportePDF(idReserva: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/reporte/${idReserva}/pdf`, {
    responseType: 'blob'  // importante para recibir archivos
  });
}

}


