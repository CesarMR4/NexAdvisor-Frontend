import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Comentario } from '../../models/Comentario';
import { ComentarioService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarios-asesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentarios-asesor.component.html',
  styleUrls: ['./comentarios-asesor.component.css'],
  providers: [DatePipe]
})
export class ComentariosAsesorComponent implements OnInit {
  comentarios: Comentario[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
  const idAsesor = this.route.snapshot.paramMap.get('id');
  if (idAsesor) {
    this.comentarioService.getComentariosPorAsesor(+idAsesor).subscribe(data => {
      this.comentarios = data;
    });
  }
}
}
