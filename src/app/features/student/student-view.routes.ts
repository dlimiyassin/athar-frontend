import { Routes } from "@angular/router";
import { StudentHomePage } from "./student-home-page/student-home-page";
import { CompleteProfile } from "./complete-profile/complete-profile";
import { SurveyListStudent } from "./survey/survey-list-student/survey-list-student";
import { SurveyAnswers } from "./survey/survey-answers/survey-answers";
import { RecommandationStudent } from "./survey/recommandation-student/recommandation-student";
import { SurveyingStudent } from "./survey/surveying-student/surveying-student";

export const STUDENT_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: StudentHomePage,
  },
  {
    path : 'setup-profile',
    component: CompleteProfile
  },
  {
    path: 'surveys',
    component: SurveyListStudent
  },
  {
    path: 'surveys/:id',
    component: SurveyingStudent
  },
  {
    path: 'answers',
    component: SurveyAnswers
  }
  ,
  {
    path: 'recommandation',
    component: RecommandationStudent
  }
];
