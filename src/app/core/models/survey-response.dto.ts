import { AnswerDto } from "./answer.dto";


export class SurveyResponseDto {
  id!: string | null;
  surveyId!: string | null;
  studentId!: string | null;
  answers!: AnswerDto[];
  submittedAt!: string | null; // ISO Instant
}
