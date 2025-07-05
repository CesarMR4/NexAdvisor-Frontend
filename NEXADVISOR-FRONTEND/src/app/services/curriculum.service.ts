import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

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

  //private baseUrl = 'http://localhost:8080/curriculum';
  private baseUrl = `${environment.apiUrl}/curriculum`;

  constructor(private http: HttpClient) {}

  analizarCurriculum(idReserva: number, archivo: File): Observable<string> {
    const formData = new FormData();
    formData.append('archivo', archivo);  

    return this.http.post(`${this.baseUrl}/analizar/${idReserva}`, formData, {
      responseType: 'text'
    });
  }
  /*
analizarCurriculum(idReserva: number, archivo: File): Observable<string> {
  const formData = new FormData();
  formData.append('archivo', archivo); // ⚠️ nombre correcto

  return this.http.post(`http://localhost:8080/curriculum/analizar/${idReserva}`, formData, {
    responseType: 'text',
  });
}
*/

obtenerReportePorReserva(idReserva: number): Observable<string> {
  return this.http.get(`${this.baseUrl}/reporte/${idReserva}`, { responseType: 'text' });
}

  descargarReportePDF(idReserva: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/reporte/${idReserva}/pdf`, {
    responseType: 'blob'  
  });


  
}

}


