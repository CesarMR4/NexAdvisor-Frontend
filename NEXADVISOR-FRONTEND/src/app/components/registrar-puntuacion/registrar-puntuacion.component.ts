import { Component, Input, OnChanges } from '@angular/core';
import { PuntuacionService } from '../../services/puntuacion.service';
import { Puntuacion } from '../../models/Puntuacion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-puntuacion',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './registrar-puntuacion.component.html',
  styleUrls: ['./registrar-puntuacion.component.css']
})
export class RegistrarPuntuacionComponent implements OnChanges {
  @Input() idEstudiante!: number;
  @Input() idAsesor!: number;

  puntuacion: Puntuacion = {
    idEstudiante: 0,
    idAsesor: 0,
    puntaje: 0,
    comentario: ''
  };

  mensaje: string = '';

  constructor(private puntuacionService: PuntuacionService) {}

  ngOnChanges(): void {
    this.puntuacion.idEstudiante = this.idEstudiante;
    this.puntuacion.idAsesor = this.idAsesor;
  }

  registrar() {
    this.puntuacionService.registrarPuntuacion(this.puntuacion).subscribe({
      next: () => {
        this.mensaje = 'Puntuación registrada correctamente.';
        this.puntuacion.puntaje = 0;
        this.puntuacion.comentario = '';
      },
      error: () => {
        this.mensaje = 'Error al registrar la puntuación.';
      }
    });
  }
  seleccionarAsesor(idAsesor: number) {
  this.puntuacion.idAsesor = idAsesor;
}
}
