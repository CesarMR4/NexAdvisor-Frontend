import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../models/Estudiante';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../services/estudiante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {

  estudiante: Estudiante = new Estudiante();


carreras: string[] = [
  'Administración',
  'Administración y Ciencia de Datos para Negocios',
  'Administración y Finanzas',
  'Administración y Marketing',
  'Administración y Negocios Internacionales',
  'Administración y Recursos Humanos',
  'Arquitectura',
  'Artes Escénicas',
  'Artes Contemporáneas',
  'Biología',
  'Ciencias de la Actividad Física y el Deporte',
  'Ciencias de la Computación',
  'Ciencias Políticas',
  'Comunicación Audiovisual y Medios Interactivos',
  'Comunicación y Marketing',
  'Comunicación e Imagen Empresarial',
  'Comunicación y Periodismo',
  'Comunicación y Publicidad',
  'Contabilidad y Administración',
  'Contabilidad y Finanzas',
  'Derecho',
  'Diseño Industrial',
  'Diseño Profesional de Interiores',
  'Diseño Profesional Gráfico',
  'Diseño y Gestión en Moda',
  'Economía Gerencial',
  'Economía y Ciencias de Datos',
  'Economía y Finanzas',
  'Economía y Negocios Internacionales',
  'Educación y Gestión del Aprendizaje',
  'Enfermería',
  'Farmacia y Bioquímica',
  'Gastronomía y Gestión Culinaria',
  'Hotelería y Administración',
  'Ingeniería Civil',
  'Ingeniería Ambiental',
  'Ingeniería Biomédica',
  'Ingeniería de Ciberseguridad',
  'Ingeniería de Gestión Empresarial',
  'Ingeniería de Gestión Minera',
  'Ingeniería de Sistemas de Información',
  'Ingeniería de Software',
  'Ingeniería Electrónica',
  'Ingeniería Industrial',
  'Ingeniería Mecatrónica',
  'Medicina',
  'Medicina Veterinaria',
  'Música',
  'Nutrición y Dietética',
  'Odontología',
  'Psicología',
  'Relaciones Internacionales',
  'Terapia Física',
  'Turismo y Administración'
];


  constructor(private estudianteService: EstudianteService, private router: Router) {}

registrar() {
  this.estudiante.fechaRegistro = new Date();
  this.estudiante.rol = "estudiante";

  this.estudianteService.registrar(this.estudiante).subscribe({
    next: (res) => {
      console.log('✅ Registro exitoso:', res.mensaje);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: res.mensaje,
        timer: 2000,
        showConfirmButton: false
      });

      this.estudiante = new Estudiante();
    },
    error: (err) => {
      console.error('❌ Error en registro:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar el estudiante.',
      });
    }
  });
}
volverLoginEstudiante() {
  this.router.navigate(['/login'], { queryParams: { tipo: 'estudiante' } });
}

}
