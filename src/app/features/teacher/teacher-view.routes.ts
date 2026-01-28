import { StudentViewTeacher } from './student/student-view-teacher/student-view-teacher';

import { Routes } from "@angular/router";
import { DashboardTeacher } from "./dashboard-teacher/dashboard-teacher";
import { StudentListTeacher } from "./student/student-list-teacher/student-list-teacher";
import { StudentAnswersTeacher } from "./survey/student-answers-teacher/student-answers-teacher";
import { SurveyListTeacher } from "./survey/survey-list-teacher/survey-list-teacher";
import { SurveyCreateTeacher } from "./survey/survey-create-teacher/survey-create-teacher";
import { ViewSurvey } from "./survey/view-survey/view-survey";
import { ExportImport } from "./export-import/export-import";

export const TEACHER_VIEW_ROUTES: Routes = [

  {
    path: '',
    component: DashboardTeacher
  },
  {
    path: 'students-list',
    component: StudentListTeacher
  },
  {
    path:"student-view/:id",
    component: StudentViewTeacher
  },
  {
    path: 'surveys',
    children: [
      {
        path: '',
        component: SurveyListTeacher
      },
      {
        path: 'students-answers',
        component: StudentAnswersTeacher
      },
      {
        path: 'create',
        component: SurveyCreateTeacher
      },
      {
        path: ':id',
        component: ViewSurvey
      },
    ]
  },

  {
    path: 'export-import',
    component: ExportImport
  }
];
