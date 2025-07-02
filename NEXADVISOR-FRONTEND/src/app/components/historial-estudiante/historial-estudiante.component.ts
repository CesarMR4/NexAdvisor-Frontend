
/*
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { ComentarioService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';
import { CurriculumService } from '../../services/curriculum.service';

import { Reserva } from '../../models/Reserva';
import { Puntuacion } from '../../models/Puntuacion';
import { Comentario } from '../../models/Comentario';
import { Estudiante } from '../../models/Estudiante';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    puntuacion: 0
  };

  reservaIdPuntuacion: number = 0;

  mensaje: string = '';

  comentarioNuevo: Comentario = new Comentario();
  comentarioReservaActiva: Reserva | null = null;

  resultadoSubida: { [id: number]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private puntuacionService: PuntuacionService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private curriculumService: CurriculumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idEstudiante = this.authService.getUserId();
    if (idEstudiante) {
      this.reservaService.getByEstudiante(idEstudiante).subscribe(res => {
        this.reservas = res;
      });
    }
  }

  seleccionarReserva(reservaId: number) {
    this.reservaIdPuntuacion = reservaId;
  }

registrarPuntuacion() {
  if (this.puntuacion.puntuacion < 1 || this.puntuacion.puntuacion > 5) {
    this.mensaje = 'El puntaje debe estar entre 1 y 5.';
    return;
  }

  this.puntuacionService.registrarPuntuacion(this.puntuacion, this.reservaIdPuntuacion).subscribe({
    next: () => {
      this.mensaje = 'Puntuación registrada correctamente.';
      this.puntuacion.puntuacion = 0;
      this.reservaIdPuntuacion = 0;
    },
    error: (err) => {
      console.error('Error real al registrar la puntuación:', err);
      if (err.error && typeof err.error === 'string' && err.error.includes('Ya se ha registrado')) {
        this.mensaje = 'Ya has puntuado esta reserva';
      } else {
        this.mensaje = 'Ya has puntuado esta reserva';
      }
    }
  });
}


  cancelarPuntuacion() {
    this.reservaIdPuntuacion = 0;
    this.puntuacion.puntuacion = 0;
    this.mensaje = '';
  }

  abrirSelectorArchivo(reservaId: number) {
    const input = document.getElementById(`inputCV-${reservaId}`) as HTMLInputElement;
    if (input) input.click();
  }

  enviarCV(event: any, idReserva: number) {
    const archivo = event.target.files[0];
    if (!archivo) return;

   // this.resultadoSubida[idReserva] = '⏳ Subiendo currículum...';

    this.curriculumService.analizarCurriculum(idReserva, archivo).subscribe({
      next: (reporte: string) => {
        this.resultadoSubida[idReserva] = 'Enviado';
      },
      error: () => {
        this.resultadoSubida[idReserva] = 'Ya habías enviado tu CV';
      }
    });
  }

  abrirFormularioComentario(reserva: Reserva) {
    const idEstudiante = this.authService.getUserId();
    const estudianteLogueado = this.authService.getCurrentEstudiante();

    if (!idEstudiante || !estudianteLogueado) {
      alert('No se pudo obtener los datos del estudiante');
      return;
    }

    this.comentarioReservaActiva = reserva;
    this.comentarioNuevo = {
      id: 0,
      contenido: '',
      fechacreacion: new Date(),
      estudiante: {
        id: estudianteLogueado.id,
        nombre: estudianteLogueado.nombre,
        email: estudianteLogueado.email,
        password: estudianteLogueado.password,
        direccion: estudianteLogueado.direccion,
        telefono: estudianteLogueado.telefono,
        curriculum: estudianteLogueado.curriculum,
        carrera: estudianteLogueado.carrera,
        fechaRegistro: estudianteLogueado.fechaRegistro,
        rol: estudianteLogueado.rol
      },
      asesor: reserva.asesor
    };
  }

  cancelarFormularioComentario() {
    this.comentarioReservaActiva = null;
    this.comentarioNuevo = new Comentario();
  }

  guardarComentario() {
    this.comentarioService.crear(this.comentarioNuevo).subscribe({
      next: () => {
        alert('Comentario enviado correctamente');
        this.cancelarFormularioComentario();
      },
      error: (err) => {
        alert('Error al enviar el comentario');
        console.error(err);
      }
    });
  }
  cancelarReserva(idReserva: number): void {
  if (confirm('¿Estás seguro de cancelar esta reserva?')) {
    this.reservaService.eliminar(idReserva).subscribe({
      next: () => {
        this.reservas = this.reservas.filter(r => r.id !== idReserva);
      },
      error: (err) => {
  console.error('Error al cancelar reserva:', err);
  const mensaje = err.error || 'Ocurrió un error al cancelar la reserva.';
  alert(mensaje);
}
    });
  }
}
 volverDashboard() {
    this.router.navigate(['/dashboard-estudiante']);
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { ComentarioService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';
import { CurriculumService } from '../../services/curriculum.service';

import { Reserva } from '../../models/Reserva';
import { Puntuacion } from '../../models/Puntuacion';
import { Comentario } from '../../models/Comentario';
import { Estudiante } from '../../models/Estudiante';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
    puntuacion: 0
  };

  reservaIdPuntuacion: number = 0;

  mensaje: string = '';

  comentarioNuevo: Comentario = new Comentario();
  comentarioReservaActiva: Reserva | null = null;

  resultadoSubida: { [id: number]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private puntuacionService: PuntuacionService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private curriculumService: CurriculumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idEstudiante = this.authService.getUserId();
    if (idEstudiante) {
      this.reservaService.getByEstudiante(idEstudiante).subscribe(res => {
        this.reservas = res;
      });
    }
  }

  seleccionarReserva(reservaId: number) {
    this.reservaIdPuntuacion = reservaId;
  }

  registrarPuntuacion() {
    if (this.puntuacion.puntuacion < 1 || this.puntuacion.puntuacion > 5) {
      this.mensaje = 'El puntaje debe estar entre 1 y 5.';
      return;
    }

    this.puntuacionService.registrarPuntuacion(this.puntuacion, this.reservaIdPuntuacion).subscribe({
      next: () => {
        this.mensaje = 'Puntuación registrada correctamente.';
        this.puntuacion.puntuacion = 0;
        this.reservaIdPuntuacion = 0;
      },
      error: (err) => {
        console.error('Error real al registrar la puntuación:', err);
        if (err.error && typeof err.error === 'string' && err.error.includes('Ya se ha registrado')) {
          this.mensaje = 'Ya has puntuado esta reserva';
        } else {
          this.mensaje = 'Ya has puntuado esta reserva';
        }
      }
    });
  }

  cancelarPuntuacion() {
    this.reservaIdPuntuacion = 0;
    this.puntuacion.puntuacion = 0;
    this.mensaje = '';
  }

  abrirSelectorArchivo(reservaId: number) {
    const input = document.getElementById(`inputCV-${reservaId}`) as HTMLInputElement;
    if (input) input.click();
  }

  enviarCV(event: any, idReserva: number) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    this.curriculumService.analizarCurriculum(idReserva, archivo).subscribe({
      next: (reporte: string) => {
        this.resultadoSubida[idReserva] = 'Enviado';
      },
      error: () => {
        this.resultadoSubida[idReserva] = 'Ya habías enviado tu CV';
      }
    });
  }

  abrirFormularioComentario(reserva: Reserva) {
    const idEstudiante = this.authService.getUserId();
    const estudianteLogueado = this.authService.getCurrentEstudiante();

    if (!idEstudiante || !estudianteLogueado) {
      alert('No se pudo obtener los datos del estudiante');
      return;
    }

    this.comentarioReservaActiva = reserva;
    this.comentarioNuevo = {
      id: 0,
      contenido: '',
      fechacreacion: new Date(),
      estudiante: {
        id: estudianteLogueado.id,
        nombre: estudianteLogueado.nombre,
        email: estudianteLogueado.email,
        password: estudianteLogueado.password,
        direccion: estudianteLogueado.direccion,
        telefono: estudianteLogueado.telefono,
        curriculum: estudianteLogueado.curriculum,
        carrera: estudianteLogueado.carrera,
        fechaRegistro: estudianteLogueado.fechaRegistro,
        rol: estudianteLogueado.rol
      },
      asesor: reserva.asesor
    };
  }

  cancelarFormularioComentario() {
    this.comentarioReservaActiva = null;
    this.comentarioNuevo = new Comentario();
  }

  guardarComentario() {
    this.comentarioService.crear(this.comentarioNuevo).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Comentario enviado!',
          text: 'Tu comentario ha sido enviado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
        this.cancelarFormularioComentario();
      },
      error: (err) => {
        alert('Error al enviar el comentario');
        console.error(err);
      }
    });
  }

  cancelarReserva(idReserva: number): void {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      this.reservaService.eliminar(idReserva).subscribe({
        next: () => {
          this.reservas = this.reservas.filter(r => r.id !== idReserva);
        },
        error: (err) => {
          console.error('Error al cancelar reserva:', err);
          const mensaje = err.error || 'Ocurrió un error al cancelar la reserva.';
          alert(mensaje);
        }
      });
    }
  }

  volverDashboard() {
    this.router.navigate(['/dashboard-estudiante']);
  }
}
