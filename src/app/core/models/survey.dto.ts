import { TargetType } from "../enums/target-type.enum";
import { QuestionDto } from "./question.dto";

export interface SurveyDto {
  id: string;
  title: string;
  description: string;
  createdByTeacherId: string;
  questions: QuestionDto[];
  createdAt: string; // ISO Instant
  target: TargetType;
}
