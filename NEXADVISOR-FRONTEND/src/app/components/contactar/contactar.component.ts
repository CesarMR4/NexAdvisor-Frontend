import { Component, OnInit } from '@angular/core';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactar',
  imports: [],
  templateUrl: './contactar.component.html',
  styleUrl: './contactar.component.css'
})
export class ContactarComponent implements OnInit {
    asesores: Asesor[] = [];
    cargando: boolean = true;

constructor(private asesorService: AsesorService, private router: Router) {}
ngOnInit(): void {
    this.asesorService.getAllAsesores().subscribe({
      next: (data) => {
        this.asesores = data;
        this.cargando = false;
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
}
