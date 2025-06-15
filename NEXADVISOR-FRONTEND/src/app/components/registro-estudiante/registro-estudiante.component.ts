import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true, // 👈 Esto es CLAVE
  imports: [CommonModule, FormsModule], // 👈 Importas lo necesario para usar ngModel y ngForm
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css'] // 👈 era `styleUrl`, lo correcto es `styleUrls`
})
export class RegistroEstudianteComponent {

  estudiante: Estudiante = new Estudiante();

  constructor(private estudianteService: EstudianteService) {}

  registrar() {
    this.estudiante.fechaRegistro = new Date();
    this.estudiante.rol = "estudiante";

    this.estudianteService.registrar(this.estudiante).subscribe({
      next: res => {
        console.log('Estudiante registrado correctamente', res);
      },
      error: err => {
        console.error('Error al registrar estudiante', err);
      }
    });
  }
}
