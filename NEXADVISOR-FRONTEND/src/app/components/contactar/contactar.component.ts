import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';

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

  constructor(
    private asesorService: AsesorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.asesorService.getAllAsesores().subscribe({
      next: (data) => {
        console.log('Asesores recibidos:', data); // Agregado para debug
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
