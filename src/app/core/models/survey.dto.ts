import { TargetType } from "../enums/target-type.enum";
import { QuestionDto } from "./question.dto";

export class SurveyDto {
  id!: string | null;
  title!: string;
  description!: string;
  createdByTeacherId!: string;
  questions!: QuestionDto[];
  createdAt!: string; // ISO Instant
  target!: TargetType  | null;
}
