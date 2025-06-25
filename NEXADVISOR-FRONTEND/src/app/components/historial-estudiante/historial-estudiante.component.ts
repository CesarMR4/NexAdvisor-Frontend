/*
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
        console.log("Reservas recibidas:", res); 
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
*/
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { AuthService } from '../../services/auth.service';
import { CurriculumService } from '../../services/curriculum.service';
import { Reserva } from '../../models/Reserva';
import { Puntuacion } from '../../models/Puntuacion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-historial-estudiante',
  templateUrl: './historial-estudiante.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./historial-estudiante.component.css']
})
export class HistorialEstudianteComponent implements OnInit {
  reservas: Reserva[] = [];
  puntuacion: Puntuacion = {
    idEstudiante: 0,
    idAsesor: 0,
    puntuacion: 0,
    comentario: ''
  };
  mensaje: string = '';

  constructor(
    private reservaService: ReservaService,
    private puntuacionService: PuntuacionService,
    private authService: AuthService,
    private curriculumService: CurriculumService
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
    if (this.puntuacion.puntuacion < 1 || this.puntuacion.puntuacion > 5) {
      this.mensaje = 'El puntaje debe estar entre 1 y 5.';
      return;
    }

    this.puntuacionService.registrarPuntuacion(this.puntuacion).subscribe({
      next: () => {
        this.mensaje = 'Puntuación registrada correctamente.';
        this.puntuacion.puntuacion = 0;
        this.puntuacion.comentario = '';
      },
      error: () => {
        this.mensaje = 'Error al registrar la puntuación.';
      }
    });
  }

  cancelarPuntuacion() {
  this.puntuacion.idAsesor = 0;
  this.puntuacion.puntuacion = 0;
  this.puntuacion.comentario = '';
  this.mensaje = '';
}

  abrirSelectorArchivo(reservaId: number) {
    const input = document.getElementById(`inputCV-${reservaId}`) as HTMLInputElement;
    if (input) input.click();
  }

  enviarCV(event: Event, reservaId: number) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.curriculumService.analizarCurriculum(reservaId, file).subscribe({
        next: () => {
          console.log(`CV de la reserva ${reservaId} enviado con éxito.`);
        },
        error: (err) => {
          console.error('Error al enviar CV:', err);
        }
      });
    }
  }
}

