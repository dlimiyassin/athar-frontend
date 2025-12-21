import { AnswerDto } from "./answer.dto";


export interface SurveyResponseDto {
  id: string;
  surveyId: string;
  studentId: string;
  answers: AnswerDto[];
  submittedAt: string; // ISO Instant
}
