import { Component } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.service';


@Component({
  selector: 'app-registro-estudiante',
  imports: [],
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.css'
})
export class RegistroEstudianteComponent {

  estudiante: Estudiante = new Estudiante();

  constructor(private estudianteService: EstudianteService) {}

  registrar(){
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
     
