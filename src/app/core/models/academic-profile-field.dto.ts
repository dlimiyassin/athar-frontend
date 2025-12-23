import { FieldType } from '../enums/field-type.enum';

export class AcademicProfileFieldDto {
  id!: string;
  name!: string;
  label!: string;
  type!: FieldType | null;
  required!: boolean;
}
