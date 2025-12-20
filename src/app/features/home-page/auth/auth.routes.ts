import { Routes } from '@angular/router';
import { LoginPage } from './login';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: LoginPage,
  },
];
