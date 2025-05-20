import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-Asesor',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Asesor.component.html',
  styleUrl: './Asesor.component.css'
})
export class AsesorComponent {
  constructor(public route: ActivatedRoute) { }
}
