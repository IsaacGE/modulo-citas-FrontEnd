import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';


//AdminPro Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { CitasComponent } from './citas/citas.component';



const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [AuthGuard] },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Usuario' }, canActivate: [AuthGuard] },
      { path: 'user-management', component: UserManagementComponent, data: { titulo: 'Gestión de Usuarios' }, canActivate: [AuthGuard] },
      { path: 'citas', component: CitasComponent, data: { titulo: 'Gestión de Citas' }, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
