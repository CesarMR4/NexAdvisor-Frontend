import { Component } from '@angular/core';
import { Comentario } from '../../models/Comentario';
import { ComentarioService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comentarios-estudiante',
  imports: [],
  templateUrl: './comentarios-estudiante.component.html',
  styleUrl: './comentarios-estudiante.component.css'
})
export class ComentariosEstudianteComponent {
comentarios: Comentario[] = [];
  comentarioEditando: Comentario | null = null;
  contenidoEditado: string = '';

  constructor(
    private comentarioService: ComentarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.comentarioService.listar().subscribe(res => {
      this.comentarios = res.filter(c => c.estudiante.id === userId);
    });
  }

  editarComentario(comentario: Comentario) {
    this.comentarioEditando = comentario;
    this.contenidoEditado = comentario.contenido;
  }

  guardarEdicion() {
    if (this.comentarioEditando) {
      const editado = { contenido: this.contenidoEditado };
      this.comentarioService.actualizar(this.comentarioEditando.id, {
        ...this.comentarioEditando,
        contenido: this.contenidoEditado
      }).subscribe(() => {
        this.comentarioEditando!.contenido = this.contenidoEditado;
        this.cancelarEdicion();
      });
    }
  }

  eliminarComentario(id: number) {
    this.comentarioService.eliminar(id).subscribe(() => {
      this.comentarios = this.comentarios.filter(c => c.id !== id);
    });
  }

  cancelarEdicion() {
    this.comentarioEditando = null;
    this.contenidoEditado = '';
  }
}
