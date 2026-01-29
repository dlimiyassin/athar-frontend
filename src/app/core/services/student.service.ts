import { Injectable } from '@angular/core';
import { StudentDto } from '../models/student.dto';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../zBase/security/model/loginDto.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

    // declarations
    readonly API = environment.apiUrlService + "students";
    private _students: StudentDto[] = [];
    private _selectedStudents: StudentDto[] = [];
    private _student!: StudentDto;
    private _selectedStudent!: StudentDto;
    private _errorMessages: Array<string> = new Array<string>();
    private _loginDto: LoginDto = new LoginDto();
    private reloadTopbarSource = new Subject<void>();
    reloadTopbar$ = this.reloadTopbarSource.asObservable();



    // isProfileIncompleted logic
    private readonly STORAGE_KEY_SETUP = 'isProfileIncompleted';
    public _isProfileIncompleted = new BehaviorSubject<boolean>(
      JSON.parse(localStorage.getItem(this.STORAGE_KEY_SETUP) ?? 'true')
    );
    public isProfileIncompleted$ = this._isProfileIncompleted.asObservable();

    setProfileIncompleted(value: boolean): void {
      this._isProfileIncompleted.next(value);
      localStorage.setItem(this.STORAGE_KEY_SETUP, JSON.stringify(value));
    }

    clearProfileIncompleted(): void {
      this._isProfileIncompleted.next(false);
      localStorage.removeItem(this.STORAGE_KEY_SETUP);
    }


    // steps logic
    private readonly STORAGE_KEY_STEP = 'currentStep';
    public _currentStep = new BehaviorSubject<number>(
      JSON.parse(localStorage.getItem(this.STORAGE_KEY_STEP) ?? '2')
    );
    public currentStep$ = this._currentStep.asObservable();

    setCurrentStep(value: number): void {
      this._currentStep.next(value);
      localStorage.setItem(this.STORAGE_KEY_STEP, JSON.stringify(value));
    }
    
    clearCurrentStep(): void {
      this._currentStep.next(2);
      localStorage.removeItem(this.STORAGE_KEY_STEP);
    }


    triggerReloadTopbar() {
        this.reloadTopbarSource.next();
    }

    constructor(private http: HttpClient) {
        this._students = [];
        this._selectedStudents = [];
        this._errorMessages = [];
    }


    public findAll() {
        return this.http.get<Array<StudentDto>>(this.API);
    }

    public save(student: StudentDto): Observable<StudentDto> {
        return this.http.post<StudentDto>(this.API, student);
    }

    public completeProfile(student: StudentDto): Observable<StudentDto> {
        return this.http.post<StudentDto>(this.API + "/complete-profile", student);
    }


    public findById(id: string) {
        return this.http.get<StudentDto>(this.API + "/id/" + id);
    }

    public findByUserId(userId: string) {
        return this.http.get<StudentDto>(this.API + "/user/" + userId);
    }


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/id/${id}`);
  }

    public edit(student: StudentDto) {
        return this.http.put<StudentDto>(this.API, student);
    }

    checkStudentProfileSetup(): Observable<boolean> {
        return this.http.get<boolean>(`${this.API}/check-student-setup`);
    }

    // getters and setters
    get students(): StudentDto[] {
        return this._students;
    }

    set students(students: StudentDto[]) {
        this._students = students;
    }

    get selectedStudents(): StudentDto[] {
        return this._selectedStudents;
    }

    set selectedStudents(selectedStudents: StudentDto[]) {
        this._selectedStudents = selectedStudents;
    }

    get selectedStudent(): StudentDto {
        return this._selectedStudent;
    }

    set selectedStudent(value: StudentDto) {
        this._selectedStudent = value;
    }

    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }


    // get searchStudent(): StudentCriteria {
    //     return this._searchStudent;
    // }

    // set searchStudent(value: StudentCriteria) {
    //     this._searchStudent = value;
    // }

    get student(): StudentDto {
        return this._student;
    }

    set student(value: StudentDto) {
        this._student = value;
    }


    get loginDto(): LoginDto {
        return this._loginDto;
    }

    set loginDto(value: LoginDto) {
        this._loginDto = value;
    }

}
