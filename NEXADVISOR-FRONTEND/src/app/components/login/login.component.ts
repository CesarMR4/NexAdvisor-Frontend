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
  errorLogin: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const rol = params['rol'];
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
        this.authService.setUser({
          id: usuario.id,
          nombre: usuario.nombre,
          tipoUsuario: this.tipoUsuario
        });

          if (this.tipoUsuario === 'estudiante') {
    localStorage.setItem('usuario', JSON.stringify(usuario)); 
    this.router.navigate(['/dashboard-estudiante']);
  } else {
    this.router.navigate(['/dashboard-asesor']);
  }
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.errorLogin = 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
      }
    });
  }

  irARegistro() {
    if (this.tipoUsuario === 'estudiante') {
      this.router.navigate(['/registro-estudiante']);
    } else if (this.tipoUsuario === 'asesor') {
      this.router.navigate(['/registro-asesor']);
    }
  }
}
