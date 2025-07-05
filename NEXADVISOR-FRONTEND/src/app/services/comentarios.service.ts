import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/Comentario';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
 // private apiUrl = 'http://localhost:8080/comentarios'; 
 private apiUrl = `${environment.apiUrl}/comentarios`;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  listar(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}`);
  }

  crear(comentario: Comentario): Observable<any> {
  const headers = this.crearHeaders();
  return this.http.post(this.apiUrl, comentario, {
    headers,
    responseType: 'text' as 'json'
  });
}

  actualizar(id: number, datos: Partial<Comentario>): Observable<Comentario> {
    const headers = this.crearHeaders();
    return this.http.put<Comentario>(`${this.apiUrl}/${id}`, datos, { headers }); 
  }

  eliminar(id: number): Observable<void> {
    const headers = this.crearHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }); 
  }

  getComentariosPorAsesor(idAsesor: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/asesor/${idAsesor}`); 
  }

  private crearHeaders(): HttpHeaders {
    const userId = this.authService.getUserId();
    return new HttpHeaders({
      'X-User-Id': userId ? userId.toString() : ''
    });
  }
}
