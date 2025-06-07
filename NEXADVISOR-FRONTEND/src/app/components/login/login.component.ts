import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
        console.log('Usuario autenticado:', usuario);
        // Aquí asegúrate de que 'usuario' tenga 'id'
        this.authService.setUser({
          id: usuario.id,             // Agrega esta línea
          nombre: usuario.nombre,
          tipoUsuario: this.tipoUsuario
        });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
