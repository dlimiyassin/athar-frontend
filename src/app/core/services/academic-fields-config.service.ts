import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AcademicProfileFieldDto } from '../models/academic-profile-field.dto';

@Injectable({
  providedIn: 'root',
})
export class AcademicFieldsConfigService {

  // ===================== API =====================
  readonly API = environment.apiUrlService + 'academic-profile-fields';

  // ===================== STATE =====================
  private _fields: AcademicProfileFieldDto[] = [];
  private _selectedField!: AcademicProfileFieldDto;
  private _fieldDialog = false;
  private _submitted = false;
  private _errorMessages: string[] = [];

  constructor(private http: HttpClient) {}

  // ===================== HTTP METHODS =====================

  public findAll(): Observable<AcademicProfileFieldDto[]> {
    return this.http.get<AcademicProfileFieldDto[]>(this.API);
  }

  public save(field: AcademicProfileFieldDto): Observable<AcademicProfileFieldDto> {
    return this.http.post<AcademicProfileFieldDto>(this.API, field);
  }

  public delete(field: AcademicProfileFieldDto): Observable<AcademicProfileFieldDto> {
    return this.http.delete<AcademicProfileFieldDto>(`${this.API}/${field.name}`);
  }

  public update(field: AcademicProfileFieldDto): Observable<AcademicProfileFieldDto> {
    return this.http.put<AcademicProfileFieldDto>(`${this.API}`, field);
  }

  // ===================== GETTERS & SETTERS =====================

  get fields(): AcademicProfileFieldDto[] {
    return this._fields;
  }

  set fields(value: AcademicProfileFieldDto[]) {
    this._fields = value;
  }

  get selectedField(): AcademicProfileFieldDto {
    return this._selectedField;
  }

  set selectedField(value: AcademicProfileFieldDto) {
    this._selectedField = value;
  }

  get fieldDialog(): boolean {
    return this._fieldDialog;
  }

  set fieldDialog(value: boolean) {
    this._fieldDialog = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get errorMessages(): string[] {
    return this._errorMessages;
  }

  set errorMessages(value: string[]) {
    this._errorMessages = value;
  }
}
