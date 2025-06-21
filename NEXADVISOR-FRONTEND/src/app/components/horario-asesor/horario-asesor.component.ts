import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asesor } from '../../models/Asesor';

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
  console.log('🟢 Componente horario-asesor cargado');

  this.authService.currentUser.subscribe(asesor => {
    console.log('👤 Asesor obtenido desde observable:', asesor);

    if (!asesor) {
      console.error('❌ No se encontró al asesor autenticado.');
      return;
    }

    this.horarioService.getByAsesor(asesor.id).subscribe(data => {
      this.horarios = data;
      console.log('📥 Horarios recibidos:', data);
    });
  });
}

  agregarHorario(): void {
    const nuevoHorario = new Horario();
    nuevoHorario.dia = 0;
    this.horarios.push(nuevoHorario);
    console.log('🆕 Horario agregado:', nuevoHorario);
  }

  eliminarHorario(horario: Horario): void {
    if (horario.id) {
      this.horarioService.eliminar(horario.id).subscribe(() => {
        this.horarios = this.horarios.filter(h => h !== horario);
        console.log('🗑️ Horario eliminado:', horario);
      });
    } else {
      this.horarios = this.horarios.filter(h => h !== horario);
      console.log('🗑️ Horario quitado localmente:', horario);
    }
  }

  guardarCambios(): void {
    console.log('➡️ Click en guardarCambios detectado');

    const asesorData = this.authService.getUser();
    if (!asesorData) {
      console.error('❌ No se encontró al asesor autenticado.');
      return;
    }

    this.horarios.forEach(horario => {
      const asesor = new Asesor();
      asesor.id = asesorData.id;
      horario.asesor = asesor;

      console.log('📤 Enviando horario al backend:', horario);

      if (horario.id) {
        this.horarioService.actualizar(horario.id, horario).subscribe({
          next: () => console.log('✅ Horario actualizado correctamente'),
          error: err => console.error('❌ Error al actualizar horario', err)
        });
      } else {
        this.horarioService.insertar(horario).subscribe({
          next: () => console.log('✅ Horario registrado correctamente'),
          error: err => console.error('❌ Error al registrar horario', err)
        });
      }
    });

    console.log('✅ Todos los horarios fueron procesados.');
  }
}
