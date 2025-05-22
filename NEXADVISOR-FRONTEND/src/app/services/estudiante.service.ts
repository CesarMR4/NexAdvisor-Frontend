import { Injectable } from '@angular/core';
import { Estudiante } from '../models/Estudiante';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

   private baseUrl = 'http://localhost:8080/api/Estudiante';

  constructor(private http: HttpClient) { }

  registrar(estudiante: Estudiante): Observable<void>{
        return this.http.post<void>(this.baseUrl, estudiante);
  }
}
