import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../zBase/security/model/userDto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
 readonly API = environment.apiUrlService + 'teachers';

  constructor(private http: HttpClient) {}

  findAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.API);
  }

  findById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.API}/id/${id}`);
  }

  save(teacher: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.API, teacher);
  }
  
  update(teacher: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(this.API, teacher);
  }


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/id/${id}`);
  }
}
