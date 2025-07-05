import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../models/Estudiante';
import { environment } from '../../environments/environment'; 

export interface Usuario {
  id: number;
  nombre: string;
  tipoUsuario: 'asesor' | 'estudiante';
  email?: string;
  token?: string; // si usas JWT u otro token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<Usuario | null>(null);
  currentUser = this.userSource.asObservable();

  //private apiUrl = 'http://localhost:8080'; // Cambia al URL real si usas entorno productivo
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.cargarUsuarioDesdeStorage();
  }

  // ✅ Protege el acceso a localStorage (solo existe en navegador)
  private cargarUsuarioDesdeStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user: Usuario = JSON.parse(storedUser);
        this.userSource.next(user);
      }
    }
  }

  setUser(user: Usuario) {
    this.userSource.next(user);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  clearUser() {
    this.userSource.next(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user');
    }
  }

  getUser(): Usuario | null {
    return this.userSource.getValue();
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getUserTipo(): 'asesor' | 'estudiante' | null {
    const user = this.getUser();
    return user ? user.tipoUsuario : null;
  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(user => {
        this.setUser(user);
      })
    );
  }

  logout() {
    this.clearUser();
  }
  
getCurrentEstudiante(): Estudiante | null {
  const userJson = localStorage.getItem('usuario');
  if (userJson) {
    const parsed = JSON.parse(userJson);
    if (parsed.rol === 'estudiante') {
      return parsed as Estudiante;
    }
  }
  return null;
}
}