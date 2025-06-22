import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionForo } from '../../models/PublicacionForo';
import { PublicacionForoService } from '../../services/publicacion-foro.service';
import { AuthService } from '../../services/auth.service';
import { Estudiante } from '../../models/Estudiante';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foro',
  standalone: true,
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ForoComponent implements OnInit {

  publicaciones: PublicacionForo[] = [];
  nuevaPublicacion: PublicacionForo = {
    titulo: '',
    contenido: '',
    fechaPublicacion: new Date(),
    estudiante: {} as Estudiante
  };
  user!: Estudiante;

  constructor(
    private publicacionService: PublicacionForoService,
    private authService: AuthService,
    private router: Router
  ) {}

ngOnInit(): void {
  const usuario = this.authService.getUser();

  if (usuario && usuario.tipoUsuario === 'estudiante') {
    // Creamos manualmente el objeto Estudiante con los campos obligatorios
    this.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email || '',
      password: '',
      direccion: '',
      telefono: '',
      curriculum: '',
      carrera: '',
      fechaRegistro: new Date(), // o una fecha vacía si tu backend lo llena
      rol: 'estudiante'
    };
    this.listarPublicaciones();
  } else {
    console.error('Usuario no autenticado o no es estudiante');
    // Si quieres, puedes redirigir al login:
    // this.router.navigate(['/login']);
  }
}

  listarPublicaciones(): void {
    this.publicacionService.listar().subscribe({
      next: (data) => this.publicaciones = data
    });
  }

  publicar(): void {
    if (!this.nuevaPublicacion.titulo.trim() || !this.nuevaPublicacion.contenido.trim()) return;

    this.nuevaPublicacion.fechaPublicacion = new Date();
    this.nuevaPublicacion.estudiante = this.user;

    this.publicacionService.crear(this.nuevaPublicacion).subscribe({
      next: () => {
        this.nuevaPublicacion = { titulo: '', contenido: '', estudiante: {} as Estudiante, fechaPublicacion: new Date() };
        this.listarPublicaciones();
      }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/foro', id]);
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta publicación?')) {
      this.publicacionService.eliminar(id).subscribe(() => this.listarPublicaciones());
    }
  }
}
