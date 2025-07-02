import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { ReservaDTO } from '../../models/ReservaDTO';
import { Router} from '@angular/router'; //

@Component({
  selector: 'app-notificaciones-asesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones-asesor.component.html',
  styleUrls: ['./notificaciones-asesor.component.css']
})
export class NotificacionesAsesorComponent implements OnInit {
  reservas: ReservaDTO[] = [];
  cantidadNotificaciones: number = 0;

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.tipoUsuario === 'asesor') {
      this.reservaService.getByAsesor(user.id).subscribe(reservas => {
        this.reservas = reservas;
        console.log('Notificaciones recibidas:', this.reservas);
      });
    }
  }
  irADetalles(): void {

  this.router.navigate(['/reserva-asesor']);
}
volverDashboard() {
  this.router.navigate(['/dashboard-asesor']);
}
}
