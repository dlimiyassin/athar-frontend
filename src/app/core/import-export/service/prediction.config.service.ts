import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FutureFieldOfStudy } from '../models/future.field.of.study.model';
import { PredictionType } from '../models/prediction.type.model';


@Injectable({
  providedIn: 'root'
})
export class PredictionConfigService {

  private readonly FIELDS_API =
    environment.apiUrlService + 'fields-of-study';

  private readonly PREDICTIONS_API =
    environment.apiUrlService + 'prediction-types';

  constructor(private http: HttpClient) {}




  /* =========================
     FUTURE FIELDS OF STUDY
     ========================= */

  getActiveFields(): Observable<FutureFieldOfStudy[]> {
    return this.http.get<FutureFieldOfStudy[]>(
      `${this.FIELDS_API}/active`
    );
  }

  saveField(field: FutureFieldOfStudy): Observable<FutureFieldOfStudy> {
    return this.http.post<FutureFieldOfStudy>(
      `${this.FIELDS_API}`,
      field
    );
  }

  getFieldByCode(code: number): Observable<FutureFieldOfStudy> {
    return this.http.get<FutureFieldOfStudy>(
      `${this.FIELDS_API}/code/${code}`
    );
  }









  /* =========================
     PREDICTION TYPES
     ========================= */

  getActivePredictionTypes(): Observable<PredictionType[]> {
    return this.http.get<PredictionType[]>(
      `${this.PREDICTIONS_API}/active`
    );
  }

  savePredictionType(
    type: PredictionType
  ): Observable<PredictionType> {
    return this.http.post<PredictionType>(
      `${this.PREDICTIONS_API}`,
      type
    );
  }

  getPredictionTypeByCode(
    code: string
  ): Observable<PredictionType> {
    return this.http.get<PredictionType>(
      `${this.PREDICTIONS_API}/code/${code}`
    );
  }
}
