import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsesorService } from '../../services/asesor.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil-asesor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil-asesor.component.html',
  styleUrls: ['./editar-perfil-asesor.component.css']
})
export class EditarPerfilAsesorComponent implements OnInit {

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

  form!: FormGroup;
  isLoading = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private asesorService: AsesorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
      carrera: [''], 
      telefono: [''],
    });

    const id = this.authService.getUserId();
    if (id) {
      this.asesorService.getAsesorById(id).subscribe(asesor => {
        this.form.patchValue(asesor);
      });
    }
  }
  
    
     volverPerfilAsesor() {
  this.router.navigate(['/perfil-del-asesor']);
}

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.successMessage = '';
      const id = this.authService.getUserId();
      if (id) {
        this.asesorService.updateAsesor(id, this.form.value).subscribe({
          next: () => {
            this.successMessage = 'Perfil actualizado correctamente';
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['/perfil-del-asesor']);
            }, 2000);
          },
          error: () => {
            alert('Error al actualizar el perfil');
            this.isLoading = false;
          }
        });
      }
    }
  }
}
