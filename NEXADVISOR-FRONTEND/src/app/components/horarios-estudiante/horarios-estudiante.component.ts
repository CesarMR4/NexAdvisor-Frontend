import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horarios-estudiante',
  templateUrl: './horarios-estudiante.component.html'
})
export class HorariosEstudianteComponent implements OnInit {
  horariosPorDia: { [key: string]: Horario[] } = {};
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Mapa para convertir número a nombre de día
  diasMap: { [key: number]: string } = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes'
  };

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const asesorId = +this.route.snapshot.paramMap.get('id')!;
    this.horarioService.getByAsesor(asesorId).subscribe(horarios => {
      // Agrupar horarios por día usando diasMap para hacer la comparación correcta
      this.horariosPorDia = this.diasSemana.reduce((acc, dia) => {
        acc[dia] = horarios.filter(h => this.diasMap[h.dia] === dia);
        return acc;
      }, {} as { [key: string]: Horario[] });
    });
  }

  seleccionarHorario(horario: Horario) {
    console.log('Horario seleccionado:', horario);
  }
}
