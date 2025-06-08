import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/Reserva';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reserva-asesor',
  templateUrl: './reserva-asesor.component.html'
})
export class ReservaAsesorComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const asesor = this.authService.getUser();
    if (asesor && asesor.id) {
      this.reservaService.getByAsesor(asesor.id).subscribe(data => {
        this.reservas = data;
      });
    }
  }

  eliminarReserva(id: number): void {
    this.reservaService.eliminar(id).subscribe(() => {
      this.reservas = this.reservas.filter(r => r.id !== id);
    });
  }

  actualizarComentario(reserva: Reserva, comentario: string): void {
    this.reservaService.actualizarComentario(reserva.id, comentario).subscribe(() => {
      alert('Comentario actualizado');
    });
  }

  actualizarEstado(reserva: Reserva, nuevoEstado: string): void {
    this.reservaService.actualizarEstado(reserva.id, nuevoEstado).subscribe(() => {
      reserva.estado = nuevoEstado;
      alert('Estado actualizado');
    });
  }
}
