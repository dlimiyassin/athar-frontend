import { University } from '../enums/university.enum';
import { StudyLevel } from '../enums/study-level.enum';

export class DiplomaDto {
  university!: University | null;;
  ecole!: string;
  studyLevel!: StudyLevel  | null;;
  filiere!: string;
  intitule!: string;
  year!: number  | null;;
  note!: number | null;
}
