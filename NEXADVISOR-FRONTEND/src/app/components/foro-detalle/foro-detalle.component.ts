import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionForo } from '../../models/PublicacionForo';
import { RespuestaForo } from '../../models/RespuestaForo';
import { Estudiante } from '../../models/Estudiante';
import { PublicacionForoService } from '../../services/publicacion-foro.service';
import { RespuestaForoService } from '../../services/respuesta-foro.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foro-detalle',
  standalone: true,
  templateUrl: './foro-detalle.component.html',
  styleUrls: ['./foro-detalle.component.css'],
  imports: [CommonModule, FormsModule]
})

export class ForoDetalleComponent implements OnInit {

  publicacion!: PublicacionForo;
  respuestas: RespuestaForo[] = [];
  nuevaRespuesta: string = '';
  user!: Estudiante;

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionForoService,
    private respuestaService: RespuestaForoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const usuario = this.authService.getUser();

    if (usuario && usuario.tipoUsuario === 'estudiante') {
      this.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email || '',
      password: '',
      direccion: '',
      telefono: '',
      curriculum: '',
      carrera: '',
      fechaRegistro: new Date(),
      rol: 'estudiante'
      };
      this.cargarPublicacion(id);
    } else {
      console.error('Usuario no autenticado o no es estudiante');
    }
  }

  cargarPublicacion(id: number): void {
    this.publicacionService.obtenerPorId(id).subscribe({
      next: (data: PublicacionForo) => {
        this.publicacion = data;
        this.cargarRespuestas();
      },
      error: (e: any) => console.error('Error al cargar la publicación', e)
    });
  }

  cargarRespuestas(): void {
    this.respuestaService.listar().subscribe({
      next: (data: RespuestaForo[]) => {
        this.respuestas = data
          .filter((r: RespuestaForo) => r.publicacion.id === this.publicacion.id)
          .sort((a: RespuestaForo, b: RespuestaForo) => 
            new Date(b.fechaRespuesta!).getTime() - new Date(a.fechaRespuesta!).getTime()
          );
      },
      error: (e: any) => console.error('Error al cargar respuestas', e)
    });
  }

  publicarRespuesta(): void {
    if (!this.nuevaRespuesta.trim()) return;

    const nueva: RespuestaForo = {
      contenido: this.nuevaRespuesta,
      fechaRespuesta: new Date(),
      estudiante: this.user,
      publicacion: this.publicacion
    };

    this.respuestaService.crear(nueva).subscribe({
      next: () => {
        this.nuevaRespuesta = '';
        this.cargarRespuestas();
      },
      error: (e: any) => console.error('Error al publicar respuesta', e)
    });
  }
}
