import { Universite } from '../enums/universite.enum';
import { StudyLevel } from '../enums/study-level.enum';

export class DiplomeDto {
  universite!: Universite | null;;
  ecole!: string;
  studyLevel!: StudyLevel  | null;;
  filiere!: string;
  intitule!: string;
  year!: number  | null;;
  note!: number | null;
}
