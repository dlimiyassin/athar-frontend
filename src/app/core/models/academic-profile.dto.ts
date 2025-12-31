import { DiplomaDto } from "./diploma.dto";



export class AcademicProfileDto {
  currentDiploma!: DiplomaDto;
  customAttributes!: Record<string, any>;
  diplomas!: DiplomaDto[];
}

