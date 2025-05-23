import { Routes } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
{ path: '', component: RolComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
