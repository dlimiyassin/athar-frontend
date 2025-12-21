import { FieldType } from '../enums/field-type.enum';

export interface AcademicProfileFieldDto {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
}
