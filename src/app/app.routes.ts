import { Routes } from '@angular/router';
import { LoginPage } from './features/home-page/auth/login';
import { RegisterPage } from './features/home-page/auth/register';
import { HomePage } from './features/home-page/home-components/home-page';
import { LayoutHomePage } from './features/layout/layout-home-page';
import { AppLayout } from './features/layout/component/app.layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutHomePage,
    children: [
          {
            path: '',
            component: HomePage,
          },
          {
            path: 'auth/login',
            component: LoginPage,
          },
          {
            path: 'auth/register',
            component: RegisterPage,
          },
    ]
  },

  {
    path: 'app',
    component: AppLayout,
    children: [
      {
        path: 'admin/view',
        loadChildren: () =>
          import('./features/admin/admin-view.routes')
            .then(m => m.ADMIN_VIEW_ROUTES),
      },
      {
        path: 'student/view',
        loadChildren: () =>
          import('./features/student/student-view.routes')
            .then(m => m.STUDENT_VIEW_ROUTES),
      },
      {
        path: 'teacher/view',
        loadChildren: () =>
          import('./features/teacher/teacher-view.routes')
            .then(m => m.TEACHER_VIEW_ROUTES),
      }
    ],
  },
];
