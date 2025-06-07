import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  tipoUsuario: 'asesor' | 'estudiante';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<Usuario | null>(null);
  currentUser = this.userSource.asObservable();

  setUser(user: Usuario) {
    this.userSource.next(user);
    // También puedes guardar en localStorage para persistencia
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.userSource.next(null);
    localStorage.removeItem('user');
  }

  getUser(): Usuario | null {
    const user = this.userSource.getValue();
    if (user) {
      return user;
    }
    // Si no está en BehaviorSubject, intenta cargar de localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: Usuario = JSON.parse(storedUser);
      this.userSource.next(parsedUser);
      return parsedUser;
    }
    return null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getUserTipo(): 'asesor' | 'estudiante' | null {
    const user = this.getUser();
    return user ? user.tipoUsuario : null;
  }
}
