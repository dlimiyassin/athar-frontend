import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PredictionResult } from '../models/prediction.result.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionResultService {

  readonly API = environment.apiUrlService + 'predictions';

  constructor(private http: HttpClient) {}

  // CREATE / UPDATE (CSV import or manual)
  savePrediction(prediction: PredictionResult): Observable<PredictionResult> {
    return this.http.post<PredictionResult>(this.API, prediction);
  }

  // AUTHENTICATED STUDENT — /api/predictions
  getByAuthenticatedStudent(): Observable<PredictionResult[]> {
    return this.http.get<PredictionResult[]>(this.API);
  }

  // BY STUDENT — /api/predictions/student/{studentId}
  getByStudent(studentId: string): Observable<PredictionResult[]> {
    return this.http.get<PredictionResult[]>(`${this.API}/student/${studentId}`);
  }

  // BY STUDENT + TYPE — /api/predictions/student/{studentId}/type/{typeId}
  getByStudentAndType(studentId: string, typeId: string): Observable<PredictionResult> {
    return this.http.get<PredictionResult>(`${this.API}/student/${studentId}/type/${typeId}`);
  }

  // BY TYPE — /api/predictions/type/{typeId}
  getByType(typeId: string): Observable<PredictionResult[]> {
    return this.http.get<PredictionResult[]>(`${this.API}/type/${typeId}`);
  }

  // COUNT BY TYPE — /api/predictions/type/{typeId}/count
  countByType(typeId: string): Observable<number> {
    return this.http.get<number>(`${this.API}/type/${typeId}/count`);
  }

  // ADMIN — /api/predictions/all
  getAll(): Observable<PredictionResult[]> {
    return this.http.get<PredictionResult[]>(`${this.API}/all`);
  }
}
