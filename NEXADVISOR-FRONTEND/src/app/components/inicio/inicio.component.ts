import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private router: Router) {}

  irAlLoginEstudiante() {
    this.router.navigate(['/login'], { queryParams: { rol: 'estudiante' } });
  }

  irAlLogin(tipo: 'asesor' | 'estudiante') {
    this.router.navigate(['/login'], { queryParams: { rol: tipo } });
  }
}
