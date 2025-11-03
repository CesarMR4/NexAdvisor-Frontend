import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';
import { PuntuacionService } from '../../services/puntuacion.service'; 

@Component({
  selector: 'app-contactar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contactar.component.html',
  styleUrls: ['./contactar.component.css']
})
export class ContactarComponent implements OnInit {
  asesores: Asesor[] = [];
  cargando: boolean = true;
  promedios: { [idAsesor: number]: number } = {}; 

  constructor(
    private asesorService: AsesorService,
    private puntuacionService: PuntuacionService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.asesorService.getAllAsesores().subscribe({
      next: (data) => {
        console.log('Asesores recibidos:', data); 
        this.asesores = data;
        this.cargando = false;

        //Cargar promedio de cada asesor
        this.asesores.forEach(asesor => {
          this.puntuacionService.obtenerPromedioPorAsesor(asesor.id).subscribe({
            next: (promedio) => this.promedios[asesor.id] = promedio,
            error: (err) => {
              console.error(`Error al obtener promedio del asesor ${asesor.id}:`, err);
              this.promedios[asesor.id] = 0;
            }
          });
        });
      },
      error: (err) => {
        console.error('Error al obtener asesores:', err);
        this.cargando = false;
      }
    });
  }

  verPerfil(id: number) {
    this.router.navigate(['/ver-perfil-asesor', id]);
  }

  verHorarios(id: number) {
    this.router.navigate(['/horarios-estudiante', id]);
  }
   volverDashboard() {
    this.router.navigate(['/dashboard-estudiante']);
  }
}
