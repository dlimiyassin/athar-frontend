import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {UserDto} from "../model/userDto.model";
import {LoginDto} from "../model/loginDto.model";
import {BaseService} from "../../service/base.service";
import {UserCriteria} from "../criteria/UserCriteria.model";
import { UserStatus } from '../../../core/enums/UserStatus';
import { environment } from '../../../../environments/environment';
import { RegisterDto } from '../model/registerDto.model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    // declarations
    readonly API = environment.apiUrlService + "users/";
    private _users: UserDto[] = [];
    private _selectedUsers: UserDto[] = [];
    private _userDialog: boolean = false;
    private _user: UserDto = new UserDto();
    private _submitted!: boolean;
    private _selectedUser: UserDto = new UserDto();
    private _searchUser: UserCriteria = new UserCriteria();
    private _errorMessages: Array<string> = new Array<string>();
    private _loginDto: LoginDto = new LoginDto();
    private _registerDto: RegisterDto = new RegisterDto();

    private reloadTopbarSource = new Subject<void>();
    reloadTopbar$ = this.reloadTopbarSource.asObservable();

    triggerReloadTopbar() {
        this.reloadTopbarSource.next();
    }

    constructor(private http: HttpClient) {
        super();
    }


    public findAll() {
        return this.http.get<Array<UserDto>>(this.API);
    }

    public save(user: UserDto): Observable<UserDto> {
        return this.http.post<UserDto>(this.API, user);
    }

    public findById(id: string) {
        return this.http.get<UserDto>(this.API + "id/" + id);
    }

    public findByEmail(email: string) {
        return this.http.get<UserDto>(this.API + "email/" + email);
    }

    public delete(id: number) {
        return this.http.delete<number>(this.API + "id/" + id);
    }

    public edit(user: UserDto) {
        return this.http.put<UserDto>(this.API, user);
    }

    public editPassword(user: UserDto) {
        return this.http.patch<UserDto>(this.API + 'update-password/email/' + user.email + '/new-password/' + user.password, null);
    }


    public loadAuthenticatedUser(): Observable<UserDto> {
        return this.http.get<UserDto>(this.API + 'authenticated-user');
    }


    public changePasswordBasedOnCurrentPassword(email: string, currentPassword: string, newPassword: string) {
        return this.http.patch<UserDto>(this.API + 'update-password/email/' + email + '/current-password/' + currentPassword + '/new-password/' + newPassword, null);
    }

    changeUserStatus(userId: string, selectedStatus: string): Observable<UserDto> {
        const requestBody = {
            id: userId,
            status: selectedStatus,
        };
        return this.http.post<UserDto>(`${this.API}changeStatus`, requestBody);
    }

    findByCriteria(userCriteria: UserCriteria): Observable<Array<UserDto>> {
        return this.http.post<Array<UserDto>>(this.API + "find-by-criteria", userCriteria);
    }

    findUsersByRoleName(roleName: string): Observable<Array<UserDto>> {
        return this.http.get<Array<UserDto>>(this.API + "find-by-role/roleName/" + roleName);
    }

    updateUserStatus(userId: number, userStatus: UserStatus) {
        const userStatusKey = Object.keys(UserStatus).find(key => UserStatus[key as keyof typeof UserStatus] === userStatus);
        return this.http.patch<UserDto>(this.API + "userId/" + userId + 'userStatus/' + userStatusKey, {});

    }

    // getters and setters
    get users(): UserDto[] {
        return this._users;
    }

    set users(users: UserDto[]) {
        this._users = users;
    }

    get selectedUsers(): UserDto[] {
        return this._selectedUsers;
    }

    set selectedUsers(selectedUsers: UserDto[]) {
        this._selectedUsers = selectedUsers;
    }

    get selectedUser(): UserDto {
        return this._selectedUser;
    }

    set selectedUser(value: UserDto) {
        this._selectedUser = value;
    }

    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }


    get searchUser(): UserCriteria {
        return this._searchUser;
    }

    set searchUser(value: UserCriteria) {
        this._searchUser = value;
    }

    get user(): UserDto {
        return this._user;
    }

    set user(value: UserDto) {
        this._user = value;
    }


    get loginDto(): LoginDto {
        return this._loginDto;
    }

    set loginDto(value: LoginDto) {
        this._loginDto = value;
    }

    get registerDto(): RegisterDto{
        return this._registerDto;
    }

    set registerDto(value: RegisterDto) {
        this._registerDto = value;
    }

}
