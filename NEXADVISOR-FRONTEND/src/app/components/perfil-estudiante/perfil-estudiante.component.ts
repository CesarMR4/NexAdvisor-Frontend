
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
    this.router.navigate(['/editar-perfil-estudiante']); 
  }
  volverDashboard() {
    this.router.navigate(['/dashboard-estudiante']);
  }
}

