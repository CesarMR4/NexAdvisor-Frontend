import { Component } from '@angular/core';
import { Asesor } from '../../models/Asesor';
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

  asesor: Asesor = new Asesor();

  constructor(private asesorService: AsesorService) {}

  registrar() {
    this.asesor.fechaRegistro = new Date();
    this.asesor.rol = 'asesor';

    this.asesorService.registrar(this.asesor).subscribe({
      next: res => {
        console.log('Asesor registrado correctamente', res);
      },
      error: err => {
        console.error('Error al registrar asesor', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.asesor.curriculum = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
