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

  comentarioNuevo: Comentario = new Comentario();
  comentarioReservaActiva: Reserva | null = null;

  // NUEVO: para mostrar mensajes por reserva (estado del CV)
  resultadoSubida: { [id: number]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private puntuacionService: PuntuacionService,
    private comentarioService: ComentarioService,
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

  enviarCV(event: any, idReserva: number) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    this.resultadoSubida[idReserva] = '⏳ Subiendo currículum...';

    this.curriculumService.analizarCurriculum(idReserva, archivo).subscribe({
      next: (reporte: string) => {
        this.resultadoSubida[idReserva] = '✅ Currículum enviado y analizado correctamente.';
      },
      error: () => {
        this.resultadoSubida[idReserva] = '❌ Error al subir o analizar el currículum.';
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

@Component({
  standalone: true,
  selector: 'app-historial-estudiante',
  templateUrl: './historial-estudiante.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./historial-estudiante.component.css']
})
export class HistorialEstudianteComponent implements OnInit {
  reservas: Reserva[] = [];

  // Solo necesitamos el puntaje
  puntuacion: Puntuacion = {
    puntuacion: 0
  };

  // ID de la reserva que se está puntuando
  reservaIdPuntuacion: number = 0;

  mensaje: string = '';

  comentarioNuevo: Comentario = new Comentario();
  comentarioReservaActiva: Reserva | null = null;

  // NUEVO: para mostrar mensajes por reserva (estado del CV)
  resultadoSubida: { [id: number]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private puntuacionService: PuntuacionService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private curriculumService: CurriculumService
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
        this.mensaje = 'Ya has puntuado esta reserva.';
      } else {
        this.mensaje = 'Ocurrió un error al registrar la puntuación. Revisa la consola para más detalles.';
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
        this.resultadoSubida[idReserva] = 'Error al subir';
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
}
