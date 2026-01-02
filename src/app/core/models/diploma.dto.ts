import { University } from '../enums/university.enum';
import { StudyLevel } from '../enums/study-level.enum';
import { FieldOfStudy } from '../enums/field-of-study.enum';

export class DiplomaDto {
  university!: University | null;;
  school!: string | null;
  studyLevel!: StudyLevel  | null;;
  studyField!: FieldOfStudy | null;;
  title!: string;
  year!: number  | null;;
  grade!: number | null;
}
