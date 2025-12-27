import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SurveyResponseDto } from '../models/survey-response.dto';

@Injectable({
  providedIn: 'root'
})
export class SurveyResponseService {

  readonly API = environment.apiUrlService + 'survey-responses';

  constructor(private http: HttpClient) {}

  /**
   * Submit a survey response
   */
  submit(response: SurveyResponseDto): Observable<SurveyResponseDto> {
    return this.http.post<SurveyResponseDto>(`${this.API}`, response);
  }

  /**
   * Get a student's response to a given survey
   */
  findBySurveyAndStudent(
    surveyId: string,
    studentId: string
  ): Observable<SurveyResponseDto | null> {
    return this.http.get<SurveyResponseDto | null>(
      `${this.API}/survey/${surveyId}/student/${studentId}`
    );
  }

  /**
   * Get all responses for a survey
   */
  findBySurvey(surveyId: string): Observable<SurveyResponseDto[]> {
    return this.http.get<SurveyResponseDto[]>(
      `${this.API}/survey/${surveyId}`
    );
  }
}
