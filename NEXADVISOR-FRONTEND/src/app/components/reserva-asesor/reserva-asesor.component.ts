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

  actualizarComentario(reserva: ReservaDTO, comentario: string): void {
    this.reservaService.actualizarComentario(reserva.id, comentario).subscribe(() => {
      alert('Comentario actualizado');
    });
  }

  actualizarEstado(reserva: ReservaDTO, nuevoEstado: string): void {
    this.reservaService.actualizarEstado(reserva.id, nuevoEstado).subscribe(() => {
      reserva.estado = nuevoEstado;
      alert('Estado actualizado');
    });
  }
}
