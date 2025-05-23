import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  tipoUsuario: 'asesor' | 'estudiante' = 'estudiante';

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

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
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
