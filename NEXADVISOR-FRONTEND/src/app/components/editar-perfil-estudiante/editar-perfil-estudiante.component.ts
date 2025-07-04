import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil-estudiante.component.html',
  styleUrls: ['./editar-perfil-estudiante.component.css']
})
export class EditarPerfilEstudianteComponent implements OnInit {

  form!: FormGroup;
  isLoading = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
      carrera: [''],
      telefono: ['']
    });

    const id = this.authService.getUserId();
    if (id) {
      this.estudianteService.getEstudianteById(id).subscribe(est => {
        this.form.patchValue(est);
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.successMessage = '';
      const id = this.authService.getUserId();
      if (id) {
        this.estudianteService.updateEstudiante(id, this.form.value).subscribe({
          next: () => {
            this.successMessage = 'Perfil actualizado correctamente';
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['/perfil-estudiante']);
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
  volverPerfil() {
  this.router.navigate(['/perfil-estudiante']); // Cambia la ruta si la tuya es diferente
}
}
