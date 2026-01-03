import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PredictionType } from '../models/prediction.type.model';

@Injectable({
  providedIn: 'root'
})
export class ExportImportService {
  readonly EXPORT_API = environment.apiUrlService + 'survey/export';
  readonly IMPORT_API = environment.apiUrlService + 'survey/import';

  constructor(private http: HttpClient) {}

  downloadStudentsSurveysCsv(): Observable<Blob> {
    // Tell Angular we expect a binary file (CSV) from the API
    const headers = new HttpHeaders().set('Accept', 'text/csv');
    return this.http.get(`${this.EXPORT_API}/students-surveys`, {
      headers,
      responseType: 'blob'
    });
  }


  importPredictionsCsv(
    file: File,
    predictionTypeId: string
  ): Observable<void> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('predictionTypeId', predictionTypeId);

    return this.http.post<void>(
      `${this.IMPORT_API}/predictions`,
      formData
    );
  }
}
