import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesorService } from '../../services/asesor.service';
import { Auxiliar } from '../../models/auxiliar';



@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
  
})
export class RecuperarContrasenaComponent {
  email: string = '';
  nuevaPassword: string = '';
  numeroTelefonico: string = '';
  mostrarConfirmacion: boolean = false;
  mensaje: string = '';

  constructor(private asesorService: AsesorService) {}

  solicitarConfirmacion() {
    if (!this.email || !this.nuevaPassword) {
      this.mensaje = 'Debe ingresar correo y nueva contraseña';
      return;
    }
    this.mostrarConfirmacion = true;
    this.mensaje = '';
  }

  confirmarYActualizar() {
    const request: Auxiliar = {
      email: this.email,
      nuevaPassword: this.nuevaPassword,
      numeroTelefonico: this.numeroTelefonico
    };

    this.asesorService.resetPassword(request).subscribe({
      next: (respuesta: string) => {
        this.mensaje = respuesta;
        this.mostrarConfirmacion = false;
      },
      error: () => {
        this.mensaje = 'Ocurrió un error al actualizar la contraseña.';
      }
    });
  }
}
