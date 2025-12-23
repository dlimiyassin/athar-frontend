import { AcademicProfileDto } from "./academic-profile.dto";
import { UserDto } from '../../zBase/security/model/userDto.model';

export class StudentDto {
  id!: string | null;
  user!: UserDto | null;
  academicProfile!: AcademicProfileDto;
}
