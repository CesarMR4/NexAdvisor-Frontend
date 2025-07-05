import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/login'; 

  constructor(private http: HttpClient) { }
  login(credentials: { email: string; password: string }, tipo: 'asesor' | 'estudiante'): Observable<any> {
 /*   const endpoint = tipo === 'asesor'
      ? `${this.baseUrl}/asesores/login/asesor`
      : `${this.baseUrl}/estudiante/login/estudiante`;
*/
const endpoint = tipo === 'asesor'
 //? 'http://localhost:8080/asesores/login/asesor'
//: 'http://localhost:8080/estudiante/login/estudiante';
     ? `${environment.apiUrl}/asesores/login/asesor`
      : `${environment.apiUrl}/estudiante/login/estudiante`;
    return this.http.post(endpoint, credentials);
  }
}
