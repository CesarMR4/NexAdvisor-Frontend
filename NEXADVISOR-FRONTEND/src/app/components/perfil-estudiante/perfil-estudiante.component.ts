/*
import { Component } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-estudiante',
  imports: [CommonModule],
  templateUrl: './perfil-estudiante.component.html',
  styleUrl: './perfil-estudiante.component.css'
})
export class PerfilEstudianteComponent {
 estudiante: Estudiante = new Estudiante();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user && user.tipoUsuario === 'estudiante') {
      // Simulación de mapeo. Aquí deberías traer los datos completos desde el backend.
      this.estudiante.nombre = user.nombre;
      this.estudiante.email = 'demo@correo.com';  // Puedes reemplazar por valores reales si los guardas
      this.estudiante.carrera = 'Ingeniería de Sistemas'; // Valor ejemplo
      this.estudiante.telefono = '987654321'; // Valor ejemplo
      this.estudiante.direccion = 'Av. Siempre Viva 123'; // Valor ejemplo
    }
  }
  editarPerfil() {
  this.router.navigate(['/editar-perfil-estudiante']);
}
}
*/
// CON EL BACKEND YA CONECTADO

import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {
  estudiante: Estudiante = new Estudiante();
  cargando: boolean = true;
  error: string = '';

  constructor(
    private estudianteService: EstudianteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user && user.tipoUsuario === 'estudiante') {
      this.estudianteService.getEstudianteById(user.id).subscribe({
        next: (data) => {
          this.estudiante = data;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'No se pudo cargar el perfil.';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'Usuario no válido.';
      this.cargando = false;
    }
  }

  editarPerfil(): void {
    this.router.navigate(['/editar-perfil-estudiante']); // 👈 Ruta de edición
  }
}

