import { Gender } from "../enums/gender";
import { DiplomaDto } from "./diploma.dto";



export class AcademicProfileDto {
  gender!: Gender | null;
  currentDiploma!: DiplomaDto;
  customAttributes!: Record<string, any>;
  diplomas!: DiplomaDto[];
}

