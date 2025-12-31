import { DiplomaDto } from "./diploma.dto";



export class AcademicProfileDto {
  gender!: 'MALE' | 'FEMALE' | null;
  currentDiploma!: DiplomaDto;
  customAttributes!: Record<string, any>;
  diplomas!: DiplomaDto[];
}

