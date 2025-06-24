import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicacionForo } from '../models/PublicacionForo';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicacionForoService {
  private url = 'http://localhost:8080/publicacion';

  constructor(private http: HttpClient) {}

  listar(): Observable<PublicacionForo[]> {
    return this.http.get<PublicacionForo[]>(this.url);
  }

  obtenerPorId(id: number): Observable<PublicacionForo> {
    return this.http.get<PublicacionForo>(`${this.url}/${id}`);
  }

  crear(publicacion: PublicacionForo): Observable<any> {
    return this.http.post(this.url, publicacion);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  editar(publicacion: PublicacionForo): Observable<void> {
  return this.http.put<void>(`${this.url}`, publicacion);
}


  
}
