import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rol',
  imports: [],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
constructor(private router: Router) {}

  seleccionarRol(rol: 'estudiante' | 'asesor') {
    this.router.navigate(['/login'], { queryParams: { rol } });
  }
}
