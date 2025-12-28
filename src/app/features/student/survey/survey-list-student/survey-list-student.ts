import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { SurveyService } from '../../../../core/services/survey.service';

@Component({
  selector: 'app-survey-list-student',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './survey-list-student.html',
  styleUrl: './survey-list-student.css',
})
export class SurveyListStudent implements OnInit {

  surveys: SurveyDto[] = [];
  loading = true;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findSurveyNotAnsweredByStudent();
  }

  private findSurveyNotAnsweredByStudent(): void {
    this.surveyService.findSurveyNotAnsweredByStudent().subscribe({
      next: (surveys: SurveyDto[]) => {
        this.surveys = surveys;
        const now = Date.now();
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  isNewSurvey(createdAt: string): boolean {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    return now - created < ONE_DAY;
  }


  openSurvey(survey: SurveyDto): void {
    this.router.navigate(['/app/student/view/surveys', survey.id]);
  }
}
