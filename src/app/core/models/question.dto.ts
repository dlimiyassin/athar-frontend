import { QuestionType } from '../enums/question-type.enum';

export class QuestionDto {
  id!: string;
  type!: QuestionType;;
  label!: string;
  options!: string[];
}
