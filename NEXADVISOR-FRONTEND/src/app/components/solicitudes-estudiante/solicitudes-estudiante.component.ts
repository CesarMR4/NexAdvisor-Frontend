import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/Reserva';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes-estudiante',
  templateUrl: './solicitudes-estudiante.component.html',
  imports: [CommonModule],
  styleUrls: ['./solicitudes-estudiante.component.css']
})
export class SolicitudesEstudianteComponent implements OnInit {
  reservas: Reserva[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante') || '{}');
    const idEstudiante = estudiante?.id;

    if (!idEstudiante) {
      this.error = 'No se encontró el ID del estudiante.';
      this.cargando = false;
      return;
    }

    this.reservaService.getByEstudiante(idEstudiante).subscribe({
      next: (res) => {
        this.reservas = res;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar las reservas.';
        this.cargando = false;
      }
    });
  }
}
