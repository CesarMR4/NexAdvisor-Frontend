import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuntuacionService } from '../../services/puntuacion.service';
import { Puntuacion } from '../../models/Puntuacion';

@Component({
  selector: 'app-registrar-puntuacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-puntuacion.component.html',
  styleUrls: ['./registrar-puntuacion.component.css']
})
export class RegistrarPuntuacionComponent {
  puntuacion: Puntuacion = {
    idEstudiante: 0,
    idAsesor: 0,
    puntaje: 0,
    comentario: ''
  };

  mensaje: string = '';

  constructor(private puntuacionService: PuntuacionService) {}

  registrar() {
    this.puntuacionService.registrarPuntuacion(this.puntuacion).subscribe({
      next: () => {
        this.mensaje = 'Puntuación registrada correctamente.';
        this.puntuacion = { idEstudiante: 0, idAsesor: 0, puntaje: 0, comentario: '' };
      },
      error: () => {
        this.mensaje = 'Error al registrar la puntuación.';
      }
    });
  }
}
