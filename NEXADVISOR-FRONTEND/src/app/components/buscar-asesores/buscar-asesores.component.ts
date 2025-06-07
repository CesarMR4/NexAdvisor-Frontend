import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';    // Importa CommonModule
import { FormsModule } from '@angular/forms';      // Importa FormsModule
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';

@Component({
  selector: 'app-buscar-asesores',
  standalone: true,     // <- Declarar que es standalone
  imports: [CommonModule, FormsModule],   // <- Agregar los módulos que usas
  templateUrl: './buscar-asesores.component.html',
  styleUrls: ['./buscar-asesores.component.css']
})
export class BuscarAsesoresComponent {
  tipoBusqueda: 'carrera' | 'sector' = 'carrera';
  criterio: string = '';
  resultados: Asesor[] = [];
  cargando: boolean = false;
  errorMensaje: string = '';

  constructor(private asesorService: AsesorService) {}

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
}
