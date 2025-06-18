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
  archivoSeleccionado: File | null = null;
  resultadoIA: string | null = null;
  idReserva: number = 1;  // Puedes cambiarlo dinámicamente luego

  constructor(private fb: FormBuilder, private curriculumService: CurriculumService) {
    this.form = this.fb.group({
      archivo: [null, Validators.required]
    });
  }

  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  analizar() {
    if (this.archivoSeleccionado) {
      this.curriculumService.analizarCurriculum(this.idReserva, this.archivoSeleccionado).subscribe({
        next: (reporte: string) => {
          this.resultadoIA = reporte;
        },
        error: () => {
          this.resultadoIA = 'Ocurrió un error al procesar el análisis.';
        }
      });
    }
  }
descargarPDF() {
  this.curriculumService.descargarReportePDF(this.idReserva).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_curriculum.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: () => {
      alert('Error al descargar el reporte PDF');
    }
  });
}

}

