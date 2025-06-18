import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/Reserva';
import { Puntuacion } from '../../models/Puntuacion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-historial-estudiante',
  templateUrl: './historial-estudiante.component.html',
  imports: [CommonModule, FormsModule], // asegúrate de incluir FormsModule también
  styleUrls: ['./historial-estudiante.component.css']
})
export class HistorialEstudianteComponent implements OnInit {
  reservas: Reserva[] = [];
  puntuacion: Puntuacion = {
    idEstudiante: 0,
    idAsesor: 0,
    puntaje: 0,
    comentario: ''
  };
  mensaje: string = '';

  constructor(
    private reservaService: ReservaService,
    private puntuacionService: PuntuacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idEstudiante = this.authService.getUserId();
    if (idEstudiante) {
      this.puntuacion.idEstudiante = idEstudiante;
      this.reservaService.getByEstudiante(idEstudiante).subscribe(res => {
        this.reservas = res;
      });
    }
  }

  seleccionarAsesor(idAsesor: number) {
    this.puntuacion.idAsesor = idAsesor;
  }

  registrarPuntuacion() {
    if (this.puntuacion.puntaje < 1 || this.puntuacion.puntaje > 5) {
      this.mensaje = 'El puntaje debe estar entre 1 y 5.';
      return;
    }

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
}
