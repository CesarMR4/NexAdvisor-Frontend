import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-asesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-perfil-asesor.component.html',
  styleUrls: ['./ver-perfil-asesor.component.css']
})
export class PerfilAsesorComponent implements OnInit {

  asesor: Asesor | null = null;

  constructor(
    private route: ActivatedRoute,
    private asesorService: AsesorService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.asesorService.getAsesorById(id).subscribe((data) => {
  // Construye la ruta al endpoint de descarga
  //data.curriculum = `http://localhost:8080/asesores/${id}/curriculum`;
  data.curriculum = `${environment.apiUrl}/asesores/${id}/curriculum`;
  this.asesor = data;
});
    }
  }
  volverListaAsesores() {
  this.router.navigate(['/contactar']);
}
}
