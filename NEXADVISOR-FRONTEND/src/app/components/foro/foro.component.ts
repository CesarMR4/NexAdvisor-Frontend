// foro.component.ts
import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../models/Comentario';
import { Respuesta } from '../../models/Respuesta';
import { ComentarioService } from '../../services/comentarios.service';
import { RespuestaService } from '../../services/respuesta.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  comentarios: Comentario[] = [];
  respuestas: Respuesta[] = [];
  nuevoComentario = '';
  nuevoContenidoRespuesta = '';
  respuestaParaComentarioId: number | null = null;

  // Variables para editar
  comentarioEditandoId: number | null = null;
  respuestaEditandoId: number | null = null;

  // Formularios para edición
  editarComentarioForm: FormGroup;
  editarRespuestaForm: FormGroup;

  constructor(
    private comentarioService: ComentarioService,
    private respuestaService: RespuestaService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    // Formularios para edición con validaciones intermedias (min/max length)
    this.editarComentarioForm = this.fb.group({
      contenido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
    this.editarRespuestaForm = this.fb.group({
      contenido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.comentarioService.listar().subscribe(data => this.comentarios = data);
    this.respuestaService.listar().subscribe(data => this.respuestas = data);
  }

  esDueñoComentario(comentario: Comentario): boolean {
    return comentario.estudiante.id === this.authService.getUserId();
  }

  esDueñoRespuesta(respuesta: Respuesta): boolean {
    return respuesta.estudiante.id === this.authService.getUserId();
  }

  crearComentario() {
    if (!this.nuevoComentario.trim()) return;
    const userId = this.authService.getUserId();
    if (!userId) return alert('No estás autenticado');

    const nuevo = new Comentario();
    nuevo.contenido = this.nuevoComentario;
    nuevo.estudiante = { id: userId } as any; // asegurarse que sea el tipo correcto

    this.comentarioService.crear(nuevo).subscribe(() => {
      this.nuevoComentario = '';
      this.cargarDatos();
    });
  }

  crearRespuesta(comentarioId: number) {
    if (!this.nuevoContenidoRespuesta.trim()) return;
    const userId = this.authService.getUserId();
    if (!userId) return alert('No estás autenticado');

    const respuesta = new Respuesta();
    respuesta.contenido = this.nuevoContenidoRespuesta;
    respuesta.comentario = { id: comentarioId } as any;
    respuesta.estudiante = { id: userId } as any;

    this.respuestaService.crear(respuesta).subscribe(() => {
      this.nuevoContenidoRespuesta = '';
      this.respuestaParaComentarioId = null;
      this.cargarDatos();
    });
  }

  // --- Métodos para editar Comentarios ---
  activarEdicionComentario(comentario: Comentario) {
    this.comentarioEditandoId = comentario.id;
    this.editarComentarioForm.setValue({ contenido: comentario.contenido });
  }

  cancelarEdicionComentario() {
    this.comentarioEditandoId = null;
  }

  enviarEdicionComentario() {
    if (this.editarComentarioForm.invalid || this.comentarioEditandoId === null) return;

    const contenido = this.editarComentarioForm.value.contenido.trim();
    this.comentarioService.actualizar(this.comentarioEditandoId, { contenido }).subscribe({
      next: () => {
        this.comentarioEditandoId = null;
        this.cargarDatos();
      },
      error: () => alert('Error al editar comentario')
    });
  }

  eliminarComentario(id: number) {
    if (!confirm('¿Está seguro que desea eliminar este comentario?')) return;

    this.comentarioService.eliminar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => alert('Error al eliminar comentario')
    });
  }

  // --- Métodos para editar Respuestas ---
  activarEdicionRespuesta(respuesta: Respuesta) {
    this.respuestaEditandoId = respuesta.id;
    this.editarRespuestaForm.setValue({ contenido: respuesta.contenido });
  }

  cancelarEdicionRespuesta() {
    this.respuestaEditandoId = null;
  }

  enviarEdicionRespuesta() {
    if (this.editarRespuestaForm.invalid || this.respuestaEditandoId === null) return;

    const contenido = this.editarRespuestaForm.value.contenido.trim();
    this.respuestaService.actualizar(this.respuestaEditandoId, { contenido }).subscribe({
      next: () => {
        this.respuestaEditandoId = null;
        this.cargarDatos();
      },
      error: () => alert('Error al editar respuesta')
    });
  }

  eliminarRespuesta(id: number) {
    if (!confirm('¿Está seguro que desea eliminar esta respuesta?')) return;

    this.respuestaService.eliminar(id).subscribe({
      next: () => this.cargarDatos(),
      error: () => alert('Error al eliminar respuesta')
    });
  }
}
