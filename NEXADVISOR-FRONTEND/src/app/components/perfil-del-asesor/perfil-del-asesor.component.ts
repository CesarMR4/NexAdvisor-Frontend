import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Asesor } from '../../models/Asesor';
import { AsesorService } from '../../services/asesor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil-del-asesor',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './perfil-del-asesor.component.html',
  styleUrls: ['./perfil-del-asesor.component.css']
})
export class PerfilDelAsesorComponent implements OnInit {
  asesor: Asesor = new Asesor();
  cargando: boolean = true;
  error: string = '';

  constructor(
    private asesorService: AsesorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user && user.tipoUsuario === 'asesor') {
      this.asesorService.getAsesorById(user.id).subscribe({
        next: (data) => {
          this.asesor = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo cargar el perfil.';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'Usuario no válido o sesión no encontrada.';
      this.cargando = false;
    }
  }

editarPerfil(): void {
  this.router.navigate(['/perfil-asesor/editar']);
}

  volverDashboard(): void {
    this.router.navigate(['/dashboard-asesor']);
  }
}
