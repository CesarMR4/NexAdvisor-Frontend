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

  // 🏠 Inicio y autenticación
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'recuperar-contrasena',
    loadComponent: () => import('./components/recuperar-contrasena/recuperar-contrasena.component').then(m => m.RecuperarContrasenaComponent)
  },

  // 👤 Dashboards
  {
    path: 'dashboard-estudiante',
    loadComponent: () => import('./components/dashboard-estudiante/dashboard-estudiante.component').then(m => m.DashboardEstudianteComponent)
  },
  {
    path: 'dashboard-asesor',
    loadComponent: () => import('./components/dashboard-asesor/dashboard-asesor.component').then(m => m.DashboardAsesorComponent)
  },

  // 💬 Foro
  {
    path: 'foro',
    loadComponent: () => import('./components/foro/foro.component').then(m => m.ForoComponent)
  },
  { 
    path: 'foro/:id', 
    component: ForoDetalleComponent 
  },

  // 📚 Estudiante
  { path: 'perfil-estudiante', component: PerfilEstudianteComponent },
  { path: 'editar-perfil-estudiante', component: EditarPerfilEstudianteComponent },
  { path: 'solicitud', component: SolicitudesEstudianteComponent },
  {
    path: 'historial',
    loadComponent: () => import('./components/historial-estudiante/historial-estudiante.component').then(m => m.HistorialEstudianteComponent)
  },
  {
  path: 'perfil-asesor/editar',
  loadComponent: () => import('./components/editar-perfil-asesor/editar-perfil-asesor.component').then(m => m.EditarPerfilAsesorComponent)
  },
 

  
  {
    path: 'ver-puntuacion',
    loadComponent: () => import('./components/asesor-con-puntuacion/asesor-con-puntuacion.component').then(m => m.AsesorConPuntuacionComponent)
  },

  // 🧑‍🏫 Asesor
  { path: 'comentarios-asesor', component: ComentariosAsesorComponent },
  {
    path: 'reserva-asesor',
    loadComponent: () => import('./components/reserva-asesor/reserva-asesor.component').then(m => m.ReservaAsesorComponent)
  },
  {
    path: 'horarios-asesor',
    loadComponent: () => import('./components/horario-asesor/horario-asesor.component').then(m => m.HorariosAsesorComponent)
  },

  // 🔍 Búsqueda y perfiles
  { path: 'buscar-asesores', component: BuscarAsesoresComponent },
  { path: 'ver-perfil-asesor/:id', component: PerfilAsesorComponent },

  // 📞 Contactar y horarios
  {
    path: 'contactar',
    loadComponent: () => import('./components/contactar/contactar.component').then(m => m.ContactarComponent)
  },
  {
    path: 'horarios-estudiante/:id',
    loadComponent: () => import('./components/horarios-estudiante/horarios-estudiante.component').then(m => m.HorariosEstudianteComponent)
  },

  // 📝 Registro
  {
    path: 'registro-asesor',
    loadComponent: () => import('./components/registro-asesor/registro-asesor.component').then(m => m.RegistroAsesorComponent)
  },
  {
    path: 'registro-estudiante',
    loadComponent: () => import('./components/registro-estudiante/registro-estudiante.component').then(m => m.RegistroEstudianteComponent)
  },

  // 🧭 Ruta por defecto
  { path: '**', redirectTo: 'inicio' }
];
