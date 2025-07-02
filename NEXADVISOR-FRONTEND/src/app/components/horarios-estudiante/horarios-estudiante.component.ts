
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Horario } from '../../models/Horario';
import { Reserva } from '../../models/Reserva';
import { Estudiante } from '../../models/Estudiante';
import Swal from 'sweetalert2';
import { HorarioService } from '../../services/horario.service';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-horarios-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios-estudiante.component.html',
  styleUrls: ['./horarios-estudiante.component.css']
})
export class HorariosEstudianteComponent implements OnInit {
  horariosPorDia: { [key: string]: Horario[] } = {};
  reservasEstudiante: Reserva[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sabado', 'Domingo' ];
  diasMap: { [key: number]: string } = {
    0: 'Lunes',
    1: 'Martes',
    2: 'Miércoles',
    3: 'Jueves',
    4: 'Viernes',
    5: 'Sabado',
    6: 'Domingo',
  };

  horarioSeleccionado: Horario | null = null;

  constructor(
    private horarioService: HorarioService,
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('🟢 HorariosEstudianteComponent cargado');

    const asesorId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Asesor ID recibido:', asesorId);

    this.horarioService.getByAsesor(asesorId).subscribe(horarios => {
      console.log('Horarios recibidos:', horarios);
      this.horariosPorDia = this.diasSemana.reduce((acc, dia) => {
        acc[dia] = horarios.filter(h => this.diasMap[h.dia] === dia);
        return acc;
      }, {} as { [key: string]: Horario[] });
    });

    const user = this.authService.getUser();
    if (user && user.tipoUsuario === 'estudiante') {
      this.reservaService.getByEstudiante(user.id).subscribe(reservas => {
        console.log('Reservas del estudiante:', reservas);
        this.reservasEstudiante = reservas;
      });
    } else {
      console.warn('⚠️ Usuario no válido o no es estudiante');
    }
  }

  seleccionarHorario(horario: Horario) {
    this.horarioSeleccionado = horario;
    console.log('Horario seleccionado:', horario);
  }

  confirmarSeleccion() {
  if (!this.horarioSeleccionado) {
    alert('Selecciona un horario antes de confirmar.');
    return;
  }

  const user = this.authService.getUser();

  if (!user || user.tipoUsuario !== 'estudiante') {
    alert('Error: No se encontró información válida del estudiante.');
    return;
  }

  const reserva: Reserva = {
    id: 0,
    fechaReserva: new Date(),
    horaReserva: this.horarioSeleccionado.horaInicio.toString().substring(0, 5),
    estado: 'pendiente',
    comentarioAsesor: '',
    estudiante: {
      id: user.id
    } as Estudiante,
    asesor: this.horarioSeleccionado.asesor
  };

  this.reservaService.insertar(reserva).subscribe({
    next: () => {
      alert('Reserva registrada exitosamente.');
      this.horarioSeleccionado = null;
    },
    error: () => {
      alert('Ocurrió un error al registrar la reserva.');
    }
  });
}

  esArrayYNoVacio(lista: any): boolean {
    return Array.isArray(lista) && lista.length > 0;
  }

  solicitarHorario(horario: Horario) {
    this.horarioSeleccionado = horario;
    this.confirmarSeleccion();
  }

  yaReservado(horario: Horario): boolean {
    return this.reservasEstudiante.some(r =>
      r.asesor.id === horario.asesor.id &&
      r.horaReserva === horario.horaInicio.toString().substring(0, 5)
    );
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Horario } from '../../models/Horario';
import { Reserva } from '../../models/Reserva';
import { Estudiante } from '../../models/Estudiante';
import Swal from 'sweetalert2';
import { HorarioService } from '../../services/horario.service';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-horarios-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios-estudiante.component.html',
  styleUrls: ['./horarios-estudiante.component.css']
})
export class HorariosEstudianteComponent implements OnInit {
  horariosPorDia: { [key: string]: Horario[] } = {};
  reservasEstudiante: Reserva[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sabado', 'Domingo' ];
  diasMap: { [key: number]: string } = {
    0: 'Lunes',
    1: 'Martes',
    2: 'Miércoles',
    3: 'Jueves',
    4: 'Viernes',
    5: 'Sabado',
    6: 'Domingo',
  };

  horarioSeleccionado: Horario | null = null;

  constructor(
    private horarioService: HorarioService,
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('🟢 HorariosEstudianteComponent cargado');

    const asesorId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Asesor ID recibido:', asesorId);

    this.horarioService.getByAsesor(asesorId).subscribe(horarios => {
      console.log('Horarios recibidos:', horarios);
      this.horariosPorDia = this.diasSemana.reduce((acc, dia) => {
        acc[dia] = horarios.filter(h => this.diasMap[h.dia] === dia);
        return acc;
      }, {} as { [key: string]: Horario[] });
    });

    const user = this.authService.getUser();
    if (user && user.tipoUsuario === 'estudiante') {
      this.reservaService.getByEstudiante(user.id).subscribe(reservas => {
        console.log('Reservas del estudiante:', reservas);
        this.reservasEstudiante = reservas;
      });
    } else {
      console.warn('⚠️ Usuario no válido o no es estudiante');
    }
  }

  seleccionarHorario(horario: Horario) {
    this.horarioSeleccionado = horario;
    console.log('Horario seleccionado:', horario);
  }

  confirmarSeleccion() {
    if (!this.horarioSeleccionado) {
      alert('Selecciona un horario antes de confirmar.');
      return;
    }

    const user = this.authService.getUser();

    if (!user || user.tipoUsuario !== 'estudiante') {
      alert('Error: No se encontró información válida del estudiante.');
      return;
    }

    const reserva: Reserva = {
      id: 0,
      fechaReserva: new Date(),
      horaReserva: this.horarioSeleccionado.horaInicio.toString().substring(0, 5),
      estado: 'pendiente',
      comentarioAsesor: '',
      estudiante: {
        id: user.id
      } as Estudiante,
      asesor: this.horarioSeleccionado.asesor
    };

    this.reservaService.insertar(reserva).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Reserva realizada',
          text: 'Tu reserva fue registrada exitosamente.',
          timer: 2000,
          showConfirmButton: false
        });
        this.horarioSeleccionado = null;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar la reserva.'
        });
      }
    });
  }

  esArrayYNoVacio(lista: any): boolean {
    return Array.isArray(lista) && lista.length > 0;
  }

  solicitarHorario(horario: Horario) {
    this.horarioSeleccionado = horario;
    this.confirmarSeleccion();
  }

  yaReservado(horario: Horario): boolean {
    return this.reservasEstudiante.some(r =>
      r.asesor.id === horario.asesor.id &&
      r.horaReserva === horario.horaInicio.toString().substring(0, 5)
    );
  }
}
