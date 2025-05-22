import { Component } from '@angular/core';
import { Asesor } from '../../models/Asesor';
import { AsesorService } from '../../services/asesor.service';

@Component({
  selector: 'app-registro-asesor',
  imports: [],
  templateUrl: './registro-asesor.component.html',
  styleUrl: './registro-asesor.component.css'
})
export class RegistroAsesorComponent {

  asesor: Asesor= new Asesor();

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
}
