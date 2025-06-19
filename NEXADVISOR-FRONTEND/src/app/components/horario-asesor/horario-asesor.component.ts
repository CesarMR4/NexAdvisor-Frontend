import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horario-asesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-asesor.component.html'
})
export class HorariosAsesorComponent implements OnInit {
  horarios: Horario[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  constructor(
    private horarioService: HorarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const asesor = this.authService.getUser();

    if (!asesor) {
      alert('Error: No se encontró al asesor autenticado.');
      return;
    }

    this.horarioService.getByAsesor(asesor.id).subscribe(data => {
      this.horarios = data;
    });
  }

  agregarHorario(): void {
    const nuevoHorario = new Horario();
    nuevoHorario.dia = 0; // por defecto Lunes
    this.horarios.push(nuevoHorario);
  }

  eliminarHorario(horario: Horario): void {
    if (horario.id) {
      this.horarioService.eliminar(horario.id).subscribe(() => {
        this.horarios = this.horarios.filter(h => h !== horario);
      });
    } else {
      this.horarios = this.horarios.filter(h => h !== horario);
    }
  }

  guardarCambios(): void {
    const asesor = this.authService.getUser();

    if (!asesor) {
      alert('Error: No se encontró al asesor autenticado.');
      return;
    }

    this.horarios.forEach(horario => {
      // Asignar asesor
      horario.asesor.id = asesor.id;

      if (horario.id) {
        this.horarioService.actualizar(horario.id, horario).subscribe();
      } else {
        this.horarioService.insertar(horario).subscribe();
      }
    });

    alert('Horarios guardados exitosamente');
  }
}
