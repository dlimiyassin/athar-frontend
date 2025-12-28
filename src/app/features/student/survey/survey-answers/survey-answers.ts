import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyResponseDto } from '../../../../core/models/survey-response.dto';

import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { SurveyResponseService } from '../../../../core/services/survey.response.service';

@Component({
  selector: 'app-survey-answers',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    AccordionModule,
    TagModule,
    SkeletonModule
  ],
  templateUrl: './survey-answers.html',
  styleUrl: './survey-answers.css',
})
export class SurveyAnswers implements OnInit {

  responses: SurveyResponseDto[] = [];
  loading = true;

  constructor(private surveyResponseService: SurveyResponseService) {}

  ngOnInit(): void {
    this.loadResponses();
  }

  private loadResponses(): void {
    this.surveyResponseService.findByStudent().subscribe({
      next: res => {
        this.responses = res;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load survey responses', err);
        this.loading = false;
      }
    });
  }

  formatDate(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
