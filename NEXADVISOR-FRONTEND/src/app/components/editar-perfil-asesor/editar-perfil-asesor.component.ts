import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesorService } from '../../services/asesor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-perfil-asesor',
  templateUrl: './editar-perfil-asesor.component.html',
  styleUrls: ['./editar-perfil-asesor.component.css']
})
export class EditarPerfilAsesorComponent implements OnInit {

  form!: FormGroup;
  isSaving: boolean = false;

  constructor(
    private fb: FormBuilder,
    private asesorService: AsesorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
      carrera: [''],
      telefono: [''],
      sector: ['']
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
      this.isSaving = true;
      const id = this.authService.getUserId();
      if (id) {
        this.asesorService.updateAsesor(id, this.form.value).subscribe({
          next: () => {
            alert('Perfil actualizado correctamente');
            this.isSaving = false;
          },
          error: () => {
            alert('Error al actualizar perfil');
            this.isSaving = false;
          }
        });
      }
    }
  }
}
