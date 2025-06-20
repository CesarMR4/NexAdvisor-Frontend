import { Component } from '@angular/core';
import { AsesorService } from '../../services/asesor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-asesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private asesorService: AsesorService) {}

  registrar() {
    if (!this.curriculumFile) {
      alert("Debes seleccionar un archivo PDF como currículum.");
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
        alert('Asesor registrado correctamente');
      },
      error: err => {
  console.error('❌ Error al registrar asesor', err);
  if (err.status === 201 || err.status === 200) {
    alert('Asesor registrado correctamente (aunque el backend devolvió formato inesperado)');
  } else {
    alert('Error al registrar asesor');
  }
}
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.curriculumFile = file;
    } else {
      alert('El archivo debe ser un PDF.');
      this.curriculumFile = null;
    }
  }
}
