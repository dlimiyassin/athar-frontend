import { AnswerDto } from "./answer.dto";


export class SurveyResponseDto {
  id!: string;
  surveyId!: string;
  studentId!: string;
  answers!: AnswerDto[];
  submittedAt!: string; // ISO Instant
}
