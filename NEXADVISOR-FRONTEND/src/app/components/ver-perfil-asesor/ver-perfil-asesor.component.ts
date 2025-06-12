import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';

@Component({
  selector: 'app-perfil-asesor',
  templateUrl: './perfil-asesor.component.html',
  styleUrls: ['./perfil-asesor.component.css']
})
export class PerfilAsesorComponent implements OnInit {

  asesor: Asesor | null = null;

  constructor(
    private route: ActivatedRoute,
    private asesorService: AsesorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.asesorService.getAsesorById(id).subscribe((data) => {
        this.asesor = data;
      });
    }
  }
}
