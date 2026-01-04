
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';

import { SurveyService } from '../../../../core/services/survey.service';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { TargetType } from '../../../../core/enums/target-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-create-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    ToastModule
],
  templateUrl: './survey-create-admin.html',
  styleUrl: './survey-create-admin.css',
})
export class SurveyCreateAdmin {

  survey: SurveyDto = {
    id: null,
    title: '',
    description: '',
    target: null,
    createdAt: '',
    createdByTeacherId: '',
    questions: []
  };

  readonly targetTypes = Object.values(TargetType);

  isSaving = false;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private messageService: MessageService
  ) {}

  save(): void {
    if (!this.validate()) {
      return;
    }

    this.isSaving = true;

    this.surveyService.create(this.survey).subscribe({
      next: created => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Survey created',
          detail: 'You can now add questions'
        });

        // Navigate to question management interface
        this.router.navigate(['/app/admin/surveys', created.id]);
      },
      error: err => {
        console.error(err);
        this.isSaving = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create survey'
        });
      }
    });
  }

  private validate(): boolean {
    if (!this.survey.title?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Title is required'
      });
      return false;
    }

    if (!this.survey.target) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Target audience is required'
      });
      return false;
    }

    return true;
  }
}
