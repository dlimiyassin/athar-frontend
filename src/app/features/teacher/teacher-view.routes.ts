import { Routes } from "@angular/router";
import { DashboardTeacher } from "./dashboard-teacher/dashboard-teacher";
import { StudentListTeacher } from "./student/student-list-teacher/student-list-teacher";
import { StudentAnswersTeacher } from "./student/student-answers-teacher/student-answers-teacher";
import { SurveyListTeacher } from "./survey/survey-list-teacher/survey-list-teacher";
import { SurveyCreateTeacher } from "./survey/survey-create-teacher/survey-create-teacher";
import { AcademicFieldsConfig } from "./academic-fields-config/academic-fields-config";
import { ViewSurvey } from "./survey/view-survey/view-survey";

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
    path: 'students-answers',
    component: StudentAnswersTeacher
  },
  {
    path: 'surveys',
    component: SurveyListTeacher
  },
  {
    path: 'surveys/create',
    component: SurveyCreateTeacher
  },
  {
    path: 'surveys/:id',
    component: ViewSurvey
  },
  {
    path: 'form-config',
    component: AcademicFieldsConfig
  }
];
