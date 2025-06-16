import { Component } from '@angular/core';
import { CurriculumService } from '../../services/curriculum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subir-curriculum',
  templateUrl: './subir-curriculum.component.html',
  styleUrls: ['./subir-curriculum.component.css']
})
export class SubirCurriculumComponent {

  form: FormGroup;
  resultadoIA: string | null = null;
  idReserva: number = 1; 

  constructor(private fb: FormBuilder, private curriculumService: CurriculumService) {
    this.form = this.fb.group({
      textoCurriculum: ['', Validators.required]
    });
  }

  analizar() {
    if (this.form.valid) {
      const texto = this.form.value.textoCurriculum;
      this.curriculumService.analizarCurriculum(this.idReserva, texto).subscribe({
        next: (reporte: string) => {
          this.resultadoIA = reporte;
        },
        error: () => {
          this.resultadoIA = 'Ocurrió un error al procesar el análisis.';
        }
      });
    }
  }
}
