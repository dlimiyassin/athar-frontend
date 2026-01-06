import { PredictionValueType } from "./prediction-value-type";

export class PredictionType {
  id!: string | null;
  code!: string;
  label!: string;
  valueType!: PredictionValueType;
  description!: string;
  active!: boolean;
}
