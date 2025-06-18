import { Component, OnInit } from '@angular/core';
import { AsesorService } from '../../services/asesor.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { Asesor } from '../../models/Asesor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asesor-con-puntuacion',
   imports: [CommonModule],
  templateUrl: './asesor-con-puntuacion.component.html',
  styleUrls: ['./asesor-con-puntuacion.component.css']
})
export class AsesorConPuntuacionComponent implements OnInit {
  asesoresConPuntuacion: { asesor: Asesor, promedio: number | null }[] = [];
  cargando: boolean = true;

  constructor(
    private asesorService: AsesorService,
    private puntuacionService: PuntuacionService
  ) {}

  ngOnInit(): void {
    this.asesorService.getAllAsesores().subscribe({
      next: (asesores) => {
        asesores.forEach((asesor) => {
          this.puntuacionService.obtenerPromedioPorAsesor(asesor.id).subscribe({
            next: (promedio) => {
              this.asesoresConPuntuacion.push({ asesor, promedio });
              this.cargando = false;
            },
            error: () => {
              this.asesoresConPuntuacion.push({ asesor, promedio: null });
              this.cargando = false;
            }
          });
        });
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}
