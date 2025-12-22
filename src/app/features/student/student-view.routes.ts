import { Routes } from "@angular/router";
import { StudentHomePage } from "./student-home-page/student-home-page";
import { CompleteProfile } from "./complete-profile/complete-profile";

export const STUDENT_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: StudentHomePage,
  },
  {
    path : 'setup-profile',
    component: CompleteProfile
  }
];
