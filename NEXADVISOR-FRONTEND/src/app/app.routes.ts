import { Routes } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroAsesorComponent } from './components/registro-asesor/registro-asesor.component';
import { BuscarAsesoresComponent } from './components/buscar-asesores/buscar-asesores.component';


export const routes: Routes = [
  { path: '', component: RolComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-asesor', component: RegistroAsesorComponent },
  { path: 'buscar-asesores', component: BuscarAsesoresComponent},
  { path: '**', redirectTo: '' }, // ← siempre debe ir al final
];