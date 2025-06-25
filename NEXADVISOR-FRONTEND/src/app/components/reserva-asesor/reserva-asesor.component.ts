/*
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaDTO } from '../../models/ReservaDTO';



@Component({
  selector: 'app-reserva-asesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-asesor.component.html',
  styleUrls: ['./reserva-asesor.component.css']
})

export class ReservaAsesorComponent implements OnInit {
  reservas: ReservaDTO[] = [];
  comentarios: { [key: number]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.tipoUsuario === 'asesor') {
      this.reservaService.getByAsesor(user.id).subscribe(reservas => {
        this.reservas = reservas;
        console.log('Reservas DTO:', this.reservas);
      });
    }
  }

  eliminarReserva(id: number): void {
    this.reservaService.eliminar(id).subscribe(() => {
      this.reservas = this.reservas.filter(r => r.id !== id);
    });
  }

  actualizarComentario(reserva: ReservaDTO): void {
  const comentario = this.comentarios[reserva.id] || '';
  this.reservaService.actualizarComentario(reserva.id, comentario).subscribe(() => {
    reserva.comentarioAsesor = comentario;
    alert('Comentario enviado correctamente');
  });
}

  actualizarEstado(reserva: ReservaDTO, nuevoEstado: string): void {
    this.reservaService.actualizarEstado(reserva.id, nuevoEstado).subscribe(() => {
      reserva.estado = nuevoEstado;
      alert('Estado actualizado');
    });
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { CurriculumService } from '../../services/curriculum.service'; // 👈 Importado
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaDTO } from '../../models/ReservaDTO';

@Component({
  selector: 'app-reserva-asesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-asesor.component.html',
  styleUrls: ['./reserva-asesor.component.css']
})
export class ReservaAsesorComponent implements OnInit {
  reservas: (ReservaDTO & { tieneCurriculum?: boolean })[] = [];
  comentarios: { [key: number]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private curriculumService: CurriculumService // 👈 Inyectado
  ) {}
/*
  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.tipoUsuario === 'asesor') {
      this.reservaService.getByAsesor(user.id).subscribe(reservas => {
        reservas.forEach(reservaDTO => {
          const reserva = reservaDTO as ReservaDTO & { tieneCurriculum?: boolean };
          this.curriculumService.obtenerReportePorReserva(reserva.id).subscribe({
            next: () => {
              reserva.tieneCurriculum = true;
            },
            error: () => {
              reserva.tieneCurriculum = false;
            }
          });
        });

        this.reservas = reservas as (ReservaDTO & { tieneCurriculum?: boolean })[];
      });
    }
  }
  */

  ngOnInit(): void {
  const user = this.authService.getUser();
  if (user && user.tipoUsuario === 'asesor') {
    this.reservaService.getByAsesor(user.id).subscribe(reservas => {
      let pendientes = reservas.length;

      reservas.forEach(reservaDTO => {
        const reserva = reservaDTO as ReservaDTO & { tieneCurriculum?: boolean };
        this.curriculumService.obtenerReportePorReserva(reserva.id).subscribe({
          next: () => {
            reserva.tieneCurriculum = true;
            if (--pendientes === 0) {
              this.reservas = reservas as (ReservaDTO & { tieneCurriculum?: boolean })[];
            }
          },
          error: () => {
            reserva.tieneCurriculum = false;
            if (--pendientes === 0) {
              this.reservas = reservas as (ReservaDTO & { tieneCurriculum?: boolean })[];
            }
          }
        });
      });

      // Por si no hay reservas, evita que quede indefinido
      if (reservas.length === 0) {
        this.reservas = [];
      }
    });
  }
}


  eliminarReserva(id: number): void {
    this.reservaService.eliminar(id).subscribe(() => {
      this.reservas = this.reservas.filter(r => r.id !== id);
    });
  }

  actualizarComentario(reserva: ReservaDTO): void {
    const comentario = this.comentarios[reserva.id] || '';
    this.reservaService.actualizarComentario(reserva.id, comentario).subscribe(() => {
      reserva.comentarioAsesor = comentario;
      alert('Comentario enviado correctamente');
    });
  }

  actualizarEstado(reserva: ReservaDTO, nuevoEstado: string): void {
    this.reservaService.actualizarEstado(reserva.id, nuevoEstado).subscribe(() => {
      reserva.estado = nuevoEstado;
      alert('Estado actualizado');
    });
  }

  descargarCV(idReserva: number): void {
    this.curriculumService.descargarReportePDF(idReserva).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv_reserva_${idReserva}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}

