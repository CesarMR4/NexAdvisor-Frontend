import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/Horario';
import { HorarioService } from '../../services/horario.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asesor } from '../../models/Asesor';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horario-asesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-asesor.component.html',
  styleUrls: ['./horario-asesor.component.css']
})
export class HorariosAsesorComponent implements OnInit {
  horarios: Horario[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sabado','Domingo' ];
  asesorAutenticado: Asesor | null = null;

  constructor(
    private horarioService: HorarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🟢 Componente horario-asesor cargado');

    const user = this.authService.getUser();

    if (!user || user.tipoUsuario !== 'asesor') {
      console.error('❌ No se encontró al asesor autenticado.');
      return;
    }

    this.asesorAutenticado = { id: user.id } as Asesor;

    this.horarioService.getByAsesor(user.id).subscribe(data => {
      this.horarios = data;
      console.log('📥 Horarios recibidos:', data);
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

    if (!this.asesorAutenticado) {
      console.error('❌ Asesor no autenticado en guardarCambios');
      return;
    }

    let totalGuardados = 0;

    const total = this.horarios.length;
    if (total === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin horarios',
        text: 'No hay horarios para guardar.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    this.horarios.forEach(horario => {
      horario.asesor = this.asesorAutenticado!;
      const diaTexto = this.diasSemana[horario.dia];

      const callback = () => {
        totalGuardados++;
        if (totalGuardados === total) {
          Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            text: 'Todos los horarios se han guardado correctamente.',
            timer: 2000,
            showConfirmButton: false
          });
        }
      };

      if (horario.id) {
        this.horarioService.actualizar(horario.id, horario).subscribe({
          next: () => {
            console.log(`✅ Horario del ${diaTexto} actualizado`);
            callback();
          },
          error: err => console.error('❌ Error al actualizar horario', err)
        });
      } else {
        this.horarioService.insertar(horario).subscribe({
          next: () => {
            console.log(`✅ Horario del ${diaTexto} registrado`);
            callback();
          },
          error: err => console.error('❌ Error al registrar horario', err)
        });
      }
    });
  }
   volverDashboard() {
    this.router.navigate(['/dashboard-asesor']);
  }
}
