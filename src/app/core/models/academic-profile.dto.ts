import { DiplomeDto } from "./diplome.dto";


export class AcademicProfileDto {
  currentDiploma!: DiplomeDto;
  customAttributes!: Record<string, any>;
  diplomes!: DiplomeDto[];
}

