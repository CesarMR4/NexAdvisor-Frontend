import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaForo } from '../models/RespuestaForo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RespuestaForoService {
  //private url = 'http://localhost:8080/respuesta-foro';
  private url = `${environment.apiUrl}/respuesta-foro`;

  constructor(private http: HttpClient) {}

  listar(): Observable<RespuestaForo[]> {
    return this.http.get<RespuestaForo[]>(this.url);
  }

  obtenerPorId(id: number): Observable<RespuestaForo> {
    return this.http.get<RespuestaForo>(`${this.url}/${id}`);
  }

  crear(respuesta: RespuestaForo): Observable<any> {
    return this.http.post(this.url, respuesta);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  obtenerPorPublicacion(idPublicacion: number): Observable<RespuestaForo[]> {
    return this.http.get<RespuestaForo[]>(`${this.url}/publicacion/${idPublicacion}`);
  }
}
