import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SurveyDto } from '../models/survey.dto';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  readonly API = environment.apiUrlService + "surveys";
  private _surveys: SurveyDto[] = [];
  private _selectedSurvey!: SurveyDto;
  private _errorMessages: Array<string> = new Array<string>();

  constructor(private http: HttpClient) {
    this._surveys = [];
    this._errorMessages = [];
  }

  // Basic CRUD operations
  public findAll(): Observable<SurveyDto[]> {
    return this.http.get<SurveyDto[]>(this.API);
  }

  public findById(id: string): Observable<SurveyDto> {
    return this.http.get<SurveyDto>(`${this.API}/${id}`);
  }

  public findByTeacher(teacherId: string): Observable<SurveyDto[]> {
    return this.http.get<SurveyDto[]>(`${this.API}/teacher/${teacherId}`);
  }

  public create(survey: SurveyDto): Observable<SurveyDto> {
    return this.http.post<SurveyDto>(this.API, survey);
  }

  public update(survey: SurveyDto): Observable<SurveyDto> {
    return this.http.put<SurveyDto>(this.API, survey);
  }

  // For convenience, you might want delete too
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // Getters and Setters
  get surveys(): SurveyDto[] {
    return this._surveys;
  }

  set surveys(surveys: SurveyDto[]) {
    this._surveys = surveys;
  }

  get selectedSurvey(): SurveyDto {
    return this._selectedSurvey;
  }

  set selectedSurvey(value: SurveyDto) {
    this._selectedSurvey = value;
  }

  get errorMessages(): Array<string> {
    return this._errorMessages;
  }

  set errorMessages(value: Array<string>) {
    this._errorMessages = value;
  }

  // Helper method to clear data
  public clearData(): void {
    this._surveys = [];
    this._selectedSurvey = {} as SurveyDto;
    this._errorMessages = [];
  }
}