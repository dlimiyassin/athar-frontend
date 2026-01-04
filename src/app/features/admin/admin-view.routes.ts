import { Routes } from '@angular/router';
import { AdminHomePage } from './admin-home-page/admin-home-page';
import { AcademicFields } from './config/academic-fields/academic-fields';
import { PredictionTypes } from './config/prediction-types/prediction-types';
import { FutureFields } from './config/future-fields/future-fields';
import { TeacherList } from './teacher/teacher-list/teacher-list';
import { StudentListAdmin } from './student/student-list-admin/student-list-admin';
import { SurveyListAdmin } from './survey/survey-list-admin/survey-list-admin';
import { AnswersAdmin } from './survey/answers-admin/answers-admin';

export const ADMIN_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: AdminHomePage,
  },
  {
    path: 'teacher-list',
    component: TeacherList
  },
  {
    path: 'students-list',
    component: StudentListAdmin
  },
  {
    path: 'surveys',
    children: [
      {
        path: '',
        component: SurveyListAdmin
      },
      {
        path: 'students-answers',
        component: AnswersAdmin
      }
    ]
  },
  {
    path: 'config',
    children: [
      {
        path: 'academic-fields',
        component: AcademicFields
      },
      {
        path: 'prediction-types',
        component: PredictionTypes
      },
      {
        path: 'future-fields',
        component: FutureFields
      }
    ]
  },
];