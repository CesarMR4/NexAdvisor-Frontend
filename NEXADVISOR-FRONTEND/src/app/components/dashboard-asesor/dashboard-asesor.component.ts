import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-asesor',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './dashboard-asesor.component.html',
  styleUrl: './dashboard-asesor.component.css'
})
export class DashboardAsesorComponent {

}
