import { DiplomeDto } from "./diplome.dto";


export interface AcademicProfileDto {
  ecole: string;
  program: string;
  year: number;
  customAttributes: Record<string, any>;
  diplomes: DiplomeDto[];
}

