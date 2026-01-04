import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyService } from '../../../../core/services/survey.service';
import { SurveyResponseService } from '../../../../core/services/survey.response.service';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { SurveyResponseDto } from '../../../../core/models/survey-response.dto';
import { QuestionDto } from '../../../../core/models/question.dto';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { timeout } from 'rxjs/internal/operators/timeout';

@Component({
  selector: 'app-answers-admin',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AccordionModule,
    TagModule,
    DividerModule,
    SkeletonModule,
    PaginatorModule
  ],
  templateUrl: './answers-admin.html',
  styleUrl: './answers-admin.css',
})
export class AnswersAdmin implements OnInit {

  surveys: SurveyDto[] = [];
  pagedSurveys: SurveyDto[] = [];
  selectedSurvey: SurveyDto | null = null;

  responses: SurveyResponseDto[] = [];
  loadingSurveys = true;
  loadingResponses = false;

  // Pagination state
  pageSize = 3;
  pageIndex = 0;

  constructor(
    private surveyService: SurveyService,
    private responseService: SurveyResponseService
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  private loadSurveys(): void {
    this.surveyService.findAll().subscribe({
      next: surveys => {
        setTimeout(() => {
          this.surveys = surveys;
          this.updatePagedSurveys();
          this.loadingSurveys = false;
        }, 300);
      },
      error: () => this.loadingSurveys = false
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.page;
    this.pageSize = event.rows;
    this.updatePagedSurveys();
  }

  private updatePagedSurveys(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSurveys = this.surveys.slice(start, end);
  }

  selectSurvey(survey: SurveyDto): void {
    this.selectedSurvey = survey;
    this.loadResponses(survey.id!);
  }

  private loadResponses(surveyId: string): void {
    this.loadingResponses = true;
    this.responseService.findBySurvey(surveyId).subscribe({
      next: responses => {
        setTimeout(() => {
          this.responses = responses;
          this.loadingResponses = false;

        }, 300);
      },
      error: () => this.loadingResponses = false
    });
  }

  /* =========================
     Aggregated answers
     ========================= */
  aggregatedAnswers(question: QuestionDto): { value: string; count: number }[] {
    const map = new Map<string, number>();

    this.responses.forEach(response => {
      response.answers
        .filter(a => a.questionId === question.id)
        .forEach(a => {
          map.set(a.value, (map.get(a.value) ?? 0) + 1);
        });
    });

    return Array.from(map.entries()).map(([value, count]) => ({
      value,
      count
    }));
  }

  formatDate(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}
