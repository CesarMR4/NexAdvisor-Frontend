import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asesor } from '../models/Asesor';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(request: Asesor) {
    return this.http.post('http://localhost:8080/login', request);
  }
 
}
