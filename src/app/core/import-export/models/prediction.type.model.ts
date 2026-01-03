
export interface PredictionType {
  id?: string;
  code: string;
  label: string;
  valueType: 'NUMBER' | 'BOOLEAN' | 'TEXT';
  description: string;
  active: boolean;
}
