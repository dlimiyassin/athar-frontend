import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenService} from "./token.service";
import {MessageService} from "primeng/api";
import {environment} from "../../../../environments/environment";
import {UserDto} from "../model/userDto.model";
import {RoleDto} from "../model/roleDto.model";


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
    ) {
    }

    public forgetPassword(email: string): Observable<void> {
        return this.http.post<void>(`${this.API}forgetPassword`, { email });
    }

    public resetPassword(token: string, password: string, confirmationPassword: string): Observable<void>{
        return this.http.post<void>(`${this.API}resetPassword`,{token , "password":password , "confirmationPassword":confirmationPassword});
    }

    isLoading: boolean = false;
    public loginAdmin(email: string, password: string) {
        this.isLoading = true;
        return new Promise<boolean>((resolve, reject) => {
            this.http.post<any>(this.API + 'login', {email, password}, {observe: 'response'}).subscribe(
                {
                    next : resp => {
                        this.error = null;
                        const token = resp.body.accessToken;
                        const refreshToken = resp.body.refreshToken;
                        console.log(resp.body)
                        const tokenDecoded = this.tokenService.decodeToken(token);
                        const roles = tokenDecoded.roles;
                        this.rolesSubject.next(roles);
                        token != null ? this.tokenService.saveToken(token,refreshToken) : false;
                        this.loadInfos();
                        if (this.isAdmin) {
                            this.router.navigate(['/app/admin/view']);
                            this.isLoading = false;
                        } else if (this.isStudent) {
                            this.router.navigate(['/app/student/view']);
                            this.isLoading = false;
                        } else if (this.isTeacher) {
                            this.router.navigate(['/app/teacher/view']);
                            this.isLoading = false;
                        }
                        console.log('you are logged in successfully');
                    },
                    error : (error: HttpErrorResponse) => {
                        this.error = error.error;
                        console.log(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: error.error.message
                        });
                        this.isLoading = false;
                    }
                }
            );
        });
    }

    public loadInfos() {
        const tokenDecoded = this.tokenService.decode();
        console.log(tokenDecoded)
        const firstName = tokenDecoded.firstName;
        const lastName = tokenDecoded.lastName;
        const roles = tokenDecoded.roles;
        const email = tokenDecoded.sub;
        const numTel = tokenDecoded.numTel;
        // this._authenticatedUser.firstName = firstName;
        // this._authenticatedUser.lastName = lastName;
        // this._authenticatedUser.username = username;
        this._authenticatedUser.email = email;
        this._authenticatedUser.roleDtos = roles;

        // this._authenticatedUser.numTel = numTel;
        localStorage.setItem('autenticated', JSON.stringify(true));
        this.authenticated = true;
        this._loggedIn.next(true);

    }


    // public hasRole(role: Role): boolean {
    //     const index = this._authenticatedUser.roles.findIndex(r => r.authority === role.authority);
    //     return index > -1 ? true : false;
    // }

    public registerAdmin() {
        this.http.post<any>(this.API + 'register', this.user, {observe: 'response'}).subscribe(
            resp => {
                this.router.navigate(['/app/admin']);
            }, (error: HttpErrorResponse) => {
                console.log(error.error);
            }
        );
    }

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
