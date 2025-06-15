import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/login'; 

  constructor(private http: HttpClient) { }
  login(credentials: { email: string; password: string }, tipo: 'asesor' | 'estudiante'): Observable<any> {
    const endpoint = tipo === 'asesor'
      ? `${this.baseUrl}/asesores/login/asesor`
      : `${this.baseUrl}/estudiante/login/estudiante`;

    return this.http.post(endpoint, credentials);
  }
}
