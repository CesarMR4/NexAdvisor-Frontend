import { Routes } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroAsesorComponent } from './components/registro-asesor/registro-asesor.component';
import { BuscarAsesoresComponent } from './components/buscar-asesores/buscar-asesores.component';
import { PerfilAsesorComponent } from './components/ver-perfil-asesor/ver-perfil-asesor.component';
import { ComentariosAsesorComponent } from './components/comentarios-asesor/comentarios-asesor.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // 👈 redirige el path vacío a /inicio
  { path: 'inicio', component: InicioComponent },        // 👈 esta es la pantalla que quieres mostrar primero
  { path: 'login', component: LoginComponent },
  { path: 'registro-asesor', component: RegistroAsesorComponent },
  { path: 'buscar-asesores', component: BuscarAsesoresComponent },
  { path: 'ver-perfil-asesor/:id', component: PerfilAsesorComponent },
  { path: 'comentarios-asesor', component: ComentariosAsesorComponent },
  { path: '**', redirectTo: 'inicio' } // 👈 todo lo desconocido redirige a /inicio también
];


