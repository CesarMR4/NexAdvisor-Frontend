import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auxiliar } from '../../models/Auxiliar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  paso: 1 | 2 = 1;

  datos: Auxiliar = {
    email: '',
    numeroTelefonico: '',
    nuevaPassword: ''
  };

  tipoUsuario: 'estudiante' | 'asesor' = 'estudiante';
  mensaje: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rol = params['rol'];
      if (rol === 'asesor' || rol === 'estudiante') {
        this.tipoUsuario = rol;
      }
    });
  }

  continuarPaso2(): void {
    if (!this.datos.email || !this.datos.nuevaPassword) {
      this.error = 'Debe ingresar correo y nueva contraseña antes de continuar.';
      return;
    }
    this.error = '';
    this.paso = 2;
  }

  confirmarCambio(): void {
    this.mensaje = '';
    this.error = '';

    const url = this.tipoUsuario === 'estudiante'
      //? 'http://localhost:8080/estudiante/reset-password'
      //: 'http://localhost:8080/asesores/reset-password'; 
       ? `${environment.apiUrl}/estudiante/reset-password`
      : `${environment.apiUrl}/asesores/reset-password`;

    this.http.put(url, this.datos, { responseType: 'text' }).subscribe({
      next: (respuesta) => {
        this.mensaje = respuesta;
        setTimeout(() => this.router.navigate(['/login'], { queryParams: { rol: this.tipoUsuario } }), 2500);
      },
      error: (err) => {
        this.error = 'Ocurrió un error al intentar cambiar la contraseña.';
        console.error(err);
      }
    });
  }
}
