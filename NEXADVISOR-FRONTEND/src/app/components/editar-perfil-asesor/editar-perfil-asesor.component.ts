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
      telefono: ['']
    });

    const id = this.authService.getUserId();
    if (id) {
      this.asesorService.getAsesorById(id).subscribe(asesor => {
        this.form.patchValue(asesor);
      });
    }
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
              this.router.navigate(['/perfil-asesor']);
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
