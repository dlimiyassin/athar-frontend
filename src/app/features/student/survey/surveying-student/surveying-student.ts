import { TextareaModule } from 'primeng/textarea';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { QuestionType } from '../../../../core/enums/question-type.enum';
import { QuestionDto } from '../../../../core/models/question.dto';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { SurveyService } from '../../../../core/services/survey.service';
import { SurveyResponseService } from '../../../../core/services/survey.response.service';
import { SurveyResponseDto } from '../../../../core/models/survey-response.dto';

@Component({
  selector: 'app-surveying-student',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    RadioButtonModule,
    TextareaModule
  ],
  templateUrl: './surveying-student.html',
  styleUrl: './surveying-student.css'
})
export class SurveyingStudent implements OnInit {

  survey!: SurveyDto;
  loading = true;

  currentIndex = 0;
  submitted = false;

  /** answers indexed by questionId */
  answers: Record<string, any> = {};

  readonly QuestionType = QuestionType;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private surveyResponseService: SurveyResponseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('Survey id is required');
    }

    this.loadSurvey(id);
  }

  private loadSurvey(id: string): void {
    this.surveyService.findById(id).subscribe({
      next: survey => {
        this.survey = survey;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load survey', err);
        this.loading = false;
      }
    });
  }

  /* ----------------------- */
  /* NAVIGATION */
  /* ----------------------- */

  next(): void {
    if (this.currentIndex < this.survey.questions.length - 1) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

submit(): void {

  console.log('Preparing to submit survey');
  
  
  if (!this.survey) {
    return;
  }
  console.log('Submitting survey with answers:', this.answers);

  // 1️⃣ Build answers array from the map
  const answerList = Object.keys(this.answers).map(questionId => ({
    questionId,
    value: String(this.answers[questionId] ?? '')
  }));

  // 2️⃣ Build SurveyResponseDto
  const response: SurveyResponseDto = {
    id: null,
    surveyId: this.survey.id,
    studentId: null,   // <- replace with real studentId in backend
    answers: answerList,
    submittedAt: null
  };

  // 3️⃣ Submit to backend
  this.surveyResponseService.submit(response).subscribe({
    next: () => {
      this.submitted = true;
    },
    error: err => {
      console.error('Failed to submit survey response', err);
    }
  });
}


  /* ----------------------- */
  /* HELPERS */
  /* ----------------------- */

  get currentQuestion(): QuestionDto {
    return this.survey.questions[this.currentIndex];
  }

  get progress(): number {
    return Math.round(
      ((this.currentIndex + 1) / this.survey.questions.length) * 100
    );
  }

  isLastQuestion(): boolean {
    return this.currentIndex === this.survey.questions.length - 1;
  }
}
