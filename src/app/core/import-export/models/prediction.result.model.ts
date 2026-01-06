// src/app/models/prediction-result.model.ts

import { PredictionType } from "./prediction.type.model";

export class PredictionResult {
  id!: string;
  studentId!: string;
  predictionTypeDto!: PredictionType;
  rawValue!: string;
  interpretedValue!: string;
  generatedAt!: string;
  modelVersion!: string;
}
