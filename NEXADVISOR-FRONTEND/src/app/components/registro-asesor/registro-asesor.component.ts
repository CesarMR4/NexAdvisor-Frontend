import { Component } from '@angular/core';
import { AsesorService } from '../../services/asesor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-asesor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro-asesor.component.html',
  styleUrls: ['./registro-asesor.component.css']
})
export class RegistroAsesorComponent {

    asesor = {
    nombre: '',
    email: '',
    password: '',
    direccion: '',
    telefono: '',
    sector: '',
    carrera: '',
  };

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

  sectores: string[] = [
    'Finanzas',
    'Recursos Humanos',
    'Tecnología',
    'Marketing',
    'Legal',
    'Consultoría'
  ];

  curriculumFile: File | null = null;

  constructor(private asesorService: AsesorService, private router: Router) {}
volverAlLogin() {
  this.router.navigate(['/login'], { queryParams: { rol: 'asesor' } });
}
  registrar() {
    if (!this.curriculumFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta el currículum',
        text: 'Debes seleccionar un archivo PDF como currículum.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.asesor.nombre);
    formData.append('email', this.asesor.email);
    formData.append('password', this.asesor.password);
    formData.append('direccion', this.asesor.direccion);
    formData.append('telefono', this.asesor.telefono);
    formData.append('sector', this.asesor.sector);
    formData.append('carrera', this.asesor.carrera);
    formData.append('curriculum', this.curriculumFile);



    

    this.asesorService.registrar(formData).subscribe({
      next: res => {
        console.log('✅ Asesor registrado correctamente', res);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El asesor fue registrado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });

       
        this.asesor = {
          nombre: '',
          email: '',
          password: '',
          direccion: '',
          telefono: '',
          sector: '',
          carrera: '',
        };
        this.curriculumFile = null;
      },
      error: err => {
        console.error('❌ Error al registrar asesor', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el asesor.',
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.curriculumFile = file;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Archivo inválido',
        text: 'El archivo debe ser un PDF.',
      });
      this.curriculumFile = null;
    }
  }
}
