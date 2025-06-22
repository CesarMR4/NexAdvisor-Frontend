import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';
import { ReservaService } from '../../services/reserva.service';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../../models/Reserva';
import { Estudiante } from '../../models/Estudiante';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-horarios-estudiante',
  standalone: true,
  imports: [CommonModule], // agrega aquí FormsModule si usas ngModel
  templateUrl: './horarios-estudiante.component.html',
  styleUrls: ['./horarios-estudiante.component.css']
})
export class HorariosEstudianteComponent implements OnInit {
  horariosPorDia: { [key: string]: Horario[] } = {};
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  diasMap: { [key: number]: string } = {
    0: 'Lunes',
    1: 'Martes',
    2: 'Miércoles',
    3: 'Jueves',
    4: 'Viernes'
  };

  horarioSeleccionado: Horario | null = null;

  constructor(
    private horarioService: HorarioService,
    private reservaService: ReservaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  console.log('🟢 HorariosEstudianteComponent cargado');

  const asesorId = +this.route.snapshot.paramMap.get('id')!;
  console.log('Asesor ID recibido:', asesorId);
  
  this.horarioService.getByAsesor(asesorId).subscribe(horarios => {
    console.log('Horarios recibidos:', horarios);
    this.horariosPorDia = this.diasSemana.reduce((acc, dia) => {
      acc[dia] = horarios.filter(h => this.diasMap[h.dia] === dia);
      return acc;
    }, {} as { [key: string]: Horario[] });
  });
}

  seleccionarHorario(horario: Horario) {
    this.horarioSeleccionado = horario;
    console.log('Horario seleccionado:', horario);
  }

  confirmarSeleccion() {
  if (!this.horarioSeleccionado) {
    alert('Selecciona un horario antes de confirmar.');
    return;
  }

  const estudiante = JSON.parse(localStorage.getItem('estudiante') || '{}');

  if (!estudiante.id) {
    alert('Error: No se encontró información del estudiante.');
    return;
  }

  const reserva: Reserva = {
    id: 0,
    fechaReserva: new Date(),
    horaReserva: this.horarioSeleccionado.horaInicio.toString().substring(0, 5),
    estado: 'pendiente',
    comentarioAsesor: '',
    estudiante: estudiante,
    asesor: this.horarioSeleccionado.asesor
  };

  this.reservaService.insertar(reserva).subscribe({
    next: () => {
      alert('Reserva registrada exitosamente.');
      this.horarioSeleccionado = null;
    },
    error: () => {
      alert('Ocurrió un error al registrar la reserva.');
    }
  });
}
esArrayYNoVacio(lista: any): boolean {
  return Array.isArray(lista) && lista.length > 0;
}
solicitarHorario(horario: Horario) {
  this.horarioSeleccionado = horario;
  this.confirmarSeleccion(); // Reutilizamos tu función actual
}

}
