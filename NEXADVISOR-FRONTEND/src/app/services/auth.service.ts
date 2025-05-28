import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private userSource = new BehaviorSubject<{ nombre: string; tipoUsuario: 'asesor' | 'estudiante' } | null>(null);
  currentUser = this.userSource.asObservable();

  setUser(user: { nombre: string; tipoUsuario: 'asesor' | 'estudiante' }) {
    this.userSource.next(user);
  }

  clearUser() {
    this.userSource.next(null);
  }
}
