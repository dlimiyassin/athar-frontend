import { University } from '../enums/university.enum';
import { StudyLevel } from '../enums/study-level.enum';

export class DiplomaDto {
  university!: University | null;;
  school!: string;
  studyLevel!: StudyLevel  | null;;
  studyField!: string;
  title!: string;
  year!: number  | null;;
  grade!: number | null;
}
