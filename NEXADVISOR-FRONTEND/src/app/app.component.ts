import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // <-- Agrega esto
import { RegistroAsesorComponent } from './components/registro-asesor/registro-asesor.component';
import { VerPuntuacionComponent } from './components/ver-puntuacion/ver-puntuacion.component';
import { ForoComponent } from './components/foro/foro.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservaAsesorComponent } from './components/reserva-asesor/reserva-asesor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // <-- Aquí
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    RegistroAsesorComponent,
    VerPuntuacionComponent,
    ReactiveFormsModule,
    ForoComponent,
    ReservaAsesorComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NEXADVISOR-FRONTEND';
}
