import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/Comentario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8080'; // cambia por tu URL backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  listar(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comentarios`);
  }

  crear(comentario: Comentario): Observable<Comentario> {
    const headers = this.crearHeaders();
    return this.http.post<Comentario>(`${this.apiUrl}/comentarios`, comentario, { headers });
  }

  actualizar(id: number, datos: Partial<Comentario>): Observable<Comentario> {
    const headers = this.crearHeaders();
    return this.http.put<Comentario>(`${this.apiUrl}/comentarios/${id}`, datos, { headers });
  }

  eliminar(id: number): Observable<void> {
    const headers = this.crearHeaders();
    return this.http.delete<void>(`${this.apiUrl}/comentarios/${id}`, { headers });
  }

  private crearHeaders(): HttpHeaders {
    const userId = this.authService.getUserId();
    return new HttpHeaders({ 'X-User-Id': userId ? userId.toString() : '' });
  }
}
