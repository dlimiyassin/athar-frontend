import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionContent, AccordionHeader, AccordionModule, AccordionPanel } from 'primeng/accordion';

import { SurveyService } from '../../../../core/services/survey.service';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { QuestionDto } from '../../../../core/models/question.dto';
import { QuestionType } from '../../../../core/enums/question-type.enum';
import { TargetType } from '../../../../core/enums/target-type.enum';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { StyleClass } from "primeng/styleclass";
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-view-survey',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    SelectButtonModule,
    SelectModule,
    Toast
],
  templateUrl: './view-survey.html'
})
export class ViewSurvey implements OnInit {

  survey!: SurveyDto;
  showNewQuestionForm = false;
  newQuestion: QuestionDto = this.createEmptyQuestion();
  readonly questionTypes = Object.values(QuestionType);
  readonly targetTypes = Object.values(TargetType);

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private messageService: MessageService
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
      next: (survey: SurveyDto) => {
        this.survey = survey;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load survey', err);
        this.loading = false;
      }
    });
  }

  saveSurvey(): void {
  
    this.survey.questions?.forEach(q => {
    q.label = q.label?.trim() ?? '';
      if (q.options) {
        q.options = q.options.map(opt => opt?.trim() ?? '');
      }
    });

    this.surveyService.update(this.survey).subscribe({
      next: updated => {
        this.survey = updated;
        this.messageService.add({
          severity: 'success',
          summary: 'Survey updated',
          detail: 'The survey has been successfully updated.'
        });
      },
      error: err => {
        console.error('Failed to save survey', err);
      }
    });
  }

  private generateUUID(): string {
    return crypto.randomUUID();
  }

  private createEmptyQuestion(): QuestionDto {
    return {
      id: this.generateUUID(),
      label: '',
      type: null,
      options: []
    };
  }

  toggleQuestionForm(): void {
    if (this.showNewQuestionForm) {
      this.saveNewQuestion();
    } else {
      this.newQuestion = this.createEmptyQuestion();
      this.showNewQuestionForm = true;
    }
  }

  private saveNewQuestion(): void {
    if (!this.newQuestion.label || !this.newQuestion.type) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Invalid question',
          detail: 'Label and type are required'
        });
        return;
      }

    this.survey.questions = [...this.survey.questions, this.newQuestion];

    this.surveyService.update(this.survey).subscribe({
      next: updatedSurvey => {
        this.survey = updatedSurvey;
        this.showNewQuestionForm = false;
        this.newQuestion = this.createEmptyQuestion();

        this.messageService.add({
          severity: 'success',
          summary: 'Question added',
          detail: 'The question has been saved successfully'
        });
      },
      error: err => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add question'
        });
      }
    });
  }








  isOptionsBased(type: QuestionType | null): boolean {
    return type === QuestionType.CHOICE || type === QuestionType.SCALE;
  }

  addOption(question: QuestionDto): void {
    if (!question.options) {
      question.options = [];
    }
    question.options = [...question.options, ' '];
  }

  
  trackByIndex(index: number, item: any): number {
  return index;
  }


  removeOption(question: QuestionDto, index: number): void {
    question.options.splice(index, 1);
  }
}
