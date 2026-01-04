
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyService } from '../../../../core/services/survey.service'; // Import the service
import { ConfirmationService, MessageService } from 'primeng/api'; // For notifications
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-survey-list-admin',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, ToastModule, ConfirmDialogModule],
  templateUrl: './survey-list-admin.html',
  styleUrl: './survey-list-admin.css',
})
export class SurveyListAdmin implements OnInit {
  surveys: SurveyDto[] = [];
  loading = true;

  constructor(
    public router: Router,
    private surveyService: SurveyService, // Inject service
    private messageService: MessageService, // For notifications
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.loading = true;

    this.surveyService.findAll().subscribe({
      next: (data) => {
        this.surveys = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading admin surveys:', error);
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
    this.router.navigate(['app/admin/view/surveys', survey.id]);
  }

  onDelete(survey: SurveyDto) {
    this.surveyService.delete(survey.id!).subscribe({
      next: () => {
        this.loadSurveys();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Survey deleted successfully.'
        }); 
      },
      error: (error) => {
        console.error('Error deleting survey:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete survey.'
        });
      }
    });
  }

  confirmDelete(survey: any) {
  this.confirmationService.confirm({
    message: `Are you sure you want to delete "${survey.title}"?`,
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptButtonStyleClass: 'p-button-danger',
    accept: () => this.onDelete(survey)
  });
}

}