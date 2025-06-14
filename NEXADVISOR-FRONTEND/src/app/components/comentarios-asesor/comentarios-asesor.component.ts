import { Component } from '@angular/core';
import { Comentario } from '../../models/Comentario';
import { ComentarioService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comentarios-asesor',
  imports: [],
  templateUrl: './comentarios-asesor.component.html',
  styleUrl: './comentarios-asesor.component.css'
})
export class ComentariosAsesorComponent {
comentarios: Comentario[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const asesor = this.authService.getUser();
    if (asesor && asesor.id) {
      this.comentarioService.getComentariosPorAsesor(asesor.id).subscribe(data => {
        this.comentarios = data;
      });
    }
  }
}
