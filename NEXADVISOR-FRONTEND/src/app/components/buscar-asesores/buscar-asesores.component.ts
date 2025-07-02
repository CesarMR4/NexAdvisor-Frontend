import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';
import { VerPuntuacionComponent } from '../ver-puntuacion/ver-puntuacion.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-asesores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VerPuntuacionComponent  
  ],
  templateUrl: './buscar-asesores.component.html',
  styleUrls: ['./buscar-asesores.component.css']
})
export class BuscarAsesoresComponent {
  tipoBusqueda: 'carrera' | 'sector' = 'carrera';
  criterio: string = '';
  resultados: Asesor[] = [];
  cargando: boolean = false;
  errorMensaje: string = '';

  constructor(private asesorService: AsesorService, private router: Router) {}

  buscar() {
    this.errorMensaje = '';
    if (!this.criterio.trim()) {
      this.resultados = [];
      return;
    }

    this.cargando = true;
    if (this.tipoBusqueda === 'carrera') {
      this.asesorService.buscarPorCarrera(this.criterio.trim()).subscribe({
        next: asesores => {
          this.resultados = asesores;
          this.cargando = false;
        },
        error: () => {
          this.errorMensaje = 'Error al buscar asesores por carrera.';
          this.cargando = false;
        }
      });
    } else if (this.tipoBusqueda === 'sector') {
      this.asesorService.buscarPorSector(this.criterio.trim()).subscribe({
        next: asesores => {
          this.resultados = asesores;
          this.cargando = false;
        },
        error: () => {
          this.errorMensaje = 'Error al buscar asesores por sector.';
          this.cargando = false;
        }
      });
    }
  }
  verHorarios(asesorId: number) {
  this.router.navigate(['/horarios-estudiante', asesorId]);
}
 volverDashboard() {
    this.router.navigate(['/dashboard-estudiante']);
  }
}
