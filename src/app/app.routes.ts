
import {  Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './auth/auth-guard';
import { adminGuard } from './auth/admin-guard';
import { ADMIN_ROUTES } from './admin/admin.routes';
import { userRoutes } from './user/user.routes';
import { noAuthGuard } from './auth/no-auth-guard';
export const routes: Routes = [
  { path: '', component: Login, canActivate: [noAuthGuard] },
  { path: 'register', component: Register, canActivate: [noAuthGuard] },
  { path: 'dashboard', 
    canActivate: [authGuard],   //  protect dashboard
    children: userRoutes
  },
  { path: 'admin', canActivate: [adminGuard], children: ADMIN_ROUTES  },
  { path: '**', redirectTo: '' }
];

