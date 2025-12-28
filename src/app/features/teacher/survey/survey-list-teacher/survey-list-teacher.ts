import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyService } from '../../../../core/services/survey.service'; // Import the service
import { MessageService } from 'primeng/api'; // For notifications
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-survey-list-teacher',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, ToastModule,],
  templateUrl: './survey-list-teacher.html',
})
export class SurveyListTeacher implements OnInit {

  surveys: SurveyDto[] = [];
  loading = true;

  constructor(
    public router: Router,
    private surveyService: SurveyService, // Inject service
    private messageService: MessageService // For notifications
  ) { }

  ngOnInit(): void {
    this.loadSurveysByTeacher();
  }

  loadSurveysByTeacher(): void {
    this.loading = true;

    this.surveyService.findByTeacher().subscribe({
      next: (data) => {
        this.surveys = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading teacher surveys:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load your surveys.'
        });
      }
    });
  }

  onView(survey: SurveyDto) {
    this.router.navigate(['app/teacher/view/surveys', survey.id]);
  }

}