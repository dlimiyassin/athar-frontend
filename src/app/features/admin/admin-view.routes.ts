import { Routes } from '@angular/router';
import { AcademicFields } from './config/academic-fields/academic-fields';
import { PredictionTypes } from './config/prediction-types/prediction-types';
import { FutureFields } from './config/future-fields/future-fields';
import { TeacherList } from './teacher/teacher-list/teacher-list';
import { StudentListAdmin } from './student/student-list-admin/student-list-admin';
import { SurveyListAdmin } from './survey/survey-list-admin/survey-list-admin';
import { AnswersAdmin } from './survey/answers-admin/answers-admin';
import { SurveyCreateAdmin } from './survey/survey-create-admin/survey-create-admin';
import { ViewSurveyAdmin } from './survey/view-survey-admin/view-survey-admin';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { ExportImportAdmin } from './export-import-admin/export-import-admin';
import { ViewTeacher } from './teacher/view-teacher/view-teacher';
import { ViewStudentAdmin } from './student/view-student-admin/view-student-admin';

export const ADMIN_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: DashboardAdmin,
  },
  {
    path: 'teacher-list',
    component: TeacherList
  },
  {
    path: 'teacher-view/:id',
    component: ViewTeacher
  },
  {
    path: 'students-list',
    component: StudentListAdmin
  },
  {
    path: 'student-view/:id',
    component: ViewStudentAdmin
  },
  {
    path: 'surveys',
    children: [
      {
        path: '',
        component: SurveyListAdmin
      },
      {
        path: 'create',
        component: SurveyCreateAdmin
      },
      {
        path: 'students-answers',
        component: AnswersAdmin
      },
      {
        path: ':id',
        component: ViewSurveyAdmin
      },
    ]
  },
    {
    path: 'export-import',
    component: ExportImportAdmin
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