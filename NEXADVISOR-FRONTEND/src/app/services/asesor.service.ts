import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asesor } from '../models/Asesor';


@Injectable({
  providedIn: 'root'
})
export class AsesorService {

    private baseUrl = 'http://localhost:8080/api/asesores'; 

  constructor(private http: HttpClient) { }

  registrar(asesor:Asesor): Observable<void>{
    return this.http.post<void>(this.baseUrl, asesor);

  }
}
