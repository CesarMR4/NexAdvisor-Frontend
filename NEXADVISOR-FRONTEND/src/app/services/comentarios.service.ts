import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/Comentario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8080'; // Ajusta si usas otro backend

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // 🔍 Listar todos los comentarios (admin o para pruebas)
  listar(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comentarios`);
  }

  // ✅ Crear comentario (con header personalizado)
  crear(comentario: Comentario): Observable<Comentario> {
    const headers = this.crearHeaders();
    return this.http.post<Comentario>(`${this.apiUrl}/comentarios`, comentario, { headers });
  }

  // ✅ Actualizar comentario por ID
  actualizar(id: number, datos: Partial<Comentario>): Observable<Comentario> {
    const headers = this.crearHeaders();
    return this.http.put<Comentario>(`${this.apiUrl}/comentarios/${id}`, datos, { headers });
  }

  // ✅ Eliminar comentario
  eliminar(id: number): Observable<void> {
    const headers = this.crearHeaders();
    return this.http.delete<void>(`${this.apiUrl}/comentarios/${id}`, { headers });
  }

  // ✅ Obtener comentarios según ID de asesor (página de asesor)
  getComentariosPorAsesor(idAsesor: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comentarios/asesor/${idAsesor}`);
  }

  // ✅ Cabecera con ID del usuario autenticado (opcional, según tu backend)
  private crearHeaders(): HttpHeaders {
    const userId = this.authService.getUserId(); // Asegúrate que este método devuelva un ID válido
    return new HttpHeaders({
      'X-User-Id': userId ? userId.toString() : ''
    });
  }
}
