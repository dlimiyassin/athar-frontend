import { StudentService } from './../../../core/services/student.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenService} from "./token.service";
import {MessageService} from "primeng/api";
import {environment} from "../../../../environments/environment";
import {UserDto} from "../model/userDto.model";
import {RoleDto} from "../model/roleDto.model";
import { RegisterDto } from '../model/registerDto.model';
import { LoginDto } from '../model/loginDto.model';
import { JWTAuthResponse } from '../model/JWTAuthResponse.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // readonly API = 'https://uir-shop.vercel.app/api/v1/';

    readonly API = environment.apiUrlService + 'auth/';
    public _user = new UserDto();
    private _authenticatedUser = new UserDto();
    private _authenticated = <boolean>JSON.parse(<string>localStorage.getItem('autenticated')) || false;
    public _loggedIn = new BehaviorSubject<boolean>(false);
    public loggedIn$ = this._loggedIn.asObservable();
    public error: null = null;

    private rolesSubject = new BehaviorSubject<string[]>([]);
    roles$ = this.rolesSubject.asObservable();

    private _isAdmin = false;
    private _isStudent = false;
    private _isTeacher = false;


    constructor(private http: HttpClient, private tokenService: TokenService,
                private router: Router,
                private messageService: MessageService,
                private studentService: StudentService
    ) {
    }

    public forgetPassword(email: string): Observable<void> {
        return this.http.post<void>(`${this.API}forgetPassword`, { email });
    }

    public resetPassword(token: string, password: string, confirmationPassword: string): Observable<void>{
        return this.http.post<void>(`${this.API}resetPassword`,{token , "password":password , "confirmationPassword":confirmationPassword});
    }

    isLoading: boolean = false;
    public login(loginDto: LoginDto): Observable<JWTAuthResponse> {
      return this.http.post<JWTAuthResponse>(
        `${this.API}login`,
        loginDto
      );
    }

    handleAfterLogin(resp: JWTAuthResponse) {         
            const token = resp.accessToken;
            const refreshToken = resp.refreshToken;
            
            const decoded = this.tokenService.decodeToken(token);
            const roles = decoded.roles;
            this.rolesSubject.next(roles);
            
            this.tokenService.saveToken(token, refreshToken);
            this.loadInfos();
            this.studentService.setProfileSetup(false);
            this.studentService.setCurrentStep(2);

            if (this.isStudent) {
              //this.router.navigate(['/app/student/view']);
                  this.studentService.checkStudentProfileSetup().subscribe({
                    next: (isCompleted : boolean) => {
                      if (isCompleted) {
                        this.studentService.setProfileSetup(false);
                        this.router.navigate(['/app/student/view']);
                      } else {
                        this.studentService.setProfileSetup(true);
                        this.router.navigate(['/app/student/view/setup-profile']);
                      }
                    },
                    error: (err) => {
                      console.error('Error checking profile setup', err);
                    }
            });
            } else if (this.isAdmin) {
              this.router.navigate(['/app/admin/view']);
            } else if (this.isTeacher) {
              this.router.navigate(['/app/teacher/view']);
            }
    }

    public register(registerDto: RegisterDto): Observable<string> {
      return this.http.post<string>(
        `${this.API}register`,
        registerDto
      );
    }

    public loadInfos() {
        const tokenDecoded = this.tokenService.decode();
        console.log(tokenDecoded)
        const firstName = tokenDecoded.firstName;
        const lastName = tokenDecoded.lastName;
        const roles = tokenDecoded.roles;
        const email = tokenDecoded.sub;
        const phoneNumber = tokenDecoded.phoneNumber;
        // this._authenticatedUser.firstName = firstName;
        // this._authenticatedUser.lastName = lastName;
        // this._authenticatedUser.username = username;
        this._authenticatedUser.email = email;
        this._authenticatedUser.roleDtos = roles;

        // this._authenticatedUser.phoneNumber = phoneNumber;
        localStorage.setItem('autenticated', JSON.stringify(true));
        this.authenticated = true;
        this._loggedIn.next(true);


    }


    // public hasRole(role: Role): boolean {
    //     const index = this._authenticatedUser.roles.findIndex(r => r.authority === role.authority);
    //     return index > -1 ? true : false;
    // }


    public logout() {
        this.tokenService.removeTokens();
        localStorage.setItem('autenticated', JSON.stringify(false));
        this.authenticated = false;
        this._loggedIn.next(false);
        this._authenticatedUser = new UserDto();
        this._isAdmin = false
        this._isStudent = false
        this._isTeacher = false

        this.router.navigate(['/auth/login']);
        localStorage.clear();
        console.log('You are logged out successfully');
        this.studentService.clearProfileSetup();
        console.log("==========================================");
        console.log(this.studentService._isSetupProfile.getValue());
        
    }

    get user(): UserDto {
        return this._user;
    }

    set user(value: UserDto) {
        this._user = value;
    }

    get authenticated(): boolean {
        return this._authenticated;
    }

    set authenticated(value: boolean) {
        this._authenticated = value;
    }

    get authenticatedUser(): UserDto {
        return this._authenticatedUser;
    }

    set authenticatedUser(value: UserDto) {
        this._authenticatedUser = value;
    }


    get isAdmin(): boolean {
        const tokenDecoded = this.tokenService.decode();
        if (tokenDecoded != null) {
            const roles = tokenDecoded.roles;
            roles.forEach((role: string) => {
                if (role === 'ROLE_SUPER_ADMIN' || role === 'ROLE_ADMIN') {
                    this._isAdmin = true;
                    this._isStudent = false;
                    this._isTeacher = false;
                }
            });
        }
        return this._isAdmin;
    }

    get isStudent(): boolean {
        const tokenDecoded = this.tokenService.decode();
        if (tokenDecoded != null) {
            const roles = tokenDecoded.roles;
            roles.forEach((role: string) => {
                if (role === 'ROLE_STUDENT') {
                    this._isStudent = true;
                    this._isAdmin = false;
                    this._isTeacher = false;
                }
            });
        }
        return this._isStudent;
    }

    get isTeacher(): boolean {
        const tokenDecoded = this.tokenService.decode();
        if (tokenDecoded != null) {
            const roles = tokenDecoded.roles;
            roles.forEach((role: string) => {
                if (role === 'ROLE_TEACHER') {
                    this._isTeacher = true;
                    this._isAdmin = false;
                    this._isStudent = false;
                }
            });
        }
        return this._isTeacher;
    }

    getRoleName(roleDtos: Array<RoleDto> | undefined) {
        if (!roleDtos || roleDtos.length === 0) {
            return 'Role_Name';
        }

        switch (roleDtos[0].name) {
            case 'ROLE_ADMIN':
                return "Administrator";
            case 'ROLE_STUDENT':
                return "Student";
            case 'ROLE_TEACHER':
                return 'Teacher';
            default:
                return 'Role_Name';
        }
    }
}
