import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesorService } from '../../services/asesor.service';
import { Asesor } from '../../models/Asesor';
import { VerPuntuacionComponent } from '../ver-puntuacion/ver-puntuacion.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-asesores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VerPuntuacionComponent  
  ],
  templateUrl: './buscar-asesores.component.html',
  styleUrls: ['./buscar-asesores.component.css']
})
export class BuscarAsesoresComponent {
  tipoBusqueda: 'carrera' | 'sector' = 'carrera';
  criterio: string = '';
  resultados: Asesor[] = [];
  cargando: boolean = false;
  errorMensaje: string = '';

    carreras: string[] = [
    'Administración',
    'Administración y Ciencia de Datos para Negocios',
    'Administración y Finanzas',
    'Administración y Marketing',
    'Administración y Negocios Internacionales',
    'Administración y Recursos Humanos',
    'Arquitectura',
    'Artes Escénicas',
    'Artes Contemporáneas',
    'Biología',
    'Ciencias de la Actividad Física y el Deporte',
    'Ciencias de la Computación',
    'Ciencias Políticas',
    'Comunicación Audiovisual y Medios Interactivos',
    'Comunicación y Marketing',
    'Comunicación e Imagen Empresarial',
    'Comunicación y Periodismo',
    'Comunicación y Publicidad',
    'Contabilidad y Administración',
    'Contabilidad y Finanzas',
    'Derecho',
    'Diseño Industrial',
    'Diseño Profesional de Interiores',
    'Diseño Profesional Gráfico',
    'Diseño y Gestión en Moda',
    'Economía Gerencial',
    'Economía y Ciencias de Datos',
    'Economía y Finanzas',
    'Economía y Negocios Internacionales',
    'Educación y Gestión del Aprendizaje',
    'Enfermería',
    'Farmacia y Bioquímica',
    'Gastronomía y Gestión Culinaria',
    'Hotelería y Administración',
    'Ingeniería Civil',
    'Ingeniería Ambiental',
    'Ingeniería Biomédica',
    'Ingeniería de Ciberseguridad',
    'Ingeniería de Gestión Empresarial',
    'Ingeniería de Gestión Minera',
    'Ingeniería de Sistemas de Información',
    'Ingeniería de Software',
    'Ingeniería Electrónica',
    'Ingeniería Industrial',
    'Ingeniería Mecatrónica',
    'Medicina',
    'Medicina Veterinaria',
    'Música',
    'Nutrición y Dietética',
    'Odontología',
    'Psicología',
    'Relaciones Internacionales',
    'Terapia Física',
    'Turismo y Administración'
  ];

  sectores: string[] = [
    'Finanzas',
    'Recursos Humanos',
    'Tecnología',
    'Marketing',
    'Legal',
    'Consultoría'
  ];

  constructor(private asesorService: AsesorService, private router: Router) {}

  buscar() {
    this.errorMensaje = '';
    if (!this.criterio.trim()) {
      this.resultados = [];
      return;
    }

    this.cargando = true;
    if (this.tipoBusqueda === 'carrera') {
      this.asesorService.buscarPorCarrera(this.criterio.trim()).subscribe({
        next: asesores => {
          this.resultados = asesores;
          this.cargando = false;
        },
        error: () => {
          this.errorMensaje = 'Error al buscar asesores por carrera.';
          this.cargando = false;
        }
      });
    } else if (this.tipoBusqueda === 'sector') {
      this.asesorService.buscarPorSector(this.criterio.trim()).subscribe({
        next: asesores => {
          this.resultados = asesores;
          this.cargando = false;
        },
        error: () => {
          this.errorMensaje = 'Error al buscar asesores por sector.';
          this.cargando = false;
        }
      });
    }
  }
  verHorarios(asesorId: number) {
  this.router.navigate(['/horarios-estudiante', asesorId]);
}
 volverDashboard() {
    this.router.navigate(['/dashboard-estudiante']);
  }
}
