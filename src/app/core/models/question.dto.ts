import { QuestionType } from '../enums/question-type.enum';

export interface QuestionDto {
  id: string;
  type: QuestionType;
  label: string;
  options: string[];
}
