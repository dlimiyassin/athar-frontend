import { Injectable } from '@angular/core';
import { StudentDto } from '../models/student.dto';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
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
    private _studentDialog: boolean = false;
    private _student!: StudentDto;
    private _submitted!: boolean;
    private _selectedStudent!: StudentDto;
    //private _searchStudent: StudentCriteria = new StudentCriteria();
    private _errorMessages: Array<string> = new Array<string>();
    private _loginDto: LoginDto = new LoginDto();

    private reloadTopbarSource = new Subject<void>();
    reloadTopbar$ = this.reloadTopbarSource.asObservable();

    triggerReloadTopbar() {
        this.reloadTopbarSource.next();
    }

    constructor(private http: HttpClient) {
        this._students = [];
        this._selectedStudents = [];
        this._studentDialog = false;
        this._submitted = false;
        this._errorMessages = [];
    }


    public findAll() {
        return this.http.get<Array<StudentDto>>(this.API);
    }

    public save(student: StudentDto): Observable<StudentDto> {
        return this.http.post<StudentDto>(this.API, student);
    }

    public findById(id: string) {
        return this.http.get<StudentDto>(this.API + "id/" + id);
    }

    public findByEmail(email: string) {
        return this.http.get<StudentDto>(this.API + "email/" + email);
    }

    public delete(id: number) {
        return this.http.delete<number>(this.API + "id/" + id);
    }

    public edit(student: StudentDto) {
        return this.http.put<StudentDto>(this.API, student);
    }

    // findByCriteria(studentCriteria: StudentCriteria): Observable<Array<StudentDto>> {
    //     return this.http.post<Array<StudentDto>>(this.API + "find-by-criteria", studentCriteria);
    // }

    // findStudentsByRoleName(roleName: string): Observable<Array<StudentDto>> {
    //     return this.http.get<Array<StudentDto>>(this.API + "find-by-role/roleName/" + roleName);
    // }

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
