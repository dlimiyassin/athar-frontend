import { DiplomeDto } from "./diplome.dto";


export interface AcademicProfileDto {
  currentDiploma: DiplomeDto;
  customAttributes: Record<string, any>;
  diplomes: DiplomeDto[];
}

