import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  tipoUsuario: 'asesor' | 'estudiante' = 'estudiante';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('LoginComponent cargado');
    this.route.queryParams.subscribe(params => {
      const rol = params['rol'];
      console.log('Rol recibido por queryParams:', rol);
      if (rol === 'asesor' || rol === 'estudiante') {
        this.tipoUsuario = rol;
      }
    });
  }

login() {
  const credentials = {
    email: this.email,
    password: this.password
  };

  this.loginService.login(credentials, this.tipoUsuario).subscribe({
    next: (usuario) => {
      console.log('Usuario autenticado:', usuario);
      this.authService.setUser({
        id: usuario.id,
        nombre: usuario.nombre,
        tipoUsuario: this.tipoUsuario
      });

      if (this.tipoUsuario === 'estudiante') {
        this.router.navigate(['/dashboard-estudiante']);
      } else {
        this.router.navigate(['/dashboard-asesor']); // Luego lo crearás
      }
    },
   error: () => {
  // TEMPORAL: simular login cuando hay error
  console.warn('Simulando login por error en backend');

  const nombreSimulado = this.tipoUsuario === 'estudiante' ? 'Estudiante Demo' : 'Asesor Demo';

  this.authService.setUser({
    id: 999,
    nombre: nombreSimulado,
    tipoUsuario: this.tipoUsuario
  });

  if (this.tipoUsuario === 'estudiante') {
    this.router.navigate(['/dashboard-estudiante']);
  } else {
    this.router.navigate(['/dashboard-asesor']);
  }
}
  });
}

  // ✅ Nuevo método agregado
  irARegistro() {
    if (this.tipoUsuario === 'estudiante') {
      this.router.navigate(['/registro-estudiante']);
    } else if (this.tipoUsuario === 'asesor') {
      this.router.navigate(['/registro-asesor']);
    }
  }
}
