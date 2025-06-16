import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-ver-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-notificaciones.component.html',
  styleUrls: ['./ver-notificaciones.component.css']
})
export class VerNotificacionesComponent implements OnInit, OnDestroy {
  mensajes: string[] = [];
  idAsesor: number = 1;  // aquí pondrás luego el id del asesor logueado

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.notificacionService.conectar(this.idAsesor, (mensaje: string) => {
      this.mensajes.push(mensaje);
    });
  }

  ngOnDestroy(): void {
    this.notificacionService.desconectar();
  }
}
