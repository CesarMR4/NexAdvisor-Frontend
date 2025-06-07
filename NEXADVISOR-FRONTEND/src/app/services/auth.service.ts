import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  private apiUrl = 'http://localhost:8080'; // Cambia al URL real

  constructor(private http: HttpClient) {
    this.cargarUsuarioDesdeStorage();
  }

  private cargarUsuarioDesdeStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: Usuario = JSON.parse(storedUser);
      this.userSource.next(user);
    }
  }

  setUser(user: Usuario) {
    this.userSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.userSource.next(null);
    localStorage.removeItem('user');
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

  // Método real de login que hace HTTP POST al backend
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
}
