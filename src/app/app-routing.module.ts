import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { SendEmailComponent } from './restore-password/send-email/send-email.component';
import { ChangePasswordComponent } from './restore-password/change-password/change-password.component';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'sendemail', component: SendEmailComponent, canActivate: [NoAuthGuard] },
  { path: 'reset-password/:token', component: ChangePasswordComponent, canActivate: [NoAuthGuard] },
  { path: '**', component: NopagefoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
