import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfoModel } from './user-info.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  foundUsers = new BehaviorSubject<UserInfoModel[]>([]);
  constructor(private http: HttpClient) {}

  findUsers(): Observable<UserInfoModel[]> {
    return this.http.get<UserInfoModel[]>(`http://localhost:3000/users`);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  deleteUserAddress(
    id: number,
    body: UserInfoModel
  ): Observable<UserInfoModel> {
    return this.http.put<UserInfoModel>(
      `http://localhost:3000/users/${id}`,
      body
    );
  }

  updateUser(id: number, body: UserInfoModel): Observable<UserInfoModel> {
    return this.http.put<UserInfoModel>(
      `http://localhost:3000/users/${id}`,
      body
    );
  }
}
