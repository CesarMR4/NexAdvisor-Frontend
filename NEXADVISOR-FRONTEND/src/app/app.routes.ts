import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroEstudianteComponent } from './components/registro-estudiante/registro-estudiante.component';
import { RegistroAsesorComponent } from './components/registro-asesor/registro-asesor.component';
import { BuscarAsesoresComponent } from './components/buscar-asesores/buscar-asesores.component';
import { PerfilAsesorComponent } from './components/ver-perfil-asesor/ver-perfil-asesor.component';
import { ComentariosAsesorComponent } from './components/comentarios-asesor/comentarios-asesor.component';
import { PerfilEstudianteComponent } from './components/perfil-estudiante/perfil-estudiante.component';
import { EditarPerfilEstudianteComponent } from './components/editar-perfil-estudiante/editar-perfil-estudiante.component';
import { SolicitudesEstudianteComponent } from './components/solicitudes-estudiante/solicitudes-estudiante.component';
import { HorariosAsesorComponent } from './components/horario-asesor/horario-asesor.component';
import { ForoDetalleComponent } from './components/foro-detalle/foro-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard-estudiante',
    loadComponent: () =>
      import('./components/dashboard-estudiante/dashboard-estudiante.component').then(m => m.DashboardEstudianteComponent)
  },
  {
    path: 'dashboard-asesor',
    loadComponent: () =>
      import('./components/dashboard-asesor/dashboard-asesor.component').then(m => m.DashboardAsesorComponent)
  },
  {
    path: 'foro',
    loadComponent: () =>
      import('./components/foro/foro.component').then(m => m.ForoComponent)
  },
  { 
    path: 'foro/:id', 
    component: ForoDetalleComponent 
  },
  {
    path: 'contactar',
    loadComponent: () =>
      import('./components/contactar/contactar.component').then(m => m.ContactarComponent)
  },
  {
    path: 'horarios-estudiante/:id',
    loadComponent: () =>
      import('./components/horarios-estudiante/horarios-estudiante.component').then(m => m.HorariosEstudianteComponent)
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./components/historial-estudiante/historial-estudiante.component').then(m => m.HistorialEstudianteComponent)
  },
  {
    path: 'horarios-asesor',
    loadComponent: () =>
      import('./components/horario-asesor/horario-asesor.component').then(m => m.HorariosAsesorComponent)
  },
  {
    path: 'registro-asesor',
    loadComponent: () =>
      import('./components/registro-asesor/registro-asesor.component').then(m => m.RegistroAsesorComponent)
  },
  {
    path: 'registro-estudiante',
    loadComponent: () =>
      import('./components/registro-estudiante/registro-estudiante.component').then(m => m.RegistroEstudianteComponent)
  },
  { path: 'solicitud', component: SolicitudesEstudianteComponent },
  { path: 'perfil-estudiante', component: PerfilEstudianteComponent },
  { path: 'editar-perfil-estudiante', component: EditarPerfilEstudianteComponent },
  { path: 'buscar-asesores', component: BuscarAsesoresComponent },
  { path: 'ver-perfil-asesor/:id', component: PerfilAsesorComponent },
  { path: 'comentarios-asesor', component: ComentariosAsesorComponent },
  {
    path: 'ver-puntuacion',
    loadComponent: () =>
      import('./components/asesor-con-puntuacion/asesor-con-puntuacion.component').then(m => m.AsesorConPuntuacionComponent)
  },
  { path: '**', redirectTo: 'inicio' }
];

