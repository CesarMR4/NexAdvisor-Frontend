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

        // Opcional: limpiar campos del formulario
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
