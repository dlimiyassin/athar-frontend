import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportImportService {

  readonly EXPORT_API = environment.apiUrlService + 'admin/export';

  constructor(private http: HttpClient) {}

  downloadStudentsSurveysCsv(): Observable<Blob> {
    // Tell Angular we expect a binary file (CSV) from the API
    const headers = new HttpHeaders().set('Accept', 'text/csv');
    return this.http.get(`${this.EXPORT_API}/students-surveys`, {
      headers,
      responseType: 'blob'
    });
  }
}
