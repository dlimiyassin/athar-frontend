import { AcademicProfileDto } from "./academic-profile.dto";
import { UserDto } from '../../zBase/security/model/userDto.model';

export interface StudentDto {
  id: string;
  user: UserDto;
  academicProfile: AcademicProfileDto;
}
