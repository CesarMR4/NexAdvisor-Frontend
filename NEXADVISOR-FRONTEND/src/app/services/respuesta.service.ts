// respuesta.service.ts (o respuesta.service.ts)
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/Respuesta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private apiUrl = 'http://localhost:8080'; // Cambia esto según tu backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  listar(): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${this.apiUrl}/respuestas`);
  }

  crear(respuesta: Respuesta): Observable<Respuesta> {
    const headers = this.crearHeaders();
    return this.http.post<Respuesta>(`${this.apiUrl}/respuestas`, respuesta, { headers });
  }

  actualizar(id: number, datos: Partial<Respuesta>): Observable<Respuesta> {
    const headers = this.crearHeaders();
    return this.http.put<Respuesta>(`${this.apiUrl}/respuestas/${id}`, datos, { headers });
  }

  // Aquí está el método eliminar que falta
  eliminar(id: number): Observable<void> {
    const headers = this.crearHeaders();
    return this.http.delete<void>(`${this.apiUrl}/respuestas/${id}`, { headers });
  }

  // Método para crear headers con X-User-Id
  private crearHeaders(): HttpHeaders {
    const userId = this.authService.getUserId();
    return new HttpHeaders({ 'X-User-Id': userId ? userId.toString() : '' });
  }
}
