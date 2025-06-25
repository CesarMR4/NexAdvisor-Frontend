import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntuacionService } from '../../services/puntuacion.service';
import { Puntuacion } from '../../models/Puntuacion';

@Component({
  selector: 'app-ver-puntuacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-puntuacion.component.html',
  styleUrls: ['./ver-puntuacion.component.css']
})
export class VerPuntuacionComponent implements OnInit {
  @Input() idAsesor: number = 0;
  promedio: number | null = null;
  cantidad: number = 0;

  constructor(private puntuacionService: PuntuacionService) {}

  ngOnInit(): void {
    if (this.idAsesor > 0) {
      this.puntuacionService.listarPorAsesor(this.idAsesor).subscribe({
        next: (puntuaciones: Puntuacion[]) => {
          if (puntuaciones.length > 0) {
           const suma = puntuaciones.reduce((acc, p) => acc + p.puntuacion, 0);
            this.promedio = suma / puntuaciones.length;
            this.cantidad = puntuaciones.length;
          } else {
            this.promedio = null;
            this.cantidad = 0;
          }
        },
        error: () => {
          this.promedio = null;
        }
      });
    }
  }
}
