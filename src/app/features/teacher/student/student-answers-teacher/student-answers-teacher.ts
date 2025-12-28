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

@Component({
  selector: 'app-student-answers-teacher',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AccordionModule,
    TagModule,
    DividerModule,
    SkeletonModule
  ],
  templateUrl: './student-answers-teacher.html',
  styleUrl: './student-answers-teacher.css',
})
export class StudentAnswersTeacher implements OnInit {

  surveys: SurveyDto[] = [];
  selectedSurvey: SurveyDto | null = null;

  responses: SurveyResponseDto[] = [];
  loadingSurveys = true;
  loadingResponses = false;

  constructor(
    private surveyService: SurveyService,
    private responseService: SurveyResponseService
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  private loadSurveys(): void {
    this.surveyService.findByTeacher().subscribe({
      next: surveys => {
        this.surveys = surveys;
        this.loadingSurveys = false;
      },
      error: () => this.loadingSurveys = false
    });
  }

  selectSurvey(survey: SurveyDto): void {
    this.selectedSurvey = survey;
    this.loadResponses(survey.id!);
  }

  private loadResponses(surveyId: string): void {
    this.loadingResponses = true;
    this.responseService.findBySurvey(surveyId).subscribe({
      next: responses => {
        this.responses = responses;
        this.loadingResponses = false;
      },
      error: () => this.loadingResponses = false
    });
  }

  answersForQuestion(question: QuestionDto) {
    return this.responses.flatMap(r =>
      r.answers.filter(a => a.questionId === question.id)
    );
  }

  formatDate(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}
