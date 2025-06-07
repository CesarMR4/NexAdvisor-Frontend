import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';
import { AuthService } from '../../services/auth.service';
import { Asesor } from '../../models/Asesor';

@Component({
  selector: 'app-horarios-asesor',
  templateUrl: './horarios-asesor.component.html'
})
export class HorariosAsesorComponent implements OnInit {
  horarios: Horario[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  constructor(private horarioService: HorarioService, private authService: AuthService) {}

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

  agregarHorario() {
    this.horarios.push(new Horario());
  }

  eliminarHorario(horario: Horario) {
    if (horario.id) {
      this.horarioService.eliminar(horario.id).subscribe(() => {
        this.horarios = this.horarios.filter(h => h !== horario);
      });
    } else {
      this.horarios = this.horarios.filter(h => h !== horario);
    }
  }

  guardarCambios() {
  const asesor = this.authService.getUser();

  if (!asesor) {
    alert('Error: No se encontró al asesor autenticado.');
    return;
  }

  this.horarios.forEach(horario => {
    if (horario.id) {
      this.horarioService.actualizar(horario.id, horario).subscribe();
    } else {
      horario.asesor.id = asesor.id;
      this.horarioService.insertar(horario).subscribe();
    }
  });

  alert('Horarios guardados exitosamente');
}
}
