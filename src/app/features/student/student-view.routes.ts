import { Routes } from "@angular/router";
import { StudentHomePage } from "./student-home-page/student-home-page";

export const STUDENT_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: StudentHomePage,
  },
];
