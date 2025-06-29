import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {

  estudiante: Estudiante = new Estudiante();

  constructor(private estudianteService: EstudianteService) {}

registrar() {
  this.estudiante.fechaRegistro = new Date();
  this.estudiante.rol = "estudiante";

  this.estudianteService.registrar(this.estudiante).subscribe({
    next: (res) => {
      console.log('✅ Registro exitoso:', res.mensaje);
      alert(res.mensaje); // <- muestra el mensaje del backend
    },
    error: (err) => {
      console.error('❌ Error en registro:', err);
      alert('Error inesperado al registrar estudiante');
    }
  });
}
}
