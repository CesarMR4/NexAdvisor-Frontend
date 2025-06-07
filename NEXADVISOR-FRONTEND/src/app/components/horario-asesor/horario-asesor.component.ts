import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { Asesor } from '../../models/Asesor';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horario-asesor',
  templateUrl: './horario-asesor.component.html',
  styleUrls: ['./horario-asesor.component.css'],
  standalone: true,
  imports: []
})
export class HorarioAsesorComponent implements OnInit {

  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  horariosPorDia: { [dia: string]: Horario[] } = {};
  nuevoHorario: { [dia: string]: Horario } = {};
  asesor: Asesor = new Asesor(); // Este asesor debe venir de login o sesión

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.dias.forEach((_, index) => {
      this.horariosPorDia[index] = [];
      this.nuevoHorario[index] = new Horario();
    });

    this.horarioService.listar().subscribe(data => {
      const delAsesor = data.filter(h => h.asesor.id === this.asesor.id);
      delAsesor.forEach(horario => {
        this.horariosPorDia[horario.dia].push(horario);
      });
    });
  }

  agregarHorario(dia: number) {
    const h = this.nuevoHorario[dia];
    h.dia = dia;
    h.asesor = this.asesor;
    this.horarioService.registrar(h).subscribe(() => {
      this.horariosPorDia[dia].push({ ...h });
      this.nuevoHorario[dia] = new Horario();
    });
  }

  eliminarHorario(dia: number, index: number) {
    const horario = this.horariosPorDia[dia][index];
    this.horarioService.eliminar(horario.id).subscribe(() => {
      this.horariosPorDia[dia].splice(index, 1);
    });
  }

  editarHorario(dia: number, index: number) {
    const horario = this.horariosPorDia[dia][index];
    this.nuevoHorario[dia] = { ...horario };
    this.horariosPorDia[dia].splice(index, 1); // Lo eliminamos para que se sobreescriba al guardar
  }

  guardarCambios() {
    // Si llegas a tener cambios en lote, puedes implementar un método para eso en el backend
    console.log("Cambios guardados");
  }
}
