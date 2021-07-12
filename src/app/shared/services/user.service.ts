import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfoModel } from '../models/user-info.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  foundUsers = new BehaviorSubject<UserInfoModel[]>([]);
  constructor(private http: HttpClient) {}

  findUsers(): Observable<UserInfoModel[]> {
    return this.http.get<UserInfoModel[]>(`${environment.dbUrl}/api/user/all`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.dbUrl}/api/user/${id}`);
  }

  updateUser(id: number, body: UserInfoModel): Observable<UserInfoModel> {
    return this.http.put<UserInfoModel>(
      `${environment.dbUrl}/api/user/${id}`,
      body
    );
  }
}
