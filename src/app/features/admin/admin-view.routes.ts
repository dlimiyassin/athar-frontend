import { Routes } from '@angular/router';
import { AdminHomePage } from './admin-home-page/admin-home-page';

export const ADMIN_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: AdminHomePage,
  },
];