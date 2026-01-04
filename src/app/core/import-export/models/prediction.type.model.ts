import { PredictionValueType } from "./prediction-value-type";

export interface PredictionType {
  id?: string;
  code: string;
  label: string;
  valueType: PredictionValueType;
  description: string;
  active: boolean;
}
